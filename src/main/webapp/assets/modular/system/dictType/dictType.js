layui.use(['table', 'func', 'HttpRequest', 'form'], function () {
    var $ = layui.$;
    var table = layui.table;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;

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
                field: 'dictTypeName', align: "center", sort: true, title: '类型名称', templet: function (d) {
                    var url = Feng.ctxPath + '/view/dict?dictTypeId=' + d.dictTypeId;
                    return '<a style="color: #01AAED;" href="' + url + '">' + d.dictTypeName + '</a>';
                }
            },
            {
                field: 'dictTypeClass', align: "center", sort: true, title: '字典类型', templet: function (d) {
                    if (d.dictTypeClass === 1) {
                        return "业务类型";
                    } else {
                        return "系统类型";
                    }
                }
            },
            {field: 'dictTypeNamePinYin', align: "center", sort: true, title: '名词拼音'},
            {field: 'dictTypeCode', align: "center", sort: true, title: '类型编码', minWidth: 166},
            {field: 'dictTypeBusCode', align: "center", sort: true, title: '业务编码', minWidth: 166},
            {field: 'dictTypeDesc', align: "center", sort: true, title: '字典描述'},
            {field: 'statusFlag', sort: true, align: "center", title: '状态', templet: '#statusFlagTpl'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DictType.search = function () {
        var queryData = {};
        queryData['dictTypeName'] = $("#dictTypeName").val();
        queryData['dictTypeClass'] = $("#dictTypeClass").val();
        queryData['statusFlag'] = $("#statusFlag").val();
        table.reload(DictType.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    DictType.openAddDlg = function () {
        func.open({
            height: 700,
            title: '添加字典类型',
            content: Feng.ctxPath + '/view/dictType/addView',
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
            height: 700,
            title: '修改字典类型',
            content: Feng.ctxPath + '/view/dictType/editView?dictTypeId=' + data.dictTypeId,
            tableId: DictType.tableId
        });
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    DictType.onDeleteItem = function (data) {
		
        if (data.dictTypeClass === 2) {
            Feng.error("系统类型无法删除");
            return;
        }

        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/dictType/deleteDictType", 'post', function (data) {
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
	
    // 修改字典类型状态
    DictType.updateStatus = function (dictTypeId, checked) {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/dictType/updateStatus", 'post', function (data) {
            table.reload(DictType.tableId);
            Feng.success("修改成功!");
        }, function (data) {
            table.reload(DictType.tableId);
            Feng.error("修改失败!" + data.message);
        });
        httpRequest.set({"dictTypeId": dictTypeId, "statusFlag": checked});
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + DictType.tableId,
        url: Feng.ctxPath + '/dictType/getDictTypePageList',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: DictType.initColumn(),
        parseData: Feng.parseData
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
	
    // 修改状态
    form.on('switch(statusFlag)', function (obj) {
        var dictTypeId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        DictType.updateStatus(dictTypeId, checked);
    });
});
