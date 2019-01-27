layui.use(['layer', 'form', 'table', 'admin', 'ax'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;

    /**
     * 系统管理--字典管理
     */
    var Dict = {
        tableId: "dictTable",    //表格id
        condition: {
            condition: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Dict.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'dictId', hide: true, sort: true, title: 'id'},
            {field: 'name', sort: true, title: '名称'},
            {field: 'code', sort: true, title: '字典编码'},
            {field: 'detail', sort: true, title: '详情'},
            {field: 'description', sort: true, title: '备注'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Dict.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Dict.tableId, {where: queryData});
    };

    /**
     * 弹出添加字典
     */
    Dict.openAddDict = function () {
        admin.putTempData('formOk', false);
        top.layui.admin.open({
            type: 2,
            title: '添加字典类型',
            content: Feng.ctxPath + '/dict/dict_add_type',
            end: function () {
                admin.getTempData('formOk') && table.reload(Dict.tableId);
            }
        });
    };

    /**
     * 弹出添加子条目
     */
    Dict.openAddDictSub = function (data) {
        admin.putTempData('formOk', false);
        top.layui.admin.open({
            type: 2,
            title: '添加子条目',
            content: Feng.ctxPath + '/dict/dict_add_item?dictId=' + data.dictId,
            end: function () {
                admin.getTempData('formOk') && table.reload(Dict.tableId);
            }
        });
    };

    /**
     * 导出excel按钮
     */
    Dict.exportExcel = function () {
        var checkRows = table.checkStatus(Dict.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除字典
     *
     * @param data 点击按钮时候的行数据
     */
    Dict.onDeleteRole = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dict/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Dict.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("dictId", data.dictId);
            ajax.start();
        };
        Feng.confirm("是否刪除字典 " + data.name + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Dict.tableId,
        url: Feng.ctxPath + '/dict/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Dict.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Dict.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Dict.openAddDict();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Dict.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Dict.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'addSub') {
            Dict.openAddDictSub(data);
        } else if (layEvent === 'delete') {
            Dict.onDeleteRole(data);
        } else if (layEvent === 'roleAssign') {
            Dict.roleAssign(data);
        }
    });
});
