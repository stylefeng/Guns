layui.use(['layer', 'form', 'table', 'util', 'admin', 'tree', 'dropdown', 'xmSelect', 'treeTable', 'func', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var admin = layui.admin;
    var tree = layui.tree;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var xmSelect = layui.xmSelect;
    var selObj, treeData;  // 左树选中数据

    /**
     * 系统管理--用户管理
     */
    var OrganizationUser = {
        tableId: "userTable",    //表格id
    };


    var Organization = {

    };


    /* 点击新增对话框 */
    Organization.openAddDlg = function () {
        func.open({
            title: '添加机构',
            content: Feng.ctxPath + '/view/organization/addView',
            tableId: OrganizationUser.tableId,
            endCallback: function () {
                renderTree();
            }
        });
    };

    /* 点击编辑对话框 */
    Organization.openEditDlg = function (data) {
        func.open({
            title: '修改机构',
            content: Feng.ctxPath + '/view/organization/editView?orgId=' + data.id,
            tableId: OrganizationUser.tableId,
            endCallback: function () {
                renderTree();
            }
        });
    };

    /* 点击删除 */
    Organization.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/hrOrganization/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(OrganizationUser.tableId);
                //刷新树
                renderTree();
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /* 点击新增对话框 */
    OrganizationUser.openAddDlg = function () {
        func.open({
            title: '添加用户',
            content: Feng.ctxPath + '/view/user/addView',
            tableId: OrganizationUser.tableId
        });
    };

    /* 点击编辑对话框 */
    OrganizationUser.openEditDlg = function (data) {
        func.open({
            title: '修改用户',
            content: Feng.ctxPath + '/view/user/editView?userId=' + data.userId,
            tableId: OrganizationUser.tableId
        });
    };

    /* 修改用户状态 */
    OrganizationUser.changeUserStatus = function (userId, checked) {
        new HttpRequest(Feng.ctxPath + "/sysUser/changeStatus", 'post', function (data) {
            table.reload(OrganizationUser.tableId);
            Feng.success("修改成功!");
        }, function (data) {
            table.reload(OrganizationUser.tableId);
            Feng.error("修改失败!" + data.message);
        }).set({"userId": userId, "statusFlag": checked}).start(true);
    };

    /* 点击删除 */
    OrganizationUser.onDeleteUser = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysUser/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(OrganizationUser.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除用户" + data.account + "?", operation);
    };
    // 分配角色
    OrganizationUser.roleAssign = function (data) {
        func.open({
            title: '授权角色',
            content: Feng.ctxPath + '/view/user/roleView?userId=' + data.userId,
            tableId: OrganizationUser.tableId
        });
    };

    // 重置密码
    OrganizationUser.resetPassword = function (data) {
        Feng.confirm("是否重置密码为" + $("#defaultPassword").val() + "?", function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysUser/resetPwd", 'post', function (data) {
                Feng.success("重置密码成功!");
                table.reload(OrganizationUser.tableId);
            }, function (data) {
                Feng.error("重置密码失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        });
    };

    /* 渲染树形 */
    function renderTree() {
        $.get(Feng.ctxPath + '/hrOrganization/tree', function (res) {
            tree.render({
                elem: '#organizationTree',
                onlyIconControl: true,
                data: res.data,
                click: function (obj) {
                    selObj = obj;
                    $('#organizationTree').find('.ew-tree-click').removeClass('ew-tree-click');
                    $(obj.elem).children('.layui-tree-entry').addClass('ew-tree-click');
                    insTb.reload({
                        where: {orgId: obj.data.id},
                        page: {curr: 1},
                        url: Feng.ctxPath + '/sysUser/page',
                    });
                }
            });
            $('#organizationTree').find('.layui-tree-entry:first>.layui-tree-main>.layui-tree-txt').trigger('click');
        });
    }

    renderTree();

    /* 添加 */
    $('#userAddBtn').click(function () {
        OrganizationUser.openAddDlg();
        return false;
    });


    /* 渲染表格 */
    var insTb = table.render({
        elem: '#userTable',
        data: [],
        height: 'full-100',
        page: true,
        //toolbar: '#organizationUserTbToolBar',
        cellMinWidth: 100,
        cols: [[
            {type: 'checkbox'},
            {field: 'userId', hide: true, sort: true, title: '用户id'},
            {field: 'account', align: "center", sort: true, title: '账号'},
            {field: 'realName', align: "center", sort: true, title: '姓名'},
            {field: 'positionName', align: "center", sort: true, title: '职务'},
            {field: 'phone', align: "center", sort: true, title: '电话'},
            {field: 'status', align: "center", templet: '#statusTpl', title: '状态'},
            {title: '操作', toolbar: '#userTbBar', width: 300}

        ]],
        done: function () {
            // 表格搜索
            form.on('submit(organizationUserTbSearch)', function (data) {
                insTb.reload({where: data.field, page: {curr: 1}});
                return false;
            });
        },
        parseData: Feng.parseData
    });

    /* 点击搜索 */
    form.on('submit(userTbSearch)', function (data) {
        insTb.reload({where: data.field});
        return false;
    });

    /* 添加 */
    $('#organizationAddBtn').click(function () {
        Organization.openAddDlg();
    });

    /* 修改 */
    $('#organizationEditBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        Organization.openEditDlg(selObj.data)
    });

    /* 删除 */
    $('#organizationDelBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        selObj.data.orgId = selObj.data.id;
        Organization.delete(selObj.data)

    });

    /* 表格工具条点击事件 */
    table.on('tool(userTable)', function (obj) {
        if (obj.event === 'edit') { // 修改
            OrganizationUser.openEditDlg(obj.data);
        } else if (obj.event === 'delete') { // 删除
            OrganizationUser.onDeleteUser(obj.data);
        } else if (obj.event === 'roleAssign') {
            OrganizationUser.roleAssign(obj.data);
        } else if (obj.event === 'reset') {
            OrganizationUser.resetPassword(obj.data);
        }
    });

    // 修改user状态
    form.on('switch(status)', function (obj) {
        var userId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        OrganizationUser.changeUserStatus(userId, checked);
    });

});
