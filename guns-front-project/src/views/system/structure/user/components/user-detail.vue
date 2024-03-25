<template>
  <common-drawer
    :width="800"
    :visible="props.visible"
    title="用户信息"
    @close="updateVisible(false)"
    :isShowTab="true"
    :activeKey="activeKey"
    :tabList="tabList"
    @tabChange="tabChange"
  >
    <template #top>
      <div class="top">
        <img :src="form.avatarWrapper" alt="" class="img" v-if="form.avatarWrapper" />
        <img src="@/assets/avatar.png" alt="" class="img" v-else />
        <span class="username">{{ form.realName }}</span>
      </div>
    </template>
    <div class="content">
      <div style="margin-bottom: 10px">
        <a-button type="primary" class="border-radius" @click="editClick" v-permission="['EDIT_USER']">编辑</a-button>
      </div>
      <!-- 基本信息 -->
      <div class="content-item" v-show="activeKey == '1'">
        <a-form ref="formRef" :model="form" :label-col="{ span: 3 }">
          <a-row :gutter="16">
            <a-col :span="24" v-for="(item, index) in baseColumn" :key="index">
              <a-form-item :label="item.name">
                <span v-if="item.value == 'superAdminFlag'">{{ form[item.value] == 'Y' ? '是' : '否' }}</span>
                <span v-else-if="item.value == 'statusFlag'">{{ form[item.value] == 1 ? '启用' : '禁用' }}</span>
                <span v-else-if="item.value == 'sex'">{{ form[item.value] == 'M' ? '男' : form[item.value] == 'Y' ? '否' : '' }}</span>
                <span v-else>{{ form[item.value] }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 组织机构 -->
      <div class="content-item" v-show="activeKey == '2'">
        <a-table :dataSource="form.userOrgList" bordered size="small" :columns="orgColumns" :pagination="false" ref="tableRef">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'mainFlag'">
              <span v-if="record.mainFlag == 'Y'">是</span>
              <span v-if="record.mainFlag == 'N'">否</span>
            </template>
            <template v-if="column.dataIndex == 'statusFlag'">
              <span v-if="record.statusFlag == 1">启用</span>
              <span v-if="record.statusFlag == 2">禁用</span>
            </template>
          </template>
        </a-table>
      </div>
      <!-- 角色信息 -->
      <div class="content-item" v-show="activeKey == '3'">
        <a-form ref="formRef" :model="form" :label-col="{ span: 3 }">
          <a-row :gutter="16">
            <a-form-item label="角色信息" style="width: 100%">
              <a-checkbox-group v-model:value="form.roleIdList" disabled>
                <a-checkbox :value="roItem.roleId" name="type" v-for="roItem in roleList" :key="roItem.roleId">{{
                  roItem.roleName
                }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-row>
        </a-form>
      </div>
      <!-- 证书信息 -->
      <div class="content-item" v-show="activeKey == '4'">
        <a-table :dataSource="form.userCertificateList" size="small" bordered :columns="certificateColumns" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'certificateType'">
              {{ getTypeName(record.certificateType) }}
            </template>
            <template v-if="column.dataIndex == 'dateIssued'">
              {{ record[column.dataIndex] ? record[column.dataIndex].substr(0, 10) : '' }}
            </template>
            <template v-if="column.dataIndex == 'dateExpires'">
              {{ record[column.dataIndex] ? record[column.dataIndex].substr(0, 10) : '长期' }}
            </template>
            <template v-if="column.dataIndex == 'attachmentId'">
              <div v-if="record.attachmentId" style="width: 100%; display: flex; align-items: center">
                <span class="filename"
                  ><a @click="prewiew(record)">
                    <a-tooltip>
                      <template #title>{{ record.attachmentName }}</template>
                      {{ record.attachmentName }}
                    </a-tooltip></a
                  ></span
                >
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <!-- 新增编辑弹框 -->
    <UserAddEdit v-model:visible="showEdit" v-if="showEdit" :data="form" @done="getUserDetail" />

    <!-- 分配角色 -->
    <AllocationRole v-model:visible="showRole" v-if="showRole" :data="form" @done="getUserDetail" />
  </common-drawer>
</template>

<script setup name="UserDetail">
import { ref, onMounted, watch } from 'vue';
import { UsersApi } from '../api/UsersApi';
import UserAddEdit from './user-add-edit.vue';
import AllocationRole from './allocation-role.vue';
import { SysDictTypeApi } from '@/components/DictSelect/api/SysDictTypeApi';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);

// ref
const tableRef = ref(null);
// 激活tab
const activeKey = ref('1');
// tab栏列表
const tabList = ref([
  {
    key: '1',
    name: '基础信息',
    icon: 'icon-tab-jichuxinxi'
  },
  {
    key: '2',
    name: '组织机构',
    icon: 'icon-tab-zuzhijigou'
  },
  {
    key: '3',
    name: '角色信息',
    icon: 'icon-tab-jiaosexinxi'
  },
  {
    key: '4',
    name: '用户证书',
    icon: 'icon-tab-yonghuzhengshu'
  }
]);

// 表单数据
const form = ref({
  userOrgList: []
});

// 是否显示编辑弹框
const showEdit = ref(false);
// 是否显示分配角色
const showRole = ref(false);

// 基本信息展示项配置
const baseColumn = ref([
  {
    name: '超级管理员',
    value: 'superAdminFlag'
  },
  {
    name: '姓名',
    value: 'realName'
  },
  {
    name: '账号',
    value: 'account'
  },
  {
    name: '工号',
    value: 'employeeNumber'
  },
  {
    name: '性别',
    value: 'sex'
  },
  {
    name: '生日',
    value: 'birthday'
  },
  {
    name: '邮箱',
    value: 'email'
  },
  {
    name: '手机号',
    value: 'phone'
  },
  {
    name: '上次登录IP',
    value: 'lastLoginIp'
  },
  {
    name: '上次登录时间',
    value: 'lastLoginTime'
  },
  {
    name: '登录次数',
    value: 'loginCount'
  },
  {
    name: '用户状态',
    value: 'statusFlag'
  },
  {
    name: '创建时间',
    value: 'createTime'
  },
  {
    name: '上次更新时间',
    value: 'updateTime'
  }
]);

// 组织机构配置
const orgColumns = ref([
  {
    key: 'index',
    title: '序号',
    align: 'center',
    customRender: ({ index }) => index + 1
  },
  {
    title: '机构名称',
    align: 'center',
    dataIndex: 'orgName'
  },
  {
    title: '职位',
    align: 'center',
    dataIndex: 'positionName'
  },
  {
    title: '是否是主部门',
    align: 'center',
    dataIndex: 'mainFlag'
  },
  {
    title: '是否启用',
    align: 'center',
    dataIndex: 'statusFlag'
  },
]);

// 工号表格配置
const certificateColumns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    customRender: ({ index }) => index + 1
  },
  {
    title: '证书类型',
    align: 'center',
    dataIndex: 'certificateType'
  },
  {
    title: '证书编号',
    align: 'center',
    dataIndex: 'certificateNo'
  },
  {
    title: '发证机构名称',
    align: 'center',
    dataIndex: 'issuingAuthority'
  },
  {
    title: '发证日期',
    align: 'center',
    dataIndex: 'dateIssued'
  },
  {
    title: '附件',
    align: 'center',
    width: 150,
    ellipsis: true,
    dataIndex: 'attachmentId'
  },
  {
    title: '到期日期',
    align: 'center',
    dataIndex: 'dateExpires'
  }
]);

// 角色列表
const roleList = ref([]);
// 证书类型列表
const certificateTypeList = ref([]);

onMounted(() => {
  getRoleList();
  getUserDetail();
  getCertificateTypeList();
});

watch(
  () => props.data,
  val => {
    if (val) {
      getUserDetail();
    }
  },
  { deep: true }
);

// 获取证书类型列表
const getCertificateTypeList = async () => {
  certificateTypeList.value = await SysDictTypeApi.getDictListByParams({ dictTypeId: '1722790763315597314' });
};

// 获取证书名称
const getTypeName = id => {
  let name = '';
  if (certificateTypeList.value.find(item => item.dictId == id)) {
    name = certificateTypeList.value.find(item => item.dictId == id).dictName;
  }
  return name;
};

// 获取用户详情
const getUserDetail = () => {
  UsersApi.detail({ userId: props.data.userId }).then(res => {
    form.value = Object.assign({}, res);
    if (res.userOrgDTOList && res.userOrgDTOList.length > 0) {
      // 设置机构
      form.value.userOrgList = res.userOrgDTOList.map(item => {
        return {
          mainFlag: item.mainFlag,
          statusFlag: item.statusFlag,
          positionId: item.positionId,
          positionName: item.positionName,
          orgId: item.deptId ? item.deptId : item.companyId,
          orgName: item.deptName ? item.deptName : item.companyName
        };
      });
    }

    if (res.userCertificateList.length > 0) {
      form.value.userCertificateList.forEach(item => {
        if (item.attachmentId) {
          item.attachmentName = item.attachmentIdWrapper.name;
          item.attachmentUrl = item.attachmentIdWrapper.thumbUrl;
        }
      });
    }
  });
};

// 获取角色列表
const getRoleList = async () => {
  roleList.value = await UsersApi.roleList();
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};
// tab切换
const tabChange = key => {
  activeKey.value = key;
};

// 预览
const prewiew = record => {
  window.open(record.attachmentUrl);
};

// 点击编辑
const editClick = () => {
  if (activeKey.value == '3') {
    showRole.value = true;
  } else {
    showEdit.value = true;
  }
};
</script>

<style scoped lang="less">
:deep(.ant-drawer-header) {
  background: rgba(250, 134, 53, 1);
}
:deep(.ant-drawer-title) {
  color: #fff;
}
.top {
  height: 40px;
  line-height: 40px;
  margin-bottom: 14px;
  .img {
    width: 40px;
    height: 100%;
  }
  .username {
    margin-left: 20px;
    font-size: 22px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
  }
}
.content {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .content-item {
    width: 100%;
    height: 100%;
  }
}
:deep(.ant-checkbox-wrapper-checked .ant-checkbox-disabled .ant-checkbox-inner) {
  --disabled-bg: var(--primary-color);
  --disabled-color: #fff;
}
:deep(.ant-checkbox-disabled + span) {
  --disabled-color: black;
}
</style>
