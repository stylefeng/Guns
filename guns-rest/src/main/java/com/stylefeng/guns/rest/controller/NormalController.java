package com.stylefeng.guns.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 常规控制器
 *
 * @author fengshuonan
 * @date 2017-08-23 16:02
 */
@Controller
@RequestMapping("/hello")
public class NormalController {

    @RequestMapping("")
    public ResponseEntity hello() {
        return ResponseEntity.ok("请求成功!");
    }
}
