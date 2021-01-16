package cn.stylefeng.guns.core.beetl.tag;

import cn.hutool.core.util.StrUtil;
import cn.stylefeng.guns.core.beetl.enums.SelectTagHeadTypeEnum;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDict;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDictType;
import cn.stylefeng.roses.kernel.rule.enums.YesOrNotEnum;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

/**
 * select字典组件
 *
 * @author liuhanqing
 * @date 2021/1/16 19:37
 */
@Slf4j
public class SysDictSelectTag extends SysDictBaseTag {

    @Override
    public void render() {
        // 初始属性
        initAttr();
        StringBuilder sb = new StringBuilder();
        // 当字典类型编码不为空
        if (StrUtil.isNotBlank(this.getDictTypeCode())) {
            sb.append("<select name='").append(this.getName())
                    .append("' id='").append(this.getId())
                    .append("'");

            // layui 事件过滤器
            if (StrUtil.isNotBlank(this.getLayFilter())) {
                sb.append(" lay-filter='").append(this.getLayFilter()).append("' ");
            }
            // layui 表单验证
            if (StrUtil.isNotBlank(this.getLayVerify())) {
                sb.append(" lay-verify='").append(this.getLayVerify()).append("' ");
            }
            // 原有工作流用到
            if (StrUtil.isNotBlank(this.getWorkflowForm())) {
                sb.append(" workFlowForm='").append(this.getWorkflowForm()).append("' ");
            }
            if (StrUtil.isNotBlank(this.getItemName())) {
                sb.append(" itemName='").append(this.getItemName()).append("' ");
            }
            sb.append(" >");

            if (StrUtil.isNotBlank(this.getHeadName())) {
                sb.append("<option value='").append(this.getHeadValue()).append("' selected>")
                        .append(this.getHeadName()).append("</option>");
            } else {
                if (StrUtil.isNotBlank(this.getHeadType())) {
                    if (SelectTagHeadTypeEnum.ALL.getCode().equals(this.getHeadType())) {
                        sb.append("<option value='").append(this.getHeadValue()).append("' selected>")
                                .append(" - 全部 - ").append("</option>");
                    }
                    if (SelectTagHeadTypeEnum.SELECT.getCode().equals(this.getHeadType())) {
                        sb.append("<option value='").append(this.getHeadValue()).append("' selected>")
                                .append(" - 请选择 - ").append("</option>");
                    }
                }
            }
            // 根据字典类型编码去查询字典类型
            SysDictType dictType = getDictType();
            // 判断字典类型不为空
            if (dictType != null) {
                List<SysDict> lst = getDictList();
                // 默认选中值
                String defaultValue = this.getDefaultValue();
                // 循环字典列表，添加下拉选项
                int index = 0;
                for (SysDict option : lst) {
                    sb.append("<option value='").append(option.getDictCode()).append("'");
                    // 设置默认选中值
                    if (StrUtil.isNotBlank(defaultValue) && defaultValue.equals(option.getDictCode())) {
                        sb.append(" selected ");
                    } else {
                        // 未设置headName和headType 默认选中第一个
                        if (index == 0 && StrUtil.isNotBlank(this.getHeadName()) && StrUtil.isNotBlank(this.getHeadType())) {
                            sb.append(" selected ");
                        }
                    }
                    sb.append(">").append(option.getDictName()).append("</option>");
                    index++;
                }
            }
            sb.append("</select>");
        }
        try {
            this.ctx.byteWriter.writeString(sb.toString());
        } catch (IOException e) {
            log.error("select字典初始化异常：",e);
        }
    }
}
