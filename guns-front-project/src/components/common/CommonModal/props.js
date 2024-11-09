export const proProps = {
    // 是否可以拖动
    movable: {
        type: Boolean,
        default: true
    },
    // 是否可以拖出边界
    moveOut: Boolean,
    // 如果可以拖出边界是否只允许下右拖出
    moveOutPositive: Boolean,
    // 是否可以拉伸
    resizable: [Boolean, String],
    // 是否显示最大化切换按钮
    maxable: Boolean,
    // 是否支持打开多个
    multiple: Boolean,
    // 是否默认全屏
    fullscreen: Boolean,
    // 是否限制在主体内部
    inner: Boolean,
    // 是否在弹窗关闭后重置位置和大小
    resetOnClose: {
        type: Boolean,
        default: true
    },
    // 遮罩的类名
    maskClass: String,
    // 初始位置
    position: [String, Object]
};

export const antCommonProps = {
    // Modal 是否垂直居中
    centered: Boolean,
    // Modal 是否显示关闭按钮
    closable: {
        type: Boolean,
        default: true
    },
    // 关闭时销毁 Modal 里的子元素
    destroyOnClose: Boolean,
    // 强制渲染 Modal
    forceRender: Boolean,
    // 是否支持键盘 esc 关闭
    keyboard: {
        type: Boolean,
        default: false
    },
    // 是否展示遮罩
    mask: {
        type: Boolean,
        default: true
    },
    // 点击蒙层是否允许关闭
    maskClosable: {
        type: Boolean,
        default: true
    },
    // 遮罩样式
    maskStyle: Object,
    // 对话框外层容器的类名
    wrapClassName: String,
    // 设置 Modal 的 z-index
    zIndex: {
        type: Number,
        default: 1000
    },
    // 可用于设置浮层的类名
    dialogClass: String
};

export const antProps = {
    ...antCommonProps,
    afterClose: Function,
    bodyStyle: Object,
    cancelText: String,
    closeIcon: Object,
    confirmLoading: Boolean,
    footer: String,
    getContainer: [
        Boolean,
        String,
        Object,
        Function
    ],
    okText: String,
    okType: String,
    okButtonProps: Object,
    cancelButtonProps: Object,
    title: String,
    visible: Boolean,
    width: {
        type: [String, Number],
        default: 520
    },
    style: Object
};

export const commonProps = {
    ...antCommonProps,
    ...proProps
};

export default {
    ...antProps,
    ...proProps
};
