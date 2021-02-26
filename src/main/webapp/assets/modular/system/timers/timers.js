layui.use(['table', 'admin', 'form', 'func', 'HttpRequest', 'dropdown'], function () {
    let $ = layui.$;
    let table = layui.table;
    let form = layui.form;
    let func = layui.func;
    let HttpRequest = layui.HttpRequest;
    let dropdown = layui.dropdown;

    // 定时表管理
    let Position = {
        tableId: "timerTable"
    };

    // 初始化表格的列
    Position.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'timerId', hide: true, title: '主键id'},
            {field: 'timerName', sort: true, title: '任务名称'},
            {field: 'cron', sort: true, title: 'cron表达式'},
            {field: 'actionClass', sort: true, title: '任务class'},
            {field: 'remark', sort: true, title: '备注信息'},
            {field: 'jobStatus', sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 点击查询按钮
    Position.search = function () {
        let queryData = {};
        queryData['timerName'] = $("#timerName").val();
        queryData['jobStatus'] = $("#jobStatus").val();
        table.reload(Position.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };

    // 弹出添加对话框
    Position.openAddDlg = function () {
        func.open({
            title: '添加定时任务',
            content: Feng.ctxPath + '/view/sysTimers/addView',
            tableId: Position.tableId
        });
    };

    // 点击编辑
    Position.openEditDlg = function (data) {
        func.open({
            title: '修改定时任务',
            content: Feng.ctxPath + '/view/sysTimers/editView?timerId=' + data.timerId,
            tableId: Position.tableId
        });
    };

    // 点击删除
    Position.delete = function (data) {
        let operation = function () {
            let httpRequest = new HttpRequest(Feng.ctxPath + "/sysTimers/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Position.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 修改定时任务状态
    Position.updateStatus = function (timerId, checked) {
        // 1-启动 2-停止
        let updateStatusUrl = checked == 1 ? "/sysTimers/start" : "/sysTimers/stop";

        let httpRequest = new HttpRequest(Feng.ctxPath + updateStatusUrl, 'post', function (data) {
            Feng.success("修改成功!");
        }, function (data) {
            Feng.error("修改失败!" + data.responseJSON.message);
            table.reload(Position.tableId);
        });
        httpRequest.set({"timerId": timerId});
        httpRequest.start(true);
    };

    // 渲染表格
    let tableResult = table.render({
        elem: '#' + Position.tableId,
        url: Feng.ctxPath + '/sysTimers/page',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        height: "full-158",
        cellMinWidth: 100,
        cols: Position.initColumn(),
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Position.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Position.openAddDlg();
    });

    // 工具条点击事件
    table.on('tool(' + Position.tableId + ')', function (obj) {
        let data = obj.data;
        let event = obj.event;
        if (event === 'edit') {
            Position.openEditDlg(data);
        } else if (event === 'delete') {
            Position.delete(data);
        }
        dropdown.hideAll();
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        let timerId = obj.elem.value;
        let checked = obj.elem.checked ? 1 : 2;
        Position.updateStatus(timerId, checked);
    });
});
