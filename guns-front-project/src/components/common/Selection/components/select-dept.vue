<template>
  <a-row class="user-select" :gutter="16">
    <!-- 公司部门选择 -->
    <a-col :span="6" class="height100">
      <SelectionOrgTree @treeSelect="treeSelect"></SelectionOrgTree>
    </a-col>
    <!-- 人员表格 -->
    <a-col :span="12" class="height100">
      <a-card :bordered="false" style="height: 100%">
        <!-- 搜索 -->
        <div class="search">
          <a-input v-model:value="where.searchText" placeholder="组织名称、编码（回车搜索）" @pressEnter="reload" style="width: 300px">
            <template #prefix>
              <icon-font iconClass="icon-opt-search"></icon-font>
            </template>
          </a-input>
        </div>
        <div class="user-table">
          <common-table
            :columns="columns"
            :where="where"
            bordered
            isShowRowSelect
            :isRadio="props.isRadio"
            rowId="orgId"
            ref="tableRef"
            url="/common/org/pageList"
            @onSelect="onSelect"
            @onSelectAll="onSelectAll"
            @tableListChange="list => tableListChange(list, 'orgId')"
          >
            <template #bodyCell="{ column, record }">
              <!-- 状态 -->
              <template v-if="column.dataIndex == 'statusFlag'">
                <a-tag color="blue" v-if="record.statusFlag == 1">启用</a-tag>
                <a-tag color="red" v-if="record.statusFlag == 2">禁用</a-tag>
              </template>
              <template v-if="column.dataIndex == 'orgType'">
                <a-tag color="cyan" v-if="record.orgType == 1">公司</a-tag>
                <a-tag color="purple" v-if="record.orgType == 2">部门</a-tag>
              </template>
            </template>
          </common-table>
        </div>
      </a-card>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="6" class="height100">
      <selected-list v-model:list="deptList" @delete="deleteUser" @deleteAll="deleteAll" />
    </a-col>
  </a-row>
</template>

<script setup name="SelectDept">
import { ref, watch } from 'vue';
import SelectionOrgTree from './org-tree.vue';
import { radioSelect, checkBox, getSelectedRowKeys } from './common';

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
// 选中列表
const deptList = ref([]);

// 搜索条件
const where = ref({
  searchText: '',
  orgId: ''
});
// ref
const tableRef = ref(null);
// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    isShow: true,
    hideInSetting: true
  },
  {
    dataIndex: 'companyName',
    title: '所属公司',
    align: 'center',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'orgName',
    title: '名称',
    align: 'center',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'orgCode',
    title: '编码',
    width: 100,
    align: 'center',
    isShow: true
  },
  {
    dataIndex: 'statusFlag',
    title: '状态',
    align: 'center',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'orgType',
    title: '类型',
    align: 'center',
    width: 100,
    fixed: 'right',
    isShow: true
  }
]);

// 左侧树选中
const treeSelect = (selectedKeys, metadata) => {
  where.value.orgId = selectedKeys[0];
  reload();
};

// 重新查询
const reload = () => {
  tableRef.value.reload();
};

// 选中或取消选中某一列
const onSelect = (record, selected, selectedRows) => {
  props.isRadio ? (deptList.value = []) : '';
  radioSelect(record, selected, deptList.value, 'orgId', 'orgName');
};

// 全选反选
const onSelectAll = (selected, selectedRows, changeRows) => {
  checkBox(selected, changeRows, deptList.value, 'orgId', 'orgName');
};

// 表格数据变化
const tableListChange = (list, id) => {
  if (tableRef.value?.selectedRowList) {
    tableRef.value.selectedRowList = getSelectedRowKeys(list, id, deptList.value);
  }
};

// 刪除已选单个
const deleteUser = record => {
  deptList.value.splice(
    deptList.value.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  deptList.value = [];
};

// 监听已选数据的变化
watch(
  () => deptList.value,
  val => {
    if (tableRef.value) {
      tableListChange(val, 'bizId');
      emits('selectedChange');
    }
  },
  { deep: true }
);

defineExpose({
  deptList
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
