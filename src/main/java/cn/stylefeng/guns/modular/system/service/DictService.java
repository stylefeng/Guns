package cn.stylefeng.guns.modular.system.service;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.modular.system.entity.Dict;
import cn.stylefeng.guns.modular.system.mapper.DictMapper;
import cn.stylefeng.guns.modular.system.model.DictDto;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

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
     * 添加字典类型
     */
    public void addDictType(DictDto dictDto) {
        Dict dict = new Dict();
        BeanUtil.copyProperties(dictDto, dict);

        //类型的父级id都为0
        dict.setPid(0L);

        this.insert(dict);
    }

    /**
     * 添加字典子类型
     */
    public void addDictItem(DictDto dictDto) {
        Dict dict = new Dict();
        BeanUtil.copyProperties(dictDto, dict);

        //字典的父级id为字典tyeId
        dict.setPid(dictDto.getDictTypeId());

        this.insert(dict);
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
