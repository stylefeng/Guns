package cn.stylefeng.guns.core.beetl.consts;

/**
 * beetl模板引擎的常量
 *
 * @author fengshuonan
 * @date 2020/12/27 12:20
 */
public interface BeetlConstants {

    /**
     * 默认边界符开始
     * <p>
     * beetl默认的是 '<%'
     */
    String DEFAULT_DELIMITER_STATEMENT_START = "@";

    /**
     * 默认beetl边界符的结束
     * <p>
     * beetl默认的是 '%>'
     */
    String DEFAULT_DELIMITER_STATEMENT_END = "null";

    /**
     * 自定义标签文件Root目录
     */
    String DEFAULT_RESOURCE_TAG_ROOT = "common/tags";

    /**
     * 自定义标签文件后缀
     */
    String DEFAULT_RESOURCE_TAG_SUFFIX = "tag";

    /**
     * 是否检测文件变化,开发用true合适，但线上要改为false
     */
    String DEFAULT_RESOURCE_AUTO_CHECK = "false";

    /**
     * 默认beetl 支持HTML标签
     * <p>
     * beetl默认的是 '#'
     */
    String DEFAULT_HTML_TAG_FLAG = "tag:";
}
