package cn.stylefeng.guns.modular.system.message;

import cn.stylefeng.roses.kernel.message.api.MessageApi;
import cn.stylefeng.roses.kernel.message.api.enums.MessageReadFlagEnum;
import cn.stylefeng.roses.kernel.message.api.pojo.request.MessageRequest;
import cn.stylefeng.roses.kernel.message.api.pojo.response.MessageResponse;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import java.util.List;

/**
 * 系统消息相关的界面渲染
 *
 * @author liuhanqing
 * @date 2021/1/11 19:37
 */
@Controller
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
        MessageRequest messageRequest = new MessageRequest();
        messageRequest.setReadFlag(MessageReadFlagEnum.UNREAD.getCode());
        Integer messageCount = messageApi.queryCountCurrentUser(messageRequest);
        List<MessageResponse> messageList = messageApi.queryListCurrentUser(messageRequest);
        model.addAttribute("msgUnReadCount", messageCount);
        model.addAttribute("msgUnReadList", messageList);
        return "/modular/system/index/message.html";
    }

    /**
     * 我的消息界面
     *
     * @author liuhanqing
     * @date 2021/1/12 20:22
     */
    @GetResource(name = "我的消息界面", path = "/view/message_list", requiredPermission = false)
    public String indexView() {
        return "/modular/system/message/message_list.html";
    }

    /**
     * 我的消息界面
     *
     * @author liuhanqing
     * @date 2021/1/12 20:22
     */
    @GetResource(name = "我的消息界面", path = "/view/message_view", requiredPermission = false)
    public String view(Model model) {
        model.addAttribute("openType", "view");
        return "/modular/system/message/message_view.html";
    }

}
