/** 页签 */
import { defineComponent, h } from 'vue';
import {
  Dropdown as ADropdown,
  Menu as AMenu,
  MenuItem as AMenuItem
} from 'ant-design-vue/es';
import ReloadOutlined from '@ant-design/icons-vue/es/icons/ReloadOutlined';
import ArrowLeftOutlined from '@ant-design/icons-vue/es/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons-vue/es/icons/ArrowRightOutlined';
import CloseOutlined from '@ant-design/icons-vue/es/icons/CloseOutlined';
import MinusCircleOutlined from '@ant-design/icons-vue/es/icons/MinusCircleOutlined';
import { useLocale } from '@/utils/common/iframe-component';

export default defineComponent({
  name: 'LayoutTabItem',
  props: {
    active: String,
    tabKey: String,
    title: String,
    item: Object
  },
  emits: ['menu-click'],
  setup(props, { emit, slots }) {
    const { locale } = useLocale({ name: 'tabs' });

    /* 菜单 item 点击事件 */
    const onClick = ({ key }) => {
      emit('menu-click', {
        key,
        tabKey: props.tabKey,
        item: props.item,
        active: props.active
      });
    };

    /* 渲染菜单 item */
    const hMI = (
      key,
      label,
      icon,
      scale
    ) => {
      return h(AMenuItem, { key }, () => {
        return h('div', { class: 'guns-dropdown-item' }, [
          h(icon, {
            style: { transform: scale ? `scale(${scale})` : void 0 }
          }),
          h('div', { class: 'guns-dropdown-item-label' }, label)
        ]);
      });
    };

    return () => {
      return h(
        ADropdown,
        {
          trigger: ['contextmenu'],
          overlayClassName: 'guns-admin-tab-context-menu'
        },
        {
          default: () => {
            const tSlot = slots['tab-title'];
            const option = { title: props.title, item: props.item };
            return h(
              'div',
              { class: 'guns-admin-tab-title' },
              tSlot ? tSlot(option) : props.title
            );
          },
          overlay: () => {
            const ctxSlot = slots['context-menu'];
            if (ctxSlot) {
              return ctxSlot({
                tabKey: props.tabKey,
                item: props.item,
                active: props.active
              });
            }
            const items = [
              hMI('reload', locale.value.reload, ReloadOutlined),
              hMI('close', locale.value.close, CloseOutlined, 1.04),
              hMI('left', locale.value.closeLeft, ArrowLeftOutlined),
              hMI('right', locale.value.closeRight, ArrowRightOutlined),
              hMI('other', locale.value.closeOther, MinusCircleOutlined, 1.02)
            ];
            return h(AMenu, { selectable: false, onClick }, () => items);
          }
        }
      );
    };
  }
});
