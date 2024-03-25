import Request from '@/utils/request/request-util';

/**
 * 后台管理 -我的通知公告api
 *
 */
export class MyNoticeApi {
    /**
   * 分页
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysMessage/page', params);
  }

  /**
   * 清空我的消息
   * @param {*} params
   * @returns
   */
  static cleanMyMessage(params) {
    return Request.post('/sysMessage/cleanMyMessage', params);
  }

  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/sysMessage/detail', params);
  }

  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/sysMessage/delete', params);
  }
  /**
   * 设为已读消息
   * @param {*} params
   * @returns
   */
  static setRead(params) {
    return Request.post('/sysMessage/setRead', params);
  }
  /**
   * 全部已读
   * @param {*} params
   * @returns
   */
  static setTotalRead(params) {
    return Request.post('/sysMessage/setTotalRead', params);
  }
}