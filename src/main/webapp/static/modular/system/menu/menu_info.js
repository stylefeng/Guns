/**
 * 菜单详情对话框
 */
var MenuInfoDlg = {
	menuInfoData : {}
};

/**
 * 清除数据
 */
MenuInfoDlg.clearData = function() {
	this.roleInfoData = {};
}

/**
 * 设置对话框中的数据
 * 
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MenuInfoDlg.set = function(key, val) {
	this.roleInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
	return this;
}

/**
 * 设置对话框中的数据
 * 
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MenuInfoDlg.get = function(key) {
	return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
MenuInfoDlg.close = function() {
	parent.layer.close(window.parent.Menu.layerIndex);
}

/**
 * 收集数据
 */
MenuInfoDlg.collectData = function() {
	this.set('id').set('name').set('code').set('pcode').set('url').set('num').set('levels').set('icon');
}

/**
 * 提交添加用户
 */
MenuInfoDlg.addSubmit = function() {
	
	this.clearData();
	this.collectData();
	
	//提交信息
	var ajax = new $ax(Feng.ctxPath + "/menu/add", function(data){
		Feng.success("添加成功!");
		window.parent.Menu.table.refresh();
		MenuInfoDlg.close();
	},function(data){
		Feng.error("添加失败!" + data.responseJSON.message + "!");
	});
	ajax.set(this.roleInfoData);
	ajax.start();
}

/**
 * 提交修改
 */
MenuInfoDlg.editSubmit = function() {
	
	this.clearData();
	this.collectData();
	
	//提交信息
	var ajax = new $ax(Feng.ctxPath + "/menu/edit", function(data){
		Feng.success("修改成功!");
		window.parent.Menu.table.refresh();
		MenuInfoDlg.close();
	},function(data){
		Feng.error("修改失败!" + data.responseJSON.message + "!");
	});
	ajax.set(this.roleInfoData);
	ajax.start();
}

$(function() {
	
});
