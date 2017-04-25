package com.stylefeng.guns.modular.system.dao;

import com.stylefeng.guns.persistence.model.Dict;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 常量的dao
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午11:10:24
 */
public interface DictDao {

    /**
     * 根据编码获取词典列表
     *
     * @param code
     * @return
     * @date 2017年2月13日 下午11:11:28
     */
    List<Dict> selectByCode(@Param("code") String code);
}
