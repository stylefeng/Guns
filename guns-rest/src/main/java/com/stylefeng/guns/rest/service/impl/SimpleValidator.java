package com.stylefeng.guns.rest.service.impl;

import com.stylefeng.guns.rest.service.IReqValidator;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * 直接验证账号密码是不是admin
 *
 * @author fengshuonan
 * @date 2017-08-23 12:34
 */
@Service
public class SimpleValidator implements IReqValidator {

    private static String USER_NAME = "admin";

    private static String PASSWORD = "admin";

    @Override
    public boolean validate(Map<String, Object> params) {

        String userName = (String) params.get("userName");
        String password = (String) params.get("password");

        if(USER_NAME.equals(userName) && PASSWORD.equals(password)){
            return true;
        }else{
            return false;
        }
    }
}
