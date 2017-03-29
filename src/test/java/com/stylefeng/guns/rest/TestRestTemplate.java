package com.stylefeng.guns.rest;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter4;

public class TestRestTemplate {

	public static void main(String[] args) {
		
		FastJsonHttpMessageConverter4 convert = new FastJsonHttpMessageConverter4();
		List<MediaType> list = new ArrayList<MediaType>();
		list.add(MediaType.TEXT_HTML);
		list.add(MediaType.APPLICATION_JSON_UTF8);
		convert.setSupportedMediaTypes(list);
		FastJsonConfig fastJsonConfig = new FastJsonConfig();
		fastJsonConfig.setFeatures(Feature.AllowArbitraryCommas, Feature.AllowUnQuotedFieldNames,
				Feature.DisableCircularReferenceDetect);
		fastJsonConfig.setSerializerFeatures(SerializerFeature.WriteMapNullValue,
				SerializerFeature.WriteNullStringAsEmpty);
		fastJsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");
		convert.setFastJsonConfig(fastJsonConfig);
		
		StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(
				Charset.forName("UTF-8"));
		List<MediaType> list2 = new ArrayList<MediaType>();
		list2.add(MediaType.TEXT_PLAIN);
		stringHttpMessageConverter.setSupportedMediaTypes(list2);
		
		List<HttpMessageConverter<?>> arrayList = new ArrayList<HttpMessageConverter<?>>();
		arrayList.add(stringHttpMessageConverter);
		arrayList.add(convert);
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setMessageConverters(arrayList);
		Result forObject = restTemplate.getForObject("http://restapi.amap.com/v3/assistant/inputtips?output=json&city=010&keywords=招商银行&key=f869cc21fa141530c476d41ede7649ec", Result.class);
		System.out.println(forObject);
	}
}
