layui.use(['table', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;

    var menuId = Feng.getUrlParam("menuId");

    /**
     * 初始化参数
     */
    var MenuButton = {
        tableId: "menuButtonTable"
    };

    /**
     * 初始化表格的列
     */
    MenuButton.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'buttonId', hide: true, title: '主键'},
            {field: 'buttonName', sort: true, align: "center", title: '按钮名称'},
            {field: 'buttonCode', sort: true, align: "center", title: '按钮编码'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    MenuButton.search = function () {
        var queryData = {};
        queryData['buttonName'] = $("#buttonName").val();
        table.reload(MenuButton.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 添加菜单按钮对话框
     */
    MenuButton.openAddDlg = function () {
        func.open({
            height: '350px',
            width: '500px',
            title: '添加菜单按钮',
            content: Feng.ctxPath + '/view/menuButton/add?menuId=' + menuId,
            tableId: MenuButton.tableId
        });
    };

    /**
     * 编辑菜单按钮对话框
     *
     * @param data 点击按钮时候的行数据
     */
    MenuButton.openEditDlg = function (data) {
        func.open({
            height: '350px',
            width: '500px',
            title: '修改菜单按钮',
            content: Feng.ctxPath + '/view/menuButton/edit?buttonId=' + data.buttonId,
            tableId: MenuButton.tableId
        });
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    MenuButton.onDeleteItem = function (data) {
        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/sysMenuButton/delete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(MenuButton.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("buttonId", data.buttonId);
            request.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /**
     * 点击意见添加系统默认按钮
     */
    MenuButton.onAddDefaultItem = function () {
        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/sysMenuButton/addSystemDefaultButton", 'post', function (data) {
                Feng.success("添加成功!");
                table.reload(MenuButton.tableId);
            }, function (data) {
                Feng.error("添加失败!" + data.message + "!");
            });
            request.set("menuId", menuId);
            request.start(true);
        };
        Feng.confirm("是否一键添加系统默认CRUD操作按钮?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + MenuButton.tableId,
        url: Feng.ctxPath + '/sysMenuButton/pageList?menuId=' + menuId,
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: MenuButton.initColumn(),
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        MenuButton.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        MenuButton.openAddDlg();
    });

    // 一键添加按钮点击事件
    $('#defaultBtnAdd').click(function () {
        MenuButton.onAddDefaultItem();
    });

    // 批量删除按钮点击事件
    $('#btnBatchDelete').click(function () {
        let checkStatus = table.checkStatus(MenuButton.tableId);
        let dataArray = checkStatus.data;

        if (dataArray.length === 0) {
            Feng.error('请选择需要删除的数据');
            return;
        }

        let reqData = [];
        dataArray.forEach(d => {
            reqData.push(d.buttonId);
        })

        var operation = function () {
            var request = new HttpRequest(Feng.ctxPath + "/sysMenuButton/batchDelete", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(MenuButton.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            request.set("buttonIds", reqData);
            request.start(true);
        };
        Feng.confirm("是否删除选中的数据?", operation);

    });

    // 工具条点击事件
    table.on('tool(' + MenuButton.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            MenuButton.openEditDlg(data);
        } else if (layEvent === 'delete') {
            MenuButton.onDeleteItem(data);
        }
    });

});
