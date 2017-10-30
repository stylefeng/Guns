package generator;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.stylefeng.guns.core.template.engine.base.GunsTemplateEngine;
import generator.config.GunsGeneratorConfig;

/**
 * 代码生成器,可以生成实体,dao,service,controller,html,js
 *
 * @author stylefeng
 * @Date 2017/5/21 12:38
 */
public class GunsCodeGenerator {

    public static void main(String[] args) {

        //mp的生成器
        GunsGeneratorConfig gunsGeneratorConfig = new GunsGeneratorConfig();
        AutoGenerator generator = gunsGeneratorConfig.getGenerator();
        generator.execute();

        //guns的生成器
        GunsTemplateEngine gunsTemplateEngine = gunsGeneratorConfig.getGunsTemplateEngine();
        gunsTemplateEngine.start();
    }

}