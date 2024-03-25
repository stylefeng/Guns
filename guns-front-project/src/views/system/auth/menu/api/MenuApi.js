import Request from '@/utils/request/request-util';

/**
 * 后台管理 - 菜单api
 *
 */
export class MenuApi {
  /**
   * 添加菜单
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/sysMenu/add', params);
  }
  /**
   * 编辑菜单
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/sysMenu/edit', params);
  }
  /**
   * 删除菜单
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysMenu/delete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysMenu/detail', params);
  }
  /**
   * 获取菜单管理界面的每个应用组下的菜单信息
   * @param {*} params
   * @returns
   */
  static getAppMenuGroupDetail(params) {
    return Request.getAndLoadData('/sysMenu/getAppMenuGroupDetail', params);
  }
  /**
   * 调整菜单上下级机构和菜单的顺序
   * @param {*} params
   * @returns
   */
  static updateMenuTree(params) {
    return Request.post('/sysMenu/updateMenuTree', params);
  }


  /**  菜单下的功能接口   */

  /**
   * 添加菜单功能
   * @param {*} params
   * @returns
   */
  static optionAdd(params) {
    return Request.post('/sysMenuOptions/add', params);
  }
  /**
   * 编辑菜单功能
   * @param {*} params
   * @returns
   */
  static optionEdit(params) {
    return Request.post('/sysMenuOptions/edit', params);
  }
  /**
   * 删除菜单功能
   * @param {*} params
   * @returns
   */
  static optionDelete(params) {
    return Request.post('/sysMenuOptions/delete', params);
  }
  /**
   * 分页查询-菜单功能
   * @param {*} params
   * @returns
   */
  static optionPage(params) {
    return Request.getAndLoadData('/sysMenuOptions/page', params);
  }
  /**
   * 列表查询-菜单功能
   * @param {*} params
   * @returns
   */
  static optionList(params) {
    return Request.getAndLoadData('/sysMenuOptions/list', params);
  }
  /**
   * 获取拼音
   * @param {*} params
   * @returns
   */
  static getPinyin(params) {
    return Request.getAndLoadData('/common/getPinyin', params);
  }
  /**
   * 获取所有业务列表
   * @param {*} params
   * @returns
   */
  static getProjectBusinessList(params) {
    return Request.getAndLoadData('/sysMenu/getProjectBusinessList', params);
  }
}