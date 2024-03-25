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
}
