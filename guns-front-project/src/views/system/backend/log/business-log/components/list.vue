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
                    <a-input
                      v-model:value="where.logTypeCode"
                      placeholder="日志业务分类编码 (回车搜索)"
                      @pressEnter="search"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>

                    <a-input
                      v-model:value="where.searchText"
                      placeholder="日志标题或请求URL (回车搜索)"
                      @pressEnter="search"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clearSearch">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-dropdown>
                      <template #overlay>
                        <a-menu @click="moreClick">
                          <a-menu-item key="1">
                            <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                            <span>自定义列</span>
                          </a-menu-item>
                        </a-menu>
                      </template>
                      <a-button class="border-radius">
                        更多
                        <small-dash-outlined />
                      </a-button>
                    </a-dropdown>
                  </a-space>
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
                  ref="tableRef"
                  url="/sysLogBusiness/page"
                >
                  <template #bodyCell="{ column, record }">
                    <!-- 日志业务分类编码 -->
                    <template v-if="column.dataIndex === 'logTypeCode'">
                      <span class="table-record-title" @click="logTypeCodeClick(record.logTypeCode)">{{ record.logTypeCode }}</span>
                    </template>

                    <!-- 日志标题 -->
                    <template v-if="column.dataIndex === 'logTitle'">
                      <span class="table-record-title" @click="detail(record)">{{ record.logTitle }}</span>
                    </template>

                    <!-- table操作栏按钮 -->
                    <template v-else-if="column.key === 'action'">
                      <a-space>
                        <icon-font
                          iconClass="icon-opt-xiangqing"
                          font-size="24px"
                          title="详情"
                          color="#60666b"
                          @click="detail(record)"
                        ></icon-font>
                      </a-space>
                    </template>
                  </template>
                </common-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义列 -->
    <Custom
      v-model:visible="isShowCustom"
      v-if="isShowCustom"
      :data="columns"
      @done="val => (columns = val)"
      :fieldBusinessCode="fieldBusinessCode"
    />
  </div>
</template>

<script setup name="BusinessLogList">
import { onMounted, ref } from 'vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

const emits = defineEmits(['updateType']);

// 是否显示自定义列
const isShowCustom = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('BUSINESS_LOG_TABLE');

// table dom
const tableRef = ref(null);

// 表格字段
const columns = ref([
  {
    title: '序号',
    isShow: true,
    align: 'center',
    width: 50
  },
  {
    title: '日志的业务分类',
    isShow: true,
    width: 200,
    dataIndex: 'logTypeCode'
  },
  {
    title: '日志标题(摘要)',
    isShow: true,
    width: 150,
    ellipsis: true,
    dataIndex: 'logTitle'
  },
  {
    title: '请求URL',
    isShow: true,
    width: 100,
    dataIndex: 'requestUrl'
  },
  {
    title: 'HTTP方法',
    isShow: true,
    width: 100,
    dataIndex: 'httpMethod'
  },
  {
    title: '客户端IP',
    isShow: true,
    width: 100,
    dataIndex: 'clientIp'
  },
  {
    title: '业务操作用户ID',
    isShow: true,
    width: 150,
    dataIndex: 'userId'
  },
  {
    title: '创建时间',
    isShow: true,
    dataIndex: 'createTime',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    isShow: true,
    width: 130,
    fixed: 'right'
  }
]);

// 搜索条件
const where = ref({
  logTypeCode: '',
  searchText: ''
});

/**
 * 搜索
 */
const search = () => {
  tableRef.value.reload();
};

/**
 * 清空搜索
 */
const clearSearch = () => {
  where.value.logTypeCode = '';
  where.value.searchText = '';
  search();
};

const logTypeCodeClick = val => {
  where.value.logTypeCode = val;
  search();
};

/**
 * 跳转到日志详情
 * @param row
 */
const detail = row => {
  emits('updateType', { type: 'detail', businessLogId: row.businessLogId });
};

// 更多点击
const moreClick = ({ key }) => {
  if (key === '1') {
    isShowCustom.value = true;
  }
};

/**
 * 获取表格配置
 */
const getColumnData = () => {
  CustomApi.getUserConfig({ fieldBusinessCode: fieldBusinessCode.value }).then(res => {
    if (res.tableWidthJson) {
      columns.value = JSON.parse(res.tableWidthJson);
    }
  });
};

onMounted(() => {
  getColumnData();
});
</script>

<style scoped lang="less">
.table-record-title {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
