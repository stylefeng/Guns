<template>
  <div class="guns-layout">
    <div class="guns-layout" v-show="!showImport">
      <div class="guns-layout-sidebar p-t-12 bgColor" style="width: 292px">
        <div class="sidebar-content">
          <org-tree @treeSelect="treeSelect" ref="orgTreeRef"></org-tree>
        </div>
      </div>
      <div class="guns-layout-content" style="width: calc(100% - 292px)">
        <div class="guns-layout">
          <div class="guns-layout-content-application">
            <div class="content-mian">
              <div class="content-mian-header">
                <div class="header-content">
                  <div class="header-content-left">
                    <a-space :size="16">
                      <a-input
                        v-model:value="where.searchText"
                        placeholder="姓名、账号（回车搜索）"
                        @pressEnter="reload"
                        class="search-input"
                      >
                        <template #prefix>
                          <icon-font iconClass="icon-opt-search"></icon-font>
                        </template>
                      </a-input>
                      <drop-down
                        :list="statusList"
                        dropName="状态"
                        ref="statusRef"
                        keyValue="id"
                        keyName="name"
                        @dropClick="statusChange"
                      />
                      <a-button class="border-radius" @click="clear">重置</a-button>
                    </a-space>
                  </div>
                  <div class="header-content-right">
                    <a-space :size="16">
                      <a-button type="primary" class="border-radius" @click="openAddEdit()" v-permission="['ADD_USER']"
                        ><plus-outlined />新建</a-button
                      >
                      <a-dropdown>
                        <template #overlay>
                          <a-menu @click="moreClick">
                            <a-menu-item key="1">
                              <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                              <span>自定义列</span>
                            </a-menu-item>
                            <div v-permission="['DELETE_USER']">
                              <a-menu-item key="2">
                                <icon-font iconClass="icon-opt-shanchu" color="#60666b"></icon-font>
                                <span>批量删除</span>
                              </a-menu-item>
                            </div>
                            <a-menu-item key="3">
                              <icon-font iconClass="icon-opt-daoru" color="#60666b"></icon-font>
                              <span>导入导出</span>
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
                  <common-table :columns="columns" :where="where" rowId="userId" ref="tableRef" url="/sysUser/page">
                    <template #bodyCell="{ column, record }">
                      <!-- 姓名 -->
                      <template v-if="column.dataIndex == 'realName'">
                        <a @click="detail(record)">{{ record.realName }}</a>
                      </template>
                      <!-- 公司 -->
                      <template v-if="column.dataIndex == 'company'">
                        {{ record?.userOrgDTO?.companyName ? record?.userOrgDTO?.companyName : '' }}
                      </template>
                      <!-- 部门 -->
                      <template v-if="column.dataIndex == 'dept'">
                        {{ record?.userOrgDTO?.deptName ? record?.userOrgDTO?.deptName : '' }}
                      </template>
                      <!-- 职务 -->
                      <template v-if="column.dataIndex == 'positionName'">
                        {{ record?.userOrgDTO?.positionName ? record?.userOrgDTO?.positionName : '' }}
                      </template>
                      <!-- 性别 -->
                      <template v-if="column.dataIndex == 'sex'">
                        <span v-if="record.sex == 'M'">男</span>
                        <span v-if="record.sex == 'F'">女</span>
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
                            v-permission="['EDIT_USER']"
                            @click="openAddEdit(record)"
                          ></icon-font>
                          <icon-font
                            iconClass="icon-opt-fenpeijuese"
                            font-size="24px"
                            color="#60666b"
                            title="分配角色"
                            v-permission="['ASSIGN_USER_ROLE']"
                            @click="roleClick(record)"
                          ></icon-font>
                          <icon-font
                            iconClass="icon-opt-chongzhimima"
                            font-size="24px"
                            color="#60666b"
                            title="重置密码"
                            v-permission="['RESET_PASSWORD']"
                            @click="resetPassword(record)"
                          ></icon-font>
                          <icon-font
                            iconClass="icon-opt-shanchu"
                            font-size="24px"
                            title="删除"
                            color="#60666b"
                            v-permission="['DELETE_USER']"
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
    </div>

    <!-- 导入导出 -->
    <ImportExportUser v-if="showImport" @back="showImport = false" @backReload="backReload" />

    <!-- 自定义列 -->
    <Custom
      v-model:visible="isShowCustom"
      v-if="isShowCustom"
      :data="columns"
      @done="val => (columns = val)"
      :fieldBusinessCode="fieldBusinessCode"
    />

    <!-- 新增编辑弹框 -->
    <UserAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
    <!-- 查看详情抽屉 -->
    <UserDetail v-model:visible="showDetail" v-if="showDetail" :data="current" />
    <!-- 分配角色 -->
    <AllocationRole v-model:visible="showRole" v-if="showRole" :data="current" @done="reload" />
  </div>
</template>

<script setup name="BackEndUser">
import OrgTree from './org-tree.vue';
import { UsersApi } from './api/UsersApi';
import { useUserStore } from '@/store/modules/user';
import { ref, createVNode, onMounted, computed } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import UserDetail from './components/user-detail.vue';
import UserAddEdit from './components/user-add-edit.vue';
import AllocationRole from './components/allocation-role.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';
import ImportExportUser from './components/import-export-user.vue';

// 状态列表
const statusList = ref([
  {
    id: '',
    name: '全部状态'
  },
  {
    id: 1,
    name: '启用'
  },
  {
    id: 2,
    name: '禁用'
  }
]);
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
    dataIndex: 'realName',
    title: '姓名',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'account',
    title: '账号',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'employeeNumber',
    title: '工号',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'company',
    title: '主要公司',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'dept',
    title: '主要部门',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'positionName',
    title: '职务',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'sex',
    title: '性别',
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
    dataIndex: 'createTime',
    title: '创建时间',
    width: 150,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    width: 200,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);
const statusRef = ref(null);
const orgTreeRef = ref(null);
const userStore = useUserStore();

// 搜索条件
const where = ref({
  orgIdCondition: '',
  statusFlag: '',
  searchText: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 是否显示详情抽屉
const showDetail = ref(false);
// 是否显示分配角色弹框
const showRole = ref(false);
// 是否显示导入导出
const showImport = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('USER_TABLE');
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

// 左侧树选中
const treeSelect = (selectedKeys, metadata) => {
  where.value.orgIdCondition = selectedKeys[0];
  reload();
};

// 更多点击
const moreClick = ({ key }) => {
  if (key == '1') {
    isShowCustom.value = true;
  } else if (key == '2') {
    batchDelete();
  } else if (key == '3') {
    // 导入导出
    showImport.value = true;
  }
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.searchText = '';
  where.value.statusFlag = '';
  where.value.orgIdCondition = '';
  orgTreeRef.value.currentSelectKeys = [];
  statusRef.value.changeDropname('状态');
  reload();
};

// 状态改变
const statusChange = val => {
  where.value.statusFlag = val;
  reload();
};

// 新增编辑点击
const openAddEdit = record => {
  current.value = record;
  showEdit.value = true;
};

// 查看详情
const detail = record => {
  current.value = record;
  showDetail.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的用户吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await UsersApi.delete({ userId: record.userId });
      message.success(res.message);
      reload();
    }
  });
};

// 批量删除
const batchDelete = () => {
  if (tableRef.value.selectedRowList && tableRef.value.selectedRowList.length == 0) {
    return message.warning('请选择需要删除的用户');
  }
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的用户吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await UsersApi.batchDelete({ userIdList: tableRef.value.selectedRowList });
      message.success(res.message);
      reload();
    }
  });
};

// 点击分配角色
const roleClick = record => {
  current.value = record;
  showRole.value = true;
};

// 重置密码
const resetPassword = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要重置此用户的密码为"123456"吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      let result = await UsersApi.resetPassword({ userId: record.userId });
      message.success(result.message);
      reload();
    }
  });
};

// 切换人员状态
const statusFlagChange = record => {
  UsersApi.updateStatus({ userId: record.userId, statusFlag: record.statusFlag }).then(res => {
    message.success(res.message);
  });
};

// 返回并加载数据
const backReload = () => {
  showImport.value = false;
  reload();
};
</script>

<style scoped lang="less"></style>
