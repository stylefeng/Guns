package cn.stylefeng.guns.modular.system.service;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.core.common.exception.BizExceptionEnum;
import cn.stylefeng.guns.modular.system.entity.Dict;
import cn.stylefeng.guns.modular.system.mapper.DictMapper;
import cn.stylefeng.guns.modular.system.model.DictDto;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
     * 添加字典
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:25 PM
     */
    public void addDict(DictDto dictDto) {

        if (ToolUtil.isOneEmpty(dictDto, dictDto.getCode(), dictDto.getName())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        if (ToolUtil.isEmpty(dictDto.getDictTypeId())) {
            this.addDictType(dictDto);
        } else {
            this.addDictItem(dictDto);
        }
    }

    /**
     * 添加字典类型
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:25 PM
     */
    private void addDictType(DictDto dictDto) {
        Dict dict = new Dict();
        BeanUtil.copyProperties(dictDto, dict);

        //类型的父级id都为0
        dict.setPid(0L);

        this.save(dict);
    }

    /**
     * 添加字典子类型
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:25 PM
     */
    private void addDictItem(DictDto dictDto) {
        Dict dict = new Dict();
        BeanUtil.copyProperties(dictDto, dict);

        //字典的父级id为字典tyeId
        dict.setPid(dictDto.getDictTypeId());

        this.save(dict);
    }

    /**
     * 删除字典
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:25 PM
     */
    @Transactional
    public void delteDict(Long dictId) {

        //删除这个字典的子词典
        QueryWrapper<Dict> dictEntityWrapper = new QueryWrapper<>();
        dictEntityWrapper = dictEntityWrapper.eq("PID", dictId);
        dictMapper.delete(dictEntityWrapper);

        //删除这个词典
        dictMapper.deleteById(dictId);
    }

    /**
     * 根据编码获取词典列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:25 PM
     */
    public List<Dict> selectByCode(String code) {
        return this.baseMapper.selectByCode(code);
    }

    /**
     * 根据父类编码获取词典列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:26 PM
     */
    public List<Dict> selectByParentCode(String code) {
        return this.baseMapper.selectByParentCode(code);
    }

    /**
     * 查询字典列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:26 PM
     */
    public List<Map<String, Object>> list(String conditiion) {
        return this.baseMapper.list(conditiion);
    }
}
