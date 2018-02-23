package com.stylefeng.guns.generator.action.config;

import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.stylefeng.guns.core.support.StrKit;
import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.generator.action.model.GenQo;

import java.io.File;

/**
 * 默认的代码生成的配置
 *
 * @author fengshuonan
 * @date 2017-10-28-下午8:27
 */
public class WebGeneratorConfig extends AbstractGeneratorConfig {

    private GenQo genQo;

    public WebGeneratorConfig(GenQo genQo) {
        this.genQo = genQo;
    }

    @Override
    protected void config() {
        /**
         * 数据库配置
         */
        dataSourceConfig.setDbType(DbType.MYSQL);
        dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
        dataSourceConfig.setUsername(genQo.getUserName());
        dataSourceConfig.setPassword(genQo.getPassword());
        dataSourceConfig.setUrl(genQo.getUrl());

        /**
         * 全局配置
         */
        globalConfig.setOutputDir(genQo.getProjectPath() + File.separator + "src" + File.separator + "main" + File.separator + "java");
        globalConfig.setFileOverride(true);
        globalConfig.setEnableCache(false);
        globalConfig.setBaseResultMap(true);
        globalConfig.setBaseColumnList(true);
        globalConfig.setOpen(false);
        globalConfig.setAuthor(genQo.getAuthor());
        contextConfig.setProPackage(genQo.getProjectPackage());
        contextConfig.setCoreBasePackage(genQo.getCorePackage());

        /**
         * 生成策略
         */
        if (genQo.getIgnoreTabelPrefix() != null) {
            strategyConfig.setTablePrefix(new String[]{genQo.getIgnoreTabelPrefix()});
        }
        strategyConfig.setInclude(new String[]{genQo.getTableName()});
        strategyConfig.setNaming(NamingStrategy.underline_to_camel);
        packageConfig.setParent(null);
        packageConfig.setEntity(genQo.getProjectPackage() + ".modular.system.model");
        packageConfig.setMapper(genQo.getProjectPackage() + ".modular.system.dao");
        packageConfig.setXml(genQo.getProjectPackage() + ".modular.system.dao.mapping");

        /**
         * 业务代码配置
         */
        contextConfig.setBizChName(genQo.getBizName());
        contextConfig.setModuleName(genQo.getModuleName());
        contextConfig.setProjectPath(genQo.getProjectPath());//写自己项目的绝对路径
        if(ToolUtil.isEmpty(genQo.getIgnoreTabelPrefix())){
            String entityName = StrKit.toCamelCase(genQo.getTableName());
            contextConfig.setEntityName(StrKit.firstCharToUpperCase(entityName));
            contextConfig.setBizEnName(StrKit.firstCharToLowerCase(entityName));
        }else{
            String entiyName = StrKit.toCamelCase(StrKit.removePrefix(genQo.getTableName(), genQo.getIgnoreTabelPrefix()));
            contextConfig.setEntityName(StrKit.firstCharToUpperCase(entiyName));
            contextConfig.setBizEnName(StrKit.firstCharToLowerCase(entiyName));
        }
        sqlConfig.setParentMenuName(genQo.getParentMenuName());//这里写已有菜单的名称,当做父节点

        /**
         * mybatis-plus 生成器开关
         */
        contextConfig.setEntitySwitch(genQo.getEntitySwitch());
        contextConfig.setDaoSwitch(genQo.getDaoSwitch());
        contextConfig.setServiceSwitch(genQo.getServiceSwitch());

        /**
         * guns 生成器开关
         */
        contextConfig.setControllerSwitch(genQo.getControllerSwitch());
        contextConfig.setIndexPageSwitch(genQo.getIndexPageSwitch());
        contextConfig.setAddPageSwitch(genQo.getAddPageSwitch());
        contextConfig.setEditPageSwitch(genQo.getEditPageSwitch());
        contextConfig.setJsSwitch(genQo.getJsSwitch());
        contextConfig.setInfoJsSwitch(genQo.getInfoJsSwitch());
        contextConfig.setSqlSwitch(genQo.getSqlSwitch());
    }
}
