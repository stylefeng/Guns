<!-- 顶栏右侧区域 -->
<template>
  <div class="guns-admin-header-tool">
    <!-- 公司切换 -->
    <div class="guns-admin-header-tool-item" v-if="companyData?.companyName" @click="switchCompany">
      <i class="iconfont icon-nav-gongsi f-s-24"></i>
      <span class="company-name">{{ companyData?.companyName }}</span>
    </div>
    <!-- 应用切换 -->
    <div class="guns-admin-header-tool-item" @click="switchApp">
      <i class="iconfont icon-nav-yingyong f-s-24"></i>
    </div>
    <!-- 语言切换 -->
    <div class="guns-admin-header-tool-item" v-if="SHOW_I18n">
      <i18n-icon class="f-s-24" />
    </div>
    <!-- 消息通知 -->
    <div class="guns-admin-header-tool-item">
      <header-notice />
    </div>
    <!-- 用户信息 -->
    <div class="guns-admin-header-tool-item">
      <a-dropdown placement="bottom" :overlay-style="{ minWidth: '120px' }" :trigger="['click']">
        <div class="guns-admin-header-avatar">
          <a-avatar style="background-color: #6f9ae7">
            {{ setName(loginUser.realName) }}
          </a-avatar>
        </div>

        <template #overlay>
          <a-menu :selectable="false" @click="onUserDropClick">
            <a-menu-item key="userinfo">
              <div class="guns-cell">
                <icon-font iconClass="icon-xiala-gerenxinxi" font-size="20px" color="#000"></icon-font>
                <div class="guns-cell-content">
                  {{ t('layout.header.userinfo') }}
                </div>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="password">
              <div class="guns-cell">
                <icon-font iconClass="icon-xiala-xiugaimima" font-size="20px" color="#000"></icon-font>
                <div class="guns-cell-content">
                  {{ t('layout.header.password') }}
                </div>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <div class="guns-cell">
                <icon-font iconClass="icon-xiala-tuichudenglu" font-size="20px" color="#000"></icon-font>
                <div class="guns-cell-content">
                  {{ t('layout.header.logout') }}
                </div>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!-- 主题设置 -->
    <div class="guns-admin-header-tool-item" @click="openSetting" v-if="SHOW_THEME">
      <i class="iconfont icon-nav-gengduopeizhi f-s-24"></i>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <password-modal v-model:visible="passwordVisible" />
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model:visible="settingVisible" />
  <!-- 切换应用抽屉 -->
  <app-switch-modal v-if="showAppVisible" v-model:visible="showAppVisible"></app-switch-modal>
  <!-- 切换公司 -->
  <SwitchCompany v-if="showSwitchCompany" v-model:visible="showSwitchCompany" :selectOrgId="companyData.orgId"></SwitchCompany>
</template>

<script setup>
import { computed, createVNode, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import I18nIcon from './i18n-icon.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import HeaderNotice from './header-notice.vue';
import PasswordModal from './password-modal.vue';
import SettingDrawer from './setting-drawer.vue';
import { useUserStore } from '@/store/modules/user';
import { logout } from '@/utils/page-tab-util';
import { LoginApi } from '@/views/login/login/api/LoginApi';
import { SSO_FLAG, SHOW_THEME, SHOW_I18n } from '@/config/setting';
import { SsoUtil } from '@/utils/common/sso-util';
import { removeToken } from '@/utils/token-util';
import AppSwitchModal from './app-switch-modal.vue';
import SwitchCompany from '@/views/index/components/switch-company.vue';
import { Modal } from 'ant-design-vue';

const { push, resolve } = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

// 是否显示修改密码弹窗
const passwordVisible = ref(false);

// 是否显示主题设置抽屉
const settingVisible = ref(false);

// 是否显示切换应用抽屉
const showAppVisible = ref(false);

// 是否显示切换公司
const showSwitchCompany = ref(false);

// 当前用户信息
const loginUser = computed(() => userStore.info ?? {});

//当前的公司信息
const companyData = computed(() => {
  let userOrgInfoList = userStore.info.userOrgInfoList;
  let filter = userOrgInfoList.filter(item => item.currentSelectFlag);
  if (filter.length > 0) {
    return filter[0];
  }
});

/* 用户信息下拉点击 */
const onUserDropClick = ({ key }) => {
  if (key === 'userinfo') {
    const { href } = resolve('/index/personal');
    window.open(href, '_blank');
  } else if (key === 'password') {
    passwordVisible.value = true;
  } else if (key === 'profile') {
    push('/personal/info');
  } else if (key === 'logout') {
    // 退出登录
    Modal.confirm({
      title: t('layout.logout.title'),
      content: t('layout.logout.message'),
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        // 如果开启了单点登录，跳转到单点的退出
        if (SSO_FLAG) {
          // 清除token
          removeToken();
          // 调用sso退出接口
          SsoUtil.ssoLogoutRedirect();
          clearLocalStorage();
        } else {
          // 调用退出接口
          await LoginApi.logout();
          // 清除缓存token并退出
          logout();
          clearLocalStorage();
        }
      }
    });
  }
};

/* 打开主题设置抽屉 */
const openSetting = () => {
  settingVisible.value = true;
};

// 切换应用
const switchApp = () => {
  showAppVisible.value = true;
};

// 切换公司
const switchCompany = () => {
  showSwitchCompany.value = true;
};

// 设置名称
const setName = realName => {
  let name = realName;
  if (realName && realName.length > 2) {
    name = realName.substr(0, 2);
  }
  return name;
};
// 清除本地缓存
const clearLocalStorage = () => {
  const collapse = localStorage.getItem('collapse');
  localStorage.clear();
  // 保留菜单折叠
  if (collapse) {
    localStorage.setItem('collapse', collapse);
  }
};
</script>

<style scoped lang="less">
.guns-img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.guns-title {
  font-size: 14px;
}
.company-name {
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
