layui.use(['layer', 'form', 'ztree', 'laydate', 'admin', 'ax', 'table', 'treetable', 'func'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var $ZTree = layui.ztree;
    var $ax = layui.ax;
    var laydate = layui.laydate;
    var admin = layui.admin;
    var table = layui.table;
    var treetable = layui.treetable;
    var func = layui.func;

    /**
     * 系统管理--菜单管理
     */
    var Menu = {
        tableId: "menuTable",    //表格id
        condition: {
            menuId: "",
            menuName: "",
            level: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Menu.initColumn = function () {
        return [[
            {type: 'numbers'},
            {field: 'menuId', hide: true, sort: true, title: 'id'},
            {field: 'name', align: "left", sort: true, title: '菜单名称', minWidth: 240},
            {field: 'code', align: "center", sort: true, title: '菜单编号', minWidth: 120},
            {field: 'pcode', align: "center", sort: true, title: '菜单父编号'},
            {field: 'url', align: "center", sort: true, title: '请求地址'},
            {field: 'sort', align: "center", sort: true, title: '排序'},
            {field: 'levels', align: "center", sort: true, title: '层级'},
            {field: 'isMenuName', align: "center", sort: true, title: '是否是菜单'},
            {field: 'statusName', align: "center", sort: true, title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    /**
     * 点击菜单树时
     */
    Menu.onClickMenu = function (e, treeId, treeNode) {
        Menu.condition.menuId = treeNode.id;
        Menu.search();
    };

    /**
     * 点击查询按钮
     */
    Menu.search = function () {
        var queryData = {};
        queryData['menuName'] = $("#menuName").val();
        queryData['level'] = $("#level").val();
        Menu.initTable(Menu.tableId, queryData);
    };

    /**
     * 弹出添加菜单对话框
     */
    Menu.openAddMenu = function () {
        func.open({
            height: 720,
            title: '添加菜单',
            content: Feng.ctxPath + '/menu/menu_add',
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 导出excel按钮
     */
    Menu.exportExcel = function () {
        var checkRows = table.checkStatus(Menu.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击编辑菜单按钮时
     *
     * @param data 点击按钮时候的行数据
     */
    Menu.onEditMenu = function (data) {
        func.open({
            height: 720,
            title: '修改菜单',
            content: Feng.ctxPath + "/menu/menu_edit?menuId=" + data.menuId,
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 点击删除菜单按钮
     *
     * @param data 点击按钮时候的行数据
     */
    Menu.onDeleteMenu = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/menu/remove", function () {
                Feng.success("删除成功!");
                Menu.condition.menuId = "";
                Menu.initTable(Menu.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("menuId", data.menuId);
            ajax.start();
        };
        Feng.confirm("是否删除菜单" + data.name + "?", operation);
    };

    /**
     * 初始化表格
     */
    Menu.initTable = function (menuId, data) {
        return treetable.render({
            elem: '#' + menuId,
            url: Feng.ctxPath + '/menu/listTree',
            where: data,
            page: false,
            height: "full-98",
            cellMinWidth: 100,
            cols: Menu.initColumn(),
            treeColIndex: 2,
            treeSpid: "0",
            treeIdName: 'code',
            treePidName: 'pcode'
        });
    };

    // 渲染表格
    var tableResult = Menu.initTable(Menu.tableId);
    $('#expandAll').click(function () {
        treetable.expandAll('#' + Menu.tableId);
    });
    $('#foldAll').click(function () {
        treetable.foldAll('#' + Menu.tableId);
    });

    //渲染时间选择框
    laydate.render({
        elem: '#timeLimit',
        range: true,
        max: Feng.currentDate()
    });

    //初始化左侧部门树
    var ztree = new $ZTree("menuTree", "/menu/selectMenuTreeList");
    ztree.bindOnClick(Menu.onClickMenu);
    ztree.init();

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Menu.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Menu.openAddMenu();
    });

    // 工具条点击事件
    table.on('tool(' + Menu.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Menu.onEditMenu(data);
        } else if (layEvent === 'delete') {
            Menu.onDeleteMenu(data);
        } else if (layEvent === 'roleAssign') {
            Menu.roleAssign(data);
        } else if (layEvent === 'reset') {
            Menu.resetPassword(data);
        }
    });

});
