import Request from '@/utils/request/request-util';

/**
 * 文件配置api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class FileConfigApi {
  /**
   * 获取文件存储配置
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static getFileConfig() {
    return Request.get('/new/sysConfig/getFileConfig');
  }

  /**
   * 更新文件配置
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static updateFileConfig(params) {
    return Request.post('/new/sysConfig/updateFileConfig', params);
  }
}
