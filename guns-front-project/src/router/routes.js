import { menuToRoutes, eachTreeData } from '@/utils/common/menu-util';
import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting';
import GunsLayout from '@/layout/index.vue';
import RedirectLayout from '@/components/RedirectLayout';
const modules = import.meta.glob('/src/views/**/**.vue');

/**
 * 静态路由
 */
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    component: () => import('@/views/forget/index.vue'),
    meta: { title: '忘记密码' }
  },
  {
    path: '/sso',
    component: () => import('@/views/login/sso.vue'),
    meta: { title: '单点登录' }
  },
  {
    path: '/init',
    component: () => import('@/views/init/index.vue'),
    meta: { title: '初始化系统配置' }
  },
  {
    path: '/tokenLogin',
    component: () => import('@/views/login/token.vue'),
    meta: { title: 'token登录' }
  },
  // 404
  {
    path: '/:path(.*)*',
    component: () => import('@/components/Exception/404/index.vue')
  }
];

/**
 * 动态路由
 * @param menus 菜单数据
 * @param homePath 主页地址
 * @param isNeedMenuTree 是否需要左侧菜单
 */
export function getMenuRoutes(menus, homePath, isNeedMenuTree = true) {
  const routes = [
    // 用于刷新的路由
    {
      path: REDIRECT_PATH + '/:path(.*)',
      component: RedirectLayout,
      meta: { hideFooter: true }
    }
  ];
  // 路由铺平处理
  eachTreeData(menuToRoutes(menus, getComponent), (route) => {
    routes.push({ ...route, children: void 0 });
  });
  return {
    path: LAYOUT_PATH,
    component: isNeedMenuTree ? GunsLayout : null,
    redirect: HOME_PATH ?? homePath,
    children: routes
  };
}

/**
 * 解析路由组件
 * @param component 组件名称
 */
export function getComponent(component) {
  if (component) {
    const module = modules[`/src/views/${component}.vue`];
    if (!module) {
      return modules[`/src/views/${component}/index.vue`];
    }
    return module;
  }
}
