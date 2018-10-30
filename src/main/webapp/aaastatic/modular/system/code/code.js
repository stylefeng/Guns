/**
 * 代码生成管理初始化
 */
var Code = {

};

/**
 * 提交代码生成
 */
Code.generate = function () {
    var baseAjax = Feng.baseAjax("/code/generate","生成代码");
    baseAjax.set("bizChName");
    baseAjax.set("bizEnName");
    baseAjax.set("path");
    baseAjax.set("moduleName");
    baseAjax.start();
};
