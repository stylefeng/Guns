<template>
  <HomeLayout>
    <div class="main">
      <div class="body">
        <div class="guns-card column-flex">
          <div class="avatar">
            <a-avatar :size="110" :src="userInfo.avatarWrapper" />
          </div>
          <div class="name">
            <span>{{ userInfo.realName }}</span>
          </div>
          <div class="divider"></div>

          <div
            class="menu-item"
            :class="item.key === activationKey ? 'menu-item-activation' : ''"
            v-for="item in menuList"
            :key="item.key"
            @click="changeKey(item.key)"
          >
            <icon-font font-size="40px" :icon-class="item.icon" color=""></icon-font>
            <span>{{ item.title }}</span>
          </div>
        </div>

        <div class="guns-card">
          <div class="right-body">
            <!--修改基本信息-->
            <update-user-info v-if="activationKey === 'base' && userInfo.account" :data="userInfo"></update-user-info>
            <!--修改头像-->
            <update-avatar v-if="activationKey === 'avatar'"></update-avatar>
            <!--修改密码-->
            <update-password v-if="activationKey === 'password'"></update-password>
            <!-- 我的消息 -->
            <my-notice v-if="activationKey === 'notice'"></my-notice>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script setup name="UserInfo">
import { onMounted, ref, watch } from 'vue';
import { PersonInfoApi } from '@/views/index/api/PersonInfoApi';
import IconFont from '@/components/common/IconFont/index.vue';
import UpdatePassword from '@/views/index/form/update-password.vue';
import UpdateAvatar from '@/views/index/form/update-avatar.vue';
import UpdateUserInfo from '@/views/index/form/update-user-info.vue';
import HomeLayout from '@/homeLayout/index.vue';
import MyNotice from '@/views/index/form/my-notice.vue';
import { useNoticeStore } from '@/store/modules/notice';

const noticeStore = useNoticeStore();

// 用户信息
const userInfo = ref({});

// 选中激活的左侧菜单的key
const activationKey = ref('base');

// 左侧菜单列表
const menuList = ref([
  { key: 'base', title: '基本信息', icon: 'icon-xiala-gerenxinxi' },
  { key: 'avatar', title: '修改头像', icon: 'icon-xiala-xiugaitouxiang' },
  { key: 'password', title: '修改密码', icon: 'icon-xiala-xiugaimima' },
  { key: 'notice', title: '我的消息', icon: 'icon-nav-tongzhi' }
]);

/**
 * 获取个人信息
 */
const getPersonalData = async () => {
  let res = await PersonInfoApi.getUserInfo();
  userInfo.value = res;
};

/**
 * 左侧菜单点击
 * @param key
 */
const changeKey = key => {
  activationKey.value = key;
};

onMounted(() => {
  getPersonalData();
});

watch(
  () => noticeStore.isMore,
  val => {
    if (val) {
      activationKey.value = 'notice';
      noticeStore.setIsMore(false);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="less">
.main {
  padding: 3em 0;
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.body {
  width: 1200px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1em;
}

.avatar {
  margin: 30px 0;
}

.name {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 30px;
}

.divider {
  width: 100%;
  height: 1px;
  border: 1px #ededed solid;
  margin-bottom: 45px;
}

.menu-item {
  width: 100%;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #383838;

  > span {
    margin-left: 10px;
  }
}

.menu-item:hover {
  color: #2a82e4;
}

.menu-item-activation {
  color: #2a82e4;
}

.right-body {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
}

.guns-card {
  min-height: 656px;
  background: #fff;
  box-shadow: 0 0 6px hsla(0, 0%, 80%, 0.5);
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  justify-content: flex-start;
  padding: 1.5em 0;
  height: 800px;
}

.column-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
