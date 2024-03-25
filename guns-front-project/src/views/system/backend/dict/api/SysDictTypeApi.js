import Request from '@/utils/request/request-util';

/**
 * 后台管理 -字典类型api
 *
 */
export class SysDictTypeApi {
  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/dictType/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/dictType/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/dictType/delete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/dictType/detail', params);
  }
  /**
   * 列表
   * @param {*} params
   * @returns
   */
  static list(params) {
    return Request.getAndLoadData('/dictType/list', params);
  }
}
