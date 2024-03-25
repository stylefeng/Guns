<!--公司选择组件-->
<template>
  <a-row class="user-select" :gutter="16">
    <!-- 公司选择 -->
    <a-col :span="12" class="height100">
      <SelectionOrgTree @treeSelect="treeSelect" :company-search-flag="true" ref="selectionOrgTreeRef"></SelectionOrgTree>
    </a-col>

    <!-- 已选列表 -->
    <a-col :span="12" class="common-height paddingTop10">
      <selected-list v-model:list="companyList" @delete="deleteCompany" @deleteAll="deleteAll" />
    </a-col>
  </a-row>
</template>

<script setup>
import { ref, watch } from 'vue';
import SelectedList from './selected-list.vue';
import SelectionOrgTree from '@/components/common/Selection/components/org-tree.vue';

const props = defineProps({
  // 是否单选
  isRadio: {
    type: Boolean,
    default: true
  },
  //是否显示tab栏
  isShowTab: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['selectedChange']);

// 已选公司列表
const companyList = ref([]);

// ref
const selectionOrgTreeRef = ref();

// 树选择
const treeSelect = (selectedKeys, info) => {
  let bizId = info.node.orgId;
  let obj = {
    bizId: bizId,
    name: info.node.orgName
  };

  // 是否多选
  if (!props.isRadio) {
    // 如果选中的公司列表中没有该公司则push到数组中
    if (companyList.value.filter(item => item.bizId === bizId).length === 0) {
      companyList.value.push(obj);
    }
  } else {
    companyList.value = [obj];
  }
};

// 已选删除单个
const deleteCompany = record => {
  companyList.value.splice(
    companyList.value.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  companyList.value = [];
};

// 监听已选列表变化
watch(
  () => companyList.value,
  val => {
    emits('selectedChange');
    if (props.isRadio && selectionOrgTreeRef.value) {
      if (val?.length) {
        selectionOrgTreeRef.value.currentSelectKeys = [val[0].bizId];
      } else {
        selectionOrgTreeRef.value.currentSelectKeys = [];
      }
    }
  },
  { deep: true }
);

defineExpose({
  companyList
});
</script>

<style scoped lang="less">
.user-select {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:deep(.ant-card-body) {
  height: 100%;
  overflow: auto;
}
</style>
