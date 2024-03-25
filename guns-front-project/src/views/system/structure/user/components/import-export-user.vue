<template>
  <a-row class="guns-layout-content">
    <a-col :span="24" class="bg-white padding10 import-box" v-show="!showPreview">
      <div class="import-header">
        <a-button shape="circle" class="import-back" @click="backUser">
          <template #icon>
            <left-outlined />
          </template>
        </a-button>
        <span class="import-title">导入导出用户</span>
      </div>
      <div class="import-body">
        <div class="import-tabs">
          <div
            class="import-tab-item"
            v-for="iItem in importList"
            :key="iItem.type"
            :class="{ 'import-active': currentTab == iItem.type }"
            @click="tabChange(iItem)"
          >
            <icon-font
              iconClass="icon-opt-import-user"
              title="导入"
              fontSize="33px"
              v-if="iItem.type == 'import'"
              color="var(--primary-color)"
            ></icon-font>
            <icon-font iconClass="icon-opt-export-user" title="导出" fontSize="33px" v-else color="var(--primary-color)"></icon-font>
            <span>{{ iItem.name }}</span>
          </div>
        </div>
        <!-- 导入用户 -->
        <div class="import-content" v-show="currentTab == 'import'">
          <div class="import-download-template">
            <div class="template-title">Excel模板下载</div>
            <a-button type="primary" class="border-radius flex" @click="downLoadTemplate">
              <icon-font iconClass="icon-opt-xiazai" title="下载" fontSize="20px" color="#fffff"></icon-font>
              下载模板</a-button
            >
          </div>
          <div class="import-download-template">
            <div class="template-title">上传Excel</div>
            <a-upload name="file" :customRequest="customRequest" :showUploadList="false">
              <a-button type="primary" class="border-radius flex" :disabled="showLoading">
                <icon-font fontSize="20px" iconClass="icon-opt-shangchuan" color="#fffff"></icon-font>上传文件</a-button
              >
            </a-upload>
            <a-spin :spinning="showLoading" :delay="100" class="loading" />
          </div>
        </div>
        <!-- 导出用户 -->
        <div class="export-content" v-show="currentTab == 'export'">
          <div class="template-title">导出用户筛选</div>
          <a-form :model="form" :rules="rules" layout="inline" ref="formRef">
            <a-form-item label="机构筛选：" name="orgName">
              <a-input v-model:value="form.orgName" placeholder="请选择机构" @focus="selectOrg('export')" />
            </a-form-item>
            <a-form-item label="包含子公司：" name="containSubOrg">
              <a-switch v-model:checked="form.containSubOrg" />
            </a-form-item>
          </a-form>
          <a-button type="primary" class="border-radius flex" style="margin-top: 24px" @click="exportUser">
            <icon-font iconClass="icon-opt-daochu" fontSize="20px" color="#fff"></icon-font>
            立即导出</a-button
          >
        </div>
      </div>
    </a-col>
    <a-col :span="24" class="bg-white padding10 import-box" v-show="showPreview">
      <div class="import-header">
        <a-button shape="circle" class="import-back" @click="backImport">
          <template #icon>
            <left-outlined />
          </template>
        </a-button>
        <span class="import-title">导入结果预览</span>
      </div>
      <div class="import-body">
        <pre class="import-body-toop">
导入成功后，您需要选择这批导入用户的所属机构。
如果是新增的人员，可以批量设置所属机构，在批量设置后也可以进行手动单个处理所属机构，直接在表格中操作即可。
如果是修改的人员，默认设置的所属机构不会覆盖该用户已有的机构。
如确认数据没问题，请点击确认导入。</pre
        >
        <a-form :model="importForm" layout="inline" ref="importFormRef">
          <a-form-item label="批量设置所属机构：" name="orgName">
            <a-input v-model:value="importForm.orgName" placeholder="请选择机构" @focus="selectOrg('import')" />
          </a-form-item>
          <a-form-item label="批量设置员工职位：" name="positionName">
            <a-input v-model:value="importForm.positionName" placeholder="请选择职位" @focus="selectPosition('all')" />
          </a-form-item>
          <a-form-item label="">
            <a-button type="primary" class="border-radius" @click="sealImport" v-if="totalSuccess">确认导入</a-button>
          </a-form-item>
        </a-form>
        <div class="import-table">
          <common-table :columns="columns" bordered ref="tableRef" :rowSelection="false" :isPage="false" :dataSource="importUserList">
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex == 'operateType'">
                <span v-if="record.operateType.submitValue == 1" style="color: #43cf7c">{{ record.operateType.value }}</span>
                <span v-if="record.operateType.submitValue == 2" style="color: #ff8d1a">{{ record.operateType.value }}</span>
                <span v-if="record.operateType.submitValue == 3" style="color: red">{{ record.operateType.value }}</span>
              </template>
              <template
                v-if="
                  [
                    'realName',
                    'nickName',
                    'account',
                    'password',
                    'birthday',
                    'sex',
                    'email',
                    'phone',
                    'tel',
                    'statusFlag',
                    'userSort',
                    'employeeNumber'
                  ].includes(column.dataIndex)
                "
              >
                <span v-if="record[column.dataIndex].validateResult">{{ record[column.dataIndex].value }}</span>
                <a-tooltip v-else>
                  <template #title>{{ record[column.dataIndex].errorMessage }}</template>
                  <span v-if="record[column.dataIndex].value" style="color: red">{{ record[column.dataIndex].value }}</span>
                  <exclamation-circle-outlined style="color: red" v-else />
                </a-tooltip>
              </template>
              <template v-if="column.dataIndex == 'orgName'">
                <a-input v-model:value="record.orgName" @focus="selectOrg('preview', record, index)"></a-input>
              </template>
              <template v-if="column.dataIndex == 'positionName'">
                <a-input v-model:value="record.positionName" @focus="selectPosition('row', record, index)"></a-input>
              </template>
            </template>
          </common-table>
        </div>
      </div>
    </a-col>

    <!-- 选择机构 -->
    <Selection v-model:visible="showSelect" v-if="showSelect" title="选择机构" :data="selectData" :showTab="['dept']" @done="closeSelect" />
    <!-- 选择职位 -->
    <Selection
      v-model:visible="showSelectPo"
      v-if="showSelectPo"
      title="选择职位"
      :data="selectData"
      :showTab="['position']"
      @done="closeSelectPo"
    />
  </a-row>
</template>

<script setup name="ImportExportUser">
import { deepClone } from '@/utils/common/util';
import { message } from 'ant-design-vue/es';
import { reactive, ref } from 'vue';
import { UsersApi } from '../api/UsersApi';

const emits = defineEmits(['back', 'backReload']);

// 导入导出列表
const importList = ref([
  {
    name: '导入用户',
    type: 'import'
  },
  {
    name: '导出用户',
    type: 'export'
  }
]);
// 当前选中的tab
const currentTab = ref('import');
// 是否显示loading
const showLoading = ref(false);
// 是否显示导入预览页面
const showPreview = ref(false);

// 导出表单数据
const form = ref({
  containSubOrg: false
});
// 表单验证
const rules = reactive({
  orgName: [{ required: true, message: '请选择机构', type: 'string', trigger: 'change' }],
  containSubOrg: [{ required: true, message: '包含子公司', type: 'boolean', trigger: 'change' }]
});
// ref
const formRef = ref(null);
const tableRef = ref(null);

// 导入表单
const importForm = ref({});

// 当前选中机构类型
const currentType = ref('export');

// 是否显示选择机构
const showSelect = ref(false);
// 是否显示选择职位
const showSelectPo = ref(false);
// 选择总数据
const selectData = ref({
  selectOrgList: [],
  selectPositionList: []
});

// 导入用户的数据列表
const importUserList = ref([]);

// 是否全部成功
const totalSuccess = ref(false);

// 当前索引
const currentIndex = ref(0);

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    isShow: true,
    hideInSetting: true,
    customRender: ({ index }) => index + 1
  },
  {
    title: '操作类型',
    isShow: true,
    width: 120,
    align: 'center',
    dataIndex: 'operateType'
  },
  {
    title: '属性机构',
    isShow: true,
    width: 150,
    dataIndex: 'orgName'
  },
  {
    title: '职位',
    isShow: true,
    width: 150,
    dataIndex: 'positionName'
  },
  {
    title: '姓名',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'realName'
  },
  {
    title: '昵称',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'nickName'
  },
  {
    title: '账号',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'account'
  },
  {
    title: '密码',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'password'
  },
  {
    title: '生日',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'birthday'
  },
  {
    title: '性别',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'sex'
  },
  {
    title: '邮箱',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'email'
  },
  {
    title: '手机',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'phone'
  },
  {
    title: '电话',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'tel'
  },
  {
    title: '状态',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'statusFlag'
  },
  {
    title: '排序',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    dataIndex: 'userSort'
  },
  {
    title: '工号',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    dataIndex: 'employeeNumber'
  }
]);

// 返回用户列表
const backUser = () => {
  emits('back');
};

// 切换导入导出
const tabChange = item => {
  if (item.type != currentTab.value) {
    currentTab.value = item.type;
  }
};

// 下载模板
const downLoadTemplate = async () => {
  await UsersApi.getExcelTemplate();
};

// 上传Excel
const customRequest = options => {
  showLoading.value = true;
  let params = new FormData();
  params.append('file', options.file);
  UsersApi.uploadAndGetPreviewData(params)
    .then(res => {
      if (res.code == '00000') {
        importUserList.value = res.data.previewData;
        totalSuccess.value = res.data.totalSuccess;
        message.success(res.message);
        showPreview.value = true;
      }
    })
    .finally(() => {
      showLoading.value = false;
    });
};

// 选择机构
const selectOrg = (type, record, index) => {
  currentType.value = type;
  selectData.value.selectOrgList = [];
  if (type == 'export') {
    const { orgName, orgId } = form.value;
    if (orgName && orgId) {
      selectData.value.selectOrgList = [{ bizId: orgId, name: orgName }];
    }
  } else if (type == 'import') {
    const { orgName, orgId } = importForm.value;
    if (orgName && orgId) {
      selectData.value.selectOrgList = [{ bizId: orgId, name: orgName }];
    }
  } else {
    currentIndex.value = index;
    const { orgName, orgId } = record;
    if (orgName && orgId) {
      selectData.value.selectOrgList = [{ bizId: orgId, name: orgName }];
    }
  }
  showSelect.value = true;
};

// 关闭选择弹框
const closeSelect = data => {
  const { bizId, name } = data.selectOrgList[0] || { bizId: '', name: '' };
  if (currentType.value == 'export') {
    form.value.orgId = bizId;
    form.value.orgName = name;
  } else if (currentType.value == 'import') {
    importForm.value.orgId = bizId;
    importForm.value.orgName = name;
    importUserList.value.forEach(item => {
      item.orgId = bizId;
      item.orgName = name;
    });
  } else {
    importUserList.value[currentIndex.value].orgName = name;
    importUserList.value[currentIndex.value].orgId = bizId;
  }
};

// 选择职位
const selectPosition = (type, record, index) => {
  currentType.value = type;
  selectData.value.selectPositionList = [];
  if (type == 'all') {
    const { positionId, positionName } = importForm.value;
    if (positionId && positionName) {
      selectData.value.selectPositionList = [{ bizId: positionId, name: positionName }];
    }
  } else if (type == 'row') {
    currentIndex.value = index;
    const { positionId, positionName } = record;
    if (positionId && positionName) {
      selectData.value.selectPositionList = [{ bizId: positionId, name: positionName }];
    }
  }
  showSelectPo.value = true;
};

// 关闭选择职位
const closeSelectPo = data => {
  const { bizId, name } = data.selectPositionList[0] || { bizId: '', name: '' };
  if (currentType.value == 'all') {
    importForm.value.positionId = bizId;
    importForm.value.positionName = name;
    importUserList.value.forEach(item => {
      item.positionId = bizId;
      item.positionName = name;
    });
  } else if (currentType.value == 'row') {
    importUserList.value[currentIndex.value].positionName = name;
    importUserList.value[currentIndex.value].positionId = bizId;
  }
};

// 立即导出
const exportUser = async () => {
  await formRef.value.validate();
  await UsersApi.ExportUser(form.value);
};

// 返回导入导出
const backImport = () => {
  showPreview.value = false;
};

// 确定导入
const sealImport = () => {
  let ensureImportUserRequest = deepClone(importUserList.value);
  ensureImportUserRequest.forEach(item => {
    Object.keys(item).forEach(key => {
      if (!['orgId', 'orgName', 'positionId', 'positionName'].includes(key)) {
        item[key] = item[key]?.submitValue;
      }
    });
  });
  UsersApi.ensureImport(ensureImportUserRequest).then(res => {
    message.success(res.message);
    showPreview.value = false;
    emits('backReload');
  });
};
</script>

<style scoped lang="less">
.import-box {
  display: flex;
  flex-direction: column;
}
.import-header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
.import-body {
  flex: auto;
}
.import-back {
  border: rgba(166, 166, 166, 1) solid 1px;
}
.import-title {
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  margin-left: 10px;
}
.import-tabs {
  width: 100%;
  display: flex;
}
.import-tab-item {
  width: 215px;
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  border: rgba(166, 166, 166, 1) solid 1px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  margin-right: 40px;
  color: rgba(80, 80, 80, 1);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 9px2px rgba(42, 130, 228, 0.65);
  }
  .icon-font-span {
    margin-right: 10px;
  }
}
.import-active {
  box-shadow: 0px 0px 9px2px rgba(42, 130, 228, 0.65);
}
.import-download-template {
  margin: 39px 0;
}
.template-title {
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  margin-bottom: 24px;
}
.loading {
  margin-left: 10px;
}
.export-content {
  margin: 39px 0;
}
.import-body-toop {
  color: rgba(166, 166, 166, 1);
  font-size: 14px;
  margin-bottom: 20px;
}
.import-table {
  width: 100%;
  height: calc(100% - 180px);
  margin-top: 10px;
}
:deep(.ant-table-bordered div.ant-table-body:before) {
  width: 0px !important;
}
</style>
