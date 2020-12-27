/** EasyWeb iframe v3.1.8 date:2020-05-04 License By http://easyweb.vip */

// 用common.js必须加上Feng.addCtx("${ctxPath}");
Feng.info = function (info) {
    top.layer.msg(info, {icon: 6});
};
Feng.success = function (info) {
    top.layer.msg(info, {icon: 1});
};
Feng.error = function (info) {
    top.layer.msg(info, {icon: 2});
};
Feng.confirm = function (tip, ensure) {
    top.layer.confirm(tip, {
        skin: 'layui-layer-admin'
    }, function () {
        ensure();
    });
};
Feng.currentDate = function () {
    // 获取当前日期
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    return date.getFullYear() + seperator + nowMonth + seperator + strDate;
};
Feng.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
};
Feng.infoDetail = function (title, info) {
    var display = "";
    if (typeof info === "string") {
        display = info;
    } else {
        if (info instanceof Array) {
            for (var x in info) {
                display = display + info[x] + "<br/>";
            }
        } else {
            display = info;
        }
    }
    top.layer.open({
        title: title,
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['950px', '600px'], //宽高
        content: '<div style="padding: 20px;">' + display + '</div>'
    });
};
Feng.zTreeCheckedNodes = function (zTreeId) {
    var zTree = $.fn.zTree.getZTreeObj(zTreeId);
    var nodes = zTree.getCheckedNodes();
    var ids = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        ids += "," + nodes[i].id;
    }
    return ids.substring(1);
};
Feng.closeAllLoading = function () {
    layer.closeAll('loading');
};
Feng.getClientHeight = function () {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
};
Feng.getClientHeightPx = function () {
    return Feng.getClientHeight() + 'px';
};

// 以下代码是配置layui扩展模块的目录，每个页面都需要引入
layui.config({
    version: Feng.version,
    base: Feng.ctxPath + '/assets/common/module/'
}).extend({
    steps: 'steps/steps',
    notice: 'notice/notice',
    cascader: 'cascader/cascader',
    dropdown: 'dropdown/dropdown',
    fileChoose: 'fileChoose/fileChoose',
    Split: 'Split/Split',
    Cropper: 'Cropper/Cropper',
    tagsInput: 'tagsInput/tagsInput',
    citypicker: 'city-picker/city-picker',
    introJs: 'introJs/introJs',
    zTree: 'zTree/zTree',

    //一下是Guns用的插件
    formSelects: '../../expand/module/formSelects/formSelects-v4',
    selectPlus: '../../expand/module/selectPlus/selectPlus',
    iconPicker: '../../expand/module/iconPicker/iconPicker',
    ztree: '../../expand/module/ztree/ztree-object',
    ax: '../../expand/module/ax/ax',
    func: '../../expand/module/func/func'
}).use(['layer', 'admin'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var admin = layui.admin;

    // 移除loading动画
    setTimeout(function () {
        admin.removeLoading();
    }, window === top ? 300 : 0);

    //注册session超时的操作
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        complete: function (XMLHttpRequest, textStatus) {

            //如果超时就处理 ，指定要跳转的页面
            if (XMLHttpRequest.getResponseHeader("Guns-Session-Timeout") === "true") {
                window.location = Feng.ctxPath + "/global/sessionError";
            }

        }
    });

});