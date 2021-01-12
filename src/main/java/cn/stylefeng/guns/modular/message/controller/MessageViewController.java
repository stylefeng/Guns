package cn.stylefeng.guns.modular.message.controller;

import cn.stylefeng.guns.modular.index.service.IndexService;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.message.api.MessageApi;
import cn.stylefeng.roses.kernel.message.api.enums.MessageReadFlagEnum;
import cn.stylefeng.roses.kernel.message.api.pojo.MessageParam;
import cn.stylefeng.roses.kernel.message.api.pojo.MessageResponse;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

/**
 * 系统消息相关的界面渲染
 *
 * @author liuhanqing
 * @date 2021/1/11 19:37
 */
@Controller
@Slf4j
@ApiResource(name = "系统消息相关的界面渲染")
public class MessageViewController {

    @Resource
    private MessageApi messageApi;



    /**
     * 系统消息界面
     *
     * @author liuhanqing
     * @date 2021/1/10 17:42
     */
    @GetResource(name = "系统消息界面", path = "/view/message", requiredPermission = false)
    public String message(Model model) {
        MessageParam messageParam = new MessageParam();
        messageParam.setReadFlag(MessageReadFlagEnum.UNREAD.getCode());
        Integer messageCount = messageApi.queryCountCurrentUser(messageParam);
        List<MessageResponse> messageList = messageApi.queryListCurrentUser(messageParam);
        model.addAttribute("msgUnReadCount", messageCount);
        model.addAttribute("msgUnReadList", messageList);
        return "/modular/index/message.html";
    }

    /**
     * 我的消息界面
     *
     * @author liuhanqing
     * @date 2021/1/12 20:22
     */
    @GetResource(name = "操作日志管理列表", path = "/view/message_list")
    public String indexView() {
        return "/modular/system/message/message_list.html";
    }

    /**
     * 我的消息界面
     *
     * @author liuhanqing
     * @date 2021/1/12 20:22
     */
    @GetResource(name = "操作日志管理列表", path = "/view/message_view")
    public String view(Model model) {
        model.addAttribute("openType", "view");
        return "/modular/system/message/message_view.html";
    }

}
