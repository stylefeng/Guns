<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑职位' : '新建职位'"
    :body-style="{ paddingBottom: '8px', height: '500px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <position-form v-model:form="form" ref="positionFormRef"></position-form>
  </a-modal>
</template>

<script setup name="PositionAddEdit">
import { ref, onMounted } from 'vue';
import PositionForm from './position-form.vue';
import { message } from 'ant-design-vue';
import { PositionApi } from '../api/PositionApi';
import { getBusinessMaxSort } from '@/utils/common/util';

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
const form = ref({});
// ref
const positionFormRef = ref(null);

onMounted(async() => {
  if (props.data) {
    isUpdate.value = true;
    form.value = Object.assign({}, props.data);
  } else {
    form.value.positionSort = await getBusinessMaxSort('SYSTEM_HR_POSITION');
    isUpdate.value = false;
  }
});

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  positionFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = PositionApi.edit(form.value);
      } else {
        result = PositionApi.add(form.value);
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
