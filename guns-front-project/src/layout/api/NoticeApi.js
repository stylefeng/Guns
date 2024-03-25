import Request from '@/utils/request/request-util';

/**
 * 系统通知管理
 *
 * @author fengshuonan
 * @date 2021/6/12 17:51
 */
export class NoticeApi {
  /**
   * 获取通知列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysMessage/page', params);
  }

  /**
   * 获取当前用户未读消息
   *
   * @author fengshuonan
   * @date 2021/6/12 18:20
   */
  static getUnReadMessages() {
    return Request.getAndLoadData('/sysMessage/unReadMessageList');
  }

  /**
   * 将当前用户未读消息标记未已读
   *
   * @author fengshuonan
   * @date 2021/6/12 18:20
   */
  static setTotalRead() {
    return Request.post('/sysMessage/setTotalRead');
  }

  /**
   * 批量标记消息状态为已读
   *
   * @param {List<String>} param.messageIdList 消息id集合
   * @author fengshuonan
   * @date 2021/6/12 18:20
   */
  static setRead(param) {
    return Request.post('/sysMessage/setRead', param);
  }

  /**
   * 删除通知
   *
   * @author fengshuonan
   * @date 2021/6/14 21:17
   */
  static deleteNotice(param) {
    return Request.post('/sysNotice/delete', param);
  }

  /**
   * 全部标记未已读状态
   *
   * @author fengshuonan
   * @date 2021/6/15 23:09
   */
  static setAlreadyReadState() {
    return Request.get('/sysMessage/allMessageReadFlag');
  }

  /**
   * 删除我的消息
   *
   * @author fengshuonan
   * @date 2021/6/15 23:13
   */
  static deleteMessage(params) {
    return Request.post('/sysMessage/delete', params);
  }

  /**
   * 查看消息详情
   *
   * @author fengshuonan
   * @date 2021/6/15 23:13
   */
  static messageDetail(params) {
    return Request.getAndLoadData('/sysMessage/detail', params);
  }
}
