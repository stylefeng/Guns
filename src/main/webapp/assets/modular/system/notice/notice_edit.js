var NoticeDlg = {}
layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var laydate = layui.laydate;


    NoticeDlg.initTinymce = function(data){
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
                tinymce.get('noticeContent').setContent(data.noticeContent);
            }
        });
    }
    lay('input.date-input').each(function(){
        laydate.render({
            elem: this
            ,trigger: 'click'
            , type: 'datetime'
        });
    });

    //获取详情信息，填充表单
    var request = new HttpRequest(Feng.ctxPath + "/sysNotice/detail?noticeId=" + Feng.getUrlParam("noticeId"), 'get', function (result) {
        form.val('noticeForm', result.data);
        NoticeDlg.initTinymce(result.data)
    }, function (data) {
        Feng.error("加载失败！" + data.message);
    });
    request.start();

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysNotice/edit", 'post', function (data) {
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