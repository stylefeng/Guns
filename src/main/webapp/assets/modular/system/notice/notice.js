layui.use(['layer', 'form', 'table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 系统管理--通知管理
     */
    var Notice = {
        tableId: "noticeTable"    //表格id
    };

    /**
     * 初始化表格的列
     */
    Notice.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'noticeId', align: "center", hide: true, sort: true, title: 'id'},
            {field: 'noticeTitle', align: "center", sort: true, title: '通知标题'},
            {field: 'priorityLevelValue', align: "center", sort: true, title: '优先级'},
            {field: 'createUser', align: "center", sort: true, title: '创建人'},
            {field: 'createTime', align: "center", sort: true, title: '创建时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Notice.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Notice.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Notice.openAddNotice = function () {
        func.open({
            title: '添加通知',
            content: Feng.ctxPath + '/view/notice/add',
            tableId: Notice.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onEditNotice = function (data) {
        func.open({
            title: '修改通知',
            content: Feng.ctxPath + "/view/notice/edit?noticeId=" + data.noticeId,
            tableId: Notice.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onDeleteNotice = function (data) {
        var operation = function () {
            var ajax = new HttpRequest(Feng.ctxPath + "/sysNotice/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("noticeId", data.noticeId);
            ajax.start();
        };
        Feng.confirm("是否删除通知 " + data.title + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/sysNotice/page',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData,
        cols: Notice.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Notice.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Notice.openAddNotice();
    });

    // 工具条点击事件
    table.on('tool(' + Notice.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Notice.onEditNotice(data);
        } else if (layEvent === 'delete') {
            Notice.onDeleteNotice(data);
        }
    });
});
