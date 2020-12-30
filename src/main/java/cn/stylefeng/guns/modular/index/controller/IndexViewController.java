package cn.stylefeng.guns.modular.index.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.LoginUser;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.basic.SimpleRoleInfo;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.basic.SimpleUserInfo;
import cn.stylefeng.roses.kernel.menu.modular.service.SysMenuService;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.system.modular.organization.entity.HrOrganization;
import cn.stylefeng.roses.kernel.system.modular.organization.service.HrOrganizationService;
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

    @Resource
    private HrOrganizationService hrOrganizationService;

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
     * 个人中心界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:53
     */
    @GetResource(name = "个人中心界面", path = "/personal", requiredLogin = false)
    public String personal(Model model) {
        LoginUser loginUser = LoginContext.me().getLoginUser();

        // 用户基本信息
        SimpleUserInfo simpleUserInfo = loginUser.getSimpleUserInfo();
        model.addAllAttributes(BeanUtil.beanToMap(simpleUserInfo));

        // 角色名称
        List<SimpleRoleInfo> simpleRoleInfoList = loginUser.getSimpleRoleInfoList();
        if (ObjectUtil.isNotEmpty(simpleRoleInfoList)) {
            String roleName = simpleRoleInfoList.get(0).getRoleName();
            model.addAttribute("roleName", roleName);
        }

        // 组织机构名称
        Long organizationId = loginUser.getOrganizationId();
        HrOrganization hrOrganization = hrOrganizationService.getById(organizationId);
        if (hrOrganization != null) {
            model.addAttribute("orgName", hrOrganization.getOrgName());
        }

        // 渲染头像的url
        model.addAttribute("avatar", sysUserService.getUserAvatarUrl(simpleUserInfo.getAvatar()));

        return "/modular/index/personal_info.html";
    }

    /**
     * 锁屏界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:34
     */
    @GetResource(name = "锁屏界面", path = "/lock", requiredPermission = false)
    public String lock() {
        return "/modular/index/lock_screen.html";
    }

    /**
     * 主题切换界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:42
     */
    @GetResource(name = "主题切换界面", path = "/theme", requiredPermission = false)
    public String theme() {
        return "/modular/index/theme.html";
    }

    /**
     * 修改密码界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:42
     */
    @GetResource(name = "修改密码界面", path = "/changePassword", requiredPermission = false)
    public String changePassword() {
        return "/modular/index/change_password.html";
    }

}
