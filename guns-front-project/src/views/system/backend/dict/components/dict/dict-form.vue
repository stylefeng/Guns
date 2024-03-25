<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="所属字典类型:" name="dictTypeName">
          <a-input v-model:value="form.dictTypeName" allow-clear placeholder="请输入所属字典类型" disabled />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典名称:" name="dictName">
          <a-input v-model:value="form.dictName" allow-clear placeholder="请输入字典名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典编码(字典值):" name="dictCode">
          <a-input v-model:value="form.dictCode" allow-clear placeholder="请输入字典编码" :disabled="props.isUpdate" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级字典:" name="dictParentId">
          <a-tree-select
            v-model:value="form.dictParentId"
            style="width: 100%"
            showSearch
            :tree-data="props.dictList"
            treeNodeFilterProp="dictName"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择上级字典"
            :fieldNames="{ children: 'children', label: 'dictName', key: 'dictId', value: 'dictId' }"
            allow-clear
            :disabled="props.isUpdate"
            tree-default-expand-all
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="dictSort">
          <a-input-number
            v-model:value="form.dictSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典简称:" name="dictShortName">
          <a-input v-model:value="form.dictShortName" allow-clear placeholder="请输入字典简称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典简要编码:" name="dictShortCode">
          <a-input v-model:value="form.dictShortCode" allow-clear placeholder="请输入字典简要编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="字典状态:" name="statusFlag">
          <a-radio-group v-model:value="form.statusFlag">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="DictForm">
import { reactive } from 'vue';
import { TreeSelect as ATreeSelect } from 'ant-design-vue';

const props = defineProps({
  // 表单数据
  form: Object,
  isUpdate: Boolean,
  dictList: Array
});

// 验证规则
const rules = reactive({
  dictName: [{ required: true, message: '请输入字典名称', type: 'string', trigger: 'blur' }],
  dictCode: [{ required: true, message: '请输入字典编码', type: 'string', trigger: 'blur' }],
  dictSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  statusFlag: [{ required: true, message: '请选择字典状态', type: 'number', trigger: 'change' }],
  sysFlag: [{ required: true, message: '请选择是否是系统配置', type: 'string', trigger: 'change' }],
  dictParentId: [{ required: true, message: '请选择上级字典', type: 'string', trigger: 'change' }]
});
</script>

<style></style>
