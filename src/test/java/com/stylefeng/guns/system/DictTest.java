package com.stylefeng.guns.system;

import com.stylefeng.guns.base.BaseTest;
import com.stylefeng.guns.modular.system.service.IDictService;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * 字典服务测试
 *
 * @author fengshuonan
 * @date 2017-04-27 17:05
 */
public class DictTest extends BaseTest{

    @Resource
    IDictService dictService;

    @Test
    public void addTest() {
        dictService.addDict("测试","1:冻结;2:jiedong;3:接触");
    }

    @Test
    public void editTest() {
        dictService.editDict("45:0:测试1;46:1:冻结1;47:4:sd1;48:3:接触1;");
    }
}
