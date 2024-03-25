import Request from '@/utils/request/request-util';

/**
 * 主题模板api
 *
 * @author fengshuonan
 * @date 2021/12/20 11:36:02
 */
export class ThemeTemplateApi {
  /**
   * 获取操作日志列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysThemeTemplate/findPage', params);
  }

  /**
   * 增加主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:38:37
   */
  static add(params) {
    return Request.post('/sysThemeTemplate/add', params);
  }

  /**
   * 编辑主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:38:53
   */
  static edit(params) {
    return Request.post('/sysThemeTemplate/edit', params);
  }

  /**
   * 删除主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:40:30
   */
  static del(params) {
    return Request.post('/sysThemeTemplate/del', params);
  }

  /**
   * 查询主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:45:45
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysThemeTemplate/findPage', params);
  }

  /**
   * 查询主题模板列表
   *
   * @author fengshuonan
   * @date 2021/12/29 09:15:48
   */
  static findList(params) {
    return Request.getAndLoadData('/sysThemeTemplate/findList', params);
  }

  /**
   * 修改主题模板状态
   *
   * @author fengshuonan
   * @date 2021/12/20 11:49:24
   */
  static updateTemplateStatus(params) {
    return Request.post('/sysThemeTemplate/updateStatus', params);
  }

  /**
   * 查询主题模板详情
   *
   * @author fengshuonan
   * @date 2021/12/20 11:53:17
   */
  static detail(params) {
    return Request.getAndLoadData('/sysThemeTemplate/detail', params);
  }
}
