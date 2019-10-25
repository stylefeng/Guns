package cn.stylefeng.guns.core.schedue.spring;

import org.springframework.scheduling.annotation.Scheduled;

/**
 * 测试定时任务
 *
 * @author fengshuonan
 * @Date 2019/2/24 16:29
 */
public class SpringTasks {

    /**
     * 上一次开始执行时间点之后5秒再执行
     *
     * @author fengshuonan
     * @Date 2019/2/24 16:31
     */
    @Scheduled(fixedRate = 5000)
    public void beginAfter() {
        System.err.println("<<<<<调试信息,注释掉SchedulingConfig类中的内容来关闭这个定时任务！>>>>> spring task执行 >>>>>开始之后5秒执行！");
    }

    /**
     * 上一次执行完毕时间点之后5秒再执行
     *
     * @author fengshuonan
     * @Date 2019/2/24 16:31
     */
    @Scheduled(fixedDelay = 5000)
    public void finishAfter() {
        System.err.println("<<<<<调试信息,注释掉SchedulingConfig类中的内容来关闭这个定时任务！>>>>> spring task执行 >>>>>执行之后5秒才执行！");
    }

    /**
     * 上一次执行完毕时间点之后5秒再执行
     *
     * @author fengshuonan
     * @Date 2019/2/24 16:31
     */
    @Scheduled(initialDelay = 1000, fixedRate = 5000)
    public void stepAdd() {
        System.err.println("<<<<<调试信息,注释掉SchedulingConfig类中的内容来关闭这个定时任务！>>>>> spring task执行 >>>>>第一次延迟1秒后执行，之后按fixedRate的规则每5秒执行一次！");
    }

    /**
     * cron表达式执行
     *
     * @author fengshuonan
     * @Date 2019/2/24 16:31
     */
    @Scheduled(cron = "*/10 * * * * *")
    public void cron() {
        System.err.println("<<<<<调试信息,注释掉SchedulingConfig类中的内容来关闭这个定时任务！>>>>> spring task执行 >>>>>每隔10秒执行一次！");
    }
}