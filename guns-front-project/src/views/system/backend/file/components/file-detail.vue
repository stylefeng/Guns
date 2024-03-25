<template>
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="文件详情"
    :body-style="{ paddingBottom: '8px', height: '550px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item label="文件编码" name="fileCode">
            <a-input v-model:value="form.fileCode" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="12"
          ><a-form-item label="文件仓库" name="fileBucket"> <a-input v-model:value="form.fileBucket" disabled /> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="文件名称" name="fileOriginName"> <a-input v-model:value="form.fileOriginName" disabled /> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="是否为机密文件" name="secretFlag"> <a-input v-model:value="form.secretFlag" disabled /> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="文件后缀" name="fileSuffix"> <a-input v-model:value="form.fileSuffix" disabled /> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="文件大小" name="fileSizeInfo"> <a-input v-model:value="form.fileSizeInfo" disabled /> </a-form-item
        ></a-col>
        <a-col :span="24"
          ><a-form-item label="唯一标识" name="fileObjectName"> <a-input v-model:value="form.fileObjectName" disabled /> </a-form-item
        ></a-col>
        <a-col :span="24"
          ><a-form-item label="存储路径" name="fileUrl"> <a-input v-model:value="form.fileUrl" disabled /> </a-form-item
        ></a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup name="FileDetail">
import { ref, onMounted } from 'vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 表单数据
const form = ref({});

onMounted(() => {
  if (props.data) {
    form.value = Object.assign({}, props.data);
  }
});

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = () => {
  updateVisible(false);
};
</script>

<style scoped lang="less">
:deep(.ant-input) {
  --disabled-color: black;
}
</style>
