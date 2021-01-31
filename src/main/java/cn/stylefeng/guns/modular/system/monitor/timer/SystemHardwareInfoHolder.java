package cn.stylefeng.guns.modular.system.monitor.timer;

import cn.stylefeng.guns.modular.system.monitor.warpper.SystemHardwareWrapper;
import cn.stylefeng.roses.kernel.timer.api.TimerAction;
import org.springframework.stereotype.Component;

/**
 * 定时刷新服务器状态信息
 *
 * @author fengshuonan
 * @date 2021/1/31 21:52
 */
@Component
public class SystemHardwareInfoHolder implements TimerAction {

    private SystemHardwareWrapper systemHardwareWrapper = null;

    @Override
    public void action() {
        SystemHardwareWrapper newInfo = new SystemHardwareWrapper();
        newInfo.copyTo();
        systemHardwareWrapper = newInfo;
    }

    public SystemHardwareWrapper getSystemHardwareInfo() {
        if (systemHardwareWrapper != null) {
            return systemHardwareWrapper;
        }

        systemHardwareWrapper = new SystemHardwareWrapper();
        systemHardwareWrapper.copyTo();
        return systemHardwareWrapper;
    }

}
