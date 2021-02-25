layui.use(['layer', 'form', 'table', 'util', 'admin', 'func', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var dictTypeObj;  // 左表选中数据

    var Dict = {
        tableId: "dictTable",
    };

    var DictType = {
        tableId: "dictTypeTable"
    };


    /* 字典类型-点击新增对话框 */
    DictType.openAddDlg = function () {
        func.open({
            title: '添加字典类型',
            content: Feng.ctxPath + '/view/dictType/addView',
            tableId: DictType.tableId
        });
    };

    /* 字典类型-点击编辑对话框 */
    DictType.openEditDlg = function (data) {
        func.open({
            title: '修改字典类型',
            content: Feng.ctxPath + '/view/dictType/editView?dictTypeId=' + data.dictTypeId,
            tableId: DictType.tableId
        });
    };

    /* 字典类型-点击删除 */
    DictType.onDeleteItem = function (data) {
        if (data.dictTypeClass === 2) {
            Feng.error("系统类型无法删除");
            return;
        }
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/dictType/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(DictType.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /* 字典类型-点击搜索 */
    form.on('submit(dictTypeTbSearch)', function (data) {
        dictTypeTable.reload({where: data.field});
        return false;
    });

    /* 字典类型-点击表格头工具栏 */
    table.on('toolbar(dictTypeTable)', function (obj) {
        var data = dictTypeObj.data;
        if (obj.event === 'add') { // 添加
            DictType.openAddDlg();
        } else if (obj.event === 'edit') { // 修改
            DictType.openEditDlg(data);
        } else if (obj.event === 'del') { // 删除
            DictType.onDeleteItem(data);
        }
    });

    /* 字典类型-渲染表格 */
    var dictTypeTable = table.render({
        elem: '#dictTypeTable',
        url: Feng.ctxPath + '/dictType/page',
        height: 'full-100',
        toolbar: '#dictTypeHtbBar',
        defaultToolbar: [], //默认表格头部右侧工具栏
        cols: [[
            {type: 'numbers'},
            {field: 'dictTypeName', title: '类型'},
            {field: 'dictTypeCode', title: '编码'},
        ]],
        done: function (res, curr, count) {
            //加载后自动选中第一行并出发click事件
            $('#dictTypeTable+.layui-table-view .layui-table-body tbody>tr:first').trigger('click');
        },
        parseData: Feng.parseData //解析成 table 组件所规定的数据格式
    });

    /* 字典类型-监听行单击事件 */
    table.on('row(dictTypeTable)', function (obj) {
        dictTypeObj = obj;
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        dictTable.reload({
            where: {dictTypeCode: obj.data.dictTypeCode},
            page: {curr: 1},
            url: Feng.ctxPath + '/dict/page'
        });
    });

    /* 删除 */
    function doDel(obj) {
        layer.confirm('确定要删除此字典吗？', {
            skin: 'layui-layer-admin',
            shade: .1
        }, function (i) {
            layer.close(i);
            var loadIndex = layer.load(2);
            $.get('../../json/ok.json', {
                id: obj.data.dictId,
            }, function (res) {
                layer.close(loadIndex);
                if (200 === res.code) {
                    layer.msg(res.msg, {icon: 1});
                    obj.del();
                    $('#dictTypeTable+.layui-table-view .layui-table-body tbody>tr:first').trigger('click');
                } else {
                    layer.msg(res.msg, {icon: 2});
                }
            }, 'json');
        });
    }

    /* 字典-点击新增对话框 */
    Dict.openAddDlg = function (data) {
        func.open({
            title: '添加字典',
            content: Feng.ctxPath + '/view/dict/addView?dictTypeId=' + data.dictTypeId,
            tableId: Dict.tableId
        });
    };

    /* 字典-点击编辑对话框 */
    Dict.openEditDlg = function (data) {
        func.open({
            title: '修改字典',
            content: Feng.ctxPath + '/view/dict/editView?dictId=' + data.dictId,
            tableId: Dict.tableId
        });
    };

    /* 字典-点击删除 */
    Dict.onDeleteItem = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/dict/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Dict.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /* 字典-点击搜索 */
    form.on('submit(dictTbSearch)', function (data) {
        //赋值左表dictTypeCode
        data.field.dictTypeCode = dictTypeObj.data.dictTypeCode;
        dictTable.reload({where: data.field});
        return false;
    });

    /* 字典-点击操作工具栏 */
    table.on('tool(dictTable)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') { // 修改
            Dict.openEditDlg(data);
        } else if (obj.event === 'del') { // 删除
            Dict.onDeleteItem(data);
        }
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Dict.openAddDlg(dictTypeObj.data);
        return false;
    });

    /* 字典-渲染表格 */
    var dictTable = table.render({
        elem: '#dictTable',
        data: [],
        height: 'full-100',
        page: true,
        //toolbar: '#dictHtbBar',
        cellMinWidth: 100,
        cols: [[
            {type: 'checkbox'},
            {type: 'numbers'},
            {field: 'dictName', align: "center", sort: true, title: '字典名称'},
            {field: 'dictCode', align: "center", sort: true, title: '字典编码'},
            {field: 'dictSort', align: "center", sort: true, title: '排序号'},
            {align: 'center', toolbar: '#dictTbBar', title: '操作'}
        ]],
        parseData: Feng.parseData
    });
});
