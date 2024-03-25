/**
 * 通用请求工具类封装
 *
 * @author fengshuonan
 * @date 2022/4/8 10:47
 */
import request from '@/utils/request/request';
import axios from 'axios';
import { getToken } from '@/utils/token-util';

export default class RequestUtil {
  /**
   * get请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async get(url, params) {
    if (params === undefined) {
      params = {};
    }
    let result = await request.get(url, { params });
    return result.data;
  }

  /**
   * get请求并获取数据
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async getAndLoadData(url, params) {
    let result = await this.get(url, params);
    return result.data;
  }

  /**
   * post请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async post(url, params) {
    if (params === undefined) {
      params = {};
    }
    let result = await request.post(url, params);
    return result.data;
  }

  /**
   * post请求并获取数据
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async postAndLoadData(url, params) {
    let result = await this.post(url, params);
    return result.data;
  }

  /**
   * 封装downLoad请求
   *
   * @author fengshuonan
   * @date 2021/4/2 16:13
   */
  static downLoad(url, params) {
    if (params === undefined) {
      params = {};
    }
    let paramUrl = '?';
    for (let field in params) {
      if (params[field]) {
        paramUrl = paramUrl + field + '=' + params[field] + '&';
      }
    }
    paramUrl = paramUrl.substring(0, paramUrl.length - 1);
    
    if (!paramUrl) {
      paramUrl = `?token=${getToken()}`;
    } else {
      if (!paramUrl.includes('&token=')) {
        paramUrl = `${paramUrl}&token=${getToken()}`;
      }
    }
    window.location.href = `${url}${paramUrl}`;
  }

  // post下载文件封装
  static reqDown(url, params) {
    return axios({
      method: 'post',
      responseType: 'blob',
      url: url,
      data: params,
      headers: {
        "Authorization": getToken()
      }
    }).then(res => {
      return res
    }).catch(error => {
    });
  }
}
