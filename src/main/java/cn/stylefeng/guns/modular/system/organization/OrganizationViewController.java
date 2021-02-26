package cn.stylefeng.guns.modular.system.organization;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 组织机构管理控制器界面
 *
 * @author chenjinlong
 * @date 2020/12/28 9:28
 */
@Controller
@ApiResource(name = "组织机构管理控制器界面")
public class OrganizationViewController {

    /**
     * 机构管理-首页-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理-首页-视图", path = "/view/organization")
    public String indexView() {
        return "/modular/system/organization/organization.html";
    }

    /**
     * 机构管理—新增-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理—新增-视图", path = "/view/organization/addView")
    public String addView() {
        return "/modular/system/organization/organization_add.html";
    }

    /**
     * 机构管理_修改_视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理-修改-视图", path = "/view/organization/editView")
    public String editView() {
        return "/modular/system/organization/organization_edit.html";
    }

}
