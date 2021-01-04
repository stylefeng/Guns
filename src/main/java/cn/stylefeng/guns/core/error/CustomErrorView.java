package cn.stylefeng.guns.core.error;

import org.beetl.ext.spring.BeetlSpringView;

/**
 * 错误页面的默认跳转(例如请求404的时候,默认走这个视图解析器)
 *
 * @author fengshuonan
 * @date 2017-05-21 11:34
 */
public class CustomErrorView extends BeetlSpringView {

    @Override
    public String getContentType() {
        return "text/html;charset=UTF-8";
    }

}