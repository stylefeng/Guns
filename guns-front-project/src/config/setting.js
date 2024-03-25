// 是否使用验证码
export const CAPTCHA_FLAG = false;

// 是否开启单点登录
export const SSO_FLAG = false;

// 是否使用多租户
export const SAAS_FLAG = true;

// 是否显示修改主题
export const SHOW_THEME = true;

// 是否显示修改多语言
export const SHOW_I18n = true;

//  是否使用图形验证码
export const DRAW_CAPTCHA_FLAG = false;
// SQL监控地址
export const SQL_MONITOR_URL = 'http://localhost:8080/druid';

// 接口地址前缀
export const API_BASE_PREFIX = import.meta.env.VITE_API_PREFIX;

// 项目名称
export const PROJECT_NAME = import.meta.env.VITE_APP_NAME;

// 单点服务器
export const SSO_HOST = import.meta.env.VITE_APP_SSO_HOST;

// 单点客户端id标识
export const SSO_CLIENT_ID = import.meta.env.VITE_APP_SSO_ID;

// 单点客户端id标识
export const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_HOST;

// context-path
export const BASE_URL = import.meta.env.BASE_URL;

// 不显示侧栏的路由
export const HIDE_SIDEBARS = [];

// 不显示页脚的路由
export const HIDE_FOOTERS = [''];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = ['/system/user-info'];

// 不需要登录的路由
export const WHITE_LIST = ['/login', '/forget', '/sso', '/tokenLogin'];

// 开启 KeepAlive 后仍然不需要缓存的路由地址
export const KEEP_ALIVE_EXCLUDES = [];

// 直接指定菜单数据
export const USER_MENUS = undefined;

// 首页名称, 为空则取第一个菜单的名称
export const HOME_TITLE = undefined;

// 首页路径, 为空则取第一个菜单的地址
export const HOME_PATH = undefined;

// 外层布局的路由地址
export const LAYOUT_PATH = '/';

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 开启页签栏是否缓存组件
//export const TAB_KEEP_ALIVE = !import.meta.env.DEV;
export const TAB_KEEP_ALIVE = true;

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token 存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme';

// i18n 缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';

// 是否开启国际化功能
export const I18N_ENABLE = false;

// 消息类型常量
export const WEBSOCKET_MESSAGE_TYPE = {
  // 服务端发过来的消息类型
  server: {
    // 系统通知消息类型
    SYS_NOTICE_MSG_TYPE: 'SYS_NOTICE'
  },
  // 发送给服务器的消息类型
  client: {
    // 创建websocket连接时候的鉴权，发送token
    USER_CONNECTION_AUTHENTICATION: '200000'
  }
};

// 登录接口-是否需要rsa加密
export const IS_NEED_RSA = false;
// 是否显示新的流程设计
export const SHOW_NEW_FLOW_DESIGN = false;