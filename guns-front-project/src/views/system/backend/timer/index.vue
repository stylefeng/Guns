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
                    <a-input v-model:value="where.searchText" placeholder="任务名称（回车搜索）" @pressEnter="reload" class="search-input">
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button type="primary" class="border-radius" @click="openAddEdit()"><plus-outlined />新建</a-button>
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
                  rowId="timerId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/sysTimers/page"
                >
                  <template #bodyCell="{ column, record }">
                    <!-- 姓名 -->
                    <template v-if="column.dataIndex == 'timerName'">
                      <a @click="openAddEdit(record)">{{ record.timerName }}</a>
                    </template>
                    <!-- 1是运行，2是停止 -->
                    <template v-if="column.dataIndex === 'jobStatus'">
                      <vxe-switch
                        v-model="record.jobStatus"
                        :open-value="1"
                        :close-value="2"
                        open-label="运行"
                        close-label="停止"
                        @change="jobStatusChange(record)"
                      ></vxe-switch>
                    </template>
                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-bianji"
                          font-size="24px"
                          title="编辑"
                          color="#60666b"
                          @click="openAddEdit(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-shanchu"
                          font-size="24px"
                          title="删除"
                          color="#60666b"
                          @click="remove(record)"
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

    <!-- 新增编辑弹框 -->
    <TimerAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="Timer">
import { SysTimerApi } from './api/SysTimerApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import TimerAddEdit from './components/timer-add-edit.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 48,
    align: 'center',
    isShow: true,
    fixed: 'left',
    hideInSetting: true
  },
  {
    dataIndex: 'timerName',
    title: '任务名称',
    fixed: 'left',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'params',
    title: '参数',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'cron',
    title: 'cron表达式',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'actionClass',
    title: '任务class',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'remark',
    title: '备注信息',
    ellipsis: true,
    width: 150,
    isShow: true
  },
  {
    dataIndex: 'jobStatus',
    title: '状态',
    width: 150,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    width: 80,
    fixed: 'right',
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  timerName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('TIMER_TABLE');

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
  where.value.timerName = '';
  reload();
};

// 新增编辑点击
const openAddEdit = record => {
  current.value = record;
  showEdit.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的定时任务吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await SysTimerApi.delete({ timerId: record.timerId });
      message.success(res.message);
      reload();
    }
  });
};

// 更改状态
const jobStatusChange = async record => {
  const timerId = record.timerId;
  let result = {};
  if (record.jobStatus == 1) {
    result = await SysTimerApi.start({ timerId });
  } else {
    result = await SysTimerApi.stop({ timerId });
  }
  message.success(result.message);
  reload();
};
</script>

<style scoped lang="less"></style>
