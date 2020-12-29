package cn.stylefeng.guns.modular.index.controller;

import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.LoginUser;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.basic.SimpleUserInfo;
import cn.stylefeng.roses.kernel.menu.modular.service.SysMenuService;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.system.modular.user.service.SysUserService;
import cn.stylefeng.roses.kernel.system.pojo.menu.layui.LayuiAppIndexMenus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import java.util.List;

/**
 * 首页相关的界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/27 16:23
 */
@Controller
@Slf4j
@ApiResource(name = "首页相关的界面渲染")
public class IndexViewController {

    @Resource
    private SysMenuService sysMenuService;

    @Resource
    private SysUserService sysUserService;

    /**
     * 首页界面
     *
     * @author fengshuonan
     * @date 2020/12/13 17:19
     */
    @GetResource(name = "首页界面", path = "/", requiredLogin = false, requiredPermission = false)
    public String indexView(Model model) {

        // 当前用户已经登录，跳转到首页
        if (LoginContext.me().hasLogin()) {

            LoginUser loginUser = LoginContext.me().getLoginUser();
            SimpleUserInfo simpleUserInfo = loginUser.getSimpleUserInfo();

            // 渲染首页的菜单
            List<LayuiAppIndexMenus> layuiAppIndexMenus = sysMenuService.getLayuiIndexMenus();
            model.addAttribute("layuiAppIndexMenus", layuiAppIndexMenus);

            // 获取首页的头像
            model.addAttribute("avatar", sysUserService.getUserAvatarUrl(simpleUserInfo.getAvatar()));

            // 获取人员姓名
            model.addAttribute("name", simpleUserInfo.getRealName());

            return "/index.html";
        }

        // 当前用户没有登录，跳转到登录页面
        return "/login.html";
    }

    /**
     * 锁屏界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:34
     */
    @GetResource(name = "锁屏界面", path = "/lock", requiredPermission = false)
    public String lock() {
        return "/modular/index/lock-screen.html";
    }

}
