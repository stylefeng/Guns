<template>
  <a-modal
    :width="500"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    style="top: 40px"
    title="修改字典上下结构"
    :body-style="{ paddingBottom: '8px', height: '600px', overflowY: 'hidden' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <div class="box-shadow menu-item">
      <div class="left-header">
        <icon-font iconClass="icon-tree-wenjianjia" color="var(--primary-color)" font-size="44px" style="margin: 0 10px"></icon-font>
        <div class="app-item-right">
          <div class="app-item-name">{{ dictTypeName }}</div>
        </div>
      </div>
      <div class="menu-tree">
        <a-directory-tree
          draggable
          @drop="onDrop"
          :show-icon="true"
          v-if="treeData && treeData.length > 0"
          :tree-data="treeData"
          :fieldNames="{ children: 'children', title: 'dictName', key: 'dictId', value: 'dictId' }"
        >
          <!-- 图标 -->
          <template #icon>
            <icon-font iconClass="icon-tab-jichuxinxi" color="#43505e" font-size="24px"></icon-font>
          </template>
          <!-- 标题 -->
          <template #title="data">
            <!-- 需要显示编辑图标 -->
            <span class="tree-edit">
              <span class="edit-title" :title="data.dictName"> {{ data.dictName }}</span>
            </span>
          </template>
        </a-directory-tree>
        <a-empty v-else class="empty" />
      </div>
    </div>
  </a-modal>
</template>

<script setup name="UpdateStructure">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { SysDictApi } from '../api/SysDictApi';

const props = defineProps({
  visible: Boolean,
  // 字典类型Id
  dictTypeId: String,
  //字典类型名称
  dictTypeName: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 字典树列表
const treeData = ref([]);

onMounted(() => {
  if (props.dictTypeId) {
    getTreeList();
  }
});
// 获取字典树列表
const getTreeList = () => {
  SysDictApi.tree({ dictTypeId: props.dictTypeId }).then(res => {
    treeData.value = res;
  });
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 点击保存
const save = () => {
  if (treeData.value && treeData.value.length > 0) {
    loading.value = true;
    SysDictApi.updateDictTree({ totalDictStructure: treeData.value })
      .then(res => {
        message.success(res.message);
        emits('done');
        updateVisible(false);
      })
      .finally(() => (loading.value = false));
  }
};

// 拖拽
const onDrop = info => {
  const dropKey = info.node.eventKey;
  const dragKey = info.dragNode.eventKey;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
  const loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      if (item.dictId === key) {
        return callback(item, index, arr);
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };
  const data = [...treeData.value];

  // Find dragObject
  let dragObj = {};
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  // 跨级拖拽
  if (!info.dropToGap) {
    dragObj.dictParentId = info.node.dictId;
    dragObj.nodeParentId = info.node.dictId;

    // Drop on the content
    loop(data, dropKey, item => {
      item.children = item.children || [];
      // where to insert 示例添加到尾部，可以是随意位置
      item.children.push(dragObj);
    });
  } else if (
    (info.node.children || []).length > 0 && // Has children
    info.node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    dragObj.dictParentId = info.node.dictId;
    dragObj.nodeParentId = info.node.dictId;

    loop(data, dropKey, item => {
      item.children = item.children || [];
      // where to insert 示例添加到尾部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else {
    dragObj.dictParentId = info.node.nodeParentId;
    dragObj.nodeParentId = info.node.nodeParentId;

    let ar = [];
    let i = 0;
    loop(data, dropKey, (item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }

  treeData.value = [...data];
};
</script>

<style scoped lang="less">
.menu-item {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .left-header {
    padding: 10px;
    height: 85px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ccc;
    .app-item-right {
      flex: 1;
      width: calc(100% - 75px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .app-item-name {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
    }
  }

  .menu-tree {
    width: 100%;
    padding: 10px;
    height: calc(100% - 101px);
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
}
:deep(.ant-tree-switcher) {
  display: none;
}

@import url('@/styles/commonTree.less');

.left-header {
  margin-bottom: 0;
}
:deep(.ant-tree) {
  background-color: #fff;
}
</style>
