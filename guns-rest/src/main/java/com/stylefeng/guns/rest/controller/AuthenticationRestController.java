package com.stylefeng.guns.rest.controller;

import com.stylefeng.guns.rest.auth.JwtTokenUtil;
import com.stylefeng.guns.rest.config.properties.JwtProperties;
import com.stylefeng.guns.rest.service.IReqValidator;
import com.stylefeng.guns.rest.transfer.JwtAuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class AuthenticationRestController {

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Resource(name = "simpleValidator")
    private IReqValidator reqValidator;

    @RequestMapping(value = "${jwt.auth-path}")
    public ResponseEntity<?> createAuthenticationToken(@RequestParam Map<String, Object> params, Device device, HttpServletRequest request) {

        boolean validate = reqValidator.validate(params);

        if (validate) {
            final String token = jwtTokenUtil.generateToken((String) params.get("userName"), device);
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        } else {
            return ResponseEntity.status(400).body("UserName or password is not right!");
        }
    }
}
