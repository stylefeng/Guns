package com.stylefeng.guns.modular.system.transfer;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * 编辑管理员的请求
 *
 * @author fengshuonan
 * @Date 2017年1月15日 下午10:29:16
 */
public class ReqEditManager {

    @NotNull
    private String userId;

    /* 用户姓名 */
    @NotNull
    private String userName;

    private String userPassword;

    @NotNull
    @Length(min = 11, max = 11)
    private String userPhone;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

}
