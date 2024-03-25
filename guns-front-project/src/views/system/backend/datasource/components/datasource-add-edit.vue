<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑数据源' : '新建数据源'"
    :body-style="{ paddingBottom: '8px', height: '580px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <data-source-form v-model:form="form" ref="datasourceFormRef"></data-source-form>
  </a-modal>
</template>

<script setup name="DatasourceAddEdit">
import { ref, onMounted } from 'vue';
import DataSourceForm from './datasource-form.vue';
import { message } from 'ant-design-vue';
import { DataSourceApi } from '../api/DataSourceApi';

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
const datasourceFormRef = ref(null);

onMounted(() => {
  if (props.data) {
    isUpdate.value = true;
    form.value = Object.assign({}, props.data);
  } else {
    isUpdate.value = false;
  }
});

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  datasourceFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = DataSourceApi.edit(form.value);
      } else {
        result = DataSourceApi.add(form.value);
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
