<template>
  <div class="guns-body">
    <a-row :gutter="12">
      <!-- 组织 -->
      <a-col style="width: 300px">
        <org-tree @treeSelect="treeSelect" ref="orgTreeRef" :isSetWidth="false" style="padding: 12px"></org-tree>
      </a-col>
      <!-- 人员 -->
      <a-col style="width: 300px">
        <div class="box bgColor box-shadow">
          <!-- 搜索框-->
          <div class="search">
            <a-input v-model:value="where.searchText" placeholder="请输入用户名称，回车搜索" allow-clear @pressEnter="getUserList">
              <template #prefix>
                <icon-font iconClass="icon-opt-search"></icon-font>
              </template>
            </a-input>
          </div>
          <div class="user-content">
            <a-spin tip="Loading..." :spinning="userLoading" :delay="100">
              <div class="user-list">
                <a-card
                  :title="uItem.realName"
                  :class="[{ 'user-active': currentUserId == uItem.userId }]"
                  class="user-card"
                  hoverable
                  v-for="uItem in userList"
                  :key="uItem.userId"
                  @click="userClick(uItem)"
                >
                  <template #extra>
                    <span>用户状态:</span>
                    <vxe-switch
                      v-model="uItem.statusFlag"
                      :open-value="1"
                      :close-value="2"
                      @change.stop="statusFlagChange(uItem)"
                    ></vxe-switch>
                  </template>
                  <div>
                    <span>工号：</span>
                    {{ uItem.employeeNumber }}
                  </div>
                  <div style="margin-top: 10px">
                    <span>电话：</span>
                    {{ uItem.phone }}
                  </div>
                </a-card>
                <a-empty v-show="userList && userList.length == 0" class="empty" />
              </div>
            </a-spin>
          </div>
        </div>
      </a-col>
      <!-- 权限 -->
      <a-col style="width: calc(100% - 600px)">
        <a-spin tip="Loading..." :spinning="powerLoading" :delay="100" style="width: 100%">
          <div class="box bgColor box-shadow power-data" v-show="currentUserId">
            <div class="power-header">
              <a-space style="margin-left: 10px">
                <a-button danger class="border-radius" @click="disabledAll">全部禁用</a-button>
                <a-button danger class="border-radius" @click="deleteAll">全部删除</a-button>
              </a-space>
            </div>
            <div class="power-body">
              <a-card :title="pItem.orgName" class="power-card" hoverable v-for="pItem in powerList" :key="pItem.orgId">
                <template #extra>
                  <a @click="asyncOtherCompany(pItem)">同步到其他公司</a>
                </template>
                <div class="role-list">
                  <div>
                    <span>启用本机构：</span>
                    <vxe-switch
                      v-model="pItem.enableThisOrg"
                      :open-value="true"
                      :close-value="false"
                      @change="enableThisOrgChange(pItem)"
                    ></vxe-switch>
                  </div>
                  <div v-for="(rITem, rIndex) in pItem.roleBindItemList" :key="rIndex">
                    <a-checkbox v-model:checked="rITem.checkedFlag" @change="roleBindChange(pItem, rITem)"
                      >{{ rITem.roleName }}
                      <span v-if="rITem.roleType == 10">（系统角色）</span>
                      <span v-if="rITem.roleType == 15">（业务角色）</span>
                    </a-checkbox>
                  </div>
                </div>
                <div class="delete-role">
                  <a-button type="primary" danger shape="circle" @click="deleteClick(pItem)">
                    <icon-font iconClass="icon-opt-shanchu" font-size="20px" title="删除" color="#fff"></icon-font>
                  </a-button>
                </div>
              </a-card>
              <a-card class="power-card power-add" hoverable @click="powerAdd">
                <div class="power-add-icon">
                  <plus-outlined class="plus-outlined" />
                </div>
              </a-card>
            </div>
          </div>
          <div class="box bgColor box-shadow" v-show="!currentUserId">
            <a-empty class="power-empty" />
          </div>
        </a-spin>
      </a-col>
    </a-row>

    <!-- 添加机构 -->
    <AddOrg v-model:visible="showAdd" v-if="showAdd" @done="getPowerList" :userId="currentUserId" />
  </div>
</template>

<script setup name="StructureEmpower">
import OrgTree from '@/views/system/structure/user/org-tree.vue';
import { message, Modal } from 'ant-design-vue/es';
import { onMounted, ref, createVNode } from 'vue';
import { UsersApi } from '../user/api/UsersApi';
import { EmpowerApi } from './api/EmpowerApi';
import AddOrg from './components/add-org.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

// 用户搜索条件
const where = ref({
  pageNo: 1,
  pageSize: 40, //默认查询40人
  orgIdCondition: '',
  searchText: ''
});

// 人员加载
const userLoading = ref(false);

// 用户列表
const userList = ref([]);

// 当前的选中的用户id
const currentUserId = ref('');

// 授权加载
const powerLoading = ref(false);
// 授权列表
const powerList = ref([]);

// 是否显示添加机构
const showAdd = ref(false);

onMounted(() => {
  getUserList();
});

// 左侧树选中
const treeSelect = (selectedKeys, metadata) => {
  where.value.orgIdCondition = selectedKeys[0];
  getUserList();
};

// 获取人员列表
const getUserList = () => {
  userLoading.value = true;
  UsersApi.findPage(where.value)
    .then(res => {
      userList.value = res.rows;
    })
    .finally(() => (userLoading.value = false));
};

// 切换人员状态
const statusFlagChange = record => {
  UsersApi.updateStatus({ userId: record.userId, statusFlag: record.statusFlag }).then(res => {
    message.success(res.message);
  });
};

// 用户选中
const userClick = uItem => {
  if (currentUserId.value != uItem.userId) {
    currentUserId.value = uItem.userId;
    getPowerList();
  }
};

// 获取权限列表
const getPowerList = () => {
  if (!currentUserId.value) return;
  powerLoading.value = true;
  EmpowerApi.getUserAssignList({ userId: currentUserId.value })
    .then(res => {
      powerList.value = res.data;
    })
    .finally(() => (powerLoading.value = false));
};

// 禁用全部
const disabledAll = () => {
  if (powerList.value.length == 0) return;
  Modal.confirm({
    title: '提示',
    content: '确定要禁用全部机构吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      let result = await EmpowerApi.disableAllOrg({ userId: currentUserId.value });
      message.success(result.message);
      getPowerList();
    }
  });
};

// 删除全部
const deleteAll = () => {
  if (powerList.value.length == 0) return;
  Modal.confirm({
    title: '提示',
    content: '确定要删除全部机构吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      let result = await EmpowerApi.deleteAllOrgBind({ userId: currentUserId.value });
      message.success(result.message);
      getPowerList();
    }
  });
};

// 同步到其他公司
const asyncOtherCompany = pItem => {
  Modal.confirm({
    title: '提示',
    content: '确定要同步到其他公司吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      let params = {
        userId: currentUserId.value,
        statusFlag: pItem.enableThisOrg,
        ...pItem
      };
      let result = await EmpowerApi.syncOtherOrgStatusAndBusinessRole(params);
      message.success(result.message);
      getPowerList();
    }
  });
};

// 删除单个
const deleteClick = pItem => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的用户绑定的机构吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      let result = await EmpowerApi.removeUserOrgBind({ userId: currentUserId.value, orgId: pItem.orgId });
      message.success(result.message);
      getPowerList();
    }
  });
};

// 机构改变
const enableThisOrgChange = pItem => {
  EmpowerApi.changeStatus({ userId: currentUserId.value, orgId: pItem.orgId, checkedFlag: pItem.enableThisOrg }).then(res => {
    message.success(res.message);
    getPowerList();
  });
};

// 绑定或取消绑定角色
const roleBindChange = (pItem, rItem) => {
  EmpowerApi.changeRoleSelect({ userId: currentUserId.value, orgId: pItem.orgId, ...rItem }).then(res => {
    message.success(res.message);
    getPowerList();
  });
};

// 添加权限
const powerAdd = () => {
  showAdd.value = true;
};
</script>

<style scoped lang="less">
.search {
  padding: 12px 12px 0 12px;
  margin-bottom: 16px;
}
.user-list {
  padding: 0 12px;
  height: calc(100% - 10px) !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
.user-content {
  width: 100%;
  height: calc(100% - 90px);
}
.user-list::-webkit-scrollbar {
  width: 8px !important;
}
.empty {
  margin-top: 150px;
}
.power-empty {
  margin-top: 200px;
}
.user-card {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
}
.power-card {
  float: left;
  width: 350px;
  margin: 10px 10px 2px 10px;
  border-radius: 5px;
  height: 240px;
  border: 1px solid #e5e5e5;
}
:deep(.ant-card-body) {
  padding: 12px !important;
}
:deep(.ant-card-head) {
  padding: 0 12px !important;
}
:deep(.ant-card-head-title) {
  font-weight: normal;
  font-size: 14px;
  padding: 8px 0 !important;
}
:deep(.ant-card-extra) {
  padding: 8px 0 !important;
}
.user-active {
  box-shadow: 0 0 10px var(--primary-4) !important;
}
:deep(.ant-card-hoverable:hover) {
  box-shadow: 0 0 10px var(--primary-4) !important;
}
.power-data {
  padding: 12px;
  display: flex;
  flex-direction: column;
}
.power-header {
  margin-bottom: 10px;
}
.power-body {
  overflow-y: auto;
  flex-wrap: wrap;
}
.role-list {
  height: 130px;
  overflow-y: auto;
}
.delete-role {
  height: 30px;
  margin-top: 10px;
  text-align: right;
}
:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper) {
  margin-left: 0px !important;
  margin-top: 5px;
}
.power-add {
  display: flex;
  align-items: center;
  justify-content: center;
}
.power-add-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(229, 229, 229, 1);
}
.plus-outlined {
  color: #fff;
  font-size: 33px;
}
</style>
