/**
 * 存放当前用户未读消息
 */
import { defineStore } from 'pinia';

export const useNoticeStore = defineStore({
  id: 'notice',
  state: () => ({
    // 用户未读消息列表
    unReadNoticeList: [],
    isMore: false,
  }),
  getters: {},
  actions: {
    /**
     * 设置是否点击更多
     * @param {*} value 
     */
    setIsMore(value) {
      this.isMore = value;
    },
    /**
     * 添加未读的系统消息
     *
     * @author fengshuonan
     * @date 2021/6/12 19:20
     */
    addNotice(notice) {
      let obj = {
        readFlag: 0,
        ...notice,
      }
      this.unReadNoticeList.unshift(obj);
    },

    /**
     * 设置未读消息
     *
     * @author fengshuonan
     * @date 2021/6/12 19:20
     */
    setNotice(noticeList) {
      this.unReadNoticeList = noticeList;
    },

    /**
     * 删除消息
     *
     * @author fengshuonan
     * @date 2021/6/12 19:20
     */
    removeMessage(messageId) {
      this.unReadNoticeList.splice(
        this.unReadNoticeList.findIndex(item => item.messageId === messageId),
        1
      );
    }
  }
});
