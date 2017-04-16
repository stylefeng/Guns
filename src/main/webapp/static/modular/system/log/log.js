/**
 * 日志管理初始化
 */
var OptLog = {
    id: "OptLogTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
OptLog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '日志类型', field: 'logtype', align: 'center', valign: 'middle'},
        {title: '日志名称', field: 'logname', align: 'center', valign: 'middle'},
        {title: '用户id', field: 'userid', align: 'center', valign: 'middle'},
        {title: '类名', field: 'classname', align: 'center', valign: 'middle'},
        {title: '方法名', field: 'method', align: 'center', valign: 'middle'},
        {title: '时间', field: 'createtime', align: 'center', valign: 'middle'},
        {title: '具体消息', field: 'message', align: 'center', valign: 'middle'}];
};

/**
 * 绑定表格的事件
 */
OptLog.bindEvent = function () {
    $('#' + this.id).on('click-row.bs.table', function (e, row) {
        OptLog.seItem = row;
    });
};

/**
 * 检查是否选中
 */
OptLog.check = function () {
    if (this.seItem == null) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        return true;
    }
};

/**
 * 查看日志详情
 */
OptLog.detail = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/log/detail/" + this.seItem.id, function (data) {
            Feng.infoDetail("日志详情", data.regularMessage);
        }, function (data) {
            Feng.error("获取详情失败!");
        });
        ajax.start();
    }
};

/**
 * 查询日志列表
 */
OptLog.search = function () {
    var queryData = {};

    queryData['logName'] = $("#logName").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();

    OptLog.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = OptLog.initColumn();
    var table = new BSTable(OptLog.id, "/log/list", defaultColunms);
    table.setPaginationType("server");
    OptLog.table = table.init();
    OptLog.bindEvent();
});
