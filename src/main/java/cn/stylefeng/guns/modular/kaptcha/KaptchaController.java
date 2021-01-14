package cn.stylefeng.guns.modular.kaptcha;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.CircleCaptcha;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.captcha.ShearCaptcha;
import cn.stylefeng.guns.core.consts.ProjectConstants;
import cn.stylefeng.roses.kernel.auth.api.constants.AuthConstants;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.rule.util.HttpServletUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 生成验证码控制器
 *
 * @author chenjinlong
 * @date 2021/1/14 19:58
 */
@Controller
@Slf4j
@ApiResource(name = "生成验证码")
public class KaptchaController {

    /**
     * 获取验证码
     *
     * @author chenjinlong
     * @date 2021/1/14 20:10
     */
    @GetResource(name = "获取验证码", path = "/kaptcha", requiredPermission = false, requiredLogin = false)
    public void getCode(HttpServletResponse response, HttpSession session) {
        //定义图形验证码的长、宽、验证码字符数、干扰元素个数
        CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(200, 100, 4, 20);
        //将验证码放入session
        session.setAttribute(AuthConstants.KAPTCHA_SESSION_KEY, captcha.getCode());
        try {
            ServletOutputStream outputStream = response.getOutputStream();
            captcha.write(outputStream);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
