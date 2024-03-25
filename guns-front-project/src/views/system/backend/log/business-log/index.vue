<template>
  <div class="guns-layout">
    <business-log-list
      v-if='type === "list"'
      @update-type='updateType'>
    </business-log-list>

    <business-log-detail
      v-if='type === "detail" && businessLogId'
      :business-log-id='businessLogId'
      @update-type='updateType'></business-log-detail>
  </div>
</template>

<script setup name='BusinessLogIndex'>
import { ref } from 'vue';
import BusinessLogList from '@/views/system/backend/log/business-log/components/list.vue';
import BusinessLogDetail from '@/views/system/backend/log/business-log/components/detail.vue';

// 类型 根据类型加载组件
const type = ref('list');

// 业务日志id
const businessLogId = ref('');

const updateType = (obj) => {
  type.value = obj.type;
  businessLogId.value = obj.businessLogId;
};
</script>

<style scoped lang='less'>
</style>
