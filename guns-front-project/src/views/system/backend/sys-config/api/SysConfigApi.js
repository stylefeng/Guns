import Request from '@/utils/request/request-util';

/**
 * 后台管理 -配置管理api
 *
 */
export class SysConfigApi {
  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/sysConfig/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/sysConfig/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysConfig/delete', params);
  }
  /**
   * 删除批量
   * @param {*} params
   * @returns
   */
  static batchDelete(params) {
    return Request.post('/sysConfig/batchDelete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysConfig/detail', params);
  }
  /**
   * 分页列表
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysConfig/page', params);
  }

  /**
   * 获取系统配置是否已经初始化
   *
   * @return {boolean} true-已经初始化，false-未初始化
   * @author fengshuonan
   * @date 2021/4/9 13:24
   */
  static async getInitConfigFlag() {
    return await Request.getAndLoadData('/sysConfig/getInitConfigFlag');
  }

  /**
   * 获取需要初始化的配置列表
   *
   * @author fengshuonan
   * @date 2021/4/9 13:24
   */
  static async getInitConfigList() {
    return await Request.getAndLoadData('/sysConfig/getInitConfigList');
  }

  /**
   * 初始化系统配置参数
   *
   * @author fengshuonan
   * @date 2021/7/9 11:04
   */
  static async initConfig(params) {
    return await Request.post('/sysConfig/initConfig', params);
  }

  /**
   * 更新当前应用
   *
   * @author fengshuonan
   * @date 2021/7/9 11:04
   */
  static async updateUserOrgOrApp(params) {
    return await Request.post('/updateUserOrgOrApp', params);
  }
}
