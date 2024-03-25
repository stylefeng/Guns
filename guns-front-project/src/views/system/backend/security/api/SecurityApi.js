import Request from '@/utils/request/request-util';

/**
 * 后台管理 -安全策略api
 *
 */
export class SecurityApi {
  /**
   * 获取安全策略配置
   * @param {*} params
   * @returns
   */
  static getOnlineUserList(params) {
    return Request.getAndLoadData('/security/getSecurityStrategy', params);
  }

  /**
   * 更新安全策略配置
   * @param {*} params
   * @returns
   */
  static offlineUser(params) {
    return Request.post('/security/updateSecurityStrategy', params);
  }
}
