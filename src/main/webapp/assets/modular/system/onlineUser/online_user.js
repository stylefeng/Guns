layui.use(['table', 'HttpRequest'], function () {
    var $ = layui.$;
    var table = layui.table;
    var HttpRequest = layui.HttpRequest;

    /**
     * 参数配置管理
     */
    var OnlineUser = {
        tableId: "onlineUserTable"
    };

    /**
     * 初始化表格的列
     */
    OnlineUser.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'userId', hide: true, title: '主键'},
            {field: 'token', hide: true, title: '用户token'},
            {field: 'account', sort: true, align: "center", title: '账号'},
            {field: 'nickName', sort: true, align: "center", title: '昵称'},
            {field: 'realName', sort: true, align: "center", title: '姓名'},
            {field: 'sex', sort: true, align: "center", title: '性别'},
            {field: 'roleName', sort: true, align: "center", title: '角色名称'},
            {field: 'loginTime', sort: true, align: "center", title: '登录时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    OnlineUser.search = function () {
        var queryData = {};
        queryData['account'] = $("#account").val();
        table.reload(OnlineUser.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 踢下线某个人
     *
     * @param data 点击按钮时候的行数据
     */
    OnlineUser.removeSession = function (data) {
        var httpRequest = new HttpRequest(Feng.ctxPath + '/sysUser/removeSession', 'post', function (data) {
            Feng.success("踢下线成功!");
            table.reload(OnlineUser.tableId);
        }, function (data) {
            Feng.error(data.message + "!");
        });
        httpRequest.set('token', data.token);
        httpRequest.start(true);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + OnlineUser.tableId,
        url: Feng.ctxPath + '/sysUser/onlineUserList',
        limit: Number.MAX_VALUE,
        page: false,
        height: "full-158",
        cellMinWidth: 100,
        cols: OnlineUser.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        OnlineUser.search();
    });

    // 工具条点击事件
    table.on('tool(' + OnlineUser.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'offline') {
            OnlineUser.removeSession(data);
        }
    });
});
