package cn.stylefeng.guns.core.beetl;

import cn.hutool.core.util.StrUtil;
import cn.stylefeng.roses.kernel.auth.api.LoginUserApi;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

/**
 * beetl拓展配置,绑定一些工具类,方便在模板中直接调用
 *
 * @author fengshuonan
 * @date 2020/12/27 11:18
 */
public class CustomBeetlGroupUtilConfiguration extends BeetlGroupUtilConfiguration {

    private final LoginUserApi loginUserApi;

    public CustomBeetlGroupUtilConfiguration(LoginUserApi loginUserApi) {
        this.loginUserApi = loginUserApi;
    }

    @Override
    public void initOther() {
        groupTemplate.registerFunctionPackage("loginUserApi", loginUserApi);
        groupTemplate.registerFunctionPackage("strUtil", StrUtil.class);
        // todo 多语言
//        groupTemplate.registerFunctionPackage("lang", new UserTranslationContext());
    }

}
