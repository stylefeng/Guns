/**
 * 多语言相关方法的封装
 *
 * @author fengshuonan
 * @date 2021/1/29 21:49
 */
layui.define(['HttpRequest'], function (exports) {
    var HttpRequest = layui.HttpRequest;

    var i18n = {

        /**
         * 获取多语言的种类
         */
        getLanguageTypes: function () {
            var results = null;
            var languageRequest = new HttpRequest(Feng.ctxPath + "/i18n/getAllLanguages", 'get', function (data) {
                results = data.data;
            }, function (data) {
                layer.msg("获取语言列表失败！" + data.message, {icon: 5, anim: 6});
            });
            languageRequest.start();
            return results;
        },

        /**
         * 改变当前用户显示的语言种类
         *
         * @param code 多语言种类的编码
         */
        changeUserTranslation: function (code) {
            var changeLanguageRequest = new HttpRequest(Feng.ctxPath + "/i18n/changeUserTranslation", 'post', function (data) {
                window.location.href = Feng.ctxPath + "/";
            }, function (data) {
                layer.msg("切换多语言失败！" + data.message, {icon: 5, anim: 6});
            });
            changeLanguageRequest.set("tranLanguageCode", code);
            changeLanguageRequest.start(true);
        },

        /**
         * 加载当前语言字典，并加入到缓存
         */
        loadAndCacheTranslation: function () {
            var request = new HttpRequest(Feng.ctxPath + "/i18n/getUserTranslation", 'get', function (data) {
                layui.data('system', {
                    key: "translationBook",
                    value: data.data
                });
            }, function (data) {
                layer.msg("加载语言字典失败！" + data.message, {icon: 5, anim: 6});
            });
            request.start();
        },

        /**
         * 通过翻译项编码，翻译某个值
         */
        translate: function (tranCode, defaultValue) {
            var translationBook = layui.data('system').translationBook;
            if (typeof translationBook === 'undefined' || translationBook == null || translationBook === '') {
                return defaultValue;
            } else {
                if (typeof translationBook[tranCode] === 'undefined' || translationBook[tranCode] == null || translationBook[tranCode] === '') {
                    return defaultValue;
                } else {
                    return translationBook[tranCode];
                }
            }
        }

    };

    exports('i18n', i18n);
});
