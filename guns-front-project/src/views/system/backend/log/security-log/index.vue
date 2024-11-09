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
                      v-model:value="where.logContent"
                      placeholder="安全日志内容（回车搜索）"
                      @pressEnter="reload"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a @click="changeSuperSearch" :class="{ 'fold-btn': isSuperSearch }">{{ isSuperSearch ? '收起' : '高级筛选' }}</a>
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
              <div class="super-search" v-show="isSuperSearch">
                <a-form :model="where" :labelCol="labelCol" :wrapper-col="wrapperCol">
                  <a-row :gutter="16">
                    <a-col v-bind="spanCol">
                      <a-form-item label="请求方式:">
                        <a-select
                          v-model:value="where.httpMethod"
                          show-search
                          placeholder="请选择请求方式"
                          allow-clear
                          @change="reload"
                          autocomplete="off"
                          class="search-select"
                        >
                          <a-select-option value="POST">POST</a-select-option>
                          <a-select-option value="GET">GET</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="时间范围:">
                        <a-range-picker v-model:value="dateRange" class="search-date" value-format="YYYY-MM-DD" @change="reload" />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="客户端的ip:">
                        <a-input v-model:value="where.clientIp" placeholder="客户端的ip" class="search-date" @pressEnter="reload"></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="当前用户请求的url:">
                        <a-input
                          v-model:value="where.requestUrl"
                          placeholder="当前用户请求的url"
                          class="search-date"
                          @pressEnter="reload"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label=" " class="not-label">
                        <a-space :size="16">
                          <a-button class="border-radius" @click="reload" type="primary">查询</a-button>
                          <a-button class="border-radius" @click="clear">重置</a-button>
                        </a-space>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
            </div>
            <div class="content-mian-body">
              <div class="table-content">
                <common-table
                  :columns="columns"
                  :where="where"
                  rowId="securityLogId"
                  size="default"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/logSecurity/page"
                >
                  <template #bodyCell></template>
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

<script setup name="SecurityLog">
import { ref, onMounted, computed } from 'vue';
import { isMobile } from '@/utils/common/util';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

const props = defineProps({
  isCollapse: Boolean
});

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    isShow: true
  },
  {
    dataIndex: 'clientIp',
    title: '客户端的ip',
    isShow: true,
    width: 150
  },
  {
    dataIndex: 'httpMethod',
    title: '请求http方法',
    isShow: true,
    align: 'center',
    width: 150
  },
  {
    title: '当前用户请求的url',
    dataIndex: 'requestUrl',
    isShow: true,
    width: 200
  },
  {
    dataIndex: 'logContent',
    title: '安全日志内容',
    isShow: true,
    width: 400
  },
  {
    dataIndex: 'clientBrowser',
    title: '客户浏览器标识',
    isShow: true,
    width: 150,
    align: 'center'
  },
  {
    dataIndex: 'clientOs',
    title: '客户操作系统',
    isShow: true,
    align: 'center',
    width: 150
  },
  {
    title: 'http或方法的请求参数体',
    dataIndex: 'requestParams',
    isShow: true,
    width: 200
  },
  {
    title: '当前服务器的ip',
    dataIndex: 'serverIp',
    isShow: true,
    width: 150
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    isShow: true,
    ellipsis: true,
    width: 150
  }
]);
// ref
const tableRef = ref(null);
// 时间范围
const dateRange = ref(null);

// 搜索条件
const where = ref({
  httpMethod: null,
  searchBeginTime: null,
  searchEndTime: null,
  clientIp: '',
  requestUrl: '',
  logContent: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('SECURITY_LOG_TABLE');
// 是否显示高级查询
const isSuperSearch = ref(false);

const labelCol = computed(() => {
  return { xxl: 10, xl: 10, lg: 5, md: 7, sm: 4 };
});

const wrapperCol = computed(() => {
  return { xxl: 14, xl: 14, lg: 19, md: 17, sm: 20 };
});

const spanCol = computed(() => {
  if (isMobile() || props.isCollapse) {
    return { xxl: 6, xl: 8, lg: 12, md: 24, sm: 24, xs: 24 };
  }
  return { xxl: 6, xl: 8, lg: 24, md: 24, sm: 24, xs: 24 };
});

onMounted(() => {
  getColumnData();
});

// 获取表格配置
const getColumnData = () => {
  CustomApi.getUserConfig({ fieldBusinessCode: fieldBusinessCode.value }).then(res => {
    if (res.tableWidthJson) {
      columns.value = JSON.parse(res.tableWidthJson);
    }
  });
};

// 切换高级查询
const changeSuperSearch = () => {
  isSuperSearch.value = !isSuperSearch.value;
};

// 更多点击
const moreClick = ({ key }) => {
  if (key == '1') {
    isShowCustom.value = true;
  }
};

// 点击搜索
const reload = () => {
  const [searchBeginTime, searchEndTime] = dateRange.value || [null, null];
  where.value.searchBeginTime = searchBeginTime;
  where.value.searchEndTime = searchEndTime;
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  dateRange.value = null;
  where.value = {
    httpMethod: null,
    searchBeginTime: null,
    searchEndTime: null,
    clientIp: '',
    requestUrl: '',
    logContent: ''
  };
  reload();
};
</script>

<style scoped lang="less"></style>
