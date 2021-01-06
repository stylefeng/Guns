/**
 * 详情对话框
 */
var SysConfigInfoDlg = {
    data: {}
};

layui.use(['form', 'admin','selectPlus', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var selectPlus = layui.selectPlus;
    var HttpRequest = layui.HttpRequest;

    // 获取详情信息，填充表单
    var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/detail?configId=" + Feng.getUrlParam("configId"),'get');
    var result = httpRequest.start();
    form.val('sysConfigForm', result.data);



    // 系统参数样式
    if(result.data){
        var mData = result.data;
        if(mData.sysFlag == 'Y'){
            $('input[name="sysFlag"]').attr('checked', 'checked');  //改变开关为 开
        }else{
            $('input[name="sysFlag"]').removeAttr('checked');  //改变开关为 关
        }
        /*改变是否系统参数样式*/
        $("input[name='sysFlag']").attr("disabled", "true"); form.render(); //系统参数禁用
        $("input[name='sysFlag']").next().removeClass("layui-form-onswitch"); // 系统参数去掉样式
    }

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
        $("#groupCode").val(result.data.groupCode);
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

        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/edit",'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败！" + data.message)
        });
        httpRequest.set(SysConfigInfoDlg.data);
        httpRequest.start(true);
    });

    // 常量所属分类动态赋值
    activeDictSelect();

});