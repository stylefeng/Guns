package cn.stylefeng.guns.sys.modular.consts.service.impl;

import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.consts.entity.SysConfig;
import cn.stylefeng.guns.sys.modular.consts.mapper.SysConfigMapper;
import cn.stylefeng.guns.sys.modular.consts.model.params.SysConfigParam;
import cn.stylefeng.guns.sys.modular.consts.model.result.SysConfigResult;
import cn.stylefeng.guns.sys.modular.consts.service.SysConfigService;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

import static cn.stylefeng.guns.base.consts.ConfigConstant.SYSTEM_CONSTANT_PREFIX;
import static cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum.ALREADY_CONSTANTS_ERROR;

/**
 * <p>
 * 参数配置 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2019-06-20
 */
@Service
public class SysConfigServiceImpl extends ServiceImpl<SysConfigMapper, SysConfig> implements SysConfigService {

    @Override
    public void add(SysConfigParam param) {
        SysConfig entity = getEntity(param);

        //判断编码有没有重复
        SysConfig sysConfig = new SysConfig();
        sysConfig.setCode(entity.getCode());
        List<SysConfig> list = this.list(new QueryWrapper<>(sysConfig));
        if (list != null && list.size() > 0) {
            throw new ServiceException(ALREADY_CONSTANTS_ERROR);
        }

        //如果是字典类型
        if (ToolUtil.isNotEmpty(param.getDictFlag())
                && param.getDictFlag().equalsIgnoreCase("Y")) {
            entity.setValue(param.getDictValue());
        }

        //添加字典context
        ConstantsContext.putConstant(entity.getCode(), entity.getValue());

        this.save(entity);
    }

    @Override
    public void delete(SysConfigParam param) {

        //不能删除系统常量
        SysConfig sysConfig = this.getById(param.getId());
        if (sysConfig != null && sysConfig.getCode().startsWith(SYSTEM_CONSTANT_PREFIX)) {
            throw new ServiceException(BizExceptionEnum.SYSTEM_CONSTANT_ERROR);
        }

        //删除字典context
        ConstantsContext.deleteConstant(sysConfig.getCode());

        this.removeById(getKey(param));
    }

    @Override
    public void update(SysConfigParam param) {
        SysConfig oldEntity = getOldEntity(param);
        SysConfig newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);

        //如果是字典类型
        if (ToolUtil.isNotEmpty(param.getDictFlag())
                && param.getDictFlag().equalsIgnoreCase("Y")) {
            newEntity.setValue(param.getDictValue());
        } else {

            //如果是非字典，则标识位置为空
            newEntity.setDictFlag("N");
        }

        //添加字典context
        ConstantsContext.putConstant(newEntity.getCode(), newEntity.getValue());

        this.updateById(newEntity);
    }

    @Override
    public SysConfigResult findBySpec(SysConfigParam param) {
        return null;
    }

    @Override
    public List<SysConfigResult> findListBySpec(SysConfigParam param) {
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(SysConfigParam param) {
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(SysConfigParam param) {
        return param.getId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private SysConfig getOldEntity(SysConfigParam param) {
        return this.getById(getKey(param));
    }

    private SysConfig getEntity(SysConfigParam param) {
        SysConfig entity = new SysConfig();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
