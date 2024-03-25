import Request from '@/utils/request/request-util';

/**
 * 主题模板属性api
 *
 * @author fengshuonan
 * @date 2021/12/20 11:19:37
 */
export class ThemeTemplateFieldApi {
  /**
   * 获取字段列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysThemeTemplateField/findPage', params);
  }

  /**
   * 增加主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:21:42
   */
  static add(params) {
    return Request.post('/sysThemeTemplateField/add', params);
  }

  /**
   * 删除主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:22:55
   */
  static del(params) {
    return Request.post('/sysThemeTemplateField/del', params);
  }

  /**
   * 编辑主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:24:57
   */
  static edit(params) {
    return Request.post('/sysThemeTemplateField/edit', params);
  }

  /**
   * 查看主题模板属性详情
   *
   * @author fengshuonan
   * @date 2021/12/20 11:33:37
   */
  static detail(params) {
    return Request.getAndLoadData('/sysThemeTemplateField/detail', params);
  }

  /**
   * 查询系统主题模板属性列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:13:22
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysThemeTemplateField/findPage', params);
  }

  /**
   * 查询系统主题模板属性已有关系列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:14:18
   */
  static findRelList(params) {
    return Request.getAndLoadData('/sysThemeTemplateField/findRelList', params);
  }

  /**
   * 查询系统主题模板属性未有关系列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:15:16
   */
  static findNotRelList(params) {
    return Request.getAndLoadData('/sysThemeTemplateField/findNotRelList', params);
  }
}
