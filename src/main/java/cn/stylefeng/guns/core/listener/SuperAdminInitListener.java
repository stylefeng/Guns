package cn.stylefeng.guns.core.listener;

import cn.stylefeng.guns.core.consts.ProjectConstants;
import cn.stylefeng.guns.modular.system.index.service.InitAdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 项目启动后初始化超级管理员
 *
 * @author fengshuonan
 * @date 2020/12/17 21:44
 */
@Component
@Slf4j
public class SuperAdminInitListener implements ApplicationListener<ApplicationReadyEvent>, Ordered {

    @Resource
    private InitAdminService initAdminService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        initAdminService.initSuperAdmin();
    }

    @Override
    public int getOrder() {
        return ProjectConstants.SUPER_ADMIN_INIT_LISTENER_SORT;
    }

}
