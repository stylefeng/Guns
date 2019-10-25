package cn.stylefeng.guns.sys.modular.system.service.impl;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.sys.modular.system.entity.UserPos;
import cn.stylefeng.guns.sys.modular.system.mapper.UserPosMapper;
import cn.stylefeng.guns.sys.modular.system.model.params.UserPosParam;
import cn.stylefeng.guns.sys.modular.system.model.result.UserPosResult;
import  cn.stylefeng.guns.sys.modular.system.service.UserPosService;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 用户职位关联表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2019-06-28
 */
@Service
public class UserPosServiceImpl extends ServiceImpl<UserPosMapper, UserPos> implements UserPosService {

    @Override
    public void add(UserPosParam param){
        UserPos entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(UserPosParam param){
        this.removeById(getKey(param));
    }

    @Override
    public void update(UserPosParam param){
        UserPos oldEntity = getOldEntity(param);
        UserPos newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public UserPosResult findBySpec(UserPosParam param){
        return null;
    }

    @Override
    public List<UserPosResult> findListBySpec(UserPosParam param){
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(UserPosParam param){
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(UserPosParam param){
        return param.getUserPosId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private UserPos getOldEntity(UserPosParam param) {
        return this.getById(getKey(param));
    }

    private UserPos getEntity(UserPosParam param) {
        UserPos entity = new UserPos();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
