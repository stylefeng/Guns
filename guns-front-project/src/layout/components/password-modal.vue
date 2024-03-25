<!-- 修改密码弹窗 -->
<template>
  <a-modal
    :width="420"
    title="修改密码"
    :visible="visible"
    :confirm-loading="loading"
    :body-style="{ paddingBottom: '16px' }"
    @update:visible="updateVisible"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form :label-col="{ sm: { span: 6 } }" :wrapper-col="{ sm: { span: 18 } }">
      <a-form-item label="旧密码" v-bind="validateInfos.password">
        <a-input-password v-model:value="form.password" placeholder="请输入旧密码" />
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.newPassword">
        <a-input-password v-model:value="form.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="validateInfos.password2">
        <a-input-password v-model:value="form.password2" placeholder="请再次输入新密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Form } from 'ant-design-vue';
import { PersonInfoApi } from '@/views/index/api/PersonInfoApi';
const useForm = Form.useForm;

const emit = defineEmits(['update:visible']);

defineProps({
  visible: Boolean
});

// 提交loading
const loading = ref(false);

// 表单数据
const form = reactive({
  password: '',
  newPassword: '',
  password2: ''
});

// 表单验证规则
const rules = reactive({
  password: [
    {
      required: true,
      type: 'string',
      message: '请输入旧密码',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      type: 'string',
      message: '请输入新密码',
      trigger: 'blur'
    }
  ],
  password2: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
      validator: async (_rule, value) => {
        if (!value) {
          return Promise.reject('请再次输入新密码');
        }
        if (value !== form.newPassword) {
          return Promise.reject('两次输入密码不一致');
        }
        return Promise.resolve();
      }
    }
  ]
});

const { resetFields, validate, validateInfos } = useForm(form, rules);

/* 修改visible */
const updateVisible = value => {
  emit('update:visible', value);
};

/* 保存修改 */
const onOk = () => {
  validate()
    .then(() => {
      loading.value = true;
      PersonInfoApi.updatePassword(form)
        .then(msg => {
          loading.value = false;
          updateVisible(false);
        })
        .catch(e => {
          loading.value = false;
        });
    })
    .catch(() => {});
};

/* 关闭回调 */
const onCancel = () => {
  resetFields();
  loading.value = false;
};
</script>
