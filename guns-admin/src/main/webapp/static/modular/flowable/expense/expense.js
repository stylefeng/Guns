/**
 * 报销管理管理初始化
 */
var Expense = {
    id: "ExpenseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Expense.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '报销id', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '报销金额', field: 'money', visible: true, align: 'center', valign: 'middle'},
        {title: '描述', field: 'desc', visible: true, align: 'center', valign: 'middle'},
        {title: '状态', field: 'stateName', visible: true, align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createtime', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', visible: true, align: 'center', valign: 'middle', formatter: function (value, row, index) {
            if (row.state == 3) {
                return '<button type="button" class="btn btn-danger button-margin" onclick="Expense.deleteRecord(' + row.id + ')" id=""><i class="fa fa-arrows-alt"></i>&nbsp;删除</button>';
            } else {
                return '<button type="button" class="btn btn-primary button-margin" onclick="Expense.findRecord(' + row.id + ')" id=""><i class="fa fa-edit"></i>&nbsp;查看</button>' +
                    '<button type="button" class="btn btn-danger button-margin" onclick="Expense.deleteRecord(' + row.id + ')" id=""><i class="fa fa-arrows-alt"></i>&nbsp;删除</button>';
            }
        }
        }
    ];
};

/**
 * 流程详情
 */
Expense.findRecord = function (id) {
    var index = layer.open({
        type: 2,
        title: '流程详情',
        area: ['1000px', '500px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/expense/expense_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 删除审核记录
 */
Expense.deleteRecord = function (id) {
    var ajax = new $ax(Feng.ctxPath + "/expense/delete", function (data) {
        Feng.success("删除成功!");
        Expense.table.refresh();
    }, function (data) {
        Feng.error("删除失败!" + data.responseJSON.message + "!");
    });
    ajax.set("expenseId", id);
    ajax.start();
};

/**
 * 点击添加报销管理
 */
Expense.openAddExpense = function () {
    var index = layer.open({
        type: 2,
        title: '添加报销管理',
        area: ['600px', '350px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/expense/expense_add'
    });
    this.layerIndex = index;
};

/**
 * 查询报销管理列表
 */
Expense.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Expense.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Expense.initColumn();
    var table = new BSTable(Expense.id, "/expense/list", defaultColunms);
    table.setPaginationType("client");
    Expense.table = table.init();
});
