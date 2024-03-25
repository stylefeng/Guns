import Request from '@/utils/request/request-util';

/**
 * 后台管理 -配置类型api
 *
 */
export class SysConfigTypeApi {
  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/sysConfigType/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/sysConfigType/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysConfigType/delete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysConfigType/detail', params);
  }
  /**
   * 列表
   * @param {*} params
   * @returns
   */
  static list(params) {
    return Request.getAndLoadData('/sysConfigType/list', params);
  }
}
