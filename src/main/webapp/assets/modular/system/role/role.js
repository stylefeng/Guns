layui.use(['layer', 'form', 'table', 'admin', 'HttpRequest', 'func', 'dropdown'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var dropdown = layui.dropdown;

    /**
     * 系统管理--角色管理
     */
    var Role = {
        tableId: "roleTable",
        condition: {
            roleName: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Role.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'roleId', hide: true, sort: true, title: '角色id'},
            {field: 'roleName', align: "center", sort: true, title: '角色名称'},
            {field: 'roleCode', align: "center", sort: true, title: '角色编码'},
            {field: 'roleSort', align: "center", sort: true, title: '排序'},
            {
                field: 'roleSystemFlag', align: "center", sort: true, title: '角色级别', templet: function (data) {
                    if (data.roleSystemFlag === 'Y') {
                        return '<span class="layui-badge layui-badge-red">系统角色</span>';
                    } else {
                        return '<span class="layui-badge layui-badge-green">普通角色</span>';
                    }
                }
            },
            {
                field: 'roleTypeCode', align: "center", sort: true, title: '角色类型', templet: function (data) {
                    if (data.roleTypeCode === 'role_system') {
                        return '<span class="layui-badge layui-badge-red">系统</span>';
                    } else if(data.roleTypeCode === 'role_c'){
                        return '<span class="layui-badge layui-badge-green">C端</span>';
                    }else if(data.roleTypeCode === 'role_b'){
                        return '<span class="layui-badge layui-badge-green">B端</span>';
                    }
                    return '<span class="layui-badge layui-badge-green">未知</span>';
                }
            },

            {
                field: 'dataScopeType', align: "center", sort: true, title: '数据范围类型', templet: function (data) {
                    if (data.dataScopeType === 10) {
                        return '<span class="layui-badge layui-badge-green">仅本人数据</span>';
                    }
                    if (data.dataScopeType === 20) {
                        return '<span class="layui-badge layui-badge-green">本部门数据</span>';
                    }
                    if (data.dataScopeType === 30) {
                        return '<span class="layui-badge layui-badge-green">本部门及以下数据</span>';
                    }
                    if (data.dataScopeType === 40) {
                        return '<span class="layui-badge layui-badge-green">指定部门数据</span>';
                    }
                    if (data.dataScopeType === 50) {
                        return '<span class="layui-badge layui-badge-red">全部数据</span>';
                    }
                    return '<span class="layui-badge layui-badge-green">未知</span>';
                }
            },
            {
                field: 'statusFlag', align: "center", sort: true, title: '状态', templet: function (data) {
                    if (data.statusFlag === 1) {
                        return '<span class="layui-badge layui-badge-green">启用</span>';
                    }
                    if (data.statusFlag === 2) {
                        return '<span class="layui-badge layui-badge-green">禁用</span>';
                    }
                    return '<span class="layui-badge layui-badge-green">未知</span>';
                }
            },
            {field: 'remark', align: "center", sort: true, title: '备注'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Role.search = function () {
        var queryData = {};
        queryData['roleName'] = $("#roleName").val();
        table.reload(Role.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加角色
     */
    Role.openAddRole = function () {
        func.open({
            title: '添加角色',
            content: Feng.ctxPath + '/view/role/add',
            tableId: Role.tableId
        });
    };

    /**
     * 点击编辑角色
     *
     * @param data 点击按钮时候的行数据
     */
    Role.onEditRole = function (data) {
        func.open({
            title: '修改角色',
            content: Feng.ctxPath + "/view/role/edit?roleId=" + data.roleId,
            tableId: Role.tableId
        });
    };

    /**
     * 点击编辑数据范围
     *
     * @param data 点击按钮时候的行数据
     */
    Role.onEditDataScope = function (data) {
        func.open({
            title: '修改数据范围',
            content: Feng.ctxPath + "/view/role/editDataScope?roleId=" + data.roleId,
            tableId: Role.tableId
        });
    };

    /**
     * 点击删除角色
     *
     * @param data 点击按钮时候的行数据
     */
    Role.onDeleteRole = function (data) {
        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/sysRole/delete", 'post', function () {
                Feng.success("删除成功!");
                table.reload(Role.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("roleId", data.roleId);
            request.start(true);
        };
        Feng.confirm("是否删除角色 " + data.roleName + "?", operation);
    };

    /**
     * 分配菜单和按钮
     *
     * @param data 点击按钮时候的行数据
     */
    Role.assignMenu = function (data) {
        func.open({
            title: '分配菜单',
            content: Feng.ctxPath + "/view/role/assignMenuAndButtons?roleId=" + data.roleId,
            tableId: Role.tableId
        });
    };

    /**
     * 分配接口
     *
     * @param data 点击按钮时候的行数据
     */
    Role.assignApi = function (data) {
        func.open({
            title: '分配接口',
            content: Feng.ctxPath + "/view/role/assignApi?roleId=" + data.roleId,
            tableId: Role.tableId
        });
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Role.tableId,
        url: Feng.ctxPath + '/sysRole/page',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData,
        cols: Role.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Role.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Role.openAddRole();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Role.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Role.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Role.onEditRole(data);
        } else if (layEvent === 'editDataScope') {
            Role.onEditDataScope(data);
        } else if (layEvent === 'delete') {
            Role.onDeleteRole(data);
        } else if (layEvent === 'assignMenu') {
            Role.assignMenu(data);
        } else if (layEvent === 'assignApi') {
            Role.assignApi(data);
        }
        dropdown.hideAll();
    });
});
