package cn.stylefeng.guns.core.error;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.stylefeng.roses.kernel.rule.pojo.response.ErrorResponseData;
import cn.stylefeng.roses.kernel.rule.util.ResponseRenderUtil;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 错误页面的默认跳转(例如请求404的时候,默认走这个视图解析器)
 *
 * @author fengshuonan
 * @date 2017-05-21 11:34
 */
public class CustomErrorView implements View {

    @Override
    public String getContentType() {
        return "text/html";
    }

    @Override
    public void render(Map<String, ?> map, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        ErrorResponseData errorResponseData = BeanUtil.mapToBean(map, ErrorResponseData.class, true, CopyOptions.create().ignoreError());
        ResponseRenderUtil.renderErrorResponse(httpServletResponse, errorResponseData.getCode(), errorResponseData.getMessage(), errorResponseData.getExceptionClazz());
    }

}