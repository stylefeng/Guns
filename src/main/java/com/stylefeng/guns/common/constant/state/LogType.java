package com.stylefeng.guns.common.constant.state;

/**
 * 日志类型
 *
 * @author fengshuonan
 * @Date 2017年1月22日 下午12:14:59
 */
public enum LogType {

    LOGIN("登录日志"),
    LOGIN_FAIL("登录失败日志"),
    EXIT("退出日志"),
    EXCEPTION("异常日志"),
    BUSSINESS("业务日志");

    String message;

    LogType(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
