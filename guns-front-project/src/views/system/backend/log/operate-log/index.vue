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
                    <a-date-picker
                      v-model:value="where.beginDate"
                      format="YYYY-MM-DD"
                      valueFormat="YYYY-MM-DD"
                      @change="reload"
                      placeholder="开始时间"
                    />
                    <a-date-picker
                      v-model:value="where.endDate"
                      format="YYYY-MM-DD"
                      valueFormat="YYYY-MM-DD"
                      @change="reload"
                      placeholder="结束时间"
                    />
                    <a-select v-model:value="where.appName" style="width: 205px" placeholder="服务名称" @change="reload">
                      <a-select-option value="guns">guns</a-select-option>
                    </a-select>
                    <a-input v-model:value="where.llgName" placeholder="日志名称（回车搜索）" @pressEnter="reload" class="search-input">
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button danger @click="removeBatch()">
                      <template #icon>
                        <delete-outlined />
                      </template>
                      <span>清空日志</span>
                    </a-button>

                    <a-dropdown>
                      <template #overlay>
                        <a-menu @click="moreClick">
                          <a-menu-item key="1">
                            <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                            <span>自定义列</span>
                          </a-menu-item>
                        </a-menu>
                      </template>
                      <a-button>
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
                  rowId="logId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/logManager/page"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'requestUrl'">
                      <a @click="openDetail(record)">{{ record.requestUrl }}</a>
                    </template>

                    <!-- table操作栏按钮 -->
                    <template v-if="column.key === 'action'">
                      <a-space>
                        <icon-font
                          iconClass="icon-opt-xiangqing"
                          font-size="24px"
                          title="详情"
                          color="#60666b"
                          @click="openDetail(record)"
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

    <!-- 详情弹框 -->
    <OperateLogDetail v-model:visible="showDetail" v-if="showDetail" :data="current" />
  </div>
</template>

<script setup name="OperateLog">
import { ref, onMounted, createVNode } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { OperateLogApi } from './api/OperateLogApi';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';
import OperateLogDetail from './components/operate-log-detail.vue';

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
    title: '执行接口',
    isShow: true,
    dataIndex: 'requestUrl'
  },
  {
    title: '具体消息',
    isShow: true,
    dataIndex: 'logContent'
  },
  {
    title: '操作用户',
    isShow: true,
    dataIndex: 'userIdWrapper'
  },
  {
    title: '公司名称',
    isShow: true,
    dataIndex: 'userCurrentOrgIdWrapper'
  },
  {
    title: '服务名称',
    isShow: true,
    dataIndex: 'appName'
  },
  {
    title: '时间',
    isShow: true,
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    isShow: true,
    width: 60,
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  llgName: '',
  beginDate: '',
  endDate: '',
  appName: null
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示详情弹框
const showDetail = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('OPERATE_LOG_TABLE');

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

// 更多点击
const moreClick = ({ key }) => {
  if (key == '1') {
    isShowCustom.value = true;
  }
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.llgName = '';
  where.value.beginDate = '';
  where.value.endDate = '';
  where.value.appName = null;
  reload();
};

/**
 * 批量删除
 *
 * @author fengshuonan
 * @date 2021/4/2 17:03
 */
const removeBatch = () => {
  if (!where.value.beginDate || !where.value.endDate || !where.value.appName) {
    message.error('清空日志需要填写开始时间，结束时间以及app名称');
    return;
  }
  Modal.confirm({
    title: '提示',
    content: '确定要清空指定日期的操作日志吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const result = await OperateLogApi.delete(where.value);
      message.success(result.message);
      reload();
    }
  });
};

// 查看详情
const openDetail = record => {
  current.value = record;
  showDetail.value = true;
};
</script>

<style scoped lang="less"></style>
