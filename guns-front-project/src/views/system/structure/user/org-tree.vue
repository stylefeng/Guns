<template>
  <div class="box bgColor box-shadow">
    <div class="left-header" v-if="props.isSetWidth">
      <span class="left-header-title">所属组织</span>
      <span>
        <plus-outlined class="header-add" v-if="isShowEditIcon" @click="addOrg()" />
      </span>
    </div>
    <!-- 搜索框-->
    <div class="search">
      <a-input
        v-model:value="searchText"
        placeholder="请输入机构名称，回车搜索"
        allow-clear
        @pressEnter="getOrgTreeData"
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
            v-model:loadedKeys="treeLoadKeys"
            @select="selectNode"
            :load-data="onLoadData"
            :tree-data="treeData"
            :fieldNames="{ children: 'children', title: 'orgName', key: 'orgId', value: 'orgId' }"
          >
            <!-- 图标 -->
            <template #icon="data">
              <icon-font
                v-if="data.orgType == 1"
                icon-class="icon-tree-gongsi"
                color="#43505e"
                fontSize="24px"
              ></icon-font>
              <icon-font v-if="data.orgType == 2" icon-class="icon-tree-dept" color="#43505e" fontSize="24px"></icon-font>
            </template>
            <!-- 标题 -->
            <template #title="data">
              <!-- 需要显示编辑图标 -->
              <span class="tree-edit" v-if="isShowEditIcon">
                <span class="edit-title" :title="data.orgName"> {{ data.orgName }}</span>
                <span class="edit-icon">
                  <a-space>
                    <icon-font
                      iconClass="icon-opt-tianjia"
                      color="var(--primary-color)"
                      @click.stop="addOrg(data)"
                    ></icon-font>
                    <icon-font
                      iconClass="icon-opt-bianji"
                      color="var(--primary-color)"
                      @click.stop="editOrg(data)"
                    ></icon-font>
                    <icon-font iconClass="icon-opt-shanchu" color="red" @click.stop="deleteOrg(data)"></icon-font>
                  </a-space>
                </span>
              </span>
              <!-- 不需要显示编辑图标 -->
              <span class="tree-title" v-else :title="data.orgName"> {{ data.orgName }} </span>
            </template>
          </a-directory-tree>
        </div>
        <a-empty v-show="treeData && treeData.length == 0" class="empty" />
      </a-spin>
    </div>
  </div>
</template>

<script setup name="OrgTree">
import { OrgApi } from '@/views/system/structure/organization/api/OrgApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import IconFont from '@/components/common/IconFont/index.vue';

const props = defineProps({
  // 是否显示编辑图标
  isShowEditIcon: {
    type: Boolean,
    default: false
  },
  // 是否显示设置宽度
  isSetWidth: {
    type: Boolean,
    default: true
  }
});

const emits = defineEmits(['treeSelect', 'treeData', 'addOrg', 'editOrg', 'deleteOrg']);

// 组织机构名称
const searchText = ref('');
// 加载状态
const apiLoading = ref(false);
// 组织机构树
const treeData = ref([]);
// 当前选中节点
const currentSelectKeys = ref([]);
// 当前展开的节点
const expandedKeys = ref([]);
// 树加载的节点
const treeLoadKeys = ref([]);

onMounted(() => {
  getOrgTreeData();
});

// 搜索组织机构树
const getOrgTreeData = () => {
  apiLoading.value = true;
  OrgApi.tree({ searchText: searchText.value })
    .then(res => {
      expandedKeys.value = res.data.expandOrgIdList;
      const arr = setIsLeaf(res.data.orgTreeList);
      treeData.value = arr;
    })
    .finally(() => (apiLoading.value = false));
};

// 选中节点
const selectNode = (selectedKeys, metadata) => {
  emits('treeSelect', selectedKeys, metadata);
};

// 搜索值变化
const searchTextChange = () => {
  treeLoadKeys.value = [];
  if (!searchText.value) getOrgTreeData();
};

// 新建组织
const addOrg = data => {
  emits('addOrg', data);
};

// 编辑组织机构
const editOrg = data => {
  emits('editOrg', data);
};

// 删除组织机构
const deleteOrg = data => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      apiLoading.value = true;
      OrgApi.delete({ orgId: data.orgId })
        .then(res => {
          message.success(res.message);
          reloadOrgTreeData();
          emits('deleteOrg', data);
        })
        .finally(() => (apiLoading.value = false));
    }
  });
};

/**
 * 懒加载树
 * @param {*} treeNode
 */
const onLoadData = treeNode => {
  // 设置已经加载的节点，为了在更新整个树时候用
  treeLoadKeys.value.push(treeNode.eventKey);
  return new Promise(resolve => {
    // 加载左侧文件夹树
    OrgApi.tree({
      orgParentId: treeNode.dataRef.orgId
    })
      .then(res => {
        const arr = setIsLeaf(res.data.orgTreeList);
        treeNode.dataRef.children = arr;

        // 重新赋值一下tree的数据，要不会出现点击不显示的问题
        treeData.value = [...treeData.value];
      })
      .finally(() => {
        resolve();
      });
  });
};

// 新增编辑删除时刷新树
const reloadOrgTreeData = () => {
  apiLoading.value = true;
  OrgApi.tree({ searchText: searchText.value, indexOrgIdList: expandedKeys.value })
    .then(res => {
      const arr = setIsLeaf(res.data.orgTreeList);
      treeData.value = [...arr];
    })
    .finally(() => (apiLoading.value = false));
};

// 设置是否有子级
const setIsLeaf = arr => {
  if (arr && arr.length > 0) {
    arr.forEach(item => {
      if (!item.haveSubOrgFlag) {
        item.isLeaf = true;
      } else {
        item.isLeaf = false;
      }
      if (item.children && item.children.length > 0) {
        item.children = setIsLeaf(item.children);
      }
    });
  } else {
    arr = [];
  }
  return arr;
};

defineExpose({
  currentSelectKeys,
  reloadOrgTreeData
});
</script>

<style scoped lang="less">
@import url('@/styles/commonTree.less');
:deep(.ant-tree) {
  background-color: #fff !important;
}
.edit-icon {
  width: 60px !important;
}
.tree-edit:hover .edit-title {
  width: calc(100% - 70px) !important;
}
</style>
