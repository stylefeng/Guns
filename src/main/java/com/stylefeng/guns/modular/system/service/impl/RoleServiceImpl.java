package com.stylefeng.guns.modular.system.service.impl;

import com.stylefeng.guns.common.annotion.log.BussinessLog;
import com.stylefeng.guns.core.util.Convert;
import com.stylefeng.guns.modular.system.dao.RoleDao;
import com.stylefeng.guns.modular.system.service.IRoleService;
import com.stylefeng.guns.persistence.dao.RelationMapper;
import com.stylefeng.guns.persistence.model.Relation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class RoleServiceImpl implements IRoleService {

    @Resource
    RoleDao roleDao;

    @Resource
    RelationMapper relationMapper;

    @Override
    @BussinessLog("分配角色权限")
    @Transactional(readOnly = false)
    public void setAuthority(Integer roleId, String ids) {

        // 删除该角色所有的权限
        this.roleDao.deleteRolesById(roleId);

        // 添加新的权限
        for (Integer id : Convert.toIntArray(ids)) {
            Relation relation = new Relation();
            relation.setRoleid(roleId);
            relation.setMenuid(id);
            this.relationMapper.insert(relation);
        }
    }

}
