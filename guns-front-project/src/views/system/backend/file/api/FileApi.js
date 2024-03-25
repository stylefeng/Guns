import Request from '@/utils/request/request-util';
import { API_BASE_PREFIX } from '@/config/setting';

/**
 * 文件上传的url
 */
export const FileUploadUrl = '/sysFileInfo/upload';

/**
 * 文件相关api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class FileApi {
  /**
   * 获取文件列表，用在文件选择组件
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findSelectPageList(params) {
    return Request.getAndLoadData('/sysFileInfo/fileInfoListPage', params);
  }

  /**
   * 获取文件列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return Request.getAndLoadData('/sysFileInfo/fileInfoListPage', params);
  }

  /**
   * 通用文件上传
   *
   * 使用示例：
   * let formData = new FormData();
   * formData.append('file', file);
   * FileApi.commonUpload('Y', formData);
   *
   * @param {String} secretFlag  是否是机密文件，Y-是机密文件，N-非机密文件
   * @param {Object} formData   FormData的实例对象，需要在formData中添加file属性
   * @author fengshuonan
   * @date 2021/4/1 14:34
   */
  static commonUpload(secretFlag, formData) {
    // 添加secretFlag属性
    formData.append('secretFlag', secretFlag);
    return Request.post(FileUploadUrl, formData);
  }

  /**
   * 删除文件
   *
   * @param {string} params.fileCode 文件编码
   * @author fengshuonan
   * @date 2021/4/12 22:02
   */
  static delete(params) {
    return Request.post('/sysFileInfo/deleteReally', params);
  }

  /**
   * 下载文件
   *
   * @param {string} params.fileId 文件id
   * @param {string} params.secretFlag 是否是私有文件
   * @param {string} params.token 用户的token
   * @author fengshuonan
   * @date 2021/4/12 22:08
   */
  static download(params) {
    if (params.secretFlag === 'Y') {
      window.location.href = `${API_BASE_PREFIX}/sysFileInfo/privateDownload?fileId=${params.fileId}&token=${params.token}`;
    } else {
      window.location.href = `${API_BASE_PREFIX}/sysFileInfo/publicDownload?fileId=${params.fileId}&token=${params.token}`;
    }
  }

  /**
   * 文件详情
   *
   * @param {string} params.fileId 文件id
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static detail(params) {
    return Request.getAndLoadData('/sysFileInfo/detail', params);
  }

  /**
   * 获取antdv格式的文件详情
   *
   * @param {string} params.fileId 文件id
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static getAntdVInfo(params) {
    return Request.getAndLoadData('/sysFileInfo/getAntdVInfo', params);
  }

  /**
   * 获取antdv格式的文件详情列表
   *
   * @param {string} params.fileId 文件id
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static getAntdVInfoBatch(params) {
    return Request.post('/sysFileInfo/getAntdVInfoBatch', params);
  }
}
