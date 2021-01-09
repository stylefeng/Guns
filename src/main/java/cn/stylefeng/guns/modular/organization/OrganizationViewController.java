package cn.stylefeng.guns.modular.organization;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 职位管理控制器
 *
 * @author chenjinlong
 * @date 2020/12/28 9:28
 */
@Controller
@Slf4j
@ApiResource(name = "职位管理相关的界面渲染", path = "/view/organization")
public class OrganizationViewController {

    private String PREFIX = "/modular/system/organization";

    /**
     * 机构管理-首页-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理-首页-视图", path = "")
    public String indexView() {
        return PREFIX + "/organization.html";
    }

    /**
     * 机构管理—新增-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理—新增-视图", path = "/addView")
    public String addView() {
        return PREFIX + "/organization_add.html";
    }

    /**
     * 机构管理_修改_视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "机构管理-修改-视图", path = "editView")
    public String editView() {
        return PREFIX + "/organization_edit.html";
    }
}
