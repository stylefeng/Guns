package com.stylefeng.guns.generator.engine.config;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.stylefeng.guns.core.util.ToolUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * 全局配置
 *
 * @author fengshuonan
 * @date 2017-05-08 20:21
 */
public class SqlConfig {

    private String sqlPathTemplate;

    private ContextConfig contextConfig;

    private Connection connection;

    private String parentMenuName;

    private List<Permission> menus = new ArrayList<>(6);

    public void init() {

        this.sqlPathTemplate = "\\src\\main\\java\\{}.sql";

        if(parentMenuName == null){
            return ;
        }

        //根据父菜单查询数据库中的pcode和pcodes
        String[] pcodeAndPcodes = getPcodeAndPcodes();
        if (pcodeAndPcodes == null) {
            System.err.println("父级菜单名称输入有误!!!!");
            return;
        }

        //业务菜单
        Permission menu = new Permission();
        menu.setId(IdWorker.getId());
        menu.setCode(contextConfig.getBizEnName());
        menu.setPid(Long.valueOf(pcodeAndPcodes[0]));
        menu.setPids(pcodeAndPcodes[1] + "[" + pcodeAndPcodes[0] + "],");
        menu.setName(contextConfig.getBizChName());
        menu.setIcon("");
        menu.setUrl("/" + contextConfig.getBizEnName());
        menu.setSort(99);
        menu.setLevel(2);
        menu.setMenuFlag("Y");
        menu.setStatus("Y");
        menu.setOpenFlag("N");
        menus.add(menu);

        //列表
        Permission list = createSubMenu(menu);
        list.setCode(contextConfig.getBizEnName() + "_list");
        list.setName(contextConfig.getBizChName() + "列表");
        list.setUrl("/" + contextConfig.getBizEnName() + "/list");
        menus.add(list);

        //添加
        Permission add = createSubMenu(menu);
        add.setCode(contextConfig.getBizEnName() + "_add");
        add.setName(contextConfig.getBizChName() + "添加");
        add.setUrl("/" + contextConfig.getBizEnName() + "/add");
        menus.add(add);

        //更新
        Permission update = createSubMenu(menu);
        update.setCode(contextConfig.getBizEnName() + "_update");
        update.setName(contextConfig.getBizChName() + "更新");
        update.setUrl("/" + contextConfig.getBizEnName() + "/update");
        menus.add(update);

        //删除
        Permission delete = createSubMenu(menu);
        delete.setCode(contextConfig.getBizEnName() + "_delete");
        delete.setName(contextConfig.getBizChName() + "删除");
        delete.setUrl("/" + contextConfig.getBizEnName() + "/delete");
        menus.add(delete);

        //详情
        Permission detail = createSubMenu(menu);
        detail.setCode(contextConfig.getBizEnName() + "_detail");
        detail.setName(contextConfig.getBizChName() + "详情");
        detail.setUrl("/" + contextConfig.getBizEnName() + "/detail");
        menus.add(detail);
    }

    private Permission createSubMenu(Permission parentMenu) {
        Permission permission = new Permission();
        permission.setId(IdWorker.getId());
        permission.setPid(parentMenu.getId());
        permission.setPids(parentMenu.getPids() + "[" + parentMenu.getId() + "],");
        permission.setIcon("");
        permission.setSort(99);
        permission.setLevel(3);
        permission.setMenuFlag("N");
        permission.setStatus("Y");
        permission.setOpenFlag("N");
        return permission;
    }

    public String[] getPcodeAndPcodes() {
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = connection.prepareStatement("select * from adi_uc_permission where name like ?");
            preparedStatement.setString(1, "%" + parentMenuName + "%");
            ResultSet results = preparedStatement.executeQuery();
            while (results.next()) {
                String pcode = String.valueOf(results.getLong("id"));
                String pcodes = results.getString("pids");
                if (ToolUtil.isNotEmpty(pcode) && ToolUtil.isNotEmpty(pcodes)) {
                    String[] strings = {pcode, pcodes};
                    return strings;
                } else {
                    return null;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            try {
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public ContextConfig getContextConfig() {
        return contextConfig;
    }

    public void setContextConfig(ContextConfig contextConfig) {
        this.contextConfig = contextConfig;
    }

    public String getParentMenuName() {
        return parentMenuName;
    }

    public void setParentMenuName(String parentMenuName) {
        this.parentMenuName = parentMenuName;
    }

    public Connection getConnection() {
        return connection;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }

    public String getSqlPathTemplate() {
        return sqlPathTemplate;
    }

    public void setSqlPathTemplate(String sqlPathTemplate) {
        this.sqlPathTemplate = sqlPathTemplate;
    }

    public List<Permission> getMenus() {
        return menus;
    }

    public void setMenus(List<Permission> menus) {
        this.menus = menus;
    }
}
