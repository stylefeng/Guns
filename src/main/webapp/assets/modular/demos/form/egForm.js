layui.use(['table', 'admin', 'ax'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;

    /**
     * Guns复杂表单的示例管理
     */
    var EgForm = {
        tableId: "egFormTable"
    };

    /**
     * 初始化表格的列
     */
    EgForm.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'formId', hide: true, title: '主键id'},
            {field: 'name', sort: true, title: '名称'},
            {field: 'singleTime', sort: true, title: '单个时间'},
            {field: 'betweenTime', sort: true, title: '时间段'},
            {field: 'simpleSelect', sort: true, title: '单行选择'},
            {field: 'fenzuSelect', sort: true, title: '分组选择'},
            {field: 'modules', sort: true, title: '搜索选择'},
            {field: 'multiSelectHidden', sort: true, title: '多个选择'},
            {
                align: 'center', templet: function (d) {
                    // var url = d.imgUrl;
                    var url = 'https://pic.qqtn.com/up/2018-9/15367146917869444.jpg';
                    return '<img src="' + url + '" class="tdImg" />';
                }, title: '缩略图', width: 90, unresize: true
            },
            {field: 'fileInputHidden', sort: true, title: '文件id'},
            {field: 'closeFlag', sort: true, title: '开关标识'},
            {field: 'sex', sort: true, title: '单选'},
            {field: 'checkbox', sort: true, title: '复选框'},
            {field: 'number', sort: true, title: '数字'},
            {field: 'longText', sort: true, title: '长字段'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    EgForm.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(EgForm.tableId, {where: queryData});
    };

    /**
     * 弹出添加对话框
     */
    EgForm.openAddDlg = function () {
        admin.putTempData('formOk', false);
        top.layui.admin.open({
            type: 2,
            title: '添加Guns复杂表单的示例',
            content: Feng.ctxPath + '/egForm/add',
            end: function () {
                admin.getTempData('formOk') && table.reload(EgForm.tableId);
            }
        });
    };

    /**
     * 导出excel按钮
     */
    EgForm.exportExcel = function () {
        var checkRows = table.checkStatus(EgForm.tableId);
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
    EgForm.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/egForm/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(EgForm.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("formId", data.formId);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + EgForm.tableId,
        url: Feng.ctxPath + '/egForm/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: EgForm.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        EgForm.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        window.location.href = Feng.ctxPath + "/egForm/add";
    });

    // 导出excel
    $('#btnExp').click(function () {
        EgForm.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + EgForm.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'delete') {
            EgForm.onDeleteItem(data);
        }
    });
});
