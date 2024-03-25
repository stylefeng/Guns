import Request from '@/utils/request/request-util';

/**
 * 后台管理 -角色api
 *
 */
export class RoleApi {
    /**
   * 分页
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysRole/page', params);
  }

  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/sysRole/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/sysRole/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysRole/delete', params);
  }
  /**
   * 删除批量
   * @param {*} params
   * @returns
   */
  static batchDelete(params) {
    return Request.post('/sysRole/batchDelete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysRole/detail', params);
  }
}