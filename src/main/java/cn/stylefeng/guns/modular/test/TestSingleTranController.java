package cn.stylefeng.guns.modular.test;

import cn.stylefeng.guns.modular.test.service.TranTestService;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 测试单数据源回滚
 *
 * @author stylefeng
 * @since 2018/7/20 23:39
 */
@RestController
@ApiResource(name = "测试单数据源")
public class TestSingleTranController {

    @Resource
    private TranTestService testMultiDbService;

    @GetResource(name = "测试单数据源事务成功", path = "/tran/single/success")
    public ResponseData<Object> testSuccess() {
        testMultiDbService.testSingleSuccess();
        return new SuccessResponseData<>();
    }

    @GetResource(name = "测试单数据源事务失败", path = "/tran/single/fail")
    public ResponseData<Object> testFail() {
        testMultiDbService.testSingleFail();
        return new SuccessResponseData<>();
    }

}

