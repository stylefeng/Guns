package com.stylefeng.guns.core.mutidatasource.aop;

import com.stylefeng.guns.core.mutidatasource.DataSourceContextHolder;
import com.stylefeng.guns.core.mutidatasource.annotion.DataSource;
import com.stylefeng.guns.core.config.properties.MutiDataSourceProperties;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;

import java.lang.reflect.Method;

/**
 * 多数据源切换的aop
 *
 * @author fengshuonan
 * @date 2017年3月5日 上午10:22:16
 */
@Aspect
public class MultiSourceExAop implements Ordered {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MutiDataSourceProperties mutiDataSourceProperties;

    @Pointcut(value = "@annotation(com.stylefeng.guns.core.mutidatasource.annotion.DataSource)")
    private void cut() {

    }

    @Around("cut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {

        Signature signature = point.getSignature();
        MethodSignature methodSignature = null;
        if (!(signature instanceof MethodSignature)) {
            throw new IllegalArgumentException("该注解只能用于方法");
        }
        methodSignature = (MethodSignature) signature;

        Object target = point.getTarget();
        Method currentMethod = target.getClass().getMethod(methodSignature.getName(), methodSignature.getParameterTypes());

        DataSource datasource = currentMethod.getAnnotation(DataSource.class);
        if (datasource != null) {
            DataSourceContextHolder.setDataSourceType(datasource.name());
            log.debug("设置数据源为：" + datasource.name());
        } else {
            DataSourceContextHolder.setDataSourceType(mutiDataSourceProperties.getDataSourceNames()[0]);
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
