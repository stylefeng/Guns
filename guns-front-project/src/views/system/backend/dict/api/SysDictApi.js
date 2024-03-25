import Request from '@/utils/request/request-util';

/**
 * 后台管理 -字典api
 *
 */
export class SysDictApi {
  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/dict/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/dict/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/dict/delete', params);
  }
  /**
   * 删除批量
   * @param {*} params
   * @returns
   */
  static batchDelete(params) {
    return Request.post('/dict/batchDelete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/dict/detail', params);
  }
  /**
   * 树形列表
   * @param {*} params
   * @returns
   */
  static tree(params) {
    return Request.getAndLoadData('/dict/getDictTreeList', params);
  }
  /**
   * 列表
   * @param {*} params
   * @returns
   */
  static list(params) {
    return Request.getAndLoadData('/dict/list', params);
  }
  /**
   * 更新整个字典树结构，用来更新上下级结构和顺序
   * @param {*} params
   * @returns
   */
  static updateDictTree(params) {
    return Request.post('/dict/updateDictTree', params);
  }
}
