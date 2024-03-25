import Request from '@/utils/request/request-util';

/**
 * 字典类型api
 *
 * @author chenjinlong
 * @date 2021/4/13 09:52
 */
export class SysDictTypeApi {
  /**
   * 获取字典类型分页列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findDictTypePage(params) {
    return Request.getAndLoadData('/dictType/page', params);
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static add(params) {
    return Request.post('/dictType/add', params);
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static del(params) {
    return Request.post('/dictType/delete', params);
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static batchDel(params) {
    return Request.post('/dictType/batchDelete', params);
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static edit(params) {
    return Request.post('/dictType/edit', params);
  }

  /**
   * 获取字典类型下的所有字典
   *
   * @author fengshuonan
   * @date 2021/4/19 22:42
   */
  static getDictListByParams(params) {
    return Request.getAndLoadData('/dict/list', params);
  }

  /**
   * 获取所有字典类型列表
   *
   * @author fengshuonan
   * @date 2021/4/20 10:41
   */
  static getDictTypeList(params) {
    return Request.getAndLoadData('/dictType/list', params);
  }
}
