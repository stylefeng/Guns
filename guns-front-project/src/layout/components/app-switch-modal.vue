<template>
  <common-drawer
    :visible="visible"
    :width="560"
    @close="updateVisible(false)"
    :bodyStyle="{ padding: '16px 24px' }"
    :headerStyle="{ display: 'none' }"
    style="top: 53px"
  >
    <div class="app-box">
      <div
        class="app-item content"
        :class="activeApp.appId == appItem.appId ? 'active' : ''"
        v-for="appItem in appList"
        :key="appItem.appId"
        @click="changeApp(appItem)"
      >
        <img :src="appItem.appIconWrapper" alt="" class="img" />
        <div class="app-item-right">
          <div class="app-item-name">{{ appItem.appName }}</div>
          <div class="app-item-remark">{{ appItem.remark }}</div>
        </div>
      </div>
    </div>
  </common-drawer>
</template>

<script setup name="AppSwitchModal">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import CommonDrawer from '@/components/common/CommonDrawer/index.vue';
import { useUserStore } from '@/store/modules/user';
import { isExternalLink } from '@/utils/common/menu-util';

const props = defineProps({
  // 是否显示抽屉
  visible: Boolean
});

const emits = defineEmits(['update:visible', 'close']);

// 路由
const router = useRouter();
// store
const userStore = useUserStore();

// 应用列表
const appList = computed(() => {
  return userStore.appList;
});

// 当前激活应用
const activeApp = computed(() => {
  return userStore.activeApp;
});

const path = ref('');

// 是否打开新标签
const isNewTab = ref(false);

// 切换抽屉状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 切换应用
const changeApp = item => {
  if (item.appId != activeApp.value.appId) {
    if (item.menuList && item.menuList.length) {
      setPath(item.menuList);
      if (isNewTab.value) {
        window.open(path.value, '_blank');
      } else {
        if (isExternalLink(path.value)) {
          window.open(path.value, '_blank');
        } else {
          router.push(path.value);
        }
        updateVisible(false);
      }
    }
  }
};

// 设置path
const setPath = arr => {
  if (!arr[0].children || arr[0].children.length == 0) {
    path.value = arr[0].path;
    if (arr[0].appDesignBusinessId) {
      path.value = path.value + '?businessId=' + arr[0].appDesignBusinessId;
    }
  } else {
    setPath(arr[0].children);
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('onkeyup ', handleKeyUp);
});

// 键盘按下
const handleKeyDown = e => {
  if (e.key == 'Control' || e.keyCode == 17) {
    isNewTab.value = true;
  }
};
// 键盘抬起
const handleKeyUp = e => {
  if (e.key == 'Control' || e.keyCode == 17) {
    isNewTab.value = false;
  }
};

// 销毁事件
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('onkeyup', handleKeyUp);
  isNewTab.value = false;
});
</script>

<style scoped lang="less">
.app-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.app-item {
  width: calc(100% - 2px);
  display: flex;
  border: 1px solid rgba(197, 207, 209, 0.6);
  align-items: center;
  cursor: pointer;
  margin: 2px 1px 0 1px;
  border-radius: 4px;
  padding: 16px 24px;
  box-shadow: 0 0 2px rgba(197, 207, 209, 0.6);

  .img {
    width: 58px;
    height: 58px;
    margin-right: 16px;
  }
  .app-item-right {
    flex: 1;
    width: calc(100% - 60px);
    .app-item-name {
      font-size: 18px;
      font-weight: bold;
      color: #1B2C45;
    }
    .app-item-remark {
      color: #898E91;
      font-size: 16px;
      font-weight: 400;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &:hover {
    border: 1px solid #3f78df;
    box-shadow: 0 0 2px #3f78df;
  }
}
.active {
  border: 1px solid #3f78df;
  box-shadow: 0 0 2px #3f78df;
}
.content {
  margin-bottom: 20px;
}
</style>
