package cn.stylefeng.guns.core.error;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.stylefeng.roses.kernel.auth.api.exception.AuthException;
import cn.stylefeng.roses.kernel.auth.api.exception.enums.AuthExceptionEnum;
import cn.stylefeng.roses.kernel.demo.exception.DemoException;
import cn.stylefeng.roses.kernel.demo.exception.enums.DemoExceptionEnum;
import cn.stylefeng.roses.kernel.rule.constants.SymbolConstant;
import cn.stylefeng.roses.kernel.rule.exception.AbstractExceptionEnum;
import cn.stylefeng.roses.kernel.rule.exception.base.ServiceException;
import cn.stylefeng.roses.kernel.rule.exception.enums.defaults.DefaultBusinessExceptionEnum;
import cn.stylefeng.roses.kernel.rule.pojo.response.ErrorResponseData;
import cn.stylefeng.roses.kernel.rule.util.ExceptionUtil;
import cn.stylefeng.roses.kernel.rule.util.HttpServletUtil;
import cn.stylefeng.roses.kernel.rule.util.ResponseRenderUtil;
import cn.stylefeng.roses.kernel.validator.api.exception.ParamValidateException;
import cn.stylefeng.roses.kernel.validator.api.exception.enums.ValidatorExceptionEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.exceptions.PersistenceException;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.util.List;

import static cn.stylefeng.guns.core.consts.ProjectConstants.ROOT_PACKAGE_NAME;

/**
 * 全局异常处理器，拦截控制器层的异常
 *
 * @author fengshuonan
 * @since 2020/12/16 14:20
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 请求参数缺失异常
     *
     * @author fengshuonan
     * @since 2020/12/16 14:20
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> missingParam(MissingServletRequestParameterException missingServletRequestParameterException) {
        String parameterName = missingServletRequestParameterException.getParameterName();
        String parameterType = missingServletRequestParameterException.getParameterType();
        return renderJson(ValidatorExceptionEnum.MISSING_SERVLET_REQUEST_PARAMETER_EXCEPTION, parameterName, parameterType);
    }

    /**
     * HttpMessageConverter转化异常，一般为json解析异常
     *
     * @author fengshuonan
     * @since 2020/12/16 14:21
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> httpMessageNotReadable(HttpMessageNotReadableException httpMessageNotReadableException) {
        log.error("参数格式传递异常，具体信息为：{}", httpMessageNotReadableException.getMessage());
        return renderJson(ValidatorExceptionEnum.HTTP_MESSAGE_CONVERTER_ERROR);
    }

    /**
     * 拦截不支持媒体类型异常
     *
     * @author fengshuonan
     * @since 2020/12/16 14:26
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> httpMediaTypeNotSupport(HttpMediaTypeNotSupportedException httpMediaTypeNotSupportedException) {
        log.error("参数格式传递异常，具体信息为：{}", httpMediaTypeNotSupportedException.getMessage());
        return renderJson(ValidatorExceptionEnum.HTTP_MEDIA_TYPE_NOT_SUPPORT);
    }

    /**
     * 不受支持的http method
     *
     * @author fengshuonan
     * @since 2020/12/16 14:56
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> methodNotSupport(HttpServletRequest request) {
        String httpMethod = request.getMethod().toUpperCase();
        return renderJson(ValidatorExceptionEnum.HTTP_METHOD_NOT_SUPPORT, httpMethod);
    }

    /**
     * 404找不到资源
     *
     * @author fengshuonan
     * @since 2020/12/16 14:58
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> notFound(NoHandlerFoundException e) {
        return renderJson(ValidatorExceptionEnum.NOT_FOUND);
    }

    /**
     * 请求参数校验失败，拦截 @Valid 校验失败的情况
     *
     * @author fengshuonan
     * @since 2020/12/16 14:59
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        String bindingResult = getArgNotValidMessage(e.getBindingResult());
        return renderJson(ValidatorExceptionEnum.VALIDATED_RESULT_ERROR, bindingResult);
    }

    /**
     * 请求参数校验失败，拦截 @Validated 校验失败的情况
     * <p>
     * 两个注解 @Valid 和 @Validated 区别是后者可以加分组校验，前者没有分组校验
     *
     * @author fengshuonan
     * @since 2020/12/16 15:08
     */
    @ExceptionHandler(BindException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> bindException(BindException e) {
        String bindingResult = getArgNotValidMessage(e.getBindingResult());
        return renderJson(ValidatorExceptionEnum.VALIDATED_RESULT_ERROR, bindingResult);
    }

    /**
     * 拦截 @TableUniqueValue 里抛出的异常
     *
     * @author fengshuonan
     * @since 2020/12/26 14:05
     */
    @ExceptionHandler(ValidationException.class)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseData<?> bindException(ValidationException e) {
        if (e.getCause() instanceof ParamValidateException) {
            ParamValidateException paramValidateException = (ParamValidateException) e.getCause();
            return renderJson(paramValidateException.getErrorCode(), paramValidateException.getUserTip());
        }
        return renderJson(e);
    }

    /**
     * 拦截全校校验一类的异常
     * <p>
     * 这里重点做一类特殊处理，也就是对过期登录用用户
     * <p>
     * 如果用户登录过期，并且为ajax请求，则response的header增加session-timeout的标识
     * <p>
     * 如果用户登录过期，不是ajax请求，则直接跳转到登录页面，并提示会话超时
     *
     * @author fengshuonan
     * @since 2020/12/16 15:11
     */
    @ExceptionHandler(AuthException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String authError(AuthException authException, HttpServletRequest request, HttpServletResponse response, Model model) {
        String errorCode = authException.getErrorCode();

        // 如果是会话过期或超时
        if (AuthExceptionEnum.AUTH_EXPIRED_ERROR.getErrorCode().equals(errorCode)) {

            // 如果是普通请求
            if (HttpServletUtil.getNormalRequestFlag(request)) {
                // 根据是否是前后端分离项目，进行结果响应
                return this.renderLoginResult(response, authException, model);
            } else {
                // 其他请求或者是ajax请求
                ErrorResponseData<?> errorResponseData = renderJson(authException.getErrorCode(), authException.getUserTip(), authException);
                ResponseRenderUtil.renderJsonResponse(response, errorResponseData);
                return null;
            }
        }

        // 如果是没带token访问页面，则返回到登录界面
        if (AuthExceptionEnum.TOKEN_GET_ERROR.getErrorCode().equals(errorCode)) {
            if (HttpServletUtil.getNormalRequestFlag(request)) {
                // 根据是否是前后端分离项目，进行结果响应
                return this.renderLoginResult(response, authException, model);
            }
        }

        // 默认响应前端json
        ErrorResponseData<?> errorResponseData = renderJson(authException.getErrorCode(), authException.getUserTip(), authException);
        ResponseRenderUtil.renderJsonResponse(response, errorResponseData);
        return null;
    }

    /**
     * 拦截业务代码抛出的异常
     *
     * @author fengshuonan
     * @since 2020/12/16 15:11
     */
    @ExceptionHandler(ServiceException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponseData<?> businessError(ServiceException e) {
        log.error("业务异常。", e);
        return renderJson(e.getErrorCode(), e.getUserTip(), e);
    }

    /**
     * 拦截mybatis数据库操作的异常
     * <p>
     * 用在demo模式，拦截DemoException
     *
     * @author stylefeng
     * @since 2020/5/5 15:19
     */
    @ExceptionHandler(MyBatisSystemException.class)
    @ResponseBody
    public ErrorResponseData<?> persistenceException(MyBatisSystemException e) {
        log.error(">>> mybatis操作出现异常,", e);
        Throwable cause = e.getCause();
        if (cause instanceof PersistenceException) {
            Throwable secondCause = cause.getCause();
            if (secondCause instanceof DemoException) {
                return renderJson(DemoExceptionEnum.DEMO_OPERATE);
            }
        }
        return renderJson(e);
    }

    /**
     * 拦截未知的运行时异常
     *
     * @author fengshuonan
     * @since 2020/12/16 15:12
     */
    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponseData<?> serverError(Throwable e) {
        log.error("服务器运行异常", e);
        return renderJson(e);
    }

    /**
     * 渲染异常json
     *
     * @author fengshuonan
     * @since 2020/5/5 16:22
     */
    private ErrorResponseData<?> renderJson(String code, String message) {
        return renderJson(code, message, null);
    }

    /**
     * 渲染异常json
     *
     * @author fengshuonan
     * @since 2020/5/5 16:22
     */
    private ErrorResponseData<?> renderJson(AbstractExceptionEnum exception, Object... params) {
        return renderJson(exception.getErrorCode(), StrUtil.format(exception.getUserTip(), params), null);
    }

    /**
     * 渲染异常json
     *
     * @author fengshuonan
     * @since 2020/5/5 16:22
     */
    private ErrorResponseData<?> renderJson(AbstractExceptionEnum abstractExceptionEnum) {
        return renderJson(abstractExceptionEnum.getErrorCode(), abstractExceptionEnum.getUserTip(), null);
    }

    /**
     * 渲染异常json
     *
     * @author fengshuonan
     * @since 2020/5/5 16:22
     */
    private ErrorResponseData<?> renderJson(Throwable throwable) {
        return renderJson(DefaultBusinessExceptionEnum.SYSTEM_RUNTIME_ERROR.getErrorCode(), DefaultBusinessExceptionEnum.SYSTEM_RUNTIME_ERROR.getUserTip(), throwable);
    }

    /**
     * 渲染异常json
     * <p>
     * 根据异常枚举和Throwable异常响应，异常信息响应堆栈第一行
     *
     * @author stylefeng
     * @since 2020/5/5 16:22
     */
    private ErrorResponseData<?> renderJson(String code, String message, Throwable throwable) {
        if (ObjectUtil.isNotNull(throwable)) {
            ErrorResponseData<?> errorResponseData = new ErrorResponseData<>(code, message);
            ExceptionUtil.fillErrorResponseData(errorResponseData, throwable, ROOT_PACKAGE_NAME);
            return errorResponseData;
        } else {
            return new ErrorResponseData<>(code, message);
        }
    }

    /**
     * 获取请求参数不正确的提示信息
     * <p>
     * 多个信息，拼接成用逗号分隔的形式
     *
     * @author stylefeng
     * @since 2020/5/5 16:50
     */
    private String getArgNotValidMessage(BindingResult bindingResult) {
        if (bindingResult == null) {
            return "";
        }
        StringBuilder stringBuilder = new StringBuilder();

        //多个错误用逗号分隔
        List<ObjectError> allErrorInfos = bindingResult.getAllErrors();
        for (ObjectError error : allErrorInfos) {
            stringBuilder.append(SymbolConstant.COMMA).append(error.getDefaultMessage());
        }

        //最终把首部的逗号去掉
        return StrUtil.removePrefix(stringBuilder.toString(), SymbolConstant.COMMA);
    }

    /**
     * 渲染登录界面，分两种情况
     * <p>
     * 第一种，如果是前后端不分离，则渲染登录界面即可
     * <p>
     * 第二种，如果是前后端分离项目，则渲染Json结果
     *
     * @author fengshuonan
     * @since 2021/5/18 10:48
     */
    private String renderLoginResult(HttpServletResponse response, AuthException authException, Model model) {
        ErrorResponseData<?> errorResponseData = renderJson(authException.getErrorCode(), authException.getUserTip(), authException);
        ResponseRenderUtil.renderJsonResponse(response, errorResponseData);
        return null;
    }

}
