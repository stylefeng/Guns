<template>
  <a-modal
    :width="900"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="操作日志详情"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <a-descriptions bordered :column="2" size="default">
      <a-descriptions-item label="服务名称">{{ form.appName }}</a-descriptions-item>
      <a-descriptions-item label="日志名称">{{ form.logName }}</a-descriptions-item>
      <a-descriptions-item label="日志内容" :span="2">{{ form.logContent }}</a-descriptions-item>
      <a-descriptions-item label="请求地址">{{ form.requestUrl }}</a-descriptions-item>
      <a-descriptions-item label="请求方式">{{ form.httpMethod }}</a-descriptions-item>
      <a-descriptions-item label="服务IP">{{ form.serverIp }}</a-descriptions-item>
      <a-descriptions-item label="客户端IP">{{ form.clientIp }}</a-descriptions-item>
      <a-descriptions-item label="用户名称">{{ form.userIdWrapper }}</a-descriptions-item>
      <a-descriptions-item label="公司名称">{{ form.userCurrentOrgIdWrapper }}</a-descriptions-item>
      <a-descriptions-item label="浏览器">{{ form.clientBrowser }}</a-descriptions-item>
      <a-descriptions-item label="操作系统">{{ form.clientOs }}</a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-collapse :active-key="['1', '2']">
      <a-collapse-panel key="1" header="请求参数">
        <p>{{ form.requestParams }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="响应参数">
        <p>{{ form.requestResult }}</p>
      </a-collapse-panel>
    </a-collapse>
  </a-modal>
</template>

<script setup name="OperateLogDetail">
import { ref, onMounted } from 'vue';
import { OperateLogApi } from '../api/OperateLogApi';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 表单数据
const form = ref({});

onMounted(() => {
  if (props.data) {
    getDetail();
  }
});

const getDetail = async () => {
  OperateLogApi.detail({ logId: props.data.logId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = () => {
  updateVisible(false);
};
</script>

<style scoped lang="less">
:deep(.ant-input) {
  --disabled-color: black;
}
</style>
