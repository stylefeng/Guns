import Request from '@/utils/request/request-util';

/**
 * 安全日志相关api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class SecurityLogApi {
  /**
   * 获取安全日志列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/logSecurity/page', params);
  }
}
