<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑配置' : '新建配置'"
    :body-style="{ paddingBottom: '8px', height: '500px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <ConfigForm v-model:form="form" ref="configFormRef" :isUpdate="isUpdate"></ConfigForm>
  </a-modal>
</template>

<script setup name="ConfigAddEdit">
import { ref, onMounted } from 'vue';
import ConfigForm from './config-form.vue';
import { message } from 'ant-design-vue';
import { SysConfigApi } from '../../api/SysConfigApi';

const props = defineProps({
  visible: Boolean,
  data: Object,
  groupCode: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  sysFlag: 'Y',
  groupCode: props.groupCode
});
// ref
const configFormRef = ref(null);

onMounted(() => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    isUpdate.value = false;
  }
});

// 获取详情
const getDetail = () => {
  SysConfigApi.detail({ configId: props.data.configId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  configFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = SysConfigApi.edit(form.value);
      } else {
        result = SysConfigApi.add(form.value);
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
