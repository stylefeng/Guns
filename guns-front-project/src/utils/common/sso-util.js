import Request from '@/utils/request/request-util';
import { SSO_CLIENT_ID, SSO_HOST } from '@/config/setting';

/**
 * 单点登录的相关业务逻辑
 *
 * @author fengshuonan
 * @date 2021/5/25 20:45
 */
export class SsoUtil {
  /**
   * SSO探测，当检测当前系统并未登录时候，需要去sso服务端进行探测全局会话
   *
   * @author fengshuonan
   * @date 2021/5/25 20:45
   */
  static redirectDetection() {
    window.location.href = `${SSO_HOST}/sso/detection?clientId=${SSO_CLIENT_ID}&ssoCallback=${encodeURIComponent(window.location.href)}`;
  }

  /**
   * 通过loginCode创建sso全局会话
   *
   * @author fengshuonan
   * @date 2021/5/25 20:45
   */
  static activateByLoginCode(clientId, callBack, ssoLoginCode) {
    window.location.href = `${SSO_HOST}/sso/activateByLoginCode?clientId=${clientId}&ssoCallback=${callBack}&ssoLoginCode=${ssoLoginCode}`;
  }

  /**
   * 将单点token转化为系统可以识别的token
   *
   * @param token 单点返回的token
   * @author fengshuonan
   * @date 2021/5/26 9:34
   */
  static tokenExchange(token) {
    return Request.postAndLoadData('/loginByCaToken', { token });
  }

  /**
   * 获取url的参数
   *
   * @author fengshuonan
   * @date 2021/5/26 11:02
   */
  static getUrlParam(name) {
    let reg = `(^|&)${name}=([^&]*)(&|$)`;
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  /**
   * 单点登录退出
   *
   * @author fengshuonan
   * @date 2021/5/26 11:43
   */
  static ssoLogoutRedirect() {
    window.location.href = `${SSO_HOST}/sso/logout?clientId=${SSO_CLIENT_ID}`;
  }
}
