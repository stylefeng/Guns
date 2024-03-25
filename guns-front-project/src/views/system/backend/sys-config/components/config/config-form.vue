<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="配置名称:" name="configName">
          <a-input v-model:value="form.configName" allow-clear placeholder="请输入配置名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="配置编码:" name="configCode">
          <a-input v-model:value="form.configCode" allow-clear placeholder="请输入配置编码" :disabled="props.isUpdate" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="是否是系统配置:" name="sysFlag">
          <a-radio-group v-model:value="form.sysFlag">
            <a-radio value="Y">是</a-radio>
            <a-radio value="N">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="配置值">
          <a-textarea v-model:value="form.configValue" placeholder="请输入配置值" :rows="4" />
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

<script setup name="ConfigForm">
import { reactive } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object,
  isUpdate: Boolean
});

// 验证规则
const rules = reactive({
  configName: [{ required: true, message: '请输入配置名称', type: 'string', trigger: 'blur' }],
  configCode: [{ required: true, message: '请输入配置编码', type: 'string', trigger: 'blur' }],
  sysFlag: [{ required: true, message: '请选择是否是系统配置', type: 'string', trigger: 'change' }]
});
</script>

<style></style>
