layui.use(['table', 'treeTable', 'func', 'HttpRequest'], function () {
    var $ = layui.$;
    var treeTable = layui.treeTable;
    var table = layui.table;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;

    //table的初始化实例
    var insTb;

    /**
     * 基础字典管理
     */
    var Dict = {
        tableId: "dictTable"
    };

    /**
     * 初始化表格的列
     */
    Dict.initColumn = function () {
        return [
            {type: 'checkbox'},
            {field: 'dictName', align: "center", title: '字典名称'},
            {field: 'dictCode', align: "center", title: '字典编码'},
            {field: 'dictNamePinYin', align: "center", title: '字典拼音'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ];
    };

    /**
     * 点击查询按钮
     */
    Dict.search = function () {
        var queryData = {};
        queryData['dictName'] = $("#condition").val();
        queryData['dictCode'] = $("#condition").val();
        Dict.initTable(Dict.tableId, queryData);
    };

    /**
     * 弹出添加对话框
     */
    Dict.openAddDlg = function () {
        func.open({
            height: 550,
            title: '添加字典',
            content: Feng.ctxPath + '/view/dict/addView?dictTypeId=' + $("#dictTypeId").val(),
            tableId: Dict.tableId,
            endCallback: function () {
                Dict.initTable(Dict.tableId);
            }
        });
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Dict.openEditDlg = function (data) {
        func.open({
            height: 550,
            title: '修改字典',
            content: Feng.ctxPath + '/view/dict/editView?dictId=' + data.dictId,
            tableId: Dict.tableId,
            endCallback: function () {
                Dict.initTable(Dict.tableId);
            }
        });
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    Dict.onDeleteItem = function (data) {
        var operation = function () {
            // var ajax = new $ax(Feng.ctxPath + "/dict/delete", function (data) {
            //     Feng.success("删除成功!");
            //     Dict.search();
            // }, function (data) {
            //     Feng.error("删除失败!" + data.responseJSON.message + "!");
            // });
            // ajax.set("dictId", data.dictId);
            // ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    /**
     * 渲染表格
     */
    Dict.initTable = function (dictId, data) {
        return treeTable.render({
            elem: '#' + dictId,
            tree: {
                iconIndex: 1,           // 折叠图标显示在第几列
                idName: 'dictId',         // 自定义id字段的名称
                pidName: 'parentId',       // 自定义标识是否还有子节点的字段名称
                haveChildName: 'haveChild',  // 自定义标识是否还有子节点的字段名称
                isPidData: true         // 是否是pid形式数据
            },
			page: true,
			request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
            height: "full-98",
            cols: Dict.initColumn(),
            reqData: function (d, callback) {
				var httpRequest = new HttpRequest(Feng.ctxPath + '/dict/getDictTreeList?dictTypeCode=' + $("#dictTypeCode").val(), 'get', function (result) {
					callback(result.data);
				}, function (result) {
					Feng.error("加载失败!" + result.message + "!");
				});
				httpRequest.set(data);
				httpRequest.start();
            },
        });
    };

    insTb = Dict.initTable(Dict.tableId);

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Dict.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Dict.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Dict.exportExcel();
    });

    // 关闭页面
    $('#btnBack').click(function () {
        window.location.href = Feng.ctxPath + "/view/dictType";
    });

    // 工具条点击事件
    treeTable.on('tool(' + Dict.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Dict.openEditDlg(data);
        } else if (layEvent === 'delete') {
            Dict.onDeleteItem(data);
        }
    });
});
