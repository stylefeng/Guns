package cn.stylefeng.guns.modular.system.role;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 角色管理界面
 *
 * @author fengshuonan
 * @date 2021/1/8 20:55
 */
@Controller
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
        return "/modular/system/role/role.html";
    }

    /**
     * 新增角色界面
     *
     * @author fengshuonan
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "新增角色界面", path = "/view/role/add")
    public String roleAdd() {
        return "/modular/system/role/role_add.html";
    }

    /**
     * 编辑角色界面
     *
     * @author fengshuonan
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "编辑角色界面", path = "/view/role/edit")
    public String roleEdit() {
        return "/modular/system/role/role_edit.html";
    }

    /**
     * 修改数据范围界面
     *
     * @author fengshuonan
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "修改数据范围界面", path = "/view/role/editDataScope")
    public String roleEditDataScope() {
        return "/modular/system/role/role_edit_data_scope.html";
    }

    /**
     * 分配接口界面
     *
     * @author majianguo
     * @date 2021/1/9 11:43
     */
    @GetResource(name = "分配接口界面", path = "/view/role/assignApi")
    public String roleAssignApi() {
        return "/modular/system/role/role_assign_api.html";
    }

    /**
     * 分配菜单和按钮界面
     *
     * @author majianguo
     * @date 2021/1/9 11:45
     */
    @GetResource(name = "分配菜单界面", path = "/view/role/assignMenuAndButtons")
    public String roleAssignMenuButton() {
        return "/modular/system/role/role_assign_menu_button.html";
    }

}
