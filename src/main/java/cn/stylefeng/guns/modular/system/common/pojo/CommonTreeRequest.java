package cn.stylefeng.guns.modular.system.common.pojo;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 通用树选择器界面的请求参数
 *
 * @author fengshuonan
 * @date 2021/1/6 20:20
 */
@Data
public class CommonTreeRequest {

    /**
     * 传递给上级页面的哪个字段，例如 parent.MenuInfoDlg.data.pcodeName
     */
    @NotBlank(message = "fromName不能为空")
    private String formName;

    /**
     * 传递给上级页面的哪个id值，例如 parent.MenuInfoDlg.data.pid
     */
    @NotBlank(message = "formId不能为空")
    private String formId;

    /**
     * 渲染出数据的url，例如/menu/selectMenuTreeList
     */
    @NotBlank(message = "tree渲染的url参数不能为空")
    private String treeUrl;

}
