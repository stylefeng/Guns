package cn.stylefeng.guns.modular.role;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 角色管理界面
 *
 * @author fengshuonan
 * @date 2021/1/8 20:55
 */
@Controller
@Slf4j
@ApiResource(name = "角色管理界面")
public class RoleViewController {

    /**
     * 角色管理首页
     *
     * @author fengshuonan
     * @date 2021/1/8 20:55
     */
    @GetResource(name = "应用管理首页", path = "/view/role")
    public String roleIndex() {
        return "/modular/auth/role/role.html";
    }

    /**
     * 新增角色界面
     *
     * @author fengshuonan
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "新增角色界面", path = "/view/role/add")
    public String roleAdd() {
        return "/modular/auth/role/role_add.html";
    }

    /**
     * 编辑角色界面
     *
     * @author fengshuonan
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "编辑角色界面", path = "/view/role/edit")
    public String roleEdit() {
        return "/modular/auth/role/role_edit.html";
    }

}
