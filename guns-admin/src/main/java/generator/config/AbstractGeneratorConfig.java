package generator.config;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.template.config.SqlConfig;
import com.stylefeng.guns.core.template.engine.SimpleTemplateEngine;
import com.stylefeng.guns.core.template.engine.base.GunsTemplateEngine;
import com.stylefeng.guns.core.util.FileUtil;

import java.io.File;
import java.util.List;

/**
 * 代码生成的抽象配置
 *
 * @author fengshuonan
 * @date 2017-10-28-下午8:22
 */
public abstract class AbstractGeneratorConfig {

    /**
     * mybatis-plus代码生成器配置
     */

    GlobalConfig globalConfig = new GlobalConfig();

    DataSourceConfig dataSourceConfig = new DataSourceConfig();

    StrategyConfig strategyConfig = new StrategyConfig();

    PackageConfig packageConfig = new PackageConfig();

    TableInfo tableInfo = null;

    /**
     * Guns代码生成器配置
     */
    ContextConfig contextConfig = new ContextConfig();

    SqlConfig sqlConfig = new SqlConfig();

    protected abstract void globalConfig();

    protected abstract void dataSourceConfig();

    protected abstract void strategyConfig();

    protected abstract void packageConfig();

    protected abstract void contextConfig();

    public void init() {
        globalConfig();
        dataSourceConfig();
        strategyConfig();
        packageConfig();
        contextConfig();

        packageConfig.setService("com.stylefeng.guns.modular." + contextConfig.getModuleName() + ".service");
        packageConfig.setServiceImpl("com.stylefeng.guns.modular." + contextConfig.getModuleName() + ".service.impl");

        //controller没用掉,生成之后会自动删掉
        packageConfig.setController("TTT");

        if (!contextConfig.getEntitySwitch()) {
            packageConfig.setEntity("TTT");
        }

        if (!contextConfig.getDaoSwitch()) {
            packageConfig.setMapper("TTT");
            packageConfig.setXml("TTT");
        }

        if (!contextConfig.getServiceSwitch()) {
            packageConfig.setService("TTT");
            packageConfig.setServiceImpl("TTT");
        }

    }

    /**
     * 删除不必要的代码
     */
    public void destory() {
        String outputDir = globalConfig.getOutputDir() + "/TTT";
        FileUtil.deleteDir(new File(outputDir));
    }

    public AbstractGeneratorConfig() {
        init();
    }

    public void doMpGeneration() {
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(globalConfig);
        autoGenerator.setDataSource(dataSourceConfig);
        autoGenerator.setStrategy(strategyConfig);
        autoGenerator.setPackageInfo(packageConfig);
        autoGenerator.execute();
        destory();

        //获取table信息,用于guns代码生成
        List<TableInfo> tableInfoList = autoGenerator.getConfig().getTableInfoList();
        if(tableInfoList != null && tableInfoList.size() > 0){
            this.tableInfo = tableInfoList.get(0);
        }
    }

    public void doGunsGeneration() {
        GunsTemplateEngine gunsTemplateEngine = new SimpleTemplateEngine();
        gunsTemplateEngine.setContextConfig(contextConfig);
        sqlConfig.setConnection(dataSourceConfig.getConn());
        gunsTemplateEngine.setSqlConfig(sqlConfig);
        gunsTemplateEngine.setTableInfo(tableInfo);
        gunsTemplateEngine.start();
    }
}
