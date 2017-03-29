package com.stylefeng.guns.core.aop;

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
 * @Description 日志记录
 * @author fengshuonan
 * @date 2016年12月6日 下午8:48:30
 */
@Aspect
@Component
public class LogAop {
	
	private Logger log = Logger.getLogger(this.getClass());
	
	@Pointcut("execution(* com.stylefeng.guns.*..service.*.*(..))")
	public void cutService() {
	}
	
	@Around("cutService()")
	public Object recordSysLog(ProceedingJoinPoint point) throws Throwable {
		
		//获取拦截的方法名
		MethodSignature ms = (MethodSignature) point.getSignature();
		Method method = ms.getMethod();
		String methodName = method.getName();
		
		//如果当前用户未登录，不做日志
//		ShiroUser user = ShiroKit.getUser();
//		if(null == user){
//			return point.proceed();
//		}
		
		//获取拦截方法的参数
		String className = point.getTarget().getClass().getName();
		Object[] params = point.getArgs();

		StringBuilder sb = new StringBuilder();
		for(Object param : params){
			sb.append(param);
			sb.append(" & ");
		}
		
		String msg = ToolUtil.format("[时间]:{}  [类名]:{}  [方法]:{}  [参数]:{}", DateUtil.getTime(), className, methodName, sb.toString());
//		LogFactory.me().doLog("例如：新增",msg,true);
		log.info(msg);
		
		return point.proceed();
	}
}