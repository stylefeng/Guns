/**
 * 字典管理初始化
 */
var Dict = {
    id: "dictTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        condition: ""
    }
};

/**
 * 初始化表格的列
 */
Dict.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'dictId', visible: false, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', align: 'center', valign: 'middle', sortable: true},
        {title: '字典编码', field: 'code', align: 'center', valign: 'middle', sortable: true},
        {title: '详情', field: 'detail', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'description', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
Dict.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Dict.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加字典类型
 */
Dict.openAddType = function () {
    this.layerIndex = layer.open({
        type: 2,
        title: '添加字典类型',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dict/dict_add_type'
    });
};

/**
 * 点击添加字典子条目
 */
Dict.openAddItem = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '添加字典条目',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dict/dict_add_item?dictId=' + Dict.seItem.dictId
        });
    }
};

/**
 * 删除字典
 */
Dict.delete = function () {
    if (this.check()) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dict/delete", function (data) {
                Feng.success("删除成功!");
                Dict.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("dictId", Dict.seItem.dictId);
            ajax.start();
        };

        Feng.confirm("是否刪除字典 " + Dict.seItem.name + "?", operation);
    }
};

/**
 * 查询字典列表
 */
Dict.search = function () {
    var queryData = {};
    queryData['condition'] = Dict.condition.condition;
    Dict.table.refresh({query: queryData});
};

$(function () {

    Dict.app = new Vue({
        el: '#dictPage',
        data: Dict.condition
    });

    var defaultColunms = Dict.initColumn();
    var table = new BSTable(Dict.id, "/dict/list", defaultColunms);
    table.setPaginationType("client");
    Dict.table = table.init();
});
