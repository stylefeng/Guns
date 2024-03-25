import Request from '@/utils/request/request-util';

/**
 * 后台管理 -授权api
 *
 */
export class EmpowerApi {
  /**
   * 获取用户的角色授权信息列表
   * @param {*} params
   * @returns
   */
  static getUserAssignList(params) {
    return Request.get('/sysRoleAssign/getUserAssignList', params);
  }

  /**
   * 绑定或取消绑定角色
   * @param {*} params
   * @returns
   */
  static changeRoleSelect(params) {
    return Request.post('/sysRoleAssign/changeRoleSelect', params);
  }

  /**
   * 修改用户针对某个公司的是否启用状态
   * @param {*} params
   * @returns
   */
  static changeStatus(params) {
    return Request.post('/sysRoleAssign/changeStatus', params);
  }

  /**
   * 删除用户机构的绑定
   * @param {*} params
   * @returns
   */
  static removeUserOrgBind(params) {
    return Request.post('/sysRoleAssign/removeUserOrgBind', params);
  }

  /**
   * 添加用户机构的绑定
   * @param {*} params
   * @returns
   */
  static addUserOrgBind(params) {
    return Request.post('/sysRoleAssign/addUserOrgBind', params);
  }

  /**
   * 删除全部机构绑定
   * @param {*} params
   * @returns
   */
  static deleteAllOrgBind(params) {
    return Request.post('/sysRoleAssign/deleteAllOrgBind', params);
  }

  /**
   * 禁用全部组织机构
   * @param {*} params
   * @returns
   */
  static disableAllOrg(params) {
    return Request.post('/sysRoleAssign/disableAllOrg', params);
  }

  /**
   * 同步到其他公司绑定信息
   * @param {*} params
   * @returns
   */
  static syncOtherOrgStatusAndBusinessRole(params) {
    return Request.post('/sysRoleAssign/syncOtherOrgStatusAndBusinessRole', params);
  }
}
