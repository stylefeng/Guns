package cn.stylefeng.guns.modular.system.resource;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 资源管理界面
 *
 * @author fengshuonan
 * @date 2021/1/8 21:59
 */
@Controller
@ApiResource(name = "资源管理界面")
public class ResourceViewController {

    /**
     * 资源管理首页
     *
     * @author fengshuonan
     * @date 2021/1/8 21:59
     */
    @GetResource(name = "资源管理首页", path = "/view/resource")
    public String resourceIndex() {
        return "/modular/system/resource/resource.html";
    }

    /**
     * 资源管理详情
     *
     * @author fengshuonan
     * @date 2021/1/8 22:23
     */
    @GetResource(name = "资源管理详情", path = "/view/resource/detail")
    public String resourceDetail() {
        return "/modular/system/resource/resource_detail.html";
    }

}
