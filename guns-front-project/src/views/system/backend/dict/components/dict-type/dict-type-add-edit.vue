<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑字典类型' : '新建字典类型'"
    :body-style="{ paddingBottom: '8px', height: '500px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <DictTypeForm v-model:form="form" ref="typeFormRef" :isUpdate="isUpdate"></DictTypeForm>
  </a-modal>
</template>

<script setup name="ConfigTypeAddEdit">
import { ref, onMounted } from 'vue';
import DictTypeForm from './dict-type-form.vue';
import { message } from 'ant-design-vue';
import { getBusinessMaxSort } from '@/utils/common/util';
import { SysDictTypeApi } from '../../api/SysDictTypeApi';

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
  statusFlag: 1,
  dictTypeClass: 1
});
// ref
const typeFormRef = ref(null);

onMounted(async() => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    form.value.dictTypeSort = await getBusinessMaxSort('SYSTEM_BASE_DICT_TYPE');
    isUpdate.value = false;
  }
});

// 获取详情
const getDetail = () => {
  SysDictTypeApi.detail({ dictTypeId: props.data.dictTypeId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  typeFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = SysDictTypeApi.edit(form.value);
      } else {
        result = SysDictTypeApi.add(form.value);
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
