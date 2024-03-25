<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="应用名称:" name="appName">
          <a-input v-model:value="form.appName" allow-clear placeholder="请输入应用名称" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="应用编码:" name="appCode">
          <a-input v-model:value="form.appCode" allow-clear placeholder="请输入应用编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="应用图标:" name="iconList">
          <a-upload
            name="file"
            :multiple="false"
            v-model:file-list="form.iconList"
            :default-file-list="form.iconList"
            :maxCount="1"
            :action="icon.fileUploadUrl"
            list-type="picture-card"
            :headers="icon.headers"
            :before-upload="beforeUpload"
            accept=".jpeg,.jpg,.png,.tif,.jfif,.webp,.pjp,.apng,.pjpeg,.avif,.ico,.tiff,.bmp,.xbm,.jxl,.jpeg,.svgz,.gif,.svg"
            @preview="handlePreviewPhoto"
            @download="downloadPhoto"
            @change="info => handleFileChange(info, 'iconList')"
            :showUploadList="{
              showDownloadIcon: true
            }"
          >
            <plus-outlined style="font-size: 28px; font-weight: 200" v-if="form.iconList.length == 0" />
          </a-upload>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="appSort">
          <a-input-number
            v-model:value="form.appSort"
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
      <a-col :span="24">
        <a-form-item label="备注">
          <a-textarea v-model:value="form.remark" placeholder="请输入备注" :rows="4" />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- 图标预览弹框 -->
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-form>
</template>

<script setup name="AppForm">
import { reactive, ref } from 'vue';
import { getToken } from '@/utils/token-util';
import { API_BASE_PREFIX } from '@/config/setting';
import { FileApi, FileUploadUrl as fileUploadUrlPrefix } from '@/views/system/backend/file/api/FileApi';
import { message } from 'ant-design-vue/es';

const props = defineProps({
  // 表单数据
  form: Object
});

// 图标上传预览地址
const icon = reactive({
  // 上传文件的url
  fileUploadUrl: `${API_BASE_PREFIX}${fileUploadUrlPrefix}?secretFlag=N`,
  filePreviewUrl: `${API_BASE_PREFIX}/sysFileInfo/public/preview?fileId=`,
  // 上传文件时候要带header
  headers: {
    Authorization: getToken()
  }
});

// 是否展示图片预览
const previewVisible = ref(false);
// 图片地址
const previewImage = ref(null);

// 验证规则
const rules = reactive({
  appName: [{ required: true, message: '请输入应用名称', type: 'string', trigger: 'blur' }],
  appCode: [{ required: true, message: '请输入应用编码', type: 'string', trigger: 'blur' }],
  appSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  statusFlag: [{ required: true, message: '请选择状态', type: 'number', trigger: 'change' }],
  iconList: [{ required: true, message: '请上传应用图标', type: 'array', trigger: 'blur' }]
});

//上传之前的回调
const beforeUpload = file => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/png' ||
    file.type === 'image/tif' ||
    file.type === 'image/jfif' ||
    file.type === 'image/webp' ||
    file.type === 'image/pjp' ||
    file.type === 'image/apng' ||
    file.type === 'image/pjpeg' ||
    file.type === 'image/avif' ||
    file.type === 'image/ico' ||
    file.type === 'image/tiff' ||
    file.type === 'image/bmp' ||
    file.type === 'image/xbm' ||
    file.type === 'image/jxl' ||
    file.type === 'image/svgz' ||
    file.type === 'image/gif' ||
    file.type === 'image/svg';
  if (!isJpgOrPng) {
    message.error('只能上传图片!');
    return Upload.LIST_IGNORE; //阻止列表展现
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('图片大小不能超过5MB!');
  }
  return isJpgOrPng && isLt5M;
};

// 上传成功
const handleFileChange = (info, list) => {
  if (info.file.status === 'done') {
    // 设置临时fileList的值
    props.form[list] = [info.file];
    // 将文件属性名和文件编码存入数组中
    message.success(`${info.file.name} 图片上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 图片上传失败`);
  }
};

// 点击预览图片
const handlePreviewPhoto = async file => {
  previewImage.value = file.url || file.preview || file.thumbUrl;
  previewVisible.value = true;
};

//下载图片
const downloadPhoto = file => {
  let id = file.response ? file.response.data.fileId : file.uid;
  FileApi.download({ token: getToken(), fileId: id });
};
</script>

<style></style>
