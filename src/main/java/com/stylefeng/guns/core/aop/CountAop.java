package com.stylefeng.guns.core.aop;

import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.core.support.HttpKit;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * 本系统调用次数的统计
 */
@Aspect
@Component
public class CountAop extends BaseController {
	
	private static Object sync = new Object();

	@Pointcut(value = "@annotation(com.stylefeng.guns.common.annotion.CountStat)")
	private void cutPermission() {

	}

	@Around("cutPermission()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		
		HttpServletRequest request = HttpKit.getRequest();
		Object systemCount = request.getServletContext().getAttribute("systemCount");
		
		synchronized (sync) {
			if(systemCount == null){
				request.getServletContext().setAttribute("systemCount", 1);
			}else{
				request.getServletContext().setAttribute("systemCount", (Integer)systemCount + 1);
			}
		}
		
		return point.proceed();
	}
}
