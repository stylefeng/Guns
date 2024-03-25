<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="1000"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="消息详情"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <a-form ref="formRef" :model="form" layout="vertical">
      <!-- 通知内容 -->
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item label="通知标题:" name="messageTitle">
            <a-input v-model:value="form.messageTitle" allow-clear placeholder="请输入通知标题" :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="优先级" name="priorityLevel">
            <a-radio-group v-model:value="form.priorityLevel" name="sex" :disabled="true">
              <a-radio value="high">高</a-radio>
              <a-radio value="middle">中</a-radio>
              <a-radio value="low">低</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="通知内容" name="messageContent">
            <tinymce v-model:value="form.messageContent" :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup name="NoticeDetail">
import { ref, onMounted } from 'vue';
import { MyNoticeApi } from '../api/MyNoticeApi';
import Tinymce from '@/components/TinymceEditor/index.vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 表单数据
const form = ref({
  priorityLevel: 'high'
});
// ref

onMounted(() => {
  if (props.data) {
    getDetail();
  }
});

// 获取详情
const getDetail = () => {
  MyNoticeApi.detail({ messageId: props.data.messageId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  if (props.data.readFlag == 0) {
    MyNoticeApi.setRead({ messageId: props.data.messageId }).then(res => {});
  }
  emits('done');
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  updateVisible(false);
};
</script>

<style></style>
