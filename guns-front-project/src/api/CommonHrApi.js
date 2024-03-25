import Request from '@/utils/request/request-util';

export class CommonHrApi {
  /**
   * 批量获取组织机构信息
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   * orgIdList  组织id列表
   */
  static getOrgListName(params) {
    return Request.post('/common/org/getOrgListName', params);
  }

  /**
   * 批量获取用户信息
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   * userIdList  用户id列表
   */
  static getUserListName(params) {
    return Request.post('/common/sysUser/batchGetName', params);
  }

  /**
   * 批量获取职务信息
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   * positionIdList  职务id列表
   */
  static getPositionListName(params) {
    return Request.post('/common/position/batchGetName', params);
  }

  /**
   * 业务排序获取
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static getBusinessMaxSort(code) {
    return Request.getAndLoadData('/common/getBusinessMaxSort', { code: code });
  }
}
