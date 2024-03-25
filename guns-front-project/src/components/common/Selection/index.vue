<template>
  <a-modal
    :width="props.width"
    :visible="props.visible"
    :confirm-loading="loading"
    :body-style="{ paddingBottom: '8px', height: 'calc(100vh - 400px)', overflowY: 'auto', minHeight: '700px' }"
    @ok="save"
    :title="title"
    @cancel="updateVisible(false)"
    :footer="footer"
    :maskClosable="false"
    v-if="visible"
  >
    <div class="box">
      <!-- 已选 -->
      <div class="box-header">已选：{{ userGroupDetailName }}</div>
      <!-- tab栏 -->
      <div class="box-tab" v-if="tabList.length >= 2">
        <a-tabs v-model:activeKey="activeKey" @change="tabChange">
          <a-tab-pane :key="tabItem.key" :tab="tabItem.name" v-for="tabItem in tabList" />
        </a-tabs>
      </div>
      <div class="box-content" ref="contentRef">
        <!-- 公司选择 -->
        <select-company
          ref="companyRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'company'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('company') !== -1"
        />
        <!-- 用户选择 -->
        <select-user
          ref="userRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'user'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('user') !== -1"
        />
        <!-- 部门选择 -->
        <select-dept
          ref="deptRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'dept'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('dept') !== -1"
        />
        <!-- 角色选择 -->
        <select-role
          ref="roleRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'role'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('role') !== -1"
        />
        <!-- 职位选择 -->
        <select-position
          ref="positionRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'position'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('position') !== -1"
        />
        <!-- 字典选择 -->
        <select-dicts
          ref="dictRef"
          :isShowTab="isShowTab"
          :isRadio="props.isRadio"
          v-show="activeKey === 'dict'"
          @selectedChange="selectedChange"
          v-if="showTab.length === 0 || showTab.indexOf('dict') !== -1"
        />
      </div>
    </div>
  </a-modal>
</template>

<script setup name="Selection">
import { message } from 'ant-design-vue/es';
import { onMounted, ref, watch, nextTick } from 'vue';

const props = defineProps({
  // 宽度
  width: {
    type: String,
    default: '60%'
  },
  // 弹框状态
  visible: Boolean,
  // 弹框标题
  title: {
    type: String,
    default: '标题'
  },
  // 左侧组织机构树限制
  orgIdLimit: {
    type: Array,
    default: () => []
  },
  // 需要显示的tab列表，有 company; user; dept; approver; role; position; relation; 默认是全部显示
  showTab: {
    type: Array,
    default: () => []
  },
  // 需要回显的已选数据-与输出数据格式保持一致
  data: {
    type: Object,
    default: () => {}
  },
  // 是否单选：默认true单选；设置false为多选
  isRadio: {
    type: Boolean,
    default: true
  },
  //底部内容取消显示
  footer: {
    type: String,
    default: undefined
  },
  // 最大限制
  max: {
    type: Number,
    default: 100000
  }
});

const emits = defineEmits(['update:visible', 'done']);

// 弹框加载状态
const loading = ref(false);
//tab默认选中
const activeKey = ref('user');
//tab栏列表
const tabList = ref([]);
// 所有的tab列表
const allTablist = ref([
  {
    key: 'company',
    name: '公司'
  },
  {
    key: 'user',
    name: '用户'
  },
  {
    key: 'dept',
    name: '部门'
  },
  {
    key: 'approver',
    name: '部门审批人'
  },
  {
    key: 'role',
    name: '角色'
  },
  {
    key: 'position',
    name: '职位'
  },
  {
    key: 'relation',
    name: '关系'
  },
  {
    key: 'dict',
    name: '字典'
  }
]);
// 已选组合名称
const userGroupDetailName = ref('');
// 是否显示tab
const isShowTab = ref(false);

// ref
const userRef = ref(null);
const deptRef = ref(null);
const approverRef = ref(null);
const roleRef = ref(null);
const positionRef = ref(null);
const relationRef = ref(null);
const contentRef = ref(null);
const companyRef = ref(null);
const dictRef = ref(null);

onMounted(() => {
  getTabList();
  getDetail();
});

// 获取当前需要展示的tab列表
const getTabList = () => {
  if (props.showTab) {
    if (props.showTab.length == 0) {
      tabList.value = allTablist.value;
    } else if (props.showTab.length > 0) {
      let newTabList = [];
      allTablist.value.forEach(tabItem => {
        if (props.showTab.find(item => item == tabItem.key)) {
          newTabList.push(tabItem);
        }
      });
      tabList.value = newTabList;
    }
    setHeight();
    activeKey.value = tabList.value[0].key;
  }
};

// 获取详情列表
const getDetail = () => {
  if (JSON.stringify(props.data) != '{}') {
    setData(props.data);
  }
};

// 设置初始化数据
const setData = data => {
  companyRef.value ? (companyRef.value.companyList = data?.selectCompanyList ? data.selectCompanyList : []) : '';
  userRef.value ? (userRef.value.userList = data?.selectUserList ? data.selectUserList : []) : '';
  deptRef.value ? (deptRef.value.deptList = data?.selectOrgList ? data.selectOrgList : []) : '';
  approverRef.value ? (approverRef.value.approverList = data?.selectOrgApproverTypeList ? data.selectOrgApproverTypeList : []) : '';
  roleRef.value ? (roleRef.value.roleList = data?.selectRoleList ? data.selectRoleList : []) : '';
  positionRef.value ? (positionRef.value.positionList = data?.selectPositionList ? data.selectPositionList : []) : '';
  relationRef.value ? (relationRef.value.relationList = data?.selectRelationList ? data.selectRelationList : []) : '';
  dictRef.value ? (dictRef.value.dictList = data?.selectDictList ? data.selectDictList : []) : '';
  selectedChange();
};

// 已选改变，设置已选名称
const selectedChange = () => {
  let companyName = companyRef.value ? getName(companyRef.value.companyList, 'company') : '';
  let userName = userRef.value ? getName(userRef.value.userList, 'user') : '';
  let deptName = deptRef.value ? getName(deptRef.value.deptList, 'dept') : '';
  let approverName = approverRef.value ? getName(approverRef.value.approverList, 'approver') : '';
  let roleName = roleRef.value ? getName(roleRef.value.roleList, 'role') : '';
  let positionName = positionRef.value ? getName(positionRef.value.positionList, 'position') : '';
  let relationName = relationRef.value ? getName(relationRef.value.relationList, 'relation') : '';
  let dictName = dictRef.value ? getName(dictRef.value.dictList, 'dict') : '';
  userGroupDetailName.value = userName + deptName + approverName + roleName + positionName + relationName + companyName + dictName;
};

// 获取名字
const getName = (list, flag) => {
  let name = '';
  if (list && list.length > 0) {
    list.forEach(item => {
      if (item.subValueName && (flag == 'approver' || flag == 'position' || flag == 'user' || flag == 'dept')) {
        name += item.subValueName + '#' + item.name + ';';
      } else {
        name += item.name + ';';
      }
    });
    let addName = '';
    if (flag == 'user') {
      addName = '【用户】';
    } else if (flag == 'dept') {
      addName = '【部门】';
    } else if (flag == 'approver') {
      addName = '【部门审批人】';
    } else if (flag == 'role') {
      addName = '【角色】';
    } else if (flag == 'position') {
      addName = '【职位】';
    } else if (flag == 'relation') {
      addName = '【关系】';
    } else if (flag == 'company') {
      addName = '【公司】';
    } else if (flag == 'dict') {
      addName = '【字典】';
    }

    name = addName + name;
  }
  return name;
};

// 关闭弹框
const updateVisible = value => {
  emits('update:visible', value);
};

// 保存
const save = () => {
  let params = {
    selectCompanyList: companyRef.value ? companyRef.value.companyList : [], //选中的公司列表
    selectUserList: userRef.value ? userRef.value.userList : [], //选中的用户列表
    selectOrgList: deptRef.value ? deptRef.value.deptList : [], //选中的组织机构列表
    selectOrgApproverTypeList: approverRef.value ? approverRef.value.approverList : [], //选中的部门审批人类型列表
    selectRoleList: roleRef.value ? roleRef.value.roleList : [], //选中的角色列表
    selectPositionList: positionRef.value ? positionRef.value.positionList : [], //选中的职位列表
    selectRelationList: relationRef.value ? relationRef.value.relationList : [], //选中的关系列表
    selectDictList: dictRef.value ? dictRef.value.dictList : [], //选中的关系列表
    userGroupDetailName: userGroupDetailName.value //组合名称
  };

  if (!props.isRadio) {
    let flag = true;
    if ((tabList.value[0] = 'user')) {
      flag = maxSet(params, 'selectUserList');
    } else if ((tabList.value[0] = 'dept')) {
      flag = maxSet(params, 'selectOrgList');
    } else if ((tabList.value[0] = 'role')) {
      flag = maxSet(params, 'selectRoleList');
    } else if ((tabList.value[0] = 'position')) {
      flag = maxSet(params, 'selectPositionList');
    } else if ((tabList.value[0] = 'dict')) {
      flag = maxSet(params, 'selectDictList');
    } else if ((tabList.value[0] = 'company')) {
      flag = maxSet(params, 'selectCompanyList');
    } else if ((tabList.value[0] = 'relation')) {
      flag = maxSet(params, 'selectRelationList');
    } else if ((tabList.value[0] = 'approver')) {
      flag = maxSet(params, 'selectOrgApproverTypeList');
    }
    if (!flag) return;
  }
  loading.value = true;

  loading.value = false;
  // 关闭弹框
  updateVisible(false);
  emits('done', params);
};

// 最多限制
const maxSet = (params, name) => {
  if (params[name].length > props.max) {
    message.warning('最多选' + props.max + '条');
    return false;
  }
  return true;
};

// 设置高度
const setHeight = () => {
  nextTick(() => {
    if (contentRef.value) {
      if (tabList.value.length >= 2) {
        isShowTab.value = true;
        contentRef.value.style.height = 'calc(100% - 121px)';
      } else {
        contentRef.value.style.height = 'calc(100% - 60px)';
        isShowTab.value = false;
      }
    }
  });
};

// tab切换
const tabChange = key => {
  activeKey.value = key;
};

watch(
  () => props.showTab,
  () => {
    getTabList();
  }
);
watch(
  () => props.data,
  () => {
    nextTick(() => {
      setData(props.data);
    });
  },
  { deep: true }
);
watch(
  () => props.visible,
  () => {
    props.visible ? (userGroupDetailName.value = '') : '';
  }
);
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;

  .box-header {
    border: 1px solid #e8e8e8;
    color: rgba(0, 0, 0, 0.65);
    padding: 12px;
    height: 60px;
    overflow-y: auto;
    margin-bottom: 10px;
  }

  .box-tab :deep(.ant-tabs-tab) {
    padding: 12px 16px !important;
  }

  .box-content {
    width: 100%;
    height: calc(100% - 121px);
  }
}
</style>
