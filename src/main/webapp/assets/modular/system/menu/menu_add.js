/**
 * 详情对话框
 */
var MenuInfoDlg = {
    data: {
        menuParentId: "",
        menuParentName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'iconPicker'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var iconPicker = layui.iconPicker;

    // 点击父级菜单
    $('#menuParentName').click(function () {
        var formName = encodeURIComponent("parent.MenuInfoDlg.data.menuParentName");
        var formId = encodeURIComponent("parent.MenuInfoDlg.data.menuParentId");
        var treeUrl = encodeURIComponent("/sysMenu/layuiSelectParentMenuTreeList");

        layer.open({
            type: 2,
            title: '父级菜单',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/view/common/tree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#menuParentId").val(MenuInfoDlg.data.menuParentId);
                $("#menuParentName").val(MenuInfoDlg.data.menuParentName);
            }
        });
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysMenu/add", 'post', function (data) {
            Feng.success("添加成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        request.set(data.field);
        request.start(true);

        //添加 return false 可成功跳转页面
        return false;
    });

    //初始化图标选择
    iconPicker.render({
        elem: '#layuiIcon',
        type: 'fontClass',
        search: true,
        page: true,
        limit: 12,
        click: function (data) {
        }
    });

    iconPicker.checkIcon('iconPicker', 'layui-icon-star-fill');

    //初始化字典详细列表
    $("#dictDetails").html('');
    var request = new HttpRequest(Feng.ctxPath + "/sysApp/list", 'get', function (data) {
        for (var i = 0; i < data.data.length; i++) {
            var name = data.data[i].appName;
            var code = data.data[i].appCode;
            $("#dictDetails").append('<input type="radio" name="appCode" value="' + code + '" title="' + name + '">');
        }
        form.render();
    }, function (data) {
    });
    request.start();

});
