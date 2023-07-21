package cn.stylefeng.guns.modular.demo.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.roses.kernel.auth.api.AuthServiceApi;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginRequest;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginResponse;
import cn.stylefeng.roses.kernel.db.api.factory.PageFactory;
import cn.stylefeng.roses.kernel.rule.enums.StatusEnum;
import cn.stylefeng.roses.kernel.rule.enums.YesOrNotEnum;
import cn.stylefeng.roses.kernel.rule.exception.base.ServiceException;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.PostResource;
import cn.stylefeng.roses.kernel.sys.api.exception.enums.UserExceptionEnum;
import cn.stylefeng.roses.kernel.sys.modular.user.entity.SysUser;
import cn.stylefeng.roses.kernel.sys.modular.user.pojo.request.SysUserRequest;
import cn.stylefeng.roses.kernel.sys.modular.user.service.SysUserService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 示例控制器
 *
 * @author fengshuonan
 * @since 2021/1/24 10:57
 */
@RestController
@ApiResource(name = "示例")
public class DevOpsController {

    @Resource
    private AuthServiceApi authServiceApi;

    @Resource
    private SysUserService sysUserService;

    /**
     * 用户登陆
     *
     * @author fengshuonan
     * @since 2021/3/17 17:23
     */
    @PostResource(name = "登陆", path = "/login", requiredLogin = false)
    public ResponseData<String> login(@RequestBody @Validated LoginRequest loginRequest) {
        LoginResponse loginResponse = authServiceApi.login(loginRequest);
        return new SuccessResponseData<>(loginResponse.getToken());
    }

    /**
     * 临时兼容旧的devops平台
     *
     * @author fengshuonan
     * @since 2023/6/26 20:42
     */
    @GetResource(name = "运维平台接口检测", path = "/sysUser/devopsApiCheck", requiredLogin = false, requiredPermission = false)
    public ResponseData<Integer> devopsApiCheck() {
        return new SuccessResponseData<>(999);
    }

    /**
     * 获取所有用户ID和名称列表
     *
     * @author majianguo
     * @since 2022/1/17 14:24
     **/
    @GetResource(name = "获取所有用户ID和名称列表", path = "/sysUser/getAllUserIdList")
    public ResponseData<List<SysUserRequest>> getAllUserIdList() {
        LambdaQueryWrapper<SysUser> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.select(SysUser::getUserId, SysUser::getAccount);
        userLambdaQueryWrapper.eq(SysUser::getStatusFlag, StatusEnum.ENABLE.getCode());
        userLambdaQueryWrapper.ne(SysUser::getDelFlag, YesOrNotEnum.Y.getCode());
        userLambdaQueryWrapper.orderByAsc(SysUser::getUserId);

        // 只获取前20个用户
        Page<SysUser> page = this.sysUserService.page(PageFactory.defaultPage(), userLambdaQueryWrapper);
        List<SysUser> list = page.getRecords();

        List<SysUserRequest> collect = list.stream().map(item -> BeanUtil.toBean(item, SysUserRequest.class)).collect(Collectors.toList());
        return new SuccessResponseData<>(collect);
    }

    /**
     * 根据用户主键获取用户对应的token
     *
     * @author majianguo
     * @since 2022/1/17 14:24
     **/
    @GetResource(name = "根据用户主键获取用户对应的token", path = "/sysUser/getTokenByUserId")
    public ResponseData<String> getTokenByUserId(Long userId) {
        SysUser sysUser = this.sysUserService.getById(userId);
        if (sysUser == null) {
            throw new ServiceException(UserExceptionEnum.REQUEST_USER_STATUS_EMPTY);
        }
        LoginResponse loginResponse = authServiceApi.loginWithUserName(sysUser.getAccount());
        return new SuccessResponseData<>(loginResponse.getToken());
    }

}
