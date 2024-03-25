import Request from '@/utils/request/request-util';

/**
 * 个人信息api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:03
 */
export class OrgApi {
  /**
   * 首页企业概况统计
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static orgInfoStat(params) {
    return Request.getAndLoadData('/org/statInfo', params);
  }

}
