<template>
  <a-row class="guns-layout-content">
    <a-col :span="24" class="bg-white padding10 import-box" v-show="!showPreview">
      <div class="import-header">
        <a-button shape="circle" class="import-back" @click="backOrg">
          <template #icon>
            <left-outlined />
          </template>
        </a-button>
        <span class="import-title">导入导出机构</span>
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
              iconClass="icon-opt-daoru"
              title="导入"
              fontSize="33px"
              v-if="iItem.type == 'import'"
              color="var(--primary-color)"
            ></icon-font>
            <icon-font iconClass="icon-opt-daochu" title="导出" fontSize="33px" v-else color="var(--primary-color)"></icon-font>
            <span>{{ iItem.name }}</span>
          </div>
        </div>
        <!-- 导入机构 -->
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
              <a-button type="primary" class="border-radius flex" :disabled="showLoading"
                ><icon-font fontSize="20px" iconClass="icon-opt-shangchuan" color="#fffff"></icon-font>上传文件</a-button
              >
            </a-upload>
            <a-spin :spinning="showLoading" :delay="100" class="loading" />
          </div>
        </div>
        <!-- 导出机构 -->
        <div class="export-content" v-show="currentTab == 'export'">
          <div class="template-title">导出机构筛选</div>
          <a-form :model="form" :rules="rules" layout="inline" ref="formRef">
            <a-form-item label="机构筛选：" name="orgName">
              <a-input v-model:value="form.orgName" placeholder="请选择机构" @focus="selectOrg('export')" />
            </a-form-item>
            <a-form-item label="包含子公司：" name="containSubOrg">
              <a-switch v-model:checked="form.containSubOrg" />
            </a-form-item>
          </a-form>
          <a-button type="primary" class="border-radius flex" style="margin-top: 24px" @click="exportOrg">
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
导入成功后，您需要选择这批导入机构的所属机构。
如果是新增的机构，并且父级为空，则会将这批机构自动挂载到指定机构上。
如果是修改的机构，导入程序只能修改组织机构名称、简称、编码、排序、状态、类型、税号、备注、对外主数据id。
如确认数据没问题，请点击确认导入。</pre
        >
        <a-form :model="importForm" :rules="importRules" layout="inline" ref="importFormRef" style="height: 60px">
          <a-form-item label="设置属性机构：" name="belongOrgName">
            <a-input v-model:value="importForm.belongOrgName" placeholder="请选择机构" @focus="selectOrg('import')" />
          </a-form-item>
          <a-form-item label="">
            <a-button type="primary" class="border-radius" @click="sealImport" v-if="totalSuccess">确认导入</a-button>
          </a-form-item>
        </a-form>
        <div class="import-table">
          <common-table :columns="columns" bordered ref="tableRef" :rowSelection="false" :isPage="false" :dataSource="importOrgList">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex == 'operateType'">
                <span v-if="record.operateType.submitValue == 1" style="color: #43cf7c">{{ record.operateType.value }}</span>
                <span v-if="record.operateType.submitValue == 2" style="color: #ff8d1a">{{ record.operateType.value }}</span>
                <span v-if="record.operateType.submitValue == 3" style="color: red">{{ record.operateType.value }}</span>
              </template>
              <template
                v-if="
                  [
                    'orgName',
                    'orgShortName',
                    'parentOrgName',
                    'orgCode',
                    'orgSort',
                    'statusFlag',
                    'orgType',
                    'taxNo',
                    'remark',
                    'orgId',
                    'masterOrgId'
                  ].includes(column.dataIndex)
                "
              >
                <span v-if="record[column.dataIndex]?.validateResult">{{ record[column.dataIndex].value }}</span>
                <a-tooltip v-else>
                  <template #title>{{ record[column.dataIndex].errorMessage }}</template>
                  <span v-if="record[column.dataIndex].value" style="color: red">{{ record[column.dataIndex].value }}</span>
                  <exclamation-circle-outlined style="color: red" v-else />
                </a-tooltip>
              </template>
            </template>
          </common-table>
        </div>
      </div>
    </a-col>

    <!-- 选择机构 -->
    <Selection v-model:visible="showSelect" v-if="showSelect" title="选择机构" :data="selectData" :showTab="['dept']" @done="closeSelect" />
  </a-row>
</template>

<script setup name="ImportExportOrg">
import { deepClone } from '@/utils/common/util';
import { message } from 'ant-design-vue/es';
import { reactive, ref } from 'vue';
import { OrgApi } from '../api/OrgApi';

const emits = defineEmits(['back', 'backReload']);

// 导入导出列表
const importList = ref([
  {
    name: '导入机构',
    type: 'import'
  },
  {
    name: '导出机构',
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
// 导入表单验证
const importRules = reactive({
  belongOrgName: [{ required: true, message: '请选择所属机构', type: 'string', trigger: 'change' }]
});
// ref
const formRef = ref(null);
const tableRef = ref(null);
const importFormRef = ref(null);

// 导入表单
const importForm = ref({});

// 当前选中机构类型
const currentType = ref('export');

// 是否显示选择机构
const showSelect = ref(false);
// 选择总数据
const selectData = ref({
  selectOrgList: []
});

// 导入机构的数据列表
const importOrgList = ref([]);

// 是否全部成功
const totalSuccess = ref(false);

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
    title: '机构名称',
    isShow: true,
    width: 150,
    dataIndex: 'orgName'
  },
  {
    title: '机构简称',
    isShow: true,
    width: 150,
    dataIndex: 'orgShortName'
  },
  {
    title: '父级机构',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'parentOrgName'
  },
  {
    title: '机构编码',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'orgCode'
  },
  {
    title: '排序',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'orgSort'
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
    title: '类型',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'orgType'
  },
  {
    title: '税号',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'taxNo'
  },
  {
    title: '描述',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'remark'
  },
  {
    title: '当前系统机构id',
    isShow: true,
    width: 120,
    align: 'center',
    ellipsis: true,
    dataIndex: 'orgId'
  },
  {
    title: '主数据系统机构id',
    isShow: true,
    width: 150,
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    dataIndex: 'masterOrgId'
  }
]);

// 返回机构列表
const backOrg = () => {
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
  await OrgApi.getExcelTemplate();
};

// 上传Excel
const customRequest = options => {
  showLoading.value = true;
  let params = new FormData();
  params.append('file', options.file);
  OrgApi.uploadAndGetPreviewData(params)
    .then(res => {
      if (res.code == '00000') {
        importOrgList.value = res.data.previewData;
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
const selectOrg = type => {
  currentType.value = type;
  selectData.value.selectOrgList = [];
  if (type == 'export') {
    const { orgName, orgId } = form.value;
    if (orgName && orgId) {
      selectData.value.selectOrgList = [{ bizId: orgId, name: orgName }];
    }
  } else if (type == 'import') {
    const { belongOrgName, belongOrgId } = importForm.value;
    if (belongOrgName && belongOrgId) {
      selectData.value.selectOrgList = [{ bizId: belongOrgId, name: belongOrgName }];
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
    importForm.value.belongOrgId = bizId;
    importForm.value.belongOrgName = name;
  }
};

// 立即导出
const exportOrg = async () => {
  await formRef.value.validate();
  await OrgApi.exportOrg(form.value);
};

// 返回导入导出
const backImport = () => {
  showPreview.value = false;
};

// 确定导入
const sealImport = async () => {
  await importFormRef.value.validate();
  let importOrgItemList = deepClone(importOrgList.value);
  importOrgItemList.forEach(item => {
    Object.keys(item).forEach(key => {
      item[key] = item[key]?.submitValue;
    });
  });
  let params = {
    ...importForm.value,
    importOrgItemList: importOrgItemList
  };
  OrgApi.ensureImport(params).then(res => {
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
  height: calc(100% - 210px);
  margin-top: 10px;
}
:deep(.ant-table-bordered div.ant-table-body:before) {
  width: 0px !important;
}
</style>
