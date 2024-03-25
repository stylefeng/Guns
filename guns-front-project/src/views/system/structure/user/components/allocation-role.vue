<template>
  <a-modal
    :width="400"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="分配角色"
    :body-style="{ paddingBottom: '8px', height: '500px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form ref="formRef" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-row :gutter="16">
        <a-form-item label="用户姓名" style="width: 100%">
          <a-input v-model:value="props.data.realName" disabled></a-input>
        </a-form-item>
        <a-form-item label="角色信息" style="width: 100%">
          <a-checkbox-group v-model:value="form.roleIdList">
            <a-checkbox :value="roItem.roleId" name="type" v-for="roItem in roleList" :key="roItem.roleId" class="chexkout">
              <span v-if="roItem.roleType == 10" class="system-role"> {{ roItem.roleName }} <span>（系统角色）</span> </span>
              <span v-else-if="roItem.roleType == 15" class="system-role"> {{ roItem.roleName }} <span>（业务角色）</span> </span>
              <span v-else>
                {{ roItem.roleName }}
              </span>
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup name="AllocationRole">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { UsersApi } from '../api/UsersApi';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 表单数据
const form = ref({
  roleIdList: [],
  userId: props.data.userId
});
// 角色列表
const roleList = ref([]);

onMounted(() => {
  getRoleList();
  getUserDetail();
});

// 获取用户详情
const getUserDetail = () => {
  UsersApi.detail({ userId: props.data.userId }).then(res => {
    form.value.roleIdList = res.roleIdList ?? [];
  });
};

// 获取角色列表
const getRoleList = async () => {
  roleList.value = await UsersApi.roleList();
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = () => {
  loading.value = true;
  UsersApi.bindRoles(form.value)
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

<style scoped lang="less">
.chexkout {
  width: 100%;
  margin-bottom: 10px;
}
:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper) {
  margin-left: 0;
}
:deep(.ant-checkbox-group:nth-child(1)) {
  margin-top: 5px;
}
.system-role {
  font-weight: bold;
}
</style>
