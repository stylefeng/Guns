import Request from '@/utils/request/request-util';

/**
 * 字典数据api
 *
 * @author chenjinlong
 * @date 2021/4/13 09:52
 */
export class SysDictDataApi {
  /**
   * 获取字典类型分页列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findDictPage(params) {
    return Request.getAndLoadData('/dict/page', params);
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static add(params) {
    return Request.post('/dict/add', params);
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static del(params) {
    return Request.post('/dict/delete', params);
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static batchDel(params) {
    return Request.post('/dict/batchDelete', params);
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static edit(params) {
    return Request.post('/dict/edit', params);
  }
}
