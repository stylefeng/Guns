<template>
  <a-row class="table-top">
    <a-table
      :data-source="list"
      :row-key="rowId"
      :size="size"
      class="table"
      :bordered="bordered"
      style="width: 100%"
      :columns="
        columns.filter((col, num) => {
          if (col.isShow) return col;
        })
      "
      :loading="tableLoading"
      :pagination="isPage ? pagination : false"
      @change="tableChange"
      :row-selection="
        rowSelection
          ? {
              type: isRadio ? 'radio' : 'checkbox',
              selectedRowKeys: selectedRowList,
              onChange: onSelectChange,
              onSelect: onSelect,
              checkStrictly: props.checkStrictly,
              onSelectAll: onSelectAll
            }
          : null
      "
      :scroll="list?.length > 0 ? scroll : { y: '100%' }"
      :customRow="customRow"
    >
      <template v-slot:[item]="scope" v-for="item in renderArr">
        <template v-if="item == 'bodyCell'">
          <slot :name="item" :scope="scope" v-bind="scope || {}">
            <template v-if="scope.column.title == '序号'">{{ scope.index + 1 }}</template>
          </slot>
        </template>
        <template v-else>
          <slot :name="item" :scope="scope" v-bind="scope || {}"></slot>
        </template>
      </template>
    </a-table>
  </a-row>
</template>

<script setup name="CommonTable">
import { onMounted, reactive, ref, useSlots, watch } from 'vue';
import Request from '@/utils/request/request-util';

const props = defineProps({
  // 表格配置项
  columns: {
    type: Array,
    default: []
  },
  // 当前行的id
  rowId: {
    type: String,
    default: 'id'
  },
  // 表格接口路径
  url: {
    type: String,
    default: ''
  },
  // 请求方式
  methods: {
    type: String,
    default: 'get'
  },
  // 搜索条件
  where: {
    type: Object,
    default: {}
  },
  // 是否排序
  isSort: {
    type: Boolean,
    default: false
  },
  // 是否显示border
  bordered: {
    type: Boolean,
    default: false
  },
  // 是否展示分页
  isPage: {
    type: Boolean,
    default: true
  },
  isRadio: {
    type: Boolean,
    default: false
  },
  pageSize: {
    type: Number,
    default: 20
  },
  // 滚动配置
  scroll: {
    type: Object,
    default: { x: 'max-content', y: '100%' }
  },
  // 是否初始化时获取接口
  isInit: {
    type: Boolean,
    default: true
  },
  // 是否可选
  rowSelection: {
    type: Boolean,
    default: true
  },
  // 是否开启当行选中
  isShowRowSelect: {
    type: Boolean,
    default: false
  },
  // 表格大小
  size: {
    type: String,
    default: 'small'
  },
  // 父子是否关联--用于树形
  checkStrictly: {
    type: Boolean,
    default: false
  },
  // 自定义数据
  customData: {
    type: Function,
    default: null
  },
  // 数组列表
  dataSource: {
    type: Array,
    default: []
  }
});

const emits = defineEmits(['tableListChange', 'onSelect', 'onSelectAll']);
// 数据列表
const list = ref([]);
// 表格加载动画
const tableLoading = ref(false);
//分页参数
const pagination = reactive({
  current: 1,
  pageSize: props.pageSize, // 默认每页显示数量
  showSizeChanger: true, // 显示可改变每页数量
  showLessItems: true, // 显示较少页面内容
  pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
  showTotal: total => `共 ${total} 条`, // 显示总数
  onShowSizeChange: (current, pageSize) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
  onChange: (page, pageSize) => onPageChange(page, pageSize), //点击页码事件
  total: 0 //总条数
});
//选中项
const selectedRowList = ref([]);
// 是正序还是倒叙
const sortBy = ref('');
// 排序的字段
const orderBy = ref('');
// 当前选中的所有数据
const currentSelectedRows = ref([]);
const slots = useSlots();
const renderArr = Object.keys(slots);

onMounted(() => {
  if (props.isInit) {
    getTableList();
  }
});

// 加载表格数据
const getTableList = () => {
  if (props.url) {
    tableLoading.value = true;
    let params = {
      ...props.where
    };
    // 是否排序
    if (props.isSort) {
      params.sortBy = sortBy.value;
      params.orderBy = orderBy.value;
    }

    // 需要分页
    if (props.isPage) {
      params.pageNo = pagination.current || 1;
      params.pageSize = pagination.pageSize || 20;
    }

    Request[props.methods](props.url, params)
      .then(res => {
        // 需要分页
        if (props.isPage) {
          if (props.customData) {
            res = props.customData(res);
          }
          list.value = res.data.rows;
          pagination.total = res.data.totalRows;
        } else {
          if (props.customData) {
            list.value = props.customData(res);
          }
          list.value = res.data;
        }

        emits('tableListChange', list.value);
      })
      .finally(() => (tableLoading.value = false));
  }
};

// 改变每页数量时更新显示
const onSizeChange = (current, pageSize) => {
  pagination.pageSize = pageSize;
  getTableList();
};

// 表格选中事件
const onSelectChange = selectedRowKeys => {
  selectedRowList.value = selectedRowKeys;
};

// 用户手动选择/取消选择某列的回调
const onSelect = (record, selected, selectedRows) => {
  currentSelectedRows.value = selectedRows;
  emits('onSelect', record, selected, selectedRows);
};

// 用户手动选择/取消选择所有列的回调
const onSelectAll = (selected, selectedRows, changeRows) => {
  emits('onSelectAll', selected, selectedRows, changeRows);
};

//点击页码事件
const onPageChange = (page, pageSize) => {
  if (page != pagination.current) {
    pagination.current = page;
    getTableList();
  }
};

// 排序变化
const tableChange = (pagination, filters, sorter) => {
  if (sorter.order == 'ascend') {
    sortBy.value = 'asc';
  } else if (sorter.order == 'descend') {
    sortBy.value = 'desc';
  }
  orderBy.value = sorter.field;
  if (props.isSort) {
    getTableList();
  }
};

/**
 * 重置
 */
const reload = () => {
  pagination.current = 1;
  getTableList();
};

// 行点击事件
const customRow = (record, index) => {
  return {
    onClick: () => {
      if (props.isShowRowSelect) {
        // 单选
        if (props.isRadio) {
          selectedRowList.value = [record[props.rowId]];
          emits('onSelect', record, true, [record]);
        } else {
          // 多选
          if (currentSelectedRows.value.find(item => item[props.rowId] == record[props.rowId])) {
            selectedRowList.value.splice(
              selectedRowList.value.findIndex(item => item === record[props.rowId]),
              1
            );
            currentSelectedRows.value.splice(
              currentSelectedRows.value.findIndex(item => item[props.rowId] === record[props.rowId]),
              1
            );
            emits('onSelect', record, false, currentSelectedRows.value);
          } else {
            selectedRowList.value.push(record[props.rowId]);
            currentSelectedRows.value.push(record);
            emits('onSelect', record, true, currentSelectedRows.value);
          }
        }
      }
    }
  };
};

watch(
  () => props.dataSource,
  val => {
    if (!props.url) {
      list.value = val;
    }
  },
  { deep: true }
);

defineExpose({
  reload,
  tableLoading,
  selectedRowList
});
</script>

<style scoped lang="less">
.table-top {
  position: relative;
  height: 100%;
  .table-bottom {
    position: absolute;
    bottom: 15px;
    left: -20px;
  }
}
:deep(.table) {
  ::-webkit-scrollbar {
    width: 10px !important;
  }
}
:deep(.ant-spin-nested-loading) {
  height: 100%;
  .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .ant-table-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .ant-table-body {
      position: relative;
      flex: 1;
      table {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
  .ant-table {
    flex: 1;
  }
}
:deep(.ant-table-body) {
  overflow-y: auto;
}
:deep(.ant-table-bordered .ant-table-container::after) {
  border-right: 1.5px solid var(--border-color-split);
  border-bottom: 1.5px solid var(--border-color-split);
}
:deep(.ant-table-bordered div.ant-table-body:before) {
  background: transparent;
}
</style>
