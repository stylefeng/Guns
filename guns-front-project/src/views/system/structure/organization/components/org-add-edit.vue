<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="800"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑机构' : '新建机构'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <org-form v-model:form="form" ref="orgFormRef" :isUpdate="isUpdate"></org-form>
  </a-modal>
</template>

<script setup name="OrgAddEdit">
import { ref, onMounted } from 'vue';
import OrgForm from './org-form.vue';
import { message } from 'ant-design-vue';
import { OrgApi } from '../api/OrgApi';
import { getBusinessMaxSort } from '@/utils/common/util';

const props = defineProps({
  visible: Boolean,
  data: Object,
  // 上机机构id
  parentId: String,
  // 上级机构名称
  parentName: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  orgParentId: props.parentId,
  parentOrgName: props.parentName,
  orgType: 1,
  statusFlag: 1
});
// ref
const orgFormRef = ref(null);

onMounted(async () => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    form.value.orgSort = await getBusinessMaxSort('SYSTEM_HR_ORGANIZATION');
    isUpdate.value = false;
  }
});

// 获取详情
const getDetail = () => {
  OrgApi.detail({ orgId: props.data.orgId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  orgFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      if (!form.value.orgParentId) {
        form.value.orgParentId = '-1';
        form.value.parentOrgName = '根节点';
      }
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = OrgApi.edit(form.value);
      } else {
        result = OrgApi.add(form.value);
      }
      result
        .then(async result => {
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
    }
  });
};
</script>

<style></style>
