layui.use(['table', 'form', 'func', 'HttpRequest', 'util'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var util = layui.util;

    // 职位表管理
    var FileInfo = {
        tableId: "fileTable"
    };

    // 初始化表格的列
    FileInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'fileId', hide: true, title: '主键id'},
            {field: 'fileLocation', sort: true, title: '位置'},
            {field: 'fileOriginName', sort: true, title: '文件名称'},
            {field: 'fileSuffix', sort: true, title: '文件后缀'},
            {field: 'fileSizeInfo', sort: true, title: '文件大小'},
            {
                field: 'createTime', sort: true, title: '创建时间', templet: function (d) {
                    return util.toDateString(d.createTime);
                }
            },
            {field: 'createUserName', sort: true, title: '创建人'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    // 点击查询按钮
    FileInfo.search = function () {
        var queryData = {};
        queryData['fileInfoName'] = $("#fileInfoName").val();
        //queryData['positionCode'] = $("#positionCode").val();
        table.reload(FileInfo.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };

    // 弹出添加对话框
    FileInfo.openAddDlg = function () {
        func.open({
            height: 800,
            title: '添加职位',
            content: Feng.ctxPath + '/fileInfo/addView',
            tableId: FileInfo.tableId
        });
    };

    // 点击编辑
    FileInfo.openEditDlg = function (data) {
        func.open({
            height: 800,
            title: '修改职位',
            content: Feng.ctxPath + '/position/editView?positionId=' + data.positionId,
            tableId: FileInfo.tableId
        });
    };

    // 导出excel按钮
    FileInfo.exportExcel = function () {
        var checkRows = table.checkStatus(FileInfo.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    // 点击删除
    FileInfo.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/hrPosition/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(FileInfo.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };


    // 渲染表格
    var tableResult = table.render({
        elem: '#' + FileInfo.tableId,
        url: Feng.ctxPath + '/sysFileInfo/fileInfoListPage',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: FileInfo.initColumn(),
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        FileInfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        FileInfo.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        FileInfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + FileInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var event = obj.event;
        if (event === 'edit') {
            FileInfo.openEditDlg(data);
        } else if (event === 'delete') {
            FileInfo.delete(data);
        }
        dropdown.hideAll();
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        var fileInfoId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        FileInfo.updateStatus(fileInfoId, checked);
    });
});
