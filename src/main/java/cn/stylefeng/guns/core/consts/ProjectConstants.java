package cn.stylefeng.guns.core.consts;

import cn.stylefeng.guns.GunsApplication;

/**
 * 项目的常量
 *
 * @author fengshuonan
 * @date 2020/12/16 14:28
 */
public interface ProjectConstants {

    /**
     * 项目的模块名称
     */
    String PROJECT_MODULE_NAME = "guns-standalone";

    /**
     * 异常枚举的步进值
     */
    String BUSINESS_EXCEPTION_STEP_CODE = "100";

    /**
     * 项目的包名，例如cn.stylefeng.guns
     */
    String ROOT_PACKAGE_NAME = GunsApplication.class.getPackage().getName();

}
