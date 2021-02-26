package cn.stylefeng.guns.modular.system.log;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 业务日志视图控制器
 *
 * @author chenjinlong
 * @date 2021/1/13 19:45
 */
@Controller
@ApiResource(name = "操作日志管理相关的界面渲染")
public class LogViewController {

    /**
     * 操作日志管理列表
     *
     * @author TSQ
     * @date 2021/1/5 15:18
     */
    @GetResource(name = "操作日志管理列表", path = "/view/log")
    public String indexView() {
        return "/modular/system/log/log.html";
    }

    /**
     * 业务日志详情-视图
     *
     * @author chenjinlong
     * @date 2021/1/13 19:45
     */
    @GetResource(name = "业务日志详情-视图", path = "/view/log/detailView")
    public String detailView() {
        return "/modular/system/log/log_detail.html";
    }

}
