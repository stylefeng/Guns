function initGraph(params){
    const paramsId = echarts.init(document.getElementById(params.id), myEchartsTheme);
    let metricData = params.metric;
    const option = {
        title: { 
            text: params.id,
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (datas){
                let res;
                datas.map(function (e,i) {
                    if (res == undefined){
                        let datetime = new Date(e.value[0]*1000);
                        res = datetime.getUTCFullYear().toString()+'-'+datetime.getUTCMonth().toString()+'-'+datetime.getUTCDate().toString()+' '+datetime.getHours().toString()+':'+ datetime.getMinutes().toString() + ':' + datetime.getSeconds().toString() + '<br/>'
                    }
                    if (params.unit === 'MB' && e.value[1]>0){
                        res += e.marker +" " + e.seriesName + ' : ' + (e.value[1]/1000/1000).toFixed(2) + params.unit + '<br/>'
                    }              else {
                        res += e.marker +" " + e.seriesName + ' : ' + e.value[1] + '<br/>'
                    }
                })
                return res;
            }
        },
        xAxis: {
            type: 'time',
            axisLabel: {
                formatter: function(value,index){
                    let datetime = new Date(value*1000)
                    return datetime.getHours().toString()+':'+ datetime.getMinutes().toString()
                }
            }
        },
        yAxis: {
            name: params.unit,
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: function(value,index){
                    if (params.unit == 'MB' && value>0){
                        return value/1000/1000
                    } else {
                        return value
                    }
                }
            }
        },
        series: [{type : 'line',
            smooth: true,
            animationDuration: 2000,
            animationEasing: 'quadraticOut',
            name : params.id,
            data: metricData,
            areaStyle: {            // 折现下是否填充
                color: this.color,
                opacity: 0.6
            },
            showSymbol: false}],
    };
    paramsId.setOption(option);
}

// 初始化三个数据指标
function initMultiGraph(multiParams){
    const multiParamsId = echarts.init(document.getElementById(multiParams.id), myEchartsTheme);
    let metricData = multiParams.metric;
    const option = {
        title: { text: multiParams.title, x: 'center' },
        tooltip: {
            trigger: 'axis',
            formatter: function (datas){
                let res;
                datas.map(function (e,i) {
                    if (res == undefined){
                        let datetime = new Date(e.value[0]*1000);
                        res = datetime.getUTCFullYear().toString()+'-'+datetime.getUTCMonth().toString()+'-'+datetime.getUTCDate().toString()+' '+datetime.getHours().toString()+':'+ datetime.getMinutes().toString() + ':' + datetime.getSeconds().toString() + '<br/>'
                    }
                    if (multiParams.unit === 'MB' && e.value[1]>0){
                        res += e.marker +" " + e.seriesName + ' : ' + (e.value[1]/1000/1000).toFixed(2) + multiParams.unit + '<br/>'
                    }              else {
                        res += e.marker +" " + e.seriesName + ' : ' + e.value[1] + '<br/>'
                    }
                })
                return res;
            }
        },
        legend: {
            top:"8%",
            formatter: function (name) {
                return  name;
            }
        },
        xAxis: {
            type: 'time',
            axisLabel: {
                formatter: function(value,index){
                    let datetime = new Date(value*1000)
                    return datetime.getHours().toString()+':'+ datetime.getMinutes().toString()
                }
            }
        },
        yAxis: {
            name: multiParams.unit,
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: function(value,index){
                    if (multiParams.unit == 'MB' && value>0){
                        return value/1000/1000
                    } else {
                        return value
                    }
                }
            }
        },
        series: [{type : 'line',
            smooth: true,
            lineStyle : {
                color: '#63BAC9',
                width : 2,
                type : 'solid',
            },
            animationDuration: 2000,
            animationEasing: 'quadraticOut',
            name: metricData.metric1.name,
            data: metricData.metric1.value,
            areaStyle: {
                color: '#1D292D',
                opacity: 0.2
            },
            smoothMonotone: 'x',
            showSymbol: false},
            {type : 'line',
                smooth: true,
                lineStyle : {
                    color: '#B29943',
                    width : 2,
                    type : 'solid',
                },
                animationDuration: 2000,
                animationEasing: 'quadraticOut',
                name: metricData.metric2.name,
                data: metricData.metric2.value,
                areaStyle: {
                    color: '#313830',
                    opacity: 0.2
                },
                smoothMonotone: 'x',
                showSymbol: false},
            {type : 'line',
                smooth: true,
                lineStyle : {
                    color: '#7CA76D',
                    width : 2,
                    type : 'solid',
                },
                animationDuration: 2000,
                animationEasing: 'quadraticOut',
                name: metricData.metric3.name,
                data: metricData.metric3.value,
                areaStyle: {
                    color: '#394437',
                    opacity: 0.2
                },
                smoothMonotone: 'x',
                showSymbol: false}]
    };
    multiParamsId.setOption(option);
}