/**
 * 角色管理的单例
 */
var Role = {
		id : "roleTable",	//表格id
		seItem : null,		//选中的条目
		table : null,
		layerIndex : -1
};

/**
 * 初始化表格的列
 */
Role.initColumn = function(){
	var columns = [  
		{field: 'selectItem',radio:true},     
        {title: 'id',field: 'id', visible: false, align: 'center',valign: 'middle'},   
        {title: '名称',field: 'name',align: 'center',valign: 'middle'},   
        {title: '上级角色',field: 'pName',align: 'center',valign: 'middle'},   
        {title: '所在部门',field: 'deptName',align: 'center',valign: 'middle'},
        {title: '别名',field: 'tips',align: 'center',valign: 'middle'}]
	return columns;
};

/**
 * 绑定表格的事件
 */
Role.bindEvent = function(){
	$('#' + this.id).on('click-row.bs.table', function(e, row, $element) {
		Role.seItem = row;
    });
};

/**
 * 检查是否选中
 */
Role.check = function(){
	if(this.seItem == null){
		Feng.info("请先选中表格中的某一记录！");
		return false;
	}else{
		return true;
	}
};

/**
 * 点击添加管理员
 */
Role.openAddRole = function(){
	var index = layer.open({
	    type: 2,
	    title: '添加角色',
	    area: ['800px', '450px'], //宽高
	    fix: false, //不固定
	    maxmin: true,
	    content :Feng.ctxPath + '/role/role_add'
	});
	this.layerIndex = index;
};

/**
 * 点击修改按钮时
 */
Role.openChangeRole = function(){
	if(this.check()){
		var index = layer.open({
		    type: 2,
		    title: '修改角色',
		    area: ['800px', '450px'], //宽高
		    fix: false, //不固定
		    maxmin: true,
		    content :Feng.ctxPath + '/role/role_edit/' + this.seItem.id
		});
		this.layerIndex = index;
	}
};

/**
 * 删除角色
 */
Role.delRole = function(){
	if(this.check()){
		var ajax = new $ax(Feng.ctxPath + "/role/remove/" + this.seItem.id, function(data){
			Feng.success("删除成功!");
			Role.table.refresh();
		},function(data){
			Feng.error("删除失败!");
		});
		ajax.start();
	}
};

/**
 * 权限配置
 */
Role.assign = function(){
	if(this.check()){
		var index = layer.open({
		    type: 2,
		    title: '权限配置',
		    area: ['300px', '450px'], //宽高
		    fix: false, //不固定
		    maxmin: true,
		    content :Feng.ctxPath + '/role/role_assign/' + this.seItem.id
		});
		this.layerIndex = index;
	}
};

$(function(){
	var defaultColunms = Role.initColumn();
	var table = new BSTable(Role.id,"/role/list",defaultColunms);
	table.setPaginationType("client");
	table.init();
	Role.bindEvent();
	Role.table = table;
});
