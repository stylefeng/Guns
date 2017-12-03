package com.stylefeng.guns.modular.flowable.handler;

import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.core.shiro.ShiroUser;
import org.flowable.engine.delegate.TaskListener;
import org.flowable.task.service.delegate.DelegateTask;

/**
 * 员工经理任务分配
 */
public class ManagerTaskHandler implements TaskListener {

    @Override
    public void notify(DelegateTask delegateTask) {
        /**
         * 获取当前用户
         */
        ShiroUser user = ShiroKit.getUser();

        /**
         * 获取当前用户的上一级领导
         */
        Integer deptId = user.getDeptId();

        /**
         * 设置个人任务的办理人
         */
        delegateTask.setAssignee("");
    }

}
