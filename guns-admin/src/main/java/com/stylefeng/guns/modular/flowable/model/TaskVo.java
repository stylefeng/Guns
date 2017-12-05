package com.stylefeng.guns.modular.flowable.model;

import java.util.Date;

/**
 * 任务列表vo
 *
 * @author fengshuonan
 * @date 2017-12-04 23:18
 */
public class TaskVo {

    private String id;

    private String name;

    private Date createTime;

    private String assignee;

    private Object money;

    private Boolean selfFlag;

    public TaskVo() {
    }

    public TaskVo(String id, String name, Date createTime, String assignee, Object money, Boolean flag) {
        this.id = id;
        this.name = name;
        this.createTime = createTime;
        this.assignee = assignee;
        this.money = money;
        this.selfFlag = flag;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public Object getMoney() {
        return money;
    }

    public void setMoney(Object money) {
        this.money = money;
    }

    public Boolean getSelfFlag() {
        return selfFlag;
    }

    public void setSelfFlag(Boolean selfFlag) {
        this.selfFlag = selfFlag;
    }
}
