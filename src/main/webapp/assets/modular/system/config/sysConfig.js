layui.use(['table', 'func', 'HttpRequest'], function () {
    var $ = layui.$;
    var table = layui.table;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;

    /**
     * 参数配置管理
     */
    var SysConfig = {
        tableId: "sysConfigTable"
    };

    /**
     * 初始化表格的列
     */
    SysConfig.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'configId', hide: true, title: '主键'},
            {field: 'configName', sort: true, align: "center", title: '名称'},
            {field: 'configCode', sort: true, align: "center", title: '属性编码'},
            {field: 'configValue', sort: true, align: "center", title: '属性值'},
            {field: 'remark', sort: true, align: "center", title: '备注'},
            {field: 'createTime', sort: true, align: "center", title: '创建时间'},
            {field: 'updateTime', sort: true, align: "center", title: '更新时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    SysConfig.search = function () {
        var queryData = {};
        queryData['configName'] = $("#configName").val();
        table.reload(SysConfig.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    SysConfig.openAddDlg = function () {
        func.open({
            title: '添加系统配置',
            content: Feng.ctxPath + '/view/config/addView',
            tableId: SysConfig.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    SysConfig.exportExcel = function () {
        var checkRows = table.checkStatus(SysConfig.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    SysConfig.openEditDlg = function (data) {
        func.open({
            title: '修改系统配置',
            content: Feng.ctxPath + '/view/config/editView?configId=' + data.configId,
            tableId: SysConfig.tableId
        });
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    SysConfig.onDeleteItem = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(SysConfig.tableId);
            }, function (data) {
                Feng.error(data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + SysConfig.tableId,
        url: Feng.ctxPath + '/sysConfig/page',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: SysConfig.initColumn(),
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        SysConfig.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        SysConfig.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        SysConfig.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + SysConfig.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            SysConfig.openEditDlg(data);
        } else if (layEvent === 'delete') {
            SysConfig.onDeleteItem(data);
        }
    });
});
