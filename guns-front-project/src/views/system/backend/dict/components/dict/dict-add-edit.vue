<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="800"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    style="top: 40px"
    :title="isUpdate ? '编辑字典' : '新建字典'"
    :body-style="{ paddingBottom: '8px', height: '600px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <DictForm v-model:form="form" ref="dictFormRef" :isUpdate="isUpdate" :dictList="dictList"></DictForm>
  </a-modal>
</template>

<script setup name="ConfigAddEdit">
import { ref, onMounted } from 'vue';
import DictForm from './dict-form.vue';
import { message } from 'ant-design-vue';
import { SysDictApi } from '../../api/SysDictApi';
import { getBusinessMaxSort } from '@/utils/common/util';

const props = defineProps({
  visible: Boolean,
  data: Object,
  dictTypeId: String,
  dictTypeName: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  statusFlag: 1,
  dictParentId: '-1',
  dictTypeId: props.dictTypeId,
  dictTypeName: props.dictTypeName
});
// ref
const dictFormRef = ref(null);
// 字典列表
const dictList = ref([]);

onMounted(async() => {
  getDictList();
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    form.value.dictSort = await getBusinessMaxSort('SYSTEM_BASE_DICT');
    isUpdate.value = false;
  }
});

// 获取字典列表
const getDictList = () => {
  SysDictApi.tree({ dictTypeId: props.dictTypeId }).then(res => {
    dictList.value = [{ dictId: '-1', dictName: '根节点', children: res }];
  });
};

// 获取详情
const getDetail = () => {
  SysDictApi.detail({ dictId: props.data.dictId }).then(res => {
    form.value = Object.assign({}, res);
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = async () => {
  dictFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = SysDictApi.edit(form.value);
      } else {
        result = SysDictApi.add(form.value);
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
