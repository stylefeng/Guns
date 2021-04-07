package cn.stylefeng.guns.modular.system.dataCenter;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 数据中心视图控制器
 *
 * @author linjinfeng
 * @date 2021/3/29 10:00
 */
@Controller
@ApiResource(name = "数据中心导入导出相关的界面渲染")
public class dataCenterViewController {

    /**
     * 基础数据-导出中心-视图
     *
     * @author linjinfeng
     * @date 2021/3/29 10:00
     */
    @GetResource(name = "基础数据-导出中心-视图", path = "/view/export")
    public String exportView() {
        return "/modular/system/dataCenter/exportCenter.html";
    }

    /**
     * 基础数据-导入中心-视图
     *
     * @author linjinfeng
     * @date 2021/3/29 10:00
     */
    @GetResource(name = "基础数据-导出中心-视图", path = "/view/import")
    public String importView() {
        return "/modular/system/dataCenter/importCenter.html";
    }

}
