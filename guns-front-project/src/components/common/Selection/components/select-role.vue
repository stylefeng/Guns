<template>
  <a-row class="user-select" :gutter="16">
    <a-col :span="12" class="height100">
      <a-card :bordered="false" style="height: 100%">
        <!-- 搜索 -->
        <div class="search">
          <a-input v-model:value="where.roleName" placeholder="角色名称（回车搜索）" @pressEnter="reload" style="width: 300px">
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
            rowId="roleId"
            ref="tableRef"
            url="/sysRole/page"
            @onSelect="onSelect"
            @onSelectAll="onSelectAll"
            @tableListChange="list => tableListChange(list, 'roleId')"
          >
            <template #bodyCell="{ column, index }">
              <template v-if="column.key == 'index'">
                {{ index + 1 }}
              </template>
            </template>
          </common-table>
        </div>
      </a-card>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="12" class="height100">
      <selected-list v-model:list="roleList" @delete="deleteUser" @deleteAll="deleteAll" />
    </a-col>
  </a-row>
</template>

<script setup name="SelectPosition">
import { ref, watch } from 'vue';
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
const roleList = ref([]);

// 搜索条件
const where = ref({
  roleName: ''
});
// ref
const tableRef = ref(null);
// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 48,
    align: 'center',
    isShow: true
  },
  {
    dataIndex: 'roleName',
    title: '角色名称',
    align: 'center',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'roleCode',
    title: '角色编码',
    width: 100,
    align: 'center',
    isShow: true
  }
]);

// 重新查询
const reload = () => {
  tableRef.value.reload();
};

// 选中或取消选中某一列
const onSelect = (record, selected, selectedRows) => {
  props.isRadio ? (roleList.value = []) : '';
  radioSelect(record, selected, roleList.value, 'roleId', 'roleName');
};

// 全选反选
const onSelectAll = (selected, selectedRows, changeRows) => {
  checkBox(selected, changeRows, roleList.value, 'roleId', 'roleName');
};

// 表格数据变化
const tableListChange = (list, id) => {
  if (tableRef.value?.selectedRowList) {
    tableRef.value.selectedRowList = getSelectedRowKeys(list, id, roleList.value);
  }
};

// 刪除已选单个
const deleteUser = record => {
  roleList.value.splice(
    roleList.value.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  roleList.value = [];
};

// 监听已选数据的变化
watch(
  () => roleList.value,
  val => {
    if (tableRef.value) {
      tableListChange(val, 'bizId');
      emits('selectedChange');
    }
  },
  { deep: true }
);

defineExpose({
  roleList
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
