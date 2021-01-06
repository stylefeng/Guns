package cn.stylefeng.guns.modular.dict;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 字典视图控制器
 *
 * @Author: huangyao
 * @Date: 2021/1/6 20:52
 **/
@Controller
@Slf4j
@ApiResource(name = "字典管理相关的界面渲染", path = "dictType")
public class DictViewController {

    private String PREFIX = "/modular/system/dict";
}
