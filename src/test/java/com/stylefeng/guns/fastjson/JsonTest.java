package com.stylefeng.guns.fastjson;

import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.common.constant.tips.Tip;
import com.stylefeng.guns.common.constant.tips.SuccessTip;

public class JsonTest {
	
	@Test
	public void test(){
		Tip tip = new SuccessTip();
		System.out.println(JSON.toJSONString(tip));
	}
}
