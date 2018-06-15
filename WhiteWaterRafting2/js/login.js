$(function () {

    $.ajax({
        type: 'get',
        url: 'http://test.powerlbs.com:8090/fanzai_data_show/buildings_showmap',
        async: true,
        success:function (res) {
            drawChinaMap(res.provinces, res.citys);
        }
    })



    function drawChinaMap(valueData1, valueData2) {
        var myData = valueData1;
        var myData2 = valueData2;
        $.getJSON('data/china.json', function (chinaJson) {

            echarts.registerMap('china', chinaJson); // 注册地图
            var loginmapChart = echarts.init(document.getElementById('mapCharts'));
            var option = {
                title:{
                    text: '城市分布图',
                    textStyle:{
                        color: '#94ECFF'
                    },
                    x: 'center',
                    top: 50
                },
                visualMap: {
                    min: 0,
                    max: 100,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],
                    calculable: true,
                    show: false,
                    inRange: {
                        color: ['#4DB5D1', '#4DB5D1']
                    },
                },
                geo: {
                    // left: '2%',
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c47',
                            borderColor: '#111'
                        },
                    },

                },
                series: [
                    {
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        // left:'2%',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        tooltip:{
                            show:false
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(56,155,183,1)',
                                areaColor: '#323c47'
                            },
                            emphasis: {
                                areaColor: '#2a333d',
                                borderWidth: 0,
                                show:false,
                            }
                        },
                        animation: false,
                        data:myData,
                    },
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        tooltip : {
                            show:false
                        },

                        data: myData2 ,
                        symbolSize: function (val) {
                            return 5+(val[2]/20);
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            fontSize: 8
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#7BC9BF'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            loginmapChart.setOption(option);

        });

    }
})