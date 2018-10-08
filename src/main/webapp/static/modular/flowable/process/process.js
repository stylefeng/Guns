/**
 * 报销管理管理初始化
 */
var Process = {
    id: "ProcessTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Process.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '任务id', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
        {title: '金额', field: 'money', visible: true, align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'},
        {title: '申请人', field: 'assignee', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', visible: true, align: 'center', valign: 'middle', formatter: function (value, row, index) {
            if (row.selfFlag == true) {
                return '<button type="button" class="btn btn-primary button-margin" onclick="Process.pass(' + row.id + ')" id=""><i class="fa fa-edit"></i>&nbsp;通过</button>' +
                    '<button type="button" class="btn btn-danger button-margin" onclick="Process.unPass(' + row.id + ')" id=""><i class="fa fa-arrows-alt"></i>&nbsp;不通过</button>';
            } else {
                return '<button type="button" class="btn btn-primary button-margin" onclick="Process.pass(' + row.id + ')" id=""><i class="fa fa-edit"></i>&nbsp;通过</button>';
            }
        }
        }
    ];
};

/**
 * 通过审核
 */
Process.pass = function (id) {
    var ajax = new $ax(Feng.ctxPath + "/process/pass", function (data) {
        Feng.success("审核成功!");
        Process.table.refresh();
    }, function (data) {
        Feng.error("审核失败!" + data.responseJSON.message + "!");
    });
    ajax.set("taskId", id);
    ajax.start();
};

/**
 * 未通过审核
 */
Process.unPass = function (id) {
    var ajax = new $ax(Feng.ctxPath + "/process/unPass", function (data) {
        Feng.success("审核成功!");
        Process.table.refresh();
    }, function (data) {
        Feng.error("审核失败!" + data.responseJSON.message + "!");
    });
    ajax.set("taskId", id);
    ajax.start();
};

/**
 * 查询报销管理列表
 */
Process.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Process.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Process.initColumn();
    var table = new BSTable(Process.id, "/process/list", defaultColunms);
    table.setPaginationType("client");
    Process.table = table.init();
});
