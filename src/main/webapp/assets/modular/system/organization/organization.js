layui.use(['table', 'admin', 'ax', 'form', 'func', 'ajaxUtil', 'dropdown','util'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var ajaxUtil = layui.ajaxUtil;
    var dropdown = layui.dropdown;
    var util = layui.util;

    // 职位表管理
    var Organization = {
        tableId: "organizationTable"
    };

    // 初始化表格的列
    Organization.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'positionId', hide: true, title: '主键id'},
            {field: 'positionName', sort: true, title: '职位名称'},
            {field: 'positionCode', sort: true, title: '职位编码'},
            {field: 'positionRemark', sort: true, title: '备注'},
            {field: 'createTime', sort: true, title: '创建时间',templet: function (d) {
                return util.toDateString(d.createTime);
            }},
            {field: 'updateTime', sort: true, title: '更新时间',templet: function (d) {
                console.log(d.updateTime);
                return  d.updateTime==null?'': util.toDateString(d.updateTime);
            }},
            {field: 'statusFlag', sort: true, templet: '#statusTpl', title: '状态'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 点击查询按钮
    Organization.search = function () {
        var queryData = {};
        queryData['positionName'] = $("#positionName").val();
        //queryData['positionCode'] = $("#positionCode").val();
        table.reload(Organization.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };

    // 弹出添加对话框
    Organization.openAddDlg = function () {
        func.open({
            height: 800,
            title: '添加职位',
            content: Feng.ctxPath + '/hrOrganization/addView',
            tableId: Organization.tableId
        });
    };

    // 点击编辑
    Organization.openEditDlg = function (data) {
        func.open({
            height: 800,
            title: '修改职位',
            content: Feng.ctxPath + '/organization/editView?positionId=' + data.positionId,
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
            ajaxUtil.post(Feng.ctxPath + "/hrOrganization/delete", {"positionId":data.positionId},function (data) {
                Feng.success("删除成功!");
                table.reload(Organization.tableId);
            },function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
        };
        Feng.confirm("是否删除?", operation);
    };

    // 修改职位状态
    Organization.updateStatus = function (positionId, checked) {
        ajaxUtil.post(Feng.ctxPath + "/hrOrganization/updateStatus", {"positionId":positionId,"statusFlag":checked},function (data) {
            Feng.success("修改成功!");
        },function (data) {
            Feng.error("修改失败!" + data.responseJSON.message);
            table.reload(Organization.tableId);
        });
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
        dropdown.hideAll();
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        var positionId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        Organization.updateStatus(positionId, checked);
    });
});
