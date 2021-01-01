/**
 * http请求对ajax封装，减少一些重复业务逻辑的编写
 * @author fengshuonan
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.$;

    /**
     * 创建一个ajax的请求类
     *
     * @param url              请求后端的url
     * @param method           http请求方法，写get或者post
     * @param successCallback  请求成功的回调函数
     * @param errorCallback    请求失败的回调函数，后端返回http状态码500
     *
     * 使用方法：
     *
     * var request = new HttpRequest('/user/list', 'get', function(data){
     *  // ...
     * }, function(){
     *  // ...
     * });
     * request.start();
     */
    var HttpRequest = function (url, method, successCallback, errorCallback) {

        // 请求的url，一般传参时候需要带上contextPath
        this.url = url;

        // http请求的方法，默认不传为post，一般传 'get' 或 'post'
        if (method === "" || method == null) {
            this.method = "post";
        } else {
            this.method = method;
        }

        // 请求成功的回调
        this.successCallback = successCallback;

        // 请求失败的回调
        this.errorCallback = errorCallback;

        // 请求的数据
        this.dataObject = {};

        // 请求的content-type，默认 "application/json"
        this.contentType = "application/json";

        // 预期服务器返回的数据类型，默认都为 json
        this.dataType = "json";

        // 默认请求都是同步，不开启异步
        this.async = false;
    };

    HttpRequest.prototype = {

        /**
         * 执行http请求
         *
         * @param parseJsonFlag 是否在请求时，参数转化为json，如果传 true 就是
         */
        start: function (parseJsonFlag) {
            var me = this;
            var result = "";

            // 如果请求需要转化为json则将data转为json
            if (parseJsonFlag === true) {
                me.dataObject = JSON.stringify(me.dataObject);
            }

            // 防止http请求缓存
            if (this.url.indexOf("?") === -1) {
                this.url = this.url + "?jstime=" + new Date().getTime();
            } else {
                this.url = this.url + "&jstime=" + new Date().getTime();
            }

            // 初始化ajax
            $.ajax({
                type: me.method,
                url: me.url,
                contentType: me.contentType,
                dataType: me.dataType,
                async: me.async,
                data: me.dataObject,
                beforeSend: function (data) {
                },
                success: function (data) {
                    result = data;
                    if (me.successCallback !== undefined) {
                        me.successCallback(data);
                    }
                },
                error: function (xhr) {
                    if (me.errorCallback !== undefined) {
                        me.errorCallback(xhr.responseJSON);
                    }
                }
            });

            return result;
        },

        /**
         * 设置 key-value 形式的参数
         *
         * 此参数组装的是param方式传参的参数，如需传递json请用 setJsonData(data)
         *
         * 如果只传了一个key，则key可以是object类型，会将object所有属性都set上
         *
         * @param key    参数的key
         * @param value  参数值
         */
        set: function (key, value) {
            if (typeof key === "object") {
                // 遍历object的属性
                for (var item in key) {
                    if (typeof item != "function") {
                        this.dataObject[item] = key[item];
                    }
                }
            } else {
                this.dataObject[key] = (typeof value === "undefined") ? $("#" + key).val() : value;
            }
            return this;
        },

        /**
         * 清空传递参数
         */
        clear: function () {
            this.dataObject = {};
            return this;
        },

        /**
         * 设置请求的content-type
         */
        setContentType: function (contentType) {
            this.contentType = contentType;
            return this;
        },

        /**
         * 设置预期服务器返回的数据类型，默认都为 json
         */
        setDataType: function (dataType) {
            this.dataType = dataType;
            return this;
        },

        /**
         * 设置请求同步还是异步，true-异步，false-同步
         */
        setAsync: function (async) {
            this.async = async;
            return this;
        }

    };

    exports('HttpRequest', HttpRequest);
});