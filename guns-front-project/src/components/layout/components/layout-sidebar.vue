<!-- 侧栏 -->
<template>
  <div class="guns-admin-sidebar">
    <slot name="top"></slot>
    <div class="guns-admin-sidebar-menus">
      <LayoutMenus
        :data="data"
        :theme="theme"
        :open-keys="openKeys"
        :selected-keys="active"
        :inline-collapsed="collapse"
        :inline-indent="inlineIndent"
        @titleClick="onTitleClick"
        @openChange="onOpenChange"
      >
        <template v-for="name in Object.keys($slots)" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}"></slot>
        </template>
      </LayoutMenus>
    </div>
    <div
      v-if="showCollapse && collapse"
      class="guns-admin-sidebar-tool-item"
      @click="toggleCollapse"
    >
      <MenuUnfoldOutlined v-if="collapse"  class="guns-admin-sidebar-tool-item-icon"/>
      <!-- <MenuFoldOutlined v-else  class="guns-admin-sidebar-tool-item-icon"/> -->
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import LayoutMenus from './layout-menus';
import { getMatchedMenus } from '../util';

export default defineComponent({
  name: 'LayoutSidebar',
  components: { LayoutMenus },
  props: {
    // 菜单数据
    data: {
      type: Array,
      required: true
    },
    // 菜单选中
    active: {
      type: Array,
      required: true
    },
    // 展开的菜单
    menuOpens: {
      type: Array,
      required: true
    },
    // 菜单主题
    theme: String,
    // 是否折叠
    collapse: Boolean,
    // 是否显示折叠按钮
    showCollapse: Boolean,
    // 是否只保持一个子菜单展开
    uniqueOpen: Boolean,
    // 菜单缩进
    inlineIndent: {
      type: Number,
      default: 16
    }
  },
  emits: ['update:menu-opens', 'title-click', 'toggle-collapse'],
  setup(props, { emit }) {
    // 展开的菜单
    const openKeys = ref(props.collapse || !props.menuOpens ? [] : props.menuOpens.slice());

    /* 子级展开事件 */
    const onOpenChange = keys => {
      if (props.collapse) {
        openKeys.value = keys;
      } else {
        if (props.uniqueOpen && keys.length && keys.length > props.menuOpens.length) {
          const cks = keys.filter(k => !props.menuOpens.some(t => k === t));
          const oks = getMatchedMenus(cks[0], props.data)?.map(d => d.path);
          emit('update:menu-opens', oks ?? []);
        } else {
          emit('update:menu-opens', keys.slice());
        }
      }
    };

    /* 菜单父级点击事件 */
    const onTitleClick = (key, item) => {
      emit('title-click', key, item);
    };

    /* 折叠展开菜单 */
    const toggleCollapse = () => {
        emit('toggle-collapse');
      };

    watch(
      () => props.collapse,
      collapse => {
        if (collapse) {
          openKeys.value = [];
        } else {
          openKeys.value = props.menuOpens;
        }
      }
    );

    watch(
      () => props.menuOpens,
      menuOpens => {
        if (!props.collapse) {
          openKeys.value = menuOpens;
        }
      },
      { deep: true }
    );

    return { openKeys, onOpenChange, onTitleClick, toggleCollapse };
  }
});
</script>
