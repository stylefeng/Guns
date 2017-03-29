package com.stylefeng.guns.common.annotion;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 权限注解 用于检查权限 规定访问权限
 *
 * @example @Permission({roleID1,roleID2})
 * @example @Permission
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Permission {
    String[] value() default {};
}
