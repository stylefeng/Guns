import Request from '@/utils/request/request-util';

/**
 * 个人信息api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:03
 */
export class PersonInfoApi {
  /**
   * 获取当前用户信息
   *
   * @author fengshuonan
   * @date 2021/4/1 15:04
   */
  static getCurrentLoginUserInfo(params) {
    return Request.getAndLoadData('/sysUser/detail', params);
  }

  /**
   * 更新当前用户信息
   *
   * @param {String} params.account   账号
   * @param {String} params.birthday  生日
   * @param {String} params.email     邮箱
   * @param {String} params.phone     电话
   * @param {String} params.realName  真实姓名
   * @param {String} params.sex       性别
   * @param {String} params.userId    用户id
   * @author fengshuonan
   * @date 2021/4/13 16:16
   */
  static updateUserInfo(params) {
    return Request.post('/sysUser/updateInfo', params);
  }


  /**
   * 获取个人信息详情
   * @param params
   * @returns {Promise<*>}
   */
  static getUserInfo(params) {
    return Request.getAndLoadData('/personalInfo/getUserInfo', params);
  }

  /**
   * 修改密码
   * @param params
   * @returns {Promise<*>}
   */
  static updatePassword(params) {
    return Request.post('/personalInfo/updatePassword', params);
  }

  /**
   * 修改头像
   * @param params
   * @returns {Promise<*>}
   */
  static updateAvatar(params) {
    return Request.post('/personalInfo/updateAvatar', params);
  }

  /**
   * 修改基本信息
   * @param params
   * @returns {Promise<*>}
   */
  static updateInfo(params) {
    return Request.post('/personalInfo/updateInfo', params);
  }

}
