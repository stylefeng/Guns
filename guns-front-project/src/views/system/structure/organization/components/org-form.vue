<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="机构名称:" name="orgName">
          <a-input v-model:value="form.orgName" allow-clear placeholder="请输入机构名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="机构编码:" name="orgCode">
          <a-input v-model:value="form.orgCode" allow-clear placeholder="请输入机构编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级机构：" name="parentOrgName">
          <a-input v-model:value="form.parentOrgName" allow-clear placeholder="请选择上级机构" @focus="parentOrgNameClick" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="orgSort">
          <a-input-number
            v-model:value="form.orgSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="机构类型:" name="orgType">
          <a-radio-group v-model:value="form.orgType">
            <a-radio :value="1">公司</a-radio>
            <a-radio :value="2">部门</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="机构状态:" name="statusFlag">
          <a-radio-group v-model:value="form.statusFlag">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <div class="card-title">其他信息</div>
      </a-col>
      <a-col :span="12">
        <a-form-item label="机构简称:" name="orgShortName">
          <a-input v-model:value="form.orgShortName" allow-clear placeholder="请输入机构简称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="机构税号:" name="taxNo">
          <a-input v-model:value="form.taxNo" allow-clear placeholder="请输入机构税号" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="备注">
          <a-textarea v-model:value="form.remark" placeholder="请输入备注" :rows="4" />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelect"
      v-if="showSelect"
      title="上级机构选择"
      :data="selectData"
      :showTab="['dept']"
      @done="closeSelect"
    />
  </a-form>
</template>

<script setup name="OrgForm">
import { reactive, ref } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object,
  // 是否是编辑
  isUpdate: Boolean
});

// 验证规则
const rules = reactive({
  orgName: [{ required: true, message: '请输入机构名称', type: 'string', trigger: 'blur' }],
  orgCode: [{ required: true, message: '请输入机构编码', type: 'string', trigger: 'blur' }],
  // orgParentId: [{ required: true, message: '请选择上级机构', type: 'string', trigger: 'change' }],
  // parentOrgName: [{ required: true, message: '请选择上级机构', type: 'string', trigger: 'change' }],
  orgSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  orgType: [{ required: true, message: '请选择机构类型', type: 'number', trigger: 'change' }],
  statusFlag: [{ required: true, message: '请选择机构状态', type: 'number', trigger: 'change' }]
});

// 是否显示选择上级机构弹框
const showSelect = ref(false);
// 选择的总数据
const selectData = ref({});

// 上机机构点击
const parentOrgNameClick = () => {
  if (props.form.orgParentId && props.form.parentOrgName) {
    selectData.value.selectOrgList = [{ bizId: props.form.orgParentId, name: props.form.parentOrgName }];
  } else {
    selectData.value.selectOrgList = [];
  }
  showSelect.value = true;
};

// 关闭弹框
const closeSelect = val => {
  if (val.selectOrgList && val.selectOrgList.length > 0) {
    props.form.orgParentId = val.selectOrgList[0].bizId;
    props.form.parentOrgName = val.selectOrgList[0].name;
  } else {
    props.form.orgParentId = '';
    props.form.parentOrgName = '';
  }
};
</script>

<style scoped lang="less">
.card-title {
  width: 100%;
  border-left: 5px solid;
  border-color: var(--primary-color);
  padding-left: 10px;
  margin-bottom: 20px;
}
</style>
