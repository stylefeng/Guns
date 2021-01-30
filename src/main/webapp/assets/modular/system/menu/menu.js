layui.use(['HttpRequest', 'treeTable', 'func'], function () {
    var HttpRequest = layui.HttpRequest;
    var treeTable = layui.treeTable;
    var func = layui.func;

    /**
     * 系统管理--菜单管理
     */
    var Menu = {
        tableId: "menuTable",
        condition: {
            menuName: "",
            menuCode: ""
        },

        // treeTable实例
        treeTableInstance: null
    };

    /**
     * 初始化表格的列
     */
    Menu.initColumn = function () {
        return [
            {type: 'numbers'},
            {field: 'menuName', align: "left", sort: true, title: '菜单名称', minWidth: 120},
            {field: 'menuCode', align: "center", sort: true, title: '菜单编号', minWidth: 120},
            {field: 'appName', align: "center", sort: true, title: '应用名称'},
            {field: 'layuiPath', align: "center", sort: true, title: '请求地址', minWidth: 180},
            {
                field: 'layuiIcon', align: "center", sort: true, title: '图标', templet: '<p><i class="layui-icon {{d.layuiIcon}}"></i></p>'
            },
            {
                field: 'visible', align: "center", sort: true, title: '是否可见', templet: function (data) {
                    if (data.visible === 'Y') {
                        return '<span class="layui-badge layui-badge-green">可见</span>';
                    } else {
                        return '<span class="layui-badge layui-badge-gray">不可见</span>';
                    }
                }
            },
            {field: 'menuSort', align: "center", sort: true, title: '排序'},
            {
                field: 'statusFlag', align: "center", sort: true, title: '状态', templet: function (data) {
                    if (data.statusFlag === 1) {
                        return '<span class="layui-badge layui-badge-green">启用</span>';
                    } else {
                        return '<span class="layui-badge layui-badge-gray">禁用</span>';
                    }
                }
            },
            {align: 'center', toolbar: '#menuTableBar', title: '操作', minWidth: 145}
        ];
    };

    /**
     * 点击查询按钮
     */
    Menu.search = function () {
        var queryData = {};
        queryData['menuName'] = $("#menuName").val();
        queryData['menuCode'] = $("#menuCode").val();
        Menu.initTable(Menu.tableId, queryData);
    };

    /**
     * 弹出添加菜单对话框
     */
    Menu.openAddMenu = function () {
        func.open({
            title: '添加菜单',
            content: Feng.ctxPath + '/view/menu/add',
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 点击编辑菜单按钮时
     *
     * @param data 点击按钮时候的行数据
     */
    Menu.onEditMenu = function (data) {
        func.open({
            title: '修改菜单',
            content: Feng.ctxPath + "/view/menu/edit?menuId=" + data.menuId,
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
            var request = new HttpRequest(Feng.ctxPath + "/sysMenu/delete", 'post', function () {
                Feng.success("删除成功!");
                Menu.condition.menuId = "";
                Menu.initTable(Menu.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("menuId", data.menuId);
            request.start(true);
        };
        Feng.confirm("是否删除菜单" + data.menuName + "?", operation);
    };

    /**
     * 点击菜单 按钮管理 时
     *
     * @param data 点击菜单 按钮管理 时的行数据
     */
    Menu.onButtonMenu = function (data) {
        func.open({
            title: '菜单按钮管理',
            content: Feng.ctxPath + "/view/menuButton?menuId=" + data.menuId,
            tableId: Menu.tableId,
            endCallback: function () {
                Menu.initTable(Menu.tableId);
            }
        });
    };

    /**
     * 初始化表格
     */
    Menu.initTable = function (menuId, reqData) {
        return treeTable.render({
            elem: '#' + menuId,
            tree: {
                iconIndex: 1,               // 折叠图标显示在第几列
                idName: 'menuId',           // 自定义id字段的名称
                pidName: 'menuParentId',    // 自定义标识是否还有子节点的字段名称
                isPidData: true             // 是否是pid形式数据
            },
            height: "full-98",
            cols: Menu.initColumn(),
            reqData: function (data, callback) {
                var request = new HttpRequest(Feng.ctxPath + '/sysMenu/layuiList', 'get', function (res) {
                    callback(res.data);
                }, function (res) {
                    Feng.error("删除失败!" + res.message + "!");
                });
                request.set(reqData);
                request.start();
            }
        });
    };

    // 渲染表格
    Menu.treeTableInstance = Menu.initTable(Menu.tableId);

    // 展开所有按钮
    $('#expandAll').click(function () {
        Menu.treeTableInstance.expandAll();
    });

    // 折叠所有按钮
    $('#foldAll').click(function () {
        Menu.treeTableInstance.foldAll();
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Menu.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Menu.openAddMenu();
    });

    // 工具条点击事件
    treeTable.on('tool(menuTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Menu.onEditMenu(data);
        } else if (layEvent === 'delete') {
            Menu.onDeleteMenu(data);
        } else if (layEvent === 'button') {
            Menu.onButtonMenu(data);
        }
    });

});
