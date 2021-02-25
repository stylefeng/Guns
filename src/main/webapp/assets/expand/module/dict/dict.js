/**
 * 基于xmSelect封装字典通用下拉选项
 * v1.0
 * @author 陈金龙
 * @date 2021/1/25 10:59
 */

layui.define(['jquery', 'HttpRequest', 'xmSelect'], function (exports) {
    "use strict";
    var dict = function () {
            this.v = '1.0';
        },
        $ = layui.$,
        HttpRequest = layui.HttpRequest,
        xmSelect = layui.xmSelect;

    dict.prototype.render = function (options) {
        var opts = options,
            url = opts.url || Feng.ctxPath + '/dict/list',
            method = opts.method || 'get',
            code = opts.code,
            elem = opts.elem;
        var xm = xmSelect.render({
            el: elem,
            radio: true, //单选
            toolbar: {show: true}, //开启工具栏
            data: []
        })
        new HttpRequest(url, method, function (obj) {
            //转换成xmSelect格式数据
            for (var i = 0; i < obj.data.length; i++) {
                obj.data[i].name = obj.data[i].dictName;
                obj.data[i].value = obj.data[i].dictCode;
            }
            xm.update({
                data: obj.data,
                autoRow: true,
            });
        }, function (data) {
        }).set("dictTypeCode", code).start();
        return new dict();
    };
    exports('dict', new dict());
});