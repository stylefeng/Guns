<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑应用' : '新建应用'"
    :body-style="{ paddingBottom: '8px', height: '550px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <app-form v-model:form="form" ref="appFormRef"></app-form>
  </a-modal>
</template>

<script setup name="AppAddEdit">
import { ref, onMounted } from 'vue';
import AppForm from './app-form.vue';
import { message } from 'ant-design-vue';
import { AppApi } from '../api/AppApi';
import { getBusinessMaxSort } from '@/utils/common/util';
import { FileApi } from '@/views/system/backend/file/api/FileApi';

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
  iconList: [],
  statusFlag: 1,
});
// ref
const appFormRef = ref(null);

onMounted(async() => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    form.value.appSort = await getBusinessMaxSort('SYSTEM_BASE_APP');
    isUpdate.value = false;
  }
});

// 获取详情
const getDetail = () => {
  AppApi.detail({ appId: props.data.appId }).then(res => {
    form.value = Object.assign({}, res);
    form.value.iconList = [];
    setFileList('iconList', res.appIcon);
  });
};

// 设置文件列表
const setFileList = (name, fileId) => {
  FileApi.getAntdVInfo({ fileId: fileId }).then(res => {
    res.uid = fileId;
    form.value[name] = [res];
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  appFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      if (form.value.iconList?.length) {
        form.value.appIcon = form.value.iconList[0]?.response?.data?.fileId
          ? form.value.iconList[0]?.response?.data?.fileId
          : form.value.iconList[0]?.uid;
      }
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = AppApi.edit(form.value);
      } else {
        result = AppApi.add(form.value);
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
