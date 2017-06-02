(function($) {
	"use strict";

	$.fn.treegridData = function(options, param) {
		// 如果是调用方法
		if (typeof options == 'string') {
			return $.fn.treegridData.methods[options](this, param);
		}

		// 如果是初始化组件
		options = $.extend({}, $.fn.treegridData.defaults, options || {});
		var target = $(this);
		// 得到根节点
		target.getRootNodes = function(data) {
			var result = [];
			$.each(data, function(index, item) {
				// 这里兼容几种常见Root节点写法
				if (!item[options.parentCode]
						|| item[options.parentCode] == '0'
						|| item[options.parentCode] == 0
						|| item[options.parentCode] == null
						|| item[options.parentCode] == '') {
					result.push(item);
				}
			});
			return result;
		};
		var j = 0;
		// 递归获取子节点并且设置子节点
		target.getChildNodes = function(data, parentNode, parentIndex, tbody) {
			$.each(data, function(i, item) {
				if (item[options.parentCode] == parentNode[options.code]) {
					var tr = $('<tr></tr>');
					var nowParentIndex = (parentIndex + (j++) + 1);
					tr.addClass('treegrid-' + nowParentIndex);
					tr.addClass('treegrid-parent-' + parentIndex);
					$.each(options.columns, function(index, column) {
						// 判断有没有选择列
						if(index==0&&column.field=='selectItem'){
							var td = $('<td style="text-align:center"></td>');
							// 判断是否为radio
							if(column.radio){
								var _ipt = $('<input name="select_item" type="radio" value="'+item[options.id]+'"></input>');
								td.append(_ipt);
							} 
							if(column.checkbox){
								var _ipt = $('<input name="select_item" type="checkbox" value="'+item[options.id]+'"></input>');
								td.append(_ipt);
							} 
							tr.append(td);
						}else{
							var td = $('<td></td>');
							td.text(item[column.field]);
							tr.append(td);
						}
					});
					tbody.append(tr);
					target.getChildNodes(data, item, nowParentIndex, tbody)

				}
			});
		};
		target.addClass('table');
		if (options.striped) {
			target.addClass('table-striped');
		}
		if (options.bordered) {
			target.addClass('table-bordered');
		}
		target.load = function(parms){
			$.ajax({
				type : options.type,
				url : options.url,
				data : parms?parms:options.ajaxParams,
				dataType : "JSON",
				success : function(data, textStatus, jqXHR) {
					// 加载完数据先清空
					target.html("");
					// 构造表头
					var thr = $('<tr></tr>');
					$.each(options.columns, function(i, item) {
						var th = $('<th style="padding:10px;"></th>');
						th.text(item.title);
						thr.append(th);
					});
					var thead = $('<thead></thead>');
					thead.append(thr);
					target.append(thead);
					// 是否有radio或checkbox
					var hasSelectItem = false;
					// 构造表体
					var tbody = $('<tbody></tbody>');
					var rootNode = target.getRootNodes(data);
					$.each(rootNode, function(i, item) {
						var tr = $('<tr></tr>');
						tr.addClass('treegrid-' + (j + "_" + i));
						$.each(options.columns, function(index, column) {
							// 判断有没有选择列
							if(index==0&&column.field=='selectItem'){
								hasSelectItem = true;
								var td = $('<td style="text-align:center"></td>');
								if(column.radio){
									var _ipt = $('<input name="select_item" type="radio" value="'+item[options.id]+'"></input>');
									td.append(_ipt);
								} 
								if(column.checkbox){
									var _ipt = $('<input name="select_item" type="checkbox" value="'+item[options.id]+'"></input>');
									td.append(_ipt);
								} 
								tr.append(td);
							}else{
								var td = $('<td></td>');
								td.text(item[column.field]);
								tr.append(td);
							}
						});
						tbody.append(tr);
						target.getChildNodes(data, item, (j + "_" + i), tbody);
					});
					target.append(tbody);
					// 初始化treegrid
					target.treegrid({
						treeColumn: options.expandColumn?options.expandColumn:(hasSelectItem?1:0),//如果有radio或checkbox默认第二列层级显示，当前是在用户未设置的提前下
						expanderExpandedClass : options.expanderExpandedClass,
						expanderCollapsedClass : options.expanderCollapsedClass
					});
					if (!options.expandAll) {
						target.treegrid('collapseAll');
					}
					// 行点击选中事件
					target.find("tbody").find("tr").click(function(){
						if(hasSelectItem){
							var _ipt = $(this).find("input[name='select_item']");
							if(_ipt.attr("type")=="radio"){
								_ipt.prop('checked',true);
								target.find("tbody").find("tr").removeClass("treegrid-selected");
								$(this).addClass("treegrid-selected");
							}else{
								if(_ipt.prop('checked')){
									_ipt.prop('checked',false);
									$(this).removeClass("treegrid-selected");
								}else{
									_ipt.prop('checked',true);
									$(this).addClass("treegrid-selected");
								}
							}
						}
					});
				}
			});
		}
		if (options.url) {
			target.load();
		} else {
			// 也可以通过defaults里面的data属性通过传递一个数据集合进来对组件进行初始化....有兴趣可以自己实现，思路和上述类似
		}
		
		return target;
	};

	// 组件方法封装........
	$.fn.treegridData.methods = {
		// 返回选中记录的id（返回的id由配置中的id属性指定）
		// 为了兼容bootstrap-table的写法，统一返回数组，这里只返回了指定的id
		getSelections : function(target, data) {
			// 所有被选中的记录input
			var _ipt = target.find("tbody").find("tr").find("input[name='select_item']:checked");
			var chk_value =[]; 
			// 如果是radio
			if(_ipt.attr("type")=="radio"){
				chk_value.push({id:_ipt.val()}); 
			}else{
				_ipt.each(function(_i,_item){ 
					chk_value.push({id:$(_item).val()}); 
				}); 
			}
			return chk_value;
		},
		// 刷新记录
		refresh : function(target, parms) {
			if(parms){
				target.load(parms);
			}
		},
	// 组件的其他方法也可以进行类似封装........
	};

	$.fn.treegridData.defaults = {
		id : 'id',// 选取记录返回的值
		code : 'code',// 用于设置父子关系
		parentCode : 'parentId',// 用于设置父子关系
		data : [], // 构造table的数据集合
		type : "GET", // 请求数据的ajax类型
		url : null, // 请求数据的ajax的url
		ajaxParams : {}, // 请求数据的ajax的data属性
		expandColumn : null,// 在哪一列上面显示展开按钮
		expandAll : true, // 是否全部展开
		striped : false, // 是否各行渐变色
		bordered : false, // 是否显示边框
		columns : [],
		expanderExpandedClass : 'glyphicon glyphicon-chevron-down',// 展开的按钮的图标
		expanderCollapsedClass : 'glyphicon glyphicon-chevron-right'// 缩起的按钮的图标

	};
})(jQuery);