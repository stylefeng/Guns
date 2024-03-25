<template>
  <a-drawer v-bind="props" @close="close" @afterVisibleChange="afterVisibleChange">
    <!-- 抽屉右上角的操作区域 -->
    <template #extra v-if="slots.extra">
      <slot name="extra"></slot>
    </template>
    <!-- 抽屉的页脚 -->
    <template #footer v-if="slots.footer">
      <slot name="footer"></slot>
    </template>
    <!-- 抽屉的标题 -->
    <template #title v-if="slots.title">
      <slot name="title"></slot>
    </template>
    <!-- 	自定义关闭图标 -->
    <template #closeIcon v-if="slots.closeIcon">
      <slot name="closeIcon"></slot>
    </template>

    <slot name="top"></slot>

    <a-tabs v-model:activeKey="currentActive" v-if="isShowTab" @change="tabChange">
      <a-tab-pane :key="tabItem.key" v-for="tabItem in tabList">
        <template #tab>
          <div class="tab-item">
            <i :class="'iconfont icons ' + tabItem.icon" v-if="tabItem.icon"></i>
            <div>{{ tabItem.name }}</div>
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
    <!-- 内容 -->
    <slot></slot>

    <!-- 关闭按钮 -->
    <div class="close-button" @click="close" v-if="visible"><close-outlined /></div>
  </a-drawer>
</template>

<script setup name="CommonDrawer">
import { useSlots, watch, ref } from 'vue';

const slots = useSlots();
const props = defineProps({
  // 抽屉是否显示
  visible: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: 'drawer'
  },
  // 抽屉展开后是否将焦点切换至其 Dom 节点
  autofocus: {
    type: Boolean,
    default: true
  },
  //可用于设置 Drawer 内容部分的样式
  bodyStyle: {
    type: Object,
    default: {}
  },
  // 是否显示左上角的关闭按钮
  closable: {
    type: Boolean,
    default: false
  },
  // 可用于设置 Drawer 包裹内容部分的样式
  contentWrapperStyle: {
    type: Object,
    default: {}
  },
  // 关闭时销毁 Drawer 里的子元素
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  // 用于设置 Drawer 弹出层的样式
  drawerStyle: {
    type: Object,
    default: {}
  },
  // 抽屉页脚部件的样式
  footerStyle: {
    type: Object,
    default: {}
  },
  // 预渲染 Drawer 内元素
  forceRender: {
    type: Boolean,
    default: false
  },
  // 指定 Drawer 挂载的 HTML 节点
  getContainer: {
    type: [String, Boolean],
    default: false
  },
  // 用于设置 Drawer 头部的样式
  headerStyle: {
    type: Object,
    default: {}
  },
  // 高度, 在 placement 为 top 或 bottom 时使用
  height: {
    type: [String, Number],
    default: 378
  },
  // 是否支持键盘 esc 关闭
  keyboard: {
    type: Boolean,
    default: true
  },
  // 是否展示遮罩
  mask: {
    type: Boolean,
    default: false
  },
  // 点击蒙层是否允许关闭
  maskClosable: {
    type: Boolean,
    default: false
  },
  // 遮罩样式
  maskStyle: {
    type: Object,
    default: {}
  },
  // 抽屉的方向
  placement: {
    type: String,
    default: 'right'
  },
  // 用于设置多层 Drawer 的推动行为
  push: {
    type: [Boolean, Object],
    default: { distance: 180 }
  },
  // 预设抽屉宽度（或高度），default 378px 和 large 736px
  size: {
    type: String,
    default: 'default'
  },
  // 用于设置 Drawer 最外层容器的样式
  style: {
    type: Object,
    default: {}
  },
  // 宽度
  width: {
    type: [String, Number],
    default: 378
  },
  // 	设置 Drawer 的 z-index
  zIndex: {
    type: Number,
    default: 1000
  },
  // tab栏默认选中
  activeKey: {
    type: [String, Number],
    default: '1'
  },
  // 是否显示tab栏
  isShowTab: {
    type: Boolean,
    default: false
  },
  // tab栏列表
  tabList: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(['close', 'afterVisibleChange', 'tabChange']);
// 当前默认选中
const currentActive = ref('1');
// 关闭抽屉
const close = e => {
  emit('close', e);
};

// 切换抽屉时动画结束后的回调
const afterVisibleChange = visible => {
  emit('afterVisibleChange', visible);
};

// tab切换
const tabChange = key => {
  emit('tabChange', key);
};

watch(
  () => props.activeKey,
  val => {
    if (val) {
      currentActive.value = val;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
.close-button {
  position: absolute;
  left: -40px;
  top: 180px;
  width: 40px;
  height: 40px;
  font-size: 22px;
  background: #7127de;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  color: #fff;
}
:deep(.ant-drawer-content) {
  overflow: visible;
}
.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icons {
  font-size: 20px;
  margin-right: 5px;
}
:deep(.ant-drawer-wrapper-body) {
  height: 100%;
}
</style>
