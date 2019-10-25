package cn.stylefeng.guns.sys.core.auth.cache;

import cn.stylefeng.guns.base.auth.model.LoginUser;

/**
 * 会话管理
 *
 * @author fengshuonan
 * @date 2019-09-28-14:43
 */
public interface SessionManager {

    /**
     * 缓存前缀
     */
    String SESSION_PREFIX = "LOGIN_USER_";

    /**
     * 创建会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    void createSession(String token, LoginUser loginUser);

    /**
     * 获取会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    LoginUser getSession(String token);

    /**
     * 删除会话
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:50
     */
    void removeSession(String token);

    /**
     * 是否已经登陆
     *
     * @author fengshuonan
     * @Date 2019-09-28 14:56
     */
    boolean haveSession(String token);

}
