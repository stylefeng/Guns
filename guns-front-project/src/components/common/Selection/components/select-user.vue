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
          <a-input v-model:value="where.searchText" placeholder="姓名、账号（回车搜索）" @pressEnter="reload" style="width: 300px">
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
            rowId="userId"
            ref="tableRef"
            url="/sysUser/page"
            @onSelect="onSelect"
            @onSelectAll="onSelectAll"
            @tableListChange="list => tableListChange(list, 'userId')"
          >
            <template #bodyCell="{ column, record }">
              <!-- 公司 -->
              <template v-if="column.dataIndex == 'company'">
                {{ record?.userOrgDTO?.companyName ? record?.userOrgDTO?.companyName : '' }}
              </template>
              <!-- 部门 -->
              <template v-if="column.dataIndex == 'dept'">
                {{ record?.userOrgDTO?.deptName ? record?.userOrgDTO?.deptName : '' }}
              </template>
              <!-- 职务 -->
              <template v-if="column.dataIndex == 'positionName'">
                {{ record?.userOrgDTO?.positionName ? record?.userOrgDTO?.positionName : '' }}
              </template>
              <!-- 性别 -->
              <template v-if="column.dataIndex == 'sex'">
                <span v-if="record.sex == 'M'">男</span>
                <span v-if="record.sex == 'F'">女</span>
              </template>
              <!-- 状态 -->
              <template v-if="column.dataIndex == 'statusFlag'">
                <span v-if="record.statusFlag == 1">启用</span>
                <span v-if="record.statusFlag == 2">禁用</span>
              </template>
            </template>
          </common-table>
        </div>
      </a-card>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="6" class="height100">
      <selected-list v-model:list="userList" @delete="deleteUser" @deleteAll="deleteAll" />
    </a-col>
  </a-row>
</template>

<script setup name="SelectUser">
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
const userList = ref([]);

// 搜索条件
const where = ref({
  searchText: '',
  orgIdCondition: ''
});
// ref
const tableRef = ref(null);
// 表格配置
const columns = ref([
  {
    dataIndex: 'realName',
    title: '姓名',
    align: 'center',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'company',
    title: '公司',
    align: 'center',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'dept',
    title: '部门',
    align: 'center',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'positionName',
    title: '职务',
    align: 'center',
    width: 100,
    isShow: true
  }
]);

// 左侧树选中
const treeSelect = (selectedKeys, metadata) => {
  where.value.orgIdCondition = selectedKeys[0];
  reload();
};

// 重新查询
const reload = () => {
  tableRef.value.reload();
};

// 选中或取消选中某一列
const onSelect = (record, selected, selectedRows) => {
  props.isRadio ? (userList.value = []) : '';
  radioSelect(record, selected, userList.value, 'userId', 'realName');
};

// 全选反选
const onSelectAll = (selected, selectedRows, changeRows) => {
  checkBox(selected, changeRows, userList.value, 'userId', 'realName');
};

// 表格数据变化
const tableListChange = (list, id) => {
  if (tableRef.value?.selectedRowList) {
    tableRef.value.selectedRowList = getSelectedRowKeys(list, id, userList.value);
  }
};

// 刪除已选单个
const deleteUser = record => {
  userList.value.splice(
    userList.value.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  userList.value = [];
};

// 监听已选数据的变化
watch(
  () => userList.value,
  val => {
    if (tableRef.value) {
      tableListChange(val, 'bizId');
      emits('selectedChange');
    }
  },
  { deep: true }
);

defineExpose({
  userList
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
