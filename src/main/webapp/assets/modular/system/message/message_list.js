layui.use(['table', 'form', 'func', 'HttpRequest', 'util'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var util = layui.util;

    // 系统消息管理
    var Message = {
        tableId: "messageTable"
    };

    // 初始化表格的列
    Message.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'messageId', hide: true, title: '主键id'},
            {field: 'businessTypeValue', sort: true, title: '业务类型'},
            {field: 'messageTitle', sort: true, title: '消息标题'},
            {field: 'messageType', sort: true, title: '消息类型'},
            // {field: 'priorityLevelValue', sort: true, title: '优先级'},
            {field: 'priorityLevelValue', sort: true, title: '优先级'},
            {field: 'readFlagValue', sort: true, title: '阅读状态'
                // , templet: function (d) {
                //     if (d.readFlag === 0) {
                //         return "未读";
                //     } else {
                //         return "已读";
                //     }
                // }
                },
            {field: 'messageSendTime', sort: true, title: '收到时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 点击查询按钮
    Message.search = function () {
        var queryData = {};
        queryData['messageTitle'] = $("#messageTitle").val();
        //queryData['messageCode'] = $("#messageCode").val();
        table.reload(Message.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };
    /**
     * 点击查看
     *
     * @param data 点击按钮时候的行数据
     */
    Message.openViewDlg = function (data) {
        func.open({
            title: '查看消息',
            content: Feng.ctxPath + '/view/message_view?messageId=' + data.messageId,
            tableId: Message.tableId
        });
    };


    // 导出excel按钮
    Message.exportExcel = function () {
        var checkRows = table.checkStatus(Message.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    // 点击删除
    Message.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Message.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 标记为已读状态
    Message.allReadFlag = function () {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/allMessageReadFlag", 'get', function (data) {
            table.reload(Message.tableId);
            Feng.success("标记已读成功!");
        }, function (data) {
            table.reload(Message.tableId);
            Feng.error("标记已读失败!" + data.responseJSON.message);
        });
        httpRequest.start();
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Message.tableId,
        url: Feng.ctxPath + '/sysMessage/page',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: Message.initColumn(),
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Message.search();
    });

    // 全部已读点击事件
    $('#allReadFlag').click(function () {
        Message.allReadFlag();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Message.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Message.tableId + ')', function (obj) {
        var data = obj.data;
        var event = obj.event;
        if (event === 'view') {
            Message.openViewDlg(data);
        } else if (event === 'delete') {
            Message.delete(data);
        }
    });
});
