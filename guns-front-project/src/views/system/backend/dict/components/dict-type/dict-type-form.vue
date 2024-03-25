<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="字典类型名称:" name="dictTypeName">
          <a-input v-model:value="form.dictTypeName" allow-clear placeholder="请输入字典类型名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典类型编码:" name="dictTypeCode">
          <a-input v-model:value="form.dictTypeCode" allow-clear placeholder="请输入字典类型编码" :disabled="props.isUpdate" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典类型:" name="dictTypeClass">
          <a-radio-group v-model:value="form.dictTypeClass">
            <a-radio :value="1">系统类型</a-radio>
            <a-radio :value="2">业务类型</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典类型状态:" name="statusFlag">
          <a-radio-group v-model:value="form.statusFlag">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="dictTypeSort">
          <a-input-number
            v-model:value="form.dictTypeSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="form.dictTypeClass == 2">
        <a-form-item label="业务编码:" name="dictTypeBusCode">
          <a-input v-model:value="form.dictTypeBusCode" allow-clear placeholder="请输入业务编码" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="备注">
          <a-textarea v-model:value="form.dictTypeDesc" placeholder="请输入备注" :rows="4" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="DictTypeForm">
import { reactive } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object,
  isUpdate: Boolean
});

// 验证规则
const rules = reactive({
  dictTypeName: [{ required: true, message: '请输入字典类型名称', type: 'string', trigger: 'blur' }],
  dictTypeCode: [{ required: true, message: '请输入字典类型编码', type: 'string', trigger: 'blur' }],
  dictTypeSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  dictTypeClass: [{ required: true, message: '请选择字典类型', type: 'number', trigger: 'change' }],
  statusFlag: [{ required: true, message: '请选择字典类型状态', type: 'number', trigger: 'change' }]
});
</script>

<style></style>
