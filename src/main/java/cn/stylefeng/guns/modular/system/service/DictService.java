package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.core.common.exception.BizExceptionEnum;
import cn.stylefeng.guns.modular.system.entity.Dict;
import cn.stylefeng.guns.modular.system.mapper.DictMapper;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static cn.stylefeng.guns.core.common.constant.factory.MutiStrFactory.*;

/**
 * <p>
 * 字典表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class DictService extends ServiceImpl<DictMapper, Dict> {

    @Resource
    private DictMapper dictMapper;

    /**
     * 添加字典
     */
    @Transactional
    public void addDict(String dictCode, String dictName, String dictDescription, String dictValues) {

        //判断有没有该字典
        List<Dict> dicts = dictMapper.selectList(new EntityWrapper<Dict>().eq("CODE", dictCode).and().eq("PID", 0));
        if (dicts != null && dicts.size() > 0) {
            throw new ServiceException(BizExceptionEnum.DICT_EXISTED);
        }

        //解析dictValues
        List<Map<String, String>> items = parseKeyValue(dictValues);

        //添加字典
        Dict dict = new Dict();
        dict.setName(dictName);
        dict.setCode(dictCode);
        dict.setDescription(dictDescription);
        dict.setSort(0);
        dict.setPid(0L);
        this.dictMapper.insert(dict);

        //添加字典条目
        for (Map<String, String> item : items) {
            String code = item.get(MUTI_STR_CODE);
            String name = item.get(MUTI_STR_NAME);
            String num = item.get(MUTI_STR_NUM);
            Dict itemDict = new Dict();
            itemDict.setPid(dict.getDictId());
            itemDict.setCode(code);
            itemDict.setName(name);

            try {
                itemDict.setSort(Integer.valueOf(num));
            } catch (NumberFormatException e) {
                throw new ServiceException(BizExceptionEnum.DICT_MUST_BE_NUMBER);
            }
            this.dictMapper.insert(itemDict);
        }
    }

    /**
     * 编辑字典
     */
    @Transactional
    public void editDict(Long dictId, String dictCode, String dictName, String dictTips, String dicts) {

        //删除之前的字典
        this.delteDict(dictId);

        //重新添加新的字典
        this.addDict(dictCode, dictName, dictTips, dicts);
    }

    /**
     * 删除字典
     */
    @Transactional
    public void delteDict(Long dictId) {

        //删除这个字典的子词典
        Wrapper<Dict> dictEntityWrapper = new EntityWrapper<>();
        dictEntityWrapper = dictEntityWrapper.eq("PID", dictId);
        dictMapper.delete(dictEntityWrapper);

        //删除这个词典
        dictMapper.deleteById(dictId);
    }

    /**
     * 根据编码获取词典列表
     */
    public List<Dict> selectByCode(String code) {
        return this.baseMapper.selectByCode(code);
    }

    /**
     * 根据父类编码获取词典列表
     */
    public List<Dict> selectByParentCode(String code) {
        return this.baseMapper.selectByParentCode(code);
    }

    /**
     * 查询字典列表
     */
    public List<Map<String, Object>> list(String conditiion) {
        return this.baseMapper.list(conditiion);
    }
}
