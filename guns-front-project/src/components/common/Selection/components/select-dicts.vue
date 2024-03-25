<template>
  <a-row class="user-select" :gutter="16">
    <a-col :span="6" class="height100">
      <common-table
        :columns="typeColumns"
        bordered
        :isSort="false"
        :isPage="false"
        rowId="dictTypeId"
        :isRadio="props.isRadio"
        ref="tableTypeRef"
        url="/dictType/list"
        isShowRowSelect
        @onSelect="dictTypeSelect"
      ></common-table>
    </a-col>
    <!-- 字典选择 -->
    <a-col :span="12" class="height100">
      <common-table
        :columns="columns"
        :where="where"
        bordered
        isShowRowSelect
        :isLoad="where.dictTypeCode ? false : true"
        :isSort="false"
        :isPage="false"
        rowId="dictId"
        ref="tableRef"
        :isRadio="props.isRadio"
        url="/dict/list"
        @onSelect="onSelect"
        @onSelectAll="onSelectAll"
      ></common-table>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="6" class="height100">
      <selected-list v-model:list="dictList" @delete="deleteRelation" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup name="SelectDicts">
import { radioSelect, checkBox, getSelectedRowKeys } from './common';
import { ref, watch, nextTick } from 'vue';
import SelectedList from './selected-list.vue';

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
//已选列表
const dictList = ref([]);
// 搜索条件
const where = ref({
  dictTypeId: ''
});
//类型数据
const typeData = ref(null);
//字典类型表格配置
const typeColumns = ref([
  {
    title: '类型',
    dataIndex: 'dictTypeName',
    isShow: true,
    width: 120,
    ellipsis: true
  },
  {
    title: '编码',
    isShow: true,
    ellipsis: true,
    width: 120,
    dataIndex: 'dictTypeCode'
  }
]);
//字典配置
const columns = ref([
  {
    title: '名称',
    isShow: true,
    ellipsis: true,
    dataIndex: 'dictName'
  },
  {
    title: '编码',
    isShow: true,
    ellipsis: true,
    dataIndex: 'dictCode'
  }
]);

const tableRef = ref(null);
const tableTypeRef = ref(null);

// 删除已选单行
const deleteRelation = record => {
  dictList.value.splice(
    dictList.value.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  dictList.value = [];
};

// 字典类型点击
const dictTypeSelect = (record, selected, selectedRows) => {
  typeData.value = record;
  where.value.dictTypeId = record.dictTypeId;
  reload();
};

// 选中或取消选中某一列
const onSelect = (record, selected, selectedRows) => {
  props.isRadio ? (dictList.value = []) : '';
  radioSelect(record, selected, dictList.value, 'dictId', 'dictName');
};

// 全选反选
const onSelectAll = (selected, selectedRows, changeRows) => {
  checkBox(selected, changeRows, dictList.value, 'dictId', 'dictName');
};

// 表格数据变化
const tableListChange = (list, id) => {
  tableRef.value.selectedRowKeys = getSelectedRowKeys(list, id, dictList.value);
};

// 监听已选列表变化
watch(
  () => dictList.value,
  val => {
    tableListChange(val, 'bizId');
    emits('selectedChange');
  },
  { deep: true }
);

// 搜索
const reload = () => {
  nextTick(() => {
    tableRef.value.reload();
  });
};

defineExpose({
  dictList
});
</script>

<style scoped lang="less">
.user-select {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
:deep(.ant-card-body) {
  padding: 0;
  height: 100%;
}
.search {
  height: 40px;
  line-height: 40px;
}
.user-table {
  height: calc(100% - 50px);
  padding: 10px 0;
}
</style>
