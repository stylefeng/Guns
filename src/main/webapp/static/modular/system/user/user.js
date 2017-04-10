/**
 * 系统管理--用户管理的单例对象
 */
var MgrUser = {
		id : "managerTable",//表格id
		seItem : null,		//选中的条目
		table : null,
		layerIndex : -1
};

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function(){
	var columns = [  
		{field: 'selectItem',radio:true},     
        {title: 'id',field: 'id', visible: false, align: 'center',valign: 'middle'},   
        {title: '账号',field: 'account',align: 'center',valign: 'middle'},   
        {title: '姓名',field: 'name',align: 'center',valign: 'middle'},   
        {title: '性别',field: 'sexName',align: 'center',valign: 'middle'},
        {title: '角色',field: 'roleName',align: 'center',valign: 'middle'},
        {title: '部门',field: 'deptName',align: 'center',valign: 'middle'}, 
        {title: '邮箱',field: 'email',align: 'center',valign: 'middle'}, 
        {title: '电话',field: 'phone',align: 'center',valign: 'middle'}, 
        {title: '创建时间',field: 'createtime',align: 'center',valign: 'middle'}, 
        {title: '状态',field: 'statusName',align: 'center',valign: 'middle'}];
	return columns;
};

/**
 * 绑定表格的事件
 */
MgrUser.bindEvent = function(){
	$('#' + this.id).on('click-row.bs.table', function(e, row, $element) {
		MgrUser.seItem = row;
    });
};

/**
 * 检查是否选中
 */
MgrUser.check = function(){
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
MgrUser.openAddMgr = function(){
	var index = layer.open({
	    type: 2,
	    title: '添加管理员',
	    area: ['800px', '550px'], //宽高
	    fix: false, //不固定
	    maxmin: true,
	    content :Feng.ctxPath + '/mgr/user_add'
	});
	this.layerIndex = index;
};

/**
 * 点击修改按钮时
 * @param userId 管理员id
 */
MgrUser.openChangeUser = function(){
	if(this.check()){
		var index = layer.open({
		    type: 2,
		    title: '编辑管理员',
		    area: ['800px', '450px'], //宽高
		    fix: false, //不固定
		    maxmin: true,
		    content :Feng.ctxPath + '/mgr/user_edit/' + this.seItem.id
		});
		this.layerIndex = index;
	}
};

/**
 * 点击角色分配
 * @param
 */
MgrUser.roleAssign = function(){
	if(this.check()){
		var index = layer.open({
		    type: 2,
		    title: '角色分配',
		    area: ['300px', '400px'], //宽高
		    fix: false, //不固定
		    maxmin: true,
		    content :Feng.ctxPath + '/mgr/role_assign/' + this.seItem.id
		});
		this.layerIndex = index;
	}
};

/**
 * 删除用户
 */
MgrUser.delMgrUser = function(){
	if(this.check()){
		var userId = this.seItem.id;
		var ajax = new $ax(Feng.ctxPath + "/mgr/delete/" + userId, function(data){
			Feng.success("删除成功!");
			MgrUser.table.refresh();
		},function(data){
			Feng.error("删除失败!");
		});
		ajax.start();
	}
};

/**
 * 冻结用户账户
 * @param userId
 */
MgrUser.freezeAccount = function(){
	if(this.check()){
		var userId = this.seItem.id;
		var ajax = new $ax(Feng.ctxPath + "/mgr/freeze/" + userId, function(data){
			Feng.success("冻结成功!");
			MgrUser.table.refresh();
		},function(data){
			Feng.error("冻结失败!");
		});
		ajax.start();
	}
};

/**
 * 解除冻结用户账户
 * @param userId
 */
MgrUser.unfreeze = function(){
	if(this.check()){
		var userId = this.seItem.id;
		var ajax = new $ax(Feng.ctxPath + "/mgr/unfreeze/" + userId, function(data){
			Feng.success("解除冻结成功!");
			MgrUser.table.refresh();
		},function(data){
			Feng.error("解除冻结失败!");
		});
		ajax.start();
	}
}

/**
 * 重置密码
 */
MgrUser.resetPwd = function(){
	if(this.check()){
		var userId = this.seItem.id;
		parent.layer.confirm('是否重置密码为111111？', {
		    btn: ['确定','取消'],
		    shade: false //不显示遮罩
		}, function(){
			var ajax = new $ax(Feng.ctxPath + "/mgr/reset/" + userId, function(data){
				Feng.success("重置密码成功!");
			},function(data){
				Feng.error("重置密码失败!");
			});
			ajax.start();
		});
	}
};

MgrUser.search = function(){
	alert("abcd");
}

$(function(){
	var defaultColunms = MgrUser.initColumn();
	var table = new BSTable("managerTable","/mgr/list",defaultColunms);
	table.setPaginationType("client");
	table.init();
	MgrUser.bindEvent();
	MgrUser.table = table;
    //默认收起来查询条件
    $(".collapse-link").click();
});
