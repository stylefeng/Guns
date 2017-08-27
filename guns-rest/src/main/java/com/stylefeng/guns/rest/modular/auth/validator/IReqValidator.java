package com.stylefeng.guns.rest.modular.auth.validator;

import com.stylefeng.guns.rest.modular.auth.validator.dto.Credence;

/**
 * <p>验证请求/auth接口时,请求参数的正确性</p>
 * <p>
 * <p>如果想拓展验证方法只需实现这个接口,然后在AuthenticationRestController类中注意相应实现的本接口的类即可</p>
 *
 * @author fengshuonan
 * @date 2017-08-23 11:48
 */
public interface IReqValidator {

    /**
     * 通过请求参数验证
     *
     * @author fengshuonan
     * @Date 2017/8/23 11:49
     */
    boolean validate(Credence credence);
}
