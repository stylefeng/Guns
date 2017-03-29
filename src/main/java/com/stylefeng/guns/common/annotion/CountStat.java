package com.stylefeng.guns.common.annotion;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 统计系统调用次数的注解
 *
 * @author fengshuonan
 * @date 2017年3月4日 下午11:53:28
 */

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface CountStat {
    String[] value() default {};
}
