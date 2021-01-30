layui.use(['layer', 'form', 'table', 'util', 'admin', 'func', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var dictTypeObj;  // 左表选中数据

    var Translation = {
        tableId: "translationTable"
    };

    var Dict = {
        tableId: "dictTable"
    };

    /* 字典类型-渲染表格 */
    var dictTable = table.render({
        elem: '#' + Dict.tableId,
        url: Feng.ctxPath + '/dict/getLanguagesPage',
        height: 'full-100',
        toolbar: '#dictHtbBar',
        defaultToolbar: [], //默认表格头部右侧工具栏
        cols: [[
            {type: 'numbers'},
            {field: 'dictName', title: '语种名称'},
            {field: 'dictCode', title: '编码'}
        ]],
        done: function (res, curr, count) {
            //加载后自动选中第一行并出发click事件
            $('#dictTable+.layui-table-view .layui-table-body tbody>tr:first').trigger('click');
        },
        parseData: Feng.parseData //解析成 table 组件所规定的数据格式
    });

    /* 字典-点击搜索 */
    form.on('submit(dictSearchBtn)', function (data) {
        dictTable.reload({where: data.field});
        return false;
    });

    /* 字典-监听行单击事件 */
    table.on('row(' + Dict.tableId + ')', function (obj) {
        dictTypeObj = obj;
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        translationTable.reload({
            where: {tranLanguageCode: obj.data.dictCode},
            page: {curr: 1},
            url: Feng.ctxPath + '/i18n/page'
        });
    });

    /* 字典-监听点击操作工具栏 */
    table.on('toolbar(' + Dict.tableId + ')', function (obj) {
        if (obj.event === 'add') { // 添加
            Dict.openAddDlg();
        } else if (obj.event === 'edit') { // 修改
            var editData = dictTypeObj.data;
            Dict.openEditDlg(editData);
        } else if (obj.event === 'del') { // 删除
            var deleteData = dictTypeObj.data;
            Dict.onDeleteItem(deleteData);
        }
    });

    /* 字典-点击新增对话框 */
    Dict.openAddDlg = function (data) {
        func.open({
            title: '添加语种',
            content: Feng.ctxPath + '/view/i18n/addTranslationView',
            tableId: Dict.tableId
        });
    };

    /* 字典-点击删除 */
    Dict.onDeleteItem = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/i18n/deleteTranLanguage", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Dict.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set("dictId", data.dictId);
            httpRequest.set("tranLanguageCode", data.dictCode);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /* 翻译-渲染表格 */
    var translationTable = table.render({
        elem: '#' + Translation.tableId,
        data: [],
        height: 'full-100',
        page: true,
        cellMinWidth: 100,
        cols: [[
            {type: 'checkbox'},
            {field: 'tranId', hide: true, title: '主键id'},
            {field: 'tranName', sort: true, title: '名称'},
            {field: 'tranCode', sort: true, title: '编码'},
            {field: 'tranValue', sort: true, title: '翻译的值'},
            {align: 'center', toolbar: '#translationTbBar', title: '操作'}
        ]],
        parseData: Feng.parseData,
        request: Feng.pageRequest
    });


    /* 翻译-点击搜索按钮 */
    form.on('submit(translationSearchBtn)', function (data) {
        // 赋值左表参数
        data.field.tranLanguageCode = dictTypeObj.data.dictCode;
        translationTable.reload({where: data.field});
        return false;
    });

    /* 翻译-点击添加按钮 */
    $('#translationBtnAdd').click(function () {
        Translation.openAddDlg(dictTypeObj.data);
        return false;
    });

    /* 翻译-监听点击操作工具栏 */
    table.on('tool(' + Translation.tableId + ')', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') { // 修改
            Translation.openEditDlg(data);
        } else if (obj.event === 'del') { // 删除
            Translation.onDeleteItem(data);
        }
    });

    /* 字典类型-点击新增对话框 */
    Translation.openAddDlg = function (data) {
        func.open({
            title: '添加多语言表',
            content: Feng.ctxPath + '/view/i18n/add?tranLanguageCode=' + data.dictCode,
            tableId: Translation.tableId
        });
    };

    /* 字典类型-点击编辑对话框 */
    Translation.openEditDlg = function (data) {
        func.open({
            title: '修改系统配置',
            content: Feng.ctxPath + '/view/i18n/edit?tranId=' + data.tranId,
            tableId: Translation.tableId
        });
    };

    /* 字典类型-点击删除 */
    Translation.onDeleteItem = function (data) {
        var operation = function () {
            new HttpRequest(Feng.ctxPath + "/i18n/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Dict.tableId);
            }, function (data) {
                Feng.error(data.message + "!");
            }).set(data).start(true);
        };
        Feng.confirm("是否删除?", operation);
    };


});
