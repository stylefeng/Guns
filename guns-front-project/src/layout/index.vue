<template>
  <guns-layout
    :menus="menus"
    :tabs="tabs"
    :collapse="collapse"
    :side-nav-collapse="sideNavCollapse"
    :body-fullscreen="bodyFullscreen"
    :show-footer="showFooter"
    :head-style="headStyle"
    :side-style="sideStyle"
    :layout-style="layoutStyle"
    :side-menu-style="sideMenuStyle"
    :fixed-body="fixedBody"
    :body-full="bodyFull"
    :logo-auto-size="logoAutoSize"
    :side-unique-open="sideUniqueOpen"
    :project-name="projectName"
    :hide-footers="HIDE_FOOTERS"
    :hide-sidebars="HIDE_SIDEBARS"
    :repeatable-tabs="REPEATABLE_TABS"
    :home-title="HOME_TITLE || t('layout.home')"
    :home-path="HOME_PATH"
    :layout-path="LAYOUT_PATH"
    :redirect-path="REDIRECT_PATH"
    :tab-sortable="true"
    :locale="locale"
    :i18n="i18n"
    :side-default-openeds="sideDefaultOpeneds"
    @update:collapse="updateCollapse"
    @update:side-nav-collapse="updateSideNavCollapse"
    @update:body-fullscreen="updateBodyFullscreen"
    @tab-add="addPageTab"
    @tab-remove="removePageTab"
    @tab-remove-all="removeAllPageTab"
    @tab-remove-left="removeLeftPageTab"
    @tab-remove-right="removeRightPageTab"
    @tab-remove-other="removeOtherPageTab"
    @tabSortChange="setPageTabs"
    @reload-page="reloadPageTab"
    @logo-click="onLogoClick"
    @screen-size-change="screenSizeChange"
    @set-home-components="setHomeComponents"
    @tab-context-menu="onTabContextMenu"
  >
    <!-- 路由出口 -->
    <router-layout />
    <!-- logo 图标 -->
    <template #logo>
      <img :src="logo" alt="logo" />
    </template>
    <!-- 顶栏左侧 -->
    <template #left>
      <div class="guns-admin-header-tool-title" v-if="currentMenuData?.title">
        <i :class="'f-s-24 iconfont ' + currentMenuData.icon + '-p'" style="color: #6698ff"></i>
        <span class="menu-title">{{ currentMenuData?.title }}</span>
      </div>
    </template>
    <!-- 顶栏右侧区域 -->
    <template #right>
      <header-tools />
    </template>
    <!-- 全局页脚 -->
    <template #footer>
      <page-footer />
    </template>
    <!-- 菜单图标 -->
    <template #icon="{ icon }">
      <i :class="'iconfont ' + icon"></i>
    </template>
    <!-- 自定义菜单标题增加徽章、小红点 -->
    <template #title="{ item }">
      <menu-title :item="item" />
    </template>
    <template #top-title="{ item }">
      <menu-title :item="item" />
    </template>
    <template #nav-title="{ item }">
      <menu-title :item="item" />
    </template>
  </guns-layout>
</template>

<script setup>
import { computed, onMounted, ref, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/modules/user';
import { useThemeStore } from '@/store/modules/theme';
import RouterLayout from '@/components/RouterLayout/index.vue';
import HeaderTools from './components/header-tools.vue';
import PageFooter from './components/page-footer.vue';
import MenuTitle from './components/menu-title.vue';
import {
  HIDE_SIDEBARS,
  HIDE_FOOTERS,
  REPEATABLE_TABS,
  HOME_TITLE,
  HOME_PATH,
  LAYOUT_PATH,
  REDIRECT_PATH,
  I18N_ENABLE
} from '@/config/setting';
import {
  addPageTab,
  removePageTab,
  removeAllPageTab,
  removeLeftPageTab,
  removeRightPageTab,
  removeOtherPageTab,
  reloadPageTab,
  setHomeComponents,
  setPageTabs
} from '@/utils/page-tab-util';
import { eachTreeData } from '@/utils/common/menu-util';
import { useSystemStore } from '@/store/modules/system';
import GunsLayout from '@/components/layout/index.vue';
import { getRouteMatched } from '@/components/layout/util';

const { currentRoute, push } = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const userStore = useUserStore();
const themeStore = useThemeStore();

// 页面左上角logo链接和显示的系统名称
const logo = ref('');

// 项目名
const projectName = ref(import.meta.env.VITE_APP_NAME);

// 菜单数据
const { menus } = storeToRefs(userStore);
// 加载store数据
let systemStore = useSystemStore();

// 布局风格
const {
  tabs,
  collapse,
  sideNavCollapse,
  bodyFullscreen,
  showFooter,
  headStyle,
  sideStyle,
  layoutStyle,
  sideMenuStyle,
  fixedBody,
  bodyFull,
  logoAutoSize,
  sideUniqueOpen
} = storeToRefs(themeStore);

// 当前菜单数据
const currentMenuData = computed(() => {
  const { path, fullPath, meta } = unref(currentRoute);
  const { icon, title } = getRouteMatched(path, fullPath, meta, menus.value);
  return { icon, title };
});

/* 侧栏折叠切换 */
const updateCollapse = value => {
  themeStore.setCollapse(value);
};

/* 双侧栏一级折叠切换 */
const updateSideNavCollapse = value => {
  themeStore.setSideNavCollapse(value);
};

/* 内容区域全屏切换 */
const updateBodyFullscreen = value => {
  themeStore.setBodyFullscreen(value);
};

/* logo 点击事件 */
const onLogoClick = isHome => {
  isHome || push(LAYOUT_PATH);
};

/* 监听屏幕尺寸改变 */
const screenSizeChange = () => {
  themeStore.updateScreenSize();
};

/* 页签右键菜单点击事件 */
const onTabContextMenu = ({ key, tabKey, item, active }) => {
  switch (key) {
    case 'reload': // 刷新
      reloadPageTab({
        isHome: !item,
        fullPath: item?.fullPath ?? tabKey
      });
      break;
    case 'close': // 关闭当前
      removePageTab({
        key: item?.fullPath ?? tabKey,
        active
      });
      break;
    case 'left': // 关闭左侧
      removeLeftPageTab({
        key: tabKey,
        active
      });
      break;
    case 'right': // 关闭右侧
      removeRightPageTab({
        key: tabKey,
        active
      });
      break;
    case 'other': // 关闭其他
      removeOtherPageTab({
        key: tabKey,
        active
      });
      break;
  }
};

/* 菜单标题国际化 */
const i18n = (_path, key) => {
  if (!I18N_ENABLE || !key) {
    return;
  }
  const k = 'route.' + key + '._name';
  const title = t(k);
  if (title !== k) {
    return title;
  }
};

/* 默认展开菜单 */
const sideDefaultOpeneds = computed(() => {
  const openeds = [];
  eachTreeData(menus.value, d => {
    if (d.children?.length) {
      openeds.push(d.path);
    }
  });
  return openeds;
});

onMounted(async () => {
  // 加载主题信息，logo和左上角的项目名
  let result = await systemStore.loadThemeInfo();
  logo.value = result.gunsMgrLogo;
  projectName.value = result.gunsMgrName;
});
</script>

<script>
import * as MenuIcons from './menu-icons';

export default {
  name: 'GunsLayout',
  components: MenuIcons
};
</script>

<style lang="less">
// 侧栏菜单徽章样式，定位在右侧垂直居中并调小尺寸
.guns-menu-badge {
  position: absolute;
  top: 50%;
  right: 14px;
  line-height: 1;
  margin-top: -9px;
  font-size: 0;

  .ant-badge-count {
    height: 18px;
    line-height: 18px;
    border-radius: 9px;
    box-shadow: none;
    min-width: 18px;
    padding: 0 4px;
  }

  .ant-scroll-number-only {
    height: 18px;

    & > p.ant-scroll-number-only-unit {
      height: 18px;
    }
  }
}

// 父级菜单标题中右侧多定位一点，避免与箭头重合
.ant-menu-submenu-title > .ant-menu-title-content .guns-menu-badge {
  right: 36px;
}

// 折叠悬浮中样式调整
.ant-menu-submenu-popup {
  .ant-menu-submenu-title > .ant-menu-title-content .guns-menu-badge {
    right: 30px;
  }
}

// 顶栏菜单标题中样式调整
.guns-admin-header-nav > .ant-menu {
  & > .ant-menu-item,
  & > .ant-menu-submenu > .ant-menu-submenu-title {
    & > .ant-menu-title-content .guns-menu-badge {
      position: static;
      right: auto;
      top: auto;
      display: inline-block;
      vertical-align: 5px;
      margin: 0 0 0 4px;
    }
  }
}

// 双侧栏时一级侧栏菜单中样式调整，定位在右上角
.guns-admin-sidebar-nav-menu > .ant-menu {
  & > .ant-menu-item,
  & > .ant-menu-submenu > .ant-menu-submenu-title {
    & > .ant-menu-title-content .guns-menu-badge {
      top: 0;
      right: 0;
      margin: 0;
    }
  }
}

// 菜单折叠后在 tooltip 中不显示徽章
.ant-tooltip-inner .guns-menu-badge {
  display: none;
}

// 分组菜单标题
.ant-menu-item-group-title {
  position: relative;
  font-size: 12px !important;
  background: rgba(0, 0, 0, 0.02);
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
</style>
