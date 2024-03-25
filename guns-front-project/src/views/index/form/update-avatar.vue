<template>
  <div class="form">
    <a-row>
      <a-col :span="6" style="display: flex;justify-content: right;align-items: center">
        <div class="label">
          <span>头像：</span>
        </div>
      </a-col>
      <a-col :span="18" style="display: flex;align-items: center">
        <div class="avatar">

          <div class="user-info-avatar-group" @click="showCropper = true">
            <a-avatar :size="110" :src="avatarUrl"/>
            <upload-outlined class="user-info-avatar-icon"/>
          </div>

          <!-- 头像裁剪弹窗 -->
          <cropper-modal :mask-closable="false" v-model:visible="showCropper" :src="avatarUrl"
                             :to-blob="true" @done="onCrop"/>
        </div>
        <div class="upload-btn">

          <a-upload
            v-model:file-list="avatarList"
            name="file"
            :show-upload-list="false"
            :action="avatar.fileUploadUrl"
            :headers="avatar.headers"
            @change="handleFileChange"
            :max-count="1"
          >
            <a-button type="primary">
              <cloud-upload-outlined/>
              上传头像
            </a-button>
          </a-upload>

        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script setup name="PersonalUpdatePassword">
import {ref, reactive} from 'vue';
import {useUserStore} from "@/store/modules/user";
import {API_BASE_PREFIX} from '@/config/setting';
import {FileApi, FileUploadUrl as fileUploadUrlPrefix} from '@/views/system/backend/file/api/FileApi';
import {PersonInfoApi} from "@/views/index/api/PersonInfoApi";
import {message} from "ant-design-vue";
import {getToken} from '@/utils/token-util';

// 用户信息
const userStore = useUserStore();

// 是否显示头像裁剪弹窗
const showCropper = ref(false);

// 头像文件列表
const avatarList = ref([]);

// 头像url
const avatarUrl = ref(userStore.info.avatarUrl);

// 头像上传预览地址
const avatar = reactive({
  // 上传文件的url
  fileUploadUrl: `${API_BASE_PREFIX}${fileUploadUrlPrefix}?secretFlag=N`,
  filePreviewUrl: `${API_BASE_PREFIX}/sysFileInfo/public/preview?fileId=`,
  // 上传文件时候要带header
  headers: {
    Authorization: getToken()
  }
});

// 上传成功
const handleFileChange = async (info) => {
  if (info.file.status === 'done') {
    let responseData = info.file.response.data;
    avatarUrl.value = responseData.fileUrl;
    // 设置临时fileList的值
    avatarList.value = [info.file];

    const result = await PersonInfoApi.updateAvatar({avatar: responseData.fileId});
    message.success(result.message, 0.5).then(() => {
      window.location.reload();
    });

  } else if (info.file.status === 'error') {
    message.error(`头像上传失败`);
  }
};

/**
 * 头像裁剪完成回调
 * @param blob
 * @returns {Promise<void>}
 */
const onCrop = async (blob) => {
  // 关闭剪裁窗口
  showCropper.value = false;

  // 调用更新头像的接口
  const formData = new FormData();
  formData.append('file', blob, 'avatar.jpg');

  // 更新头像
  const uploadResult = await FileApi.commonUpload('N', formData);
  const result = await PersonInfoApi.updateAvatar({avatar: uploadResult.data.fileId});

  message.success(result.message, 0.5).then(() => {
    window.location.reload();
  })
}

</script>

<style scoped lang="less">
.form {
  width: 50%;
}

.label {
  text-align: right;
}

.avatar {
  position: relative;
  margin: 0 20px;
}

/* 用户资料卡片 */
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.user-info-avatar-group .user-info-avatar-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  display: none;
  z-index: 2;
}

.user-info-avatar-group:hover .user-info-avatar-icon {
  display: block;
}

.user-info-avatar-group:hover:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

</style>
