layui.use(['table', 'admin', 'ax', 'form', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var form = layui.form;
    var func = layui.func;

    /**
     * 职位表管理
     */
    var Position = {
        tableId: "positionTable"
    };

    /**
     * 初始化表格的列
     */
    Position.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'positionId', hide: true, title: '主键id'},
            {field: 'name', sort: true, title: '职位名称'},
            {field: 'code', sort: true, title: '职位编码'},
            {field: 'remark', sort: true, title: '备注'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'updateTime', sort: true, title: '更新时间'},
            {field: 'status', sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Position.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Position.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Position.openAddDlg = function () {
        func.open({
            height: 470,
            title: '添加职位',
            content: Feng.ctxPath + '/position/add',
            tableId: Position.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Position.openEditDlg = function (data) {
        func.open({
            height: 470,
            title: '修改职位',
            content: Feng.ctxPath + '/position/edit?positionId=' + data.positionId,
            tableId: Position.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    Position.exportExcel = function () {
        var checkRows = table.checkStatus(Position.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    Position.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/position/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Position.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("positionId", data.positionId);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    /**
     * 修改职位状态
     */
    Position.changeStatus = function (positionId, checked) {
        var ajax = new $ax(Feng.ctxPath + "/position/changeStatus", function (data) {
            Feng.success("修改成功!");
        }, function (data) {
            Feng.error("修改失败!" + data.responseJSON.message);
            table.reload(Position.tableId);
        });
        ajax.set("positionId", positionId);
        ajax.set("status", checked);
        ajax.start();
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Position.tableId,
        url: Feng.ctxPath + '/position/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Position.initColumn()
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
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Position.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Position.onDeleteItem(data);
        }
    });

    // 修改user状态
    form.on('switch(status)', function (obj) {

        var positionId = obj.elem.value;
        var checked = obj.elem.checked ? true : false;

        Position.changeStatus(positionId, checked);
    });
});
