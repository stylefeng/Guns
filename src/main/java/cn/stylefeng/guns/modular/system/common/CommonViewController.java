package cn.stylefeng.guns.modular.system.common;

import cn.stylefeng.guns.modular.system.common.pojo.CommonTreeRequest;
import cn.stylefeng.roses.kernel.rule.exception.base.ServiceException;
import cn.stylefeng.roses.kernel.rule.exception.enums.defaults.DefaultBusinessExceptionEnum;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * 通用界面
 *
 * @author fengshuonan
 * @date 2021/1/6 20:18
 */
@Controller
@Slf4j
@ApiResource(name = "通用界面")
public class CommonViewController {

    /**
     * 通用的树列表选择器
     *
     * @author fengshuonan
     * @date 2021/1/6 20:19
     */
    @GetResource(name = "通用的树列表选择器", path = "/view/common/tree")
    public String commonTreeSelect(@Valid CommonTreeRequest commonTreeRequest, Model model) {
        try {
            model.addAttribute("formName", URLDecoder.decode(commonTreeRequest.getFormName(), "UTF-8"));
            model.addAttribute("formId", URLDecoder.decode(commonTreeRequest.getFormId(), "UTF-8"));
            model.addAttribute("treeUrl", URLDecoder.decode(commonTreeRequest.getTreeUrl(), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            log.error("解析url的参数出错！", e);
            throw new ServiceException("guns-standalone-beetl", DefaultBusinessExceptionEnum.SYSTEM_RUNTIME_ERROR);
        }
        return "/component/tree_dlg.html";
    }

}
