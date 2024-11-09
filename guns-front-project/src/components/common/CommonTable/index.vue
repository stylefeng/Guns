<template>
  <div :class="['table-top', { 'table-fullscreen': tableFullscreen }, { 'table-height-100': props.height100 }]">
    <div class="table-tool" v-if="props.showTool">
      <div class="table-tool-top">
        <div class="table-tool-top-left">
          <a-space :size="16" class="table-tool-top-left-space">
            <span class="total-num" v-if="showToolTotal">共 {{ props.isPage ? pagination.total : list?.length }} 个</span>
            <slot name="toolLeft"></slot>
          </a-space>
        </div>
        <div class="table-tool-top-right">
          <a-space :size="16">
            <slot name="toolRight"></slot>
            <!-- 工具栏 -->
            <TableTool
              v-if="props.showTableTool"
              :tools="props.tools"
              :size="tableSize"
              :cacheKey="cacheKey"
              :fullscreen="tableFullscreen"
              @reload="reload"
              :columns="tableColumn"
              :fieldBusinessCode="props.fieldBusinessCode"
              @update:size="onTableSizeChange"
              @update:columns="onColumnsChange"
              @update:fullscreen="onFullscreenChange"
            />
          </a-space>
        </div>
      </div>
      <div class="table-tool-bottom">
        <slot name="toolBottom"></slot>
      </div>
    </div>
    <a-table
      :data-source="list"
      :row-key="rowId"
      :size="tableSize"
      class="table"
      :bordered="bordered"
      :columns="
        tableColumn.filter((col, num) => {
          if (col?.checked) return col;
        })
      "
      :loading="tableLoading"
      :defaultExpandedRowKeys="props.defaultExpandedRowKeys"
      v-model:expandedRowKeys="expandedRowKeys"
      :expandIconColumnIndex="props.expandIconColumnIndex"
      :pagination="isPage ? pagination : false"
      @change="tableChange"
      @expand="expand"
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
      :childrenColumnName="props.childrenColumnName"
    >
      <template v-slot:[item]="scope" v-for="item in renderArr" :key="item + 'slot'">
        <template v-if="item == 'bodyCell'">
          <slot :name="item" :scope="scope" v-bind="scope || {}">
            <template v-if="scope.column?.title == '序号'">{{ scope.index + 1 }}</template>
          </slot>
        </template>
        <template v-else>
          <slot :name="item" :scope="scope" v-bind="scope || {}"></slot>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { getCacheSize, getInitColumnsAndCache } from './util';
import { onMounted, reactive, ref, useSlots, watch, nextTick, defineAsyncComponent } from 'vue';
import Request from '@/utils/request/request-util';
import { camelToUnderline } from '@/utils/common/util';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

const TableTool = defineAsyncComponent(() => import('./components/table-tool.vue'));

defineOptions({
  name: 'GunsTable'
});

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
  },
  expandIconColumnIndex: {
    type: Number,
    default: 0
  },
  isLoad: {
    type: Function,
    default: () => {
      return true;
    }
  },
  // 多选选中数据, v-model
  selection: Array,
  // 外部加载
  loading: {
    type: Boolean,
    default: false
  },
  // 默认展开的行
  defaultExpandedRowKeys: Array,
  // 展开的行控制属性
  expandedRowKeys: Array,
  // 是否顶部操作栏
  showTool: {
    type: Boolean,
    default: true
  },
  // 是否显示操作栏
  showTableTool: {
    type: Boolean,
    default: false
  },
  // 工具按钮布局
  tools: {
    type: Array,
    default: () => {
      return ['reload', 'size', 'columns', 'fullscreen'];
    }
  },
  // 列配置缓存本地的 key
  cacheKey: String,
  // 业务标识的编码  用于自定义列
  fieldBusinessCode: {
    type: String,
    default: ''
  },
  // 是否显示头部总数
  showToolTotal: {
    type: Boolean,
    default: true
  },
  // children 名称
  childrenColumnName: {
    type: String,
    default: 'children'
  },
  // 是否拼接参数到url上
  montageParams: {
    type: Boolean,
    default: false
  },
  height100: {
    type: Boolean,
    default: true
  }
});

const emits = defineEmits([
  'tableListChange',
  'onSelect',
  'onSelectAll',
  'customRowClick',
  'getTotal',
  'update:selection',
  'expand',
  'size-change',
  'columns-change',
  'fullscreen-change'
]);
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

// 展开行设置
const expandedRowKeys = ref([]);

// 表格大小
const tableSize = ref('small');

// 是否是全屏状态
const tableFullscreen = ref(false);

// 表格列配置
const tableColumn = ref([]);

onMounted(() => {
  getColumnConfig(true);

  if (props.isInit) {
    getTableList();
  }
});

// 获取列配置
const getColumnConfig = async (init = false) => {
  let newColumns = props.columns;
  if (props.fieldBusinessCode && init) {
    const res = await CustomApi.getUserConfig({ fieldBusinessCode: props.fieldBusinessCode });
    if (res.tableWidthJson) {
      newColumns = JSON.parse(res.tableWidthJson);
    }
  }
  if (newColumns) {
    tableColumn.value = getInitColumnsAndCache(newColumns, props.cacheKey, true);
  } else {
    tableColumn.value = [];
  }
};

// 加载表格数据
const getTableList = () => {
  expandedRowKeys.value = [];
  if (props.url && props.isLoad()) {
    tableLoading.value = true;
    let params = {
      ...props.where
    };
    // 是否排序
    if (props.isSort) {
      params.sortBy = sortBy.value;
      params.orderBy = camelToUnderline(orderBy.value);
    }

    // 需要分页
    if (props.isPage) {
      params.pageNo = pagination.current || 1;
      params.pageSize = pagination.pageSize || 20;
    }

    // 用于post拼接参数到url上
    let requestUrl = '';
    if (props.montageParams) {
      if (params === undefined) {
        params = {};
      }
      let paramUrl = '?';
      for (let field in params) {
        if (params[field]) {
          paramUrl = paramUrl + field + '=' + params[field] + '&';
        }
      }
      paramUrl = paramUrl.substring(0, paramUrl.length - 1);
      requestUrl = `${props.url}${paramUrl}`;
    } else {
      requestUrl = props.url;
    }
    Request[props.methods](requestUrl, props.montageParams ? {} : params)
      .then(res => {
        // 需要分页
        if (props.isPage) {
          if (props.customData) {
            res = props.customData(res);
          }
          list.value = res.data.rows;
          pagination.total = res.data.totalRows;
          emits('getTotal', res.data.totalRows);
        } else {
          if (props.customData) {
            list.value = props.customData(res);
          }
          list.value = res.data;
          emits('getTotal', list.value?.length ?? 0);
        }

        // emits('tableListChange', list.value);
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
const onSelectChange = (selectedRowKeys, rows) => {
  selectedRowList.value = selectedRowKeys;

  const selectedRows = selectedRowKeys
    .map(k => {
      const temp = rows.find(d => getFieldValue(d, props.rowId) === k);
      if (temp != null) {
        return temp;
      }
      if (props.selection == null || !props.selection.length) {
        return null;
      }
      return props.selection.find(t => getFieldValue(t, props.rowId) === k);
    })
    .filter(d => d != null);
  emits('update:selection', selectedRows);
};

/**
 * 获取任意数据任意字段的值, 支持多层 *.*
 * @param data 数据
 * @param field 字段
 */
const getFieldValue = (data, field) => {
  if (typeof field === 'function') {
    return field(data);
  }
  if (field) {
    let value = data;
    field.split('.').forEach(f => {
      value = value ? value[f] : null;
    });
    return value;
  }
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
  nextTick(() => {
    pagination.current = 1;
    getTableList();
  });
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
      emits('customRowClick', record, index);
    }
  };
};

// 展开
const expand = (expanded, record) => {
  emits('expand', expanded, record);
};

const setList = data => {
  setTimeout(() => {
    list.value = [...data];
  }, 500);
};

/* 表格大小事件 */
const onTableSizeChange = value => {
  tableSize.value = value;
  emits('size-change', value);
};

/* 表格列改变事件 */
const onColumnsChange = value => {
  tableColumn.value = value;
  emits('columns-change', value);
};

/* 表格全屏切换切换事件 */
const onFullscreenChange = value => {
  tableFullscreen.value = value;
  emits('fullscreen-change', value);
};

watch(
  () => props.dataSource,
  val => {
    if (!props.url) {
      list.value = val;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => props.columns,
  columns => {
    onColumnsChange(columns);
  },
  {
    deep: true
  }
);

watch(
  () => props.selection,
  selection => {
    if (props.isRadio) {
      return;
    }
    if (selection?.length) {
      const keys = selection.map(d => getFieldValue(d, props.rowId));
      if (keys.length !== selectedRowList.value.length) {
        selectedRowList.value = keys;
      } else {
        for (let i = 0; i < keys.length; i++) {
          if (!selectedRowList.value.includes(keys[i])) {
            selectedRowList.value = keys;
            return;
          }
        }
      }
    } else if (selectedRowList.value.length) {
      selectedRowList.value = [];
    }
  },
  {
    immediate: true,
    deep: true
  }
);

watch(
  () => props.loading,
  val => {
    tableLoading.value = val;
  }
);

watch(
  () => props.expandedRowKeys,
  val => {
    expandedRowKeys.value = val;
  },
  { deep: true }
);

watch(
  () => props.size,
  val => {
    tableSize.value = getCacheSize(props.cacheKey) ?? props.size ?? 'small';
  },
  { deep: true, immediate: true }
);

defineExpose({
  reload,
  list,
  setList,
  expandedRowKeys,
  tableLoading,
  selectedRowList
});
</script>

<style scoped lang="less">
.table-top {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-bottom {
    position: absolute;
    bottom: 15px;
    left: -20px;
  }
}
.table-tool {
  min-height: 50px;
  padding: 8px 16px;
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(197, 207, 209, 0.4);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  .table-tool-top {
    width: 100%;
    height: auto;
    flex: auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    .table-tool-top-left,
    .table-tool-top-right {
      display: flex;
      flex: auto;
      align-items: center;
    }
    .table-tool-top-left {
      margin-right: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .table-tool-top-right {
      white-space: nowrap;
      justify-content: end;
    }

    .table-tool-top-left-space {
      width: 100%;

      :deep(.ant-space-item:last-child) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .table-tool-bottom {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.total-num {
  font-size: 16px;
  color: #60666b;
}
:deep(.ant-table) {
  border-left: 1px solid rgba(197, 207, 209, 0.4);
  border-right: 1px solid rgba(197, 207, 209, 0.4);
  border-bottom: 1px solid rgba(197, 207, 209, 0.4);
  border-top: v-bind('props.showTool ? 0 : "1px solid rgba(197, 207, 209, 0.4)"');
}
:deep(.table) {
  width: 100%;
  flex: auto;
  ::-webkit-scrollbar {
    width: 10px !important;
  }
}
.table-height-100 {
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

.table-fullscreen {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 0 0 16px 0;
  box-sizing: border-box;
  background: #fff;

  .ant-table-pagination {
    margin-bottom: 0;
    padding: 0 16px;
  }
}

@media screen and (max-width: 768px) {
  .table-tool {
    justify-content: left;
    min-height: 50px;
    height: auto !important;
    flex-wrap: wrap;
  }
  .table-tool-top-left,
  .table-tool-top-right {
    flex: none !important;
  }

  .table-tool-top-left {
    margin-right: 10px;
  }

  :deep(.ant-table-thead .ant-table-cell-fix-right-first) {
    right: 1px !important;
  }
}
</style>
