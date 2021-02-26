package cn.stylefeng.guns.core.beetl;

import cn.hutool.core.util.ObjectUtil;
import cn.stylefeng.guns.core.beetl.tag.SysDictCheckBoxTag;
import cn.stylefeng.guns.core.beetl.tag.SysDictRadioTag;
import cn.stylefeng.guns.core.beetl.tag.SysDictSelectTag;
import cn.stylefeng.roses.kernel.auth.api.LoginUserApi;
import cn.stylefeng.roses.kernel.i18n.util.QuickTranslateUtil;
import cn.stylefeng.roses.kernel.system.api.expander.SystemConfigExpander;
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

        // 获取当前用户的接口
        groupTemplate.registerFunctionPackage("loginUser", loginUserApi);

        // 对象工具类
        groupTemplate.registerFunctionPackage("objectUtil", ObjectUtil.class);

        // 获取基本信息的工具
        groupTemplate.registerFunctionPackage("constants", SystemConfigExpander.class);

        // 多语言
        groupTemplate.registerFunctionPackage("translate", QuickTranslateUtil.class);

        // 下拉选字典
        groupTemplate.registerTag("dict_select", SysDictSelectTag.class);

        // 单选字典
        groupTemplate.registerTag("dict_radio", SysDictRadioTag.class);

        // 多选字典
        groupTemplate.registerTag("dict_checkbox", SysDictCheckBoxTag.class);
    }

}
