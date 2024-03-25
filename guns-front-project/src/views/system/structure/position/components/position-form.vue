<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="职位名称:" name="positionName">
          <a-input v-model:value="form.positionName" allow-clear placeholder="请输入职位名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="职位编码:" name="positionCode">
          <a-input v-model:value="form.positionCode" allow-clear placeholder="请输入职位编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="positionSort">
          <a-input-number
            v-model:value="form.positionSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
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

<script setup name="PositionForm">
import { reactive } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object
});

// 验证规则
const rules = reactive({
  positionName: [{ required: true, message: '请输入职位名称', type: 'string', trigger: 'blur' }],
  positionCode: [{ required: true, message: '请输入职位编码', type: 'string', trigger: 'blur' }],
  positionSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }]
});
</script>

<style></style>
