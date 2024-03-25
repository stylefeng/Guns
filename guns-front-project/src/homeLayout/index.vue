<template>
  <guns-layout
    :show-collapse="false"
    :show-refresh="false"
    :fixed-sidebar="false"
    :show-breadcrumb="false"
    :collapse="true"
    @logo-click="onLogoClick"
    :project-name="projectName"
    layout-style="top"
    :tab-context-menu="false"
  >
    <slot></slot>

    <!-- logo 图标 -->
    <template #logo>
      <img :src="logo" alt="logo" />
    </template>
    <!-- 顶栏右侧区域 -->
    <template #right>
      <header-tools />
    </template>
    <!-- 全局页脚 -->
    <template #footer>
      <page-footer />
    </template>
  </guns-layout>
</template>

<script setup name="HomeLayout">
import HeaderTools from '@/layout/components/header-tools.vue';
import PageFooter from '@/layout/components/page-footer.vue';
import { LAYOUT_PATH } from '@/config/setting';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useSystemStore } from '@/store/modules/system';
import GunsLayout from '@/components/layout/index.vue';

const { push } = useRouter();
// 加载store数据
let systemStore = useSystemStore();

// 页面左上角logo链接和显示的系统名称
const logo = ref('');

// 项目名
const projectName = ref(import.meta.env.VITE_APP_NAME);

/**
 * logo 点击事件
 * @param isHome
 */
const onLogoClick = isHome => {
  isHome || push(LAYOUT_PATH);
};

onMounted(async () => {
  // 加载主题信息，logo和左上角的项目名
  let result = await systemStore.loadThemeInfo();
  logo.value = result.gunsMgrLogo;
  projectName.value = result.gunsMgrName;
});
</script>

<style scoped lang="less">
:deep(.guns-admin-logo) {
  width: 210px !important;
  padding: 0 !important;
}

:deep(.guns-admin-body) {
  height: calc(100vh - 52px);
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.guns-admin-header) {
  box-shadow: 0px 0px 10px #e8e9ea;
}
</style>
