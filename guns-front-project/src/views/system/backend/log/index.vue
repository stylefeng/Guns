<template>
  <div class="guns-layout" :class="[{ 'guns-collapse': !isCollapse }]">
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
              <div v-permission="['SECURITY_LOG']">
                <a-menu-item key="4"> 安全日志 </a-menu-item>
              </div>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="toggleCollapse()">
        <CaretRightOutlined v-if="isCollapse" />
        <CaretLeftOutlined v-else />
      </div>
    </div>
    <div class="collapse-mask" @click="toggleCollapse()"></div>
    <div class="guns-layout-content">
      <!-- 业务日志 -->
      <BusinessLog v-if="currentMenuSelect == '1'" :isCollapse="isCollapse"/>
      <!-- 登录日志 -->
      <LoginLog v-if="currentMenuSelect == '2'"/>
      <!-- 操作日志 -->
      <OperateLog v-if="currentMenuSelect == '3'"/>
      <!-- 安全 -->
      <SecurityLog v-if="currentMenuSelect == '4'" :isCollapse="isCollapse"/>
    </div>
  </div>
</template>

<script setup name="SystemLog">
import { useUserStore } from '@/store/modules/user';
import { ref, defineAsyncComponent, onMounted, computed } from 'vue';

defineOptions({
  name: 'SystemLog',
})

const userStore = useUserStore();

// 业务日志
const BusinessLog = defineAsyncComponent(() => import('./business-log/index.vue'));
// 登录日志
const LoginLog = defineAsyncComponent(() => import('./login-log/index.vue'));
// 操作日志
const OperateLog = defineAsyncComponent(() => import('./operate-log/index.vue'));
// 安全日志
const SecurityLog = defineAsyncComponent(() => import('./security-log/index.vue'));

// 左侧菜单展开列表
const openKeys = ref(['1']);
// 左侧菜单选中列表
const selectedKeys = ref([]);

// 当前菜单选中
const currentMenuSelect = ref('');

// 是否显示折叠按钮
const isCollapse = ref(false);

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
  } else if (authorities.value.includes('SECURITY_LOG')) {
    key = '4';
  }
  if (key) {
    selectedKeys.value = [key];
    selectChange({ key });
  }
});

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped lang="less">
@import url('@/styles/commonMenu.less');
.guns-layout-sidebar {
  width: v-bind('isCollapse ? 0 : "252px"');
  padding: v-bind('isCollapse ? 0 : "12px"');
}
</style>
