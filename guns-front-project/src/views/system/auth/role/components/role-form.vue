<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="角色名称:" name="roleName">
          <a-input v-model:value="form.roleName" allow-clear placeholder="请输入角色名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="角色编码:" name="roleCode">
          <a-input v-model:value="form.roleCode" allow-clear placeholder="请输入角色编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="roleSort">
          <a-input-number
            v-model:value="form.roleSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="状态:" name="statusFlag">
          <a-radio-group v-model:value="form.statusFlag">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="角色类型:" name="roleType">
          <a-radio-group v-model:value="form.roleType" @change="roleTypeChange">
            <a-radio :value="10" v-if="props.superAdminFlag">系统角色</a-radio>
            <a-radio :value="15" v-if="props.superAdminFlag">业务角色</a-radio>
            <a-radio :value="20">公司角色</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="form.roleType == 20">
        <a-form-item label="所属公司:" name="roleCompanyIdWrapper">
          <a-input
            v-model:value="form.roleCompanyIdWrapper"
            @focus="roleCompanyIdWrapperClick"
            :disabled="!props.superAdminFlag"
            placeholder="请选择所属公司"
          ></a-input>
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
      v-model:visible="showSelectCompany"
      v-if="showSelectCompany"
      title="选择公司"
      :data="selectData"
      :showTab="['company']"
      @done="closeSelectCompany"
    />
  </a-form>
</template>

<script setup name="RoleForm">
import { reactive, ref } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object,
  // 是否是超管
  superAdminFlag: Boolean
});

// 验证规则
const rules = reactive({
  roleName: [{ required: true, message: '请输入角色名称', type: 'string', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', type: 'string', trigger: 'blur' }],
  roleSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  statusFlag: [{ required: true, message: '请选择状态', type: 'number', trigger: 'change' }],
  roleType: [{ required: true, message: '请选择角色类型', type: 'number', trigger: 'change' }],
  roleCompanyIdWrapper: [{ required: true, message: '请选择所属公司', type: 'string', trigger: 'change' }]
});

// 是否显示弹框
const showSelectCompany = ref(false);

// 选择的总数据
const selectData = ref({
  selectCompanyList: []
});

// 选择公司
const roleCompanyIdWrapperClick = () => {
  selectData.value.selectCompanyList = [{ bizId: props.form.roleCompanyId, name: props.form.roleCompanyIdWrapper }];
  showSelectCompany.value = true;
};

// 关闭选择弹框
const closeSelectCompany = data => {
  const { bizId, name } = data.selectCompanyList[0];
  props.form.roleCompanyId = bizId;
  props.form.roleCompanyIdWrapper = name;
};

// 角色类型改变
const roleTypeChange = ({ target }) => {
  props.form.roleCompanyId = null;
  props.form.roleCompanyIdWrapper = null;
};
</script>

<style></style>
