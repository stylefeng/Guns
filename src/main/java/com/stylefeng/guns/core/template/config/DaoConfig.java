package com.stylefeng.guns.core.template.config;

/**
 * Dao模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class DaoConfig {

    private String daoPathTemplate = "\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\dao\\{}Dao.java";
    private String xmlPathTemplate = "\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\dao\\mapping\\{}Dao.xml";

    private String packageName = "com.stylefeng.guns.modular.system.dao";

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getDaoPathTemplate() {
        return daoPathTemplate;
    }

    public void setDaoPathTemplate(String daoPathTemplate) {
        this.daoPathTemplate = daoPathTemplate;
    }

    public String getXmlPathTemplate() {
        return xmlPathTemplate;
    }

    public void setXmlPathTemplate(String xmlPathTemplate) {
        this.xmlPathTemplate = xmlPathTemplate;
    }
}
