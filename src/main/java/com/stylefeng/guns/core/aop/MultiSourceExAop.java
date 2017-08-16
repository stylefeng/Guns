package com.stylefeng.guns.core.aop;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.aspectj.util.GenericSignature.ClassSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import com.stylefeng.guns.common.annotion.DataSource;
import com.stylefeng.guns.common.constant.DSEnum;
import com.stylefeng.guns.core.mutidatesource.DataSourceContextHolder;

/**
 * 
 * 多数据源切换的aop
 *
 * @author fengshuonan
 * @date 2017年3月5日 上午10:22:16
 */
@Aspect
@Component
@ConditionalOnProperty(prefix = "guns", name = "muti-datasource-open", havingValue = "true")
public class MultiSourceExAop implements Ordered {
	
	private Logger log = LoggerFactory.getLogger(this.getClass());

	//aop切面拦截，如果不添加父类拦截，则只能拦截显式public方法
	@Pointcut(value = "execution(* com.baomidou.mybatisplus.service.impl.ServiceImpl.*(..)) && @target(com.stylefeng.guns.common.annotion.DataSource) || @annotation(com.stylefeng.guns.common.annotion.DataSource)")
	private void cut() {

	}
	
	/**
	 * 如果类注解\@DataSource 则整个类使用该注解的数据源，类中的方法如果再\@DataSource  则优先使用方法的注解
	 * @param point
	 * @return
	 * @throws Throwable
	 */
	@Around("cut()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		
		Signature signature = point.getSignature();
        MethodSignature methodSignature = null;
        DataSource datasource=null;
        
        if (signature instanceof MethodSignature ) {//方法注解
            methodSignature = (MethodSignature) signature;
            Object target = point.getTarget();
            Class<?> currentClass = target.getClass();
            datasource = currentClass.getAnnotation(DataSource.class);//如果是父类方法，则先试取类注解
            Method currentMethod = target.getClass().getMethod(methodSignature.getName(), methodSignature.getParameterTypes());
            if(currentMethod.getAnnotation(DataSource.class)!=null){//如果存在datasourc 则覆盖类注解
            	datasource = currentMethod.getAnnotation(DataSource.class);
            }
        }else if(signature instanceof ClassSignature){//类注解
        	Object target = point.getTarget();
            Class<?> currentClass = target.getClass();
            datasource = currentClass.getAnnotation(DataSource.class);
		}else {
			throw new IllegalArgumentException("该注解只能用于方法或类");
		}

        if(datasource != null){
			DataSourceContextHolder.setDataSourceType(datasource.name());
			log.debug("设置数据源为：" + datasource.name());
        }else{
        	DataSourceContextHolder.setDataSourceType(DSEnum.DATA_SOURCE_GUNS);
			log.debug("设置数据源为：dataSourceCurrent");
        }
        
        try {
        	return point.proceed();
		} finally {
			log.debug("清空数据源信息！");
			DataSourceContextHolder.clearDataSourceType();
		}
	}
	
	
	/**
	 * aop的顺序要早于spring的事务
	 */
	@Override
	public int getOrder() {
		return 1;
	}

}
