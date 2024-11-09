<template>
  <div class="security">
    <div class="security-box">
      <div class="security-header">{{ configTitle }}</div>
      <!-- 密码策略 -->
      <div class="security-center" v-if="props.currentMenuSelect == '1'">
        <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          style="height: 100%; overflow-y: auto; width: 100%; padding: 0 20px"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="title">密码策略</div>
          <a-form-item label="密码最大重试次数:" name="maxErrorLoginCount">
            <a-input-number v-model:value="form.maxErrorLoginCount" placeholder="请输入密码最大重试次数" style="width: 100%" />
          </a-form-item>
          <div class="title">密码失效策略</div>
          <a-form-item label="最少多久更新一次密码:" name="passwordMinUpdateDays" style="position: relative">
            <a-input-number v-model:value="form.passwordMinUpdateDays" placeholder="请输入最少多久更新一次密码" style="width: 100%" />
            <span style="position: absolute; right: -20px; top: 3px">天</span>
          </a-form-item>
          <a-form-item label="密码历史不可重复次数:" name="passwordMinCantRepeatTimes">
            <a-input-number v-model:value="form.passwordMinCantRepeatTimes" placeholder="请输入密码历史不可重复次数" style="width: 100%" />
          </a-form-item>
          <div class="title">密码口令策略</div>
          <a-form-item label="口令最小长度:" name="minPasswordLength">
            <a-input-number v-model:value="form.minPasswordLength" placeholder="请输入口令最小长度" style="width: 100%" />
          </a-form-item>
          <a-form-item label="特殊符号数量:" name="passwordMinSpecialSymbolCount">
            <a-input-number v-model:value="form.passwordMinSpecialSymbolCount" placeholder="请输入特殊符号数量" style="width: 100%" />
          </a-form-item>
          <a-form-item label="大写字母数量:" name="getPasswordMinUpperCaseCount">
            <a-input-number v-model:value="form.getPasswordMinUpperCaseCount" placeholder="请输入大写字母数量" style="width: 100%" />
          </a-form-item>
          <a-form-item label="小写字母数量:" name="passwordMinLowerCaseCount">
            <a-input-number v-model:value="form.passwordMinLowerCaseCount" placeholder="请输入小写字母数量" style="width: 100%" />
          </a-form-item>
          <a-form-item label="最少数字数量:" name="passwordMinNumberCount">
            <a-input-number v-model:value="form.passwordMinNumberCount" placeholder="请输入最少数字数量" style="width: 100%" />
          </a-form-item>
        </a-form>
      </div>
      <!-- 黑白名单 -->
      <div class="security-center" v-if="props.currentMenuSelect == '2'">
        <a-form
          ref="formRef"
          :model="blackForm"
          style="height: 100%; overflow-y: auto; width: 100%; padding: 0 20px; margin-top: 20px"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item label="黑名单列表:" name="blackData">
            <a-textarea v-model:value="blackForm.blackData" placeholder="请输入黑名单" :rows="10" />
          </a-form-item>
          <a-form-item label="白名单列表:" name="whiteData">
            <a-textarea v-model:value="blackForm.whiteData" placeholder="请输入白名单" :rows="10" />
          </a-form-item>
        </a-form>
      </div>
      <div class="security-footer">
        <a-button type="primary" class="border-radius" @click="save">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script setup name="SecurityPolicy">
import { SecurityApi } from './api/SecurityApi';
import { ref, onMounted, reactive, watch, computed } from 'vue';
import { message } from 'ant-design-vue/es';

const props = defineProps({
  currentMenuSelect: {
    type: String,
    default: '1'
  }
});

// 表单数据
const form = ref({});
// 黑白名单数据
const blackForm = ref({
  blackData: '',
  whiteData: ''
});

// 验证规则
const rules = reactive({
  maxErrorLoginCount: [{ required: true, message: '请输入密码最大重试次数', type: 'number', trigger: 'blur' }],
  passwordMinUpdateDays: [{ required: true, message: '请输入最少多久更新一次密码', type: 'number', trigger: 'blur' }],
  passwordMinCantRepeatTimes: [{ required: true, message: '请输入密码历史不可重复次数', type: 'number', trigger: 'blur' }],
  minPasswordLength: [{ required: true, message: '请输入口令最小长度', type: 'number', trigger: 'blur' }],
  passwordMinSpecialSymbolCount: [{ required: true, message: '请输入特殊符号数量', type: 'number', trigger: 'blur' }],
  getPasswordMinUpperCaseCount: [{ required: true, message: '请输入大写字母数量', type: 'number', trigger: 'blur' }],
  passwordMinLowerCaseCount: [{ required: true, message: '请输入小写字母数量', type: 'number', trigger: 'blur' }],
  passwordMinNumberCount: [{ required: true, message: '请输入最少数字数量', type: 'number', trigger: 'blur' }]
});

const formRef = ref();

// 标题
const configTitle = computed(() => {
  if (props.currentMenuSelect == '1') {
    return '密码策略配置';
  } else {
    return '黑白名单配置';
  }
});

watch(
  () => props.currentMenuSelect,
  val => {
    if (val == '1') {
      getConfigDetail();
    } else {
      getBlackDetail();
    }
  }
);

onMounted(() => {
  getConfigDetail();
});

// 获取密码配置详情
const getConfigDetail = () => {
  SecurityApi.getOnlineUserList().then(res => {
    form.value = Object.assign({}, res);
  });
};

// 获取黑白名单配置详情
const getBlackDetail = () => {
  SecurityApi.getBlackWhiteList().then(res => {
    blackForm.value.blackData = res.blackList.map(item => item).join('\n');
    blackForm.value.whiteData = res.whiteList.map(item => item).join('\n');
  });
};

// 保存
const save = async () => {
  if (props.currentMenuSelect == '1') {
    await formRef.value.validate();
    SecurityApi.offlineUser(form.value).then(res => {
      message.success(res.message);
      getConfigDetail();
    });
  } else {
    let params = {
      blackList: blackForm.value.blackData.split('\n').filter(item => item.trim() !== ''),
      whiteList: blackForm.value.whiteData.split('\n').filter(item => item.trim() !== '')
    };
    SecurityApi.updateBlackWhite(params).then(res => {
      message.success(res.message);
      getBlackDetail();
    });
  }
};
</script>

<style scoped lang="less">
.security {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
}
.security-box {
  width: 750px;
  height: 100%;
  overflow: hidden;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #ccc;
}
.security-header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  background: var(--primary-color);
}
.security-center {
  width: 100%;
  height: calc(100% - 110px);
  margin-bottom: 10px;
  overflow-y: hidden;
  .title {
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
}
.security-footer {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-top: 1px solid #ccc;
}

@media screen and (max-width: 768px) {
  .security-box {
    width: 340px;
  }
}
</style>
