package com.stylefeng.guns.modular.system.transfer;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * 添加管理员的请求bean
 *
 * @author fengshuonan
 * @Date 2017年1月12日 下午6:46:24
 */
public class ReqAddManager {

    // 用户姓名
    @NotNull
    private String userName;

    // 用户账号
    @NotNull
    private String userNo;

    // 手机号
    @NotNull
    @Length(min = 11, max = 11)
    private String userPhone;

    // 1:超级管理员 2：管理员
    @NotNull
    private String userRole;

    // 密码
    @NotNull
    private String userPassword;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

}
