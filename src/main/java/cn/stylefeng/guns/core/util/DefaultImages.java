package cn.stylefeng.guns.core.util;

import cn.stylefeng.guns.core.common.constant.DefaultAvatar;
import cn.stylefeng.guns.core.listener.ConfigListener;

/**
 * 获取默认图片地址
 *
 * @author fengshuonan
 * @date 2018-10-30-5:50 PM
 */
public class DefaultImages {

    /**
     * 默认的登录页面背景
     *
     * @author fengshuonan
     * @Date 2018/10/30 5:51 PM
     */
    public static String loginBg() {
        return ConfigListener.getConf().get("contextPath") + "/assets/common/images/login-register.jpg";
    }

    /**
     * 默认的用户图片的base64编码
     *
     * @author fengshuonan
     * @Date 2018/10/30 5:51 PM
     */
    public static String defaultAvatar() {
        return DefaultAvatar.BASE_64_AVATAR;
    }

    /**
     * 默认的404错误页面背景
     *
     * @author fengshuonan
     * @Date 2018/10/30 5:51 PM
     */
    public static String error404() {
        return ConfigListener.getConf().get("contextPath") + "/assets/common/images/error-bg.jpg";
    }
}
