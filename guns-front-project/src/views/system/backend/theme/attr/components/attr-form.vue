<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="属性名称:" name="fieldName">
          <a-input v-model:value="form.fieldName" placeholder="请输入属性名称" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="属性编码:" name="fieldCode">
          <a-input v-model:value="form.fieldCode" placeholder="请输入属性编码" allow-clear autocomplete="off" :disabled="isUpdate" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="属性类型:" name="fieldType">
          <a-select v-model:value="form.fieldType" placeholder="请选择属性类型" allow-clear autocomplete="off">
            <a-select-option value="string">字符类型</a-select-option>
            <a-select-option value="file">文件类型</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="是否必填" name="fieldRequired">
          <a-select v-model:value="form.fieldRequired" placeholder="请选择是否必填" allow-clear autocomplete="off">
            <a-select-option value="Y">必填</a-select-option>
            <a-select-option value="N">非必填</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="属性长度" name="fieldLength" v-if="showFieldLength">
          <a-input-number v-model:value="form.fieldLength" style="width: 100%" palceholder="请输入属性长度" allow-clear autocomplete />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="属性描述" name="fieldDescription">
          <a-textarea v-model:value="form.fieldDescription" placeholder="请输入属性描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="AttrForm">
import { reactive, computed } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object,
  isUpdate: Boolean
});

// 验证规则
const rules = reactive({
  fieldName: [{ required: true, message: '请输入属性名称', type: 'string', trigger: 'blur' }],
  fieldCode: [{ required: true, message: '请输入属性编码', type: 'string', trigger: 'blur' }],
  fieldType: [{ required: true, message: '请输入属性类型', type: 'string', trigger: 'blur' }],
  fieldRequired: [{ required: true, message: '请选择是否必填', type: 'string', trigger: 'blur' }],
  fieldLength: [{ message: '请输入属性长度', type: 'number', trigger: 'blur' }],
  fieldDescription: [{ message: '请输入属性描述', type: 'string', trigger: 'blur' }]
});

/**
 * 属性长度是否禁用，当点击文件类型时禁用
 *
 * @author fengshuonan
 * @date 2022/1/1 14:53
 */
const showFieldLength = computed(() => {
  if (props.form.fieldType === 'file') {
    return false;
  } else {
    return true;
  }
});
</script>

<style></style>
