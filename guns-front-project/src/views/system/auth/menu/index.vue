<template>
  <div class="guns-layout">
    <div class="guns-layout-content">
      <div class="guns-layout">
        <div class="guns-layout-content-application">
          <div class="content-mian" style="overflow: hidden;">
            <div class="content-mian-header">
              <div class="header-content">
                <div class="header-content-left">
                  <a-space :size="16">
                    <a-input
                      v-model:value="where.searchText"
                      placeholder="菜单名称、菜单编码（回车搜索）"
                      @pressEnter="getAppMenuGroupDetail"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button type="primary" class="border-radius" @click="openAddEdit('', '', 'add')"><plus-outlined />新建菜单</a-button>
                  </a-space>
                </div>
              </div>
            </div>
            <div class="content-mian-body">
              <div class="table-content" id="content">
                <a-spin tip="Loading..." :spinning="apiLoading" :delay="100">
                  <div id="wrap" :style="{ height: screenHeight + 'px' }">
                    <ul id="pageUl" type="circle">
                      <li
                        id="pageUlLi1"
                        class="pageUlLi"
                        :class="{ active: curIndex == newItem.index + 1 }"
                        v-for="newItem in newAppMenuList"
                        :key="newItem.index"
                      >
                        &nbsp;
                      </li>
                    </ul>
                    <div id="main" :style="{ top: nowTop + 'px', height: screenHeight + 'px' }">
                      <div id="page1" class="page" v-for="newItem in newAppMenuList" :key="newItem.index">
                        <div class="box-shadow menu-item" v-for="appItem in newItem.children" :key="appItem.appId">
                          <div class="left-header">
                            <img :src="appItem.appIconWrapper" alt="" class="img" v-if="appItem.appIconWrapper" />
                            <img src="@/assets/avatar.png" alt="" class="img" v-else />
                            <div class="app-item-right">
                              <div class="app-item-name">{{ appItem.appName }}</div>
                              <div class="app-item-remark">{{ appItem.remark }}</div>
                            </div>
                            <div class="masks">
                              <a-button type="primary" class="add" @click="openAddEdit(appItem, null, 'add')"
                                ><plus-outlined />新建菜单</a-button
                              >
                            </div>
                          </div>
                          <div class="menu-tree">
                            <a-directory-tree
                              draggable
                              @drop="info => onDrop(appItem, info)"
                              :show-icon="true"
                              v-model:expandedKeys="openMenuIdList"
                              v-if="appItem.menuList && appItem.menuList.length > 0"
                              :tree-data="appItem.menuList"
                              :fieldNames="{ children: 'children', title: 'menuName', key: 'menuId', value: 'menuId' }"
                            >
                              <!-- 图标 -->
                              <template #icon="data">
                                <icon-font
                                  v-if="data.menuType == 10"
                                  iconClass="icon-menu-type-backend"
                                  fontSize="24px"
                                  color="#594d9c"
                                ></icon-font>
                                <icon-font
                                  v-if="data.menuType == 20"
                                  iconClass="icon-menu-type-single-page"
                                  fontSize="24px"
                                  color="green"
                                ></icon-font>
                                <icon-font
                                  v-if="data.menuType == 30"
                                  fontSize="24px"
                                  iconClass="icon-menu-type-inner-link"
                                  color="var(--primary-color)"
                                ></icon-font>
                                <icon-font
                                  v-if="data.menuType == 40"
                                  iconClass="icon-menu-type-waibulianjie"
                                  color="#e37445"
                                  fontSize="24px"
                                ></icon-font>
                                <icon-font
                                  v-if="data.menuType == 50"
                                  iconClass="icon-menu-yingyongguanli"
                                  color="#e37445"
                                  fontSize="24px"
                                ></icon-font>
                              </template>
                              <!-- 标题 -->
                              <template #title="data">
                                <!-- 需要显示编辑图标 -->
                                <span class="tree-edit">
                                  <span
                                    :class="
                                      (data.menuType == 10 || data.menuType == 20) && data.children && data.children.length == 0
                                        ? 'edit-titles'
                                        : 'edit-title'
                                    "
                                    :title="data.menuName"
                                  >
                                    {{ data.menuName }}</span
                                  >
                                  <span
                                    :class="
                                      [10, 20, 50].includes(data.menuType) && data.children && data.children.length == 0
                                        ? 'edit-icons'
                                        : 'edit-icon'
                                    "
                                  >
                                    <a-space>
                                      <icon-font
                                        title="编辑"
                                        iconClass="icon-opt-bianji"
                                        color="var(--primary-color)"
                                        @click.stop="openAddEdit(appItem, data, 'edit')"
                                      ></icon-font>
                                      <icon-font
                                        iconClass="icon-menu-yingyongguanli"
                                        color="var(--primary-color)"
                                        @click.stop="useStand(data)"
                                        title="功能维护"
                                        v-if="[10, 20, 50].includes(data.menuType) && data.children && data.children.length == 0"
                                      ></icon-font>
                                      <icon-font
                                        iconClass="icon-opt-tianjia"
                                        color="var(--primary-color)"
                                        title="新增"
                                        @click.stop="openAddEdit(appItem, data, 'add')"
                                      ></icon-font>
                                      <icon-font
                                        iconClass="icon-opt-shanchu"
                                        title="删除"
                                        color="red"
                                        @click.stop="deleteMenu(data)"
                                      ></icon-font>
                                    </a-space>
                                  </span>
                                </span>
                              </template>
                            </a-directory-tree>
                            <a-empty v-else class="empty" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-spin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能维护弹框 -->
    <UseStand v-model:visible="showStand" v-if="showStand" :data="current" />
    <!-- 新增编辑弹框 -->
    <MenuAddEdit
      v-model:visible="showEdit"
      v-if="showEdit"
      :data="current"
      @done="getAppMenuGroupDetail(true)"
      :appId="currentAppId"
      :menuParentId="parentId"
      :menuParentName="parentName"
    />
  </div>
</template>

<script setup name="AuthMenu">
import { MenuApi } from './api/MenuApi';
import { ref, createVNode, onMounted, watch, onBeforeMount, nextTick } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import UseStand from './components/use-stand.vue';
import MenuAddEdit from './components/menu-add-edit.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

// 搜索条件
const where = ref({
  searchText: ''
});

// 应用菜单列表
const appMenuList = ref([]);

// 加载动画
const apiLoading = ref(false);
// 屏幕宽度
const screenWeight = ref(0);
// 屏幕高度
const screenHeight = ref(0);
// 用于判断翻页
const index = ref(1);
// 当前页的index
const curIndex = ref(1);
// 翻屏起始时间
const startTime = ref(0);
// 上一次翻屏结束时间
const endTime = ref(0);
// 翻屏后top的位置
const nowTop = ref(0);
// 一共有多少页
const pageNum = ref(0);
const main = ref(Object);
const obj = ref(Object);
// 是否显示维护弹框
const showStand = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 当前应用id
const currentAppId = ref('');
// 当前菜单的父级id
const parentId = ref('');
// 当前菜单的父级名称
const parentName = ref('');
// 当前pm的宽度
const bodyScreenWidth = ref(0);
const bodyScreenHeight = ref(0);
// 新的菜单列表
const newAppMenuList = ref([]);

// 展开列表
const openMenuIdList = ref([]);

// 是否是初始化
const isInit = ref(true);

onBeforeMount(() => {
  getAppMenuGroupDetail();
});
onMounted(() => {
  window.onresize = () => {
    //屏幕尺寸变化
    return (() => {
      bodyScreenWidth.value = document.body.clientWidth;
      bodyScreenHeight.value = document.body.clientHeight;
    })();
  };
  setPage();
});

watch(
  () => bodyScreenWidth.value,
  val => {
    setNewAppMenuList();
    nextTick(() => {
      setPage();
    });
  },
  { deep: true }
);
watch(
  () => bodyScreenHeight.value,
  val => {
    setPage();
  },
  { deep: true }
);

// 设置新的菜单列表
const setNewAppMenuList = () => {
  // 归0
  index.value = 1;
  curIndex.value = 1;
  nowTop.value = 0;
  toPage(index.value);
  newAppMenuList.value = [];
  let num = parseInt((bodyScreenWidth.value - 10) / 420);
  if (num < 1) num = 1;
  var arr = [];
  for (var i = 0; i < appMenuList.value.length; i += num) {
    arr.push(appMenuList.value.slice(i, i + num));
  }

  if (arr && arr.length > 0) {
    arr.forEach((item, index) => {
      newAppMenuList.value[index] = {
        index: index,
        children: item
      };
    });
  }
  if (isInit.value) {
    let openMenuIdLists = appMenuList.value.map(obj => obj.openMenuIdList);
    let concatenatedArray = [].concat(...openMenuIdLists);
    openMenuIdList.value = [...concatenatedArray];
  }
  isInit.value = false;
};

// 监听屏幕滚动
const setPage = () => {
  screenWeight.value = document.getElementById('content').clientWidth;
  screenHeight.value = document.getElementById('content').clientHeight;
  main.value = document.getElementById('main');
  obj.value = document.getElementsByTagName('div');
  for (let i = 0; i < obj.value.length; i++) {
    if (obj.value[i].className == 'page') {
      obj.value[i].style.height = screenHeight.value + 'px';
    }
  }
  pageNum.value = document.querySelectorAll('.page').length;
  // 浏览器兼容
  if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
    document.addEventListener('DOMMouseScroll', scrollFun, false);
  } else if (document.addEventListener) {
    document.addEventListener('mousewheel', scrollFun, false);
  } else if (document.attachEvent) {
    document.attachEvent('onmousewheel', scrollFun);
  } else {
    document.onmousewheel = scrollFun;
  }
};
// 滚动事件
const scrollFun = event => {
  if (event.target.className == 'page') {
    startTime.value = new Date().getTime();
    // mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
    // DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
    let delta = event.detail || -event.wheelDelta;
    // 如果当前滚动开始时间和上次滚动结束时间的差值小于1.5s，则不执行翻页动作，这样做是为了实现类似节流的效果
    if (startTime.value - endTime.value > 500) {
      if (delta > 0 && parseInt(main.value.offsetTop) >= -(screenHeight.value * (pageNum.value - 2))) {
        // 向下滚动
        index.value++;
        toPage(index.value);
      } else if (delta < 0 && parseInt(main.value.offsetTop) < 0) {
        // 向上滚动
        index.value--;
        toPage(index.value);
      }
      // 本次翻页结束，记录结束时间，用于下次判断
      endTime.value = new Date().getTime();
    }
  }
};

// 翻页
const toPage = index => {
  if (index != curIndex.value) {
    let delta = index - curIndex.value;
    nowTop.value = nowTop.value - delta * screenHeight.value;
    curIndex.value = index;
  }
};

// 获取菜单管理界面的每个应用组下的菜单信息
const getAppMenuGroupDetail = (flag = false) => {
  apiLoading.value = true;
  MenuApi.getAppMenuGroupDetail({ searchText: where.value.searchText })
    .then(res => {
      appMenuList.value = res;
      //获取屏幕尺寸
      bodyScreenWidth.value = document.body.clientWidth;
      bodyScreenHeight.value = document.body.clientHeight;
      if (flag) {
        setNewAppMenuList();
      }
    })
    .finally(() => (apiLoading.value = false));
};

// 清空条件
const clear = () => {
  where.value.searchText = '';
  getAppMenuGroupDetail();
};

// 点击新增编辑菜单
const openAddEdit = (appItem, data, flag) => {
  currentAppId.value = appItem ? appItem.appId : '';
  if (flag == 'add') {
    current.value = null;
    parentId.value = data ? data.menuId : '-1';
    parentName.value = data ? data.menuName : '根节点';
  } else {
    current.value = data;
    parentId.value = data.menuId;
    parentName.value = data.menuName;
  }

  showEdit.value = true;
};

// 功能维护
const useStand = data => {
  current.value = data;
  showStand.value = true;
};
// 删除菜单
const deleteMenu = data => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      apiLoading.value = true;
      MenuApi.delete({ menuId: data.menuId })
        .then(res => {
          message.success(res.message);
          getAppMenuGroupDetail(true);
        })
        .finally(() => (apiLoading.value = false));
    }
  });
};

// 拖拽
const onDrop = (appItem, info) => {
  const dropKey = info.node.eventKey;
  const dragKey = info.dragNode.eventKey;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
  const loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      if (item.nodeId === key) {
        return callback(item, index, arr);
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };
  const data = [...appItem.menuList];

  // Find dragObject
  let dragObj = {};
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  // 跨级拖拽
  if (!info.dropToGap) {
    dragObj.menuParentId = info.node.nodeId;
    dragObj.nodeParentId = info.node.nodeId;

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
    dragObj.menuParentId = info.node.nodeId;
    dragObj.nodeParentId = info.node.nodeId;

    loop(data, dropKey, item => {
      item.children = item.children || [];
      // where to insert 示例添加到尾部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else {
    dragObj.menuParentId = info.node.nodeParentId;
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

  appItem.menuList = [...data];
  MenuApi.updateMenuTree({ updateMenuTree: data }).then(res => {
    message.success(res.message);
  });
};
</script>

<style scoped lang="less">
.menu-item {
  border: 1px solid #ccc;
  width: 350px;
  height: 100%;
  margin-right: 20px;
  border-radius: 4px;
  .left-header {
    padding: 10px;
    height: 85px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ccc;
    .img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
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
      .app-item-remark {
        color: rgba(166, 166, 166, 1);
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .masks {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      text-align: center;
      background-color: rgba(153, 153, 153, 0.65);
      .add {
        margin-top: 30px;
      }
    }
    &:hover {
      .masks {
        display: block;
      }
    }
  }

  .menu-tree {
    width: 100%;
    padding: 0 10px 10px 10px;
    height: calc(100% - 105px);
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
}

#wrap {
  overflow: hidden;
  width: 100%;
}

#main {
  position: relative;
  transition: top 0.2s;
}

.page {
  /*谨删*/
  width: 100%;
  margin: 0;
  padding-bottom: 1px;
  height: 100%;
  display: flex;
}

#pageUl {
  position: fixed;
  right: 10px;
  bottom: 50%;
  z-index: 999;
}

.active {
  color: red;
}

::-webkit-scrollbar {
  width: 12px !important;
}
.tree-title {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tree-edit {
  width: 100%;
  display: inline-block;
  position: relative;
  .edit-title,
  .edit-titles {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .edit-icon {
    display: none;
    width: 40px;
    position: absolute;
    right: 30px !important;
  }
  .edit-icons {
    display: none;
    width: 40px;
    position: absolute;
    right: 55px;
  }
  &:hover {
    .edit-icon {
      display: inline-block;
    }
    .edit-icons {
      display: inline-block;
    }
    .edit-title {
      width: calc(100% - 70px);
    }
    .edit-titles {
      width: calc(100% - 100px);
    }
  }
}

@import url('@/styles/commonTree.less');
:deep(.ant-tree) {
  background-color: #fff !important;
}
.content-mian-body {
  height: calc(100% - 52px) !important;
}
</style>
