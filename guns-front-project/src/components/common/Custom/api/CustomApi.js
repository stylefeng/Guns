import Request from '@/utils/request/request-util';

/**
 * 后台管理 -自定义列api
 *
 */
export class CustomApi {
  /**
   * 获取用户针对某个业务的table的列宽配置
   * @param {*} params
   * @returns
   */
  static getUserConfig(params) {
    return Request.getAndLoadData('/sysTableWidth/getUserConfig', params);
  }
  /**
   * 添加用户针对某个table的列属性配置
   * @param {*} params
   * @returns
   */
  static setTableWidth(params) {
    return Request.post('/sysTableWidth/setTableWidth', params);
  }
}
