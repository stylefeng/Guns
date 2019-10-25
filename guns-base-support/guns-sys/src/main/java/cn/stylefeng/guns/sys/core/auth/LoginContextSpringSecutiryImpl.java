package cn.stylefeng.guns.sys.core.auth;

import cn.stylefeng.guns.base.auth.context.LoginContext;
import cn.stylefeng.guns.base.auth.exception.AuthException;
import cn.stylefeng.guns.base.auth.exception.enums.AuthExceptionEnum;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.sys.core.constant.Const;
import cn.stylefeng.guns.sys.core.constant.factory.ConstantFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 用户登录上下文
 *
 * @author fengshuonan
 * @Date 2019/7/18 22:27
 */
@Component
public class LoginContextSpringSecutiryImpl implements LoginContext {

    @Override
    public LoginUser getUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String) {
            throw new AuthException(AuthExceptionEnum.NOT_LOGIN_ERROR);
        } else {
            return (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
    }

    @Override
    public String getToken() {
        return null;
    }

    @Override
    public boolean hasLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return false;
        } else {
            if (authentication instanceof AnonymousAuthenticationToken) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    public Long getUserId() {
        return getUser().getId();
    }

    @Override
    public boolean hasRole(String roleName) {
        return getUser().getRoleTips().contains(roleName);
    }

    @Override
    public boolean hasAnyRoles(String roleNames) {
        boolean hasAnyRole = false;
        if (this.hasLogin() && roleNames != null && roleNames.length() > 0) {
            for (String role : roleNames.split(",")) {
                if (hasRole(role.trim())) {
                    hasAnyRole = true;
                    break;
                }
            }
        }
        return hasAnyRole;
    }

    @Override
    public boolean hasPermission(String permission) {
        return getUser().getPermissions().contains(permission);
    }

    @Override
    public boolean isAdmin() {
        List<Long> roleList = getUser().getRoleList();
        for (Long integer : roleList) {
            String singleRoleTip = ConstantFactory.me().getSingleRoleTip(integer);
            if (singleRoleTip.equals(Const.ADMIN_NAME)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean oauth2Flag() {
        String account = getUser().getAccount();
        if (account.startsWith(ConstantsContext.getOAuth2UserPrefix())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Long> getDeptDataScope() {
        Long deptId = getUser().getDeptId();
        List<Long> subDeptIds = ConstantFactory.me().getSubDeptId(deptId);
        subDeptIds.add(deptId);
        return subDeptIds;
    }
}
