package cn.stylefeng.guns.modular.log;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 操作业务日志管理控制器界面渲染
 *
 * @author TSQ
 * @date 2021/1/5 14:44
 */
@Controller
@Slf4j
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
     * 操作日志管理列表
     *
     * @author TSQ
     * @date 2021/1/5 15:18
     */
    @GetResource(name = "日志详情页", path = "/view/logDetail")
    public String detailView() {
        return "/modular/system/log/log_detail.html";
    }

}
