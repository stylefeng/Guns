var DateUtils = {
	/**
     * 扩展Date 对象格式化方法
     */
    expandDate : function() {
        Date.prototype.format = function(fmt)   
        { //author: meizz   
          var o = {   
            "M+" : this.getMonth()+1,                 //月份   
            "d+" : this.getDate(),                    //日   
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
            "H+" : this.getHours(),                   //小时 
            "m+" : this.getMinutes(),                 //分   
            "s+" : this.getSeconds(),                 //秒   
            "q+" : Math.floor((this.getMonth()+3)/3), //季度   
            "S"  : this.getMilliseconds()             //毫秒   
          };   
          if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
          for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
          return fmt;   
        }
    },
	/**
	 * 获取具体年龄
	 * @param {} beginStr
	 * @param {} endStr
	 * @return {}
	 */
	getAgeInfo: function (beginStr, endStr) {
        var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
		var beginArr = beginStr.match(reg);
		var endArr = endStr.match(reg);
	
		var days = 0;
		var month = 0;
		var year = 0;
	
		days = endArr[5] - beginArr[5];
		if (days < 0) {
			month = -1;
			days = 30 + days;
		}
	
		month = month + (endArr[3] - beginArr[3]);
		if (month < 0) {
			year = -1;
			month = 12 + month;
		}
	
		year = year + (endArr[1] - beginArr[1]);
	
		var yearString = year > 0 ? year + "岁" : "";
		var mnthString = month > 0 ? month + "月" : "";
		var dayString = days > 0 ? days + "天" : "";
	
		/*
		 * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0天小于3天 取小时 例如出生2天 就取 48小时
		 */
		var result = "";
		if (year >= 1) {
			result = yearString + mnthString;
		} else {
			if (month >= 1) {
				result = days > 0 ? mnthString + dayString : mnthString;
			} else {
				var begDate = new Date(beginArr[1], beginArr[3] - 1, beginArr[5],
						beginArr[7], beginArr[9], beginArr[11]);
				var endDate = new Date(endArr[1], endArr[3] - 1, endArr[5],
						endArr[7], endArr[9], endArr[11]);
	
				var between = (endDate.getTime() - begDate.getTime()) / 1000;
				days = Math.floor(between / (24 * 3600));
				var hours = Math.floor(between / 3600 - (days * 24));
				var dayString = days > 0 ? days + "天" : "";
				result = days >= 3 ? dayString : days * 24 + hours + "小时";
			}
		}
	
		return result;
    },
    /**
     * 获取年龄，不满一天算天
     * @param {} birthday
     * @param {} today
     * @return {}
     */
    getAge :function(birthday,today) {
    	var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);
    	var beginArr = birthday.match(reg);
        var endArr = today.match(reg);
    
        var days = 0;
        var month = 0;
        var year = 0;
    
        days = endArr[5] - beginArr[5];
        if (days < 0) {
            month = -1;
            days = 30 + days;
        }
    
        month = month + (endArr[3] - beginArr[3]);
        if (month < 0) {
            year = -1;
            month = 12 + month;
        }
    
        year = year + (endArr[1] - beginArr[1]);
    
        var yearString = year > 0 ? year + "岁" : "";
        var mnthString = month > 0 ? month + "月" : "";
        var dayString = days > 0 ? days + "天" : "1天";
        
        /*
         * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 name取几月 3 如果不足月， 则取天数 4 不满一天算一天
         */
        var result = "";
        if (year >= 1) {
            result = yearString + mnthString + dayString;
        } else {
            if (month >= 1) {
                result = days > 0 ? mnthString + dayString : mnthString;
            } else {
                result = dayString;
            }
        }
        return result;
    },
    /**
     * 获取月龄
     * @param {} birthday
     * @param {} today
     * @return {}
     */
    getMonthage :function(birthday,today) {
        var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);
        var beginArr = birthday.match(reg);
        var endArr = today.match(reg);
    
        var days = 0;
        var month = 0;
        var year = 0;
    
        days = endArr[5] - beginArr[5];
        if (days < 0) {
            month = -1;
            days = 30 + days;
        }
    
        month = month + (endArr[3] - beginArr[3]);
        if (month < 0) {
            year = -1;
            month = 12 + month;
        }
    
        year = year + (endArr[1] - beginArr[1]);
    
        var result = "";
        if (year >= 1) {
            result = (year * 12 + month + 1) + "个月";
        } else {
            if (month >= 1) {
                result = (month + 1) + "个月";
            } else {
                result = "1个月";
            }
        }
        return result;
    }
}