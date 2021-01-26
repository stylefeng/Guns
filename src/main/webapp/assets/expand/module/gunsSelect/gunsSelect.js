/**
 * 封装通用选择组件
 *
 * v1.0
 * 目前仅支持下拉框
 *
 * @author 陈金龙
 * @date 2021/1/25 10:59
 */
layui.define(['jquery', 'HttpRequest', 'xmSelect', 'form'], function (exports) {
    "use strict";
    var gunsSelect = function () {
            this.v = '1.0';
        },
        $ = layui.$,
        HttpRequest = layui.HttpRequest,
        form = layui.form;

    gunsSelect.prototype.render = function (options) {

        var opts = options,
            url = opts.url,
            method = opts.method || 'get',
            where = opts.where,
            fields = opts.fields || {name: 'name', value: 'value'},
            elem = opts.elem;
        //渲染 <input type="checkbox" name="like[write]" title="写作">
        //渲染 <input type="radio" name="sex" value="男" title="男">

        var a = {
            init: function () {
                console.log(JSON.stringify(where));
                new HttpRequest(url, method, function (obj) {
                    for (var i = 0; i < obj.data.length; i++) {
                        $(elem).append('<option value="' + common.get(obj.data[i], fields.value) + '">' + common.get(obj.data[i], fields.name) + '</option>');
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
        return new gunsSelect();


    };
    exports('gunsSelect', new gunsSelect());
});