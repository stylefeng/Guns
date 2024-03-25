import Request from '@/utils/request/request-util';

/**
 * 监控数据的api
 *
 * @author fengshuonan
 * @date 2021/4/15 11:41
 */
export class MonitorApi {
  /**
   * 获取监控数据
   *
   * @author fengshuonan
   * @date 2021/4/15 11:43
   */
  static getSystemInfo(params) {
    return Request.getAndLoadData('/getSystemInfo', params);
  }
}
