<template>
  <a-modal
    :width="600"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="新增机构"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form ref="formRef" :model="form" :labelCol="{ span: 4 }" :rules="rules">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="机构" name="orgName">
            <a-input v-model:value="form.orgName" placeholder="请选择机构" @focus="inputFocus('dept')"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="职务" name="positionName">
            <a-input v-model:value="form.positionName" placeholder="请选择职位" @focus="inputFocus('position')"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="主要部门:" name="mainFlag" :labelCol="{ span: 8 }">
            <vxe-switch v-model="form.mainFlag" open-value="Y" close-value="N"></vxe-switch>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否启用" name="statusFlag" :labelCol="{ span: 8 }">
            <vxe-switch v-model="form.statusFlag" :open-value="1" :close-value="2"></vxe-switch>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelect"
      v-if="showSelect"
      :title="selectTitle"
      :data="selectData"
      :showTab="showTab"
      @done="closeSelect"
    />
  </a-modal>
</template>

<script setup name="AddOrg">
import { ref, onMounted, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { EmpowerApi } from '../api/EmpowerApi';

const props = defineProps({
  visible: Boolean,
  // 用户id
  userId: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 表单数据
const form = ref({
  userId: props.userId,
  mainFlag: 'N',
  statusFlag: 1
});

// ref
const formRef = ref();

// 验证规则
const rules = reactive({
  orgName: [{ required: true, message: '请选择机构', type: 'string', trigger: 'change' }],
  positionName: [{ required: true, message: '请选择职务', type: 'string', trigger: 'change' }],
  mainFlag: [{ required: true, message: '请选择主要部门' }]
});

// 是否选择选择组件
const showSelect = ref(false);
// 选择组件标题
const selectTitle = ref('');
// 显示的tab
const showTab = ref([]);
// 选中的数据
const selectData = ref({});

onMounted(() => {});

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 选中
const inputFocus = type => {
  showTab.value = [type];
  if (type == 'dept') {
    selectTitle.value = '机构选择';
    getSelectList('orgId', 'orgName', 'selectOrgList');
  } else {
    selectTitle.value = '职位选择';
    getSelectList('positionId', 'positionName', 'selectPositionList');
  }
  showSelect.value = true;
};

// 获取选中的列表
const getSelectList = (id, name, selectName) => {
  if (form.value[id] && form.value[name]) {
    selectData.value[selectName] = [{ bizId: form.value[id], name: form.value[name] }];
  } else {
    selectData.value[selectName] = [];
  }
};

// 关闭选择
const closeSelect = data => {
  showSelect.value = false;
  if (showTab.value[0] == 'dept') {
    setValue(data, 'orgId', 'orgName', 'selectOrgList');
  } else if (showTab.value[0] == 'position') {
    setValue(data, 'positionId', 'positionName', 'selectPositionList');
  }
};

// 设置值
const setValue = (val, id, name, selectName) => {
  if (val[selectName] && val[selectName].length > 0) {
    form.value[id] = val[selectName][0].bizId;
    form.value[name] = val[selectName][0].name;
  } else {
    form.value[id] = '';
    form.value[name] = '';
  }
};

// 点击保存
const save = async () => {
  await formRef.value.validate();
  loading.value = true;
  EmpowerApi.addUserOrgBind(form.value)
    .then(result => {
      // 移除加载框
      loading.value = false;
      // 提示添加成功
      message.success(result.message);
      // 关闭弹框，通过控制visible的值，传递给父组件
      updateVisible(false);
      // 触发父组件done事件
      emits('done');
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="less"></style>
