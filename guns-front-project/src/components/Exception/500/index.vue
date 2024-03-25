<template>
  <div style="padding-top: 80px">
    <a-result status="500" title="500" sub-title="抱歉, 服务器出错了.">
      <template #extra>
        <router-link to="/">
          <a-button type="primary">返回首页</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script>
  export default {
    name: 'Exception500'
  };
</script>
