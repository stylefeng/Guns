export default {
  // 菜单数据
  menus: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 页签数据
  tabs: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 是否折叠侧栏菜单
  collapse: Boolean,
  // 是否折叠侧栏一级菜单
  sideNavCollapse: Boolean,
  // 内容区域是否全屏
  bodyFullscreen: Boolean,
  // 是否显示侧栏折叠按钮
  showCollapse: {
    type: Boolean,
    default: true
  },
  // 是否显示刷新按钮
  showRefresh: {
    type: Boolean,
    default: false
  },
  // 是否显示面包屑导航
  showBreadcrumb: {
    type: Boolean,
    default: true
  },
  // 是否显示全局页脚
  showFooter: Boolean,
  // 是否需要返回顶部组件
  showBackTop: {
    type: Boolean,
    default: true
  },
  // 顶栏风格, light | dark | primary
  headStyle: {
    type: String,
    default: 'light',
    validator: (value) => {
      return ['light', 'dark', 'primary'].includes(value);
    }
  },
  // 侧栏风格, light | dark
  sideStyle: {
    type: String,
    default: 'dark',
    validator: (value) => {
      return ['light', 'dark'].includes(value);
    }
  },
  // 布局风格, side | mix
  layoutStyle: {
    type: String,
    default: 'side',
    validator: (value) => {
      return ['side', 'top', 'mix'].includes(value);
    }
  },
  // 侧栏菜单模式, default | mix
  sideMenuStyle: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'mix'].includes(value);
    }
  },
  // 是否固定主体
  fixedBody: Boolean,
  // 内容区域宽度是否铺满
  bodyFull: {
    type: Boolean,
    default: true
  },
  // logo 宽度是否自适应
  logoAutoSize: Boolean,
  // 侧栏是否只保持一个子菜单展开
  sideUniqueOpen: {
    type: Boolean,
    default: true
  },
  // 菜单缩进量
  inlineIndent: {
    type: Number,
    default: 16
  },
  // 面包屑导航分隔符
  breadcrumbSeparator: {
    type: String,
    default: '/'
  },
  // 返回顶部可见的滚动高度
  backTopVisibilityHeight: {
    type: Number,
    default: 200
  },
  // 内容区域全屏时是否不显示页签栏
  contentFullscreen: Boolean,
  // 是否按返回键退出内容区域全屏
  fullscreenExitOnEsc: Boolean,
  // 是否再次点击选中页签刷新
  clickReload: Boolean,
  // 项目名
  projectName: String,
  // 主页标题
  homeTitle: String,
  // 主页路由的 path
  homePath: {
    type: String,
    default: '/'
  },
  // 外层布局的路由地址
  layoutPath: {
    type: String,
    default: '/'
  },
  // 刷新路由的 path
  redirectPath: {
    type: String,
    default: '/redirect/'
  },
  // 不显示全局页脚的路由
  hideFooters: Array,
  // 不显示侧栏的路由
  hideSidebars: Array,
  // 同路由不同参数可重复打开页签的路由地址
  repeatableTabs: Array,
  // 国际化的当前语言
  locale: String,
  // 国际化的自定义菜单标题方法
  i18n: Function,
  // 侧栏默认展开的菜单 key
  sideDefaultOpeneds: Array,
  // 固定主体时切换路由自动滚动到顶部
  autoScrollTop: {
    type: Boolean,
    default: true
  },
  // 是否开启页签右键菜单
  tabContextMenu: {
    type: Boolean,
    default: true
  },
  // 是否支持页签拖动排序
  tabSortable: Boolean,
  // 是否显示页签左右滚动箭头
  tabArrow: Boolean,
  // 是否开启响应式
  styleResponsive: {
    type: Boolean,
    default: true
  }
};
