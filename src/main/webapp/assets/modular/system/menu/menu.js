layui.use(['layer', 'form', 'table', 'ztree', 'laydate', 'admin', 'ax'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var $ZTree = layui.ztree;
    var $ax = layui.ax;
    var laydate = layui.laydate;
    var admin = layui.admin;

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
            {type: 'checkbox'},
            {field: 'menuId', hide: true, sort: true, title: 'id'},
            {field: 'name', sort: true, title: '菜单名称'},
            {field: 'code', sort: true, title: '菜单编号'},
            {field: 'pcode', sort: true, title: '菜单父编号'},
            {field: 'url', sort: true, title: '请求地址'},
            {field: 'sort', sort: true, title: '排序'},
            {field: 'levels', sort: true, title: '层级'},
            {field: 'isMenuName', sort: true, title: '是否是菜单'},
            {field: 'statusName', sort: true, title: '状态'},
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
        queryData['menuId'] = Menu.condition.menuId;
        queryData['menuName'] = $("#menuName").val();
        queryData['level'] = $("#level").val();
        table.reload(Menu.tableId, {where: queryData});
    };

    /**
     * 弹出添加菜单对话框
     */
    Menu.openAddMenu = function () {
        admin.putTempData('formOk', false);
        top.layui.admin.open({
            type: 2,
            title: '添加菜单',
            content: Feng.ctxPath + '/menu/menu_add',
            end: function () {
                admin.getTempData('formOk') && table.reload(Menu.tableId);
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
        admin.putTempData('formOk', false);
        top.layui.admin.open({
            type: 2,
            title: '编辑菜单',
            content: Feng.ctxPath + '/menu/menu_edit?menuId=' + data.menuId,
            end: function () {
                admin.getTempData('formOk') && table.reload(Menu.tableId);
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
                table.reload(Menu.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("menuId", data.menuId);
            ajax.start();
        };
        Feng.confirm("是否删除菜单" + data.name + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Menu.tableId,
        url: Feng.ctxPath + '/menu/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Menu.initColumn()
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

    // 导出excel
    $('#btnExp').click(function () {
        Menu.exportExcel();
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

    // 修改user状态
    form.on('switch(status)', function (obj) {

        var userId = obj.elem.value;
        var checked = obj.elem.checked ? true : false;

        Menu.changeUserStatus(userId, checked);
    });

});
