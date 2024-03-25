<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="配置分类名称:" name="configTypeName">
          <a-input v-model:value="form.configTypeName" allow-clear placeholder="请输入配置分类名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="配置分类编码:" name="configTypeCode">
          <a-input v-model:value="form.configTypeCode" allow-clear placeholder="请输入配置分类编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="configTypeSort">
          <a-input-number
            v-model:value="form.configTypeSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="ConfigTypeForm">
import { reactive } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object
});

// 验证规则
const rules = reactive({
  configTypeName: [{ required: true, message: '请输入配置分类名称', type: 'string', trigger: 'blur' }],
  configTypeCode: [{ required: true, message: '请输入配置分类编码', type: 'string', trigger: 'blur' }],
  configTypeSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }]
});
</script>

<style></style>
