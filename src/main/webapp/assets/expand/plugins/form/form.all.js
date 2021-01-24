var form = {};
form.type = {};
form.formSelects = null;
formPriv = {};

var map = new Map();
// var $ = layui.jquery

formPriv.initType = function () {
    map.put("1", "textinput");
    map.put("2", "textinput");
    map.put("3", "textinput");
    map.put("4", "radio");
    map.put("5", "checkbox");
    map.put("6", "select");
    map.put("7", "userSelect");
    map.put("8", "attach");
    map.put("9", "editor");
    map.put("10", "autoRow");
    map.put("11", "autoRow-Column");
    map.put("12", "suggest");
    map.put("13", "button");
    map.put("14", "container");
    map.put("-1", "textinput");
}

formPriv.doView = function (){
    var jqueryForm = "form";
    var formObj = layui.jquery(jqueryForm);
    if (formObj.length == 0) {
        Feng.error("没有找到对应的表单")
        return;
    }
    formObj = layui.jquery(formObj[0]);
    formObj.find("[viewForm]").each(function () {
        var item = layui.jquery(this);
        var itemType = layui.jquery(this).attr("viewForm");
        formPriv.type[itemType].read(item);
    });
    layui.jquery("#closeBtn").html("&emsp;关闭&emsp;")
    return;
}


//各个组件的状态判断
formPriv.type = {};
formPriv.type["hidden"] = {
    hide: function (obj) {
    },
    read: function (obj) {
    }
}
formPriv.type["textinput"] = {
    hide: function (obj) {
    	formPriv.removeStar(obj);
        obj.remove();
    },
    read: function (obj) {
    	formPriv.removeStar(obj);
        if (obj.is('input') || obj.is('textarea')) {
          /*  var label = obj.val();
            label = label.replace(/\r\n/g, "<BR>");
            label = label.replace(/\n/g, "<BR>");

            var ip = layui.jquery("<input type='text' readonly/>").addClass("layui-input layui-disabled").attr("value", obj.attr("name")).val( label );
            obj.parent().html(ip)*/
            // obj.attr("readonly", "readonly");
            var label = obj.val();
            var style = obj.attr("style");
            label = label.replace(/\r\n/g, "<BR>");
            label = label.replace(/\n/g, "<BR>");
            if(!label){
                label = "&nbsp;"
            }
            if(obj.is('input')){
                label = "<span class='form-read-input layui-empty-item layui-input' style='"+style+"'>"+label+"</span>";
            }else{
                label = "<span class='form-read-input layui-empty-item layui-textarea ' style='"+style+"'>"+label+"</span>"; //layui-disabled
            }

            obj.parent().html(label);
        } else {
            var label = obj.find('input').val();
            var style = obj.find('input').attr("style");
           /* var ip = layui.jquery("<input type='text' readonly/>").addClass("layui-input layui-disabled").attr("value", obj.attr("name")).val( label );
            obj.html(ip);*/
            // label.attr("readonly", "readonly");
            if(!label){
                label = "&nbsp;"
            }
            label = "<span class='form-read-input layui-empty-item layui-input' style='"+style+"'>"+label+"</span>";
            obj.html(label);
        }

    }
}

formPriv.type["input-url"] = {
    hide: function (obj) {
        formPriv.removeStar(obj);
        obj.remove();
    },
    read: function (obj) {
        formPriv.removeStar(obj);
        if (obj.is('input') || obj.is('textarea')) {
            var label = obj.val();
            if(!label){
                label = "&nbsp;"
            }else{
                label = "<a href='"+label+"' target='_blank' class='form-read-a'>"+label+"</a>";
            }
            if(obj.is('input')){
                label = "<span class='form-read-input layui-empty-item layui-input'>"+label+"</span>";
            }else{
                label = "<span class='form-read-input layui-empty-item layui-textarea '>"+label+"</span>"; //layui-disabled
            }

            obj.parent().html(label);
        } else {
            var label = obj.find('input').val();
            if(!label){
                label = "&nbsp;"
            }else{
                label = "<a href='"+label+"' target='_blank'>"+label+"</a>";
            }
            label = "<span class='form-read-input layui-empty-item layui-input'>"+label+"</span>";
            obj.html(label);
        }

    }
}

formPriv.type["radio"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
    	formPriv.removeStar(obj);
        var checkedLabel = "";
        var checkEle = obj.find("input:radio:checked");
        if (checkEle.length == 1) {
            checkedLabel = checkEle.attr("label");
            if(checkedLabel==undefined){
                checkedLabel = checkEle.attr("title");
            }
        }
        checkedLabel = "<span class='form-read-input layui-empty-item layui-input'>"+checkedLabel+"</span>";
        obj.html(checkedLabel);
    }
}

formPriv.type["xm-select"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
        var xm_select =  obj.attr("xm-ele-id");
        obj.find("input.xm-input[placeholder='请选择']").removeAttr('placeholder')
        form.formSelects.disabled(xm_select)
    	/*formPriv.removeStar(obj);
        var label = "";
        var xm_select =  obj.find("dd.xm-select-this");
        debugger
        layui.jquery.each(xm_select, function (i, xm_span) {
            debugger
            var span = layui.jquery(xm_span).find("span").attr("name")
            label += span + "，";
        })
        if (label.length > 0) {
            label = label.substring(0, label.length - 1);
        }
        if(!label){
            label = "&nbsp;"
        }
        label = "<span class='form-read-input layui-empty-item'>"+label+"</span>";
        obj.html(label);*/
    }
}


formPriv.type["tags-input"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
        obj.find("#tags_tagsinput").find("span.tag").find("a").remove();
        obj.find("#tags_tagsinput").find("#tags_addTag").remove();
    }
}

formPriv.type["user-head"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
        obj.addClass("user-info-head-no-hover").removeClass("user-info-head")
        var img = obj.find("img").attr("src");
        obj.unbind("click");
        obj.bind("click",function(){
            var imgData = {
                "alt": "头像",
                "src": img, //原图地址
                "thumb": img //缩略图地址
            }
            var json = {
                photos: {
                    title: "头像",
                    data: [imgData]
                }
                ,zIndex:99999999
                ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                ,shade: .1
                ,closeBtn: true
            }
            top.indexModule.photos(JSON.stringify(json));
        });

    }
}

formPriv.type["checkbox"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
    	formPriv.removeStar(obj);
        var checkedLabel = "";
        var checkboxs =  obj.find("input[type=checkbox]");
        layui.jquery.each(checkboxs, function (i, checkbox) {
            if(layui.jquery(checkbox).is(":checked")){
                checkedLabel += layui.jquery(checkbox).attr("title") + "，";
            }
        })
        if (checkedLabel.length > 0) {
            checkedLabel = checkedLabel.substring(0, checkedLabel.length - 1);
        }
        checkedLabel = "<span class='form-read-input layui-empty-item layui-input'>"+checkedLabel+"</span>";
        obj.html(checkedLabel);
    }
}

formPriv.type["attach"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
    	formPriv.removeStar(obj);
        if (obj.is('button')) {
            obj.remove();
        } else {
            var button = obj.find('button');
            obj.find('a').first().remove();
            layui.jquery(button).remove();
        }
    }
}

formPriv.type["select"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
    	formPriv.removeStar(obj);
        var selectLabel = "";
        obj.find("select:not(.noneWorkflow) option:checked").each(function (index, item) {
            if (layui.jquery(item).val() == null || layui.jquery(item).val().length == 0) {
                selectLabel = "";
            } else {
                selectLabel = layui.jquery(item).html();
            }
        });
        if(!selectLabel){
            selectLabel = "&nbsp;"
        }
        selectLabel = "<span class='form-read-input layui-empty-item layui-input'>"+selectLabel+"</span>";
        obj.html(selectLabel);

    }
}

formPriv.type["button"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
        //暂时没有添加只读操作
        obj.hide();
    }
}

//人员选择框
formPriv.type["userSelect"] = {
    hide: function (obj) {
        obj.remove();
    },
    read: function (obj) {
		 formPriv.removeStar(obj);

        if (obj.is('input') || obj.is('textarea')) {
            obj.unbind("click"); //移除click事件
            var label = obj.val();
            label = label.replace(/\r\n/g, "<BR>");
            label = label.replace(/\n/g, "<BR>");
            if(!label){
                label = "&nbsp;"
            }
            label = "<span class='form-read-input layui-empty-item layui-input'>"+label+"</span>";
            obj.parent().html(label);
        } else {
            obj.find('input').unbind("click"); //移除click事件
            var label = obj.find('input').val();
            if(!label){
                label = "&nbsp;"
            }
            label = "<span class='form-read-input layui-empty-item layui-input'>"+label+"</span>";
            obj.html(label);
        }
    }
}
formPriv.type["suggest"]={
    hide:function(obj){
        obj.hide();
    },
    read:function(obj){
        formPriv.removeStar(obj);
        if (obj.is('input') || obj.is('textarea')) {
            obj.addClass("layui-disabled").attr("readonly", "readonly").removeAttr("name").removeAttr("lay-verify").removeAttr("placeholder");
        } else {
            var label = obj.find('input');
            if(label==null||label.length==0){
                label = obj.find('textarea');
            }
            label.addClass("layui-disabled").attr("readonly", "readonly").removeAttr("name").removeAttr("lay-verify").removeAttr("placeholder");
        }
    }
}
formPriv.type["container"]={
    hide:function(obj){
        obj.remove();
        // obj.hide();
    },
    read:function(obj){
    }
}


formPriv.removeStar = function(obj){
	if(obj.length>0){
		if(obj.is('div')&&obj.hasClass('workflow-form-item')){
			var star = layui.jquery(obj).prev();
			if(star){
				if(layui.jquery(star).find('span').hasClass('required')){
					layui.jquery(star).find('span').remove();
				}
			}

		}else{
			obj = obj.parent();
			formPriv.removeStar(obj);
		}
	}
}



function Map() {
    this.container = new Object();
}

Map.prototype.put = function (key, value) {
    this.container[key] = value;
}

Map.prototype.get = function (key) {
    return this.container[key];
}

Map.prototype.remove = function (key) {
    delete this.container[key];
}


layui.use(['form', 'admin', 'formSelects'], function () {
    var $ = layui.jquery;
    form.formSelects = layui.formSelects;

});
