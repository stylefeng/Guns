<template>
  <div class="my-notice">
    <div class="my-notice-header">
      <a-space :size="16">
        <a-input v-model:value="where.searchText" placeholder="通知标题（回车搜索）" @pressEnter="reload" style="width: 200px">
          <template #prefix>
            <icon-font iconClass="icon-opt-search"></icon-font>
          </template>
        </a-input>
        <drop-down :list="priorityList" dropName="优先级" keyValue="id" keyName="name" @dropClick="priorityChange" />
        <drop-down :list="statusList" dropName="状态" keyValue="id" keyName="name" @dropClick="statusChange" />
      </a-space>
      <a-space :size="16">
        <a-button danger class="border-radius" @click="clearAll">清空消息</a-button>
        <a-button class="border-radius" type="primary" ghost @click="readAll">全部已读</a-button>
      </a-space>
    </div>
    <div class="my-notice-body">
      <common-table
        :columns="columns"
        :rowSelection="false"
        :scroll="{ y: '100%' }"
        :where="where"
        bordered
        rowId="noticeId"
        ref="tableRef"
        url="/sysMessage/page"
      >
        <template #bodyCell="{ column, record }">
          <!-- 姓名 -->
          <template v-if="column.dataIndex == 'messageTitle'">
            <a @click="openAddEdit(record)" v-if="record.readFlag == 0" style="font-weight: bold">
              <a-tooltip>
                <template #title>{{ record.messageTitle }}</template>
                {{ record.messageTitle }}
              </a-tooltip>
            </a>
            <span @click="openAddEdit(record)" style="cursor: pointer" v-else
              ><a-tooltip>
                <template #title>{{ record.messageTitle }}</template>
                {{ record.messageTitle }}
              </a-tooltip></span
            >
          </template>
          <template v-if="column.dataIndex == 'priorityLevel'">
            <a-tag v-if="record.priorityLevel == 'high'" color="red">高</a-tag>
            <a-tag v-if="record.priorityLevel == 'middle'" color="orange">中</a-tag>
            <a-tag v-if="record.priorityLevel == 'low'" color="blue">低</a-tag>
          </template>
          <!-- 操作 -->
          <template v-if="column.key == 'action'">
            <a-space :size="16">
              <icon-font
                iconClass="icon-opt-yidu"
                font-size="24px"
                title="已读"
                color="#60666b"
                @click="read(record)"
                v-if="record.readFlag == 0"
              ></icon-font>
              <icon-font iconClass="icon-opt-shanchu" font-size="24px" title="删除" color="#60666b" @click="remove(record)"></icon-font>
            </a-space>
          </template>
        </template>
      </common-table>
    </div>

    <!-- 新增编辑弹框 -->
    <NoticeDetail v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="MyNotice">
import { ref, createVNode } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { MyNoticeApi } from '../api/MyNoticeApi';
import NoticeDetail from './notice-detail.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 优先级列表
const priorityList = ref([
  {
    id: 'high',
    name: '高'
  },
  {
    id: 'middle',
    name: '中'
  },
  {
    id: 'low',
    name: '低'
  }
]);
// 状态列表
const statusList = ref([
  {
    id: 0,
    name: '未读'
  },
  {
    id: 1,
    name: '已读'
  }
]);
// 搜索条件
const where = ref({
  searchText: '',
  priorityLevel: '',
  readFlag: undefined
});

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
    dataIndex: 'messageTitle',
    title: '通知标题',
    align: 'center',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'priorityLevel',
    title: '优先级',
    width: 100,
    align: 'center',
    isShow: true
  },
  {
    dataIndex: 'messageSendTime',
    title: '发布消息时间',
    align: 'center',
    ellipsis: true,
    width: 150,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    align: 'center',
    width: 100,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);

// 搜索
const reload = () => {
  tableRef.value.reload();
};

// 优先级改变
const priorityChange = val => {
  where.value.priorityLevel = val;
  reload();
};
// 状态改变
const statusChange = val => {
  where.value.readFlag = val;
  reload();
};

// 编辑
const openAddEdit = record => {
  if (record?.messageUrl) {
    if (record.readFlag == 0) {
      MyNoticeApi.setRead({ messageId: record.messageId }).then(res => {});
    }
    router.push(record.messageUrl);
  } else {
    current.value = record;
    showEdit.value = true;
  }
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的数据吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await MyNoticeApi.delete({ messageId: record.messageId });
      message.success(res.message);
      reload();
    }
  });
};

// 已读单个
const read = record => {
  MyNoticeApi.setRead({ messageId: record.messageId }).then(res => {
    message.success(res.message);
    reload();
  });
};

// 清空全部
const clearAll = () => {
  Modal.confirm({
    title: '提示',
    content: '确定要清空全部数据吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      MyNoticeApi.cleanMyMessage().then(res => {
        message.success(res.message);
        reload();
      });
    }
  });
};
// 全部已读
const readAll = () => {
  Modal.confirm({
    title: '提示',
    content: '确定要全部已读吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      MyNoticeApi.setTotalRead().then(res => {
        message.success(res.message);
        reload();
      });
    }
  });
};
</script>

<style scoped lang="less">
.my-notice {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.my-notice-header {
  height: 30px;
  line-height: 30px;
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
}
.my-notice-body {
  flex: auto;
}
.check-outlined {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
