layui.define(['jquery'], function (exports) {
    var $ = layui.$;

    var $ax = function (url, success, error) {
        this.url = url;
        this.type = "post";
        this.data = {};
        this.dataType = "json";
        this.async = false;
        this.success = success;
        this.error = error;
    };

    $ax.prototype = {
        start: function () {
            var me = this;
            var result = "";

            if (this.url.indexOf("?") === -1) {
                this.url = this.url + "?jstime=" + new Date().getTime();
            } else {
                this.url = this.url + "&jstime=" + new Date().getTime();
            }

            $.ajax({
                type: me.type,
                url: me.url,
                dataType: me.dataType,
                async: me.async,
                data: me.data,
                beforeSend: function (data) {

                },
                success: function (data) {
                    result = data;
                    if (me.success !== undefined) {
                        me.success(data);
                    }
                },
                error: function (data) {
                    if (me.error !== undefined) {
                        me.error(data);
                    }
                }
            });

            return result;
        },

        set: function (key, value) {
            if (typeof key === "object") {
                for (var i in key) {
                    if (typeof i === "function")
                        continue;
                    this.data[i] = key[i];
                }
            } else {
                this.data[key] = (typeof value === "undefined") ? $("#" + key).val() : value;
            }
            return this;
        },

        setData: function (data) {
            this.data = data;
            return this;
        },

        clear: function () {
            this.data = {};
            return this;
        }
    };

    exports('ax', $ax);
});