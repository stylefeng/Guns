package generator.config;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.template.engine.SimpleTemplateEngine;
import com.stylefeng.guns.core.template.engine.base.GunsTemplateEngine;

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

    /**
     * Guns代码生成器配置
     */
    ContextConfig contextConfig = new ContextConfig();

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

        //controller没用掉,生成之后会自动删掉
        packageConfig.setController("TTT");
        packageConfig.setService("com.stylefeng.guns.modular." + contextConfig.getModuleName() + ".service");
        packageConfig.setServiceImpl("com.stylefeng.guns.modular." + contextConfig.getModuleName() + ".service.impl");
    }

    public AbstractGeneratorConfig() {
        init();
    }

    public AutoGenerator getGenerator() {
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(globalConfig);
        autoGenerator.setDataSource(dataSourceConfig);
        autoGenerator.setStrategy(strategyConfig);
        autoGenerator.setPackageInfo(packageConfig);
        return autoGenerator;
    }

    public GunsTemplateEngine getGunsTemplateEngine() {
        GunsTemplateEngine gunsTemplateEngine = new SimpleTemplateEngine();
        gunsTemplateEngine.setContextConfig(contextConfig);
        return gunsTemplateEngine;
    }
}
