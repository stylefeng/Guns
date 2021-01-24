layui.use(['layer', 'form', 'table', 'util', 'admin', 'tree', 'dropdown', 'xmSelect', 'treeTable', 'func', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var table = layui.table;
    var tree = layui.tree;
    var HttpRequest = layui.HttpRequest;
    var selObj;


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
    new HttpRequest(Feng.ctxPath + '/resource/getTree', 'get', function (data) {
        tree.render({
            elem: '#organizationTree',
            onlyIconControl: true,
            data: data.data,
            click: function (obj) {
                selObj = obj;
                $('#organizationTree').find('.ew-tree-click').removeClass('ew-tree-click');
                $(obj.elem).children('.layui-tree-entry').addClass('ew-tree-click');
                ApiManager.onClickApi(selObj)
            }
        });
        $('#organizationTree').find('.layui-tree-entry:first>.layui-tree-main>.layui-tree-txt').trigger('click');
    }).start();
});