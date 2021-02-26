layui.use(['table', 'form', 'func', 'HttpRequest', 'util'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var util = layui.util;

    // 职位表管理
    var Position = {
        tableId: "positionTable"
    };

    // 初始化表格的列
    Position.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'positionId', hide: true, title: '主键id'},
            {field: 'positionName', sort: true, title: '职位名称'},
            {field: 'positionCode', sort: true, title: '职位编码'},
            {field: 'positionRemark', sort: true, title: '备注'},
            {field: 'statusFlag', sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 点击查询按钮
    Position.search = function () {
        var queryData = {};
        queryData['positionName'] = $("#positionName").val();
        //queryData['positionCode'] = $("#positionCode").val();
        table.reload(Position.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };

    // 弹出添加对话框
    Position.openAddDlg = function () {
        func.open({
            title: '添加职位',
            content: Feng.ctxPath + '/view/position/addView',
            tableId: Position.tableId
        });
    };

    // 点击编辑
    Position.openEditDlg = function (data) {
        func.open({
            title: '修改职位',
            content: Feng.ctxPath + '/view/position/editView?positionId=' + data.positionId,
            tableId: Position.tableId
        });
    };

    // 导出excel按钮
    Position.exportExcel = function () {
        var checkRows = table.checkStatus(Position.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    // 点击删除
    Position.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/hrPosition/delete", 'post', function (data) {
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

    // 修改职位状态
    Position.updateStatus = function (positionId, checked) {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/hrPosition/updateStatus", 'post', function (data) {
            table.reload(Position.tableId);
            Feng.success("修改成功!");
        }, function (data) {
            table.reload(Position.tableId);
            Feng.error("修改失败!" + data.message);
        });
        httpRequest.set({"positionId": positionId, "statusFlag": checked});
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Position.tableId,
        url: Feng.ctxPath + '/hrPosition/page',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
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

    // 导出excel
    $('#btnExp').click(function () {
        Position.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Position.tableId + ')', function (obj) {
        var data = obj.data;
        var event = obj.event;
        if (event === 'edit') {
            Position.openEditDlg(data);
        } else if (event === 'delete') {
            Position.delete(data);
        }
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        var positionId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        Position.updateStatus(positionId, checked);
    });
});
