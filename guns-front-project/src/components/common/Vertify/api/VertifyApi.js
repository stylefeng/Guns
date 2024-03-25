import Request from '@/utils/request/request-util';

/**
 * 登录退出接口
 *
 * @author fengshuonan
 * @date 2021/4/1 14:34
 */
export class VertifyApi {
  /**
   * 获取拖拽验证码的接口
   *
   */
  static getDragCaptcha(params) {
    return Request.get('/getDragCaptcha', params);
  }
}