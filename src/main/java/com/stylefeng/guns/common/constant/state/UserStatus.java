package com.stylefeng.guns.common.constant.state;

/**
 * 用户的状态
 *
 * @author fengshuonan
 * @Date 2017年1月22日 下午12:14:59
 */
public enum UserStatus {

    Login(1, "登录中"),
    Exit(2, "退出"),
    Locked(3, "锁定");

    int code;
    String message;

    UserStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static String valueOf(Integer status) {
        if (status == null) {
            return "";
        } else {
            for (UserStatus s : UserStatus.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }

}
