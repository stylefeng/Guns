<template>
  <div class="user-info-card">
    <div class="user-info-card-header">
      <div class="user-info-card-header-title">
        <span>个人信息</span>
      </div>
      <div class="user-info-card-header-icon" @click="toPersonal">
        <iconfont font-size="34px" color="#2a82e4" icon-class="icon-opt-bianji" title="编辑" font-weight="bold"> </iconfont>
      </div>
    </div>

    <div class="user-info-card-body">
      <div class="user-info-profile-photo">
        <a-avatar :size="110" :src="userDetail.avatarWrapper" />
      </div>
      <div class="user-info-profile">
        <div class="user-info-profile-info">
          <div class="title">
            <span>姓名：{{ userDetail.realName }}</span>
          </div>
          <div class="title">
            <span>账号：{{ userDetail.account }}</span>
          </div>
          <div class="title">
            <span>公司：{{ userCurrentSelectCompanyInfo.companyName }}</span>
            <a-button type="link" @click="switchCompany">切换当前公司</a-button>
          </div>
          <div class="title">
            <span>邮箱：{{ userDetail.email }}</span>
          </div>
          <div class="title">
            <span>电话：{{ userDetail.phone }}</span>
          </div>
        </div>
      </div>
    </div>

    <SwitchCompany v-if="showSwitchCompany" v-model:visible="showSwitchCompany" :selectOrgId="selectOrgId"></SwitchCompany>
  </div>
</template>

<script setup name="UserInfoComponents">
import { onMounted, ref } from 'vue';
import { PersonInfoApi } from '@/views/index/api/PersonInfoApi';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
import SwitchCompany from './switch-company.vue';
import Iconfont from '@/components/common/IconFont/index.vue';

// router
const router = useRouter();

// store
const userStore = useUserStore();

// 用户详情
const userDetail = ref({});

// 用户当前公司信息
const userCurrentSelectCompanyInfo = ref({});

// 是否显示切换公司
const showSwitchCompany = ref(false);

// 选中的公司id
const selectOrgId = ref('');

/**
 * 切换公司
 */
const switchCompany = () => {
  showSwitchCompany.value = true;
};

/**
 * 获取个人信息详情
 */
const getUserInfo = () => {
  PersonInfoApi.getUserInfo().then(res => {
    userDetail.value = res;
  });
};

/**
 * 跳转至个人信息页
 */
const toPersonal = () => {
  // const {href} = router.resolve('/index/personal');
  // window.open(href, '_blank');
  router.push({
    path: '/index/personal'
  });
};

onMounted(() => {
  getUserInfo();

  // 从 store 获取 用户组织机构信息
  let userOrgInfoList = userStore.info.userOrgInfoList;
  let filter = userOrgInfoList.filter(item => item.currentSelectFlag);
  if (filter.length === 1) {
    userCurrentSelectCompanyInfo.value = filter[0];

    selectOrgId.value = userCurrentSelectCompanyInfo.value.orgId;
  }
});
</script>

<style scoped lang="less">
.user-info-card {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 6px hsla(0, 0%, 80%, 0.5);
  border-radius: 4px;
  padding: 10px;
  //padding-left: 25px;
  //padding-right: 25px;
  //padding-top: 10px;
}

.user-info-card-header {
  width: 100%;
  height: 50px;
  border-bottom: 1px #999999 solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info-card-header-title {
  font-size: 18px;
  font-weight: 500;
}

.user-info-card-header-icon {
  cursor: pointer;
  font-size: 24px;
  color: #2a82e4;
}

.user-info-card-body {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;
  padding-top: 15px;
}

.user-info-profile {
  width: 100%;
  height: 100%;
  padding-left: 15px;
}

.user-info-profile-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  color: #505050;
  font-size: 18px;
  line-height: 30px;
}
</style>
