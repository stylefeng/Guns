package com.stylefeng.guns.modular.system.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.naming.NoPermissionException;
import javax.validation.Valid;

import com.stylefeng.guns.common.controller.BaseController;
import org.apache.shiro.authc.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.stylefeng.guns.common.constant.Const;
import com.stylefeng.guns.common.constant.factory.ConstantFactory;
import com.stylefeng.guns.common.constant.state.ManagerStatus;
import com.stylefeng.guns.common.constant.tips.Tip;
import com.stylefeng.guns.common.exception.BizExceptionEnum;
import com.stylefeng.guns.common.exception.BussinessException;
import com.stylefeng.guns.common.annotion.Permission;
import com.stylefeng.guns.core.db.Db;
import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.core.shiro.ShiroUser;
import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.modular.system.dao.UserMgrDao;
import com.stylefeng.guns.modular.system.warpper.UserWarpper;
import com.stylefeng.guns.persistence.dao.UserMapper;
import com.stylefeng.guns.persistence.model.User;

/**
 * 系统管理员控制器
 *
 * @author fengshuonan
 * @Date 2017年1月11日 下午1:08:17
 */
@Controller
@RequestMapping("/mgr")
public class UserMgrController extends BaseController {

    private static String PREFIX = "/system/user/";

    @Resource
    private UserMgrDao managerDao;

    @Resource
    private UserMapper userMapper;

    /**
     * 跳转到查看管理员列表的页面
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "user.html";
    }

    /**
     * 跳转到查看管理员列表的页面
     */
    @RequestMapping("/user_add")
    public String addView() {
        return PREFIX + "user_add.html";
    }

    /**
     * 跳转到角色分配页面
     */
    @RequestMapping("/role_assign/{userId}")
    public String roleAssign(@PathVariable Integer userId, Model model) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        User user = (User) Db.create(UserMapper.class).selectOneByCon("id", userId);
        model.addAttribute("userId", userId);
        model.addAttribute("userAccount", user.getAccount());
        return PREFIX + "user_roleassign.html";
    }

    /**
     * 跳转到查看管理员列表的页面
     */
    @RequestMapping("/user_edit/{userId}")
    public String userEdit(@PathVariable Integer userId, Model model) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        User user = this.userMapper.selectById(userId);
        model.addAttribute(user);
        model.addAttribute("roleName", ConstantFactory.getRoleName(user.getRoleid()));
        model.addAttribute("deptName", ConstantFactory.getDeptName(user.getDeptid()));
        return PREFIX + "user_edit.html";
    }

    /**
     * 跳转到查看用户详情页面
     */
    @RequestMapping("/user_info/{userId}")
    public String userInfo(@PathVariable Integer userId, Model model) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        User user = this.userMapper.selectById(userId);
        model.addAttribute(user);
        model.addAttribute("roleName", ConstantFactory.getRoleName(user.getRoleid()));
        model.addAttribute("deptName", ConstantFactory.getDeptName(user.getDeptid()));
        return PREFIX + "user_view.html";
    }

    /**
     * 查询管理员列表
     */
    @RequestMapping("/list")
    public
    @ResponseBody
    Object list() {
        List<Map<String, Object>> users = managerDao.selectUsers(super.getPara("condition"));
        return new UserWarpper(users).warp();
    }

    /**
     * 添加管理员
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/add")
    public
    @ResponseBody
    Tip add(@Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }

        // 判断账号是否重复
        User theUser = managerDao.getByAccount(user.getAccount());
        if (theUser != null) {
            throw new BussinessException(BizExceptionEnum.USER_ALREADY_REG);
        }

        // 完善账号信息
        user.setSalt(ShiroKit.getRandomSalt(5));
        user.setPassword(ShiroKit.md5(user.getPassword(), user.getSalt()));
        user.setStatus(ManagerStatus.OK.getCode());
        user.setCreatetime(new Date());
        this.userMapper.insert(user);
        return SUCCESS_TIP;
    }

    /**
     * 修改管理员
     *
     * @throws NoPermissionException
     */
    @RequestMapping("/edit")
    public
    @ResponseBody
    Tip edit(@Valid User user, BindingResult result) throws NoPermissionException {
        if (result.hasErrors()) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        if (ShiroKit.hasRole(Const.ADMIN_NAME)) {
            this.userMapper.updateById(user);
            return SUCCESS_TIP;
        } else {
            ShiroUser shiroUser = ShiroKit.getUser();
            if (shiroUser.getId() == user.getId()) {
                this.userMapper.updateById(user);
                return SUCCESS_TIP;
            } else {
                throw new AuthenticationException();
            }
        }
    }

    /**
     * 删除管理员（逻辑删除）
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/delete/{userId}")
    public
    @ResponseBody
    Tip delete(@PathVariable Integer userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        this.managerDao.setStatus(userId, ManagerStatus.DELETED.getCode());
        return SUCCESS_TIP;
    }

    /**
     * 查看管理员详情
     */
    @RequestMapping("/view/{userId}")
    public
    @ResponseBody
    User view(@PathVariable Integer userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        return this.userMapper.selectById(userId);
    }

    /**
     * 重置管理员的密码
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/reset/{userId}")
    public
    @ResponseBody
    Tip reset(@PathVariable Integer userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        User user = this.userMapper.selectById(userId);
        user.setSalt(ShiroKit.getRandomSalt(5));
        user.setPassword(ShiroKit.md5(Const.DEFAULT_PWD, user.getSalt()));
        this.userMapper.updateById(user);
        return SUCCESS_TIP;
    }

    /**
     * 冻结用户
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/freeze/{userId}")
    public
    @ResponseBody
    Tip freeze(@PathVariable Integer userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        this.managerDao.setStatus(userId, ManagerStatus.FREEZED.getCode());
        return SUCCESS_TIP;
    }

    /**
     * 解除冻结用户
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/unfreeze/{userId}")
    public
    @ResponseBody
    Tip unfreeze(@PathVariable Integer userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        this.managerDao.setStatus(userId, ManagerStatus.OK.getCode());
        return SUCCESS_TIP;
    }

    /**
     * 分配角色
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping("/setRole")
    public
    @ResponseBody
    Tip setRole(@RequestParam("userId") Integer userId, @RequestParam("roleIds") String roleIds) {
        if (ToolUtil.isOneEmpty(userId, roleIds)) {
            throw new BussinessException(BizExceptionEnum.REQUEST_NULL);
        }
        this.managerDao.setRoles(userId, roleIds);
        return SUCCESS_TIP;
    }
}
