package com.stylefeng.guns.common.annotion.log;

import java.lang.annotation.*;

/**
 * 标记保存编辑操作之前的controller方法
 *
 * @author fengshuonan
 * @date 2017-03-31 9:37
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface LogBefore {

}
