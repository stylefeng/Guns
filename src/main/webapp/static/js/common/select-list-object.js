var SelectList = {};
SelectList.singelSelect = function (eleName, attr, data) {
    var result = false;
    $("#" + eleName).find("a").each(function (i, d) {
        if ($(this).attr(attr) == data) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                result = true;
            }
        } else {
            $(this).removeClass('active');
        }
    });
    return result;
};
SelectList.mutiSelect = function (eleName, attr, data) {
    var result = false;
    $("#" + eleName).find("a").each(function (i, d) {
        if ($(this).attr(attr) == data) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                result = true;
            }
        }
    });
    return result;
};
SelectList.clearSelect = function (eleName) {
    $("#" + eleName).find("a").each(function (i, d) {
        $(this).removeClass('active');
    });
};