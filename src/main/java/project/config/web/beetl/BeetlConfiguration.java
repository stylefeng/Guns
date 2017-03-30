package project.config.web.beetl;

import com.stylefeng.guns.core.beetl.ShiroExt;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

	@Override
	public void initOther() {

		groupTemplate.registerFunctionPackage("shiro", new ShiroExt());

	}

}
