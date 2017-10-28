package generator.config;

import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

/**
 * 默认的代码生成的配置
 *
 * @author fengshuonan
 * @date 2017-10-28-下午8:27
 */
public class GunsGeneratorConfig extends AbstractGeneratorConfig {

    @Override
    protected void globalConfig() {
        super.globalConfig.setOutputDir("/Users/stylefeng/work/ideaSpace/guns/guns-admin/src/main/java");
        super.globalConfig.setFileOverride(true);
        super.globalConfig.setEnableCache(false);
        super.globalConfig.setBaseResultMap(true);
        super.globalConfig.setBaseColumnList(true);
        super.globalConfig.setAuthor("stylefeng");
    }

    @Override
    protected void dataSourceConfig() {
        super.dataSourceConfig.setDbType(DbType.MYSQL);
        super.dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
        super.dataSourceConfig.setUsername("root");
        super.dataSourceConfig.setPassword("root");
        super.dataSourceConfig.setUrl("jdbc:mysql://127.0.0.1:3306/guns?characterEncoding=utf8");
    }

    @Override
    protected void strategyConfig() {
        //strategy.setTablePrefix(new String[]{"_"});// 此处可以修改为您的表前缀
        super.strategyConfig.setInclude(new String[]{"bill"});
        super.strategyConfig.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
    }

    @Override
    protected void packageConfig() {
        super.packageConfig.setParent(null);
        super.packageConfig.setEntity("com.stylefeng.guns.common.persistence.model");
        super.packageConfig.setMapper("com.stylefeng.guns.common.persistence.dao");
        super.packageConfig.setXml("com.stylefeng.guns.common.persistence.dao.mapping");
        super.packageConfig.setService("TTT");       //本项目没用，生成之后删掉
        super.packageConfig.setServiceImpl("TTT");   //本项目没用，生成之后删掉
        super.packageConfig.setController("TTT");    //本项目没用，生成之后删掉
    }
}
