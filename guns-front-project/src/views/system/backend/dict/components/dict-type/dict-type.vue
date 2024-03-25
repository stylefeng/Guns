<template>
  <div class="box bgColor box-shadow">
    <div class="left-header">
      <span class="left-header-title">字典类型</span>
      <span>
        <plus-outlined class="header-add" @click="addEdit()" />
      </span>
    </div>
    <!-- 搜索框-->
    <div class="search">
      <a-input
        v-model:value="searchText"
        placeholder="请输入字典类型名称"
        allow-clear
        @pressEnter="getTreeData"
        @change="searchTextChange"
      >
        <template #prefix>
          <icon-font iconClass="icon-opt-search"></icon-font>
        </template>
      </a-input>
    </div>
    <div class="tree-content">
      <a-spin tip="Loading..." :spinning="apiLoading" :delay="100">
        <div v-show="treeData && treeData.length > 0" class="left-tree">
          <a-directory-tree
            :show-icon="true"
            v-model:selectedKeys="currentSelectKeys"
            v-model:expandedKeys="expandedKeys"
            @select="selectNode"
            :tree-data="treeData"
            :fieldNames="{ children: 'children', title: 'dictTypeName', key: 'dictTypeId', value: 'dictTypeId' }"
          >
            <!-- 图标 -->
            <template #icon>
              <icon-font iconClass="icon-tree-wenjianjia" color="#43505e" fontSize="24px"></icon-font>
            </template>
            <!-- 标题 -->
            <template #title="data">
              <!-- 需要显示编辑图标 -->
              <span class="tree-edit">
                <span class="edit-title" :title="data.dictTypeName"> {{ data.dictTypeName }}</span>
                <span class="edit-icon">
                  <a-space>
                    <icon-font
                      iconClass="icon-opt-bianji"
                      color="var(--primary-color)"
                      @click.stop="addEdit(data)"
                    ></icon-font>
                    <icon-font iconClass="icon-opt-shanchu" color="red" @click.stop="deleteClick(data)"></icon-font>
                  </a-space>
                </span>
              </span>
            </template>
          </a-directory-tree>
        </div>
        <a-empty v-show="treeData && treeData.length == 0" class="empty" />
      </a-spin>
    </div>

    <!-- 字典分类新增编辑弹框 -->
    <DictTypeAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="getTreeData" />
  </div>
</template>

<script setup name="DictType">
import { SysDictTypeApi } from '../../api/SysDictTypeApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import DictTypeAddEdit from './dict-type-add-edit.vue';

const emits = defineEmits(['treeSelect', 'defaultSelect']);

// 搜索名称
const searchText = ref('');
// 加载状态
const apiLoading = ref(false);
// 配置分类树
const treeData = ref([]);
// 当前选中节点
const currentSelectKeys = ref([]);
// 当前展开的节点
const expandedKeys = ref([]);
// 是否显示分类新增编辑弹框
const showEdit = ref(false);
// 当前行数据
const current = ref(null);

onMounted(() => {
  getTreeData(true);
});

// 获取分类列表
const getTreeData = (flag = false) => {
  apiLoading.value = true;
  SysDictTypeApi.list({ searchText: searchText.value })
    .then(res => {
      treeData.value = res;
      if (flag && res && res.length > 0) {
        currentSelectKeys.value = [res[0].dictTypeId];
        emits('defaultSelect', res[0]);
      }
    })
    .finally(() => (apiLoading.value = false));
};

// 选中节点
const selectNode = (selectedKeys, metadata) => {
  emits('treeSelect', selectedKeys, metadata);
};

// 搜索值变化
const searchTextChange = () => {
  if (!searchText.value) getTreeData();
};

// 新建编辑
const addEdit = data => {
  current.value = data;
  showEdit.value = true;
};

// 删除
const deleteClick = data => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      apiLoading.value = true;
      SysDictTypeApi.delete({ dictTypeId: data.dictTypeId })
        .then(res => {
          message.success(res.message);
          getTreeData();
        })
        .finally(() => (apiLoading.value = false));
    }
  });
};

defineExpose({
  currentSelectKeys,
  getTreeData
});
</script>

<style scoped lang="less">
.tree-content {
  height: calc(100% - 110px) !important;
}
:deep(.ant-tree-switcher) {
  display: none;
}
:deep(.ant-tree) {
  background-color: #fff !important;
}
@import url('@/styles/commonTree.less');
</style>
