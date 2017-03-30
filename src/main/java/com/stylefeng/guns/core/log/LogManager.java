package com.stylefeng.guns.core.log;

import com.stylefeng.guns.common.constant.state.LogType;
import com.stylefeng.guns.core.db.Db;
import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.persistence.dao.LoginLogMapper;
import com.stylefeng.guns.persistence.dao.OperationLogMapper;
import com.stylefeng.guns.persistence.model.LoginLog;
import com.stylefeng.guns.persistence.model.OperationLog;
import org.apache.log4j.Logger;

/**
 * 日志管理器
 *
 * @author fengshuonan
 * @date 2017-03-30 16:29
 */
public class LogManager {

    private static Logger logger = Logger.getLogger(LogManager.class);
    private static LoginLogMapper loginLogMapper = Db.getMapper(LoginLogMapper.class);
    private static OperationLogMapper operationLogMapper = Db.getMapper(OperationLogMapper.class);

    public static void loginLog(Integer userId) {
        LoginLog loginLog = LogFactory.createLoginLog(LogType.LOGIN, userId);
        try {
            loginLogMapper.insert(loginLog);
        } catch (Exception e) {
            logger.error("创建登录日志异常!", e);
        }
    }

    public static void exitLog(Integer userId) {
        LoginLog loginLog = LogFactory.createLoginLog(LogType.EXIT, userId);
        try {
            loginLogMapper.insert(loginLog);
        } catch (Exception e) {
            logger.error("创建退出日志异常!", e);
        }
    }

    public static void bussinessLog(Integer userId, String clazzName, String methodName, String msg) {
        OperationLog operationLog = LogFactory.createOperationLog(LogType.BUSSINESS, userId, clazzName, methodName, msg);
        try {
            operationLogMapper.insert(operationLog);
        } catch (Exception e) {
            logger.error("创建业务日志异常!", e);
        }
    }

    public static void exceptionLog(Integer userId, Exception exception) {
        String msg = ToolUtil.getExceptionMsg(exception);
        OperationLog operationLog = LogFactory.createOperationLog(LogType.EXCEPTION, userId, "", "", msg);
        try {
            operationLogMapper.insert(operationLog);
        } catch (Exception e) {
            logger.error("创建异常日志异常!", e);
        }
    }

}
