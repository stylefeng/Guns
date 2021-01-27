layui.use(['table', 'admin', 'HttpRequest', 'func'], function () {
  var $ = layui.$;
  var table = layui.table;
  var HttpRequest = layui.HttpRequest;
  var admin = layui.admin;
  var func = layui.func;

  /**
   * 数据库信息表管理
   */
  var DatabaseInfo = {
    tableId: "databaseInfoTable"
  };

  /**
   * 初始化表格的列
   */
  DatabaseInfo.initColumn = function () {
    return [[
      {type: 'checkbox'},
      {field: 'dbId', hide: true, title: '主键id'},
      {field: 'dbName', align: "center", sort: true, title: '数据库名称'},
      {field: 'jdbcDriver', align: "center", sort: true, title: '驱动类型', minWidth: 182},
      {field: 'username', align: "center", sort: true, title: '账号'},
      {field: 'password', align: "center", sort: true, title: '密码'},
      {field: 'jdbcUrl', align: "center", sort: true, title: 'jdbc的url'},
      {field: 'remarks', align: "center", sort: true, title: '备注'},
      {field: 'createTime', align: "center", sort: true, title: '创建时间', minWidth: 160},
      {align: 'center', toolbar: '#tableBar', title: '操作'}
    ]];
  };

  /**
   * 点击查询按钮
   */
  DatabaseInfo.search = function () {
    var queryData = {};
    queryData['dbName'] = $("#dbName").val();
    table.reload(DatabaseInfo.tableId, {
      where: queryData, page: {curr: 1}
    });
  };

  /**
   * 弹出添加对话框
   */
  DatabaseInfo.openAddDlg = function () {
    func.open({
      title: '添加数据源',
      content: Feng.ctxPath + '/view/datasource/add',
      tableId: DatabaseInfo.tableId
    });
  };

  /**
   * 点击删除
   *
   * @param data 点击按钮时候的行数据
   */
  DatabaseInfo.onDeleteItem = function (data) {
    var operation = function () {
      var request = new HttpRequest(Feng.ctxPath + "/databaseInfo/delete", 'post', function (data) {
        Feng.success("删除成功!");
        table.reload(DatabaseInfo.tableId);
      }, function (data) {
        Feng.error("删除失败!" + data.message + "!");
      });
      request.set("dbId", data.dbId);
      request.start(true);
    };
    Feng.confirm("是否删除?", operation);
  };

  // 渲染表格
  var tableResult = table.render({
    elem: '#' + DatabaseInfo.tableId,
    url: Feng.ctxPath + '/databaseInfo/page',
    page: true,
    height: "full-158",
    cellMinWidth: 100,
    parseData: Feng.parseData,
    cols: DatabaseInfo.initColumn()
  });

  // 搜索按钮点击事件
  $('#btnSearch').click(function () {
    DatabaseInfo.search();
  });

  // 添加按钮点击事件
  $('#btnAdd').click(function () {
    DatabaseInfo.openAddDlg();
  });

  // 工具条点击事件
  table.on('tool(' + DatabaseInfo.tableId + ')', function (obj) {
    var data = obj.data;
    var layEvent = obj.event;

    if (layEvent === 'delete') {
      DatabaseInfo.onDeleteItem(data);
    }
  });
});
