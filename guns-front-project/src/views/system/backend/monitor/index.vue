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
              <template #title>监控管理</template>
              <div v-permission="['SQL_MONITOR']">
                <a-menu-item key="1">SQL监控</a-menu-item>
              </div>
              <div v-permission="['SERVER_MONITOR']">
                <a-menu-item key="2"> 服务器信息 </a-menu-item>
              </div>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
    <div class="guns-layout-content">
      <!-- 服务器信息 -->
      <Server v-if="currentMenuSelect == '2'" />
    </div>
  </div>
</template>

<script setup name="SystemMonitor">
import { useUserStore } from '@/store/modules/user';
import { SQL_MONITOR_URL } from '@/config/setting';
import { ref, defineAsyncComponent, onMounted, computed } from 'vue';

const userStore = useUserStore();

// 业务日志
const Server = defineAsyncComponent(() => import('./server.vue'));

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
  if (key == '1') {
    window.open(SQL_MONITOR_URL);
  } else {
    currentMenuSelect.value = key;
  }
  selectedKeys.value = ['2'];
};

// 设置展开
const openChange = () => {
  openKeys.value = ['1'];
};

onMounted(() => {
  let key = '';
  selectedKeys.value = [];
  if (authorities.value.includes('SQL_MONITOR')) {
    key = '1';
  }
  if (authorities.value.includes('SERVER_MONITOR')) {
    key = '2';
    selectedKeys.value = [key];
  }
  if (key) {
    selectChange({ key });
  }
});
</script>

<style scoped lang="less">
@import url('@/styles/commonMenu.less');
</style>
