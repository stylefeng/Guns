/**
 * 初始化报销管理详情对话框
 */
var ExpenseInfoDlg = {
    expenseInfoData : {}
};

/**
 * 清除数据
 */
ExpenseInfoDlg.clearData = function() {
    this.expenseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ExpenseInfoDlg.set = function(key, val) {
    this.expenseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ExpenseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ExpenseInfoDlg.close = function() {
    parent.layer.close(window.parent.Expense.layerIndex);
}

/**
 * 收集数据
 */
ExpenseInfoDlg.collectData = function() {
    this
    .set('id')
    .set('money')
    .set('desc')
    ;
}

/**
 * 提交添加
 */
ExpenseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/expense/add", function(data){
        Feng.success("添加成功!");
        window.parent.Expense.table.refresh();
        ExpenseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.expenseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ExpenseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/expense/update", function(data){
        Feng.success("修改成功!");
        window.parent.Expense.table.refresh();
        ExpenseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.expenseInfoData);
    ajax.start();
}

$(function() {

});
