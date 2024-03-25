import Request from '@/utils/request/request-util';

/**
 * 登录日志相关api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class LoginLogApi {
  /**
   * 清空全部登录日志
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static deleteAll() {
    return Request.get('/loginLog/deleteAll');
  }

  /**
   * 获取登录日志列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/loginLog/page', params);
  }
}
