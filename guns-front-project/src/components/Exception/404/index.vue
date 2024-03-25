<template>
  <div style="padding-top: 80px">
    <a-result status="404" title="404" sub-title="抱歉, 你访问的页面不存在.">
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
    name: 'Exception404'
  };
</script>
