/**
 * 主题状态管理
 */
import { defineStore } from 'pinia';
import { changeColor } from '@/utils/common/theme-util';
import {
  screenWidth,
  screenHeight,
  contentWidth,
  contentHeight,
  WEAK_CLASS,
  BODY_LIMIT_CLASS,
  DISABLES_CLASS
} from '@/components/layout/util';
import { TAB_KEEP_ALIVE, KEEP_ALIVE_EXCLUDES, THEME_STORE_NAME } from '@/config/setting';

/**
 * state 默认值
 */
const DEFAULT_STATE = Object.freeze({
  // 页签数据
  tabs: [],
  // 是否折叠侧栏
  collapse: localStorage.getItem('collapse') !== 'false',
  // 是否开启页脚
  showFooter: false,
  // 顶栏风格: light(亮色), dark(暗色), primary(主色)
  headStyle: 'light',
  // 侧栏风格: light(亮色), dark(暗色)
  sideStyle: 'dark',
  // 布局风格: side(默认), mix(混合导航)
  layoutStyle: 'mix',
  // 侧栏菜单风格: default(默认), mix(双排侧栏)
  sideMenuStyle: 'default',
  // 是否固定主体
  fixedBody: true,
  // 侧栏是否只保持一个子菜单展开
  sideUniqueOpen: false,
  // 是否是色弱模式
  weakMode: false,
  // 主题色
  color: null,
  // 主页的组件名称
  homeComponents: [],
  // 刷新路由时的参数
  routeReload: null,
  // 是否开启响应式
  styleResponsive: true
});
// 延时操作定时器
let disableTransitionTimer, updateContentSizeTimer;

/**
 * 读取缓存配置
 */
function getCacheSetting() {
  try {
    const value = localStorage.getItem(THEME_STORE_NAME);
    if (value) {
      const cache = JSON.parse(value);
      if (typeof cache === 'object') {
        return cache;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return {};
}

/**
 * 缓存配置
 */
function cacheSetting(key, value) {
  const cache = getCacheSetting();
  if (cache[key] !== value) {
    cache[key] = value;
    localStorage.setItem(THEME_STORE_NAME, JSON.stringify(cache));
  }
}

/**
 * 开关响应式布局
 */
function changeStyleResponsive(styleResponsive) {
  if (styleResponsive) {
    document.body.classList.remove(BODY_LIMIT_CLASS);
  } else {
    document.body.classList.add(BODY_LIMIT_CLASS);
  }
}

/**
 * 切换色弱模式
 */
function changeWeakMode(weakMode) {
  if (weakMode) {
    document.body.classList.add(WEAK_CLASS);
  } else {
    document.body.classList.remove(WEAK_CLASS);
  }
}

/**
 * 切换主题
 */
function changeTheme(value, dark) {
  return new Promise((resolve, reject) => {
    try {
      changeColor(value, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 切换布局时禁用过渡动画
 */
function disableTransition() {
  disableTransitionTimer && clearTimeout(disableTransitionTimer);
  document.body.classList.add(DISABLES_CLASS);
  disableTransitionTimer = setTimeout(() => {
    document.body.classList.remove(DISABLES_CLASS);
  }, 100);
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => {
    const state = { ...DEFAULT_STATE };
    // 读取本地缓存
    const cache = getCacheSetting();
    Object.keys(state).forEach(key => {
      if (typeof cache[key] !== 'undefined') {
        state[key] = cache[key];
      }
    });
    return state;
  },
  getters: {
    // 需要 keep-alive 的组件
    keepAliveInclude() {
      if (!TAB_KEEP_ALIVE) {
        return [];
      }
      const components = new Set();
      const { reloadPath, reloadHome } = this.routeReload || {};
      this.tabs?.forEach(t => {
        const isAlive = t.meta?.keepAlive !== false;
        const isExclude = KEEP_ALIVE_EXCLUDES.includes(t.path);
        const isReload = reloadPath && reloadPath === t.fullPath;
        if (isAlive && !isExclude && !isReload && t.components) {
          t.components.forEach(c => {
            if (typeof c === 'string' && c) {
              components.add(c);
            }
          });
        }
      });
      if (!reloadHome) {
        this.homeComponents?.forEach(c => {
          if (typeof c === 'string' && c) {
            components.add(c);
          }
        });
      }
      return Array.from(components);
    }
  },
  actions: {
    setTabs(value) {
      this.tabs = value;
    },
    setCollapse(value) {
      this.collapse = value;
      localStorage.setItem('collapse', value);
      this.delayUpdateContentSize(800);
    },
    setShowFooter(value) {
      this.showFooter = value;
      cacheSetting('showFooter', value);
      this.delayUpdateContentSize();
    },
    setHeadStyle(value) {
      this.headStyle = value;
      cacheSetting('headStyle', value);
    },
    setSideStyle(value) {
      this.sideStyle = value;
      cacheSetting('sideStyle', value);
    },
    setLayoutStyle(value) {
      disableTransition();
      this.layoutStyle = value;
      cacheSetting('layoutStyle', value);
      this.delayUpdateContentSize();
    },
    setSideMenuStyle(value) {
      disableTransition();
      this.sideMenuStyle = value;
      cacheSetting('sideMenuStyle', value);
      this.delayUpdateContentSize();
    },
    setFixedBody(value) {
      disableTransition();
      this.fixedBody = value;
      cacheSetting('fixedBody', value);
    },
    setSideUniqueOpen(value) {
      this.sideUniqueOpen = value;
      cacheSetting('sideUniqueOpen', value);
    },
    setStyleResponsive(value) {
      changeStyleResponsive(value);
      this.styleResponsive = value;
      cacheSetting('styleResponsive', value);
    },
    /**
     * 切换色弱模式
     * @param value 是否是色弱模式
     */
    setWeakMode(value) {
      return new Promise(resolve => {
        changeWeakMode(value);
        this.weakMode = value;
        cacheSetting('weakMode', value);
        resolve();
      });
    },
    /**
     * 切换主题色
     * @param value 主题色
     */
    setColor(value) {
      return new Promise((resolve, reject) => {
        changeTheme(value, false)
          .then(() => {
            this.color = value;
            cacheSetting('color', value);
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    /**
     * 设置主页路由对应的组件名称
     * @param components 组件名称
     */
    setHomeComponents(components) {
      this.homeComponents = components;
    },
    /**
     * 设置刷新路由信息
     * @param option 路由刷新参数
     */
    setRouteReload(option) {
      this.routeReload = option;
    },
    /**
     * 更新屏幕尺寸
     */
    updateScreenSize() {
      this.screenWidth = screenWidth();
      this.screenHeight = screenHeight();
      this.updateContentSize();
    },
    /**
     * 更新内容区域尺寸
     */
    updateContentSize() {
      this.contentWidth = contentWidth();
      this.contentHeight = contentHeight();
    },
    /**
     * 延时更新内容区域尺寸
     * @param delay 延迟时间
     */
    delayUpdateContentSize(delay) {
      updateContentSizeTimer && clearTimeout(updateContentSizeTimer);
      updateContentSizeTimer = setTimeout(() => {
        this.updateContentSize();
      }, delay ?? 100);
    },
    /**
     * 重置设置
     */
    resetSetting() {
      return new Promise((resolve, reject) => {
        disableTransition();
        this.showFooter = DEFAULT_STATE.showFooter;
        this.headStyle = DEFAULT_STATE.headStyle;
        this.sideStyle = DEFAULT_STATE.sideStyle;
        this.layoutStyle = DEFAULT_STATE.layoutStyle;
        this.sideMenuStyle = DEFAULT_STATE.sideMenuStyle;
        this.fixedBody = DEFAULT_STATE.fixedBody;
        this.sideUniqueOpen = DEFAULT_STATE.sideUniqueOpen;
        this.styleResponsive = DEFAULT_STATE.styleResponsive;
        this.weakMode = DEFAULT_STATE.weakMode;
        this.color = DEFAULT_STATE.color;
        localStorage.removeItem(THEME_STORE_NAME);
        Promise.all([changeStyleResponsive(this.styleResponsive), changeWeakMode(this.weakMode), changeTheme(this.color, false)])
          .then(() => {
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    /**
     * 恢复主题
     */
    recoverTheme() {
      // 关闭响应式布局
      if (!this.styleResponsive) {
        changeStyleResponsive(false);
      }
      // 恢复色弱模式
      if (this.weakMode) {
        changeWeakMode(true);
      }
      // 恢复主题色
      if (this.color || false) {
        changeTheme(this.color, false).catch(e => {
          console.error(e);
        });
      }
    },
    /**
     * 添加页签或更新相同 key 的页签数据
     * @param data 页签数据
     */
    tabAdd(data) {
      if (Array.isArray(data)) {
        data.forEach(d => {
          this.tabAdd(d);
        });
        return;
      }
      const i = this.tabs.findIndex(d => d.key === data.key);
      if (i === -1) {
        this.setTabs(this.tabs.concat([data]));
      } else if (data.fullPath !== this.tabs[i].fullPath) {
        this.setTabs(
          this.tabs
            .slice(0, i)
            .concat([data])
            .concat(this.tabs.slice(i + 1))
        );
      }
    },
    /**
     * 关闭页签
     * @param key 页签 key
     */
    async tabRemove({ key, active }) {
      const i = this.tabs.findIndex(t => t.key === key || t.fullPath === key);
      if (i === -1) {
        return {};
      }
      const t = this.tabs[i];
      if (!t.closable) {
        return Promise.reject();
      }
      const path = this.tabs[i - 1]?.fullPath;
      this.setTabs(this.tabs.filter((_d, j) => j !== i));
      return t.key === active ? { path, home: !path } : {};
    },
    /**
     * 关闭左侧页签
     */
    async tabRemoveLeft({ key, active }) {
      let index = -1; // 选中页签的 index
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].key === active) {
          index = i;
        }
        if (this.tabs[i].key === key) {
          if (i === 0) {
            break;
          }
          const temp = this.tabs.filter((d, j) => !d.closable && j < i);
          if (temp.length === i + 1) {
            break;
          }
          const path = index === -1 ? 0 : this.tabs[i].fullPath;
          this.setTabs(temp.concat(this.tabs.slice(i)));
          return { path };
        }
      }
      return Promise.reject();
    },
    /**
     * 关闭右侧页签
     */
    async tabRemoveRight({ key, active }) {
      if (this.tabs.length) {
        let index = -1; // 选中页签的 index
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].key === active) {
            index = i;
          }
          if (this.tabs[i].key === key) {
            if (i === this.tabs.length - 1) {
              return Promise.reject();
            }
            const temp = this.tabs.filter((d, j) => !d.closable && j > i);
            if (temp.length === this.tabs.length - i - 1) {
              return Promise.reject();
            }
            const path = index === -1 ? this.tabs[i].fullPath : 0;
            this.setTabs(this.tabs.slice(0, i + 1).concat(this.tabs.filter((d, j) => !d.closable && j > i)));
            return { path };
          }
        }
        // 主页时关闭全部
        const temp = this.tabs.filter(d => !d.closable);
        if (temp.length !== this.tabs.length) {
          this.setTabs(temp);
          return { home: index !== -1 };
        }
      }
      return Promise.reject();
    },
    /**
     * 关闭其它页签
     */
    async tabRemoveOther({ key, active }) {
      let index = -1; // 选中页签的 index
      let path; // 关闭后跳转的 path
      const temp = this.tabs.filter((d, i) => {
        if (d.key === active) {
          index = i;
        }
        if (d.key === key) {
          path = d.fullPath;
        }
        return !d.closable || d.key === key;
      });
      if (temp.length === this.tabs.length) {
        return Promise.reject();
      }
      this.setTabs(temp);
      if (index === -1) {
        return {};
      }
      return key === active ? {} : { path, home: !path };
    },
    /**
     * 关闭全部页签
     * @param active 选中页签的 key
     */
    async tabRemoveAll(active) {
      const t = this.tabs.find(d => d.key === active);
      const home = typeof t !== 'undefined' && t.closable === true; // 是否跳转主页
      const temp = this.tabs.filter(d => !d.closable);
      if (temp.length === this.tabs.length) {
        return Promise.reject();
      }
      this.setTabs(temp);
      return { home };
    },
    /**
     * 修改页签
     * @param data 页签数据
     */
    tabSetItem(data) {
      let i = -1;
      if (data.key) {
        i = this.tabs.findIndex(d => d.key === data.key);
      } else if (data.fullPath) {
        i = this.tabs.findIndex(d => d.fullPath === data.fullPath);
      } else if (data.path) {
        i = this.tabs.findIndex(d => d.path === data.path);
      }
      if (i !== -1) {
        const item = { ...this.tabs[i] };
        if (data.title) {
          item.title = data.title;
        }
        if (typeof data.closable === 'boolean') {
          item.closable = data.closable;
        }
        if (data.components) {
          item.components = data.components;
        }
        this.setTabs(
          this.tabs
            .slice(0, i)
            .concat([item])
            .concat(this.tabs.slice(i + 1))
        );
      }
    }
  }
});
