<!-- 布局组件 -->
<template>
  <div :class="layoutClass">
    <!-- 顶栏 -->
    <LayoutHeader
      :levels="levelData"
      :collapse="collapse"
      :menus="headMenuData"
      :head-style="headStyle"
      :active="headMenuActive"
      :project-name="projectName"
      :show-refresh="showRefresh"
      :show-left-tool="showHeadLeftTool"
      :breadcrumb-separator="breadcrumbSeparator"
      :show-collapse="showCollapse && showSideMenu"
      :show-breadcrumb="showBreadcrumb && layoutStyle === 'top'"
      @toggle-collapse="updateCollapse"
      @reload-page="reloadPage"
      @logo-click="onLogoClick"
      @title-click="onHeadMenuTitleClick"
    >
      <template v-for="name in Object.keys($slots)" #[name]="props">
        <slot :name="name" v-bind="props || {}"></slot>
      </template>
    </LayoutHeader>
    <div class="guns-admin-main">
      <!-- 侧栏 -->
      <LayoutSidebar
        v-if="sideMenuData && sideMenuData.length"
        :data="sideMenuData"
        :theme="sideMenuTheme"
        :active="sideMenuActive"
        :collapse="sideMenuCollapse"
        :unique-open="sideUniqueOpen"
        :inline-indent="inlineIndent"
        :showCollapse="showCollapse && showSideMenu"
        v-model:menu-opens="sideMenuOpen"
        @toggle-collapse="updateCollapse"
        @title-click="onSideMenuTitleClick"
      >
        <template v-for="name in Object.keys($slots)" #[name]="props">
          <slot :name="name" v-bind="props || {}"></slot>
        </template>
      </LayoutSidebar>
      <!-- 主体 -->
      <div class="guns-admin-body">
        <!-- 内容区域 -->
        <div ref="contentRef" class="guns-admin-content">
          <div class="guns-admin-content-view">
            <slot></slot>
          </div>
          <!-- 全局页脚 -->
          <template v-if="showFooter && !hideFooter">
            <slot name="footer"></slot>
          </template>
        </div>
      </div>
    </div>
    <!-- 小屏幕遮罩层 -->
    <div class="guns-admin-shade" @click="updateCollapse"></div>
    <!-- 返回顶部 -->
    <a-back-top v-if="showBackTop" :visibility-height="backTopVisibilityHeight" :target="fixedBody ? getContentElem : void 0" />
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, watch, provide } from 'vue';
import { useRouter } from 'vue-router';
import {
  screenWidth,
  formatTreeData,
  getRouteMatched,
  getMatchedLevels,
  getMatchedComponents,
  isHomeRoute,
  findTabByPath,
  getRouteMenu,
  menuTitleI18n,
  useWindowListener
} from './util';
import { LAYOUT_KEY } from './util';
import LayoutHeader from './components/layout-header.vue';
import LayoutSidebar from './components/layout-sidebar.vue';
import props from './props';

export default defineComponent({
  name: 'GunsLayout',
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  props,
  emits: [
    'update:collapse',
    'update:side-nav-collapse',
    'update:body-fullscreen',
    'tab-add',
    'tab-remove',
    'tab-remove-all',
    'tab-remove-left',
    'tab-remove-right',
    'tab-remove-other',
    'tab-context-menu',
    'tabSortChange',
    'logo-click',
    'reload-page',
    'screen-size-change',
    'set-home-components',
    'side-menu-title-click',
    'head-menu-title-click',
    'side-nav-title-click',
    'update-document-title'
  ],
  setup(props, { emit }) {
    const { currentRoute, push } = useRouter();

    /* 获取当前屏幕尺寸是否是移动端 */
    const screenIsMobile = () => {
      return props.styleResponsive ? screenWidth() < 768 : false;
    };

    // 内容区域 ref
    const contentRef = ref(null);

    // 国际化处理后的菜单数据
    const menuData = ref([]);

    // 国际化处理后的页签数据
    const tabData = ref([]);

    // 面包屑导航数据
    const levelData = ref([]);

    // 侧栏一级菜单数据
    const sideNavData = ref([]);

    // 侧栏菜单数据
    const sideMenuData = ref([]);

    // 侧栏菜单选中
    const sideMenuActive = ref([]);

    // 侧栏菜单展开
    const sideMenuOpen = ref([]);

    // 顶栏菜单数据
    const headMenuData = ref([]);

    // 顶栏菜单选中
    const headMenuActive = ref([]);

    // 页签选中
    const tabActive = ref(props.homePath);

    // 当前路由是否隐藏侧栏
    const hideSidebar = ref(false);

    // 当前路由是否隐藏页脚
    const hideFooter = ref(false);

    // 主页路由标题
    const homeRouteTitle = ref(props.homeTitle ?? '');

    // 是否是小屏幕设备
    const isMobile = ref(screenIsMobile());

    // 是否是顶栏菜单布局
    const isTopMenu = computed(() => props.layoutStyle === 'top');
    // 是否是混合菜单布局
    const isMixMenu = computed(() => props.layoutStyle === 'mix');

    // 是否显示侧栏菜单
    const showSideMenu = computed(() => {
      return isMobile.value || !isTopMenu.value;
    });

    // 是否显示侧栏区域
    const showSidebar = computed(() => {
      return showSideMenu.value;
    });

    // 布局 class
    const layoutClass = computed(() => {
      return [
        'guns-admin-layout',
        // 折叠侧栏
        { 'guns-admin-collapse': props.collapse },
        // 固定主体
        { 'guns-admin-fixed-body': props.fixedBody },
        // 暗色顶栏
        { 'guns-admin-head-dark': props.headStyle !== 'light' },
        // 暗色侧栏
        { 'guns-admin-side-dark': props.sideStyle === 'dark' },
        // logo 宽度自适应
        {
          'guns-admin-logo-auto': (props.logoAutoSize || !showSidebar.value) && !isMobile.value
        },
        // 内容区域全屏
        { 'guns-admin-body-fullscreen': props.bodyFullscreen },
        // 内容区域全屏不显示页签栏
        {
          'guns-admin-content-fullscreen': props.bodyFullscreen && props.contentFullscreen
        },
        // 开启响应式
        { 'guns-admin-responsive': props.styleResponsive }
      ];
    });

    // 是否折叠侧栏菜单
    const sideMenuCollapse = computed(() => {
      return isMobile.value || props.collapse;
    });

    // 双侧栏一级菜单主题
    const sideNavTheme = computed(() => {
      return props.sideStyle === 'dark' ? 'dark' : 'light';
    });

    // 侧栏菜单主题
    const sideMenuTheme = computed(() => {
      return false && !isMobile.value ? 'light' : sideNavTheme.value;
    });

    // 是否显示顶栏左侧功能区
    const showHeadLeftTool = computed(() => {
      return isMobile.value || !isTopMenu.value;
    });

    // 页签栏右侧下拉是否显示刷新按钮
    const showTabRefresh = computed(() => {
      return props.bodyFullscreen || (isTopMenu.value && !isMobile.value);
    });

    /* 更新侧栏折叠状态 */
    const updateCollapse = value => {
      const collapse = typeof value === 'boolean' ? value : !props.collapse;
      emit('update:collapse', collapse);
    };

    /* 折叠展开一级菜单 */
    const updateSideNavCollapse = value => {
      const collapse = typeof value === 'boolean' ? value : !props.sideNavCollapse;
      emit('update:side-nav-collapse', collapse);
    };

    /* 内容区域全屏切换 */
    const updateBodyFullscreen = value => {
      const fullscreen = typeof value === 'boolean' ? value : !props.bodyFullscreen;
      emit('update:body-fullscreen', fullscreen);
    };

    /* tab 切换 */
    const onTabChange = ({ fullPath, key }) => {
      const path = fullPath || key;
      if (path) {
        push(path);
      }
    };

    /* 添加 tab */
    const tabAdd = data => {
      emit('tab-add', data);
    };

    /* 移除 tab */
    const onTabRemove = option => {
      emit('tab-remove', option);
    };

    /* 移除左边 tab */
    const onTabRemoveLeft = option => {
      emit('tab-remove-left', option);
    };

    /* 移除右边 tab */
    const onTabRemoveRight = option => {
      emit('tab-remove-right', option);
    };

    /* 移除其它 tab */
    const onTabRemoveOther = option => {
      emit('tab-remove-other', option);
    };

    /* 移除全部 tab */
    const onTabRemoveAll = active => {
      emit('tab-remove-all', active);
    };

    /* 页签右键菜单点击事件 */
    const onTabContextMenu = value => {
      emit('tab-context-menu', value);
    };

    /* 页签拖动顺序改变事件 */
    const onTabSortChange = data => {
      emit('tabSortChange', data);
    };

    /* 刷新页面 */
    const reloadPage = () => {
      emit('reload-page');
    };

    /* logo 点击事件 */
    const onLogoClick = () => {
      emit('logo-click', isHomeRoute(unref(currentRoute), props.homePath, props.layoutPath));
    };

    /* 侧栏菜单父级点击事件 */
    const onSideMenuTitleClick = key => {
      emit('side-menu-title-click', key);
    };

    /* 侧栏一级菜单父级点击事件 */
    const onSideNavTitleClick = key => {
      emit('side-nav-title-click', key);
    };

    /* 顶栏菜单父级点击事件 */
    const onHeadMenuTitleClick = key => {
      emit('head-menu-title-click', key);
    };

    /* 获取内容 elem */
    const getContentElem = () => {
      return contentRef.value;
    };

    /* 处理路由切换 */
    const onRouteChange = current => {
      const { path, fullPath, meta } = current;

      // 内容区域滚动到顶部
      const contentEl = getContentElem();
      if (props.autoScrollTop && contentEl) {
        contentEl.scrollTop = 0;
      }

      // 判断是否需要隐藏侧栏
      if (props.hideSidebars?.includes(path)) {
        hideSidebar.value = true;
      } else {
        hideSidebar.value = !!meta.hideSidebar;
      }

      // 判断是否需要隐藏页脚
      if (props.hideFooters?.includes(path)) {
        hideFooter.value = true;
      } else {
        hideFooter.value = !!meta.hideFooter;
      }

      // 刷新路由不做处理
      if (path.includes(props.redirectPath)) {
        return;
      }

      // 更新浏览器标题
      setDocumentTitle(path, fullPath);

      // 获取路由对应的菜单数据
      const { active, matched, title, activeOther } = getRouteMatched(path, fullPath, meta, menuData.value);

      // 获取面包屑导航数据
      const isHome = isHomeRoute(current, props.homePath, props.layoutPath);
      levelData.value = getMatchedLevels(
        isHome,
        props.homePath,
        homeRouteTitle.value,
        matched,
        activeOther,
        routeI18n,
        path,
        fullPath,
        meta,
        menuData.value,
        tabData.value
      );

      // 添加页签
      const components = getMatchedComponents(current.matched);
      if (isHome) {
        tabActive.value = props.homePath;
        emit('set-home-components', components);
      } else {
        const isUnique = meta.tabUnique === false || props.repeatableTabs?.includes(path);
        const key = isUnique ? fullPath : path;
        if (meta.title) {
          const t = findTabByPath(key, tabData.value);
          tabAdd({
            key,
            path,
            fullPath,
            components,
            closable: t?.closable ?? meta.closable !== false,
            title: t?.title || title,
            meta
          });
        }
        tabActive.value = key;
      }

      // 更新顶栏和侧栏的菜单选中
      updateMenuActive(active, matched);

      // 混合导航更新菜单数据
      if (isMixMenu.value) {
        splitMenuData();
      }

      // 移动设备自动收起侧栏
      if (props.styleResponsive && isMobile.value) {
        updateCollapse(true);
      }
    };

    /* 更新顶栏和侧栏的菜单选中及展开 */
    const updateMenuActive = (active, matched) => {
      const openKeys = []; // 需要展开的菜单
      const { active1, active2 } = (() => {
        if (!matched?.length) {
          return { active1: void 0, active2: void 0 };
        }
        // 获取菜单展开的 key
        matched.forEach((d, i) => {
          if (i !== matched.length - 1) {
            openKeys.push(d.path);
          }
        });
        const match1 = matched[0]; // 第一层级导航选中
        const match2 = matched.length > 1 ? matched[1] : match1; // 第二层级导航选中
        return { active1: match1.path, active2: match2.path };
      })();
      if (isMixMenu.value) {
        // 混合导航
        sideMenuActive.value = active1 ? [active1] : [];
      } else {
        // 左侧导航
        sideMenuActive.value = [];
      }
      if (isMixMenu.value) {
        headMenuActive.value = [active].concat(openKeys);
      } else {
        sideMenuActive.value = [active].concat(openKeys);
      }

      if (props.sideUniqueOpen) {
        sideMenuOpen.value = openKeys;
      } else {
        sideMenuOpen.value = Array.from(new Set(sideMenuOpen.value.concat(openKeys)));
      }
    };

    /* 混合导航分割菜单数据 */
    const splitMenuData = () => {
      if (!menuData.value?.length) {
        headMenuData.value = [];
        sideNavData.value = [];
        sideMenuData.value = [];
      } else if (isMobile.value) {
        // 移动端
        headMenuData.value = [];
        sideNavData.value = [];
        sideMenuData.value = menuData.value;
      } else if (isMixMenu.value) {
        // 混合导航
        sideMenuData.value = menuData.value.map(d => {
          return { path: d.path, component: d.component, meta: d.meta, ...d, children: null };
        });
        const sideMenus = (() => {
          const temp = sideMenuActive.value.length
            ? menuData.value.filter(d => {
                return sideMenuActive.value[0] === d.path;
              })
            : [];
          return (temp.length ? temp[0].children : menuData.value[0].children) || [];
        })();
        if (!sideMenus.length) {
          sideNavData.value = [];
          headMenuData.value = [];
        } else {
          // 左侧单菜单
          sideNavData.value = [];
          headMenuData.value = sideMenus;
        }
      } else {
        // 左侧导航
        headMenuData.value = [];
        // 左侧单菜单
        sideNavData.value = [];
        sideMenuData.value = menuData.value;
      }
    };

    /* 国际化改变后更新菜单数据 */
    const updateMenuData = () => {
      let tempTitle;
      menuData.value = formatTreeData(props.menus, item => {
        const title = item.meta?.title;
        if (!tempTitle && !item.children?.length) {
          tempTitle = title;
        }
        return {
          ...item,
          meta: {
            ...item.meta,
            title: routeI18n(item.path, item) || title
          }
        };
      });
      splitMenuData();
      homeRouteTitle.value = props.homeTitle ?? tempTitle ?? '';
    };

    /* 国际化改变后更新页签数据 */
    const updateTabData = () => {
      tabData.value = props.tabs.map(item => {
        return {
          ...item,
          title: routeI18n(item.path) || item.title
        };
      });
    };

    /* 国际化改变后更新面包屑导航数据 */
    const updateLevelData = () => {
      levelData.value = levelData.value.map(d => {
        const title = (() => {
          if (d.home) {
            return homeRouteTitle.value;
          }
          const t = findTabByPath(d.fullPath, tabData.value);
          return routeI18n(d.path) || t?.title || d.title;
        })();
        return { ...d, title };
      });
    };

    /* 获取路由地址对应的 i18n 名称 */
    const routeI18n = (path, menu) => {
      return menuTitleI18n({
        path,
        locale: props.locale,
        i18n: props.i18n,
        menu,
        menus: menuData.value
      });
    };

    /* 更新浏览器标题 */
    const setDocumentTitle = (path, fullPath) => {
      const m = getRouteMenu(path, fullPath, menuData.value);
      const t = findTabByPath(fullPath, tabData.value);
      emit('update-document-title', routeI18n(m?.path || path, m) || t?.title || m?.meta?.title);
    };

    watch(
      () => props.menus,
      () => {
        updateMenuData();
      },
      { deep: true }
    );

    watch(
      () => props.tabs,
      () => {
        updateTabData();
        updateLevelData();
      },
      { deep: true }
    );

    watch(
      () => props.homeTitle,
      value => {
        if (value) {
          homeRouteTitle.value = value;
        } else {
          updateMenuData();
        }
        updateTabData();
        updateLevelData();
      }
    );

    watch(
      () => props.layoutStyle,
      () => {
        const { path, fullPath, meta } = unref(currentRoute);
        const { active, matched } = getRouteMatched(path, fullPath, meta, menuData.value);
        updateMenuActive(active, matched);
        splitMenuData();
      }
    );

    watch(
      () => props.sideMenuStyle,
      () => {
        splitMenuData();
      }
    );

    watch(isMobile, () => {
      splitMenuData();
    });

    watch(
      () => props.locale,
      () => {
        updateMenuData();
        updateTabData();
        updateLevelData();
        const { path, fullPath } = unref(currentRoute);
        setDocumentTitle(path, fullPath);
      },
      { immediate: true }
    );

    watch(
      () => props.sideDefaultOpeneds,
      openeds => {
        sideMenuOpen.value = openeds ? openeds.slice() : [];
      },
      {
        deep: true,
        immediate: true
      }
    );

    watch(
      () => props.styleResponsive,
      () => {
        isMobile.value = screenIsMobile();
      }
    );

    watch(
      currentRoute,
      route => {
        onRouteChange(unref(route));
      },
      { immediate: true }
    );

    // 绑定 window 事件监听
    useWindowListener({
      onResize: () => {
        const isMobileTemp = screenIsMobile();
        if (isMobileTemp) {
          if (!isMobile.value && !props.collapse) {
            updateCollapse(true);
          }
        } else if (isMobile.value && props.collapse) {
          updateCollapse(false);
        }
        isMobile.value = isMobileTemp;
        emit('screen-size-change', { isMobile: isMobile.value });
      },
      onEscKeydown: e => {
        if (props.fullscreenExitOnEsc && props.bodyFullscreen) {
          e.stopPropagation();
          updateBodyFullscreen(false);
        }
      }
    });

    // 共享布局状态数据
    const layoutProvide = computed(() => {
      return {
        isMobile: isMobile.value,
        collapse: props.collapse,
        sideNavCollapse: props.sideNavCollapse,
        isTopMenu: isTopMenu.value,
        isMixSideMenu: false,
        bodyFullscreen: props.bodyFullscreen,
        contentFullscreen: props.contentFullscreen,
        showTabs: false,
        haveSideMenuData: !!sideMenuData.value.length,
        styleResponsive: props.styleResponsive
      };
    });
    provide(LAYOUT_KEY, layoutProvide);

    return {
      tabData,
      levelData,
      sideNavData,
      sideMenuData,
      sideMenuActive,
      sideMenuOpen,
      headMenuData,
      headMenuActive,
      tabActive,
      hideFooter,
      homeRouteTitle,
      showSideMenu,
      layoutClass,
      sideMenuCollapse,
      sideNavTheme,
      sideMenuTheme,
      showHeadLeftTool,
      showTabRefresh,
      contentRef,
      updateCollapse,
      updateSideNavCollapse,
      updateBodyFullscreen,
      onTabChange,
      onTabRemove,
      onTabRemoveAll,
      onTabRemoveLeft,
      onTabRemoveRight,
      onTabRemoveOther,
      onTabContextMenu,
      onTabSortChange,
      reloadPage,
      onLogoClick,
      onSideMenuTitleClick,
      onSideNavTitleClick,
      onHeadMenuTitleClick,
      getContentElem
    };
  }
});
</script>
