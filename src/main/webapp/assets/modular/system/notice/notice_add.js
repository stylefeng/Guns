var NoticeDlg = {};
layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;


    lay('input.date-input').each(function () {
        laydate.render({
            elem: this
            , trigger: 'click'
            , type: 'datetime'
        });
    });
    // 控制用户选择显示隐藏
    NoticeDlg.userSelectDiv = function(value){
        if (value === "select") {
            userSelect.update({
                layVerify: 'required',
            })
            $("#userSelectDiv").show();
        } else {
            $("#userSelectDiv").hide();
            userSelect.setValue([]);
            userSelect.update({
                layVerify: '',
            })
        }
    }
    // 渲染富文本编辑器
    tinymce.init({
        selector: '#noticeContent',
        height: 525,
        branding: false,
        language: 'zh_CN',
        plugins: 'code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount',
        toolbar: 'fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | formatselect fontselect fontsizeselect | link image media emoticons charmap anchor pagebreak codesample | ltr rtl',
        toolbar_drawer: 'sliding',
        images_upload_url: Feng.ctxPath + '/sysFileInfo/tinymceUpload',
        images_upload_base_path: Feng.ctxPath,
        file_picker_types: 'file image media',
        // file_picker_callback: function (callback, value, meta) {
        //     layer.msg('演示环境不允许上传', {anim: 6});
        // },
        init_instance_callback: function (editor) {
            console.log(editor);
        }
    });

    $("#test").click(function () {
        var select = userSelect.getValue('valueStr');
        alert(select)
        console.log(select)
        return;
    })

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
        if (data.field.noticeScope !== "all") {
            data.field.noticeScope = userSelect.getValue('valueStr');
        }
        request.set(data.field);
        request.start(true);
        //添加 return false 可成功跳转页面
        return false;
    });

    // 通知范围切换
    form.on('select(noticeScopeFilter)', function (data) {
        NoticeDlg.userSelectDiv(data.value);
    });



    // 初始化用户选择
    var userSelect = xmSelect.render({
        el: '#userSelect',
        autoRow: true,
        filterable: true,
        filterMethod: function (val, item, index, prop) {

            if (item.name.indexOf(val) !== -1) {//名称中包含的搜索出来
                return true;
            }
            // 添加拼音检索
            try {
                if (Pinyin.GetJP(item.name).indexOf(val) !== -1 || Pinyin.GetQP(item.name).indexOf(val) !== -1) {
                    return true
                }
            } catch (e) {
                console.log(e.message);
            }
            return false;//不知道的就不管了
        },
        tree: {
            show: true,
            showFolderIcon: true,
            showLine: true,
            indent: 20,
            expandedKeys: true,
        },
        toolbar: {
            show: true,
            list: ['ALL', 'REVERSE', 'CLEAR']
        },
        height: 'auto',
        data: function () {
            return []
        }
    })

    // 查询后台接口加载用户数据
    var userSelectRequest = new HttpRequest(Feng.ctxPath + "/sysUser/getUserSelectTree", 'get', function (res) {
        console.log(res)
        userSelect.update({
            data: res.data
        })
        userSelect.changeExpandedKeys(true)
    }, function (data) {
        Feng.error("获取用户数据失败!" + data.message);
    });
    userSelectRequest.start(false);

});