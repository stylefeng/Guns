<template>
  <layout-config-provider :locale="eleLocale" :request="request" :response="response" :keep-alive="keepAlive">
    <a-config-provider :locale="antLocale">
      <router-view />
    </a-config-provider>
  </layout-config-provider>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, unref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocale } from '@/i18n/use-locale';
import { useThemeStore } from '@/store/modules/theme';
import { useSystemStore } from '@/store/modules/system';
import { useSetDocumentTitle } from '@/utils/document-title-util';
import { TAB_KEEP_ALIVE } from '@/config/setting';
import LayoutConfigProvider from '@/components/layout/layout-config-provider/index';

// 恢复主题
const themeStore = useThemeStore();
themeStore.recoverTheme();

const systemStore = useSystemStore();

// 切换路由自动更新浏览器页签标题
useSetDocumentTitle();

// 国际化配置
const { antLocale, eleLocale } = useLocale();

// 用于内链 iframe 组件获取 KeepAlive
const { showTabs } = storeToRefs(themeStore);
const keepAlive = computed(() => TAB_KEEP_ALIVE && unref(showTabs));

// table通用请求参数
const request = ref({
  sortName: 'orderBy', // 排序字段参数名称
  orderName: 'sortBy' // 排序方式的参数名称
});

// table通用响应参数解析
const response = ref({
  dataName: 'rows', // 数据列表的字段名称，支持嵌套，例如：result.list
  countName: 'totalRows' // 数据总数的字段名称，支持嵌套
});

onMounted(async () => {
  let result = await systemStore.loadThemeInfo();
  let faviconUrl = result.gunsMgrFavicon;
  await nextTick();
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
});
</script>

<style lang="less" scoped></style>
