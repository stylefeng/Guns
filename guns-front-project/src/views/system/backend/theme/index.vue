<template>
  <div class="guns-layout">
    <div class="guns-layout-sidebar">
      <div class="sidebar-content">
        <div class="sidebar-content">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            class="sidebar-menu"
            mode="inline"
            :open-keys="openKeys"
            @select="selectChange"
            @openChange="openChange"
          >
            <a-sub-menu key="1">
              <template #title>主题配置</template>
              <div v-permission="['THEME_MANAGER']">
                <a-menu-item key="1"> 主题管理 </a-menu-item>
              </div>
              <div v-permission="['THEME_TEMPLATE']">
                <a-menu-item key="2"> 主题模板 </a-menu-item>
              </div>
              <div v-permission="['THEME_ATTR']">
                <a-menu-item key="3"> 主题属性 </a-menu-item>
              </div>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
    <div class="guns-layout-content">
      <!-- 主题管理 -->
      <ThemeManager v-if="currentMenuSelect == '1'" />
      <!-- 主题模板 -->
      <ThemeTemplate v-if="currentMenuSelect == '2'" />
      <!-- 主题属性 -->
      <ThemeAttr v-if="currentMenuSelect == '3'" />
    </div>
  </div>
</template>

<script setup name="SystemTheme">
import { useUserStore } from '@/store/modules/user';
import { ref, defineAsyncComponent, onMounted, computed } from 'vue';

const userStore = useUserStore();

// 主题管理
const ThemeManager = defineAsyncComponent(() => import('./manager/index.vue'));
// 主题模板
const ThemeTemplate = defineAsyncComponent(() => import('./template/index.vue'));
// 主题属性
const ThemeAttr = defineAsyncComponent(() => import('./attr/index.vue'));

// 左侧菜单展开列表
const openKeys = ref(['1']);
// 左侧菜单选中列表
const selectedKeys = ref([]);

// 当前菜单选中
const currentMenuSelect = ref('');

// 权限列表
const authorities = computed(() => {
  return userStore.authorities ?? [];
});

// 左侧菜单选中
const selectChange = ({ key }) => {
  currentMenuSelect.value = key;
};

// 设置展开
const openChange = () => {
  openKeys.value = ['1'];
};

onMounted(() => {
  let key = '';
  selectedKeys.value = [];
  if (authorities.value.includes('THEME_MANAGER')) {
    key = '1';
  } else if (authorities.value.includes('THEME_TEMPLATE')) {
    key = '2';
  } else if (authorities.value.includes('THEME_ATTR')) {
    key = '3';
  }
  if (key) {
    selectedKeys.value = [key];
    selectChange({ key });
  }
});
</script>

<style scoped lang="less">
@import url('@/styles/commonMenu.less');
</style>
