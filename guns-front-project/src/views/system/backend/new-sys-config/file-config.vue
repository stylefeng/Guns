<template>
  <div class="file-config">
    <div class="file-config-title">文件存储方式</div>
    <div class="file-config-remark">配置上传的文档存储在什么地方</div>
    <div class="file-config-type">
      <a-radio-group v-model:value="fileConfig.fileSaveType" name="sex" @change="fileSaveTypeChange">
        <a-radio :value="10">本地，存储到默认路径（jar所在目录）</a-radio>
        <a-radio :value="11">存储到指定路径下（需要配置linux和windows的路径）</a-radio>
        <!-- <a-radio :value="20">存储到MinIO</a-radio>
        <a-radio :value="30">存储到阿里云</a-radio>
        <a-radio :value="40">存储到腾讯云</a-radio>
        <a-radio :value="50">存储到青云</a-radio> -->
      </a-radio-group>
    </div>
    <a-form :model="fileConfig" :rules="rules" ref="formRef">
      <a-form-item label="存储目录路径" name="localFileSavePath" v-if="fileConfig.fileSaveType != 10">
        <a-input v-model:value="fileConfig.localFileSavePath" placeholder="输入应用服务器完整目录结构，必须目录已存在" style="width: 80%" />
      </a-form-item>
    </a-form>
    <a-button type="primary" class="border-radius" @click="save">保存</a-button>
  </div>
</template>

<script setup name="FileConfig">
import { ref, onMounted, reactive } from 'vue';
import { FileConfigApi } from './api/FileConfigApi';
import { message } from 'ant-design-vue';

const fileConfig = ref({
  fileSaveType: null,
  localFileSavePath: null,
});

const rules = reactive({
  localFileSavePath: [
    {
      required: true,
      type: 'string',
      message: '请输入存储目录路径',
      trigger: 'blur'
    }
  ]
});

const formRef = ref();

onMounted(() => {
  getFileConfig();
});

const getFileConfig = () => {
  FileConfigApi.getFileConfig().then(res => {
    fileConfig.value = res.data;
  });
};

const fileSaveTypeChange = () => {
  if (fileConfig.value.fileSaveType == 10) {
    fileConfig.value.localFileSavePath = null;
  }
}

const save = async () => {
  await formRef.value.validate();
  FileConfigApi.updateFileConfig(fileConfig.value).then(res => {
    message.success(res.message);
    getFileConfig();
  });
};
</script>

<style scoped lang="less">
.file-config {
  width: 50%;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 16px;
  padding: 12px 16px;
  box-shadow: 0 0 4px #eee;
}
.file-config-title {
  font-size: 16px;
  font-weight: bold;
}

.file-config-remark {
  color: #ccc;
  margin-top: 10px;
}
.file-config-type {
  margin: 20px 0 20px 0;
}
</style>
