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
                    <a-input v-model:value="where.searchText" placeholder="通知标题（回车搜索）" @pressEnter="reload" class="search-input">
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
                          <div>
                            <a-menu-item key="2">
                              <icon-font iconClass="icon-opt-shanchu" color="#60666b"></icon-font>
                              <span>批量删除</span>
                            </a-menu-item>
                          </div>
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
                <common-table :columns="columns" :where="where" rowId="noticeId" ref="tableRef" url="/sysNotice/page">
                  <template #bodyCell="{ column, record }">
                    <!-- 姓名 -->
                    <template v-if="column.dataIndex == 'noticeTitle'">
                      <a @click="openAddEdit(record)">{{ record.noticeTitle }}</a>
                    </template>
                    <template v-if="column.dataIndex == 'priorityLevel'">
                      <a-tag v-if="record.priorityLevel == 'high'" color="red">高</a-tag>
                      <a-tag v-if="record.priorityLevel == 'middle'" color="orange">中</a-tag>
                      <a-tag v-if="record.priorityLevel == 'low'" color="blue">低</a-tag>
                    </template>
                    <template v-if="column.dataIndex == 'publishStatus'">
                      <a-tag v-if="record.publishStatus == 1" color="green">已发布</a-tag>
                      <a-tag v-if="record.publishStatus == 2" color="orange">未发布</a-tag>
                    </template>
                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-bianji"
                          font-size="24px"
                          color="#60666b"
                          title="编辑"
                          v-if="record.publishStatus == 2"
                          @click="openAddEdit(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-fabu"
                          font-size="24px"
                          color="#60666b"
                          title="发布"
                          v-if="record.publishStatus == 2"
                          @click="publicClick(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-chehui"
                          font-size="24px"
                          color="#60666b"
                          title="撤回"
                          v-if="record.publishStatus == 1"
                          @click="withdraw(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-shanchu"
                          font-size="24px"
                          color="#60666b"
                          title="删除"
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
    <NoticeAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="Position">
import { NoticeApi } from './api/NoticeApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import NoticeAddEdit from './components/notice-add-edit.vue';
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
    hideInSetting: true,
    customRender: ({ index }) => tableRef.value.tableIndex + index
  },
  {
    dataIndex: 'noticeTitle',
    title: '通知标题',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'priorityLevel',
    title: '优先级',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'publishStatus',
    title: '发布状态',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'noticeBeginTime',
    title: '开始时间',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'noticeEndTime',
    title: '结束时间',
    width: 150,
    isShow: true
  },
  {
    dataIndex: 'createUserWrapper',
    title: '创建人',
    width: 150,
    isShow: true
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    width: 150,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    width: 100,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  searchText: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('NOTICE_TABLE');

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
  } else if (key == '2') {
    batchDelete();
  }
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.searchText = '';
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
    content: '确定要删除选中的数据吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await NoticeApi.delete({ noticeId: record.noticeId });
      message.success(res.message);
      reload();
    }
  });
};

// 批量删除
const batchDelete = () => {
  if (tableRef.value.selectedRowList && tableRef.value.selectedRowList.length == 0) {
    return message.warning('请选择需要删除的数据');
  }
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的数据吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await NoticeApi.batchDelete({ batchDeleteIdList: tableRef.value.selectedRowList });
      message.success(res.message);
      reload();
    }
  });
};

// 发布
const publicClick = record => {
  tableRef.value.tableLoading = true;
  NoticeApi.publishNotice({ noticeId: record.noticeId })
    .then(res => {
      message.success(res.message);
      reload();
    })
    .finally(() => (tableRef.value.tableLoading = false));
};
// 撤回
const withdraw = record => {
  tableRef.value.tableLoading = true;
  NoticeApi.retractNotice({ noticeId: record.noticeId })
    .then(res => {
      message.success(res.message);
      reload();
    })
    .finally(() => (tableRef.value.tableLoading = false));
};
</script>

<style scoped lang="less">
</style>
