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
              <template #title>日志查看</template>
              <div v-permission="['BUSINESS_LOG']">
                <a-menu-item key="1"> 业务日志 </a-menu-item>
              </div>
              <div v-permission="['LOG_LOGIN']">
                <a-menu-item key="2"> 登录日志 </a-menu-item>
              </div>
              <div v-permission="['OPERATE_LOG']">
                <a-menu-item key="3"> API日志 </a-menu-item>
              </div>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
    <div class="guns-layout-content">
      <!-- 业务日志 -->
      <BusinessLog v-if="currentMenuSelect == '1'" />
      <!-- 登录日志 -->
      <LoginLog v-if="currentMenuSelect == '2'" />
      <!-- 操作日志 -->
      <OperateLog v-if="currentMenuSelect == '3'" />
    </div>
  </div>
</template>

<script setup name="SystemLog">
import { useUserStore } from '@/store/modules/user';
import { ref, defineAsyncComponent, onMounted, computed } from 'vue';

const userStore = useUserStore();

// 业务日志
const BusinessLog = defineAsyncComponent(() => import('./business-log/index.vue'));
// 登录日志
const LoginLog = defineAsyncComponent(() => import('./login-log/index.vue'));
// 操作日志
const OperateLog = defineAsyncComponent(() => import('./operate-log/index.vue'));

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
  if (authorities.value.includes('BUSINESS_LOG')) {
    key = '1';
  } else if (authorities.value.includes('LOG_LOGIN')) {
    key = '2';
  } else if (authorities.value.includes('OPERATE_LOG')) {
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
