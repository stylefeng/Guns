<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="800"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="isUpdate ? '编辑菜单' : '新建菜单'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    class="common-modal"
    @close="updateVisible(false)"
  >
    <menu-form v-model:form="form" ref="menuFormRef" :isUpdate="isUpdate"></menu-form>
  </a-modal>
</template>

<script setup name="MenuAddEdit">
import { ref, onMounted } from 'vue';
import MenuForm from './menu-form.vue';
import { message } from 'ant-design-vue';
import { MenuApi } from '../api/MenuApi';

const props = defineProps({
  visible: Boolean,
  data: Object,
  //应用id
  appId: String,
  //上机菜单id
  menuParentId: String,
  //上机菜单名称
  menuParentName: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 是否是编辑状态
const isUpdate = ref(false);
// 表单数据
const form = ref({
  antdvVisible: 'Y',
  menuSort: 100,
  menuType: 10,
  appId: props.appId,
  menuParentId: props.menuParentId,
  menuParentName: props.menuParentName
});
// ref
const menuFormRef = ref(null);

onMounted(() => {
  if (props.data) {
    isUpdate.value = true;
    getDetail();
  } else {
    isUpdate.value = false;
  }
});

// 获取详情
const getDetail = () => {
  MenuApi.detail({ menuId: props.data.menuId }).then(res => {
    form.value = Object.assign({}, res);
    form.value.menuId = props.data.menuId;
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = () => {
  menuFormRef.value.$refs.formRef.validate().then(async valid => {
    if (valid) {
      // 修改加载框为正在加载
      loading.value = true;

      let result = null;

      // 执行编辑或修改
      if (isUpdate.value) {
        result = MenuApi.edit(form.value);
      } else {
        result = MenuApi.add(form.value);
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
