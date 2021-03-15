package cn.stylefeng.guns.config.validator;

import cn.stylefeng.roses.kernel.validator.api.context.RequestGroupContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * 用于真正校验参数之前缓存一下group的class类型
 * <p>
 * 因为ConstraintValidator的自定义校验中获取不到当前进行的group
 *
 * @author fengshuonan
 * @date 2020/8/12 20:07
 */
@Slf4j
public class GunsValidator extends LocalValidatorFactoryBean {

    @Override
    public void validate(Object target, Errors errors, Object... validationHints) {

        try {
            if (validationHints.length > 0) {

                // 如果是class类型，利用ThreadLocal缓存一下class类型
                if (validationHints[0] instanceof Class) {

                    // 临时保存group的class值
                    RequestGroupContext.set((Class<?>) validationHints[0]);
                }
            }
            super.validate(target, errors, validationHints);
        } finally {
            RequestGroupContext.clear();
        }
    }

}
