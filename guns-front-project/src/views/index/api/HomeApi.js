import Request from '@/utils/request/request-util';

/**
 * 个人信息api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:03
 */
export class HomeApi {
  /**
   * 获取最近操作记录
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static getRecentLogs(params) {
    return Request.getAndLoadData('/homePage/getRecentLogs', params);
  }


  /**
   * 获取用户常用功能
   * @param params
   * @returns {Promise<*>}
   */
  static getUserAppList(params) {
    return Request.getAndLoadData('/portalUserApp/getUserAppList', params);
  }

  /**
   * 更新用户的常用功能
   * @param params
   * @returns {Promise<*>}
   */
  static updateUserAppList(params) {
    return Request.post('/portalUserApp/updateUserAppList', params);
  }

}
