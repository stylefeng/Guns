<template>
  <div class="login-wrapper">
    <a-form class="login-form guns-bg-white">
      <h4>忘记密码</h4>
      <a-form-item v-bind="validateInfos.phone">
        <a-input placeholder="请输入绑定手机号" v-model:value="form.phone" allow-clear size="large">
          <template #prefix>
            <mobile-outlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password">
        <a-input-password placeholder="请输入新的登录密码" v-model:value="form.password" size="large">
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password2">
        <a-input-password placeholder="请再次输入登录密码" v-model:value="form.password2" size="large">
          <template #prefix>
            <key-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-bind="validateInfos.code">
        <div class="login-input-group">
          <a-input placeholder="请输入验证码" v-model:value="form.code" allow-clear size="large">
            <template #prefix>
              <safety-certificate-outlined />
            </template>
          </a-input>
          <a-button class="login-captcha" :disabled="!!countdownTime" @click="openImgCodeModal">
            <span v-if="!countdownTime">发送验证码</span>
            <span v-else>已发送 {{ countdownTime }} s</span>
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <router-link to="/login" class="guns-pull-right" style="line-height: 22px"> 返回登录 </router-link>
      </a-form-item>
      <a-form-item>
        <a-button block size="large" type="primary" :loading="loading" @click="submit"> 修改密码 </a-button>
      </a-form-item>
    </a-form>
    <div class="login-copyright">copyright © 2022 javaguns.com all rights reserved.</div>
  </div>
  <!-- 编辑弹窗 -->
  <a-modal :width="340" :footer="null" title="发送验证码" v-model:visible="visible" :maskClosable="false">
    <div class="login-input-group" style="margin-bottom: 16px">
      <a-input v-model:value="imgCode" placeholder="请输入图形验证码" allow-clear size="large" />
      <a-button class="login-captcha">
        <img alt="" :src="captcha" @click="changeImgCode" />
      </a-button>
    </div>
    <a-button block size="large" type="primary" :loading="codeLoading" @click="sendCode"> 立即发送 </a-button>
  </a-modal>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { Form, message } from 'ant-design-vue';
import { MobileOutlined, LockOutlined, KeyOutlined, SafetyCertificateOutlined } from '@ant-design/icons-vue';

const useForm = Form.useForm;

const { push } = useRouter();
// 加载状态
const loading = ref(false);
// 表单数据
const form = reactive({
  phone: '1234567890',
  password: '',
  password2: '',
  code: ''
});
// 表单验证规则
const rules = reactive({
  phone: [
    {
      required: true,
      message: '请输入绑定手机号',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入新的登录密码',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password2: [
    {
      required: true,
      validator: async (_rule, value) => {
        if (!value) {
          return Promise.reject('请再次输入新密码');
        }
        if (value !== form.password) {
          return Promise.reject('两次输入密码不一致');
        }
        return Promise.resolve();
      },
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      type: 'string',
      trigger: 'blur'
    }
  ]
});
// 是否显示图形验证码弹窗
const visible = ref(false);
// 图形验证码
const imgCode = ref('');
// 发送验证码按钮loading
const codeLoading = ref(false);
// 验证码倒计时时间
const countdownTime = ref(0);
// 图形验证码地址
const captcha = ref('https://www.javaguns.com/assets/captcha?v=');
// 验证码倒计时定时器
let countdownTimer = null;

const { validate, validateInfos } = useForm(form, rules);

/* 提交 */
const submit = () => {
  validate()
    .then(() => {
      loading.value = true;
      setTimeout(() => {
        message.success('密码修改成功');
        push('/login');
      }, 1000);
    })
    .catch(() => {});
};

/* 更换图形验证码 */
const changeImgCode = () => {
  // 这里演示的验证码是后端地址直接是图片的形式, 如果后端返回base64格式请参考登录页面
  captcha.value = captcha.value.replace(/v=.*/, 'v=' + new Date().getTime());
};

/* 显示发送短信验证码弹窗 */
const openImgCodeModal = () => {
  if (!form.phone) {
    message.error('请输入手机号码');
    return;
  }
  imgCode.value = '';
  changeImgCode();
  visible.value = true;
};

/* 发送短信验证码 */
const sendCode = () => {
  if (!imgCode.value) {
    message.error('请输入图形验证码');
    return;
  }
  codeLoading.value = true;
  setTimeout(() => {
    message.success('短信验证码发送成功, 请注意查收!');
    visible.value = false;
    codeLoading.value = false;
    countdownTime.value = 30;
    // 开始对按钮进行倒计时
    countdownTimer = window.setInterval(() => {
      if (countdownTime.value <= 1) {
        countdownTimer && clearInterval(countdownTimer);
        countdownTimer = null;
      }
      countdownTime.value--;
    }, 1000);
  }, 1000);
};

onBeforeUnmount(() => {
  countdownTimer && clearInterval(countdownTimer);
});
</script>

<style scoped>
/* 背景 */
.login-wrapper {
  padding: 48px 16px 0 16px;
  position: relative;
  box-sizing: border-box;
  background-image: url('@/assets/bg-login.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrapper:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}

/* 卡片 */
.login-form {
  width: 360px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px 16px 28px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  padding: 22px 0;
  text-align: center;
}

/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group :deep(.ant-input-affix-wrapper) {
  flex: 1;
}

.login-input-group .login-captcha {
  width: 102px;
  height: 40px;
  margin-left: 10px;
  padding: 0;
}

.login-input-group .login-captcha > img {
  width: 100%;
  height: 100%;
}

/* 第三方登录图标 */
.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 12px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

/* 底部版权 */
.login-copyright {
  color: #eee;
  text-align: center;
  padding: 48px 0 22px 0;
  position: relative;
  z-index: 1;
}

/* 响应式 */
@media screen and (min-height: 640px) {
  .login-wrapper {
    padding-top: 0;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -230px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 15%;
    transform: translateX(0);
    margin: -230px auto auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 15%;
  }

  .login-copyright {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    margin-left: 0;
    margin-right: auto;
    transform: translateX(-50%);
  }
}
</style>
