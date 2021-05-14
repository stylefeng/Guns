package cn.stylefeng.guns.modular.system.index.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.LoginUser;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.basic.SimpleRoleInfo;
import cn.stylefeng.roses.kernel.auth.api.pojo.login.basic.SimpleUserInfo;
import cn.stylefeng.roses.kernel.message.api.MessageApi;
import cn.stylefeng.roses.kernel.message.api.enums.MessageReadFlagEnum;
import cn.stylefeng.roses.kernel.message.api.pojo.request.MessageRequest;
import cn.stylefeng.roses.kernel.system.api.pojo.menu.layui.LayuiAppIndexMenusVO;
import cn.stylefeng.roses.kernel.system.api.pojo.menu.layui.LayuiIndexMenuTreeNode;
import cn.stylefeng.roses.kernel.system.modular.menu.service.SysMenuService;
import cn.stylefeng.roses.kernel.system.modular.organization.entity.HrOrganization;
import cn.stylefeng.roses.kernel.system.modular.organization.service.HrOrganizationService;
import cn.stylefeng.roses.kernel.system.modular.user.service.SysUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 首页相关数据组装服务
 *
 * @author fengshuonan
 * @date 2020/12/27 18:25
 */
@Service
public class IndexService {

    @Resource
    private SysMenuService sysMenuService;

    @Resource
    private SysUserService sysUserService;

    @Resource
    private HrOrganizationService hrOrganizationService;

    @Resource
    private MessageApi messageApi;

    /**
     * 获取首页需要渲染的参数
     *
     * @author fengshuonan
     * @date 2021/1/1 18:27
     */
    public Map<String, Object> createIndexRenderAttributes() {

        HashMap<String, Object> renderMap = new HashMap<>();

        LoginUser loginUser = LoginContext.me().getLoginUser();
        SimpleUserInfo simpleUserInfo = loginUser.getSimpleUserInfo();

        // 渲染首页的菜单
        List<LayuiAppIndexMenusVO> layuiAppIndexMenus = sysMenuService.getLayuiIndexMenus();

        // 将个人信息菜单单独去除掉
        this.removePersonalMenu(layuiAppIndexMenus);

        renderMap.put("layuiAppIndexMenus", layuiAppIndexMenus);

        // 获取首页的头像
        renderMap.put("avatar", sysUserService.getUserAvatarUrl(simpleUserInfo.getAvatar()));

        // 获取人员姓名
        renderMap.put("name", simpleUserInfo.getRealName());

        // 获取登录用户ws-url
        renderMap.put("wsUrl", loginUser.getWsUrl());

        // 未读消息数量
        MessageRequest messageRequest = new MessageRequest();
        messageRequest.setReadFlag(MessageReadFlagEnum.UNREAD.getCode());
        renderMap.put("msgUnReadCount", messageApi.queryCountCurrentUser(messageRequest));

        return renderMap;
    }

    /**
     * 创建个人中心页面需要渲染的值
     *
     * @author fengshuonan
     * @date 2021/1/1 18:38
     */
    public Map<String, Object> createPersonInfoRenderAttributes() {

        HashMap<String, Object> renderMap = new HashMap<>();
        renderMap.put("roleName", "角色空");
        renderMap.put("orgName", "组织架构空");

        // 添加用户基本信息字段
        LoginUser loginUser = LoginContext.me().getLoginUser();
        SimpleUserInfo simpleUserInfo = loginUser.getSimpleUserInfo();
        renderMap.putAll(BeanUtil.beanToMap(simpleUserInfo));

        // 角色名称
        List<SimpleRoleInfo> simpleRoleInfoList = loginUser.getSimpleRoleInfoList();
        if (ObjectUtil.isNotEmpty(simpleRoleInfoList)) {
            String roleName = simpleRoleInfoList.get(0).getRoleName();
            renderMap.put("roleName", roleName);
        }

        // 组织机构名称
        Long organizationId = loginUser.getOrganizationId();
        HrOrganization hrOrganization = hrOrganizationService.getById(organizationId);
        if (hrOrganization != null) {
            renderMap.put("orgName", hrOrganization.getOrgName());
        }

        // 渲染头像的url
        renderMap.put("avatar", sysUserService.getUserAvatarUrl(simpleUserInfo.getAvatar()));

        return renderMap;
    }

    /**
     * 去除个人信息菜单显示
     *
     * @author fengshuonan
     * @date 2021/5/14 16:30
     */
    private void removePersonalMenu(List<LayuiAppIndexMenusVO> layuiAppIndexMenusVOS) {

        ArrayList<LayuiIndexMenuTreeNode> menus = new ArrayList<>();

        for (LayuiAppIndexMenusVO layuiAppIndexMenusVO : layuiAppIndexMenusVOS) {
            if (layuiAppIndexMenusVO.getAppCode().equals("system")) {
                List<LayuiIndexMenuTreeNode> layuiIndexMenuTreeNodes = layuiAppIndexMenusVO.getLayuiIndexMenuTreeNodes();
                for (LayuiIndexMenuTreeNode layuiIndexMenuTreeNode : layuiIndexMenuTreeNodes) {
                    if (!layuiIndexMenuTreeNode.getMenuName().equals("个人信息")) {
                        menus.add(layuiIndexMenuTreeNode);
                    }
                }
                layuiAppIndexMenusVO.setLayuiIndexMenuTreeNodes(menus);
            }
        }
    }

}
