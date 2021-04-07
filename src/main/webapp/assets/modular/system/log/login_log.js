layui.use(['layer', 'table', 'HttpRequest', 'laydate'], function () {
    var $ = layui.$;
    var HttpRequest = layui.HttpRequest;
    var table = layui.table;
    var laydate = layui.laydate;

    /**
     * 系统管理--登陆日志
     */
    var LoginLog = {
        tableId: "loginLogTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    LoginLog.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'menuId', hide: true, sort: true, title: 'id'},
            {field: 'userName', align: "center", sort: true, title: '用户名'},
            {field: 'llgName', align: "center", sort: true, title: '日志名称'},
            {field: 'llgSucceed', align: "center", sort: true, title: '执行结果'},
            {field: 'createTime', align: "center", sort: true, title: '时间'},
            {field: 'llgMessage', align: "center", sort: true, title: '具体消息'},
            {field: 'llgIpAddress', align: "center", sort: true, title: 'IP'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    LoginLog.search = function () {
        var queryData = {};
        queryData['beginTime'] = $("#beginTime").val();
        queryData['endTime'] = $("#endTime").val();
        queryData['llgName'] = $("#llgName").val();

        console.log(queryData);
        table.reload(LoginLog.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 导出excel按钮
     */
    LoginLog.exportExcel = function () {
        var checkRows = table.checkStatus(LoginLog.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    //清空日志
    LoginLog.cleanLog = function () {
        var operation = function () {
            new HttpRequest(Feng.ctxPath + '/loginLog/deleteAll', 'get', function (data) {
                Feng.success("清空日志成功!");
                table.reload(LoginLog.tableId);
            }, function (data) {
                Feng.error("清空日志失败!" + data.message + "!");
            }).start();
        };
        Feng.confirm("是否清空所有日志?", operation);

    };

    //渲染时间选择框
    laydate.render({
        elem: '#beginTime'
    });

    //渲染时间选择框
    laydate.render({
        elem: '#endTime'
    });

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + LoginLog.tableId,
        url: Feng.ctxPath + '/loginLog/page',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: LoginLog.initColumn(),
        parseData: Feng.parseData,
        request: Feng.pageRequest
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        LoginLog.search();
    });

    // 清空按钮点击事件
    $('#btnClean').click(function () {
        LoginLog.cleanLog();
    });
});
