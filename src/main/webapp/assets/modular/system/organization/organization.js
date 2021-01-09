layui.use(['table', 'form', 'func', 'HttpRequest', 'tree', 'util'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var xmSelect = layui.xmSelect;
    var tree = layui.tree;

    // 职位表管理
    var Organization = {
        tableId: "organizationTable"
    };


    /* 渲染树形 */
    function renderTree() {
        $.get(Feng.ctxPath + '/hrOrganization/treeLayui', function (data) {
            tree.render({
                elem: '#organizationTree',
                onlyIconControl: true,
                data: data.data,
                click: function (rest) {
                    $('#organizationTree').find('.ew-tree-click').removeClass('ew-tree-click');
                    $(rest.elem).children('.layui-tree-entry').addClass('ew-tree-click');
                    table.reload(Organization.tableId, {
                        where: {organizationId: rest.data.id},
                        page: {curr: 1}
                    });
                }
            });
            $('#organizationTree').find('.layui-tree-entry:first>.layui-tree-main>.layui-tree-txt').trigger('click');
        });
    }

    renderTree();

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

    // 点击查询按钮
    Organization.search = function () {
        var queryData = {};
        queryData['orgName'] = $("#orgName").val();
        table.reload(Organization.tableId, {
            where: queryData,
            page: {curr: 1}
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
                Feng.error("删除失败!" + data.responseJSON.message + "!");
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
            Feng.error("修改失败!" + data.responseJSON.message);
        });
        httpRequest.set({"orgId": orgId, "statusFlag": checked});
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Organization.tableId,
        url: Feng.ctxPath + '/hrOrganization/page',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: Organization.initColumn(),
        parseData: Feng.parseData
    });

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
