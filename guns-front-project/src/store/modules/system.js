/**
 * 系统参数相关store
 */
import { defineStore } from 'pinia';
import { ThemeApi } from '@/views/system/backend/theme/manager/api/ThemeApi';
import { LoginApi } from '@/views/login/login/api/LoginApi';

export const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    // 当前系统是否已经初始化过配置
    alreadyInitConfig: null,
    // 后台管理系统左上角Logo
    gunsMgrLogo: null,
    // 后台管理系统名称
    gunsMgrName: import.meta.env.VITE_APP_NAME,
    // 系统名称副标题
    gunsSubTitle: import.meta.env.VITE_APP_NAME,
    // 备案编号
    gunsMgrBeiNo: null,
    // 备案跳转url
    gunsMgrBeiUrl: 'https://beian.miit.gov.cn/',
    // favicon图标地址
    gunsMgrFavicon: null,
    // 页脚文字
    gunsMgrFooterText: null,
    // 登录页面背景图片
    gunsMgrLoginBackgroundImg: null,
    //api基础路径
    baseUrl: '',
  }),
  getters: {},
  actions: {
    /**
     * 更新初始化状态
     *
     * @param {Boolean} initFlag 是否初始化了系统
     * @author fengshuonan
     * @date 2021/6/12 19:20
     */
    updateInitFlag(initFlag) {
      this.alreadyInitConfig = initFlag;
    },

    /**
     * 更新初始化状态
     *
     * @author fengshuonan
     * @date 2021/6/12 19:20
     */
    loadThemeInfo() {
      return new Promise(resolve => {
        if (this.gunsMgrLogo != null) {
          resolve(Object.assign({}, this.$state));
        } else {
          ThemeApi.getCurrentThemeInfo().then(result => {
            this.gunsMgrLogo = result.gunsMgrLogo;
            this.gunsMgrName = result.gunsMgrName;
            this.gunsSubTitle = result.otherConfigs?.gunsSubTitle;
            this.gunsMgrBeiNo = result.gunsMgrBeiNo;
            this.gunsMgrBeiUrl = result.gunsMgrBeiUrl;
            this.gunsMgrFavicon = result.gunsMgrFavicon;
            this.gunsMgrFooterText = result.gunsMgrFooterText;
            this.gunsMgrLoginBackgroundImg = result.gunsMgrLoginBackgroundImg;
            resolve(result);
          });
        }
      });
    },

    /**
     * 设置基础url
     *
     * @author fengshuonan
     * @date 2022/3/4 10:37
     */
    loadBaseUrl() {
      return new Promise(resolve => {
        LoginApi.getBackendDeployUrl().then(result => {
          this.baseUrl = result;
          resolve(result);
        });
      });
    },
  }
});
