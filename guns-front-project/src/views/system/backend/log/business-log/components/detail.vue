<template>
  <div class="guns-layout">
    <div class="guns-layout-content">
      <div class="guns-layout">
        <div class="guns-layout-content-application">
          <div class="content-mian">
            <div class="content-mian-header">
              <div class="header-content">
                <div class="header-content-left">
                  <a-space :size="16">
                    <a-input v-model:value="where.searchText" placeholder="日志内容 (回车搜索)" @pressEnter="search" class="search-input">
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>

                    <a-button @click="clearSearch" class="border-radius">重置</a-button>
                    <a-button @click="callbackUp" class="border-radius">返回</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16"> </a-space>
                </div>
              </div>
            </div>
            <div class="content-mian-body">
              <div class="table-content">
                <common-table
                  :columns="columns"
                  :where="where"
                  :rowSelection="false"
                  :pageSize="100"
                  :isInit="false"
                  ref="tableRef"
                  url="/sysLogBusinessContent/page"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'logContent'">
                      <div v-html="getContent(record.logContent)"></div>
                    </template>
                  </template>
                </common-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="BusinessLogDetail">
import { onMounted, ref } from 'vue';

const emits = defineEmits(['updateType']);

const props = defineProps({
  // 业务日志id
  businessLogId: {
    type: String
  }
});

// table dom
const tableRef = ref(null);

// 表格字段
const columns = ref([
  {
    title: '序号',
    isShow: true,
    width: 50
  },
  {
    title: '日志记录内容',
    isShow: true,
    dataIndex: 'logContent'
  }
]);

// 搜索条件
const where = ref({
  businessLogId: '',
  searchText: ''
});

/**
 * 搜索
 */
const search = () => {
  tableRef.value.reload();
};

// 获取内容
const getContent = content => {
  let data = '';
  if (content) {
    data = content.replace(new RegExp('\n', 'g'), '<br>');
  }
  return data;
};

/**
 * 清空搜索
 */
const clearSearch = () => {
  where.value.searchText = '';
  search();
};

/**
 * 返回
 */
const callbackUp = () => {
  emits('updateType', { type: 'list', businessLogId: null });
};

onMounted(() => {
  where.value.businessLogId = props.businessLogId;
  where.value.searchText = '';
  search();

  document.addEventListener('keydown', function (event) {
    // 判断按下的按键是否是 Backspace 键
    if (event.key === 'Backspace') {
      // 判断焦点是否在输入框中
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && activeElement.tagName === 'INPUT';

      if (!isInputFocused) {
        // 在这里执行 Backspace 按键被按下时的操作
        callbackUp();
      }
    }
  });
});
</script>

<style scoped lang="less">
.table-record-title {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
