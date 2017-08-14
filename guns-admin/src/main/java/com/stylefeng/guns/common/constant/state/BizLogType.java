package com.stylefeng.guns.common.constant.state;

/**
 * 业务日志类型
 *
 * @author fengshuonan
 * @Date 2017年1月22日 下午12:14:59
 */
public enum BizLogType {

    ALL(0, null),//全部日志
    BUSSINESS(1, "业务日志"),
    EXCEPTION(2, "异常日志");

    Integer val;
    String message;

    BizLogType(Integer val, String message) {
        this.val = val;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getVal() {
        return val;
    }

    public void setVal(Integer val) {
        this.val = val;
    }

    public static String valueOf(Integer value) {
        if (value == null) {
            return null;
        } else {
            for (BizLogType bizLogType : BizLogType.values()) {
                if (bizLogType.getVal().equals(value)) {
                    return bizLogType.getMessage();
                }
            }
            return null;
        }
    }
}
