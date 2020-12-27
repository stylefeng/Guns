layui.use(['layer', 'form', 'table', 'ztree', 'laydate', 'admin', 'ax', 'func', 'tree', 'util'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var $ZTree = layui.ztree;
    var $ax = layui.ax;
    var laydate = layui.laydate;
    var admin = layui.admin;
    var func = layui.func;
    var tree = layui.tree;
    var util = layui.util;

    /**
     * 系统管理--用户管理
     */
    var MgrUser = {
        tableId: "userTable",    //表格id
        condition: {
            name: "",
            deptId: "",
            timeLimit: ""
        }
    };

    /**
     * 初始化表格的列
     */
    MgrUser.initColumn = function () {

        //获取多语言
        var langs = layui.data('system').lang;

        return [[
            {type: 'checkbox'},
            {field: 'userId', hide: true, sort: true, title: '用户id'},
            {field: 'account', align: "center", sort: true, title: langs.FIELD_ACCOUNT},
            {field: 'name', align: "center", sort: true, title: langs.FIELD_NAME},
            {field: 'deptName', align: "center", sort: true, title: langs.FIELD_DEPT},
            {field: 'positionName', align: "center", sort: true, title: langs.FIELD_POST},
            {field: 'phone', align: "center", sort: true, title: langs.FIELD_PHONE, minWidth: 117},
            {field: 'createTime', align: "center", sort: true, title: langs.FIELD_CREATE_TIME, minWidth: 160},
            {field: 'status', align: "center", sort: true, templet: '#statusTpl', title: langs.FIELD_STATUS},
            {align: 'center', toolbar: '#tableBar', title: langs.FIELD_OPERATION, minWidth: 480}
        ]];
    };

    /**
     * 选择部门时
     */
    MgrUser.onClickDept = function (obj) {
        MgrUser.condition.deptId = obj.data.id;
        MgrUser.search();
    };

    /**
     * 点击查询按钮
     */
    MgrUser.search = function () {
        var queryData = {};
        queryData['deptId'] = MgrUser.condition.deptId;
        queryData['name'] = $("#name").val();
        queryData['timeLimit'] = $("#timeLimit").val();
        table.reload(MgrUser.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加用户对话框
     */
    MgrUser.openAddUser = function () {

        //获取多语言
        var langs = layui.data('system').lang;

        func.open({
            title: langs.TITLE_ADD_USER,
            content: Feng.ctxPath + '/mgr/user_add',
            tableId: MgrUser.tableId
        });
    };

    /**
     * 点击编辑用户按钮时
     *
     * @param data 点击按钮时候的行数据
     */
    MgrUser.onEditUser = function (data) {

        //获取多语言
        var langs = layui.data('system').lang;

        func.open({
            title: langs.TITLE_EDIT_USER,
            content: Feng.ctxPath + '/mgr/user_edit?userId=' + data.userId,
            tableId: MgrUser.tableId
        });
    };

    /**
     * 导出excel按钮
     */
    MgrUser.exportExcel = function () {
        var checkRows = table.checkStatus(MgrUser.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除用户按钮
     *
     * @param data 点击按钮时候的行数据
     */
    MgrUser.onDeleteUser = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/mgr/delete", function () {
                table.reload(MgrUser.tableId);
                Feng.success("删除成功!");
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("userId", data.userId);
            ajax.start();
        };
        Feng.confirm("是否删除用户" + data.account + "?", operation);
    };

    /**
     * 分配角色
     *
     * @param data 点击按钮时候的行数据
     */
    MgrUser.roleAssign = function (data) {

        //获取多语言
        var langs = layui.data('system').lang;

        layer.open({
            type: 2,
            title: langs.TITLE_ROLE_ASSIGN,
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/mgr/role_assign?userId=' + data.userId,
            end: function () {
                table.reload(MgrUser.tableId);
            }
        });
    };

    /**
     * 重置密码
     *
     * @param data 点击按钮时候的行数据
     */
    MgrUser.resetPassword = function (data) {
        Feng.confirm("是否重置密码为" + $("#defaultPassword").val() + "?", function () {
            var ajax = new $ax(Feng.ctxPath + "/mgr/reset", function (data) {
                Feng.success("重置密码成功!");
            }, function (data) {
                Feng.error("重置密码失败!" + data.responseJSON.message + "!");
            });
            ajax.set("userId", data.userId);
            ajax.start();
        });
    };

    /**
     * 修改用户状态
     *
     * @param userId 用户id
     * @param checked 是否选中（true,false），选中就是解锁用户，未选中就是锁定用户
     */
    MgrUser.changeUserStatus = function (userId, checked) {
        if (checked) {
            var ajax = new $ax(Feng.ctxPath + "/mgr/unfreeze", function (data) {
                Feng.success("解除冻结成功!");
            }, function (data) {
                Feng.error("解除冻结失败!");
                table.reload(MgrUser.tableId);
            });
            ajax.set("userId", userId);
            ajax.start();
        } else {
            var ajax = new $ax(Feng.ctxPath + "/mgr/freeze", function (data) {
                Feng.success("冻结成功!");
            }, function (data) {
                Feng.error("冻结失败!" + data.responseJSON.message + "!");
                table.reload(MgrUser.tableId);
            });
            ajax.set("userId", userId);
            ajax.start();
        }
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + MgrUser.tableId,
        url: Feng.ctxPath + '/mgr/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: MgrUser.initColumn()
    });

    //渲染时间选择框
    laydate.render({
        elem: '#timeLimit',
        range: true,
        max: Feng.currentDate()
    });

    // 初始化部门树
    var ajax = new $ax(Feng.ctxPath + "/dept/layuiTree", function (data) {
        tree.render({
            elem: '#deptTree',
            data: data,
            click: MgrUser.onClickDept,
            onlyIconControl: true
        });
    }, function (data) {
    });
    ajax.start();

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        MgrUser.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        MgrUser.openAddUser();
    });

    // 导出excel
    $('#btnExp').click(function () {
        MgrUser.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + MgrUser.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            MgrUser.onEditUser(data);
        } else if (layEvent === 'delete') {
            MgrUser.onDeleteUser(data);
        } else if (layEvent === 'roleAssign') {
            MgrUser.roleAssign(data);
        } else if (layEvent === 'reset') {
            MgrUser.resetPassword(data);
        }
    });

    // 修改user状态
    form.on('switch(status)', function (obj) {

        var userId = obj.elem.value;
        var checked = obj.elem.checked ? true : false;

        MgrUser.changeUserStatus(userId, checked);
    });

});

$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 260});
});