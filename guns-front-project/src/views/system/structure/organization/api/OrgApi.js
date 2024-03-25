import Request from '@/utils/request/request-util';

/**
 * 后台管理 -组织机构api
 *
 */
export class OrgApi {
  /**
   * 组织机构树
   * @param {*} params
   * @returns
   */
  static tree(params) {
    return Request.post('/common/org/tree', params);
  }
  /**
   * 分页
   * @param {*} params
   * @returns
   */
  static findPage(params) {
    return Request.getAndLoadData('/hrOrganization/page', params);
  }

  /**
   * 添加
   * @param {*} params
   * @returns
   */
  static add(params) {
    return Request.post('/hrOrganization/add', params);
  }
  /**
   * 编辑
   * @param {*} params
   * @returns
   */
  static edit(params) {
    return Request.post('/hrOrganization/edit', params);
  }
  /**
   * 删除单个
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/hrOrganization/delete', params);
  }
  /**
   * 删除批量
   * @param {*} params
   * @returns
   */
  static batchDelete(params) {
    return Request.post('/hrOrganization/batchDelete', params);
  }
  /**
   * 详情
   * @param {*} params
   * @returns
   */
  static detail(params) {
    return Request.getAndLoadData('/hrOrganization/detail', params);
  }

  /**
   * 组织机构导出业务
   * @param {*} params
   * @returns
   */
  static exportOrg(params) {
    return Request.downLoad('/api/org/exportOrg', params);
  }

  /**
   * 获取机构的导入模板
   * @param {*} params
   * @returns
   */
  static getExcelTemplate(params) {
    return Request.downLoad('/api/orgImport/getExcelTemplate', params);
  }

  /**
   * 导入组织机构并获取预览数据
   * @param {*} params
   * @returns
   */
  static uploadAndGetPreviewData(params) {
    return Request.post('/orgImport/uploadAndGetPreviewData', params);
  }

  /**
   * 确认导入组织机构
   * @param {*} params
   * @returns
   */
  static ensureImport(params) {
    return Request.post('/orgImport/ensureImport', params);
  }
}
