<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="900"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑主题' : '新建主题'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <manager-form
      v-model:form="form"
      :rules="rules"
      :disabledChangeTemplate="disabledChangeTemplate"
      v-model:tempFileList="tempFileList"
      @getThemeAttributes="getThemeAttributes"
      :templateFields="templateFields"
      ref="managerFormRef"
    ></manager-form>
  </a-modal>
</template>

<script setup name="ManagerAddEdit">
import { ref, onMounted } from 'vue';
import ManagerForm from './manager-form.vue';
import { message } from 'ant-design-vue';
import { ThemeApi } from '../api/ThemeApi';
import { ThemeTemplateApi } from '../../template/api/ThemeTemplateApi';

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
  positionSort: 1000
});
// ref
const managerFormRef = ref(null);

// 验证规则
const rules = ref({
  templateId: [{ required: true, message: '请输入用户账号', type: 'string', trigger: 'blur' }],
  themeName: [{ required: true, message: '请输入主题名称', type: 'string', trigger: 'blur' }]
});

// 模板属性
const templateFields = ref([]);
// 是否禁用模板
const disabledChangeTemplate = ref(false);
// 临时存放文件列表（用来限制上传数量）
const tempFileList = ref({});

onMounted(() => {
  if (props.data) {
    isUpdate.value = true;
    disabledChangeTemplate.value = true;
    // 获取动态表单所有属性，组装元数据
    getThemeAttributes(props.data.templateId).then(() => {
      // 加载动态表单的具体值
      loadFormValues(props.data);
    });
  } else {
    isUpdate.value = false;
    disabledChangeTemplate.value = false;
  }
});

/**
 * 点击选择模板时，查询系统模板详情
 *
 * @param value 模板id
 * @author fengshuonan
 * @date 2021/12/29 10:33:06
 */
const getThemeAttributes = async value => {
  templateFields.value = await ThemeTemplateApi.detail({ templateId: value });
  calcRules();
  calcTemplateAttr();
};

/**
 * 计算必填校验规则
 *
 * @author fengshuonan
 * @date 2022/1/1 19:53
 */
const calcRules = () => {
  // 默认的规则
  let defaultRules = {
    templateId: [{ required: true, message: '请输入用户账号', type: 'string', trigger: 'blur' }],
    themeName: [{ required: true, message: '请输入主题名称', type: 'string', trigger: 'blur' }]
  };
  // 动态表单的规则
  for (let number in templateFields.value) {
    const thisObj = templateFields.value[number];
    if (thisObj.fieldRequired === 'Y') {
      defaultRules[thisObj.fieldCode] = [{ required: true, message: `请输入${thisObj.fieldDescription}`, type: 'string', trigger: 'blur' }];
    }
  }
  rules.value = defaultRules;
};

/**
 * 设置临时文件数组赋空
 *
 * @author fengshuonan
 * @date 2022/1/1 21:28
 */
const calcTemplateAttr = () => {
  // 动态表单的规则
  for (let number in templateFields.value) {
    const thisObj = templateFields.value[number];
    if (thisObj.fieldType === 'file') {
      tempFileList.value[thisObj.fieldCode] = [];
    }
  }
};

/**
 * 加载动态表单的值
 *
 * @param data 当前主题的详情记录
 * @author fengshuonan
 * @date 2022/1/1 21:28
 */
const loadFormValues = async data => {
  // 从新组装form表单的值
  form.value.themeId = data.themeId;
  form.value.themeName = data.themeName;
  form.value.templateId = data.templateId;

  // 获取表单的动态表单信息
  let themeDetail = await ThemeApi.detail({ themeId: form.value.themeId });

  // 组装动态表单的值
  form.value = Object.assign(form.value, themeDetail.dynamicForm);

  // 加载图片预览
  tempFileList.value = themeDetail.tempFileList;
};

/**
 * 处理编辑表单数据
 *
 * @author fengshuonan
 * @date 2021/12/31 16:31:22
 */
const formPreProcess = () => {
  // 获取被删除的字段
  let themeName = form.value.themeName;
  let templateId = form.value.templateId;
  let themeId = form.value.themeId;

  // 剩余内容转为JSON串
  let jsonStr = JSON.stringify(form.value);

  // 将form置空
  form.value = {};

  if (themeId) {
    form.value['themeId'] = themeId;
  }
  form.value['themeName'] = themeName;
  form.value['templateId'] = templateId;
  form.value['themeValue'] = jsonStr;
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  managerFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;
      formPreProcess();
      // 执行编辑或修改
      if (isUpdate.value) {
        result = ThemeApi.edit(form.value);
      } else {
        result = ThemeApi.add(form.value);
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
