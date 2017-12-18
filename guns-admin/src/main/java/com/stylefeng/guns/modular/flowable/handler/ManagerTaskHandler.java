package com.stylefeng.guns.modular.flowable.handler;

import org.flowable.engine.delegate.TaskListener;
import org.flowable.task.service.delegate.DelegateTask;

/**
 * 员工经理任务分配
 */
public class ManagerTaskHandler implements TaskListener {

    @Override
    public void notify(DelegateTask delegateTask) {
        delegateTask.setAssignee("经理");
    }

}
