package cn.stylefeng.guns.sys.core.util;

import cn.stylefeng.roses.core.util.MD5Util;
import cn.stylefeng.roses.core.util.ToolUtil;

/**
 * 密码加盐的工具
 *
 * @author fengshuonan
 * @Date 2019/7/20 17:34
 */
public class SaltUtil {

    /**
     * 获取密码盐
     *
     * @author fengshuonan
     * @Date 2019/7/20 17:35
     */
    public static String getRandomSalt() {
        return ToolUtil.getRandomString(5);
    }

    /**
     * md5加密，带盐值
     *
     * @author fengshuonan
     * @Date 2019/7/20 17:36
     */
    public static String md5Encrypt(String password, String salt) {
        if (ToolUtil.isOneEmpty(password, salt)) {
            throw new IllegalArgumentException("密码或盐为空！");
        } else {
            return MD5Util.encrypt(password + salt);
        }
    }

}
