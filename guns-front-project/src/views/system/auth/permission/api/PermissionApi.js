import Request from '@/utils/request/request-util';

/**
 * 后台管理 - 权限api
 *
 */
export class PermissionApi {
  /**
   * 获取角色绑定的权限列表
   * @param {*} params
   * @returns
   */
  static getRoleBindPermission(params) {
    return Request.getAndLoadData('/permission/getRoleBindPermission', params);
  }

  /**
   * 获取所有角色列表
   * @param {*} params
   * @returns
   */
  static getRoleList(params) {
    return Request.getAndLoadData('/permission/getRoleList', params);
  }

  /**
   * 更新角色绑定权限
   * @param {*} params
   * @returns
   */
  static updateRoleBindPermission(params) {
    return Request.post('/permission/updateRoleBindPermission', params);
  }

  /**
   * 获取角色的数据权限详情
   * @param {*} params
   * @returns
   */
  static getRoleBindDataScope(params) {
    return Request.getAndLoadData('/permission/getRoleBindDataScope', params);
  }

  /**
   * 角色绑定数据权限的配置
   * @param {*} params
   * @returns
   */
  static updateRoleBindDataScope(params) {
    return Request.post('/permission/updateRoleBindDataScope', params);
  }

  /**
   * 获取角色的权限限制列表
   * @param {*} params
   * @returns
   */
  static getRoleLimit(params) {
    return Request.getAndLoadData('/roleLimit/getRoleLimit', params);
  }

  /**
   * 绑定角色权限的限制列表
   * @param {*} params
   * @returns
   */
  static bindRoleLimit(params) {
    return Request.post('/roleLimit/bindRoleLimit', params);
  }
}
