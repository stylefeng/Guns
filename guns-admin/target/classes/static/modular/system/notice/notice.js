/**
 * 通知管理初始化
 */
var Notice = {
    id: "NoticeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Notice.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '标题', field: 'title', align: 'center', valign: 'middle', sortable: true},
        {title: '内容', field: 'content', align: 'center', valign: 'middle', sortable: true},
        {title: '发布者', field: 'createrName', align: 'center', valign: 'middle', sortable: true},
        {title: '创建时间', field: 'createtime', align: 'center', valign: 'middle', sortable: true}
    ];
};

/**
 * 检查是否选中
 */
Notice.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Notice.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加通知
 */
Notice.openAddNotice = function () {
    var index = layer.open({
        type: 2,
        title: '添加通知',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/notice/notice_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看通知详情
 */
Notice.openNoticeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '通知详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/notice/notice_update/' + Notice.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除通知
 */
Notice.delete = function () {
    if (this.check()) {

        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/notice/delete", function (data) {
                Feng.success("删除成功!");
                Notice.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("noticeId", Notice.seItem.id);
            ajax.start();
        };

        Feng.confirm("是否删除通知 " + Notice.seItem.title + "?", operation);
    }
};

/**
 * 查询通知列表
 */
Notice.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Notice.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Notice.initColumn();
    var table = new BSTable(Notice.id, "/notice/list", defaultColunms);
    table.setPaginationType("client");
    Notice.table = table.init();
});
