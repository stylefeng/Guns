layui.use(['layer', 'form', 'table', 'HttpRequest', 'func', 'tree'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;
    var tree = layui.tree;

    /**
     * Api管理的参数
     */
    var ApiManager = {
        condition: {
            resourceCode: "",
            resourceName: ""
        }
    };

    // 选择api树上的接口时
    ApiManager.onClickApi = function (obj) {
        ApiManager.condition.resourceCode = obj.data.id;

        // 如果是具体接口，则查看接口详情
        if (obj.data.resourceFlag === true) {
            ApiManager.search();
        }
    };

    // 点击查询按钮
    ApiManager.search = function () {
        var detailRequest = new HttpRequest(Feng.ctxPath + "/resource/getDetail", 'get', function (data) {
            form.val('apiDetailForm', data.data);
        }, function (data) {
            Feng.error("查询失败!" + data.message);
        });
        detailRequest.set("resourceCode", ApiManager.condition.resourceCode);
        var detailResult = detailRequest.start(false);

        // 参数的表头
        var columns = [[
            {field: 'chineseName', title: '中文名称', width: 150},
            {field: 'fieldClassType', title: '字段类型', width: 150},
            {field: 'fieldName', title: '字段名称', width: 200},
            {field: 'validationMessages', title: '可能出现的参数校验错误提示'}
        ]];

        // 渲染请求参数列表
        table.render({
            elem: '#requestParamsTable',
            cols: columns,
            page: false,
            limit: Number.MAX_VALUE,
            data: detailResult.data.paramFieldDescriptions,
            even: true
        });

        // 渲染请求参数列表
        table.render({
            elem: '#responseParamsTable',
            cols: columns,
            page: false,
            limit: Number.MAX_VALUE,
            data: detailResult.data.responseFieldDescriptions,
            even: true
        });

    };

    // 初始化api树
    var request = new HttpRequest(Feng.ctxPath + '/resource/getTree', 'get', function (data) {
        tree.render({
            elem: '#apiTree',
            data: data.data,
            click: ApiManager.onClickApi,
            onlyIconControl: true
        });
    });
    request.start();

});

$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 330});
});
