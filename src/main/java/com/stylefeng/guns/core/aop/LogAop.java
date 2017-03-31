package com.stylefeng.guns.core.aop;

import com.stylefeng.guns.common.annotion.log.BussinessLog;
import com.stylefeng.guns.core.log.LogManager;
import com.stylefeng.guns.core.log.factory.LogTaskFactory;
import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.core.shiro.ShiroUser;
import com.stylefeng.guns.core.support.StrKit;
import com.stylefeng.guns.core.util.DateUtil;
import com.stylefeng.guns.core.util.ToolUtil;
import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

/**
 * 日志记录
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午8:48:30
 */
@Aspect
@Component
public class LogAop {

    private Logger log = Logger.getLogger(this.getClass());

    @Pointcut(value = "@annotation(com.stylefeng.guns.common.annotion.log.BussinessLog)")
    public void cutService() {
    }

    @Around("cutService()")
    public Object recordSysLog(ProceedingJoinPoint point) throws Throwable {

        //获取拦截的方法名
        MethodSignature ms = (MethodSignature) point.getSignature();
        Method method = ms.getMethod();
        String methodName = method.getName();

        //如果当前用户未登录，不做日志
        ShiroUser user = ShiroKit.getUser();
        if (null == user) {
            return point.proceed();
        }

        //获取拦截方法的参数
        String className = point.getTarget().getClass().getName();
        Object[] params = point.getArgs();

        //获取操作名称
        BussinessLog annotation = method.getAnnotation(BussinessLog.class);
        String bussinessName = annotation.value();

        StringBuilder sb = new StringBuilder();
        for (Object param : params) {
            sb.append(param);
            sb.append(" & ");
        }

        String msg = ToolUtil.format("[时间]:{}  [类名]:{}  [方法]:{}  [参数]:{}", DateUtil.getTime(), className, methodName, sb.toString());
        msg = StrKit.removeSuffix(msg, "& ");
        log.info(msg);
        LogManager.me().executeLog(LogTaskFactory.bussinessLog(user.getId(),bussinessName,className,methodName,msg));
        return point.proceed();
    }
}