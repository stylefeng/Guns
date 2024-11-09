<template>
  <common-drawer
    :width="800"
    :visible="props.visible"
    title="模板详情"
    @close="updateVisible(false)"
    :isShowTab="true"
    :activeKey="activeKey"
    :tabList="tabList"
    @tabChange="tabChange"
  >
    <a-button type="primary" class="border-radius edit-btn" @click="editClick" v-if="activeKey == '1'">编辑</a-button>
    <div class="content">
      <!-- 基本信息 -->
      <div class="content-item" v-show="activeKey == '1'">
        <a-form ref="formRef" :model="form" :label-col="{ span: 6 }">
          <a-row :gutter="16">
            <a-col :span="12" v-for="(item, index) in baseColumn" :key="index">
              <a-form-item :label="item.name">
                <span v-if="item.value == 'templateType'">{{ form[item.value] == 1 ? '系统类型' : '业务类型' }}</span>
                <span v-else>{{ form[item.value] }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 模板配置 -->
      <div class="content-item" v-show="activeKey == '2'">
        <ConfigData ref="ConfigRef" />
      </div>
    </div>

    <!-- 新增编辑弹框 -->
    <AttrAddEdit v-model:visible="showEdit" v-if="showEdit" :data="form" @done="reload" />
  </common-drawer>
</template>

<script setup name="TemplateDetail">
import { ref, onMounted, watch } from 'vue';
import ConfigData from './config-data.vue';
import AttrAddEdit from './template-add-edit.vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);

// 激活tab
const activeKey = ref('1');
// tab栏列表
const tabList = ref([
  {
    key: '1',
    name: '基础信息',
    icon: 'icon-tab-baseinfo'
  },
  {
    key: '2',
    name: '模板配置',
    icon: 'icon-menu-zuzhijiagou'
  }
]);

// 表单数据
const form = ref({});
// ref
const ConfigRef = ref(null);

// 是否显示编辑弹框
const showEdit = ref(false);

// 基本信息展示项配置
const baseColumn = ref([
  {
    name: '模板名称',
    value: 'templateName'
  },
  {
    name: '模板编码',
    value: 'templateCode'
  },
  {
    name: '模板类型',
    value: 'templateType'
  }
]);

onMounted(() => {
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

// 关闭新增编辑
const reload = val => {
  form.value = Object.assign({}, val);
};

// 获取用户详情
const getDetail = () => {
  if (props.data) {
    form.value = Object.assign({}, props.data);
    ConfigRef.value.openConfig(props.data.templateId);
  }
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
  showEdit.value = true;
};
</script>

<style scoped lang="less">
:deep(.ant-drawer-title) {
  color: #262626;
  font-size: 18px;
  font-weight: 500;
}
.edit-btn {
  position: absolute;
  right: 24px;
  top: 87px;
}
.content {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  .content-item {
    width: 100%;
    height: 100%;
  }
}
:deep(.ant-form-item-label > label) {
  color: #60666b;
}
:deep(.ant-form-item) {
  color: #60666b;
}
:deep(.ant-checkbox-wrapper-checked .ant-checkbox-disabled .ant-checkbox-inner) {
  --disabled-bg: var(--primary-color);
  --disabled-color: #fff;
}
:deep(.ant-checkbox-disabled + span) {
  --disabled-color: black;
}
</style>
