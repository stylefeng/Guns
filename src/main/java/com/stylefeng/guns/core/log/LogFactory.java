package com.stylefeng.guns.core.log;

import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.stylefeng.guns.core.util.SpringContextHolder;

/**
 * 日志记录工厂
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午9:18:27
 */
@Component
@DependsOn("springContextHolder")
public class LogFactory implements ILog {

    private LogFactory() {
    }

    public static ILog me() {
        return SpringContextHolder.getBean(ILog.class);
    }

    @Override
    public void doLog(String logName, String msg, boolean succeed) {
        //添加到数据库
//		ShiroUser user = ShiroKit.getUser();
//		if (null == user) {
//			return true;
//		}
//		try {
//			OperationLog log = new OperationLog();
//			log.setMethod(msg);
//			log.setCreatetime(new Date());
//			log.setSucceed((succeed)?"1":"0");
//			log.setUserid(Func.toStr(user.getId()));
//			log.setLogname(logName);
//			boolean temp = Blade.create(OperationLog.class).save(log);
//			return temp;
//		} catch (Exception ex) {
//			return false;
//		}
    }
}
