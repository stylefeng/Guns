/**
 * 日志管理初始化
 */
var LoginLog = {
    id: "LoginLogTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
LoginLog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '日志名称', field: 'logname', align: 'center', valign: 'middle'},
        {title: '用户名称', field: 'userName', align: 'center', valign: 'middle'},
        {title: '时间', field: 'createtime', align: 'center', valign: 'middle'},
        {title: '具体消息', field: 'message', align: 'center', valign: 'middle'},
        {title: 'ip', field: 'ip', align: 'center', valign: 'middle'}];
};

/**
 * 检查是否选中
 */
LoginLog.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        LoginLog.seItem = selected[0];
        return true;
    }
};


/**
 * 清空日志
 */
LoginLog.delLog = function () {
    Feng.confirm("是否清空所有日志?",function(){
        var ajax = Feng.baseAjax("/loginLog/delLoginLog","清空日志");
        ajax.start();
        LoginLog.table.refresh();
    });
}

/**
 * 查询日志列表
 */
LoginLog.search = function () {
    var queryData = {};

    queryData['logName'] = $("#logName").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();

    LoginLog.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = LoginLog.initColumn();
    var table = new BSTable(LoginLog.id, "/loginLog/list", defaultColunms);
    table.setPaginationType("server");
    LoginLog.table = table.init();
});
