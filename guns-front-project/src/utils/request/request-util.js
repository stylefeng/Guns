/**
 * 通用请求工具类封装
 *
 * @author fengshuonan
 * @date 2022/4/8 10:47
 */
import request from '@/utils/request/request';
import axios from 'axios';
import { getToken } from '@/utils/token-util';
import { API_BASE_PREFIX, NEED_ENCRYPT_API } from '@/config/setting';
import { SM2, SM4 } from 'gm-crypto'
import { getRandomNumber, deepClone } from '@/utils/common/util';
import { message } from 'ant-design-vue';

// 定义公钥
const publicKey = `048f630f53fad962ecf00f3b9d005690a4d56298e70148ce7b709af5d9ac7277aea5fa3b7cbebc1f27c2b798d60ec9c17a74f73e8dfcf4fddfdccdcb08235acc32`

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
   * 封装post加密请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async postEncryption(url, params) {
    // 获取16为随机数
    const random16 = getRandomNumber(16);

    // 转成16进制
    const base16 = strToHexCharCode(random16);
    if (params) {
      // 将data转为json字符串
      params = JSON.stringify(params);

      // 加密的随机数
      const random16Encryption = SM2.encrypt(random16, publicKey, {
        inputEncoding: 'utf8',
        outputEncoding: 'base64' //以base64格式输出
      });
      // 加密参数
      const encryptionParams = SM4.encrypt(params, base16, {
        inputEncoding: 'utf8',
        outputEncoding: 'base64'
      });
      params = {
        passedKey: random16Encryption,
        passedData: encryptionParams
      }
    }
    // 发送post请求
    let result = await request.post(url, params);
    let resultData = deepClone(result.data);
    if (resultData.success) {
      try {
        // 解密
        let decryptData = SM4.decrypt(resultData.data, base16, {
          inputEncoding: 'base64',
          outputEncoding: 'utf8'
        });
        resultData.data = JSON.parse(decryptData);
      } catch (e) {
        console.error(e)
      }
    }
    return resultData;

    function strToHexCharCode(str) {
      if (str === "")
        return "";
      var hexCharCode = [];
      for (var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
      }
      return hexCharCode.join("");
    }
  }

  /**
   * post请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async post(url, params) {
    if (NEED_ENCRYPT_API.find(item => item == url)) {
      return this.postEncryption(url, params);
    } else {
      if (params === undefined) {
        params = {};
      }
      let result = await request.post(url, params);
      return result.data;
    }
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
    window.location.href = `${API_BASE_PREFIX}${url}${paramUrl}`;
  }

  // post下载文件封装
  static reqDown(url, params) {
    return axios({
      method: 'post',
      responseType: 'blob',
      url: `${API_BASE_PREFIX}${url}`,
      data: params,
      headers: {
        "Authorization": getToken()
      }
    }).then(res => {
      return res
    }).catch(err => {
      const data = err.response.data;
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          const resultObj = JSON.parse(evt.target.result);
          message.error(resultObj.message);
          // resultOb是解码后的数据，然后再进行提示处理
        } catch (error) {
          console.log(error)
        }
      };
      reader.readAsText(data);
    });
  }
}
