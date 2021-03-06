﻿/// <reference path="jquery-1.10.2.min.js" />
function setLine(contentid, line, interval, line_name, v_max, v_min, v_unitInterval, times, v_unitInterval_time, timeX1, timeX2, timeX3, lineOld, timeduan, daypre, daynow) {
    ///<summary>绘制时间段折线图的方法</summary>
    ///<param name="contentid" type="String">折线图呈现标签</param>
    ///<param name="line" type="String">处理后的json数据</param>
    ///<param name="interval" type="String"></param>
    ///<param name="line_name" type="String">折线图名字</param>
    ///<param name="v_max" type="String">纵坐标最大值</param>
    ///<param name="v_min" type="String">纵坐标最小值</param>
    ///<param name="v_unitInterval" type="String">纵坐标间隔，用来划分标识</param>
    ///<param name="times" type="array">横坐标显示的时间标识点数组,eg:['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00']</param>
    ///<param name="v_unitInterval_time" type="String">横坐标每个时间点相隔距离时间</param>
    ///<param name="timeX1" type="String">0点前横坐标在坐标轴偏移量，用来修正坐标.</param>
    ///<param name="timeX2" type="String">0点后横坐标在坐标轴偏移量，用来修正坐标</param>
    ///<param name="timeX3" type="String">横坐标最后一个点时间值</param>
    ///<param name="lineOld" type="String">处理前的json数据（备用）</param>
    ///<param name="timeduan" type="String">当前最新数据所处时间段</param>
    ///<param name="daypre" type="String">最新数据上一天所处日期</param>
    ///<param name="daynow" type="String">最新数据所处日期
    line = line.split("|");
    lineOld = lineOld.split("|");

    line_name = line_name.split("|");
    var sampleData = new Array();
    var sampleData2 = new Array();
    maxIndex = line.length;
    var toIndex;

    for (var i = 0; i <= line.length - 1; i++) {
        sampleData[i] = eval("(" + line[i] + ")");
    }

    var daystart = times[0].substr(0, 2);
    var v_description = "";
    var index = -1;
    var i = -1;

    var settings = {
        title: "",
        description: "某电路最近24小时电流变化趋势图",
        enableAnimations: false,
        showLegend: true, //是否显示图例
        showBorderLine: false,
        backgroundColor: 'white',
        padding: { left: 10, top: 10, right: 20, bottom: 5 },
        titlePadding: { left: 40, top: 0, right: 0, bottom: 10 },
        source: sampleData,
        categoryAxis:
        {
            text: 'Category Axis',
            textRotationAngle: 0,
            dataField: 'Time',
            formatFunction: function (type) {

                return times[type / v_unitInterval_time].toString();
            },
            toolTipFormatFunction: function (type) {

                var hour = parseInt(type);
                var minutes = parseFloat(type) - hour;
                var hour2 = 0;

                if (hour <= (24 - timeX3)) {
                    hour2 = hour + Math.abs(timeX1);
                    if (hour2 == 24) {
                        hour2 = 0;
                    }
                } else {
                    hour2 = hour - Math.abs(timeX2);
                }
                if (hour2 == 24) {
                    hour2 = 0;
                }
                if (hour2 >= daystart) {
                    if (daystart == 0) {
                        return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    } else {
                        return daypre.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    }
                } else {
                    return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                }
            },
            showTickMarks: false,
            tickMarksStartInterval: 0,
            tickMarksInterval: 1,
            tickMarksColor: '#999999',
            unitInterval: v_unitInterval_time,
            showGridLines: false,

            gridLinesStartInterval: 0,
            gridLinesInterval: 3,
            gridLinesColor: '#999999',//横轴颜色
            axisSize: 'auto',
            minValue: 0,
            maxValue: 24
        },
        colorScheme: 'scheme05',
        seriesGroups:
                [
                    {
                        type: 'line',
                        showLabels: true,
                        lineWidth: 2,
                        valueAxis:
                        {
                            showGridLines: false,
                            unitInterval: v_unitInterval,
                            minValue: v_min,
                            maxValue: v_max,
                            description: '',
                            axisSize: 'auto',
                            gridLinesColor: '#999999'//纵轴颜色
                        },
                        series: [
                                { dataField: 'val1', displayText: '电流强度(A)', showLabels: false }
                        ]
                    }
                ]
    };
    $('#' + contentid).jqxChart(settings);
    //$('#' + contentid).find("rect").css({ "left": "-1", "top": "-1","border": "0", "width": (parseFloat($('#' + contentid).find("rect").width()) + 10) + "px", "height": (parseFloat($('#' + contentid).find("rect").height()) + 10) + "px" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").parent().css({ "filter": "" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").css({ "writing-mode": "tb-rl" });
}
function setLineDouble(contentid, line1,line2,interval, line_name, v_max, v_min, v_unitInterval, times, v_unitInterval_time, timeX1, timeX2, timeX3, line1Old, timeduan, daypre, daynow) {
    ///<summary>绘制时间段折线图的方法</summary>
    ///<param name="contentid" type="String">折线图呈现标签</param>
    ///<param name="line1" type="String">处理后的json数据1</param>
    ///<param name="line2" type="String">处理后的json数据2（当时间点不同时不能这样做，正在寻找方案，此处备用字段）</param>
    ///<param name="interval" type="String"></param>
    ///<param name="line_name" type="String">折线图名字</param>
    ///<param name="v_max" type="String">纵坐标最大值</param>
    ///<param name="v_min" type="String">纵坐标最小值</param>
    ///<param name="v_unitInterval" type="String">纵坐标间隔，用来划分标识</param>
    ///<param name="times" type="array">横坐标显示的时间标识点数组,eg:['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00']</param>
    ///<param name="v_unitInterval_time" type="String">横坐标每个时间点相隔距离时间</param>
    ///<param name="timeX1" type="String">0点前横坐标在坐标轴偏移量，用来修正坐标.</param>
    ///<param name="timeX2" type="String">0点后横坐标在坐标轴偏移量，用来修正坐标</param>
    ///<param name="timeX3" type="String">横坐标最后一个点时间值</param>
    ///<param name="line1Old" type="String">处理前的json数据（备用）</param>
    ///<param name="timeduan" type="String">当前最新数据所处时间段</param>
    ///<param name="daypre" type="String">最新数据上一天所处日期</param>
    ///<param name="daynow" type="String">最新数据所处日期
    line1 = line1.split("|");
    line1Old = line1Old.split("|");
    line2 = line2.split("|");
    line_name = line_name.split("|");
    var sampleData = new Array();
    var sampleData2 = new Array();
    maxIndex1 = line1.length;
    maxIndex2 = line2.length;
    var toIndex;

    for (var i = 0; i <= line1.length - 1; i++) {
        sampleData[i] = eval("(" + line1[i] + ")");
    }

    var daystart = times[0].substr(0, 2);
    var v_description = "";
    var index = -1;
    var i = -1;

    var settings = {
        title: "",
        description: "某两城市 PM 2.5 最近24小时的对比及变化图",
        enableAnimations: true,
        showLegend: true,//是否显示图例
        showBorderLine: false,
        backgroundColor: 'white',
        padding: { left: 10, top: 10, right: 20, bottom: 5 },
        titlePadding: { left: 40, top: 0, right: 0, bottom: 10 },
        source: sampleData,
        categoryAxis:
        {
            text: 'Category Axis',//
            textRotationAngle: 0,
            dataField: 'Time',
            formatFunction: function (type) {
                return times[type / v_unitInterval_time].toString();
            },
            toolTipFormatFunction: function (type) {

                var hour = parseInt(type);
                var minutes = parseFloat(type) - hour;
                var hour2 = 0;

                if (hour <= (24 - timeX3)) {
                    hour2 = hour + Math.abs(timeX1);
                    if (hour2 == 24) {
                        hour2 = 0;
                    }
                } else {
                    hour2 = hour - Math.abs(timeX2);
                }
                if (hour2 == 24) {
                    hour2 = 0;
                }
                if (hour2 >= daystart) {
                    if (daystart == 0) {
                        return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    } else {
                        return daypre.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    }
                } else {
                    return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                }
            },
            showTickMarks: false,
            tickMarksStartInterval: 0,
            tickMarksInterval: 1,
            tickMarksColor: '#999999',
            unitInterval: v_unitInterval_time,
            showGridLines: false,

            gridLinesStartInterval: 0,
            gridLinesInterval: 3,
            gridLinesColor: '#999999', //横轴颜色
            axisSize: 'auto',
            minValue: 0,
            maxValue: 24
        },
        colorScheme: 'scheme05',
        seriesGroups:
                [
                    {
                        type: 'line',
                        showLabels: true,
                        lineWidth: 2,
                        valueAxis:
                        {
                            showGridLines: false,
                            unitInterval: v_unitInterval,
                            minValue: v_min,
                            maxValue: v_max,
                            description: '',
                            axisSize: 'auto',
                            gridLinesColor: '#999999'//纵轴颜色
                        },
                        series: [
                                { dataField: 'val1', displayText: '城市A(PM 2.5)', showLabels: false, color: '#FF1493' },
                                { dataField: 'val2', displayText: '城市B(PM 2.5)', showLabels: false, color: '#1ABDE6' }
                        ]
                    }
                ]
    };
    $('#' + contentid).jqxChart(settings);
    //$('#' + contentid).find("rect").css({ "left": "-1", "top": "-1", "border": "0", "width": (parseFloat($('#' + contentid).find("rect").width()) + 10) + "px", "height": (parseFloat($('#' + contentid).find("rect").height()) + 10) + "px" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").parent().css({ "filter": "" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").css({ "writing-mode": "tb-rl" });
}
function setLineDoubleDif(contentid, line1, line2, interval, line_name, v_max_l, v_min_l,v_max_r,v_min_r, v_unitInterval, times, v_unitInterval_time, timeX1, timeX2, timeX3, line1Old, timeduan, daypre, daynow) {
    ///<summary>绘制时间段折线图的方法</summary>
    ///<param name="contentid" type="String">折线图呈现标签</param>
    ///<param name="line1" type="String">处理后的json数据1</param>
    ///<param name="line2" type="String">处理后的json数据2（当时间点不同时不能这样做，正在寻找方案，此处备用字段）</param>
    ///<param name="interval" type="String"></param>
    ///<param name="line_name" type="String">折线图名字</param>
    ///<param name="v_max_l" type="String">左纵坐标最大值</param>
    ///<param name="v_min_l" type="String">左纵坐标最小值</param>
    ///<param name="v_max_r" type="String">右纵坐标最大值</param>
    ///<param name="v_min_r" type="String">右纵坐标最小值</param>
    ///<param name="v_unitInterval" type="String">纵坐标间隔，用来划分标识</param>
    ///<param name="times" type="array">横坐标显示的时间标识点数组,eg:['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00']</param>
    ///<param name="v_unitInterval_time" type="String">横坐标每个时间点相隔距离时间</param>
    ///<param name="timeX1" type="String">0点前横坐标在坐标轴偏移量，用来修正坐标.</param>
    ///<param name="timeX2" type="String">0点后横坐标在坐标轴偏移量，用来修正坐标</param>
    ///<param name="timeX3" type="String">横坐标最后一个点时间值</param>
    ///<param name="line1Old" type="String">处理前的json数据（备用）</param>
    ///<param name="timeduan" type="String">当前最新数据所处时间段</param>
    ///<param name="daypre" type="String">最新数据上一天所处日期</param>
    ///<param name="daynow" type="String">最新数据所处日期
    line1 = line1.split("|");
    line1Old = line1Old.split("|");
    line2 = line2.split("|");
    line_name = line_name.split("|");
    var sampleData = new Array();
    var sampleData2 = new Array();
    maxIndex1 = line1.length;
    maxIndex2 = line2.length;
    var toIndex;

    for (var i = 0; i <= line1.length - 1; i++) {
        sampleData[i] = eval("(" + line1[i] + ")");
    }

    var daystart = times[0].substr(0, 2);
    var v_description = "";
    var index = -1;
    var i = -1;

    var settings = {
        title: "",
        description: "某两城市 PM 2.5 最近24小时的对比及变化图",
        enableAnimations: false,
        showLegend: true, //是否显示图例
        showBorderLine: false,
        backgroundColor: 'white',
        padding: { left: 10, top: 10, right: 20, bottom: 5 },
        titlePadding: { left: 40, top: 0, right: 0, bottom: 10 },
        source: sampleData,
        categoryAxis:
        {
            text: 'Category Axis', //
            textRotationAngle: 0,
            dataField: 'Time',
            formatFunction: function (type) {
                return times[type / v_unitInterval_time].toString();
            },
            toolTipFormatFunction: function (type) {

                var hour = parseInt(type);
                var minutes = parseFloat(type) - hour;
                var hour2 = 0;

                if (hour <= (24 - timeX3)) {
                    hour2 = hour + Math.abs(timeX1);
                    if (hour2 == 24) {
                        hour2 = 0;
                    }
                } else {
                    hour2 = hour - Math.abs(timeX2);
                }
                if (hour2 == 24) {
                    hour2 = 0;
                }
                if (hour2 >= daystart) {
                    if (daystart == 0) {
                        return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    } else {
                        return daypre.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                    }
                } else {
                    return daynow.replace("-", "年").replace("-", "月") + "日 " + hour2 + "时" + parseInt(minutes * 60) + "分";
                }
            },
            showTickMarks: false,
            tickMarksStartInterval: 0,
            tickMarksInterval: 1,
            tickMarksColor: '#999999',
            unitInterval: v_unitInterval_time,
            showGridLines: false,

            gridLinesStartInterval: 0,
            gridLinesInterval: 3,
            gridLinesColor: '#999999', //横轴颜色
            axisSize: 'auto',
            minValue: 0,
            maxValue: 24
        },
        colorScheme: 'scheme05',
        seriesGroups:
                [
                    {
                        type: 'line',
                        valueAxis:
                        {
							showLabels: true,
							lineWidth: 2,							
                            showGridLines: false,
                            unitInterval: v_unitInterval,
                            minValue: v_min_l,
                            maxValue: v_max_l,
                            description: '',
                            axisSize: 'auto',
                            gridLinesColor: '#999999'//纵轴颜色
                        },
                        series: [
                                { dataField: 'val1', displayText: '城市A(PM 2.5)', showLabels: false, color: '#FF1493' }
								]
                    },
                    {
                        type: 'line',
                        valueAxis:
                        {
							showLabels: true,
							lineWidth: 2,
                            showGridLines: false,
                            unitInterval: v_unitInterval,
                            minValue: v_min_r,
                            maxValue: v_max_r,
                            description: '',
                            axisSize: 'auto',
                            gridLinesColor: '#999999',//纵轴颜色
                            position:'right'
                        },
                        series: [
                                { dataField: 'val2', displayText: '城市B(PM 2.5)', showLabels: false, color: '#1ABDE6' }
                        ]
                    }
					
                ]
    };
    $('#' + contentid).jqxChart(settings);
    //$('#' + contentid).find("rect").css({ "left": "-1", "top": "-1", "border": "0", "width": (parseFloat($('#' + contentid).find("rect").width()) + 10) + "px", "height": (parseFloat($('#' + contentid).find("rect").height()) + 10) + "px" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").parent().css({ "filter": "" });
    //$('#' + contentid).find("span[class=jqx-chart-axis-description]").css({ "writing-mode": "tb-rl" });
}



function showline_24_4_1() {
    ///<summary>绘制最近24小时的坐标数据，每4小时一次的标记点</summary>
    var data = "129,50,228,33,2014-03-26 12:00:53|100,50,227,34,2014-03-26 12:10:53|87,50.1,228,34,2014-03-26 12:20:53|102,50.1,227,33,2014-03-26 12:30:53|179,50.1,228,35,2014-03-26 12:40:53|68,50.1,227,35,2014-03-26 12:50:53|71,50.1,226,34,2014-03-26 13:00:53|84,50,226,33,2014-03-26 13:10:53|68,50.1,226,32,2014-03-26 13:20:53|98,50,226,33,2014-03-26 13:30:53|104,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|118,50,226,33,2014-03-26 14:00:53|133,50,227,34,2014-03-26 14:10:53|110,50.1,226,35,2014-03-26 14:20:53|91,50.1,227,34,2014-03-26 14:30:53|44,50.1,226,33,2014-03-26 14:40:53|112,50,227,32,2014-03-26 14:50:53|84,50.1,227,31,2014-03-26 15:00:54|102,50.1,228,31,2014-03-26 15:10:54|88,50,227,32,2014-03-26 15:20:54|89,50,226,32,2014-03-26 15:30:54|73,50.1,226,32,2014-03-26 15:40:54|69,50.1,226,31,2014-03-26 15:50:54|64,50,226,30,2014-03-26 16:00:54|65,50.1,227,30,2014-03-26 16:10:54|60,50,226,30,2014-03-26 16:20:54|51,50.1,227,29,2014-03-26 16:30:54|40,50,227,29,2014-03-26 16:40:54|34,50,226,28,2014-03-26 16:50:54|25,50.1,227,28,2014-03-26 17:00:54|19,50,226,27,2014-03-26 17:10:54|14,50.1,226,25,2014-03-26 17:20:54|10,50.1,226,25,2014-03-26 17:30:54|6,50,226,23,2014-03-26 17:40:57|4,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|2,50,226,21,2014-03-26 18:10:54|2,50,226,21,2014-03-26 18:20:54|2,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:55|0,50,226,21,2014-03-26 22:50:55|0,50,226,21,2014-03-26 23:00:55|0,50,226,21,2014-03-26 23:10:55|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|7,50,228,13,2014-03-27 06:50:57|9,50,227,13,2014-03-27 07:00:57|10,50,227,14,2014-03-27 07:10:57|13,50,226,14,2014-03-27 07:20:57|18,50,227,14,2014-03-27 07:30:57|21,50,227,15,2014-03-27 07:40:58|18,50,226,16,2014-03-27 07:50:58|21,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|53,50,225,18,2014-03-27 08:40:58|43,50,225,18,2014-03-27 08:50:58|46,50.1,225,19,2014-03-27 09:00:58|63,50.1,225,19,2014-03-27 09:10:58|83,50.1,225,20,2014-03-27 09:20:58|43,50,224,20,2014-03-27 09:30:58|111,50,225,21,2014-03-27 09:40:58|08:00";
    var myarr = new Array();
    var str = "";
    var line = "";
    data = data.split("|"); 
    var timeduan = data[data.length - 1];
    var times = "";
    //时间X轴偏移量
    var timeX1 = 0;
    var timeX2 = 0;
    var timeX3 = parseInt(timeduan.substr(0, 2).toString(), 10) + 4;
    var daynow = ""; //当前年月日
    var daypre = ""; //当前前一天年月日
    var daystart = 0; //横坐标起始时间点
    //构造时间范围
    if (timeduan == "08:00") {
        timeX1 = -12;
        timeX2 = 12;
        times = ['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00'];
    } else if (timeduan == "12:00") {
        timeX1 = -16;
        timeX2 = 8;
        times = ['16:00', '20:00', '00:00', '04:00', '08:00', '12:00', '16:00'];
    } else if (timeduan == "16:00") {
        timeX1 = -20;
        timeX2 = 4;
        times = ['20:00', '00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    } else if (timeduan == "20:00") {
        timeX1 = 0;
        timeX2 = 0;
        times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];
    } else if (timeduan == "00:00") {
        timeX1 = -4;
        timeX2 = 20;
        times = ['04:00', '08:00', '12:00', '16:00', '20:00', '00:00', '04:00'];
    } else if (timeduan == "04:00") {
        timeX1 = -8;
        timeX2 = 16;
        times = ['08:00', '12:00', '16:00', '20:00', '00:00', '04:00', '08:00'];
    }

    for (var i = 0; i < data.length - 1; i++) {
        var datadetail = data[i].split(",");
        var hour = parseFloat(datadetail[4].substr(11, 2));
        var minutes = parseFloat(datadetail[4].substr(14, 2) / 60);
        if (i == 0) {
            if (hour >= timeX3) {
                line = "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
            } else {
                line = "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
            }
            line2 = "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
        } else {
            if (hour >= timeX3) {
                line = line + "|" + "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
            } else {
                line = line + "|" + "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
            }
            line2 = line2 + "|" + "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0] + "\"}";
        }
        //第一笔
        if (i == 0) {
            daypre = datadetail[4].substr(0, 10);
        } else if (i == data.length - 3) { //倒数第二笔（最后一笔是时间段）
            daynow = datadetail[4].substr(0, 10);
        }

    }
    setLine("div_line1", line, "", "", 300, 0, 100, times, 4, timeX1, timeX2, timeX3, line2, timeduan, daypre, daynow); //线A
}

function showline_24_2_1() {
    ///<summary>绘制最近24小时的坐标数据，每2小时一次的标记点</summary>
    var data = "2014-03-26 10:00:52,281|2014-03-26 10:10:52,190|2014-03-26 10:20:53,275|2014-03-26 10:50:53,256|2014-03-26 11:00:53,284|2014-03-26 11:10:53,98|2014-03-26 11:20:53,288|2014-03-26 11:30:53,206|2014-03-26 11:40:53,184|2014-03-26 11:50:53,192|2014-03-26 12:00:53,254|2014-03-26 12:10:53,199|2014-03-26 12:20:53,172|2014-03-26 12:30:53,202|2014-03-26 12:40:53,357|2014-03-26 12:50:53,135|2014-03-26 13:00:53,141|2014-03-26 13:10:53,167|2014-03-26 13:20:53,135|2014-03-26 13:30:53,193|2014-03-26 13:40:53,206|2014-03-26 13:50:53,104|2014-03-26 14:00:53,234|2014-03-26 14:10:53,263|2014-03-26 14:20:54,217|2014-03-26 14:30:53,180|2014-03-26 14:40:54,87|2014-03-26 14:50:54,221|2014-03-26 15:00:54,166|2014-03-26 15:10:54,201|2014-03-26 15:20:54,173|2014-03-26 15:30:54,176|2014-03-26 15:40:54,143|2014-03-26 15:50:54,136|2014-03-26 16:00:54,125|2014-03-26 16:10:54,128|2014-03-26 16:20:54,117|2014-03-26 16:30:54,99|2014-03-26 16:40:54,78|2014-03-26 16:50:54,66|2014-03-26 17:00:54,48|2014-03-26 17:10:54,37|2014-03-26 17:20:54,27|2014-03-26 17:30:54,19|2014-03-26 17:40:54,11|2014-03-26 17:50:54,7|2014-03-26 18:00:54,4|2014-03-26 18:10:54,3|2014-03-26 18:20:54,3|2014-03-26 18:30:54,3|2014-03-26 18:40:54,0|2014-03-26 18:50:54,0|2014-03-26 19:00:54,0|2014-03-26 19:10:54,0|2014-03-26 19:20:55,0|2014-03-26 19:30:55,0|2014-03-26 19:40:55,0|2014-03-26 19:50:55,0|2014-03-26 20:00:55,0|2014-03-26 20:10:55,0|2014-03-26 20:20:55,0|2014-03-26 20:30:55,0|2014-03-26 20:40:55,0|2014-03-26 20:50:55,0|2014-03-26 21:00:55,0|2014-03-26 21:10:55,0|2014-03-26 21:20:55,0|2014-03-26 21:30:55,0|2014-03-26 21:40:55,0|2014-03-26 21:50:55,0|2014-03-26 22:00:55,0|2014-03-26 22:10:55,0|2014-03-26 22:20:55,0|2014-03-26 22:30:55,0|2014-03-26 22:40:56,0|2014-03-26 22:50:55,0|2014-03-26 23:00:56,0|2014-03-26 23:10:55,0|2014-03-26 23:20:56,0|2014-03-26 23:30:56,0|2014-03-26 23:40:56,0|2014-03-26 23:50:56,0|2014-03-27 00:00:56,0|2014-03-27 00:10:56,0|2014-03-27 00:20:56,0|2014-03-27 00:30:56,0|2014-03-27 00:40:56,0|2014-03-27 01:01:17,0|2014-03-27 01:10:56,3|2014-03-27 01:21:17,3|2014-03-27 01:30:56,0|2014-03-27 01:40:56,0|2014-03-27 01:50:56,0|2014-03-27 02:00:56,0|2014-03-27 02:10:56,0|2014-03-27 02:20:56,0|2014-03-27 02:30:56,0|2014-03-27 02:40:56,0|2014-03-27 02:50:56,0|2014-03-27 03:00:56,0|2014-03-27 03:10:56,0|2014-03-27 03:20:56,0|2014-03-27 03:30:56,0|2014-03-27 03:40:56,0|2014-03-27 03:50:56,0|2014-03-27 04:00:56,0|2014-03-27 04:10:56,0|2014-03-27 04:20:57,0|2014-03-27 04:30:57,0|2014-03-27 04:40:57,0|2014-03-27 04:50:57,0|2014-03-27 05:00:57,0|2014-03-27 05:10:57,0|2014-03-27 05:20:57,0|2014-03-27 05:30:57,0|2014-03-27 05:40:57,0|2014-03-27 05:50:57,0|2014-03-27 06:00:57,0|2014-03-27 06:10:57,4|2014-03-27 06:20:57,4|2014-03-27 06:30:57,6|2014-03-27 06:41:01,6|2014-03-27 06:50:57,13|2014-03-27 07:00:57,17|2014-03-27 07:10:57,20|2014-03-27 07:20:58,25|2014-03-27 07:30:58,36|2014-03-27 07:40:58,42|2014-03-27 07:50:58,35|2014-03-27 08:00:58,41|2014-03-27 08:10:58,70|2014-03-27 08:20:58,62|2014-03-27 08:30:58,60|2014-03-27 08:40:58,105|2014-03-27 08:50:58,85|2014-03-27 09:00:58,91|2014-03-27 09:10:58,125|2014-03-27 09:20:58,165|2014-03-27 09:30:58,86|2014-03-27 09:40:58,222|08:00";
    var myarr = new Array();
    data = data.split("|");
    var timeduan = data[data.length - 1];
    var times = "";
    //时间X轴偏移量
    var timeX1 = 0;
    var timeX2 = 0;
    var timeX3 = parseInt(timeduan.substr(0, 2).toString(), 10) + 2;
    var daynow = ""; //当前年月日
    var daypre = ""; //当前前一天年月日
    //构造时间范围
    if (timeduan == "00:00") {
        timeX1 = -2;
        timeX2 = 22;
        times = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00'];
    } else if (timeduan == "02:00") {
        timeX1 = -4;
        timeX2 = 20;
        times = ['04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00'];
    } else if (timeduan == "04:00") {
        timeX1 = -6;
        timeX2 = 18;
        times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00'];
    } else if (timeduan == "06:00") {
        timeX1 = -8;
        timeX2 = 16;
        times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00'];
    } else if (timeduan == "08:00") {
        timeX1 = -10;
        timeX2 = 14;
        //timeX2=10;
        times = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00'];
    } else if (timeduan == "10:00") {
        timeX1 = -12;
        timeX2 = 12;
        times = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00'];
    } else if (timeduan == "12:00") {
        timeX1 = -14;
        timeX2 = 10;
        times = ['14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'];
    } else if (timeduan == "14:00") {
        timeX1 = -16;
        timeX2 = 8;
        times = ['16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
    } else if (timeduan == "16:00") {
        timeX1 = -18;
        timeX2 = 6;
        times = ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    } else if (timeduan == "18:00") {
        timeX1 = -20;
        timeX2 = 4;
        times = ['20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    } else if (timeduan == "20:00") {
        timeX1 = -22;
        timeX2 = 2;
        times = ['22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    } else if (timeduan == "22:00") {
        timeX1 = 0;
        timeX2 = 0;
        times = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
    }

    var index = 0;
    var line = "";
    var line2 = "";
    //2014-03-14 09:09:57
    var daynow = ""; //当前年月日
    var daypre = ""; //当前前一天年月日
    for (var i = 0; i < data.length - 1; i++) {
        var datadetail = data[i].split(",");
        var hour = parseFloat(datadetail[0].substr(11, 2));
        var minutes = parseFloat(datadetail[0].substr(14, 2) / 60);
        if (i == 0) {
            if (hour >= timeX3) {
                line = "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
            } else {
                line = "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
            }
            line2 = "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
        } else {
            if (hour >= timeX3) {
                line = line + "|" + "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
            } else {
                line = line + "|" + "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
            }
            line2 = line2 + "|" + "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[1] + "\"}";
        }
        //第一笔
        if (i == 0) {
            daypre = datadetail[0].substr(0, 10);
        } else if (i == data.length - 3) { //倒数第二笔
            daynow = datadetail[0].substr(0, 10);
        }
    }

    //var times = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    // '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    setLine("div_line2", line, "", "", 500, 0, 100, times, 2, timeX1, timeX2, timeX3, line2, timeduan, daypre, daynow);
}


function showline_24_4_2() {
    ///<summary>绘制最近24小时的坐标数据，每4小时一次的标记点</summary>
    var data1 = "129,50,228,33,2014-03-26 12:00:53|100,50,227,34,2014-03-26 12:10:53|87,50.1,228,34,2014-03-26 12:20:53|102,50.1,227,33,2014-03-26 12:30:53|179,50.1,228,35,2014-03-26 12:40:53|68,50.1,227,35,2014-03-26 12:50:53|71,50.1,226,34,2014-03-26 13:00:53|84,50,226,33,2014-03-26 13:10:53|68,50.1,226,32,2014-03-26 13:20:53|98,50,226,33,2014-03-26 13:30:53|104,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|118,50,226,33,2014-03-26 14:00:53|133,50,227,34,2014-03-26 14:10:53|110,50.1,226,35,2014-03-26 14:20:53|91,50.1,227,34,2014-03-26 14:30:53|44,50.1,226,33,2014-03-26 14:40:53|112,50,227,32,2014-03-26 14:50:53|84,50.1,227,31,2014-03-26 15:00:54|102,50.1,228,31,2014-03-26 15:10:54|88,50,227,32,2014-03-26 15:20:54|89,50,226,32,2014-03-26 15:30:54|73,50.1,226,32,2014-03-26 15:40:54|69,50.1,226,31,2014-03-26 15:50:54|64,50,226,30,2014-03-26 16:00:54|65,50.1,227,30,2014-03-26 16:10:54|60,50,226,30,2014-03-26 16:20:54|51,50.1,227,29,2014-03-26 16:30:54|40,50,227,29,2014-03-26 16:40:54|34,50,226,28,2014-03-26 16:50:54|25,50.1,227,28,2014-03-26 17:00:54|19,50,226,27,2014-03-26 17:10:54|14,50.1,226,25,2014-03-26 17:20:54|10,50.1,226,25,2014-03-26 17:30:54|6,50,226,23,2014-03-26 17:40:57|4,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|2,50,226,21,2014-03-26 18:10:54|2,50,226,21,2014-03-26 18:20:54|2,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:55|0,50,226,21,2014-03-26 22:50:55|0,50,226,21,2014-03-26 23:00:55|0,50,226,21,2014-03-26 23:10:55|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|7,50,228,13,2014-03-27 06:50:57|9,50,227,13,2014-03-27 07:00:57|10,50,227,14,2014-03-27 07:10:57|13,50,226,14,2014-03-27 07:20:57|18,50,227,14,2014-03-27 07:30:57|21,50,227,15,2014-03-27 07:40:58|18,50,226,16,2014-03-27 07:50:58|21,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|53,50,225,18,2014-03-27 08:40:58|43,50,225,18,2014-03-27 08:50:58|46,50.1,225,19,2014-03-27 09:00:58|63,50.1,225,19,2014-03-27 09:10:58|83,50.1,225,20,2014-03-27 09:20:58|43,50,224,20,2014-03-27 09:30:58|111,50,225,21,2014-03-27 09:40:58|08:00";
    var data2="125,50,228,33,2014-03-26 12:00:53|90,50,227,34,2014-03-26 12:10:53|80,50.1,228,34,2014-03-26 12:20:53|70,50.1,227,33,2014-03-26 12:30:53|178,50.1,228,35,2014-03-26 12:40:53|67,50.1,227,35,2014-03-26 12:50:53|70,50.1,226,34,2014-03-26 13:00:53|83,50,226,33,2014-03-26 13:10:53|67,50.1,226,32,2014-03-26 13:20:53|95,50,226,33,2014-03-26 13:30:53|102,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|116,50,226,33,2014-03-26 14:00:53|130,50,227,34,2014-03-26 14:10:53|107,50.1,226,35,2014-03-26 14:20:54|89,50.1,227,34,2014-03-26 14:30:53|43,50.1,226,33,2014-03-26 14:40:54|109,50,227,32,2014-03-26 14:50:54|82,50.1,227,31,2014-03-26 15:00:54|99,50.1,228,31,2014-03-26 15:10:54|85,50,227,32,2014-03-26 15:20:54|87,50,226,32,2014-03-26 15:30:54|70,50.1,226,32,2014-03-26 15:40:54|67,50.1,226,31,2014-03-26 15:50:54|55,50,226,30,2014-03-26 16:00:54|69,50.1,227,30,2014-03-26 16:10:54|50,50,226,30,2014-03-26 16:20:54|42,50.1,227,29,2014-03-26 16:30:54|30,50,227,29,2014-03-26 16:40:54|25,50,226,28,2014-03-26 16:50:54|18,50.1,227,28,2014-03-26 17:00:54|12,50,226,27,2014-03-26 17:10:54|10,50.1,226,25,2014-03-26 17:20:54|5,50.1,226,25,2014-03-26 17:30:54|5,50,226,23,2014-03-26 17:40:57|3,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|1,50,226,21,2014-03-26 18:10:54|1,50,226,21,2014-03-26 18:20:54|1,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:56|0,50,226,21,2014-03-26 22:50:56|0,50,226,21,2014-03-26 23:00:56|0,50,226,21,2014-03-26 23:10:56|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|6,50,228,13,2014-03-27 06:50:57|8,50,227,13,2014-03-27 07:00:58|10,50,227,14,2014-03-27 07:10:57|12,50,226,14,2014-03-27 07:20:58|18,50,227,14,2014-03-27 07:30:58|21,50,227,15,2014-03-27 07:40:58|17,50,226,16,2014-03-27 07:50:58|20,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|52,50,225,18,2014-03-27 08:40:58|30,50,225,18,2014-03-27 08:50:58|45,50.1,225,19,2014-03-27 09:00:58|62,50.1,225,19,2014-03-27 09:10:58|56,50.1,225,20,2014-03-27 09:20:58|70,50,224,20,2014-03-27 09:30:58|132,50,225,21,2014-03-27 09:40:58|08:00";
    var myarr = new Array();
    var str = "";
    var line = "";
    data1 = data1.split("|");
    data2 = data2.split("|");
    var timeduan = data1[data1.length - 1];
    var times = "";
    //时间X轴偏移量
    var timeX1 = 0;
    var timeX2 = 0;
    var timeX3 = parseInt(timeduan.substr(0, 2).toString(), 10) + 4;
    var daynow = ""; //当前年月日
    var daypre = ""; //当前前一天年月日
    var daystart = 0; //横坐标起始时间点
    //构造时间范围
    if (timeduan == "08:00") {
        timeX1 = -12;
        timeX2 = 12;
        times = ['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00'];
    } else if (timeduan == "12:00") {
        timeX1 = -16;
        timeX2 = 8;
        times = ['16:00', '20:00', '00:00', '04:00', '08:00', '12:00', '16:00'];
    } else if (timeduan == "16:00") {
        timeX1 = -20;
        timeX2 = 4;
        times = ['20:00', '00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    } else if (timeduan == "20:00") {
        timeX1 = 0;
        timeX2 = 0;
        times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];
    } else if (timeduan == "00:00") {
        timeX1 = -4;
        timeX2 = 20;
        times = ['04:00', '08:00', '12:00', '16:00', '20:00', '00:00', '04:00'];
    } else if (timeduan == "04:00") {
        timeX1 = -8;
        timeX2 = 16;
        times = ['08:00', '12:00', '16:00', '20:00', '00:00', '04:00', '08:00'];
    }

    for (var i = 0; i < data1.length - 1; i++) {
        var datadetail = data1[i].split(",");
        var datadetail2 = data2[i].split(",");		
        var hour = parseFloat(datadetail[4].substr(11, 2));
        var minutes = parseFloat(datadetail[4].substr(14, 2) / 60);
        if (i == 0) {
            if (hour >= timeX3) {
                line = "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\""+datadetail2[0]+"\"}";
            } else {
                line = "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\"" + datadetail2[0]+"\"}";
            }
            line2 = "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\"" + datadetail2[0]+ "\"}";
        } else {
            if (hour >= timeX3) {
                line = line + "|" + "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0]+ "\",val2:\"" + datadetail2[0] + "\"}";
            } else {
                line = line + "|" + "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0]+ "\",val2:\"" + datadetail2[0] + "\"}";
            }
            line2 = line2 + "|" + "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0]  + "\",val1:\"" + datadetail2[0] + "\"}";
        }
        //第一笔
        if (i == 0) {
            daypre = datadetail[4].substr(0, 10);
        } else if (i == data1.length - 3) { //倒数第二笔（最后一笔是时间段）
            daynow = datadetail[4].substr(0, 10);
        }

    }
    setLineDouble("div_line3", line,"", "", "", 300, 0, 100, times, 4, timeX1, timeX2, timeX3, line2, timeduan, daypre, daynow); //线A B
}
function showline_24_4_2_d() {
    ///<summary>绘制最近24小时的坐标数据，每4小时一次的标记点</summary>
    var data1 = "129,50,228,33,2014-03-26 12:00:53|100,50,227,34,2014-03-26 12:10:53|87,50.1,228,34,2014-03-26 12:20:53|102,50.1,227,33,2014-03-26 12:30:53|179,50.1,228,35,2014-03-26 12:40:53|68,50.1,227,35,2014-03-26 12:50:53|71,50.1,226,34,2014-03-26 13:00:53|84,50,226,33,2014-03-26 13:10:53|68,50.1,226,32,2014-03-26 13:20:53|98,50,226,33,2014-03-26 13:30:53|104,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|118,50,226,33,2014-03-26 14:00:53|133,50,227,34,2014-03-26 14:10:53|110,50.1,226,35,2014-03-26 14:20:53|91,50.1,227,34,2014-03-26 14:30:53|44,50.1,226,33,2014-03-26 14:40:53|112,50,227,32,2014-03-26 14:50:53|84,50.1,227,31,2014-03-26 15:00:54|102,50.1,228,31,2014-03-26 15:10:54|88,50,227,32,2014-03-26 15:20:54|89,50,226,32,2014-03-26 15:30:54|73,50.1,226,32,2014-03-26 15:40:54|69,50.1,226,31,2014-03-26 15:50:54|64,50,226,30,2014-03-26 16:00:54|65,50.1,227,30,2014-03-26 16:10:54|60,50,226,30,2014-03-26 16:20:54|51,50.1,227,29,2014-03-26 16:30:54|40,50,227,29,2014-03-26 16:40:54|34,50,226,28,2014-03-26 16:50:54|25,50.1,227,28,2014-03-26 17:00:54|19,50,226,27,2014-03-26 17:10:54|14,50.1,226,25,2014-03-26 17:20:54|10,50.1,226,25,2014-03-26 17:30:54|6,50,226,23,2014-03-26 17:40:57|4,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|2,50,226,21,2014-03-26 18:10:54|2,50,226,21,2014-03-26 18:20:54|2,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:55|0,50,226,21,2014-03-26 22:50:55|0,50,226,21,2014-03-26 23:00:55|0,50,226,21,2014-03-26 23:10:55|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|7,50,228,13,2014-03-27 06:50:57|9,50,227,13,2014-03-27 07:00:57|10,50,227,14,2014-03-27 07:10:57|13,50,226,14,2014-03-27 07:20:57|18,50,227,14,2014-03-27 07:30:57|21,50,227,15,2014-03-27 07:40:58|18,50,226,16,2014-03-27 07:50:58|21,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|53,50,225,18,2014-03-27 08:40:58|43,50,225,18,2014-03-27 08:50:58|46,50.1,225,19,2014-03-27 09:00:58|63,50.1,225,19,2014-03-27 09:10:58|83,50.1,225,20,2014-03-27 09:20:58|43,50,224,20,2014-03-27 09:30:58|111,50,225,21,2014-03-27 09:40:58|08:00";
    var data2="125,50,228,33,2014-03-26 12:00:53|90,50,227,34,2014-03-26 12:10:53|80,50.1,228,34,2014-03-26 12:20:53|70,50.1,227,33,2014-03-26 12:30:53|178,50.1,228,35,2014-03-26 12:40:53|67,50.1,227,35,2014-03-26 12:50:53|70,50.1,226,34,2014-03-26 13:00:53|83,50,226,33,2014-03-26 13:10:53|67,50.1,226,32,2014-03-26 13:20:53|95,50,226,33,2014-03-26 13:30:53|102,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|116,50,226,33,2014-03-26 14:00:53|130,50,227,34,2014-03-26 14:10:53|107,50.1,226,35,2014-03-26 14:20:54|89,50.1,227,34,2014-03-26 14:30:53|43,50.1,226,33,2014-03-26 14:40:54|109,50,227,32,2014-03-26 14:50:54|82,50.1,227,31,2014-03-26 15:00:54|99,50.1,228,31,2014-03-26 15:10:54|85,50,227,32,2014-03-26 15:20:54|87,50,226,32,2014-03-26 15:30:54|70,50.1,226,32,2014-03-26 15:40:54|67,50.1,226,31,2014-03-26 15:50:54|55,50,226,30,2014-03-26 16:00:54|69,50.1,227,30,2014-03-26 16:10:54|50,50,226,30,2014-03-26 16:20:54|42,50.1,227,29,2014-03-26 16:30:54|30,50,227,29,2014-03-26 16:40:54|25,50,226,28,2014-03-26 16:50:54|18,50.1,227,28,2014-03-26 17:00:54|12,50,226,27,2014-03-26 17:10:54|10,50.1,226,25,2014-03-26 17:20:54|5,50.1,226,25,2014-03-26 17:30:54|5,50,226,23,2014-03-26 17:40:57|3,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|1,50,226,21,2014-03-26 18:10:54|1,50,226,21,2014-03-26 18:20:54|1,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:56|0,50,226,21,2014-03-26 22:50:56|0,50,226,21,2014-03-26 23:00:56|0,50,226,21,2014-03-26 23:10:56|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|6,50,228,13,2014-03-27 06:50:57|8,50,227,13,2014-03-27 07:00:58|10,50,227,14,2014-03-27 07:10:57|12,50,226,14,2014-03-27 07:20:58|18,50,227,14,2014-03-27 07:30:58|21,50,227,15,2014-03-27 07:40:58|17,50,226,16,2014-03-27 07:50:58|20,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|52,50,225,18,2014-03-27 08:40:58|30,50,225,18,2014-03-27 08:50:58|45,50.1,225,19,2014-03-27 09:00:58|62,50.1,225,19,2014-03-27 09:10:58|56,50.1,225,20,2014-03-27 09:20:58|70,50,224,20,2014-03-27 09:30:58|132,50,225,21,2014-03-27 09:40:58|08:00";
    var myarr = new Array();
    var str = "";
    var line = "";
    data1 = data1.split("|");
    data2 = data2.split("|");
    var timeduan = data1[data1.length - 1];
    var times = "";
    //时间X轴偏移量
    var timeX1 = 0;
    var timeX2 = 0;
    var timeX3 = parseInt(timeduan.substr(0, 2).toString(), 10) + 4;
    var daynow = ""; //当前年月日
    var daypre = ""; //当前前一天年月日
    var daystart = 0; //横坐标起始时间点
    //构造时间范围
    if (timeduan == "08:00") {
        timeX1 = -12;
        timeX2 = 12;
        times = ['12:00', '16:00', '20:00', '00:00', '04:00', '08:00', '12:00'];
    } else if (timeduan == "12:00") {
        timeX1 = -16;
        timeX2 = 8;
        times = ['16:00', '20:00', '00:00', '04:00', '08:00', '12:00', '16:00'];
    } else if (timeduan == "16:00") {
        timeX1 = -20;
        timeX2 = 4;
        times = ['20:00', '00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    } else if (timeduan == "20:00") {
        timeX1 = 0;
        timeX2 = 0;
        times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];
    } else if (timeduan == "00:00") {
        timeX1 = -4;
        timeX2 = 20;
        times = ['04:00', '08:00', '12:00', '16:00', '20:00', '00:00', '04:00'];
    } else if (timeduan == "04:00") {
        timeX1 = -8;
        timeX2 = 16;
        times = ['08:00', '12:00', '16:00', '20:00', '00:00', '04:00', '08:00'];
    }

    for (var i = 0; i < data1.length - 1; i++) {
        var datadetail = data1[i].split(",");
        var datadetail2 = data2[i].split(",");		
        var hour = parseFloat(datadetail[4].substr(11, 2));
        var minutes = parseFloat(datadetail[4].substr(14, 2) / 60);
        if (i == 0) {
            if (hour >= timeX3) {
                line = "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\""+datadetail2[0]+"\"}";
            } else {
                line = "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\"" + datadetail2[0]+"\"}";
            }
            line2 = "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0] + "\",val2:\"" + datadetail2[0]+ "\"}";
        } else {
            if (hour >= timeX3) {
                line = line + "|" + "{Time:\"" + (hour + timeX1 + minutes) + "\",val1:\"" + datadetail[0]+ "\",val2:\"" + datadetail2[0] + "\"}";
            } else {
                line = line + "|" + "{Time:\"" + (hour + timeX2 + minutes) + "\",val1:\"" + datadetail[0]+ "\",val2:\"" + datadetail2[0] + "\"}";
            }
            line2 = line2 + "|" + "{Time:\"" + (hour + minutes) + "\",val1:\"" + datadetail[0]  + "\",val1:\"" + datadetail2[0] + "\"}";
        }
        //第一笔
        if (i == 0) {
            daypre = datadetail[4].substr(0, 10);
        } else if (i == data1.length - 3) { //倒数第二笔（最后一笔是时间段）
            daynow = datadetail[4].substr(0, 10);
        }

    }
    setLineDoubleDif("div_line4", line, "", "", "", 300, 0,600,0,100, times, 4, timeX1, timeX2, timeX3, line2, timeduan, daypre, daynow); //线A B
}
