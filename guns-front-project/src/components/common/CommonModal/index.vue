<script>
/** 弹窗组件 */
import { defineComponent, ref, unref, computed, watch, onActivated, onDeactivated, nextTick, inject, h } from 'vue';
import { Modal as AModal } from 'ant-design-vue/es';
import ExpandOutlined from '@ant-design/icons-vue/es/icons/ExpandOutlined';
import CompressOutlined from '@ant-design/icons-vue/es/icons/CompressOutlined';
import { LAYOUT_KEY, screenWidth } from '../../layout/util';
import {
  closedClass,
  movableClass,
  moveOutClass,
  moveOutPositiveClass,
  resizableClass,
  multipleClass,
  fullscreenClass,
  innerClass,
  hideClass,
  noResponsiveClass,
  collapseClass,
  navCollapseClass,
  bodyFullscreenClass,
  showTabsClass,
  sideMixClass,
  sideMixSingleClass,
  layoutTopClass,
  contentFullscreenClass,
  mobileClass,
  useModalMovable,
  useModalResizable,
  useModalAutoSetTop,
  getStyleString,
  getModalContainer,
  setModalTop,
  resetModalStyle,
  setInitPosition
} from './util';
import props from './props';

export default defineComponent({
  name: 'CommonModal',
  props,
  emits: ['update:visible', 'cancel', 'ok', 'change', 'update:fullscreen'],
  setup(props, { emit, slots }) {
    // 布局状态
    const layoutProvide = inject(LAYOUT_KEY, ref({ isMobile: screenWidth() < 768 }));

    // 标题 ref
    const titleRef = ref(null);

    // 弹窗是否全屏
    const isFullscreen = ref(props.fullscreen ?? false);

    // 适配 keep-alive
    const isActivated = ref(true);

    // 弹窗容器
    const modalContainer = ref();

    // 限制在内部区域的 class
    const modalInnerClass = computed(() => {
      const layoutState = unref(layoutProvide);
      const classes = [];
      if (props.inner) {
        classes.push(innerClass);
        // 适配各种布局状态
        if (layoutState.collapse && !layoutState.isTopMenu) {
          classes.push(collapseClass);
        }
        if (layoutState.sideNavCollapse && layoutState.isMixSideMenu && !layoutState.isTopMenu) {
          classes.push(navCollapseClass);
        }
        if (layoutState.bodyFullscreen) {
          classes.push(bodyFullscreenClass);
        }
        if (layoutState.showTabs) {
          classes.push(showTabsClass);
        }
        if (layoutState.isMixSideMenu && !layoutState.isTopMenu) {
          classes.push(sideMixClass);
          if (!layoutState.haveSideMenuData) {
            classes.push(sideMixSingleClass);
          }
        }
        if (layoutState.isTopMenu) {
          classes.push(layoutTopClass);
        }
        if (layoutState.bodyFullscreen && layoutState.contentFullscreen) {
          classes.push(contentFullscreenClass);
        }
        if (layoutState.isMobile) {
          classes.push(mobileClass);
        }
      }
      return classes.join(' ');
    });

    // 弹窗 wrap 的 class
    const modalWrapClass = computed(() => {
      const classes = [];
      if (!unref(layoutProvide).isMobile) {
        // 支持拖动
        if (props.movable) {
          classes.push(movableClass);
        }
        // 支持拖出屏幕
        if (props.moveOut) {
          classes.push(moveOutClass);
        }
        // 只允许右下方向拖出屏幕
        if (props.moveOutPositive) {
          classes.push(moveOutPositiveClass);
        }
        // 支持拉伸
        if (props.resizable) {
          classes.push(resizableClass);
          // 只允许单方向拉伸
          if (typeof props.resizable === 'string') {
            classes.push(resizableClass + '-' + props.resizable);
          }
        }
      }
      // 支持打开多个并点击自动置顶
      if (props.multiple) {
        classes.push(multipleClass);
      }
      // 全屏
      if (isFullscreen.value) {
        classes.push(fullscreenClass);
      }
      // 弹窗是否处于关闭状态
      if (!props.visible) {
        classes.push(closedClass);
      }
      // 适配 keep-alive
      if (!isActivated.value && props.visible) {
        classes.push(hideClass);
      }
      // 限制在内部区域
      if (modalInnerClass.value) {
        classes.push(modalInnerClass.value);
      }
      // 关闭响应式
      if (unref(layoutProvide)?.styleResponsive === false) {
        classes.push(noResponsiveClass);
      }
      // 自定义 class
      if (props.wrapClassName) {
        classes.push(props.wrapClassName);
      }
      return classes.join(' ');
    });

    // 弹窗 style
    const dialogStyle = computed(() => {
      if (!props.centered || unref(layoutProvide).isMobile) {
        return props.style;
      }
      const width = typeof props.width === 'number' ? `${props.width / 2}px` : `calc(${props.width} / 2)`;
      const styleObj = {
        '--modal-centered-left': `calc(50% - ${width})`
      };
      if (typeof props.style === 'string') {
        return getStyleString(styleObj) + props.style;
      } else if (typeof props.style === 'object' && props.style !== null) {
        return { ...styleObj, ...props.style };
      }
      return styleObj;
    });

    // 遮罩组件的属性
    const modalMaskProps = computed(() => {
      const classes = ['ant-modal-mask'];
      // 限制在内部区域
      if (modalInnerClass.value) {
        classes.push(modalInnerClass.value);
      }
      // 适配 keep-alive
      if (!isActivated.value && props.visible) {
        classes.push(hideClass);
      }
      // 自定义 class
      if (props.maskClass) {
        classes.push(props.maskClass);
      }
      return { class: classes.join(' ') };
    });

    // 弹窗是否显示遮罩层
    const modalMask = computed(() => (props.multiple ? false : props.mask));

    // 更新 visible
    const updateVisible = visible => {
      emit('update:visible', visible);
    };

    // visible 改变事件
    const onChange = visible => {
      emit('change', visible);
    };

    // 弹窗关闭事件
    const onCancel = e => {
      emit('cancel', e);
    };

    // 确定按钮点击事件
    const onOk = e => {
      emit('ok', e);
    };

    // 弹窗全屏切换
    const toggleFullscreen = fullscreen => {
      if (typeof fullscreen === 'undefined') {
        isFullscreen.value = !isFullscreen.value;
      } else {
        isFullscreen.value = fullscreen;
      }
      emit('update:fullscreen', isFullscreen.value);
    };

    // 更新弹窗容器属性
    const updateModalContainer = () => {
      if (props.multiple) {
        modalContainer.value = () => {
          return getModalContainer();
        };
      } else {
        modalContainer.value = props.getContainer;
      }
    };

    // 加载支持拖动插件
    watch(
      () => props.movable,
      movable => {
        if (movable) {
          useModalMovable();
        }
      },
      {
        immediate: true
      }
    );

    // 加载支持拉伸插件
    watch(
      () => props.resizable,
      movable => {
        if (movable) {
          useModalResizable();
        }
      },
      {
        immediate: true
      }
    );

    // 加载点击自动置顶插件
    watch(
      () => props.multiple,
      multiple => {
        if (multiple) {
          useModalAutoSetTop();
        }
      },
      {
        immediate: true
      }
    );

    // 更新全屏状态
    watch(
      () => props.fullscreen,
      fullscreen => {
        if (isFullscreen.value !== fullscreen) {
          isFullscreen.value = fullscreen;
        }
      }
    );

    // 更新弹窗打开状态
    watch(
      () => props.visible,
      visible => {
        if (visible) {
          nextTick(() => {
            const modalEl = titleRef.value?.parentNode?.parentNode?.parentNode?.parentNode;
            if (props.resetOnClose) {
              resetModalStyle(modalEl, props.width);
            }
            if (props.position) {
              setInitPosition(modalEl, props.position, props.moveOut, props.resetOnClose);
            }
            setModalTop(modalEl);
          });
          if (props.resetOnClose || props.destroyOnClose) {
            isFullscreen.value = props.fullscreen;
          }
        }
      }
    );

    // 更新弹窗容器属性
    watch(
      () => props.getContainer,
      () => {
        updateModalContainer();
      }
    );

    onDeactivated(() => {
      isActivated.value = false;
    });

    onActivated(() => {
      isActivated.value = true;
    });

    updateModalContainer();

    return () => {
      return h(
        AModal,
        {
          afterClose: props.afterClose,
          bodyStyle: props.bodyStyle,
          cancelText: props.cancelText,
          centered: props.centered,
          closable: props.closable,
          closeIcon: props.closeIcon,
          confirmLoading: props.confirmLoading,
          destroyOnClose: props.destroyOnClose,
          footer: props.footer,
          forceRender: props.forceRender,
          keyboard: props.keyboard,
          maskClosable: props.maskClosable,
          maskStyle: props.maskStyle,
          okText: props.okText,
          okType: props.okType,
          okButtonProps: props.okButtonProps,
          cancelButtonProps: props.cancelButtonProps,
          visible: props.visible,
          width: props.width,
          zIndex: props.zIndex,
          dialogClass: props.dialogClass,
          getContainer: modalContainer.value,
          mask: modalMask.value,
          wrapClassName: modalWrapClass.value,
          style: dialogStyle.value,
          maskProps: modalMaskProps.value,
          'onUpdate:visible': updateVisible,
          onChange,
          onCancel,
          onOk
        },
        {
          ...slots,
          title: () => {
            const titleNode = slots.title ? slots.title() : props.title;
            const nodes = [h('div', { class: 'guns-modal-title-label' }, titleNode)];
            if (props.maxable) {
              const maxIconNode = slots.maxIcon
                ? slots.maxIcon({ fullscreen: isFullscreen.value })
                : h(isFullscreen.value ? CompressOutlined : ExpandOutlined);
              nodes.push(
                h(
                  'div',
                  {
                    class: 'guns-modal-icon-fullscreen',
                    onClick: () => toggleFullscreen()
                  },
                  maxIconNode
                )
              );
            }
            return h('div', { ref: titleRef, class: 'guns-modal-title-group' }, nodes);
          }
        }
      );
    };
  }
});
</script>
<style lang="less">
@import url('./style/index.less');
</style>
