layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/dictType/detail?dictTypeId=" + Feng.getUrlParam("dictTypeId"), 'get');
    var result = request.start();
    form.val('dictForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
      var request = new HttpRequest(Feng.ctxPath + "/dict/add", 'post', function (data) {
        admin.closeThisDialog();
        Feng.success("添加成功！");
        admin.putTempData('formOk', true);
      }, function (data) {
        admin.closeThisDialog();
        Feng.error("添加失败！" + data.message);
      });
      request.set(data.field);
      request.start(true);
      return false;
    });
});
