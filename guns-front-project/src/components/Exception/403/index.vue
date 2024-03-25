<template>
  <div style="padding-top: 80px">
    <a-result status="403" title="403" sub-title="抱歉, 你无权访问该页面.">
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
    name: 'Exception403'
  };
</script>
