/** 页签栏下拉菜单 */
import { defineComponent, h } from 'vue';
import {
  Dropdown as ADropdown,
  Menu as AMenu,
  MenuItem as AMenuItem
} from 'ant-design-vue/es';
import DownOutlined from '@ant-design/icons-vue/es/icons/DownOutlined';
import ReloadOutlined from '@ant-design/icons-vue/es/icons/ReloadOutlined';
import ArrowLeftOutlined from '@ant-design/icons-vue/es/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons-vue/es/icons/ArrowRightOutlined';
import CloseCircleOutlined from '@ant-design/icons-vue/es/icons/CloseCircleOutlined';
import ExpandOutlined from '@ant-design/icons-vue/es/icons/ExpandOutlined';
import CompressOutlined from '@ant-design/icons-vue/es/icons/CompressOutlined';
import MinusCircleOutlined from '@ant-design/icons-vue/es/icons/MinusCircleOutlined';
import { useLocale } from '@/i18n/use-locale';

export default defineComponent({
  name: 'LayoutTabDropdown',
  props: {
    active: String,
    showRefresh: Boolean,
    bodyFullscreen: Boolean
  },
  emits: ['menu-click'],
  setup(props, { emit, slots }) {
    const { locale } = useLocale({ name: 'tabs' });

    /* 菜单 item 点击事件 */
    const onClick = ({ key }) => {
      emit('menu-click', key);
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
          placement: 'bottomRight',
          overlayClassName: 'guns-admin-tabs-drop-popper'
        },
        {
          default: () => {
            return h('div', { class: 'guns-tab-dropdowm' }, h(DownOutlined));
          },
          overlay: () => {
            if (slots.dropdown) {
              return slots.dropdown({
                active: props.active,
                refresh: props.showRefresh
              });
            }
            const items = [
              hMI(
                'fullscreen',
                props.bodyFullscreen
                  ? locale.value.fullscreenExit
                  : locale.value.fullscreen,
                props.bodyFullscreen ? CompressOutlined : ExpandOutlined,
                0.9
              ),
              hMI('left', locale.value.closeLeft, ArrowLeftOutlined),
              hMI('right', locale.value.closeRight, ArrowRightOutlined),
              hMI('other', locale.value.closeOther, MinusCircleOutlined, 1.02),
              hMI('all', locale.value.closeAll, CloseCircleOutlined, 1.02)
            ];
            if (props.showRefresh) {
              items.push(hMI('reload', locale.value.reload, ReloadOutlined));
            }
            return h(AMenu, { selectable: false, onClick }, () => items);
          }
        }
      );
    };
  }
});
