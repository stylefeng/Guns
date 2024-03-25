import Request from '@/utils/request/request-util';

/**
 * 后台管理 - 定时任务api
 *
 * @author luojie
 * @date 2021/4/13 09:52
 */
export class SysTimerApi {
  /**
   * 获取定时任务列表
   *
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static findTimerPage(params) {
    return Request.getAndLoadData('/sysTimers/page', params);
  }

  /**
   * 新增
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static add(params) {
    return Request.post('/sysTimers/add', params);
  }

  /**
   * 查看定时任务详情
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static detail(params) {
    return Request.post('/sysTimers/detail', params);
  }

  /**
   * 编辑
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static edit(params) {
    return Request.post('/sysTimers/edit', params);
  }

  /**
   * 停止任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static stop(params) {
    return Request.post('/sysTimers/stop', params);
  }

  /**
   * 启动任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static start(params) {
    return Request.post('/sysTimers/start', params);
  }

  /**
   * 删除单个任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static delete(params) {
    return Request.post('/sysTimers/delete', params);
  }

  /**
   * 获取定时任务执行类列表
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static getActionClasses() {
    return Request.postAndLoadData('/sysTimers/getActionClasses');
  }
}
