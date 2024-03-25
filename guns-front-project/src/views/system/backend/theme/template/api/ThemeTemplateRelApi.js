import Request from "@/utils/request/request-util";

/**
 * 主题模板属性关系api
 *
 * @author fengshuonan
 * @date 2021/12/27 10:18:08
 */
export class ThemeTemplateRelApi {
  /**
   * 增加系统主题属性关系
   *
   * @author fengshuonan
   * @date 2021/12/27 10:19:44
   */
  static add(params) {
    return Request.post("/sysThemeTemplateRel/add", params);
  }

  /**
   * 删除系统主题属性关系
   *
   * @author fengshuonan
   * @date 2021/12/27 10:20:54
   */
  static del(params) {
    return Request.post("/sysThemeTemplateRel/del", params);
  }
}
