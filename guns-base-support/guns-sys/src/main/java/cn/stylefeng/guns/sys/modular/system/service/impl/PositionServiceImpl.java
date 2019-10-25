package cn.stylefeng.guns.sys.modular.system.service.impl;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.sys.modular.system.entity.Position;
import cn.stylefeng.guns.sys.modular.system.entity.UserPos;
import cn.stylefeng.guns.sys.modular.system.mapper.PositionMapper;
import cn.stylefeng.guns.sys.modular.system.model.params.PositionParam;
import cn.stylefeng.guns.sys.modular.system.model.result.PositionResult;
import cn.stylefeng.guns.sys.modular.system.service.PositionService;
import cn.stylefeng.guns.sys.modular.system.service.UserPosService;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 职位表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2019-06-27
 */
@Service
public class PositionServiceImpl extends ServiceImpl<PositionMapper, Position> implements PositionService {

    @Autowired
    private UserPosService userPosService;

    @Override
    public void add(PositionParam param) {
        Position entity = getEntity(param);
        this.save(entity);
    }

    @Override
    public void delete(PositionParam param) {
        this.removeById(getKey(param));
    }

    @Override
    public void update(PositionParam param) {
        Position oldEntity = getOldEntity(param);
        Position newEntity = getEntity(param);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public PositionResult findBySpec(PositionParam param) {
        return null;
    }

    @Override
    public List<PositionResult> findListBySpec(PositionParam param) {
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(PositionParam param) {
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.customPageList(pageContext, param);
        return LayuiPageFactory.createPageInfo(page);
    }

    @Override
    public LayuiPageInfo listPositions(Long userId) {

        //找出所有职位
        List<Map<String, Object>> list = this.baseMapper.getAllPositionMap();

        //用户id为空，则直接返回
        if (userId == null) {

        } else {

            //查询用户的职位id列表
            List<UserPos> userPosList = this.userPosService.list(new QueryWrapper<UserPos>().eq("user_id", userId));

            if (userPosList != null && userPosList.size() > 0) {
                for (UserPos userPos : userPosList) {
                    for (Map<String, Object> positionMap : list) {
                        if (userPos.getPosId().equals(positionMap.get("positionId"))) {
                            positionMap.put("selected", true);
                        }
                    }
                }
            }
        }

        LayuiPageInfo layuiPageInfo = new LayuiPageInfo();
        layuiPageInfo.setData(list);
        return layuiPageInfo;

    }

    private Serializable getKey(PositionParam param) {
        return param.getPositionId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private Position getOldEntity(PositionParam param) {
        return this.getById(getKey(param));
    }

    private Position getEntity(PositionParam param) {
        Position entity = new Position();
        ToolUtil.copyProperties(param, entity);
        return entity;
    }

}
