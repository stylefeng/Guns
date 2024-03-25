import Request from '@/utils/request/request-util';

/**
 * 后台管理 -通知公告api
 *
 */
export class NoticeApi {
    /**
   * 分页
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysNotice/page', params);
  }

  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/sysNotice/add', params);
  }

  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysNotice/detail', params);
  }

  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/sysNotice/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysNotice/delete', params);
  }
  /**
   * 删除批量
   * @param {*} params
   * @returns
   */
  static batchDelete(params) {
    return Request.post('/sysNotice/batchDelete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysNotice/detail', params);
  }
  /**
   * 撤回通知
   * @param {*} params
   * @returns
   */
  static retractNotice(params) {
    return Request.post('/sysNotice/retractNotice', params);
  }
  /**
   * 发送通知
   * @param {*} params
   * @returns
   */
  static publishNotice(params) {
    return Request.post('/sysNotice/publishNotice', params);
  }
}