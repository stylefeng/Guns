layui.use(['layer', 'form', 'table', 'ztree', 'laydate', 'admin', 'HttpRequest', 'func', 'tree', 'util'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var laydate = layui.laydate;
    var func = layui.func;
    var tree = layui.tree;

    /**
     * 系统管理--用户管理
     */
    var MgrUser = {
        tableId: "userTable",    //表格id
        condition: {
            realName: "",
            orgId: "",
            account: ""
        }
    };

    /**
     * 初始化表格的列
     */
    MgrUser.initColumn = function () {

        //获取多语言
        //var langs = layui.data('system').lang;

        return [[
            {type: 'checkbox'},
            {field: 'userId', hide: true, sort: true, title: '用户id'},
            {field: 'account', align: "center", sort: true, title: '账号'},
            {field: 'realName', align: "center", sort: true, title: '姓名'},
            {field: 'orgId', align: "center", sort: true, title: '机构'},
            {field: 'positionId', align: "center", sort: true, title: '职务'},
            {field: 'phone', align: "center", sort: true, title: '电话'},
            {field: 'createTime', align: "center", sort: true, title: '创建时间', minWidth: 160},
            {field: 'status', align: "center", sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 300}
        ]];
    };

    /**
     * 选择部门时
     */
    MgrUser.onClickDept = function (obj) {
        console.log(obj);
        MgrUser.condition.orgId = obj.data.id;
        MgrUser.search();
    };

    /**
     * 点击查询按钮
     */
    MgrUser.search = function () {
        var queryData = {};
        queryData['orgId'] = MgrUser.condition.orgId;
        queryData['account'] = $("#account").val();
        queryData['realName'] = $("#realName").val();
        table.reload(MgrUser.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    // 添加按钮
    MgrUser.openAddUser = function () {
        func.open({
            title: '添加用户',
            content: Feng.ctxPath + '/view/user/addView',
            tableId: MgrUser.tableId
        });
    };

    // 修改按钮
    MgrUser.onEditUser = function (data) {
        func.open({
            title: '修改用户',
            content: Feng.ctxPath + '/view/user/editView?userId=' + data.userId,
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

    // 删除用户
    MgrUser.onDeleteUser = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysUser/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(MgrUser.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除用户" + data.account + "?", operation);
    };

    // 分配角色
    MgrUser.roleAssign = function (data) {
        func.open({
            title: '授权角色',
            height: 470,
            content: Feng.ctxPath + '/view/user/roleView?userId=' + data.userId,
            tableId: MgrUser.tableId
        });
    };

    // 重置密码
    MgrUser.resetPassword = function (data) {
        Feng.confirm("是否重置密码为" + $("#defaultPassword").val() + "?", function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysUser/resetPwd", 'post', function (data) {
                Feng.success("重置密码成功!");
                table.reload(MgrUser.tableId);
            }, function (data) {
                Feng.error("重置密码失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        });
    };

    // 修改用户状态
    MgrUser.changeUserStatus = function (userId, checked) {

        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysUser/changeStatus", 'post', function (data) {
            table.reload(MgrUser.tableId);
            Feng.success("修改成功!");
        }, function (data) {
            table.reload(MgrUser.tableId);
            Feng.error("修改失败!" + data.message);
        });
        httpRequest.set({"userId": userId, "statusFlag": checked});
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + MgrUser.tableId,
        url: Feng.ctxPath + '/sysUser/page',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: MgrUser.initColumn(),
        parseData: Feng.parseData
    });

    //渲染时间选择框
    laydate.render({
        elem: '#timeLimit',
        range: true,
        max: Feng.currentDate()
    });

    // 初始化部门树
    var request = new HttpRequest(Feng.ctxPath + '/hrOrganization/treeLayui', 'get', function (data) {
        tree.render({
            elem: '#deptTree',
            data: data.data,
            click: MgrUser.onClickDept,
            onlyIconControl: true
        });
    });
    request.start();

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
        var checked = obj.elem.checked ? 1 : 2;
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