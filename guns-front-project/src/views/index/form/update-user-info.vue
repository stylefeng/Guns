<template>
  <div class="form">
    <a-form
      :label-col="{ sm: { span: 6 } }"
      :wrapper-col="{ sm: { span: 18 } }"
    >
      <a-form-item label="账号" v-bind="validateInfos.account">
        <a-input
          v-model:value="form.account"
          disabled="disabled"
        />
      </a-form-item>
      <a-form-item label="姓名" v-bind="validateInfos.realName">
        <a-input
          v-model:value="form.realName"
          placeholder="请输入姓名"
        />
      </a-form-item>
      <a-form-item label="性别" v-bind="validateInfos.sex">
        <a-radio-group v-model:value="form.sex" name="sex">
          <a-radio value="M">男</a-radio>
          <a-radio value="F">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="邮箱" v-bind="validateInfos.email">
        <a-input
          v-model:value="form.email"
          placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item label="生日" v-bind="validateInfos.birthday">
        <a-date-picker v-model:value="form.birthday" value-format="YYYY-MM-DD" placeholder="请选择生日"
                       style="width: 100%;"/>
      </a-form-item>
      <a-form-item label="电话" v-bind="validateInfos.phone">
        <a-input
          v-model:value="form.phone"
          placeholder="请输入电话"
        />
      </a-form-item>
      <a-form-item label=" " class="save-btn">
        <a-button type="primary" :loading="loading" html-type="submit" @click="save">保存更改</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<script setup name="PersonalUpdateUserInfo">
import {ref, reactive, onMounted} from 'vue';
import {Form, message} from 'ant-design-vue';
import {PersonInfoApi} from '@/views/index/api/PersonInfoApi';
import {deepClone} from "@/utils/common/util";

const props = defineProps({
  // 表单默认数据
  data: {
    type: Object
  }
})

const useForm = Form.useForm;

// 提交loading
const loading = ref(false);

// 表单数据
const form = ref({
  account: '',
  realName: '',
  email: '',
  phone: '',
  sex: '',
  birthday: '',
});

// 表单验证规则
const rules = reactive({
  realName: [
    {
      required: true,
      type: 'string',
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      type: 'string',
      message: '请输入邮箱',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      type: 'string',
      message: '请输入选择性别',
      trigger: 'change'
    }
  ],
});

const {validate, validateInfos} = useForm(form, rules);

/* 保存修改 */
const save = () => {
  validate().then(() => {
    loading.value = true;
    let params = deepClone(form.value);
    delete params.password2;
    PersonInfoApi.updateInfo(params).then(async (res) => {
      if (res.success) {
        message.success(res.message, 0.5).then(() => {
          window.location.reload();
        })
      } else {
        message.error(res.message);
      }
    }).finally(() => {
      loading.value = false;
    });
  })
};

onMounted(() => {
  form.value = deepClone(props.data);
})

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
