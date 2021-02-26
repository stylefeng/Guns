package cn.stylefeng.guns.modular.system.notice;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
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

}
