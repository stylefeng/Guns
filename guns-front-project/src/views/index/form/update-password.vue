<template>
  <div class="form">
    <a-form
      :label-col="{ sm: { span: 6 } }"
      :wrapper-col="{ sm: { span: 18 } }"
    >
      <a-form-item label="旧密码" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="form.password"
          placeholder="请输入旧密码"
        />
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.newPassword">
        <a-input-password
          v-model:value="form.newPassword"
          placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item label="重复密码" v-bind="validateInfos.password2">
        <a-input-password
          v-model:value="form.password2"
          placeholder="请再次输入新密码"
        />
      </a-form-item>
      <a-form-item label=" " class="save-btn">
        <a-button type="primary" html-type="submit" @click="save">保存</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<script setup name="PersonalUpdatePassword">
import {ref, reactive} from 'vue';
import {Form, message} from 'ant-design-vue';
import {PersonInfoApi} from '@/views/index/api/PersonInfoApi';
import {deepClone} from "@/utils/common/util";
import {SSO_FLAG} from "@/config/setting";
import {removeToken} from "@/utils/token-util";
import {SsoUtil} from "@/utils/common/sso-util";
import {LoginApi} from "@/views/login/login/api/LoginApi";
import {logout} from "@/utils/page-tab-util";

const useForm = Form.useForm;

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

const {resetFields, validate, validateInfos} = useForm(form, rules);

/* 保存修改 */
const save = () => {
  validate().then(() => {
    loading.value = true;
    let params = deepClone(form);
    delete params.password2;
    PersonInfoApi.updatePassword(params).then(async (res) => {
      if (res.success) {
        message.success('修改成功！');
        resetFields();
        // 退出登录
        // 如果开启了单点登录，跳转到单点的退出
        if (SSO_FLAG) {
          // 清除token
          removeToken();
          // 调用sso退出接口
          SsoUtil.ssoLogoutRedirect();
        } else {
          // 调用退出接口
          await LoginApi.logout();
          // 清除缓存token并退出
          logout();
        }

      } else {
        message.error(res.message);
      }
    }).finally(() => {
      loading.value = false;
    });
  })
};

</script>

<style scoped lang="less">
.form {
  width: 50%;
  height: 100%;
}

.save-btn {
  :deep(.ant-form-item-label > label::after) {
    content: '';
  }
}
</style>
