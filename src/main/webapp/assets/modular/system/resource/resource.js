layui.use(['table', 'HttpRequest', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var func = layui.func;

    /**
     * 资源管理配置
     */
    var Resource = {
        tableId: "resourceTable",
        condition: {
            appCode: "",
            resourceName: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Resource.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'resourceId', hide: true, title: '资源id'},
            {field: 'resourceName', align: "center", sort: true, title: '资源名称'},
            {field: 'resourceCode', align: "center", sort: true, title: '资源编码'},
            {field: 'modularName', align: "center", sort: true, title: '模块名称'},
            {
                field: 'viewFlag', align: "center", sort: true, title: '是否是视图', templet: function (data) {
                    if (data.viewFlag === 'Y') {
                        return '是';
                    } else {
                        return '否';
                    }
                }
            },
            {field: 'url', align: "center", sort: true, title: '请求url'},
            {field: 'httpMethod', align: "center", sort: true, title: 'http方法'},
            {
                field: 'requiredLoginFlag', align: "center", sort: true, title: '需要登录', templet: function (data) {
                    if (data.requiredLoginFlag === 'Y') {
                        return '是';
                    } else {
                        return '否';
                    }
                }
            },
            {
                field: 'requiredPermissionFlag', align: "center", sort: true, title: '需要权限验证', templet: function (data) {
                    if (data.requiredPermissionFlag === 'Y') {
                        return '是';
                    } else {
                        return '否';
                    }
                }
            },
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Resource.search = function () {
        var queryData = {};
        queryData['resourceName'] = $("#resourceName").val();
        queryData['url'] = $("#url").val();
        table.reload(Resource.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 资源详情对话框
     *
     * @param data 点击按钮时候的行数据
     */
    Resource.openDetailDlg = function (data) {
        func.open({
            title: '资源详情',
            content: Feng.ctxPath + '/view/resource/detail?resourceCode=' + data.resourceCode,
            tableId: Resource.tableId
        });
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Resource.tableId,
        url: Feng.ctxPath + '/resource/pageList',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        request: {pageName: 'pageNo', limitName: 'pageSize'},
        parseData: Feng.parseData,
        cols: Resource.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Resource.search();
    });

    // 工具条点击事件
    table.on('tool(' + Resource.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'detail') {
            Resource.openDetailDlg(data);
        }
    });

});
