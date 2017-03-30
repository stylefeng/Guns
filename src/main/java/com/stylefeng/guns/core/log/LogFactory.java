package com.stylefeng.guns.core.log;

import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.core.shiro.ShiroUser;
import com.stylefeng.guns.persistence.dao.OperationLogMapper;
import com.stylefeng.guns.persistence.model.OperationLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * 日志记录工厂
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午9:18:27
 */
@Component
public class LogFactory implements ILog {

    @Autowired
    OperationLogMapper operationLogMapper;

    @Override
    public void doLog(String logName, String msg, boolean succeed) {
        ShiroUser user = ShiroKit.getUser();
        OperationLog log = new OperationLog();
        log.setMethod(msg);
        log.setCreatetime(new Date());
        log.setSucceed((succeed) ? "1" : "0");
        log.setUserid(String.valueOf(user.getId()));
        log.setLogname(logName);
        operationLogMapper.insert(log);
    }
}
