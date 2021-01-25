layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 多语言表管理
     */
    var Translation = {
        tableId: "translationTable"
    };

    /**
     * 初始化表格的列
     */
    Translation.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'tranId', hide: true, title: '主键id'},
            {field: 'tranCode', sort: true, title: '编码'},
            {field: 'tranName', sort: true, title: '名称'},
            {
                field: 'language', sort: true, title: '语种', templet: function (d) {
                    if (d.language === 1) {
                        return "中文";
                    } else if (d.language === 2) {
                        return "英文";
                    }
                }
            },
            {field: 'tranValue', sort: true, title: '翻译的值'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'updateTime', sort: true, title: '更新时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Translation.search = function () {
        var queryData = {};
        queryData['tranName'] = $("#tranName").val();
        table.reload(Translation.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Translation.openAddDlg = function () {
        func.open({
            title: '添加多语言表',
            content: Feng.ctxPath + '/view/i18n/add',
            tableId: Translation.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Translation.openEditDlg = function (data) {
        func.open({
            title: '修改多语言表',
            content: Feng.ctxPath + '/view/i18n/edit?tranId=' + data.tranId,
            tableId: Translation.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    Translation.exportExcel = function () {
        var checkRows = table.checkStatus(Translation.tableId);
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
    Translation.onDeleteItem = function (data) {
        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/i18n/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Translation.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("tranId", data.tranId);
            request.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Translation.tableId,
        url: Feng.ctxPath + '/i18n/page',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Translation.initColumn(),
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Translation.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Translation.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Translation.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Translation.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Translation.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Translation.onDeleteItem(data);
        }
    });
});
