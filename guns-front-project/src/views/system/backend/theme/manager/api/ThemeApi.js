import Request from '@/utils/request/request-util';

/**
 * 主题api
 *
 * @author fengshuonan
 * @date 2021/12/20 13:42:14
 */
export class ThemeApi {
  /**
   * 获取主题列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysTheme/findPage', params);
  }

  /**
   * 添加主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:44:51
   */
  static add(params) {
    return Request.post('/sysTheme/add', params);
  }

  /**
   * 删除主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:46:32
   */
  static del(params) {
    return Request.post('/sysTheme/del', params);
  }

  /**
   * 修改主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:47:43
   */
  static edit(params) {
    return Request.post('/sysTheme/edit', params);
  }

  /**
   * 查询主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:49:15
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysTheme/findPage', params);
  }

  /**
   * 查询主题详情
   *
   * @author fengshuonan
   * @date 2021/12/20 13:50:38
   */
  static detail(params) {
    return Request.getAndLoadData('/sysTheme/detail', params);
  }

  /**
   * 修改主题启用状态
   *
   * @author fengshuonan
   * @date 2021/12/20 13:51:25
   */
  static updateThemeStatus(params) {
    return Request.post('/sysTheme/updateStatus', params);
  }

  /**
   * 获取当前主题
   *
   * @author fengshuonan
   * @date 2022/1/12 11:52
   */
  static getCurrentThemeInfo(params) {
    return Request.getAndLoadData('/theme/currentThemeInfo', params);
  }
}
