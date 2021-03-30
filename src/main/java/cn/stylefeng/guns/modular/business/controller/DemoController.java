package cn.stylefeng.guns.modular.business.controller;

import cn.hutool.core.lang.Dict;
import cn.stylefeng.guns.modular.business.service.DemoService;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.PostResource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 示例控制器
 *
 * @author fengshuonan
 * @date 2021/1/24 10:57
 */
@RestController
@ApiResource(name = "示例")
public class DemoController {

    @Resource
    private DemoService demoService;

    /**
     * 示例方法
     *
     * @author fengshuonan
     * @date 2021/1/24 10:59
     */
    @GetResource(name = "示例方法", path = "/json/success")
    public ResponseData renderSuccess() {
        demoService.demoService();
        return new SuccessResponseData();
    }

    /**
     * 示例加密方法
     * <p>
     * requiredEncryption = true
     * </p>
     *
     * @author fengshuonan
     * @date 2021/1/24 10:59
     */
    @PostResource(name = "示例加密方法", path = "/encode", requiredPermission = false, requiredLogin = false, requiredEncryption = true)
    public ResponseData encode(@RequestBody Dict dict) {
        return new SuccessResponseData(dict);
    }

}
