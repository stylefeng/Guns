import { isExternalLink, eachTreeData } from '@/utils/common/menu-util'
import { message } from 'ant-design-vue';
import debounce from 'lodash-es/debounce';
import { inject, computed, unref, onBeforeUnmount } from 'vue';

/**
 * 色弱模式 class
 */
export const WEAK_CLASS = 'guns-admin-weak';

/**
 * 关闭布局响应式后 body 限制最小宽度的 class
 */
export const BODY_LIMIT_CLASS = 'guns-body-limit-width';

/**
 * 布局禁用过渡动画 class
 */
export const DISABLES_CLASS = 'guns-transition-disabled';


/**
 * 获取菜单包含所有父级
 */
export function getMatchedMenus(
    path,
    menus,
    parents
  ) {
    if (!parents) {
      parents = [];
    }
    for (let i = 0; i < menus.length; i++) {
      const m = menus[i];
      if (m.path === path) {
        return parents.concat([m]);
      } else if (m.children?.length) {
        const result = getMatchedMenus(path, m.children, parents.concat([m]));
        if (result) {
          return result;
        }
      }
    }
  }

  /**
 * provide key
 */
export const PROVIDE_KEY = 'GunsGlobalConfig';

/**
 * layout provide key
 */
export const LAYOUT_KEY = 'GunsLayoutState';

/**
 * 获取屏幕宽度
 */
export function screenWidth() {
    return document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * 获取屏幕高度
 */
export function screenHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
}

/**
 * 获取内容区域宽度
 */
export function contentWidth() {
  return (
    document.querySelector('.guns-admin-content-view')?.clientWidth ??
    screenWidth()
  );
}

/**
 * 获取内容区域高度
 */
export function contentHeight() {
  return (
    document.querySelector('.guns-admin-content-view')?.clientHeight ??
    screenHeight()
  );
}

/**
 * 处理树形数据
 * @param data 需要处理的数据
 * @param formatter 处理器
 * @param childrenField children 字段名
 */
export function formatTreeData(
    data,
    formatter,
    childrenField = 'children',
    resultChildrenField = 'children',
    parent
  ) {
    const result = [];
    data?.forEach((d, i) => {
      const item = formatter(d, i, parent);
      if (item) {
        if (d[childrenField]?.length) {
          item[resultChildrenField] = formatTreeData(
            d[childrenField],
            formatter,
            childrenField,
            resultChildrenField,
            item
          );
        }
        result.push(item);
      }
    });
    return result;
}

/**
 * 获取路由对应的菜单数据
 * @param path 路由地址
 * @param fullPath 路由完整地址
 * @param meta 路由元数据
 * @param menus 菜单数据
 */
export function getRouteMatched(
  path,
  fullPath,
  meta,
  menus
) {
  // 菜单层级选中
  const { active, activeOther, title, icon } = (() => {
    if (meta?.active) {
      return {
        active: meta?.active,
        activeOther: true,
        icon: getMenuIcon(path, fullPath, menus),
        title: getMenuTitle(path, fullPath, menus)
      };
    }
    const temp = findMenuByPath(fullPath, menus);
    if (temp) {
      return {
        active: fullPath,
        activeOther: false,
        icon: temp.meta?.icon,
        title: temp.meta?.title
      };
    }
    return {
      active: path,
      activeOther: false,
      icon: getMenuIcon(path, fullPath, menus),
      title: getMenuTitle(path, fullPath, menus)
    };
  })();
  const matched = getMatchedMenus(active, menus);
  return { active, matched, activeOther, title: title ?? meta.title, icon: icon ?? meta.icon };
}

/**
 * 获取菜单标题
 * @param path 路由地址
 * @param fullPath 路由完整地址
 * @param menus 菜单数据
 */
export function getMenuTitle(
  path,
  fullPath,
  menus
) {
  return getRouteMenu(path, fullPath, menus)?.meta?.title;
}

/**
 * 获取菜单图标
 * @param path 路由地址
 * @param fullPath 路由完整地址
 * @param menus 菜单数据
 */
export function getMenuIcon(
  path,
  fullPath,
  menus
) {
  return getRouteMenu(path, fullPath, menus)?.meta?.icon;
}

/**
 * 获取路由对应的菜单
 * @param path 路由地址
 * @param fullPath 路由完整地址
 * @param menus 菜单数据
 */
export function getRouteMenu(
  path,
  fullPath,
  menus
) {
  const temp = findMenuByPath(fullPath, menus);
  if (temp) {
    return temp;
  }
  return findMenuByPath(path, menus);
}

/**
 * 获取面包屑导航数据
 * @param isHome 是否是主页
 * @param homePath 主页地址
 * @param homeTitle 主页名称
 * @param matched 匹配的菜单层级
 * @param activeOther 是否是选中其它的菜单
 * @param routeI18n 菜单标题国际化处理
 * @param path 当前路由地址
 * @param fullPath 当前路由完整地址
 * @param meta 当前路由元数据
 * @param menus 菜单数据
 */
export function getMatchedLevels(
  isHome,
  homePath,
  homeTitle,
  matched,
  activeOther,
  routeI18n,
  path,
  fullPath,
  meta,
  menus,
  tabs
) {
  const levels = [];
  if (!isHome) {
    levels.push({
      home: true,
      path: homePath,
      fullPath: homePath,
      title: homeTitle
    });
  }
  matched?.forEach((m) => {
    if (m.meta && m.meta.title && m.meta.breadcrumb !== false) {
      const t = findTabByPath(m.path, tabs);
      levels.push({
        path: m.path,
        fullPath: m.path,
        title: routeI18n(m.path) || t?.title || m.meta.title
      });
    }
  });
  if (
    activeOther &&
    (!levels.length || path !== levels[levels.length - 1].path) &&
    meta.title
  ) {
    const t = findTabByPath(fullPath, tabs);
    const m = findMenuByPath(meta.routePath, menus);
    levels.push({
      path: path,
      fullPath: fullPath,
      title: routeI18n(path) || t?.title || m?.meta?.title || meta.title
    });
  }
  return levels;
}

/**
 * 获取路由对应的组件名称
 * @param matched 路由匹配数据
 */
export function getMatchedComponents(matched) {
  const components = [];
  matched.forEach((m) => {
    if (m.components?.default?.name) {
      components.push(m.components.default.name);
    }
  });
  return components;
}

/**
 * 获取 path 对应的菜单数据
 * @param path 菜单地址
 * @param menus 全部菜单数据
 */
export function findMenuByPath(path, menus) {
  if (path == null || menus == null) {
    return;
  }
  let data;
  eachTreeData(menus, (d) => {
    if (path === d.path) {
      data = d;
      return false;
    }
  });
  return data;
}

/**
 * 判断路由是否是主页
 * @param route 路由信息
 * @param homePath 主页地址
 */
export function isHomeRoute(
  route,
  homePath,
  layoutPath
) {
  const { path, matched } = route;
  if (homePath === path) {
    return true;
  }
  return !!(
    matched[0] &&
    (!matched[0].path || matched[0].path === layoutPath) &&
    matched[0].redirect === path
  );
}

/**
 * 获取 path 对应的页签数据
 * @param path 路由地址
 * @param tabs 全部页签数据
 */
export function findTabByPath(path, tabs) {
  if (path == null || tabs == null) {
    return;
  }
  for (let i = 0; i < tabs.length; i++) {
    if (path === tabs[i].key || path === tabs[i].fullPath) {
      return tabs[i];
    }
  }
}

/**
 * 菜单标题国际化方法
 */
export function menuTitleI18n({
  path,
  locale,
  i18n,
  menu,
  menus
}) {
  if (i18n && path) {
    const key = routeI18nKey(path);
    if (!menu) {
      menu = findMenuByPath(path, menus);
    }
    return i18n(path, key, menu, locale);
  }
}

/**
 * 获取路由地址对应的 i18n key
 * @param path 路由地址
 */
export function routeI18nKey(path) {
  if (isExternalLink(path)) {
    return path.replace(/\.(\w)/g, (_$0, $1) => $1.toUpperCase());
  } else if (!path || path === '/') {
    return;
  }
  const k = path.startsWith('/') ? path.substring(1) : path;
  return k
    .replace(/-(\w)/g, (_$0, $1) => $1.toUpperCase())
    .replace(/_(\w)/g, (_$0, $1) => $1.toUpperCase())
    .replace(/\//g, '.');
}

/**
 * 绑定窗口事件监听
 */
export function useWindowListener({
  onResize,
  onEscKeydown
}) {
  // 窗口大小改变监听器
  const onResizeListener = debounce(() => {
    onResize();
  }, 500);

  // 键盘事件监听器
  const onKeydownListener = (e) => {
    if (e.keyCode === 27) {
      onEscKeydown(e);
    }
  };

  window.addEventListener('resize', onResizeListener);
  window.addEventListener('keydown', onKeydownListener);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResizeListener);
    window.removeEventListener('keydown', onKeydownListener);
  });
}


/**
 * 获取布局状态
 */
export function useLayoutState(d) {
  return inject(LAYOUT_KEY, d);
}

/**
 * 获取是否开启布局响应
 */
export function useResponsive(props) {
  const state = useLayoutState();
  return computed(() => {
    return props.responsive ?? unref(state)?.styleResponsive ?? true;
  });
}

/**
 * 带遮罩层的加载框
 */
export function messageLoading(
  content,
  duration,
  onClose
) {
  const classes = ['guns-message-loading'];
  const option = {};
  if (typeof content === 'object' && content !== null) {
    Object.assign(option, content);
    if ((content).mask) {
      classes.push('guns-message-mask');
    }
    if ((content).center) {
      classes.push('guns-message-center');
    }
    if ((content).class) {
      classes.push((content).class);
    }
  } else {
    option.content = content;
    if (typeof duration === 'function') {
      option.onClose = duration;
    } else {
      option.duration = duration;
      option.onClose = onClose;
    }
  }
  option.class = classes.join(' ');
  return message.loading(option);
}