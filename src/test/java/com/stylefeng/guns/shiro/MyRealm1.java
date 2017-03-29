package com.stylefeng.guns.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.realm.Realm;

/**
 * @Description 自定义shiro认证域
 * @author fengshuonan
 * @date 2016年11月14日 下午1:32:11
 */
public class MyRealm1 implements Realm {
	@Override
	public String getName() {
		return "myrealm1";
	}

	@Override
	public boolean supports(AuthenticationToken token) {
		// 仅支持 UsernamePasswordToken 类型的 Token
		return token instanceof UsernamePasswordToken;
	}

	@Override
	public AuthenticationInfo getAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String username = (String) token.getPrincipal(); // 得到用户名
		String password = new String((char[]) token.getCredentials()); // 得到密码
		if (!"zhang".equals(username)) {
			throw new UnknownAccountException(); // 如果用户名错误
		}
		if (!"1234".equals(password)) {
			throw new IncorrectCredentialsException(); // 如果密码错误
		}
		// 如果身份认证验证成功，返回一个 AuthenticationInfo 实现；
		return new SimpleAuthenticationInfo(username, password, getName());
	}
}