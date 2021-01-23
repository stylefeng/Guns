layui.use(['form', 'admin', 'HttpRequest'], function () {
  var $ = layui.jquery;
  var HttpRequest = layui.HttpRequest;
  var form = layui.form;
  var admin = layui.admin;

  //表单提交事件
  form.on('submit(btnSubmit)', function (data) {
    var request = new HttpRequest(Feng.ctxPath + "/databaseInfo/add", 'post', function (data) {
      admin.closeThisDialog();
      Feng.success("添加成功！");
      admin.putTempData('formOk', true);
    }, function (data) {
      admin.closeThisDialog();
      Feng.error("添加失败！" + data.message)
    });
    request.set(data.field);
    request.start(true);

    return false;
  });

});
