<!-- 顶栏 -->
<template>
  <div :class="['guns-admin-header', { 'guns-admin-header-primary': isPrimary }]">
    <!-- logo -->
    <div class="guns-admin-logo" @click="onLogoClick">
      <slot name="logo"></slot>
      <span v-if="projectName">{{ projectName }}</span>
    </div>
    <!-- 左侧功能区 -->
    <div class="guns-admin-header-tool" v-if="showLeftTool">
      <div v-if="showCollapse && !collapse" class="guns-admin-header-tool-item" @click="toggleCollapse">
        <MenuFoldOutlined v-if="!collapse" />
      </div>
      <div v-if="showRefresh" class="guns-admin-header-tool-item" @click="reloadPage">
        <ReloadOutlined />
      </div>
      <!-- 自定义左侧功能 -->
      <slot name="left"></slot>
    </div>
    <!-- 面包屑导航 -->
    <div v-if="showBreadcrumb" class="guns-admin-breadcrumb">
      <ABreadcrumb :separator="breadcrumbSeparator">
        <ABreadcrumbItem v-for="d in levels" :key="d.fullPath">
          <RouterLink v-if="d.home" :to="d.fullPath">
            <HomeOutlined :title="d.title" />
          </RouterLink>
          <span v-else>{{ d.title }}</span>
        </ABreadcrumbItem>
      </ABreadcrumb>
    </div>
    <!-- 自定义中间区域 -->
    <slot name="center"></slot>
    <!-- 顶部菜单区 -->
    <div class="guns-admin-header-nav">
      <LayoutMenus
        :data="menus"
        :theme="theme"
        mode="horizontal"
        v-if="menus"
        title-slot="top-title"
        :showIcon="false"
        :selected-keys="active"
        @titleClick="onTitleClick"
      >
        <template v-for="name in Object.keys($slots)" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}"></slot>
        </template>
      </LayoutMenus>
    </div>
    <!-- 右侧功能区 -->
    <slot name="right"></slot>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { Breadcrumb as ABreadcrumb, BreadcrumbItem as ABreadcrumbItem, message } from 'ant-design-vue/es';
import LayoutMenus from './layout-menus';

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    ABreadcrumb,
    ABreadcrumbItem,
    LayoutMenus
  },
  props: {
    // 项目名
    projectName: String,
    // 面包屑导航数据
    levels: {
      type: Array,
      required: true
    },
    // 顶栏菜单数据
    menus: {
      type: Array,
      required: true
    },
    // 顶栏菜单选中
    active: {
      type: Array,
      required: true
    },
    // 顶栏风格
    headStyle: String,
    // 是否折叠侧栏
    collapse: Boolean,
    // 是否显示左边功能区
    showLeftTool: Boolean,
    // 是否显示折叠按钮
    showCollapse: Boolean,
    // 是否显示刷新按钮
    showRefresh: Boolean,
    // 是否显示面包屑导航
    showBreadcrumb: Boolean,
    // 面包屑导航分隔符
    breadcrumbSeparator: String
  },
  emits: ['logo-click', 'reload-page', 'toggle-collapse', 'title-click'],
  setup(props, { emit }) {

    // 是否是主色顶栏
    const isPrimary = computed(() => props.headStyle === 'primary');

    // 顶栏菜单主题
    const theme = computed(() => {
      return isPrimary.value ? 'light' : props.headStyle;
    });

    /* 折叠展开侧栏 */
    const toggleCollapse = () => {
      emit('toggle-collapse');
    };

    /* 刷新页面 */
    const reloadPage = () => {
      emit('reload-page');
    };

    /* logo 点击事件 */
    const onLogoClick = () => {
      emit('logo-click');
    };

    /* 菜单父级点击事件 */
    const onTitleClick = (key, item) => {
      emit('title-click', key, item);
    };

    return {
      isPrimary,
      theme,
      toggleCollapse,
      reloadPage,
      onLogoClick,
      onTitleClick,
    };
  }
});
</script>

<style scoped lang="less">
</style>
