<template>
  <a-form ref="formRef" :model="form" :rules="props.rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="主题模板" name="templateId">
          <a-select
            :disabled="props.disabledChangeTemplate"
            v-model:value="form.templateId"
            placeholder="请选择主题模板"
            :options="templateList"
            @change="getThemeAttributes"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="主题名称:" name="themeName">
          <a-input v-model:value="form.themeName" placeholder="请输入主题名称" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
      <a-divider style="padding-bottom: 24px" />
      <a-col :span="24" v-for="templateField in templateFields" :key="templateField">
        <!--循环遍历主题的所有字段-->
        <a-form-item :label="templateField.fieldName" :name="templateField.fieldCode">
          <!--string类型自定义表单-->
          <a-input v-if="templateField.fieldType === 'string'" v-model:value="form[templateField.fieldCode]" />
          <!--file类型自定义表单-->
          <a-upload
            v-else-if="templateField.fieldType === 'file'"
            name="file"
            :multiple="false"
            :action="fileUploadUrl"
            :headers="headers"
            list-type="picture"
            v-model:file-list="tempFileList[templateField.fieldCode]"
            @change="handleFileChange($event, templateField.fieldCode)"
          >
            <a-button class="border-radius">
              <CloudUploadOutlined />
              上传图片
            </a-button>
          </a-upload>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="ManagerForm">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { getToken } from '@/utils/token-util';
import { API_BASE_PREFIX } from '@/config/setting';
import { ThemeTemplateApi } from '../../template/api/ThemeTemplateApi';
import { FileUploadUrl as fileUploadUrlPrefix } from '@/views/system/backend/file/api/FileApi';

const props = defineProps({
  // 表单数据
  form: Object,
  // 验证规则
  rules: Object,
  // 是否禁用主题
  disabledChangeTemplate: Boolean,
  // 临时存放文件列表（用来限制上传数量）
  tempFileList: Object,
  // 模板属性
  templateFields: Array
});

const emits = defineEmits(['getThemeAttributes']);

// 模板列表
const templateList = ref([]);

// 上传文件的url
const fileUploadUrl = ref(`${API_BASE_PREFIX}${fileUploadUrlPrefix}?secretFlag=N`);
// 上传文件时候要带header
const headers = ref({
  Authorization: getToken()
});
onMounted(() => {
  getThemeTemplates();
});

/**
 * 获取搜索框焦点时，获取所有的主题模板
 *
 * @author fengshuonan
 * @date 2021/12/29 10:08:31
 */
const getThemeTemplates = async () => {
  let templates = await ThemeTemplateApi.findList();
  templateList.value = [];
  for (let template of templates) {
    if (template.statusFlag === 'Y') {
      templateList.value.push({
        value: template.templateId,
        label: template.templateName
      });
    }
  }
};

/**
 * 上传文件改变时的状态
 *
 * @param info 组件回调原有参数
 * @param fieldCode 文件表单字段名称
 * @author fengshuonan
 * @date 2021/12/29 14:25:18
 */
const handleFileChange = (info, fieldCode) => {
  if (info.file.status === 'done') {
    // 设置临时fileList的值
    props.tempFileList[fieldCode] = [info.file];
    // 将文件属性名和文件编码存入数组中
    message.success(`${info.file.name} 图片上传成功`);
    // 设置表单对应的文件属性的值
    props.form[fieldCode] = info.file.response.data.fileId;
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 图片上传失败`);
  }
};

/**
 * 点击选择模板时，查询系统模板详情
 *
 * @param value 模板id
 * @author fengshuonan
 * @date 2021/12/29 10:33:06
 */
const getThemeAttributes = value => {
  emits('getThemeAttributes', value);
};
</script>

<style></style>
