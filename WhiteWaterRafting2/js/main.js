var _demo = null;
var timer = null;
var local_timer = null;
$(function(){
    drawUserAndLoc();
    drawLocTheDay();

    drawUserTheDay();
    setInterval(function () {
        drawUserTheDay();
        thedaylocEcharts();
    },60000)
    counter();
    setTimeout(function () {
        locMap();
        density();
    },800);
    // counterap();
    userSource();
    thedaylocEcharts();
    drawLocUserTheDay();

    sumUp();
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(sumUp,60000)
    // userNum();

    setTimeout(function () {
        $(".model_slider").show();
    },1000)

});


/**
 * 切换地图
 * */
function slider(){
    $("#loc_emap").toggle();
    $("#density").toggle();
}

/**
 * 全国定位总数员工总数与各场所分布数量
 * */
function drawUserAndLoc(){
    // $.getJSON('data/cumulative_today.json',function (res) {
    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/cumulative_today',
        async: true,
        success: function (res) {

        userNum(res.user_total);
        counter(res.locat_total);

        var mapChart = echarts.init(document.getElementById('location_echarts'));
        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < res.data.length; i++) {
            xAxisData.push(res.data[i].name);
            data1.push(res.data[i].user_count);
            data2.push((res.data[i].location_count));
        }
        option = {
            // backgroundColor:"#071428",
            title: {
                text: '当日累计定位次数和累计定位用户数（各场所数)',
                subtext: '共计' + echarts.format.addCommas(data1.length) + '个场所',
                x: 'center',
                textStyle:{
                    color: '#94ECFF'
                },
                subtextStyle: {
                    color: '#6B7B95'
                }
            },
            textStyle: {
                color: '#C8D1D1'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            axisPointer: {
                link: {xAxisIndex: 'all'}
            },
            dataZoom: [
                {
                    type: 'inside',
                    realtime: true,
                    xAxisIndex: [0, 1],
                    show: true,
                    realtime: true,
                    xAxisIndex: [0, 1]
                }
            ],
            grid: [{
                left: 50,
                right: 50,
                height: '35%'
            }, {
                left: 50,
                right: 50,
                top: '55%',
                height: '35%'
            }],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data: xAxisData,
                    show:false,
                },
                {
                    gridIndex: 1,
                    type : 'category',
                    boundaryGap : false,
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    position: 'top'
                }
            ],
            yAxis : [
                {
                    name : '定位次数(次/日)',
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine:{
                        show: false
                    },
                },
                {
                    gridIndex: 1,
                    name : '定位用户数(人/日)',
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine:{
                        show: false
                    },
                    inverse: true
                }
            ],
            series : [
                {
                    name:'定位次数',
                    type:'line',
                    symbolSize: 8,
                    smooth: true,
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#FFCC4F'},
                                    {offset: 1, color: '#F3D282'}
                                ]
                            )
                        }
                    },
                    data:data2
                },
                {
                    name:'定位用户数',
                    type:'line',
                    smooth: true,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'}
                                ]
                            )
                        }
                    },
                    data: data1
                }
            ]
        };
        mapChart.setOption(option);
    // })
        }
    })
}

/**
 * 周/月/年每日定位柱状图
 * */
function drawLocTheDay(){

    // $.getJSON('data/forday.json',function (res) {
    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/statistic_location_for_day',
        async: true,
        success: function (res) {


        var mapChart = echarts.init(document.getElementById('theday_echarts'));

        var categoryData = [];
        var valueData = [];


        for (var i=0;i<res.data.length;i++) {
            categoryData.push(res.data[i].date);
            valueData.push((res.data[i].number)/10000);
        }

        var option = {
            // backgroundColor:"#071428",
            title: {
                text: '每日定位次数图',
                subtext: '共计' + echarts.format.addCommas(res.data.length) + '天数据',
                x: 'center',
                subtextStyle: {
                    color: '#6B7B95'
                },
                textStyle:{
                    color: '#94ECFF'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            textStyle: {
                color: '#C8D1D1'
            },
            grid: {
                bottom: 90
            },
            dataZoom: [{
                type: 'inside',
                startValue:res.data.length-7
            }],
            xAxis: {
                data: categoryData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitArea: {
                    show: false
                }
            },
            yAxis : [
                {
                    name : '定位次数(万次/日)',
                    type : 'value',
                    splitLine:{
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                }
            ],
            series: [ {
                name: 'bar',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                },
                data: valueData
            }]
        };

        function generateData(count) {
            var baseValue = Math.random() * 1000;
            var time = +new Date(2011, 0, 1);
            var smallBaseValue;

            function next(idx) {
                smallBaseValue = idx % 30 === 0
                    ? Math.random() * 700
                    : (smallBaseValue + Math.random() * 500 - 250);
                baseValue += Math.random() * 20 - 10;
                return Math.max(
                    0,
                    Math.round(baseValue + smallBaseValue) + 3000
                );
            }

            var categoryData = [];
            var valueData = [];

            for (var i = 0; i < count; i++) {
                categoryData.push(echarts.format.formatTime('yyyy-MM-dd', time));
                valueData.push(next(i).toFixed(2));
                time += 1000;
            }

            return {
                categoryData: categoryData,
                valueData: valueData
            };
        }

        mapChart.setOption(option);
    // })
        }
    })
}

/**
 * 周/月/年每日定位用户柱状图
 * */
function drawLocUserTheDay(){

    // $.getJSON('data/forday.json',function (res) {
        $.ajax({
            type: 'get',
            url: 'http://test.powerlbs.com:8090/fanzai_data_show/statistic_user_for_day',
            async: true,
            success: function (res) {


        var mapChart = echarts.init(document.getElementById('loc_user'));

        var categoryData = [];
        var valueData = [];


        for (var i=0;i<res.data.length;i++) {
            categoryData.push(res.data[i].date);
            valueData.push(res.data[i].number/10000);
        }

        var option = {
            // backgroundColor:"#071428",
            title: {
                text: '每日定位用户图',
                subtext: '共计' + echarts.format.addCommas(res.data.length) + '天数据',
                x: 'center',
                subtextStyle: {
                    color: '#6B7B95'
                },
                textStyle:{
                    color: '#94ECFF'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            textStyle: {
                color: '#C8D1D1'
            },
            grid: {
                bottom: 90
            },
            dataZoom: [{
                type: 'inside',
                startValue:res.data.length - 7
            }],
            xAxis: {
                data: categoryData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitArea: {
                    show: false
                }
            },
            yAxis : [
                {
                    name : '定位次数(万人/日)',
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine:{
                        show: false
                    },
                    type : 'value'
                }
            ],
            series: [ {
                name: 'bar',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        }, {
                            offset: 1,
                            color: 'rgb(25, 183, 207)'
                        }])
                    }
                },
                data: valueData
            }]
        };

        function generateData(count) {
            var baseValue = Math.random() * 1000;
            var time = +new Date(2011, 0, 1);
            var smallBaseValue;

            function next(idx) {
                smallBaseValue = idx % 30 === 0
                    ? Math.random() * 700
                    : (smallBaseValue + Math.random() * 500 - 250);
                baseValue += Math.random() * 20 - 10;
                return Math.max(
                    0,
                    Math.round(baseValue + smallBaseValue) + 3000
                );
            }

            var categoryData = [];
            var valueData = [];

            for (var i = 0; i < count; i++) {
                categoryData.push(echarts.format.formatTime('yyyy-MM-dd', time));
                valueData.push(next(i).toFixed(2));
                time += 1000;
            }

            return {
                categoryData: categoryData,
                valueData: valueData
            };
        }

        mapChart.setOption(option);
    // })
            }
        })
}

/**
 * 周/月/年每日定位用户增长折线
 * */
function drawUserTheDay(){
    // $.getJSON('data/for_day_rice.json',function(res){
    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/statistic_user_growth_for_day',
        async: true,
        success: function (res) {

        $("#thedayuser_num").html(res.data.length);
        var mapChart = echarts.init(document.getElementById('thedayrice_echarts'));

        var categoryData = [];
        var valueData = [];

        for (var i=0;i<res.data.length;i++) {
            categoryData.push(res.data[i].date.split(" ")[1].split(/:49/)[0]);
            valueData.push(res.data[i].number);
        }

        var option = {
            // backgroundColor:"#071428",
            // title: {
                // text: '每日定位用户增长图',
                // subtext: '共计'+echarts.format.addCommas(res.data.length) + '天数据',
                // x: 'center',
                // subtextStyle: {
                //     color: '#6B7B95'
                // },
                // textStyle:{
                //     color: '#94ECFF'
                // }
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            textStyle: {
                color: '#C8D1D1'
            },
            grid: {
                bottom: 90
            },
            dataZoom: [{
                type: 'inside',
                // startValue:res.data.length - 7
            }],
            xAxis: {
                data: categoryData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitArea: {
                    show: false
                },
            },
            yAxis : [
                {
                    name : '定位人数(人/日)',
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine:{
                        show: false
                    },
                    type : 'value'
                }
            ],
            series: [{
                type: 'line',
                data: valueData,
                smooth: true,
                // Set `large` for large data amount
                large: true,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                },
            }]
        };



        mapChart.setOption(option);
    // })
        }
    })
}


/**
 * 周/月/年每日定位增长折线
 * */
function thedaylocEcharts(){
    // $.getJSON('data/for_day_rice.json',function(res){
    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/statistic_location_growth_for_day',
        success:function (res) {



        $("#thedayloc_num").html(res.data.length);
        var mapChart = echarts.init(document.getElementById('thedayloc_echarts'));

        var categoryData = [];
        var valueData = [];


        for (var i=0;i<res.data.length;i++) {
            categoryData.push(res.data[i].date.split(" ")[1].split(/:49/)[0]);
            valueData.push((res.data[i].number));
        }

        var option = {
            // backgroundColor:"#071428",
            // title: {
            //     text: '每日定位增长图',
            //     subtext: '共计'+echarts.format.addCommas(res.data.length) + '天数据',
            //     x: 'center',
            //     subtextStyle: {
            //         color: '#6B7B95'
            //     },
            //     textStyle:{
            //         color: '#94ECFF'
            //     }
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                bottom: 90
            },
            textStyle: {
                color: '#C8D1D1'
            },
            dataZoom: [{
                type: 'inside',
                // startValue:res.data.length
            }],
            xAxis: {
                data: categoryData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitArea: {
                    show: false
                },
            },
            yAxis : [
                {
                    name : '定位次数(次/日)',
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine:{
                        show: false
                    },
                    type : 'value'
                }
            ],
            series: [{
                type: 'line',
                data: valueData,
                smooth: true,
                // Set `large` for large data amount
                large: true,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#FFCC4F'},
                                {offset: 1, color: '#F3D282'}
                            ]
                        )
                    }
                },
            }]
        };



        mapChart.setOption(option);
    // })
        }
    })
}

/**
 * 计数器定位次数
 * */
function counter(locat_total) {

    var startnum = 0;
    var usernum = 0;
    var endnum;
    var enduser;

    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/cumulative_today',
        async: true,
        success: function (res) {
            if (res) {
                endnum = res.locat_total;
                enduser = res.user_total;
                localNum(startnum,endnum);
                userNum(usernum,enduser);
                startnum = endnum;
                usernum = enduser;
            }
        }
    })

    if (local_timer) {
        clearInterval(local_timer);
    }
    local_timer = setInterval(function () {
        $.ajax({
            type: 'get',
            url: 'http://test.powerlbs.com:8090/fanzai_data_show/cumulative_today',
            async: true,
            success: function (res) {
                if (res) {
                    endnum = res.locat_total;
                    enduser = res.user_total;
                    localNum(startnum,endnum);
                    userNum(usernum,enduser);
                    startnum = endnum;
                    usernum = enduser;
                }
            }
        })
    },60000)
}


function localNum(startnum,endnum){
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
    };

    if (_demo) {
        _demo = null;
    }

    _demo = new CountUp('myTargetElement', startnum, endnum, 0, 0.5, options);
    if (!_demo.error) {
        _demo.start();
    } else {

    }
}

/**
 * 计数器用户人数
 * */
function userNum(usernum,enduser) {
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
        };

        if (_demo) {
            _demo = null;
        }

        _demo = new CountUp('user_num', usernum, enduser, 0, 0.5, options);
        if (!_demo.error) {
            _demo.start();
        } else {

        }
}

/**
 * 指纹地图
 * */
function density() {
    //初始化
    var myChart = echarts.init(document.getElementById('density'));

    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/finger_density',
        timeout: 500000,
        async: true,
        success: function (res) {
        var weiboData1 = [];
        var weiboData2 = [];
        var weiboData3 = [];

        var pts=CreateChinaMapLine();
        var ply = new BMap.Polygon(pts);

        for (var i = 0; i < res.data.length; i++) {

            var _arr = [];
            var bdgps = gcj02tobd09(res.data[i].lng, res.data[i].lat);

            var pt = new BMap.Point(bdgps[0], bdgps[1]);

            var result = BMapLib.GeoUtils.isPointInPolygon(pt, ply);

            if (result == true) {
                _arr.push(bdgps[0]);
                _arr.push(bdgps[1]);
                if (res.data[i].value>5550) {
                    weiboData3.push(_arr)
                }else if(res.data[i].value>1550){
                    weiboData2.push(_arr)
                }else{
                    weiboData1.push(_arr)
                }
            } else {

            }
        }
        $(".spinner_content").hide();
        myChart.setOption(option = {
            title:{
                text: '指纹分布图',
                textStyle:{
                    color: '#94ECFF'
                },
                x: 'center',
                top: 50
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                // left: 320,
                // top: 180,
                // zoom: 0.2,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            textStyle: {
                color: '#C8D1D1'
            },
            series: [{
                name: '密',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                    color: 'rgba(37, 140, 249, 0.8)'
                },
                data: weiboData1
            }, {
                name: '中',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: 'rgba(14, 241, 242, 0.8)'
                },
                data: weiboData2
            }, {
                name: '稀',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                data: weiboData3
            }]
        });

        },
        error: function (res) {

        }
    })

}

/**
 * 定位地图
 * */
function locMap() {
    //初始化
    var myChart = echarts.init(document.getElementById('loc_emap'));
    $.getJSON('data/data-1491917776060-Sku0i8qpx.json', function (weiboData) {
    // $.ajax({
    //     type: 'get',
    //     url: 'http://test.powerlbs.com:8090/fanzai_data_show/realtime_locate_map',
    //     async: true,
    //     success: function (res) {

        var weiboData1 = [];
        var weiboData2 = [];
        var weiboData3 = [];
        // for (var i = 0; i < res.data.length; i++) {
        //     var _arr = [];
        //
        //     var bdgps = GPS.bd_encrypt(res.data[i].lat,res.data[i].lng);
        //     _arr.push(bdgps.lon);
        //     _arr.push(bdgps.lat);
        //     if (res.data[i].value>150) {
        //         weiboData3.push(_arr)
        //     }else if(res.data[i].value>50){
        //         weiboData2.push(_arr)
        //     }else{
        //         weiboData1.push(_arr)
        //     }
        // }

        weiboData = weiboData.map(function (serieData, idx) {
            var px = serieData[0] / 1000;
            var py = serieData[1] / 1000;
            var res = [[px, py]];

            for (var i = 2; i < serieData.length; i += 2) {
                var dx = serieData[i] / 1000;
                var dy = serieData[i + 1] / 1000;
                var x = px + dx;
                var y = py + dy;
                res.push([x.toFixed(2), y.toFixed(2), 1]);

                px = x;
                py = y;
            }
            return res;
        });
        weiboData1 = weiboData[0];
        weiboData2 = weiboData[1];
        weiboData3 = weiboData[2];

        myChart.setOption(option = {
            title:{
                text: '定位分布图',
                textStyle:{
                    color: '#94ECFF'
                },
                x: 'center',
                top: 50
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                // left: 320,
                // top: 180,
                // zoom: 0.2,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [{
                name: '密',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                    color: '#333399'
                },
                data: weiboData1
            }, {
                name: '中',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: '#6666CC'
                },
                data: weiboData2
            }, {
                name: '稀',
                type: 'scatterGL',
                coordinateSystem: 'geo',
                symbolSize: 1,
                itemStyle: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    color: '#CCCCFF'
                },
                data: weiboData3
            }]
        });
    // });
    //     }
    })

}

/**
 * 用户来源
 * */
function userSource() {

    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/api/user/register',
        async: true,
        success: function (data) {
            $(".spinner_content2").hide();
            var _odata = [];
            for (var i = 0; i<data.data.length; i++) {
                _odata.push({
                    value: data.data[i].count,
                    name: data.data[i].city
                })
            }
            var myChart = echarts.init(document.getElementById('user_source'));
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                textStyle: {
                    color: '#C8D1D1'
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['70%', '90%'],
                        label: {
                            normal: {
                                show: true,
                                position: 'center'
                            },
                        },
                        data: _odata
                    }
                ],
                color: ['#FBE86F','#70FFB9','#2BC8FF','#8EA1D6','#D2C6C8','#B45061','#D77E85']
            };
            myChart.setOption(option)
        }
    })


}


/**
 * 统计
 * */
function sumUp(){
    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/cumulative_total',
        async: true,
        success: function (res) {
            if (res.data) {
                $("#loc_sum").html(res.data.locat_sum);
                $("#user_sum").html(res.data.user_sum);
                $("#ap_sum").html(res.data.ap_sum);
                $("#dir_sum").html(res.data.fingerprint_sum);
            }
        }
    })
}





