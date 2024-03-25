<template>
  <div class="guns-layout">
    <div class="guns-layout" v-show="!showImport">
      <div class="guns-layout-sidebar p-t-12 bgColor" style="width: 292px">
        <div class="sidebar-content">
          <org-tree
            @treeSelect="treeSelect"
            ref="orgTreeRef"
            isShowEditIcon
            @deleteOrg="reload"
            @addOrg="addOrg"
            @editOrg="editOrg"
          ></org-tree>
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
                        placeholder="机构名称、编码（回车搜索）"
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
                      <a-button type="primary" class="border-radius" @click="openAddEdit()" v-permission="['ADD_ORG']"
                        ><plus-outlined />新建</a-button
                      >
                      <a-dropdown>
                        <template #overlay>
                          <a-menu @click="moreClick">
                            <a-menu-item key="1">
                              <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                              <span>自定义列</span>
                            </a-menu-item>
                            <div v-permission="['DELETE_ORG']">
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
                  <common-table :columns="columns" :where="where" rowId="orgId" ref="tableRef" url="/hrOrganization/page">
                    <template #bodyCell="{ column, record }">
                      <!-- 姓名 -->
                      <template v-if="column.dataIndex == 'orgName'">
                        <a @click="detail(record)">{{ record.orgName }}</a>
                      </template>
                      <!-- 机构状态 -->
                      <template v-if="column.dataIndex == 'statusFlag'">
                        <a-tag color="green" v-if="record.statusFlag == 1">启用</a-tag>
                        <a-tag color="red" v-if="record.statusFlag == 2">禁用</a-tag>
                      </template>
                      <template v-if="column.dataIndex == 'orgType'">
                        <div class="org-type">
                          <a-tag color="green" v-if="record.orgType == 1">公司</a-tag>
                          <a-tag color="red" v-if="record.orgType == 2">部门</a-tag>
                        </div>
                      </template>
                      <!-- 操作 -->
                      <template v-if="column.key == 'action'">
                        <a-space :size="16">
                          <icon-font
                            iconClass="icon-opt-bianji"
                            font-size="24px"
                            title="编辑"
                            color="#60666b"
                            v-permission="['EDIT_ORG']"
                            @click="openAddEdit(record)"
                          ></icon-font>
                          <icon-font
                            iconClass="icon-opt-shenpirenshezhi"
                            color="#60666b"
                            font-size="24px"
                            title="审批人设置"
                            v-permission="['ASSIGN_APPROVER']"
                            @click="setApprover(record)"
                          ></icon-font>
                          <icon-font
                            iconClass="icon-opt-shanchu"
                            font-size="24px"
                            title="删除"
                            color="#60666b"
                            v-permission="['DELETE_ORG']"
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
    <ImportExportOrg v-if="showImport" @back="showImport = false" @backReload="backReload" />

    <!-- 自定义列 -->
    <Custom
      v-model:visible="isShowCustom"
      v-if="isShowCustom"
      :data="columns"
      @done="val => (columns = val)"
      :fieldBusinessCode="fieldBusinessCode"
    />

    <!-- 新增编辑弹框 -->
    <OrgAddEdit
      v-model:visible="showEdit"
      v-if="showEdit"
      :data="current"
      @done="reloadAll"
      :parentId="parentId"
      :parentName="parentName"
    />
    <!-- 查看详情抽屉 -->
    <OrgDetail v-model:visible="showDetail" v-if="showDetail" :data="current" :isShowApprover="isShowApprover" />
  </div>
</template>

<script setup name="Organization">
import OrgTree from '@/views/system/structure/user/org-tree.vue';
import { OrgApi } from './api/OrgApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import OrgDetail from './components/org-detail.vue';
import OrgAddEdit from './components/org-add-edit.vue';
import ImportExportOrg from './components/import-export-org.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

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
    dataIndex: 'orgName',
    title: '机构名称',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'orgCode',
    title: '机构编码',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'statusFlag',
    title: '机构状态',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'orgType',
    title: '机构类型',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'orgSort',
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
const statusRef = ref(null);
const orgTreeRef = ref(null);

// 搜索条件
const where = ref({
  orgId: null,
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
// 当前选中的组织机构id
const parentId = ref(null);
// 当前选中的组织机构名称
const parentName = ref(null);
// 业务标识的编码
const fieldBusinessCode = ref('ORG_TABLE');
// 是否显示设置审批人
const isShowApprover = ref(false);
// 是否显示导入导出
const showImport = ref(false);

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
  where.value.orgId = selectedKeys[0];
  parentId.value = selectedKeys[0];
  parentName.value = metadata.node.orgName;
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

// 刷新全部
const reloadAll = () => {
  orgTreeRef.value.reloadOrgTreeData();
  reload();
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.searchText = '';
  where.value.statusFlag = '';
  where.value.orgId = null;
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
  if (!where.value.orgId) {
    parentName.value = '';
    parentId.value = '';
  }
  current.value = record;
  showEdit.value = true;
};

// 查看详情
const detail = record => {
  isShowApprover.value = false;
  current.value = record;
  showDetail.value = true;
};

// 设置审批人
const setApprover = record => {
  isShowApprover.value = true;
  current.value = record;
  showDetail.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的组织机构吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await OrgApi.delete({ orgId: record.orgId });
      message.success(res.message);
      reload();
    }
  });
};

// 批量删除
const batchDelete = () => {
  if (tableRef.value.selectedRowList && tableRef.value.selectedRowList.length == 0) {
    return message.warning('请选择需要删除的组织机构');
  }
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的组织机构吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await OrgApi.batchDelete({ orgIdList: tableRef.value.selectedRowList });
      message.success(res.message);
      reload();
    }
  });
};

// 左侧树点击新建
const addOrg = data => {
  parentId.value = data ? data.orgId : null;
  parentName.value = data ? data.orgName : null;
  current.value = null;
  showEdit.value = true;
};
// 左侧树点击编辑
const editOrg = data => {
  current.value = data;
  showEdit.value = true;
};

// 返回并加载数据
const backReload = () => {
  showImport.value = false;
  reload();
};
</script>

<style scoped lang="less"></style>
