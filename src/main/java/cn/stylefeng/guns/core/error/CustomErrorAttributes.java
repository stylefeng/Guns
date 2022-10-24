package cn.stylefeng.guns.core.error;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.http.HttpStatus;
import cn.stylefeng.roses.kernel.rule.exception.base.ServiceException;
import cn.stylefeng.roses.kernel.rule.exception.enums.defaults.DefaultBusinessExceptionEnum;
import cn.stylefeng.roses.kernel.rule.pojo.response.ErrorResponseData;
import cn.stylefeng.roses.kernel.validator.api.exception.enums.ValidatorExceptionEnum;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

/**
 * 将系统管理未知错误异常，输出格式重写为我们熟悉的响应格式
 *
 * @author fengshuonan
 * @since 2020/12/16 14:36
 */
public class CustomErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions attributeOptions) {

        // 1.先获取spring默认的返回内容
        Map<String, Object> defaultErrorAttributes = super.getErrorAttributes(webRequest, attributeOptions);

        // 2.如果返回的异常是ServiceException，则按ServiceException响应的内容进行返回
        Throwable throwable = this.getError(webRequest);
        if (throwable instanceof ServiceException) {
            ServiceException serviceException = (ServiceException) throwable;
            return BeanUtil.beanToMap(new ErrorResponseData<>(serviceException.getErrorCode(), serviceException.getUserTip()));
        }

        // 3.如果返回的是404 http状态码
        Integer status = (Integer) defaultErrorAttributes.get("status");
        if (status.equals(HttpStatus.HTTP_NOT_FOUND)) {
            Map<String, Object> customAttrs = BeanUtil.beanToMap(new ErrorResponseData<>(ValidatorExceptionEnum.NOT_FOUND.getErrorCode(), ValidatorExceptionEnum.NOT_FOUND.getUserTip()));
            customAttrs.putAll(defaultErrorAttributes);
            return customAttrs;
        }

        // 4.无法确定的返回服务器异常
        return BeanUtil.beanToMap(new ErrorResponseData<>(DefaultBusinessExceptionEnum.SYSTEM_RUNTIME_ERROR.getErrorCode(), DefaultBusinessExceptionEnum.SYSTEM_RUNTIME_ERROR.getUserTip()));
    }

}
