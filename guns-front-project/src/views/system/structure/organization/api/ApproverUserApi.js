import Request from '@/utils/request/request-util';

/**
 * 后台管理 -审批人api
 *
 */
export class ApproverUserApi {
  /**
   * 更新组织机构绑定审批人
   * @param {*} params
   * @returns
   */
  static bindUserList(params) {
    return Request.post('/hrOrgApprover/bindUserList', params);
  }
  /**
   * 删除审批人的绑定
   * @param {*} params
   * @returns
   */
  static delete(params) {
    return Request.post('/hrOrgApprover/delete', params);
  }
  /**
   * 获取组织机构审批人类型列表
   * @param {*} params
   * @returns
   */
  static getApproverTypeList(params) {
    return Request.getAndLoadData('/hrOrgApprover/getApproverTypeList', params);
  }
  /**
   * 获取组织机构审批人绑定列表
   * @param {*} params
   * @returns
   */
  static getBindingList(params) {
    return Request.get('/hrOrgApprover/getBindingList', params);
  }
}
