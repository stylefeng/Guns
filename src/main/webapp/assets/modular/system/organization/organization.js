layui.use(['layer', 'form', 'table', 'ztree', 'laydate', 'admin', 'HttpRequest', 'func', 'tree', 'util'], function () {
    var form = layui.form;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var tree = layui.tree;

    /**
     * 系统管理--用户管理
     */
    var Organization = {
        tableId: "userTable",    //表格id
        condition: {
            orgName: "",
            orgParentId: "",
            orgCode: ""
        }
    };

    // 初始化表格的列
    Organization.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'orgId', hide: true, title: '主键id'},
            {field: 'orgName', sort: true, title: '机构名称'},
            {field: 'orgCode', sort: true, title: '机构编码'},
            {field: 'orgSort', sort: true, title: '排序'},
            {field: 'orgRemark', sort: true, title: '备注'},
            {field: 'statusFlag', sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 选择部门时
    Organization.onClickDept = function (obj) {
        Organization.condition.orgParentId = obj.data.id;
        Organization.search();
    };


    // 点击查询按钮
    Organization.search = function () {
        var queryData = {};
        queryData['orgParentId'] = Organization.condition.orgParentId;
        queryData['orgName'] = $("#orgName").val();
        queryData['orgCode'] = $("#orgCode").val();
        table.reload(Organization.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    // 弹出添加对话框
    Organization.openAddDlg = function () {
        func.open({
            height: 800,
            title: '添加机构',
            content: Feng.ctxPath + '/view/organization/addView',
            tableId: Organization.tableId
        });
    };

    // 点击编辑
    Organization.openEditDlg = function (data) {
        func.open({
            height: 800,
            title: '修改机构',
            content: Feng.ctxPath + '/view/organization/editView?orgId=' + data.orgId,
            tableId: Organization.tableId
        });
    };

    // 导出excel按钮
    Organization.exportExcel = function () {
        var checkRows = table.checkStatus(Organization.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    // 点击删除
    Organization.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/hrOrganization/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(Organization.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 修改职位状态
    Organization.updateStatus = function (orgId, checked) {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/hrOrganization/updateStatus", 'post', function (data) {
            table.reload(Organization.tableId);
            Feng.success("修改成功!");
        }, function (data) {
            table.reload(Organization.tableId);
            Feng.error("修改失败!" + data.message);
        });
        httpRequest.set({"orgId": orgId, "statusFlag": checked});
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Organization.tableId,
        url: Feng.ctxPath + '/hrOrganization/page',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Organization.initColumn(),
        parseData: Feng.parseData
    });

    // 初始化部门树
    var request = new HttpRequest(Feng.ctxPath + '/hrOrganization/treeLayui', 'get', function (data) {
        tree.render({
            elem: '#deptTree',
            data: data.data,
            click: Organization.onClickDept,
            onlyIconControl: true
        });
    });
    request.start();

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Organization.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Organization.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Organization.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Organization.tableId + ')', function (obj) {
        var data = obj.data;
        var event = obj.event;
        if (event === 'edit') {
            Organization.openEditDlg(data);
        } else if (event === 'delete') {
            Organization.delete(data);
        }
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        var orgId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        Organization.updateStatus(orgId, checked);
    });

});

$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 260});
});