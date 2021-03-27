/**
 * 发送加密请求
 * @author luojie
 */

// 定义公钥
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwiRWfPs7Qds9K+gbabar
xKOn71vZY9S7C5cmiTTmDoxvL8gixtlldbqaBCG0fhP48qxImw4jmAnXbSb51hDo
hTRXmGIuBEQuhIWwh28rorSiGuOye6PTbYNuup5CWwxMkD/ARHrs5Cvg9+vJTHXd
g3TrRbwiW6GniDvVGPcl0d9TshX5Dgo6m9VZkLJfHJkVKmjAOOvede8uPgaM1ymt
6JexjTcn6uiIrWlDkKTzvAq+Hb9cj9tz/Q5FKo17TF7oa4XC8lfximCzAvMwsl/k
mqfh0cSNqeoW9s8LcjY0o7YexYJB3+jjp88QbzqXnUNYMVGz0M2cYLmAaM2LVwWv
Vrfs1HCB1o+WqGqjaBql/4apVyhqf77Py6M+2WUr1yKgDfRXjZ1h9w9e3jh3oQdj
Sk36fboJmHXBnKwwoecxW5csVJmj/M7CPP7Xw8BPGV4/rMmRKjBRTv5XdcRnnMm8
nd8EdK/2AaXZqu0O2iRjQlFFgLNUzP+eudvLCA0+Dxczkpgvcr7S4oQtD+TCFm1g
WaC+Kho5liMQ7OV0L7tL8O+tzzbKmoVj/fg8uIG5ljqsU6rE5WFUCl1w0v8Gzx1Y
z3IXaRKmXTgmxZPdaN3nVA+YBT+N3EKQETVlN6w+65/HK/8ZsB36exrlkkxUo+y0
umk0DzFFY/9i1x2kU7wXPzECAwEAAQ==
-----END PUBLIC KEY-----
`


// 格式化数字
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

// 生成uuid
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("")
}

// 生成指定长度的字符串
function generateRamStr(len = 6, charSet) {
    const chars = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-*/~`";
    let randomStr = "";
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomStr;
}

// 返回年月日 例如 20210101
function getDate() {
    let date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('')
}

// 返回年月日时分秒  例如 20210101121212
function getDateTime() {
    let date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day, hour, minute, second].map(formatNumber).join('')
}

layui.define(['jquery'], function (exports) {
    var $ = layui.$;

    $(function () {
        // 加载 CryptoJS
        let cryptojsArray = [
            'aes.js'
            , 'md5.js'
            , 'rsa.js'
            , 'sm4.js'];
        for (let i = 0; i < cryptojsArray.length; i++) {
            let scriptFile = document.createElement('script');
            scriptFile.setAttribute("type", "text/javascript");
            scriptFile.setAttribute("src", Feng.ctxPath + '/assets/expand/plugins/cryptojs/' + cryptojsArray[i]);
            document.getElementsByTagName("head")[0].appendChild(scriptFile);
        }
    })

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
     * var request = new HttpEncryptionRequest('/user/list', 'get', function(data){
     *  // ...
     * }, function(){
     *  // ...
     * });
     * request.start();
     */
    var HttpEncryptionRequest = function (url, successCallback, errorCallback) {

        // 请求的url，一般传参时候需要带上contextPath
        this.url = url;

        // http请求的方法
        this.method = "post";

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

    HttpEncryptionRequest.prototype = {

        /**
         * 执行http请求
         */
        start: function () {
            var me = this;
            var result = {};

            // 将data转为json字符串
            me.dataObject = JSON.stringify(me.dataObject);

            // 防止http请求缓存
            if (this.url.indexOf("?") === -1) {
                this.url = this.url + "?jstime=" + new Date().getTime();
            } else {
                this.url = this.url + "&jstime=" + new Date().getTime();
            }

            var CryptoJS = window.CryptoJS

            // 生成解密返回数据的key
            var aesKey = CryptoJS.MD5(uuid() + '-' + getDateTime() + '-' + generateRamStr(32)).toString();
            aesKey = CryptoJS.enc.Hex.parse(aesKey);
            var base64AesKey = CryptoJS.enc.Base64.stringify(aesKey)

            // 生成AES 加密偏移 iv
            let iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(base64AesKey + getDate()).toString());

            // AES 加密请求的内容
            // 使用AES加密请求的数据
            let cryptRequestStr = CryptoJS.AES.encrypt(me.dataObject, aesKey, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7
            }).toString();

            // 使用 RSA 公钥加密 请求响应解密的key
            const myEncrypt = new window.JSEncrypt.JSEncrypt()
            myEncrypt.setPublicKey(publicKey)
            const cryptRespKeyStr = myEncrypt.encryptLong(base64AesKey)

            // 加密后的请求内容
            let reqDataObj = JSON.stringify({
                key: cryptRespKeyStr,
                data: cryptRequestStr
            })

            // 使用 SM4/ECB/PKCS5Padding 加密最终请求的内容 输出十六进制字符串
            let sm4Key = CryptoJS.MD5(getDate()).toString();
            me.dataObject = JSON.stringify({
                data: window.sm4.encrypt(reqDataObj, sm4Key)
            })

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
                    // 生成AES 解密偏移 iv
                    let iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(base64AesKey + getDate()).toString());
                    try {
                        let encryptedStr = CryptoJS.AES.decrypt(data.data, aesKey, {
                            iv: iv,
                            mode: CryptoJS.mode.CFB,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        let aesDecrypted = encryptedStr.toString(CryptoJS.enc.Utf8)
                        data.data = JSON.parse(aesDecrypted)
                    } catch (e) {
                        console.error(e)
                    }

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

    exports('HttpEncryptionRequest', HttpEncryptionRequest);
});