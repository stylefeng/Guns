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
                      v-model:value="where.searchText"
                      placeholder="日志标题或请求URL (回车搜索)"
                      @pressEnter="search"
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
                      <a-form-item label="日志类型:">
                        <a-select
                          v-model:value="where.logTypeCode"
                          show-search
                          placeholder="请选择日志类型"
                          allow-clear
                          @change="search"
                          @search="logTypeCodeSearch"
                          autocomplete="off"
                          class="search-select"
                          :filter-option="false"
                        >
                          <a-select-option
                            :value="item.dictCode"
                            v-for="(item, index) in loginTypeCodeList"
                            :key="index"
                            :label="item.dictName"
                            >{{ item.dictName }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="请求方式:">
                        <a-select
                          v-model:value="where.httpMethod"
                          show-search
                          placeholder="请选择请求方式"
                          allow-clear
                          @change="search"
                          autocomplete="off"
                          class="search-select"
                        >
                          <a-select-option value="POST">POST</a-select-option>
                          <a-select-option value="GET">GET</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="客户端IP检:">
                        <a-input
                          v-model:value="where.clientIp"
                          allowClear
                          placeholder="客户端IP检"
                          @pressEnter="search"
                          class="search-date"
                        >
                          <template #prefix>
                            <icon-font iconClass="icon-opt-search"></icon-font>
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="时间范围:">
                        <a-range-picker v-model:value="dateRange" class="search-date" value-format="YYYY-MM-DD" @change="search" />
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label="用户:">
                        <a-input v-model:value="where.userName" placeholder="请选择用户" class="search-date" @focus="selectUser"></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col v-bind="spanCol">
                      <a-form-item label=" " class="not-label">
                        <a-space :size="16">
                          <a-button class="border-radius" @click="search" type="primary">查询</a-button>
                          <a-button class="border-radius" @click="clearSearch">重置</a-button>
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
                  :rowSelection="false"
                  :pageSize="100"
                  :isSort="true"
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

    <!-- 选择用户 -->
    <Selection
      v-model:visible="visibleSelection"
      v-if="visibleSelection"
      :data="selectedData"
      :showTab="['user']"
      :changeHeight="true"
      title="人员选择"
      @done="closeSelection"
    ></Selection>
  </div>
</template>

<script setup name="BusinessLogList">
import { nextTick, onMounted, ref, computed } from 'vue';
import { isMobile } from '@/utils/common/util';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';
import { SysDictTypeApi } from '@/components/DictSelect/api/SysDictTypeApi';

const props = defineProps({
  isCollapse: Boolean
});

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
    sorter: true,
    dataIndex: 'logTypeCode'
  },
  {
    title: '日志标题(摘要)',
    isShow: true,
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'logTitle'
  },
  {
    title: '请求URL',
    isShow: true,
    width: 100,
    sorter: true,
    dataIndex: 'requestUrl'
  },
  {
    title: 'HTTP方法',
    isShow: true,
    width: 100,
    sorter: true,
    dataIndex: 'httpMethod'
  },
  {
    title: '客户端IP',
    isShow: true,
    width: 100,
    sorter: true,
    dataIndex: 'clientIp'
  },
  {
    title: '业务操作用户ID',
    isShow: true,
    width: 150,
    sorter: true,
    dataIndex: 'userIdWrapper'
  },
  {
    title: '创建时间',
    isShow: true,
    sorter: true,
    dataIndex: 'createTime',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    isShow: true,
    width: 60,
    fixed: 'right'
  }
]);

// 搜索条件
const where = ref({
  logTypeCode: null,
  searchText: '',
  httpMethod: null,
  clientIp: '',
  userId: '',
  userName: '',
  searchBeginTime: null,
  searchEndTime: null
});

// 登录类型列表
const loginTypeCodeList = ref([]);
const loginTypeCodeOptions = ref([]);

// 时间范围
const dateRange = ref(null);

// 是否显示选择人员弹框
const visibleSelection = ref(false);

// 选择弹框总数据
const selectedData = ref({
  selectUserList: []
});
// 是否显示高级查询
const isSuperSearch = ref(false);

const labelCol = computed(() => {
  return { xxl: 7, xl: 7, lg: 5, md: 7, sm: 4 };
});

const wrapperCol = computed(() => {
  return { xxl: 17, xl: 17, lg: 19, md: 17, sm: 20 };
});

const spanCol = computed(() => {
  if (isMobile() || props.isCollapse) {
    return { xxl: 6, xl: 8, lg: 12, md: 24, sm: 24, xs: 24 };
  }
  return { xxl: 6, xl: 8, lg: 24, md: 24, sm: 24, xs: 24 };
});

/**
 * 搜索
 */
const search = () => {
  const [searchBeginTime, searchEndTime] = dateRange.value || [null, null];
  where.value.searchBeginTime = searchBeginTime;
  where.value.searchEndTime = searchEndTime;
  tableRef.value.reload();
};

// 切换高级查询
const changeSuperSearch = () => {
  isSuperSearch.value = !isSuperSearch.value;
};

/**
 * 清空搜索
 */
const clearSearch = () => {
  where.value = {
    logTypeCode: null,
    searchText: '',
    httpMethod: null,
    clientIp: '',
    userId: '',
    userName: '',
    searchBeginTime: null,
    searchEndTime: null
  };
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
  getLoginTypeCodeList();
});

// 获取登录类型列表
const getLoginTypeCodeList = async () => {
  loginTypeCodeList.value = await SysDictTypeApi.getDictListByParams({ dictTypeCode: 'BIZ_LOG_TYPE' });
  loginTypeCodeOptions.value = [...loginTypeCodeList.value];
};

// 登录类型列表查询
const logTypeCodeSearch = value => {
  nextTick(() => {
    const arr = loginTypeCodeOptions.value.filter(item => item.dictName.includes(value));
    if (arr.length > 0) {
      loginTypeCodeList.value = arr;
    } else {
      loginTypeCodeList.value = [{ dictCode: value, dictName: value }];
    }
  });
};

// 选择用户
const selectUser = () => {
  const { userName, userId } = where.value;
  if (userName && userId) {
    selectedData.value.selectUserList = [{ bizId: userId, name: userName }];
  }
  visibleSelection.value = true;
};

// 关闭选择用户
const closeSelection = data => {
  const { bizId, name } = data.selectUserList[0] || { bizId: '', name: '' };
  where.value.userName = name;
  where.value.userId = bizId;
  search();
};
</script>

<style scoped lang="less">
.table-record-title {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
