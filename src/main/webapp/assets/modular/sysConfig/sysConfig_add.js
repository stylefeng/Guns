/**
 * 修改
 */
var SysConfigInfoDlg = {
    data: {}
};

layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    // 初始化所属分类字典下拉
    var activeDictSelect = function () {

        $("#groupCode").html('<option value="">请选择所属分类</option>');
        // var httpRequest = new HttpRequest(Feng.ctxPath + "/dictType/dropDown", function (data) {
        //     var dictTypeList = res.data;
        //     dictTypeList.forEach(function (v, i) {
        //         $("#groupCode").append('<option value="' + v.dictCode+ '">' + v.dictName + '</option>');
        //     })
        //     form.render();
        //
        // }, function (data) {
        // });
        // httpRequest.start();

        //要删掉
        $("#groupCode").append('<option value="sys_config">' + '默认常量' + '</option>');
        form.render();
    };

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {

        SysConfigInfoDlg.data = $.extend({"sysFlag":data.field.sysFlag?data.field.sysFlag:'N'},data.field)

        var groupCode = $("#groupCode").find("option:selected").val()
        if(!groupCode){
            Feng.error("所属分类不能为空")
            return false;
        }
        SysConfigInfoDlg.data = $.extend({"groupCode":groupCode},data.field)

        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/add",'post', function (data) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("添加失败！" + data.message)
        });
        httpRequest.set(SysConfigInfoDlg.data);
        httpRequest.start(true);
    });

    // 常量所属分类动态赋值
    activeDictSelect();

});