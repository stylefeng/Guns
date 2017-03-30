package com.stylefeng.guns.core.log;

import com.stylefeng.guns.common.constant.state.LogSucceed;
import com.stylefeng.guns.common.constant.state.LogType;
import com.stylefeng.guns.core.support.HttpKit;
import com.stylefeng.guns.persistence.model.LoginLog;
import com.stylefeng.guns.persistence.model.OperationLog;

import java.util.Date;

/**
 * 日志对象创建工厂
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午9:18:27
 */
public class LogFactory {

    /**
     * 创建操作日志
     *
     * @author fengshuonan
     * @Date 2017/3/30 18:45
     */
    public static OperationLog createOperationLog(LogType logType, Integer userId, String clazzName, String methodName, String msg) {
        OperationLog operationLog = new OperationLog();
        operationLog.setLogtype(logType.getMessage());
        operationLog.setLogname(ConcreteLogNameHolder.me().get(methodName));
        operationLog.setUserid(userId);
        operationLog.setClassname(clazzName);
        operationLog.setMethod(methodName);
        operationLog.setCreatetime(new Date());
        operationLog.setSucceed(LogSucceed.SUCCESS.getMessage());
        operationLog.setMessage(msg);
        return operationLog;
    }

    /**
     * 创建登录日志
     *
     * @author fengshuonan
     * @Date 2017/3/30 18:46
     */
    public static LoginLog createLoginLog(LogType logType, Integer userId, String msg) {
        LoginLog loginLog = new LoginLog();
        loginLog.setLogname(logType.getMessage());
        loginLog.setUserid(userId);
        loginLog.setCreatetime(new Date());
        loginLog.setSucceed(LogSucceed.SUCCESS.getMessage());
        loginLog.setIp(HttpKit.getRequest().getRemoteHost());
        loginLog.setMessage(msg);
        return loginLog;
    }
}
