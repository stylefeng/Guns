<template>
  <a-spin />
</template>

<script>
import router from '@/router';
import { defineComponent } from 'vue';
import { SsoUtil } from '@/utils/common/sso-util';
import { message } from 'ant-design-vue';
import { setToken } from '@/utils/token-util';
import { cleanPageTabs } from '@/utils/page-tab-util';

export default defineComponent({
  name: 'Sso',
  setup() {
    // 获取到url上单点登录服务端返回的token
    const caToken = SsoUtil.getUrlParam('token');

    // 单点成功后，继续业务的地址，可用可不用
    const callback = SsoUtil.getUrlParam('callback');

    // 获取是单点跳转过来，还是oauth2直接跳转过来
    const ssoFrom = SsoUtil.getUrlParam('from');

    // 跳转到首页
    const goHome = () => {
      if (router.query && router.query.from) {
        router.push(String(router.query.from));
      } else {
        router.push('/').catch(() => {});
      }
    };

    // 如果是来自oauth2的直接根据token进行登录
    if (ssoFrom && ssoFrom === 'oauth2') {
      message.success('登录成功');
      setToken(caToken, true);
      cleanPageTabs();
      goHome();
    } else {
      // 将caToken转化为系统可以识别的token（通过全局会话创建局部会话）
      SsoUtil.tokenExchange(caToken).then(result => {
        message.success('登录成功');
        setToken(result.token, true);
        cleanPageTabs();
        goHome();
      });
    }
  }
});
</script>
