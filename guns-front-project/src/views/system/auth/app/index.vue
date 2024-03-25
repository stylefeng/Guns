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
                      placeholder="应用名称、编码（回车搜索）"
                      @pressEnter="reload"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button type="primary" class="border-radius" @click="openAddEdit()" v-permission="['ADD_APP']"
                      ><plus-outlined />新建</a-button
                    >
                    <a-dropdown>
                      <template #overlay>
                        <a-menu @click="moreClick">
                          <a-menu-item key="1">
                            <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                            <span>自定义列</span>
                          </a-menu-item>
                          <div v-permission="['DELETE_APP']">
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
                <common-table :columns="columns" :where="where" rowId="appId" ref="tableRef" url="/sysApp/page">
                  <template #bodyCell="{ column, record }">
                    <!-- 姓名 -->
                    <template v-if="column.dataIndex == 'appName'">
                      <a @click="openAddEdit(record)">{{ record.appName }}</a>
                    </template>
                    <!-- 图标 -->
                    <template v-if="column.dataIndex == 'appIconWrapper'">
                      <img :src="record.appIconWrapper" alt="" class="appIconWrapper" />
                    </template>
                    <!-- 状态 -->
                    <template v-if="column.dataIndex == 'statusFlag'">
                      <vxe-switch
                        v-model="record.statusFlag"
                        :open-value="1"
                        :close-value="2"
                        @change="statusFlagChange(record)"
                        :disabled="disabled"
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
                          v-permission="['EDIT_APP']"
                          @click="openAddEdit(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-shanchu"
                          font-size="24px"
                          title="删除"
                          color="#60666b"
                          v-permission="['DELETE_APP']"
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
    <AppAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="AuthRole">
import { AppApi } from './api/AppApi';
import { ref, createVNode, onMounted, computed } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import AppAddEdit from './components/app-add-edit.vue';
import { useUserStore } from '@/store/modules/user';
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
    hideInSetting: true
  },
  {
    dataIndex: 'appName',
    title: '应用名称',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'appCode',
    title: '应用编码',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'appIconWrapper',
    title: '应用图标',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'statusFlag',
    title: '状态',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'appSort',
    title: '排序',
    width: 100,
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
const fieldBusinessCode = ref('APP_TABLE');

const userStore = useUserStore();

// 是否禁用
const disabled = computed(() => {
  if (userStore.authorities.find(item => item == 'UPDATE_USER_STATUS')) {
    return false;
  }
  return true;
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
    content: '确定要删除选中的应用吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await AppApi.delete({ appId: record.appId });
      message.success(res.message);
      reload();
    }
  });
};

// 批量删除
const batchDelete = () => {
  if (tableRef.value.selectedRowList && tableRef.value.selectedRowList.length == 0) {
    return message.warning('请选择需要删除的应用');
  }
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的应用吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await AppApi.batchDelete({ appIdList: tableRef.value.selectedRowList });
      message.success(res.message);
      reload();
    }
  });
};

// 切换应用状态
const statusFlagChange = record => {
  AppApi.updateStatus({ appId: record.appId, statusFlag: record.statusFlag }).then(res => {
    message.success(res.message);
  });
};
</script>

<style scoped lang="less">
.appIconWrapper {
  width: 22px;
  height: 22px;
}
</style>
