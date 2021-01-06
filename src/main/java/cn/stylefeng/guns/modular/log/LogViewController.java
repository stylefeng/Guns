package cn.stylefeng.guns.modular.log;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 操作业务日志管理控制器界面渲染
 *
 * @param
 * @return
 * @author TSQ
 * @date 2021/1/5 14:44
 */
@Controller
@Slf4j
@ApiResource(name = "操作日志管理相关的界面渲染", path = "log")
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
    @GetResource(name="操作日志管理列表", path ="", requiredPermission = false, requiredLogin = false)
    public String indexView(){
        return PREFIX + "/log.html";
    }

}
