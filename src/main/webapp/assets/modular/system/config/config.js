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
    DictType.openAddDlg = function (data) {
        console.log(data);
        func.open({
            title: '添加系统配置',
            content: Feng.ctxPath + '/view/config/addView?groupCode=' + data.dictCode,
            tableId: Dict.tableId
        });
    };

    /* 字典类型-点击编辑对话框 */
    DictType.openEditDlg = function (data) {
        func.open({
            title: '修改系统配置',
            content: Feng.ctxPath + '/view/config/editView?configId=' + data.configId,
            tableId: Dict.tableId
        });
    };

    /* 字典类型-点击删除 */
    DictType.onDeleteItem = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Dict.tableId);
            }, function (data) {
                Feng.error(data.message + "!");
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
            Dict.openAddDlg();
        } else if (obj.event === 'edit') { // 修改
            DictType.openEditDlg(data);
        } else if (obj.event === 'del') { // 删除
            Dict.onDeleteItem(data);
        }
    });

    /* 字典类型-渲染表格 */
    var dictTypeTable = table.render({
        elem: '#dictTypeTable',
        url: Feng.ctxPath + '/dict/getConfigGroupPage',
        height: 'full-100',
        toolbar: '#dictTypeHtbBar',
        defaultToolbar: [], //默认表格头部右侧工具栏
        cols: [[
            {type: 'numbers'},
            {field: 'dictName', title: '类型'},
            {field: 'dictCode', title: '编码'}
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
            where: {groupCode: obj.data.dictCode},
            page: {curr: 1},
            url: Feng.ctxPath + '/sysConfig/page'
        });
    });


    /* 字典-点击新增对话框 */
    Dict.openAddDlg = function (data) {
        func.open({
            title: '添加配置类型',
            content: Feng.ctxPath + '/view/dict/addConfigView',
            tableId: DictType.tableId
        });
    };

    /* 字典-点击编辑对话框 */
    Dict.openEditDlg = function (data) {
        func.open({
            title: '修改配置类型',
            content: Feng.ctxPath + '/view/dict/editView?dictId=' + data.dictId,
            tableId: Dict.tableId
        });
    };

    /* 字典-点击删除 */
    Dict.onDeleteItem = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/dict/delete", 'post', function (data) {
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
            DictType.openEditDlg(data);
        } else if (obj.event === 'del') { // 删除
            DictType.onDeleteItem(data);
        }
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        console.log(dictTypeObj.data);
        DictType.openAddDlg(dictTypeObj.data);
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
            {field: 'configId', hide: true, title: '主键'},
            {field: 'configName', sort: true, title: '名称'},
            {field: 'configCode', sort: true, title: '属性编码'},
            {field: 'configValue', sort: true, title: '属性值'},
            {field: 'remark', sort: true, title: '备注'},
            {align: 'center', toolbar: '#dictTbBar', title: '操作'}
        ]],
        parseData: Feng.parseData,
        request: Feng.pageRequest
    });
});