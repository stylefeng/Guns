layui.use(['table', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var func = layui.func;

    /**
     * 字典类型表管理
     */
    var DictType = {
        tableId: "dictTypeTable"
    };

    /**
     * 初始化表格的列
     */
    DictType.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'dictTypeId', hide: true, title: '字典类型id'},
            {
                field: 'name', align: "center", sort: true, title: '类型名称', templet: function (d) {
                    var url = Feng.ctxPath + '/dict?dictTypeId=' + d.dictTypeId;
                    return '<a style="color: #01AAED;" href="' + url + '">' + d.name + '</a>';
                }
            },
            {
                field: 'code', align: "center", sort: true, title: '类型编码', minWidth: 166, templet: function (d) {
                    var url = Feng.ctxPath + '/dict?dictTypeId=' + d.dictTypeId;
                    return '<a style="color: #01AAED;" href="' + url + '">' + d.code + '</a>';
                }
            },
            {
                field: 'systemFlag', align: "center", sort: true, title: '是否是系统字典', templet: function (d) {
                    if (d.systemFlag === 'Y') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'description', align: "center", sort: true, title: '字典描述'},
            {
                field: 'status', sort: true, align: "center", title: '状态', templet: function (d) {
                    if (d.status === 'ENABLE') {
                        return "启用";
                    } else {
                        return "禁用";
                    }
                }
            },
            {field: 'createTime', align: "center", sort: true, title: '添加时间', minWidth: 161},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DictType.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        queryData['systemFlag'] = $("#systemFlag").val();
        queryData['status'] = $("#status").val();
        table.reload(DictType.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    DictType.openAddDlg = function () {
        func.open({
            height: 630,
            title: '添加字典类型',
            content: Feng.ctxPath + '/dictType/add',
            tableId: DictType.tableId
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    DictType.openEditDlg = function (data) {
        func.open({
            height: 630,
            title: '修改字典类型',
            content: Feng.ctxPath + '/dictType/edit?dictTypeId=' + data.dictTypeId,
            tableId: DictType.tableId
        });
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    DictType.onDeleteItem = function (data) {

        if (data.systemFlag === 'Y') {
            Feng.error("系统字典无法删除");
            return;
        }

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dictType/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(DictType.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("dictTypeId", data.dictTypeId);
            ajax.start();
        };

        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + DictType.tableId,
        url: Feng.ctxPath + '/dictType/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: DictType.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DictType.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        DictType.openAddDlg();
    });

    // 工具条点击事件
    table.on('tool(' + DictType.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            DictType.openEditDlg(data);
        } else if (layEvent === 'delete') {
            DictType.onDeleteItem(data);
        }
    });
});
