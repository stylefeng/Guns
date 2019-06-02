package cn.stylefeng.guns.core.schedue.quartz;

import org.quartz.JobExecutionContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * quartz的执行示例
 *
 * @author fengshuonan
 * @Date 2019/2/24 16:55
 */
public class SampleQuartzJob extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext context) {
        System.err.println("<<<<<调试信息,注释掉SchedulingConfig类中的内容来关闭这个定时任务！>>>>> quartz task执行 >>>>> quartz执行了！");
    }

}