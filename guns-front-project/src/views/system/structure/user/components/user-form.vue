<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="姓名:" name="realName">
          <a-input v-model:value="form.realName" allow-clear placeholder="请输入姓名" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="账号:" name="account">
          <a-input v-model:value="form.account" allow-clear placeholder="请输入账号" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="性别:" name="sex">
          <a-radio-group v-model:value="form.sex">
            <a-radio value="M">男</a-radio>
            <a-radio value="F">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="props.superAdminFlag">
        <a-form-item label="是否是超级管理员:" name="superAdminFlag">
          <a-radio-group v-model:value="form.superAdminFlag">
            <a-radio value="Y">是</a-radio>
            <a-radio value="N">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="!isUpdate">
        <a-form-item label="密码:" name="password">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" autocomplete="new-password"> </a-input-password>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="用户状态:" name="statusFlag">
          <a-radio-group v-model:value="form.statusFlag">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="用户排序:" name="userSort">
          <a-input-number v-model:value="form.userSort" placeholder="请输入排序" allow-clear autocomplete="off" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="手机号:" name="phone">
          <a-input v-model:value="form.phone" allow-clear placeholder="请输入手机号" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="邮箱:" name="email">
          <a-input v-model:value="form.email" allow-clear placeholder="请输入邮箱" autocomplete="new-password" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="出生日期:" name="birthday">
          <a-date-picker v-model:value="form.birthday" value-format="YYYY-MM-DD" placeholder="请选择出生日期" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="人员工号:" name="employeeNumber">
          <a-input v-model:value="form.employeeNumber" allow-clear placeholder="请输入人员工号" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <div class="card-title">组织机构信息</div>
      </a-col>
      <a-col :span="24">
        <a-button type="primary" class="border-radius" @click="addOrg"><plus-outlined /> 添加机构</a-button>
      </a-col>
      <a-col :span="24" class="marginT10">
        <vxe-table
          border
          show-overflow
          :data="form.userOrgList"
          :row-config="{ useKey: true }"
          :edit-rules="validRules"
          :column-config="{ resizable: true }"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          max-height="600"
          ref="xTableRef"
        >
          <vxe-column type="seq" width="60" title="序号" align="center"></vxe-column>
          <vxe-column field="orgName" title="机构名称" align="center">
            <template #default="{ row, rowIndex }">
              <vxe-input v-model="row.orgName" type="text" @focus="orgNameFocus(row, rowIndex)"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="positionName" title="职位" width="200" align="center">
            <template #default="{ row, rowIndex }">
              <vxe-input
                v-model="row.positionName"
                type="text"
                placeholder="请输入职位"
                @focus="positionNameFocus(row, rowIndex)"
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="mainFlag" title="主要部门" width="100" align="center">
            <template #default="{ row, rowIndex }">
              <vxe-switch v-model="row.mainFlag" open-value="Y" close-value="N" @change="mainFlagChange(row, rowIndex)"></vxe-switch>
            </template>
          </vxe-column>
          <vxe-column field="statusFlag" title="是否启用" width="100" align="center">
            <template #default="{ row }">
              <vxe-switch v-model="row.statusFlag" :open-value="1" :close-value="2"></vxe-switch>
            </template>
          </vxe-column>
          <vxe-column title="操作" width="100" align="center">
            <template #default="{ row }">
              <icon-font iconClass="icon-opt-shanchu" color="#60666b" font-size="24px" @click="removeOrg(row)"></icon-font>
            </template>
          </vxe-column>
        </vxe-table>
      </a-col>
      <a-col :span="24">
        <div class="card-title">证书信息</div>
      </a-col>
      <a-col :span="24">
        <a-button type="primary" class="border-radius" @click="addCertificate"><plus-outlined /> 添加证书</a-button>
      </a-col>
      <a-col :span="24" style="margin-top: 10px">
        <vxe-table
          border
          show-overflow
          :data="form.userCertificateList"
          :row-config="{ useKey: true }"
          :column-config="{ resizable: true }"
          max-height="600"
          ref="certificateRef"
        >
          <vxe-column type="seq" width="60" title="序号" align="center"></vxe-column>
          <vxe-column field="certificateType" title="证书类型" width="200" align="center">
            <template #default="{ row }">
              <vxe-select v-model="row.certificateType" transfer placeholder="请选择证书类型">
                <vxe-option
                  v-for="(typeItem, typeIndex) in certificateTypeList"
                  :key="typeIndex"
                  :value="typeItem.dictId"
                  :label="typeItem.dictName"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-column>
          <vxe-column field="certificateNo" title="证书编号" width="200" align="center">
            <template #default="{ row }">
              <vxe-input v-model="row.certificateNo" type="text" placeholder="请输入证书编号"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="issuingAuthority" title="发证机构名称" width="200" align="center">
            <template #default="{ row }">
              <vxe-input v-model="row.issuingAuthority" type="text" placeholder="请输入发证机构名称"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="dateIssued" title="发证日期" width="150" align="center">
            <template #default="{ row }">
              <vxe-input
                v-model="row.dateIssued"
                type="date"
                valueFormat="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择发证日期"
                transfer
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="dateExpires" title="到期日期" width="150" align="center">
            <template #default="{ row }">
              <vxe-input
                v-model="row.dateExpires"
                valueFormat="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="请选择到期日期"
                transfer
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="attachmentId" title="附件" width="150" align="center">
            <template #default="{ row }">
              <a-upload
                name="file"
                :multiple="false"
                :maxCount="1"
                accept=".jpeg,.jpg,.png,.tif,.jfif,.webp,.pjp,.apng,.pjpeg,.avif,.ico,.tiff,.bmp,.xbm,.jxl,.jpeg,.svgz,.gif,.svg,.pdf"
                :beforeUpload="info => beforeUpload(info, row)"
                :showUploadList="false"
              >
                <a-button type="primary" v-if="!row.attachmentId">
                  <template #icon>
                    <CloudUploadOutlined />
                  </template>
                  <span>上传文件</span>
                </a-button>
              </a-upload>
              <div v-if="row.attachmentId" style="width: 100%; display: flex; align-items: center">
                <span class="filename"
                  ><a @click="prewiew(row)">
                    <a-tooltip>
                      <template #title>{{ row.attachmentName }}</template>
                      {{ row.attachmentName }}
                    </a-tooltip></a
                  ></span
                ><delete-outlined class="delete" @click="deleteFile(row)" />
              </div>
            </template>
          </vxe-column>
          <vxe-column title="操作" width="100" align="center" fixed="right">
            <template #default="{ row }">
              <icon-font iconClass="icon-opt-shanchu" color="#60666b" font-size="24px" @click="removeCertificate(row)"></icon-font>
            </template>
          </vxe-column>
        </vxe-table>
      </a-col>
    </a-row>

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelect"
      v-if="showSelect"
      :title="selectTitle"
      :data="selectData"
      :showTab="showTab"
      @done="closeSelect"
    />
  </a-form>
</template>

<script setup name="UserForm">
import { message } from 'ant-design-vue/es';
import { onMounted, reactive, ref } from 'vue';
import { VXETable } from 'vxe-table';
import { FileApi } from '@/views/system/backend/file/api/FileApi';
import { SysDictTypeApi } from '@/components/DictSelect/api/SysDictTypeApi';

const props = defineProps({
  // 表单数据
  form: Object,
  // 是否是编辑
  isUpdate: Boolean,
  // 是否是超管
  superAdminFlag: {
    type: Boolean,
    default: false
  }
});

// 验证规则
const rules = reactive({
  realName: [{ required: true, message: '请输入姓名', type: 'string', trigger: 'blur' }],
  account: [{ required: true, message: '请输入账号', type: 'string', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', type: 'string', trigger: 'change' }],
  superAdminFlag: [{ required: true, message: '请选择是否是超级管理员', type: 'string', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', type: 'string', trigger: 'blur' }],
  statusFlag: [{ required: true, message: '请选择用户状态', type: 'number', trigger: 'change' }]
});

// ref
const xTableRef = ref(null);
const certificateRef = ref(null);
// 是否选择选择组件
const showSelect = ref(false);
// 选择组件标题
const selectTitle = ref('');
// 显示的tab
const showTab = ref([]);
// 当前机构的索引
const currentIndex = ref(undefined);
// 选中的数据
const selectData = ref({});
// 证书类型列表
const certificateTypeList = ref([]);

// 验证
const validRules = ref({
  orgName: [{ required: true, message: '请选择机构' }],
  positionName: [{ required: true, message: '请选择职务' }],
  mainFlag: [{ required: true, message: '请选择主要部门' }]
});

onMounted(() => {
  getCertificateTypeList();
});

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

// 验证事件
const validAllEvent = async () => {
  let flag = false;
  const $table = xTableRef.value;
  const errMap = await $table.validate(true);
  if (errMap) {
    flag = false;
  } else {
    flag = true;
  }
  return flag;
};

// 点击添加机构
const addOrg = async () => {
  if (await validAllEvent()) {
    let obj = {
      mainFlag: props.form.userOrgList.length == 0 ? 'Y' : 'N',
      statusFlag: 1,
      orgId: '',
      orgName: '',
      positionId: '',
      positionName: ''
    };
    props.form.userOrgList.push(obj);
  }
};

// 删除机构
const removeOrg = async row => {
  // 删除当前行
  const type = await VXETable.modal.confirm('您确定要删除该数据?');
  if (type === 'confirm') {
    const $table = xTableRef.value;
    $table.remove(row);
  }
  const res = xTableRef.value.getTableData().tableData;
  props.form.userOrgList = res;
};

// 机构点击
const orgNameFocus = (row, index) => {
  currentIndex.value = index;
  getSelectList(row, 'orgId', 'orgName', 'selectOrgList');
  showTab.value = ['dept'];
  selectTitle.value = '机构选择';
  showSelect.value = true;
};

// 职位点击
const positionNameFocus = (row, index) => {
  currentIndex.value = index;
  getSelectList(row, 'positionId', 'positionName', 'selectPositionList');
  showTab.value = ['position'];
  selectTitle.value = '职位选择';
  showSelect.value = true;
};

// 获取选中的列表
const getSelectList = (row, id, name, selectName) => {
  if (row[id] && row[name]) {
    selectData.value[selectName] = [{ bizId: row[id], name: row[name] }];
  } else {
    selectData.value[selectName] = [];
  }
};

// 关闭选择组件
const closeSelect = val => {
  showSelect.value = false;
  if (showTab.value[0] == 'dept') {
    setValue(val, 'orgId', 'orgName', 'selectOrgList');
  } else if (showTab.value[0] == 'position') {
    setValue(val, 'positionId', 'positionName', 'selectPositionList');
  }
};

// 设置值
const setValue = (val, id, name, selectName) => {
  if (currentIndex.value != undefined) {
    if (val[selectName] && val[selectName].length > 0) {
      props.form.userOrgList[currentIndex.value][id] = val[selectName][0].bizId;
      props.form.userOrgList[currentIndex.value][name] = val[selectName][0].name;
    } else {
      props.form.userOrgList[currentIndex.value][id] = '';
      props.form.userOrgList[currentIndex.value][name] = '';
    }
  }
};

// 主要部门改变
const mainFlagChange = (row, index) => {
  if (row.mainFlag == 'Y') {
    props.form.userOrgList.forEach((item, itemIndex) => {
      if (index != itemIndex) {
        item.mainFlag = 'N';
      }
    });
  } else if (row.mainFlag == 'N') {
    if (!props.form.userOrgList.find(item => item.mainFlag == 'Y')) {
      row.mainFlag = 'Y';
      return message.warning('必须有一个主要部门');
    }
  }
};

// 添加证书
const addCertificate = () => {
  let obj = {
    certificateType: '',
    certificateNo: '',
    issuingAuthority: '',
    dateIssued: '',
    dateExpires: null,
    attachmentId: '',
    attachmentName: '',
    attachmentUrl: ''
  };
  props.form.userCertificateList.push(obj);
};

// 删除证书信息
const removeCertificate = async row => {
  // 删除当前行
  const type = await VXETable.modal.confirm('您确定要删除该数据?');
  if (type === 'confirm') {
    const $table = certificateRef.value;
    $table.remove(row);
  }
  const res = certificateRef.value.getTableData().tableData;
  props.form.userCertificateList = res;
};

/**
 * 上传成功的回调
 *
 * @author fengshuonan
 * @date 2021/4/2 17:03
 */
const beforeUpload = (info, row) => {
  const formData = new FormData();
  formData.append('file', info);
  FileApi.commonUpload('N', formData).then(res => {
    row.attachmentName = res.data.fileOriginName;
    row.attachmentId = res.data.fileId;
    row.attachmentUrl = res.data.fileUrl;
  });
  props.form.userCertificateList = [...props.form.userCertificateList];
  return false;
};

// 删除附件
const deleteFile = row => {
  row.attachmentName = '';
  row.attachmentId = '';
  row.attachmentUrl = '';
  props.form.userCertificateList = [...props.form.userCertificateList];
};

// 预览
const prewiew = row => {
  window.open(row.attachmentUrl);
};

defineExpose({
  validAllEvent
});
</script>

<style scoped lang="less">
.card-title {
  width: 100%;
  border-left: 5px solid;
  border-color: var(--primary-color);
  padding-left: 10px;
  margin-bottom: 20px;
}
:deep(.vxe-icon-edit) {
  display: none;
}
.marginT10 {
  margin-top: 10px;
  margin-bottom: 20px;
}
.delete {
  width: 20px;
  color: red;
  cursor: pointer;
}
.filename {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>
