package com.stylefeng.guns.rest.modular.auth.security;

/**
 * 信息传递的保护措施(传递的数据为json)
 *
 * @author fengshuonan
 * @date 2017-09-18 20:41
 */
public interface DataSecurityAction {

    /**
     * 执行数据的保护措施(可以实现自定义的保护措施)
     *
     * @author stylefeng
     * @Date 2017/9/18 20:42
     */
    String doAction(String beProtected);

    /**
     * 解除保护
     *
     * @author stylefeng
     * @Date 2017/9/18 20:45
     */
    String unlock(String securityCode);
}
