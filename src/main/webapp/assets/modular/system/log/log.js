layui.use(['HttpRequest', 'treeTable', 'laydate', 'func', 'form'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var form = layui.form;
    var laydate = layui.laydate;

    /**
     * 系统管理--操作日志
     */
    var Log = {
        tableId: "logTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Log.initColumn = function () {
        return [[
            {type: 'numbers'},
            {field: 'logId', hide: true, sort: true, title: 'id'},
            /*{field: 'logType', align: "center", sort: true, title: '日志类型'},*/
            {field: 'logName', align: "center", sort: true, title: '日志名称'},
            {field: 'realName', align: "center", sort: true, title: '用户名称'},
            {field: 'appName', align: "center", sort: true, title: '服务名称'},
            {field: 'requestUrl', align: "center", sort: true, title: '方法名'},
            {field: 'createTime', align: "center", sort: true, title: '时间'},
            {field: 'logContent', align: "center", sort: true, title: '具体消息'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 100}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Log.search = function () {
        var queryData = {};
        queryData['beginDateTime'] = $("#beginDateTime").val();
        queryData['endDateTime'] = $("#endDateTime").val();
        queryData['logName'] = $("#logName").val();
        queryData['appName'] = $("#appName").val();
        // queryData['logType'] = $("#logType").val();
        table.reload(Log.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    // 点击详情
    Log.openDetailDlg = function (data) {
        func.open({
            title: '日志详情',
            content: Feng.ctxPath + '/view/log/detailView?logId=' + data.logId,
            tableId: Log.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    Log.exportExcel = function () {
        var checkRows = table.checkStatus(Log.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 清空日志
     */
    Log.cleanLog = function () {
        var queryData = {};
        queryData['beginDateTime'] = $("#beginDate").val();
        queryData['endDateTime'] = $("#endDate").val();
        queryData['appName'] = $("#appName").val();
        if (queryData.beginDateTime == "" || queryData.endDateTime == "" || queryData.appName == "") {
            Feng.error("请选择开始时间、结束时间和服务名称");
            return false;
        }
        var operation = function () {
            new HttpRequest(Feng.ctxPath + '/logManager/delete', 'post', function (data) {
                Feng.success("删除日志成功!");
                table.reload(Log.tableId);
            }, function (data) {
                Feng.error("删除日志失败!" + data.message + "!");
            }).set(queryData).start(true);
        };
        Feng.confirm("是否删除日志?", operation);
    };

    // 渲染时间选择框
    laydate.render({
        elem: '#beginDateTime'
    });

    //渲染时间选择框
    laydate.render({
        elem: '#endDateTime'
    });

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Log.tableId,
        url: Feng.ctxPath + '/logManager/page',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Log.initColumn(),
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Log.search();
    });

    // 清空按钮点击事件
    $('#btnClean').click(function () {
        Log.cleanLog();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Log.exportExcel();
    });


    //工具条点击事件
    table.on('tool(' + Log.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'detail') {
            Log.openDetailDlg(data);
        }
    });
});
