<template>
  <div class="box bgColor box-shadow">
    <!-- <div class="left-header">
      <span class="left-header-title">所属组织</span>
    </div> -->
    <!-- 搜索框-->
    <div class="search">
      <a-input v-model:value="searchText" placeholder="请输入机构名称" allow-clear @pressEnter="getOrgTreeData" @change="searchTextChange">
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
              <icon-font v-if="data.orgType == 1" icon-class="icon-tree-gongsi" color="#43505e" fontSize="24px"></icon-font>
              <icon-font v-if="data.orgType == 2" icon-class="icon-tree-dept" color="#43505e" fontSize="24px"></icon-font>
            </template>
            <!-- 标题 -->
            <template #title="data">
              <span class="tree-title"> {{ data.orgName }} </span>
            </template>
          </a-directory-tree>
        </div>
        <a-empty v-show="treeData && treeData.length == 0" class="empty" />
      </a-spin>
    </div>
  </div>
</template>

<script setup name="SelectionOrgTree">
import { ref, onMounted } from 'vue';
import { OrgApi } from '@/views/system/structure/organization/api/OrgApi';
import IconFont from '@/components/common/IconFont/index.vue';

const emits = defineEmits(['treeSelect', 'treeData']);

const props = defineProps({
  // 是否只查询公司
  companySearchFlag: {
    type: Boolean,
    default: false
  }
});

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
// 已经加载的节点
const treeLoadKeys = ref([]);

onMounted(() => {
  getOrgTreeData();
});

// 搜索组织机构树
const getOrgTreeData = () => {
  treeLoadKeys.value = [];
  apiLoading.value = true;
  OrgApi.tree({ searchText: searchText.value, companySearchFlag: props.companySearchFlag })
    .then(res => {
      expandedKeys.value = res.data.expandOrgIdList;
      const arr = setIsLeaf(res.data.orgTreeList);
      treeData.value = arr;
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
  }
  return arr;
};

// 选中节点
const selectNode = (selectedKeys, metadata) => {
  emits('treeSelect', selectedKeys, metadata);
};

// 搜索值变化
const searchTextChange = () => {
  if (!searchText.value) getOrgTreeData();
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
      orgParentId: treeNode.dataRef.orgId,
      companySearchFlag: props.companySearchFlag
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

defineExpose({
  currentSelectKeys
});
</script>

<style scoped lang="less">
.box {
  margin-top: 1px;
  height: calc(100% - 12px) !important;
  margin-left: 1px;
}
.tree-content {
  padding: 0 12px;
}
.search {
  margin-top: 10px;
  padding: 0 12px;
}
:deep(.ant-tree) {
  background-color: #fff !important;
}

@import url('@/styles/commonTree.less');
</style>
