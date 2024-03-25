/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';
import { formatMenus, toTreeData, eachTreeData } from '@/utils/common/menu-util';
import { findTree } from '@/utils/common/util';
import { getUserInfo } from '@/layout/api/LayoutApi';
import { SysConfigApi } from '@/views/system/backend/sys-config/api/SysConfigApi';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前激活应用
    activeApp: null,
    // 应用菜单列表
    appList: []
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */
    async fetchUserInfo(path) {
      // 调用获取用户信息接口
      const result = await getUserInfo().catch(() => undefined);
      if (!result) {
        return {};
      }
      // 用户信息
      this.info = result;
      // 用户权限编码集合
      this.authorities = result.permissionCodeList ?? [];
      // 应用菜单列表
      this.appList = result.userAppInfoList;
      // 当前激活的应用
      let activeApp = result.userAppInfoList?.filter(m => m.currentSelectFlag)[0];
      // 如果sessionStorage中存在激活应用
      if (sessionStorage.getItem('ACTIVE_APP')) {
        let currentApp = {};
        // 获取当前路由所在的应用
        this.appList &&
          this.appList.forEach(item => {
            let currentRou = findTree(item.menuList, path, 'path');
            if (currentRou && currentRou.length) {
              currentApp = item;
              activeApp = item;
            }
          });
        // 如果当前路由不存在当前应用下，切换应用
        if (!(currentApp && currentApp.appId && currentApp.appId == activeApp.appId)) {
          await SysConfigApi.updateUserOrgOrApp({ newAppId: currentApp.appId });
          this.setActiveApp(currentApp);
        }
      } else {
        // 当前激活应用
        this.setActiveApp(activeApp);
      }
      
      // 当前应用的菜单和首页
      const { menus, homePath } = formatMenus(
        toTreeData({
          data: activeApp.menuList?.map(d => {
            return {
              ...d,
              path: d.menuType == 40 ? 'http://' + location.host + d.path : d.path
            };
          }),
          idField: 'menuId',
          parentIdField: 'menuParentId'
        })
      );
      eachTreeData(menus, d => {
        if (d.redirect && d.redirect.indexOf('http:') != '-1') {
          d.path = d.redirect
        }
      });
      // 当前激活应用的菜单列表
      this.menus = menus;
      // 当前用户的所有菜单列表
      let allMenuList = [];
      result.userAppInfoList?.forEach(m => {
        allMenuList.push(...m.menuList);
      });
      // 不需要左侧树的菜单列表
      let noNeedLeftMenuList = [];
      getNoNeedLeftTreeMenuList(allMenuList, noNeedLeftMenuList);
      // 用户菜单, 过滤掉按钮类型并转为children形式
      const needMenusData = formatMenus(allMenuList ?? []);
      const needMenus = needMenusData.menus ?? [];
      // 不需要左侧菜单列表
      const noNeedMenusData = formatMenus(noNeedLeftMenuList ?? []);
      const noNeedMenus = noNeedMenusData.menus ?? [];
      return { needMenus, noNeedMenus, homePath };

      // 获取不需要左侧树的菜单列表
      function getNoNeedLeftTreeMenuList(arr, noNeedLeftMenuList) {
        if (arr && arr.length) {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].menuType == 20) {
              noNeedLeftMenuList.push(arr[i]);
              arr.splice(i, 1);
            } else if (arr[i].children && arr[i].children.length) {
              getNoNeedLeftTreeMenuList(arr[i].children, noNeedLeftMenuList);
            }
          }
        }
      }
    },
    /**
     * 更新用户信息
     */
    setInfo(value) {
      this.info = value;
    },
    /**
     * 更新当前激活应用
     * @param {*} value
     */
    setActiveApp(value) {
      sessionStorage.setItem('ACTIVE_APP', JSON.stringify(value));
      this.activeApp = value;
    },
    /**
     * 更新菜单
     * @param {*} value
     */
    setMenus(value) {
      this.menus = value;
    }
  }
});
