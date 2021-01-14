layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var laydate = layui.laydate;


    lay('input.date-input').each(function(){
        laydate.render({
            elem: this
            ,trigger: 'click'
            , type: 'datetime'
        });
    });

    // 渲染富文本编辑器
    tinymce.init({
        selector: '#noticeContent',
        height: 525,
        branding: false,
        language: 'zh_CN',
        plugins: 'code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount',
        toolbar: 'fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | formatselect fontselect fontsizeselect | link image media emoticons charmap anchor pagebreak codesample | ltr rtl',
        toolbar_drawer: 'sliding',
        images_upload_url: '../../../json/tinymce-upload-ok.json',
        file_picker_types: 'media',
        file_picker_callback: function (callback, value, meta) {
            layer.msg('演示环境不允许上传', {anim: 6});
        },
        init_instance_callback: function (editor) {
            console.log(editor);
        }
    });

/*
    //实例化编辑器
    var ue = UE.getEditor('container', {
        enableAutoSave: false,
        autoHeightEnabled: true,
        autoFloatEnabled: false,
        scaleEnabled: true,         //滚动条
        initialFrameHeight: 400     //默认的编辑区域高度
    });

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function (action) {
        if (action === 'uploadimage' || action === 'uploadscrawl' || action === 'uploadimage') {
            return Feng.ctxPath + '/ueditor/imgUpdate';
        } else if (action === 'uploadfile') {
            return Feng.ctxPath + '/ueditor/uploadfile';
        } else if (action === 'uploadvideo') {
            return Feng.ctxPath + '/ueditor/uploadvideo';
        } else {
            return this._bkGetActionUrl.call(this, action);
        }
    };*/

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysNotice/add", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("添加失败！" + data.message);
        });
        data.field.noticeContent = tinymce.get('noticeContent').getContent();
        request.set(data.field);
        request.start(true);
        //添加 return false 可成功跳转页面
        return false;
    });

});