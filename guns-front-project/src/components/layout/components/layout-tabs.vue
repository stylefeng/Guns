<!-- 页签栏 -->
<template>
  <div ref="tabRef" :class="['guns-admin-tabs', { 'is-show-arrow': tabArrow }]">
    <TabTool :tab="true" :active="active === homePath" @click="onTabClick(homePath)">
      <LayoutTabItem :title="homeTitle" :tabKey="homePath" :active="active" @menu-click="onContextMenuClick">
        <template #tab-title="slotProps">
          <slot name="tab-title" v-bind="slotProps || {}">
            <HomeOutlined style="font-size: 14px" />
          </slot>
        </template>
        <template v-if="$slots['context-menu']" #context-menu="slotProps">
          <slot name="context-menu" v-bind="slotProps || {}"></slot>
        </template>
      </LayoutTabItem>
    </TabTool>
    <ATabs :hideAdd="true" :animated="false" type="editable-card" :activeKey="tabActive" @edit="onTabEdit" @tabClick="onTabClick">
      <ATabPane v-for="(item, index) in tabs" :key="index + '-' + item.key" :closable="item.closable">
        <template #tab>
          <LayoutTabItem :item="item" :title="item.title" :tabKey="item.key" :active="active" @menu-click="onContextMenuClick">
            <template v-if="$slots['tab-title']" #tab-title="slotProps">
              <slot name="tab-title" v-bind="slotProps || {}"></slot>
            </template>
            <template v-if="$slots['context-menu']" #context-menu="slotProps">
              <slot name="context-menu" v-bind="slotProps || {}"></slot>
            </template>
          </LayoutTabItem>
        </template>
      </ATabPane>
      <template #leftExtra>
        <TabTool v-if="tabArrow" class="guns-tab-arrow" @click="scrollLeft">
          <LeftOutlined />
        </TabTool>
      </template>
      <template #rightExtra>
        <TabTool v-if="tabArrow" class="guns-tab-arrow" @click="scrollRight">
          <RightOutlined />
        </TabTool>
        <TabTool>
          <TabDropdown :active="active" :showRefresh="showRefresh" :bodyFullscreen="bodyFullscreen" @menu-click="onDropMenuClick">
            <template v-if="$slots.dropdown" #dropdown="slotProps">
              <slot name="dropdown" v-bind="slotProps || {}"></slot>
            </template>
          </TabDropdown>
        </TabTool>
      </template>
    </ATabs>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import LeftOutlined from '@ant-design/icons-vue/es/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons-vue/es/icons/RightOutlined';
import HomeOutlined from '@ant-design/icons-vue/es/icons/HomeOutlined';
import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue/es';
import SortableJs from 'sortablejs';
import TabTool from './tab-tool.vue';
import TabDropdown from './tab-dropdown';
import LayoutTabItem from './layout-tab-item';

export default defineComponent({
  name: 'LayoutTabs',
  components: {
    LeftOutlined,
    RightOutlined,
    HomeOutlined,
    ATabs,
    ATabPane,
    TabTool,
    LayoutTabItem,
    TabDropdown
  },
  props: {
    // 标签页数据
    tabs: {
      type: Array,
      required: true
    },
    // 页签选中
    active: {
      type: String,
      required: true
    },
    // 主页路由地址
    homePath: {
      type: String,
      required: true
    },
    // 主页标题
    homeTitle: {
      type: String,
      required: true
    },
    // 右侧下拉是否显示刷新按钮
    showRefresh: Boolean,
    // 是否再次点击选中 tab 刷新
    clickReload: Boolean,
    // 内容区域是否处于全屏状态
    bodyFullscreen: Boolean,
    // 是否开启页签右键菜单
    tabContextMenu: Boolean,
    // 是否支持拖动排序
    tabSortable: Boolean,
    // 是否显示页签左右滚动箭头
    tabArrow: Boolean
  },
  emits: [
    'tab-change',
    'tab-remove',
    'tab-remove-all',
    'tab-remove-left',
    'tab-remove-right',
    'tab-remove-other',
    'fullscreen-body',
    'context-menu',
    'reload-page',
    'tabSortChange'
  ],
  setup(props, { emit }) {
    // 当前数据
    const current = { sortIns: null };

    // 根节点
    const tabRef = ref(null);

    // 页签选中
    const tabActive = computed(() => {
      const i = props.tabs.findIndex(d => d.key === props.active);
      if (i !== -1) {
        return i + '-' + props.active;
      }
      return props.active;
    });

    /* 刷新页面 */
    const reloadPage = () => {
      emit('reload-page');
    };

    /* 处理页签点击 */
    const onTabClick = k => {
      const tab = props.tabs.find((d, i) => i + '-' + d.key === k);
      const key = tab?.key ?? k;
      if (props.active === key) {
        if (props.clickReload) {
          reloadPage();
        }
        return;
      }
      emit('tab-change', tab ? tab : { key });
    };

    /* 处理页签删除 */
    const onTabEdit = (k, action) => {
      if (action === 'remove') {
        const tab = props.tabs.find((d, i) => i + '-' + d.key === k);
        const key = tab?.key ?? k;
        emit('tab-remove', { key, active: props.active });
      }
    };

    /* 下拉菜单点击 */
    const onDropMenuClick = command => {
      const key = props.active;
      const option = { key, active: key };
      switch (command) {
        case 'left': // 关闭左侧
          emit('tab-remove-left', option);
          break;
        case 'right': // 关闭右侧
          emit('tab-remove-right', option);
          break;
        case 'other': // 关闭其他
          emit('tab-remove-other', option);
          break;
        case 'all': // 关闭全部
          emit('tab-remove-all', key);
          break;
        case 'reload': // 刷新当前
          reloadPage();
          break;
        case 'fullscreen': // 内容全屏
          emit('fullscreen-body', !props.bodyFullscreen);
          break;
      }
    };

    /* 右键菜单点击 */
    const onContextMenuClick = option => {
      emit('context-menu', option);
    };

    /* 获取页签栏 DOM */
    const getTabWrapEl = () => {
      const el = tabRef.value;
      return el ? el.querySelector('.ant-tabs-nav-wrap') : void 0;
    };

    /* 左滚动页签栏 */
    const scrollLeft = e => {
      const el = getTabWrapEl();
      if (!el) {
        return;
      }
      e.preventDefault();
      el.dispatchEvent(new WheelEvent('wheel', { deltaX: 0, deltaY: -100 }));
    };

    /* 右滚动页签栏 */
    const scrollRight = e => {
      const el = getTabWrapEl();
      if (!el) {
        return;
      }
      e.preventDefault();
      el.dispatchEvent(new WheelEvent('wheel', { deltaX: 0, deltaY: 100 }));
    };

    /* 页签拖动排序 */
    const bindDragSort = () => {
      unbindDragSort();
      const tabEl = getTabWrapEl();
      const el = tabEl ? tabEl.querySelector('.ant-tabs-nav-list') : void 0;
      if (!props.tabSortable || !el) {
        return;
      }
      current.sortIns = new SortableJs(el, {
        animation: 300,
        draggable: '.ant-tabs-tab',
        onUpdate: ({ oldDraggableIndex, newDraggableIndex }) => {
          if (typeof oldDraggableIndex === 'number' && typeof newDraggableIndex === 'number') {
            const temp = [...props.tabs];
            temp.splice(newDraggableIndex, 0, temp.splice(oldDraggableIndex, 1)[0]);
            emit('tabSortChange', temp);
          }
        },
        setData: () => {}
      });
    };

    /* 销毁页签拖动排序 */
    const unbindDragSort = () => {
      current.sortIns && current.sortIns.destroy();
    };

    onMounted(() => {
      bindDragSort();
    });

    onBeforeUnmount(() => {
      unbindDragSort();
    });

    return {
      tabRef,
      tabActive,
      onTabEdit,
      onTabClick,
      onContextMenuClick,
      onDropMenuClick,
      scrollLeft,
      scrollRight
    };
  }
});
</script>
