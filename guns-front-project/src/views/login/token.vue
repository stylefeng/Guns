<template>
  <a-spin />
</template>

<script>
import router from '@/router';
import { defineComponent } from 'vue';
import { SsoUtil } from '@/utils/common/sso-util';
import { setToken } from '@/utils/token-util';
import { cleanPageTabs } from '@/utils/page-tab-util';
import { BASE_URL } from '@/config/setting';

export default defineComponent({
  name: 'TokenLogin',
  setup() {
    // 获取到url上别的界面传过来的token
    const userToken = SsoUtil.getUrlParam('userToken');

    // 跳转到首页
    const goHome = () => {
      // 跳转地址加上context-path
      let contextPath = BASE_URL.substring(0, BASE_URL.length - 1);

      // 跳转到指定路径
      if (router.query && router.query.from) {
        window.location.href = contextPath + String(router.query.from);
      } else {
        window.location.href = contextPath;
      }
    };

    setToken(userToken, true);
    cleanPageTabs();
    goHome();
  }
});
</script>
