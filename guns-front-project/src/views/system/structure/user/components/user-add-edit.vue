<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="1000"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑用户' : '新建用户'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <user-form v-model:form="form" ref="userFormRef" :isUpdate="isUpdate" :superAdminFlag="superAdminFlag"></user-form>
  </a-modal>
</template>

<script setup name="UserAddEdit">
import { ref, onMounted, computed } from 'vue';
import UserForm from './user-form.vue';
import { message } from 'ant-design-vue';
import { UsersApi } from '../api/UsersApi';
import { getBusinessMaxSort } from '@/utils/common/util';
import { useUserStore } from '@/store/modules/user';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);

const userStore = useUserStore();

// 是否是超管
const superAdminFlag = computed(() => {
  return userStore.info.superAdminFlag;
});

// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  userOrgList: [],
  userCertificateList: [],
  sex: 'M',
  superAdminFlag: 'N',
  statusFlag: 1
});
// ref
const userFormRef = ref(null);

onMounted(async () => {
  if (props.data) {
    isUpdate.value = true;
    getUserDetail();
  } else {
    form.value.userSort = await getBusinessMaxSort('SYSTEM_HR_USER');
    isUpdate.value = false;
  }
});

// 获取用户详情
const getUserDetail = () => {
  UsersApi.detail({ userId: props.data.userId }).then(res => {
    form.value = Object.assign({}, res);
    if (res.userOrgDTOList && res.userOrgDTOList.length > 0) {
      // 设置机构
      form.value.userOrgList = res.userOrgDTOList.map(item => {
        return {
          mainFlag: item.mainFlag,
          positionId: item.positionId,
          statusFlag: item.statusFlag,
          positionName: item.positionName,
          orgId: item.deptId ? item.deptId : item.companyId,
          orgName: item.deptName ? item.deptName : item.companyName
        };
      });
    } else {
      form.value.userOrgList = [];
    }

    if (res.userCertificateList.length > 0) {
      form.value.userCertificateList.forEach(item => {
        if (item.attachmentId) {
          item.attachmentName = item.attachmentIdWrapper.name;
          item.attachmentUrl = item.attachmentIdWrapper.thumbUrl;
        }
      });
    }
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  userFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      if (form.value.userOrgList && form.value.userOrgList.length == 0) return message.warning('组织机构不能为空');
      if (!form.value.userOrgList.find(item => item.mainFlag == 'Y')) return message.warning('必须有一个主要部门');
      if (await userFormRef.value.validAllEvent()) {
        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 执行编辑或修改
        if (isUpdate.value) {
          result = UsersApi.edit(form.value);
        } else {
          result = UsersApi.add(form.value);
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
    }
  });
};
</script>

<style></style>
