/**
 * 详情对话框
 */
var SysConfigInfoDlg = {
    data: {
        name: "",
        dictFlag: "",
        code: "",
        value: "",
        remark: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/sysConfig/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('sysConfigForm', result.data);

    //初始化字典选择框
    var activeDictSelect = function () {
        $("#dictCodeDiv").show();
        $("#customCodeDiv").hide();
        status = "dict";

        //初始化所有字典类型
        $("#dictTypeId").html('<option value="">请选择系统字典类型</option>');
        var ajax = new $ax(Feng.ctxPath + "/dictType/listTypes", function (data) {

            for (var i = 0; i < data.data.length; i++) {
                var dictTypeId = data.data[i].dictTypeId;
                var name = data.data[i].name;
                var code = data.data[i].code;
                $("#dictTypeId").append('<option value="' + dictTypeId + '">' + code + '--' + name + '</option>');
            }
            form.render();

        }, function (data) {
        });
        ajax.start();
    };

    //初始化非字典选择
    var activeCustomSelect = function () {
        $("#dictCodeDiv").hide();
        $("#customCodeDiv").show();
        status = "custom";
    };

    //更新字典详情列表
    var updateDictDetail = function (dictTypeId, activeCode) {
        $("#dictDetails").html('');
        var ajax = new $ax(Feng.ctxPath + "/dict/listDicts", function (data) {

            for (var i = 0; i < data.data.length; i++) {
                var name = data.data[i].name;
                var code = data.data[i].code;

                if (activeCode === code) {
                    $("#dictDetails").append('<input type="radio" name="dictValue" value="' + code + '" title="' + name + '" checked="checked">');
                } else {
                    $("#dictDetails").append('<input type="radio" name="dictValue" value="' + code + '" title="' + name + '">');
                }

            }
            form.render();

        }, function (data) {
        });
        ajax.set("dictTypeId", dictTypeId);
        ajax.start();
    };

    //监听单选切换
    form.on('radio(dictChecked)', function (data) {
        if (data.value === "Y") {
            activeDictSelect();
        } else {
            activeCustomSelect();
        }
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {

        //如果是选择字典
        if (status === "dict") {

            var radio = $('input:radio[name="dictValue"]:checked').val();

            if (!$("#dictTypeId").val() || !radio) {
                Feng.error("请选择具体字典！");
                return false;
            }
        } else {
            if (!$("#value").val()) {
                Feng.error("请填写参数值！");
                return false;
            }
        }

        var ajax = new $ax(Feng.ctxPath + "/sysConfig/editItem", function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/sysConfig'
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    //监听字典选择
    form.on('select(dictTypeId)', function (data) {

        var dictTypeId = data.value;

        //初始化字典详细列表
        updateDictDetail(dictTypeId);

    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + '/sysConfig'
    });

    //如果当前配置是带字典类型，则初始化字典类型选择
    if (result.data.dictFlag === 'Y') {
        activeDictSelect();

        //更新选项
        $("#dictTypeId").val(result.data.dictTypeId);
        form.render();

        //更新字典类型的详情
        updateDictDetail(result.data.dictTypeId, result.data.value);
    } else {
        activeCustomSelect();
    }

    //如果是系统类型，则不能改变取值范围和字典类型
    if(result.data.code.indexOf('GUNS_') === 0){
        $("[name='dictFlag']").attr("disabled","disabled");
        $("#dictTypeId").attr("disabled","disabled");
        form.render();
    }

});