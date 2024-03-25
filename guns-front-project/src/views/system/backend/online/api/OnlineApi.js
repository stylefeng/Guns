import Request from '@/utils/request/request-util';

/**
 * 后台管理 -在线用户api
 *
 */
export class OnlineApi {
  /**
   * 列表
   * @param {*} params
   * @returns
   */
  static getOnlineUserList(params) {
    return Request.getAndLoadData('/getOnlineUserList', params);
  }

  /**
   * 踢下线
   * @param {*} params
   * @returns
   */
  static offlineUser(params) {
    return Request.post('/offlineUser', params);
  }
}
