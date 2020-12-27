package cn.stylefeng.guns.core.beetl.expander;

import cn.stylefeng.guns.core.beetl.consts.BeetlConstants;
import cn.stylefeng.roses.kernel.config.api.context.ConfigContext;

/**
 * Beetl模板引擎相关配置
 *
 * @author fengshuonan
 * @date 2020/12/27 11:36
 */
public class BeetlConfigExpander {

    /**
     * 边界符开始符号
     *
     * @author fengshuonan
     * @date 2020/12/27 12:27
     */
    public static String getDelimiterStatementStart() {
        return ConfigContext.me().getSysConfigValueWithDefault("DELIMITER_STATEMENT_START", String.class, BeetlConstants.DEFAULT_DELIMITER_STATEMENT_START);
    }

    /**
     * beetl边界符的结束符号
     *
     * @author fengshuonan
     * @date 2020/12/27 12:27
     */
    public static String getDelimiterStatementEnd() {
        return ConfigContext.me().getSysConfigValueWithDefault("DELIMITER_STATEMENT_END", String.class, BeetlConstants.DEFAULT_DELIMITER_STATEMENT_END);
    }

    /**
     * 自定义标签文件Root目录
     *
     * @author fengshuonan
     * @date 2020/12/27 12:27
     */
    public static String getResourceTagRoot() {
        return ConfigContext.me().getSysConfigValueWithDefault("RESOURCE_TAG_ROOT", String.class, BeetlConstants.DEFAULT_RESOURCE_TAG_ROOT);
    }

    /**
     * 自定义标签文件后缀
     *
     * @author fengshuonan
     * @date 2020/12/27 12:27
     */
    public static String getResourceTagSuffix() {
        return ConfigContext.me().getSysConfigValueWithDefault("RESOURCE_TAG_SUFFIX", String.class, BeetlConstants.DEFAULT_RESOURCE_TAG_SUFFIX);
    }

    /**
     * 是否检测文件变化,开发用true合适，但线上要改为false
     *
     * @author fengshuonan
     * @date 2020/12/27 12:27
     */
    public static String getResourceAutoCheck() {
        return ConfigContext.me().getSysConfigValueWithDefault("RESOURCE_AUTO_CHECK", String.class, BeetlConstants.DEFAULT_RESOURCE_AUTO_CHECK);
    }

}
