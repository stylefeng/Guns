/** 菜单 */
import { defineComponent, h } from 'vue';
import { RouterLink } from 'vue-router';
import { Menu as AMenu, MenuItem as AMenuItem, SubMenu as ASubMenu, MenuItemGroup as AMenuItemGroup } from 'ant-design-vue/es';
import { isExternalLink } from '@/utils/common/menu-util';

export default defineComponent({
  name: 'LayoutMenus',
  props: {
    // 菜单数据
    data: {
      type: Array,
      required: true
    },
    // 菜单类型
    mode: {
      type: String,
      default: 'inline'
    },
    // 菜单主题
    theme: {
      type: String,
      default: 'light'
    },
    // 展开的菜单
    openKeys: Array,
    // 菜单选中
    selectedKeys: Array,
    // 是否折叠
    inlineCollapse: Boolean,
    // 菜单缩进
    inlineIndent: Number,
    // 一级父菜单 popup class
    firstPopClass: String,
    // 标题插槽名称
    titleSlot: {
      type: String,
      default: 'title'
    },
    // 图标插槽名称
    iconSlot: {
      type: String,
      default: 'icon'
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  emits: ['openChange', 'titleClick'],
  setup(props, { emit, slots }) {
    /* 递归渲染菜单节点 */
    const renderItems = (data, popupClassName) => {
      const nodes = [];
      data?.forEach(item => {
        if (item.meta?.hide) {
          return;
        }
        // 图标插槽
        const iconSlot =
          props.showIcon && item.meta?.icon
            ? () => {
                const t = slots[props.iconSlot];
                return t ? t({ icon: item.meta.icon, item }) : void 0;
              }
            : void 0;
        // 标题节点
        const titleSlot = slots[props.titleSlot];
        const titleNode = titleSlot ? titleSlot({ title: item.meta?.title, item }) : h('span', {}, item.meta?.title);
        // 子级节点
        if (!item.children?.some(d => !d.meta?.hide)) {
          let linkNode;
          // 超链接节点
          if (isExternalLink(item.path)) {
            linkNode = h('a', { href: item.path, target: '_blank' });
          } else if (isExternalLink(item.redirect)) {
            linkNode = h('a', { href: item.redirect, target: '_blank' });
          } else {
            linkNode = h(RouterLink, { to: item.redirect ? item.redirect : item.path });
          }

          nodes.push(
            h(
              AMenuItem,
              { key: item.path },
              {
                default: () => [titleNode, linkNode],
                icon: iconSlot
              }
            )
          );
          return;
        }
        // 父级节点
        if (item.meta?.group) {
          nodes.push(
            h(
              AMenuItemGroup,
              { key: item.path },
              {
                default: () => renderItems(item.children),
                title: () => titleNode
              }
            )
          );
        } else {
          nodes.push(
            h(
              ASubMenu,
              {
                key: item.path,
                popupClassName,
                onTitleClick: key => emit('titleClick', key, item)
              },
              {
                default: () => renderItems(item.children),
                title: () => titleNode,
                icon: iconSlot
              }
            )
          );
        }
      });
      return nodes;
    };

    return () => {
      return h(
        AMenu,
        {
          mode: props.mode,
          theme: props.theme,
          openKeys: props.openKeys,
          selectedKeys: props.selectedKeys,
          inlineCollapse: props.inlineCollapse,
          inlineIndent: props.inlineIndent,
          titleSlot: props.titleSlot,
          iconSlot: props.iconSlot,
          onOpenChange: keys => emit('openChange', keys)
        },
        () => renderItems(props.data, props.firstPopClass)
      );
    };
  }
});
