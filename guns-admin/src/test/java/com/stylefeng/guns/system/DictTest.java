package com.stylefeng.guns.system;

import com.stylefeng.guns.base.BaseJunit;
import com.stylefeng.guns.modular.system.dao.DictMapper;
import com.stylefeng.guns.modular.system.service.IDictService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 字典服务测试
 *
 * @author fengshuonan
 * @date 2017-04-27 17:05
 */
public class DictTest extends BaseJunit {

    @Resource
    IDictService dictService;

    @Resource
    DictMapper dictMapper;

    @Test
    public void addTest() {
        String dictCode = "test";
        String dictName = "字典测试";
        String dictTips = "这是一个字典测试";
        String dictValues = "1:测试1:1;2:测试2:2";
        dictService.addDict(dictCode,dictName,dictTips, dictValues);
    }

    @Test
    public void editTest() {
        dictService.editDict(16, "tes","测试","备注", "1:测试1;2:测试2");
    }

    @Test
    public void deleteTest() {
        this.dictService.delteDict(16);
    }

    @Test
    public void listTest() {
        List<Map<String, Object>> list = this.dictMapper.list("性别");
        Assert.assertTrue(list.size() > 0);
    }
}
