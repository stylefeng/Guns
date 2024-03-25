<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        <span>常用功能</span>
      </div>
      <div class="user-info-card-header-icon" @click="showVisible = true">
        <iconfont font-size="34px" color="#2a82e4" icon-class="icon-opt-shezhi" font-weight="bold"> </iconfont>
      </div>
    </div>

    <div class="card-body">
      <a-spin :spinning="functionListLoading">
        <div class="app-list">
          <div
            style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"
            v-if="functionList.length === 0"
          >
            <a-empty />
          </div>
          <div class="app-list-item" v-else v-for="(item, index) in functionList" :key="index" @click="appClick(item)">
            <div class="app-item-icon">
              <iconfont font-size="36px" color="#2a82e4" :icon-class="item.menuIcon"> </iconfont>
            </div>
            <div class="app-item-title">
              <span>{{ item.menuName }}</span>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!--弹窗 选择常用功能-->
    <a-modal
      width="50%"
      v-model:visible="showVisible"
      title="选择常用功能"
      @cancel="updateShowVisible(false)"
      :confirm-loading="selectCommonFunctionsBtnLoading"
      @ok="selectCommonFunctionsOk"
    >
      <div class="common-function">
        <div class="common-function-header">
          <a-radio-group
            class="common-function-header-left"
            v-model:value="tabClickAppId"
            :style="{ marginBottom: '8px' }"
            @change="tabAppIdChange"
          >
            <a-radio-button v-for="item in userAppInfoList" :key="item.appId" :value="item.appId">{{ item.appName }} </a-radio-button>
          </a-radio-group>

          <a-input v-model:value="keyword" class="common-function-header-right" allow-clear placeholder="菜单名称（回车搜索）">
            <template #suffix>
              <a-tooltip title="Extra information">
                <icon-font iconClass="icon-opt-search"></icon-font>
              </a-tooltip>
            </template>
          </a-input>
        </div>

        <div class="common-function-list">
          <a-tree
            @expand="onExpand"
            :expanded-keys="expandedKeys[tabClickAppId]"
            :auto-expand-parent="autoExpandParent"
            v-model:checkedKeys="checkedKeys[tabClickAppId]"
            checkable
            :field-names="fieldNames"
            :tree-data="treeData"
          >
            <template #title="{ title }">
              {{ title }}
            </template>
          </a-tree>
        </div>

        <div class="common-function-check-list">
          已选：
          <a-tag v-for="item in selectKeyList" :key="item.menuId" color="processing" closable @close="removeSelect(item)">
            {{ item.title }}
          </a-tag>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup name="CommonFunctionsComponents">
import { HomeApi } from '@/views/index/api/HomeApi';
import { getUserInfo } from '@/layout/api/LayoutApi';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Iconfont from '@/components/common/IconFont/index.vue';
import { deepClone } from '@/utils/common/util';
import { message } from 'ant-design-vue';

// router
const router = useRouter();

// 用户常用功能列表
const functionList = ref([]);
// 列表加载状态
const functionListLoading = ref(false);

// 是否显示弹窗
const showVisible = ref(false);

// 弹窗确定按钮加载状态
const selectCommonFunctionsBtnLoading = ref(false);

// 用户应用列表
const userAppInfoList = ref([]);

// 选中的AppId
const tabClickAppId = ref('');

// 搜索关键字
const keyword = ref('');

// 选中的key
const checkedKeys = ref({});

// 展开的key
const expandedKeys = ref({});

const autoExpandParent = ref(true);

// 已选list
const selectKeyList = ref([]);

// 应用树列表
const treeData = ref([]);

// tree field
const fieldNames = {
  children: 'children',
  label: 'title',
  key: 'menuId',
  value: 'menuId'
};

/**
 * 保存用户常用功能
 */
const selectCommonFunctionsOk = () => {
  selectCommonFunctionsBtnLoading.value = true;
  let menuIdList = deepClone(selectKeyList.value).map(item => item.menuId);
  HomeApi.updateUserAppList({ menuIdList })
    .then(res => {
      if (res.success) {
        message.success(res.message);
        showVisible.value = false;
        getUserAppListData();
      }
    })
    .finally(() => {
      selectCommonFunctionsBtnLoading.value = false;
    });
};

// 更新是否显示弹窗
const updateShowVisible = val => {
  showVisible.value = val;
};

/**
 * 点击事件
 * @param item
 */
const appClick = item => {
  const { href } = router.resolve({ path: item.menuRouter });
  window.open(href, '_blank');
};

/**
 * tabAppIdChange
 */
const tabAppIdChange = () => {
  let filter = userAppInfoList.value.filter(item => item.appId === tabClickAppId.value);
  if (filter.length === 1) {
    treeData.value = formatTreeList(filter[0].menuList);
  }
};

/**
 * formatTreeList
 * @param list
 * @returns {*}
 */
const formatTreeList = list => {
  list.map(item => {
    item.key = item.menuId;

    if (item.children) {
      item.children = formatTreeList(item.children);
    }
    return item;
  });
  return list;
};

// 查询某个key值在树形数据中所在的父级节点
const findParentNode = (tree, targetKey) => {
  for (const node of tree) {
    if (node.menuId === targetKey) {
      return node;
    }
    if (node.children) {
      const foundNode = findParentNode(node.children, targetKey);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};

/**
 * 移除选中
 * @param item
 */
const removeSelect = item => {
  let _checkedKeys = deepClone(checkedKeys.value);
  let tmp = {};
  Object.keys(_checkedKeys).forEach(app => {
    const _list = _checkedKeys[app];
    let findIndex = _list.findIndex(row => row === item.menuId);
    if (findIndex > -1) {
      _list.splice(findIndex, 1);
    }
    tmp[app] = _list;
  });
  checkedKeys.value = tmp;
};

/**
 * 获取用户选中的常用应用
 * @returns {Promise<void>}
 */
const getUserAppListData = async () => {
  functionListLoading.value = true;
  let res = await HomeApi.getUserAppList().finally(() => {
    functionListLoading.value = false;
  });
  functionList.value = res;
};

/**
 * 获取节点中含有value的所有key集合
 * @param value
 * @param tree
 * @param keyList
 * @returns {*}
 */
const getkeyList = (value, tree, keyList) => {
  //遍历所有同一级的树
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];
    //如果该节点存在value值则push
    if (node.title.indexOf(value) > -1) {
      keyList.push(node.key);
    }
    //如果拥有孩子继续遍历
    if (node.children) {
      getkeyList(value, node.children, keyList);
    }
  }
  //因为是引用类型，所有每次递归操作的都是同一个数组
  return keyList;
};

onMounted(async () => {
  // 获取用户选中的常用应用
  getUserAppListData();

  // 获取常用应用列表
  let result = await getUserInfo();
  userAppInfoList.value = result.userAppInfoList;
  // 赋值选中的appId 取数组第一个
  if (userAppInfoList.value.length > 0) {
    tabClickAppId.value = userAppInfoList.value[0].appId;
    // 赋值Tree数据
    let filter = userAppInfoList.value.filter(item => item.appId === tabClickAppId.value);
    if (filter.length === 1) {
      treeData.value = formatTreeList(filter[0].menuList);
    }
  }

  // 赋值选中的常用功能
  userAppInfoList.value.forEach(app => {
    let result = [];
    functionList.value.forEach(item => {
      let node = findParentNode(app.menuList, item.menuId);
      if (node) {
        result.push(node.menuId);
      }
    });
    checkedKeys.value[app.appId] = result;
  });

  selectKeyList.value = deepClone(functionList.value);
});

watch(
  () => checkedKeys.value,
  value => {
    let list = [];

    userAppInfoList.value.forEach(app => {
      let _list = value[app.appId];
      _list.forEach(key => {
        let node = findParentNode(app.menuList, key);
        if (node) {
          list.push(node);
        }
      });
    });
    selectKeyList.value = list;
  },
  { deep: true }
);

const onExpand = _expandedKeys => {
  expandedKeys.value[tabClickAppId.value] = _expandedKeys;
  autoExpandParent.value = false;
};

watch(
  () => keyword.value,
  value => {
    expandedKeys.value[tabClickAppId.value] = getkeyList(value, treeData.value, []);
    keyword.value = value;
    autoExpandParent.value = true;
  }
);
</script>

<style scoped lang="less">
.card {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 6px hsla(0, 0%, 80%, 0.5);
  border-radius: 4px;
  padding: 10px;
}

.card-header {
  width: 100%;
  height: 50px;
  border-bottom: 1px #999999 solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header-title {
  font-size: 18px;
  font-weight: 500;
}

.card-body {
  width: 100%;
  height: calc(100% - 50px);
}

.app-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-list-item {
  cursor: pointer;
  width: calc((100% - 80px) / 10);
  height: calc(100% / 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-item-title {
  font-size: 14px;
  color: #535353;
}

.common-function {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.common-function-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.common-function-header-left {
  :deep(.ant-radio-button-wrapper) {
    height: 40px;
    line-height: 40px;
  }
}

.common-function-header-right {
  width: 280px;
  line-height: 40px;
  height: 40px;
}

.common-function-list {
  width: 100%;
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px #d9d9d9 solid;
  margin-top: 10px;

  :deep(.ant-tree) {
    margin-top: 10px;
  }
}

.common-function-check-list {
  margin-top: 10px;
  font-size: 16px;
  color: #505050;
}
</style>
