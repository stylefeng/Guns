/**
 * 业务日志
 */
var OptLog = {
    id: "OptLogTable",	//表格id
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
OptLog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'operationLogId', visible: false, align: 'center', valign: 'middle'},
        {title: '日志类型', field: 'logType', align: 'center', valign: 'middle', sortable: true},
        {title: '日志名称', field: 'logName', align: 'center', valign: 'middle', sortable: true},
        {title: '用户名称', field: 'userName', align: 'center', valign: 'middle'},
        {title: '类名', field: 'className', align: 'center', valign: 'middle', sortable: true},
        {title: '方法名', field: 'method', align: 'center', valign: 'middle', sortable: true},
        {title: '时间', field: 'createTime', align: 'center', valign: 'middle', sortable: true},
        {title: '具体消息', field: 'message', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
OptLog.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length === 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        OptLog.seItem = selected[0];
        return true;
    }
};

/**
 * 查看日志详情
 */
OptLog.detail = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/log/detail/" + this.seItem.operationLogId, function (data) {
            Feng.infoDetail("日志详情", data.regularMessage);
        }, function (data) {
            Feng.error("获取详情失败!");
        });
        ajax.start();
    }
};


/**
 * 清空日志
 */
OptLog.delLog = function () {
    Feng.confirm("是否清空所有日志?",function(){
        var ajax = Feng.baseAjax("/log/delLog","清空日志");
        ajax.start();
        OptLog.table.refresh();
    });
};

/**
 * 查询表单提交参数对象
 * @returns {{}}
 */
OptLog.formParams = function() {
    var queryData = {};

    queryData['logName'] = OptLog.condition.logName;
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['logType'] = $("#logType").val();

    return queryData;
};

/**
 * 查询日志列表
 */
OptLog.search = function () {
    OptLog.table.refresh({query: OptLog.formParams()});
};

$(function () {

    OptLog.app = new Vue({
        el: '#logPage',
        data: OptLog.condition
    });

    var defaultColunms = OptLog.initColumn();
    var table = new BSTable(OptLog.id, "/log/list", defaultColunms);
    table.setPaginationType("server");
    table.init();
    OptLog.table = table;

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
