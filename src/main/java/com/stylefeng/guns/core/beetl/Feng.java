package com.stylefeng.guns.core.beetl;

public class Feng {

	public Integer parseInt(Double value){
		if(value != null){
			return value.intValue();
		}else{
			return 0;
		}
	}
}
