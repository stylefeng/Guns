/**
 * 封装通用单选组件
 *
 * v1.0
 * 支持单选框
 *
 * @author 尤文博
 * @date 2021/9/18 10:02
 */
layui.define(['jquery', 'HttpRequest', 'xmSelect', 'form'], function (exports) {
    "use strict";
    var gunsRadio = function () {
            this.v = '1.0';
        },
        $ = layui.$,
        HttpRequest = layui.HttpRequest,
        form = layui.form;

    gunsRadio.prototype.render = function (options) {

        var opts = options,
            url = opts.url,
            method = opts.method || 'get',
            where = opts.where,
            fields = opts.fields || {name: 'name', value: 'value'},
            elem = opts.elem,
            type = opts.type;
        //渲染 <input type="checkbox" name="like[write]" title="写作">
        //渲染 <input type="radio" name="sex" value="男" title="男">

        var a = {
            init: function () {
                new HttpRequest(url, method, function (obj) {
                    for (var i = 0; i < obj.data.length; i++) {
                        $(elem).append('<input type="radio"' + ' name="' + type + '"' + ' value="' + common.get(obj.data[i], fields.value) + '"' + ' title="' + common.get(obj.data[i], fields.name) + '">');
                    }
                    form.render();
                }, function (data) {
                }).set(where).start();
            }
        }

        var common = {
            get: function (obj, key) {
                return obj[key];
            }
        };

        a.init();
        return new gunsRadio();


    };
    exports('gunsRadio', new gunsRadio());
});