<template>
  <common-drawer
    :width="800"
    :visible="props.visible"
    title="机构信息"
    @close="updateVisible(false)"
    :isShowTab="true"
    :activeKey="activeKey"
    :tabList="tabList"
    @tabChange="tabChange"
  >
    <template #top>
      <div class="top">
        <span class="orgName">{{ form.orgName }}</span>
        <span v-if="form.orgShortName" class="short-name">({{ form.orgShortName }})</span>
      </div>
    </template>
    <div class="content">
      <div style="margin-bottom: 10px" v-if="activeKey == '1'">
        <a-button type="primary" class="border-radius" @click="editClick">编辑</a-button>
      </div>
      <!-- 基本信息 -->
      <div class="content-item" v-show="activeKey == '1'">
        <a-form ref="formRef" :model="form" :label-col="{ span: 3 }">
          <a-row :gutter="16">
            <a-col :span="24" v-for="(item, index) in baseColumn" :key="index">
              <a-form-item :label="item.name">
                <span v-if="item.value == 'orgType'">{{ form[item.value] == 1 ? '公司' : '部门' }}</span>
                <span v-else-if="item.value == 'statusFlag'">{{ form[item.value] == 1 ? '启用' : '禁用' }}</span>
                <span v-else>{{ form[item.value] }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 组织机构 -->
      <div class="content-item" v-show="activeKey == '2'">
        <!-- 设置审批人 -->
        <set-approver ref="setApproverRef" :data="props.data"></set-approver>
      </div>
    </div>

    <!-- 新增编辑弹框 -->
    <OrgAddEdit v-model:visible="showEdit" v-if="showEdit" :data="form" @done="getDetail" />
  </common-drawer>
</template>

<script setup name="OrgDetail">
import { ref, onMounted, watch, nextTick } from 'vue';
import { OrgApi } from '../api/OrgApi';
import OrgAddEdit from './org-add-edit.vue';
import SetApprover from './set-approver.vue';

const props = defineProps({
  visible: Boolean,
  data: Object,
  //是否默认选中审批人
  isShowApprover: Boolean
});

const emits = defineEmits(['update:visible', 'done']);

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
    name: '审批人',
    icon: 'icon-opt-shenpirenshezhi'
  }
]);

// 表单数据
const form = ref({});

// 是否显示编辑弹框
const showEdit = ref(false);

// ref
const setApproverRef = ref(null);

// 基本信息展示项配置
const baseColumn = ref([
  {
    name: '上机机构',
    value: 'parentOrgName'
  },
  {
    name: '机构编码',
    value: 'orgCode'
  },
  {
    name: '机构类型',
    value: 'orgType'
  },
  {
    name: '排序',
    value: 'orgSort'
  },
  {
    name: '机构简称',
    value: 'orgShortName'
  },
  {
    name: '机构状态',
    value: 'statusFlag'
  },
  {
    name: '税号',
    value: 'taxNo'
  },
  {
    name: '备注',
    value: 'remark'
  }
]);

onMounted(() => {
  if (props.isShowApprover) {
    activeKey.value = '2';
  }
  getDetail();
});

watch(
  () => props.data,
  val => {
    if (val) {
      getDetail();
    }
  },
  { deep: true }
);

// 获取详情
const getDetail = () => {
  OrgApi.detail({ orgId: props.data.orgId }).then(res => {
    form.value = Object.assign({}, res);
  });

  nextTick(() => {
    setApproverRef.value.getListData();
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};
// tab切换
const tabChange = key => {
  activeKey.value = key;
};

// 点击编辑
const editClick = () => {
  if (activeKey.value == '2') {
    setApproverRef.value.getListData();
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
  .orgName {
    margin-right: 5px;
    font-size: 22px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
  }
  .short-name {
    font-size: 18px;
    color: rgba(166, 166, 166, 1);
  }
}
.content {
  width: 100%;
  height: calc(100% - 130px);
  overflow-y: auto;
  overflow-x: hidden;
  .content-item {
    width: 100%;
    height: calc(100% - 100px);
  }
}
</style>
