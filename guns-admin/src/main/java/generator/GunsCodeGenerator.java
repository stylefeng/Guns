package generator;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import generator.config.GunsGeneratorConfig;

/**
 * 代码生成器,可以生成实体,dao,service,controller,html,js
 *
 * @author stylefeng
 * @Date 2017/5/21 12:38
 */
public class GunsCodeGenerator {

    public static void main(String[] args) {
        AutoGenerator generator = new GunsGeneratorConfig().getGenerator();
        generator.execute();
    }

}