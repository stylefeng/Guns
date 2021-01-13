package cn.stylefeng.guns.modular.log;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 业务日志视图控制器
 *
 * @author chenjinlong
 * @date 2021/1/13 19:45
 */
@Controller
@Slf4j
@ApiResource(name = "操作日志管理相关的界面渲染", path = "/view/log")
public class LogViewController {

    private String PREFIX = "/modular/system/log";

    /**
     * 操作日志管理列表
     *
     * @param
     * @return
     * @author TSQ
     * @date 2021/1/5 15:18
     */
    @GetResource(name = "操作日志管理列表", path = "")
    public String indexView() {
        return PREFIX + "/log.html";
    }


    /**
     * 业务日志详情-视图
     *
     * @param
     * @return
     * @author chenjinlong
     * @date 2021/1/13 19:45
     */
    @GetResource(name = "业务日志详情-视图", path = "detailView")
    public String detailView() {
        return PREFIX + "/log_detail.html";
    }

}
