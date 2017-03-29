package com.stylefeng.guns.core.log;

/**
 * 日志记录的接口
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午9:17:23
 */
public interface ILog {

    /**
     * @Description 日志记录
     * @author fengshuonan
     */
    void doLog(String logName, String msg, boolean succeed);
}
