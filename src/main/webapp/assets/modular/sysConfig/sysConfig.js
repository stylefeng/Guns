layui.use(['table', 'admin', 'ax'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;

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
            {field: 'id', hide: true, title: '主键'},
            {field: 'name', sort: true, align: "center", title: '名称'},
            {field: 'code', sort: true, align: "center", title: '属性编码'},
            {field: 'value', sort: true, align: "center", title: '属性值'},
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
        queryData['condition'] = $("#condition").val();
        table.reload(SysConfig.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    SysConfig.openAddDlg = function () {
        window.location.href = Feng.ctxPath + '/sysConfig/add';
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
        window.location.href = Feng.ctxPath + '/sysConfig/edit?id=' + data.id;
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    SysConfig.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/sysConfig/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(SysConfig.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + SysConfig.tableId,
        url: Feng.ctxPath + '/sysConfig/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: SysConfig.initColumn()
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
