import Request from '@/utils/request/request-util';

/**
 * 后台管理 - 资源api
 *
 */
export class ResourceApi {
  /**
   * 获取资源列表
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/resource/pageList', params);
  }
}
