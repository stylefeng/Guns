<template>
  <div class="guns-layout">
    <div class="guns-layout-content">
      <div class="ten-height bg-white permission">
        <div class="permission-left">
          <div class="permission-left-header">
            <a-input-group compact>
              <div class="permission-left-header-left">
                <!-- 切换角色 -->
                <a-popover
                  trigger="click"
                  placement="bottomLeft"
                  v-if="superAdminFlag"
                  v-model:visible="showSelectRole"
                  overlayClassName="role-popover"
                >
                  <template #content>
                    <div class="role-list">
                      <div
                        class="role-list-item"
                        v-for="rItem in sysRoleList"
                        :key="rItem.roleId"
                        @click="changeRole(rItem)"
                        :class="[{ 'role-active': rItem.roleId == selectSystemRoleId }]"
                        :title="rItem.name"
                      >
                        <icon-font
                          v-if="rItem.roleId == 10"
                          iconClass="icon-tab-xitongjuese"
                          color="var(--primary-color)"
                          font-size="24px"
                        ></icon-font>
                        <icon-font
                          v-if="rItem.roleId == 15"
                          iconClass="icon-tab-yewujuese"
                          color="var(--primary-color)"
                          font-size="24px"
                        ></icon-font>
                        <icon-font
                          v-if="rItem.roleId == 20"
                          iconClass="icon-tab-gongsijuese"
                          color="var(--primary-color)"
                          font-size="24px"
                        ></icon-font>
                        <span style="margin-left: 5px">{{ rItem.name }}</span>
                      </div>
                    </div>
                  </template>
                  <span class="role-list-title">
                    <i class="iconfont icon-tab-xitongjuese role-list-icon" title="系统角色" v-if="selectSystemRoleId == 10"></i>
                    <i class="iconfont icon-tab-yewujuese role-list-icon" title="业务角色" v-if="selectSystemRoleId == 15"></i>
                    <i class="iconfont icon-tab-gongsijuese role-list-icon" title="公司角色" v-if="selectSystemRoleId == 20"></i>
                    <span>{{ selectSystemRoleId == 10 ? '系统' : selectSystemRoleId == 15 ? '业务' : '公司' }}</span>
                    <down-outlined class="role-list-down" v-if="superAdminFlag" />
                  </span>
                </a-popover>
                <span class="role-list-system-title" v-else>
                  <i class="iconfont icon-tab-gongsijuese role-list-icon" title="公司角色"></i>
                  <span>公司</span>
                  <down-outlined class="role-list-down" />
                </span>
              </div>
              <a-input
                v-model:value="systemName"
                :title="systemName"
                @click="changeCompany"
                :class="selectSystemRoleId == 20 && superAdminFlag ? 'role-list-input' : 'system-input'"
              >
                <template #suffix>
                  <down-outlined class="input-down" @click="changeCompany" v-if="selectSystemRoleId == 20 && superAdminFlag" />
                </template>
              </a-input>
            </a-input-group>
          </div>
          <div class="permission-left-body">
            <div
              :key="roleItem.roleId"
              :tab="roleItem.roleName"
              v-for="roleItem in roleList"
              @click="leftChange(roleItem)"
              :class="[{ 'role-select': activeKey == roleItem.roleId }]"
              class="permission-left-body-item"
            >
              <span>{{ roleItem.roleName }}</span>
            </div>
            <a-empty v-show="roleList.length == 0" class="empty"></a-empty>
          </div>
        </div>
        <div class="permission-right">
          <div v-if="activeKey" class="right">
            <a-spin :spinning="authLoading" :delay="100">
              <div class="right-top">
                <a-tabs v-model:activeKey="rightActiveKey" animated class="right-tab" @change="rightChange">
                  <a-tab-pane key="use" tab="功能权限" v-if="isShow('CHANGE_ROLE_PERMISSION')"></a-tab-pane>
                  <a-tab-pane key="data" tab="数据权限" v-if="isShow('CHANGE_ROLE_DATA_SCOPE')"></a-tab-pane>
                  <a-tab-pane key="range" tab="权限范围" v-if="isShow('CHANGE_ROLE_BIND_LIMIT')"></a-tab-pane>
                </a-tabs>
              </div>
              <div class="right-bottom">
                <!-- 功能权限 -->
                <div v-if="rightActiveKey == 'use' && permissionData" class="use-content">
                  <div class="content-header">
                    <a-checkbox v-model:checked="permissionData.checked" @click="el => allPermissionChange(el, permissionData)"
                      >所有权限</a-checkbox
                    >
                  </div>
                  <div class="content-bottom">
                    <div class="bottom-item" v-for="(perItem, perIndex) in permissionData.appPermissionList" :key="perIndex">
                      <div class="bottom-item-name">
                        <span class="title">应用：{{ perItem.nodeName }}</span>
                        <a-checkbox v-model:checked="perItem.checked" @click="el => perItemChange(el, perItem)">全选</a-checkbox>
                      </div>
                      <div class="table">
                        <a-table
                          :dataSource="perItem.children"
                          :columns="columns"
                          :pagination="false"
                          rowKey="nodeId"
                          bordered
                          size="small"
                          childrenColumnName="other"
                        >
                          <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'page'">
                              <a-checkbox v-model:checked="record.checked" @change="pageChange($event, record, perItem)">
                                {{ record.nodeName }}
                              </a-checkbox>
                            </template>
                            <template v-else-if="column.dataIndex === 'use'">
                              <a-checkbox
                                v-model:checked="chlItem.checked"
                                @change="useChange($event, chlItem, record, perItem)"
                                v-for="chlItem in record.children"
                                :key="chlItem.nodeId"
                              >
                                {{ chlItem.nodeName }}
                              </a-checkbox>
                            </template>
                          </template>
                        </a-table>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 数据权限 -->
                <div v-if="rightActiveKey == 'data'">
                  <a-form ref="formRef" :model="form" :rules="rules">
                    <a-form-item label="数据切换:" name="dataScopeType">
                      <a-radio-group v-model:value="form.dataScopeType" @change="dataScopeTypeChange">
                        <a-radio :value="10">仅本人数据</a-radio>
                        <a-radio :value="20">本部门数据</a-radio>
                        <a-radio :value="30">本部门及以下部门</a-radio>
                        <a-radio :value="31">本公司及以下数据</a-radio>
                        <a-radio :value="40">指定部门</a-radio>
                        <a-radio :value="50">全部数据</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label="选择部门:" name="orgIdList" v-if="form.dataScopeType == 40">
                      <div class="select">
                        <plus-circle-outlined class="add-icon" @click="addClick" />
                      </div>
                      <div>
                        <a-tag
                          :closable="true"
                          @close="logClose(valIndex)"
                          color="blue"
                          v-for="(valItem, valIndex) in form.orgIdListWaper"
                          :key="valItem.bizId"
                          >{{ valItem.name }}</a-tag
                        >
                      </div>
                    </a-form-item>
                    <a-form-item>
                      <a-button type="primary" @click="saveClick" class="border-radius">保存</a-button>
                    </a-form-item>
                  </a-form>
                </div>
                <!-- 权限范围 -->
                <div v-if="rightActiveKey == 'range' && powerRangeData" class="use-content">
                  <div class="content-header">
                    <a-checkbox v-model:checked="powerRangeData.checked" @click="el => allPermissionChange(el, powerRangeData)"
                      >所有权限</a-checkbox
                    >
                  </div>
                  <div class="content-bottom">
                    <div class="bottom-item" v-for="(perItem, perIndex) in powerRangeData.appPermissionList" :key="perIndex">
                      <div class="bottom-item-name">
                        <span class="title">应用：{{ perItem.nodeName }}</span>
                        <a-checkbox v-model:checked="perItem.checked" @click="el => perItemChange(el, perItem)">全选</a-checkbox>
                      </div>
                      <div class="table">
                        <a-table
                          :dataSource="perItem.children"
                          :columns="columns"
                          :pagination="false"
                          rowKey="nodeId"
                          bordered
                          size="small"
                          childrenColumnName="other"
                        >
                          <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'page'">
                              <a-checkbox v-model:checked="record.checked" @change="pageChange($event, record, perItem)">
                                {{ record.nodeName }}
                              </a-checkbox>
                            </template>
                            <template v-else-if="column.dataIndex === 'use'">
                              <a-checkbox
                                v-model:checked="chlItem.checked"
                                @change="useChange($event, chlItem, record, perItem)"
                                v-for="chlItem in record.children"
                                :key="chlItem.nodeId"
                              >
                                {{ chlItem.nodeName }}
                              </a-checkbox>
                            </template>
                          </template>
                        </a-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a-spin>
          </div>
          <a-empty v-show="!activeKey" class="right-empty"></a-empty>
        </div>
      </div>
    </div>

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelect"
      v-if="showSelect"
      title="选择部门"
      :data="selectData"
      :isRadio="false"
      :showTab="['dept']"
      @done="closeSelect"
    />

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelectCompany"
      v-if="showSelectCompany"
      title="选择公司"
      :data="selectData"
      :showTab="['company']"
      @done="closeSelectCompany"
    />
  </div>
</template>

<script setup name="Premission">
import { message } from 'ant-design-vue/es';
import { ref, onMounted, reactive, computed } from 'vue';
import { PermissionApi } from './api/PermissionApi';
import { useUserStore } from '@/store/modules/user';

// 角色列表
const roleList = ref([]);

// 系统角色列表
const sysRoleList = ref([
  {
    roleId: 10,
    name: '系统角色'
  },
  {
    roleId: 15,
    name: '业务角色'
  },
  {
    roleId: 20,
    name: '公司角色'
  }
]);

// 是否显示选择系统角色
const showSelectRole = ref(false);

// 默认选中系统角色
const selectSystemRoleId = ref(20);
// 是否显示选择公司
const showSelectCompany = ref(false);
// 当前激活tab
const activeKey = ref('');
// 右侧tab默认
const rightActiveKey = ref('use');
// 加载动画
const authLoading = ref(false);
// 功能列表数据
const permissionData = ref(null);
// 是否显示选择部门
const showSelect = ref(false);
// 表单数据
const form = ref({
  orgIdListWaper: []
});
// 选择的总数据
const selectData = ref({
  selectOrgList: [],
  selectCompanyList: []
});
// 验证规则
const rules = reactive({});
// 表格配置
const columns = ref([
  {
    title: '页面',
    width: 200,
    dataIndex: 'page'
  },
  {
    title: '功能',
    dataIndex: 'use'
  }
]);

// 权限范围数据
const powerRangeData = ref(null);

const userStore = useUserStore();

// 系统名称
const systemName = ref('');

//是否显示
const isShow = computed(() => value => {
  if (userStore.authorities.find(item => item == value)) {
    return true;
  }
  return false;
});

// 是否是超管
const superAdminFlag = computed(() => {
  return userStore.info.superAdminFlag;
});

// 当前公司信息
const currentCompanyData = computed(() => {
  let userOrgInfoList = userStore.info.userOrgInfoList;
  let filter = userOrgInfoList.filter(item => item.currentSelectFlag);
  if (filter.length > 0) {
    return filter[0];
  }
});

// 公司信息
const companyData = ref({});

onMounted(() => {
  companyData.value = currentCompanyData.value;
  systemName.value = companyData.value?.companyName;
  getAllRoleList();
});

// 获取角色列表
const getAllRoleList = () => {
  let params = {
    roleType: selectSystemRoleId.value
  };
  if (selectSystemRoleId.value == 20) {
    params.roleCompanyId = companyData.value?.companyId;
  }
  PermissionApi.getRoleList(params).then(res => {
    roleList.value = res;
    if (res && res.length) {
      activeKey.value = res[0].roleId;
      if (userStore.authorities.find(item => item === 'CHANGE_ROLE_PERMISSION')) {
        rightActiveKey.value = 'use';
        rightChange('use');
      } else if (userStore.authorities.find(item => item === 'CHANGE_ROLE_DATA_SCOPE')) {
        rightActiveKey.value = 'data';
        rightChange('data');
      } else if (userStore.authorities.find(item => item === 'CHANGE_ROLE_BIND_LIMIT')) {
        rightActiveKey.value = 'range';
        rightChange('range');
      }
    } else {
      activeKey.value = '';
      permissionData.value = [];
      powerRangeData.value = [];
      form.value.orgIdListWaper = [];
    }
  });
};

// 切换系统角色
const changeRole = rItem => {
  if (rItem.roleId != selectSystemRoleId.value) {
    if (rItem.roleId == 10) {
      systemName.value = '系统角色';
    } else if (rItem.roleId == 15) {
      systemName.value = '业务角色';
    } else {
      systemName.value = companyData.value.companyName;
    }
    selectSystemRoleId.value = rItem.roleId;
    getAllRoleList();
  }

  showSelectRole.value = false;
};

// 切换公司
const changeCompany = () => {
  if (superAdminFlag.value && selectSystemRoleId.value == 20) {
    selectData.value.selectCompanyList = [{ bizId: companyData.value.companyId, name: companyData.value.companyName }];
    showSelectCompany.value = true;
  }
};

// 关闭选择公司
const closeSelectCompany = data => {
  companyData.value = data.selectCompanyList.map(item => {
    return { companyName: item.name, companyId: item.bizId };
  })[0];
  systemName.value = companyData.value.companyName;
  getAllRoleList();
};

// 获取角色绑定的权限列表
const getRoleBindPermission = () => {
  authLoading.value = true;
  PermissionApi.getRoleBindPermission({ roleId: activeKey.value })
    .then(res => {
      permissionData.value = res;
    })
    .finally(() => (authLoading.value = false));
};

// 获取角色的数据权限详情
const getRoleBindDataScope = () => {
  authLoading.value = true;
  PermissionApi.getRoleBindDataScope({ roleId: activeKey.value })
    .then(res => {
      form.value = Object.assign({}, res);
      if (res.orgIdListWrapper) {
        form.value.orgIdListWaper = res.orgIdListWrapper.map(item => {
          return { bizId: item.orgId, name: item.orgName };
        });
      } else {
        form.value.orgIdListWaper = [];
      }
    })
    .finally(() => (authLoading.value = false));
};

// 获取角色的权限范围详情列表
const getRoleLimit = () => {
  authLoading.value = true;
  PermissionApi.getRoleLimit({ roleId: activeKey.value })
    .then(res => {
      powerRangeData.value = res;
    })
    .finally(() => (authLoading.value = false));
};

// 右侧内容切换
const rightChange = key => {
  if (key == 'data') {
    getRoleBindDataScope();
  } else if (key == 'range') {
    getRoleLimit();
  } else if (key == 'use') {
    getRoleBindPermission();
  }
};

// 左侧角色切换
const leftChange = roleItem => {
  if (roleItem.roleId != activeKey.value) {
    activeKey.value = roleItem.roleId;
    rightActiveKey.value = 'use';
    getRoleBindPermission();
  }
};

// 所有权限改变
const allPermissionChange = (el, data) => {
  setAndSaveValue(el, data, 'appPermissionList', true);
};

/**
 * 设置和保存值
 * @param {*} el 当前dom，获取选中状态
 * @param {*} data 当前行数据
 * @param {*} setName 子菜单的名称
 * @param {*} flag 是否改变子级的选中状态
 * @param {*} isPermissionData 是否改变所有数据的选中状态
 * @param {*} perItem 是否改变全选的状态
 * @param {*} record 是否改变页面的状态
 */
const setAndSaveValue = (el, data, setName, flag, isPermissionData, perItem, record) => {
  data.checked = el.target.checked;
  if (flag) {
    setCheckout(el.target.checked, data[setName]);
  }

  //全选
  if (perItem) {
    if (perItem.children.find(item => item.checked == false) || (record && record.children.find(item => item.checked == false))) {
      perItem.checked = false;
    } else {
      perItem.checked = true;
    }
  }

  //所有
  if (isPermissionData) {
    if (rightActiveKey.value == 'use') {
      if (permissionData.value.appPermissionList.find(item => item.checked == false)) {
        permissionData.value.checked = false;
      } else {
        permissionData.value.checked = true;
      }
    } else if (rightActiveKey.value == 'range') {
      if (powerRangeData.value.appPermissionList.find(item => item.checked == false)) {
        powerRangeData.value.checked = false;
      } else {
        powerRangeData.value.checked = true;
      }
    }
  }
  //保存
  savePermission(data);
};

// 全选改变
const perItemChange = (el, data) => {
  setAndSaveValue(el, data, 'children', true, true);
};

// 页面选中改变
const pageChange = (el, data, perItem) => {
  setAndSaveValue(el, data, 'children', true, true, perItem);
};

// 功能改变
const useChange = (el, data, record, perItem) => {
  setAndSaveValue(el, data, '', false, true, perItem, record);
};

// 保存功能权限
const savePermission = data => {
  authLoading.value = true;
  let params = {
    checked: data.checked,
    nodeId: data.nodeId ? data.nodeId : '',
    permissionNodeType: data.permissionNodeType,
    roleId: activeKey.value
  };
  let result;
  if (rightActiveKey.value == 'use') {
    result = PermissionApi.updateRoleBindPermission(params);
  } else if (rightActiveKey.value == 'range') {
    result = PermissionApi.bindRoleLimit(params);
  }
  result
    .then(res => {
      message.success(res.message);
    })
    .finally(() => (authLoading.value = false));
};

// 设置选中
const setCheckout = (checked, list) => {
  if (list && list.length > 0) {
    list.forEach(item => {
      item.checked = checked;
      if (item.children && item.children.length > 0) {
        setCheckout(checked, item.children);
      }
    });
  }
};

// 删除部门
const logClose = index => {
  form.value.orgIdListWaper.splice(index, 1);
};

// 关闭选择部门弹框
const closeSelect = val => {
  form.value.orgIdListWaper = val.selectOrgList;
};
// 添加部门
const addClick = () => {
  selectData.value.selectOrgList = form.value.orgIdListWaper;
  showSelect.value = true;
};

const saveClick = () => {
  authLoading.value = true;
  PermissionApi.updateRoleBindDataScope({
    roleId: activeKey.value,
    dataScopeType: form.value.dataScopeType,
    orgIdList: form.value.orgIdListWaper.map(item => item.bizId)
  })
    .then(res => {
      message.success(res.message);
    })
    .finally(() => (authLoading.value = false));
};

// 类型改变
const dataScopeTypeChange = ({ target }) => {
  if (target.value != 40) {
    form.value.orgIdListWaper = [];
  }
};
</script>

<style scoped lang="less">
.left-tab {
  height: 100%;
}
.permission {
  display: flex;
}
.permission-left {
  width: 252px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .permission-left-header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    text-align: center;
    .permission-left-header-left {
      width: 80px;
      height: 31px;
      line-height: 31px;
      margin-right: 3px;
      cursor: pointer;
    }
    .icon-menu-yingyong {
      font-size: 20px;
      cursor: pointer;
      color: var(--primary-color);
      margin-right: 10px;
    }
    .company-name {
      cursor: pointer;
      max-width: 130px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-shangxiazhankai {
      font-size: 18px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .permission-left-body {
    padding-top: 10px;
    flex: auto;
    width: 100%;
    overflow-y: auto;
    border-right: 1px solid #eee;
    .permission-left-body-item {
      text-align: center;
      cursor: pointer;
      height: 38px;
      line-height: 38px;
      &:hover {
        color: var(--primary-color);
      }
    }
    .role-select {
      background: rgba(24, 144, 255, 0.1);
      color: var(--primary-5);
      border-right: 2px solid var(--primary-color);
    }
  }
}
.permission-right {
  width: calc(100% - 252px);
  height: 100%;
  padding: 5px 0 0 16px;
}
.empty {
  margin-top: 300px;
}
.right-empty {
  margin-top: 350px;
}

.role-list {
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
}
.role-list-title {
  display: flex;
  align-items: center;
  &:hover {
    background: #eee;
    color: #000;
    border-radius: 5px;
  }
}
.role-list-system-title {
  display: flex;
  align-items: center;
}
.role-list-icon {
  margin-left: 10px;
  color: var(--primary-color);
  font-size: 20px;
}
.role-list-down {
  color: #d9d3d3;
  font-size: 12px;
  margin-left: 10px;
}
.input-down {
  color: #d9d3d3;
  font-size: 12px;
}
.role-list-input {
  border: 0px;
  width: 50%;
}
.system-input {
  border: 0px;
  width: 50%;
}
.role-list-input:hover {
  cursor: pointer;
  border-radius: 5px;
  background: #eee;
  color: #000;
  :deep(.ant-input) {
    background: #eee;
    color: #000;
    cursor: pointer;
  }
}
.role-list-item {
  width: 100%;
  padding: 10px 13px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  align-items: center;
  &:hover {
    background: #f3f3f3;
  }
  .role-image {
    width: 20px;
    height: 20px;
    margin-top: -5px;
    margin-right: 5px;
  }
}
.role-active {
  background: #eff4ff;
  &:hover {
    background: #eff4ff;
  }
}
.search-input {
  margin: 10px 0;
  border-radius: 5px;
}

:deep(.ant-popover .ant-popover-arrow) {
  display: none !important;
}
:deep(.ant-popover-placement-bottomLeft) {
  padding-top: 20px !important;
}
:deep(.ant-popover-inner-content) {
  padding: 12px 0 !important;
}

:deep(.right-tab .ant-tabs-tab-active) {
  background: #fff;
}
.right {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
:deep(.ant-tabs-content) {
  height: 100%;
}
.right-top {
  margin-top: -10px;
  height: 62px;
}
.right-bottom {
  width: 100%;
  height: calc(100% - 62px);
  overflow: hidden;
}
.use-content {
  width: 100%;
  height: 100%;
  .content-header {
    height: 22px;
  }
  .content-bottom {
    width: 100%;
    margin-top: 20px;
    overflow-y: auto;
    height: calc(100% - 32px);
    .bottom-item {
      margin-bottom: 20px;
      .bottom-item-name {
        .title {
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
        }
      }
    }
  }
}
:deep(.ant-table-thead th) {
  text-align: center;
}
:deep(.ant-table-tbody .ant-table-cell) {
  padding: 8px 8px 8px 20px !important;
}
.select {
  margin-top: 8px;
  margin-bottom: 10px;
  .add-icon {
    font-size: 20px;
    font-weight: bold;
    color: var(--primary-color);
    cursor: pointer;
  }
}
.ant-input-affix-wrapper-focused {
  box-shadow: 0 0 0 0px var(--primary-color-outline);
}
</style>
