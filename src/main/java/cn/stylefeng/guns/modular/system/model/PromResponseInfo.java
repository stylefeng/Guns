package cn.stylefeng.guns.modular.system.model;

import lombok.Data;

/**
 * prometheus http响应信息
 *
 * @author chenli
 * @date 2021/1/10 19:00
 */
@Data
public class PromResponseInfo {

    /**
     * 状态:
     * <p>
     * 成功-success
     */
    private String status;

    /**
     * prometheus指标属性和值
     */
    private PromDataInfo data;

}
