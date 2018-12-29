/**
 * 登陆日志
 */
var LoginLog = {
    id: "loginLogTable",	//表格id
    seItem: null,		    //选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        logName: ""
    }
};

/**
 * 初始化表格的列
 */
LoginLog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'loginLogId', visible: false, align: 'center', valign: 'middle'},
        {title: '日志名称', field: 'logName', align: 'center', valign: 'middle', sortable: true},
        {title: '用户名称', field: 'userName', align: 'center', valign: 'middle', sortable: true},
        {title: '时间', field: 'createTime', align: 'center', valign: 'middle', sortable: true},
        {title: '具体消息', field: 'regularMessage', align: 'center', valign: 'middle', sortable: true},
        {title: 'ip', field: 'ipAddress', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 日志搜索
 */
LoginLog.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['logName'] = LoginLog.condition.logName;
    LoginLog.table.refresh({query: queryData});
};

/**
 * 清空日志
 */
LoginLog.delLog = function () {
    Feng.confirm("是否清空所有日志?", function () {
        var ajax = Feng.baseAjax("/loginLog/delLoginLog", "清空日志");
        ajax.start();
        LoginLog.table.refresh();
    });
};

$(function () {

    LoginLog.app = new Vue({
        el: '#loginLogPage',
        data: LoginLog.condition
    });

    var defaultColunms = LoginLog.initColumn();
    var table = new BSTable(LoginLog.id, "/loginLog/list", defaultColunms);
    table.setPaginationType("server");
    table.init();
    LoginLog.table = table;

    laydate.render({
        elem: '#beginTime',
        theme: '#009efb',
        max: Feng.currentDate()
    });

    laydate.render({
        elem: '#endTime',
        theme: '#009efb',
        max: Feng.currentDate()
    });
});
