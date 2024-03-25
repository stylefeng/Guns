<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑角色' : '新建角色'"
    :body-style="{ paddingBottom: '8px', height: '500px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <role-form v-model:form="form" ref="roleFormRef" :superAdminFlag="superAdminFlag"></role-form>
  </a-modal>
</template>

<script setup name="RoleAddEdit">
import { ref, onMounted, computed } from 'vue';
import RoleForm from './role-form.vue';
import { message } from 'ant-design-vue';
import { RoleApi } from '../api/RoleApi';
import { useUserStore } from '@/store/modules/user';
import { getBusinessMaxSort } from '@/utils/common/util';

const userStore = useUserStore();

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  roleType: 20,
  statusFlag: 1,
});
// ref
const roleFormRef = ref(null);

// 是否是超管
const superAdminFlag = computed(() => {
  return userStore.info.superAdminFlag;
});

// 当前公司信息
const currentCompanyData = computed(() => {
  let userOrgInfoList = userStore.info.userOrgInfoList;
  let filter = userOrgInfoList.filter(item => item.currentSelectFlag);
  if (filter.length > 0) {
    return filter[0];
  }
});

onMounted(async() => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    form.value.roleSort = await getBusinessMaxSort('SYSTEM_BASE_ROLE');
    isUpdate.value = false;
    if (currentCompanyData.value?.companyId) {
      form.value.roleCompanyId = currentCompanyData.value?.companyId;
      form.value.roleCompanyIdWrapper = currentCompanyData.value?.companyName;
    }
  }
});

// 获取详情
const getDetail = () => {
  RoleApi.detail({ roleId: props.data.roleId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  roleFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = RoleApi.edit(form.value);
      } else {
        result = RoleApi.add(form.value);
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
