package com.stylefeng.guns.core.common.constant.state;

/**
 * 菜单是否打开的状态
 *
 * @author fengshuonan
 * @Date 2017年4月8日10:12:15
 */
public enum MenuOpenStatus {

    OPEN(1, "打开"),
    CLOSE(0, "关闭");

    int code;
    String message;

    MenuOpenStatus(int code, String message) {
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
            for (MenuOpenStatus s : MenuOpenStatus.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
