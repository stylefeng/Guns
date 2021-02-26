layui.use(['table', 'HttpRequest', 'func', 'form'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var form = layui.form;

    /**
     * 初始化参数
     */
    var App = {
        tableId: "appTable"
    };

    /**
     * 初始化表格的列
     */
    App.initColumn = function () {
        return [[
            {type: 'radio'},
            {field: 'appId', hide: true, title: '主键'},
            {field: 'appName', sort: true, align: "center", title: '应用名称'},
            {field: 'appCode', sort: true, align: "center", title: '应用编码'},
            {field: 'activeFlag', sort: true, align: "center", title: '是否激活', templet: '#activeTpl'},
            {field: 'statusFlag', sort: true, align: "center", title: '是否启用', templet: '#statusTpl'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    App.search = function () {
        var queryData = {};
        queryData['appName'] = $("#appName").val();
        queryData['appCode'] = $("#appCode").val();
        table.reload(App.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 添加应用对话框
     */
    App.openAddDlg = function () {
        func.open({
            title: '添加应用',
            content: Feng.ctxPath + '/view/app/add',
            tableId: App.tableId
        });
    };

    /**
     * 编辑应用对话框
     *
     * @param data 点击按钮时候的行数据
     */
    App.openEditDlg = function (data) {
        func.open({
            title: '修改应用',
            content: Feng.ctxPath + '/view/app/edit?appId=' + data.appId,
            tableId: App.tableId
        });
    };

    /**
     * 更新应用为激活状态
     */
    App.updateActiveFlag = function (appId) {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysApp/updateActiveFlag", 'post', function (data) {
            Feng.success("激活成功!");
            table.reload(App.tableId);
        }, function (data) {
            Feng.error("激活失败!" + data.message);
            table.reload(App.tableId);
        });
        httpRequest.set("appId", appId);
        httpRequest.start(true);
    };

    /**
     * 更新应用状态
     */
    App.updateStatus = function (appId, statusFlag) {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysApp/updateStatus", 'post', function (data) {
            Feng.success("修改成功!");
        }, function (data) {
            Feng.error("修改失败!" + data.message);
            table.reload(App.tableId);
        });
        httpRequest.set("appId", appId);
        httpRequest.set("statusFlag", statusFlag);
        httpRequest.start(true);
    };


    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    App.onDeleteItem = function (data) {
        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/sysApp/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(App.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("appId", data.appId);
            request.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + App.tableId,
        url: Feng.ctxPath + '/sysApp/page',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: App.initColumn(),
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        App.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        App.openAddDlg();
    });

    // 工具条点击事件
    table.on('tool(' + App.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            App.openEditDlg(data);
        } else if (layEvent === 'delete') {
            App.onDeleteItem(data);
        }
    });

    // 修改激活标识
    form.on('switch(activeFilter)', function (obj) {
        var appId = obj.elem.value;
        App.updateActiveFlag(appId);
    });

    // 修改状态
    form.on('switch(statusFilter)', function (obj) {
        var appId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        App.updateStatus(appId, checked);
    });

});
