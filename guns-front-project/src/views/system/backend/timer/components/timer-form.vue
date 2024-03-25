<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="任务名称:" name="timerName">
          <a-input v-model:value="form.timerName" allow-clear placeholder="请输入任务名称" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="任务job:" name="actionClass">
          <a-select :loading="actionClassListLoading" showSearch placeholder="请选择任务job" v-model:value="form.actionClass" allow-clear>
            <a-select-option v-for="item in actionClassList" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="cron:" name="cron">
          <a-input v-model:value="form.cron" placeholder="请输入任务cron表达式" allow-clear />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="任务参数:" name="params">
          <a-input v-model:value="form.params" placeholder="请输入任务参数" allow-clear />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="备注">
          <a-textarea v-model:value="form.remark" placeholder="请输入备注" :rows="4" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="TimerForm">
import { reactive, onMounted, ref } from 'vue';
import { SysTimerApi } from '../api/SysTimerApi';

const props = defineProps({
  // 表单数据
  form: Object
});

// 验证规则
const rules = reactive({
  timerName: [{ required: true, message: '请输入任务名称', type: 'string', trigger: 'blur' }],
  cron: [{ required: true, message: '请输入cron任务表达式', type: 'string', trigger: 'blur' }],
  actionClass: [{ required: true, message: '请选择任务job', type: 'string', trigger: 'blur' }]
});
// 加载动画
const actionClassListLoading = ref(false);
// 任务job列表
const actionClassList = ref([]);

onMounted(() => {
  // 获取定时任务执行class
  actionClassListLoading.value = true;
  SysTimerApi.getActionClasses()
    .then(res => {
      actionClassList.value = res;
    })
    .finally(() => (actionClassListLoading.value = false));
});
</script>

<style></style>
