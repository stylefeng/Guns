<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row>
      <a-tabs v-model:activeKey="activeKey" animated class="right-tab">
        <a-tab-pane key="1" tab="通知内容"></a-tab-pane>
        <a-tab-pane key="2" tab="通知范围"></a-tab-pane>
      </a-tabs>
    </a-row>
    <!-- 通知内容 -->
    <a-row :gutter="20" v-show="activeKey == '1'">
      <a-col :span="12">
        <a-form-item label="通知标题:" name="noticeTitle">
          <a-input v-model:value="form.noticeTitle" allow-clear placeholder="请输入通知标题" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="优先级" name="priorityLevel">
          <a-radio-group v-model:value="form.priorityLevel" name="sex">
            <a-radio value="high">高</a-radio>
            <a-radio value="middle">中</a-radio>
            <a-radio value="low">低</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="开始日期:" name="noticeBeginTime">
          <a-date-picker
            v-model:value="form.noticeBeginTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="结束日期:" name="noticeEndTime">
          <a-date-picker
            v-model:value="form.noticeEndTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="通知内容" name="noticeContent">
          <tinymce v-model:value="form.noticeContent" />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 通知范围 -->
    <a-row :gutter="20" v-show="activeKey == '2'">
      <a-tabs v-model:activeKey="noticeActiveKey" animated class="right-tab">
        <a-tab-pane key="1" tab="用户"></a-tab-pane>
        <a-tab-pane key="2" tab="部门"></a-tab-pane>
      </a-tabs>
      <div class="notice-button">
        <a-space>
          <a-button class="border-radius" type="primary" @click="addClick">+ 新增</a-button>
          <a-button class="border-radius" danger @click="clear">清空</a-button>
        </a-space>
      </div>
      <a-table
        :dataSource="props.form.noticeUserScope.pointUserList"
        v-show="noticeActiveKey == '1'"
        :columns="columns"
        :pagination="false"
        rowKey="id"
        bordered
        size="small"
        :scroll="{ y: '400' }"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex == 'action'">
            <icon-font iconClass="icon-opt-shanchu" font-size="24px" title="删除" color="#60666b" @click="removeUser(index)"></icon-font>
          </template>
        </template>
      </a-table>
      <a-table
        :dataSource="props.form.noticeUserScope.pointOrgList"
        v-show="noticeActiveKey == '2'"
        :columns="orgColumns"
        :pagination="false"
        rowKey="id"
        bordered
        size="small"
        :scroll="{ y: '400' }"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex == 'action'">
            <icon-font iconClass="icon-opt-shanchu" font-size="24px" title="删除" color="#60666b" @click="removeOrg(index)"></icon-font>
          </template>
        </template>
      </a-table>
    </a-row>

    <!-- 选择组件 -->
    <Selection
      v-model:visible="showSelect"
      v-if="showSelect"
      :title="title"
      :data="selectData"
      :isRadio="false"
      :showTab="showTab"
      @done="closeSelect"
    />
  </a-form>
</template>

<script setup name="NoticeForm">
import { reactive, ref } from 'vue';
import Tinymce from '@/components/TinymceEditor/index.vue';

const props = defineProps({
  // 表单数据
  form: Object
});

// 验证规则
const rules = reactive({
  noticeTitle: [{ required: true, message: '请输入通知标题', type: 'string', trigger: 'blur' }],
  priorityLevel: [{ required: true, message: '请选择优先级', type: 'string', trigger: 'blur' }],
  noticeContent: [{ required: true, message: '请输入通知内容', type: 'string', trigger: 'blur' }]
});

// tab选中
const activeKey = ref('1');

// 通知范围tab选中
const noticeActiveKey = ref('1');

// 用户表格配置
const columns = ref([
  {
    title: '用户名称',
    dataIndex: 'name'
  },
  {
    title: '用户id',
    dataIndex: 'id'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 50,
    align: 'center'
  }
]);
// 部门表格配置
const orgColumns = ref([
  {
    title: '部门名称',
    dataIndex: 'name'
  },
  {
    title: '部门id',
    dataIndex: 'id'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 50,
    align: 'center'
  }
]);

// 是否显示选择弹框
const showSelect = ref(false);
// 标题
const title = ref('');
// 总数据
const selectData = ref({
  selectOrgList: [],
  selectUserList: []
});
// 选择组件显示tab
const showTab = ref(['user']);
//删除用户
const removeUser = index => {
  props.form.noticeUserScope.pointUserList.splice(index, 1);
};

//删除部门
const removeOrg = index => {
  props.form.noticeUserScope.pointOrgList.splice(index, 1);
};

// 新增
const addClick = () => {
  if (noticeActiveKey.value == '1') {
    title.value = '选择用户';
    showTab.value = ['user'];
    selectData.value.selectUserList = props.form.noticeUserScope.pointUserList.map(item => {
      return { bizId: item.id, name: item.name };
    });
  } else {
    title.value = '选择部门';
    showTab.value = ['dept'];
    selectData.value.selectOrgList = props.form.noticeUserScope.pointOrgList.map(item => {
      return { bizId: item.id, name: item.name };
    });
  }
  showSelect.value = true;
};

// 关闭选择组件
const closeSelect = data => {
  if (noticeActiveKey.value == '1') {
    props.form.noticeUserScope.pointUserList = data.selectUserList.map(item => {
      return { id: item.bizId, name: item.name };
    });
  } else {
    props.form.noticeUserScope.pointOrgList = data.selectOrgList.map(item => {
      return { id: item.bizId, name: item.name };
    });
  }
};

// 清空
const clear = () => {
  if (noticeActiveKey.value == '1') {
    props.form.noticeUserScope.pointUserList = [];
  } else {
    props.form.noticeUserScope.pointOrgList = [];
  }
};
</script>

<style scoped>
.notice-table {
  width: 100%;
  height: 400px;
}
.notice-button {
  width: 100%;
  margin-bottom: 10px;
}
</style>
