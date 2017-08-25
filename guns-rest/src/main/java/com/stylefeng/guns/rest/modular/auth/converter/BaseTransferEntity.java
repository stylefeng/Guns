package com.stylefeng.guns.rest.modular.auth.converter;

/**
 * 基础的传输bean
 *
 * @author fengshuonan
 * @date 2017-08-25 15:52
 */
public class BaseTransferEntity {

    private Object object;

    private String sign;

    public Object getObject() {
        return object;
    }

    public String getSign() {
        return sign;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
