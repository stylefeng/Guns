package cn.stylefeng.guns.modular.notice.controller;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 通知管理界面
 *
 * @author liuhanqing
 * @date 2021/1/8 20:55
 */
@Controller
@ApiResource(name = "通知管理界面")
public class NoticeViewController {

    /**
     * 通知管理首页
     *
     * @author liuhanqing
     * @date 2021/1/8 20:55
     */
    @GetResource(name = "通知管理列表", path = "/view/notice")
    public String roleIndex() {
        return "/modular/system/notice/notice.html";
    }

    /**
     * 新增通知界面
     *
     * @author liuhanqing
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "新增通知界面", path = "/view/notice/add")
    public String roleAdd() {
        return "/modular/system/notice/notice_add.html";
    }

    /**
     * 编辑通知界面
     *
     * @author liuhanqing
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "编辑通知界面", path = "/view/notice/edit")
    public String roleEdit() {
        return "/modular/system/notice/notice_edit.html";
    }

    /**
     * 修改数据范围界面
     *
     * @author liuhanqing
     * @date 2021/1/8 20:57
     */
    @GetResource(name = "修改数据范围界面", path = "/view/notice/editDataScope")
    public String roleEditDataScope() {
        return "/modular/system/notice/notice_edit_data_scope.html";
    }

    /**
     * 分配接口界面
     *
     * @author majianguo
     * @date 2021/1/9 11:43
     */
    @GetResource(name = "分配接口界面", path = "/view/notice/assignApi")
    public String roleAssignApi() {
        return "/modular/system/notice/notice_assign_api.html";
    }

    /**
     * 分配菜单和按钮界面
     *
     * @author majianguo
     * @date 2021/1/9 11:45
     */
    @GetResource(name = "分配菜单界面", path = "/view/notice/assignMenuAndButtons")
    public String roleAssignMenuButton() {
        return "/modular/system/notice/notice_assign_menu_button.html";
    }

}
