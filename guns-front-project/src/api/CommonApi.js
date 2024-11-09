import Request from '@/utils/request/request-util';

/**
 * 公共api
 *
 */
export class CommonApi {
  /**
   * 获取DevOps系统编码
   * @param {*} params
   * @returns
   */
  static getSystemCode(params) {
    return Request.get('/devops/getSystemCode', params);
  }
  
  /**
   * 获取用户选择组件单选人的名称
   * @returns userId
   */
  static getUserName(params) {
    return Request.get('/bizFormComponentProvider/getUserName', params);
  }

  /**
   * 获取组织机构选择组件机构的名称
   * @returns orgId
   */
  static getOrgName(params) {
    return Request.get('/bizFormComponentProvider/getOrgName', params);
  }

  /**
   * 获取角色选择的名称
   * @returns roleId
   */
  static getRoleName(params) {
    return Request.get('/bizFormComponentProvider/getRoleName', params);
  }

  /**
   * 获取职位选择的名称
   * @returns positionId
   */
  static getPositionName(params) {
    return Request.get('/bizFormComponentProvider/getPositionName', params);
  }

  /**
   * 获取字典选择的名称
   * @returns dictId
   */
  static getDictName(params) {
    return Request.get('/bizFormComponentProvider/getDictName', params);
  }
}
