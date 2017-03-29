package project.config.web;

import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

import com.stylefeng.guns.core.beetl.Feng;
import com.stylefeng.guns.core.beetl.ShiroExt;

public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

	@Override
	public void initOther() {

		groupTemplate.registerFunctionPackage("shiro", new ShiroExt());
		groupTemplate.registerFunctionPackage("feng", new Feng());
	}

}
