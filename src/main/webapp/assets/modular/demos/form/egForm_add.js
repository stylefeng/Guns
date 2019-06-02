/**
 * 详情对话框
 */
var EgFormInfoDlg = {
    data: {
        title: "",
        singleTime: "",
        beginTime: "",
        endTime: "",
        multiSelect: "",
        pictureOne: "",
        number: "",
        singleSelectOne: "",
        singleSelectTwo: "",
        pictureTwo: "",
        longText: ""
    }
};

layui.use(['form', 'admin', 'ax', 'upload', 'laydate', 'selectPlus'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;
    var laydate = layui.laydate;
    var selectPlus = layui.selectPlus;

    //初始化时间选择器
    laydate.render({
        elem: '#singleTime'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#betweenTime'
        , range: true //或 range: '~' 来自定义分割字符
    });

    //初始化多选
    var test = selectPlus.render({
        el: '#multiSelect',
        data: [{
            "id": 1,
            "name": "spring"
        }, {
            "id": 2,
            "name": "shiro"
        }, {
            "id": 3,
            "name": "mybatis-puls"
        }, {
            "id": 4,
            "name": "beetl"
        }],
        valueName: "name",
        values: ['abc'],
        valueSeparator: " --- "
    });
    selectPlus.on('selectPlus(multiSelect)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.values); //选中的数据
        console.log(obj.checkedData); //选中的相关数据
        console.log(obj.isAll); //是否是全选
        console.log(obj.ele); //点击的DOM
        $("#multiSelectHidden").val(obj.values);
    });

    //上传文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/system/upload'
        , accept: 'file'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#fileNameTip").html(file.name);
            });
        }
        , done: function (res) {
            $("#fileInputHidden").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传图片失败！");
        }
    });

    //普通图片上传
    upload.render({
        elem: '#picBtn'
        , url: Feng.ctxPath + '/system/upload'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $('#img1').attr('src', result);
            });
        }
        , done: function (res) {
            $("#pictureInputHidden").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传图片失败！");
        }
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/egForm/addItem", function (data) {
            Feng.success("添加成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + "/egForm";
    });

});