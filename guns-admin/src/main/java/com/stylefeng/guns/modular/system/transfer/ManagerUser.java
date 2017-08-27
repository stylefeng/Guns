package com.stylefeng.guns.modular.system.transfer;

import java.util.Date;

/**
 * 管理员的信息封装
 *
 * @author fengshuonan
 * @Date 2017年1月11日 下午7:46:53
 */
public class ManagerUser {

    private String userId;

    /* 用户账号 */
    private String userNo;

    /* 用户姓名 */
    private String userName;

    private String userPhone;

    //1:超级管理员  2：管理员
    private String userRole;

    /* 1：登录状态 2：退出状态 3：停用状态 */
    private Integer userStatus;

    private Date createTime;

    private Date loginTime;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public Integer getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(Integer userStatus) {
        this.userStatus = userStatus;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

}
