/// <reference path="jquery-1.10.2.min.js" />

function set_Line4(contentid, value, interval, line_name, v_max, v_min, v_unitInterval, times, v_unitInterval_time, timeX1, timeX2, timeX3, value2, timeduan, daypre, daynow) {
    temp_contentid = contentid;
    temp_value = value;
    temp_interval = interval;
    temp_line_name = line_name;

    value = value.split("|");
    value2 = value2.split("|");

    line_name = line_name.split("|");
    var sampleData = new Array();
    var sampleData2 = new Array();
    maxIndex = value.length;
    var toIndex;

    for (var i = 0; i <= value.length - 1; i++) {
        sampleData[i] = eval("(" + value[i] + ")");
    }

    var daystart = times[0].substr(0, 2);
    var v_description = "";
    var index = -1;
    var i = -1;

    var settings = {
        title: "",
        description: "",
        enableAnimations: true,
        showLegend: false,
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
    $('#' + contentid).find("rect").css({ "left": "-1", "top": "-1","border": "0", "width": (parseFloat($('#' + contentid).find("rect").width()) + 10) + "px", "height": (parseFloat($('#' + contentid).find("rect").height()) + 10) + "px" });
    $('#' + contentid).find("span[class=jqx-chart-axis-description]").parent().css({ "filter": "" });
    $('#' + contentid).find("span[class=jqx-chart-axis-description]").css({ "writing-mode": "tb-rl" });
}


function showmbA_line() {
        var data = "129,50,228,33,2014-03-26 12:00:53|100,50,227,34,2014-03-26 12:10:53|87,50.1,228,34,2014-03-26 12:20:53|102,50.1,227,33,2014-03-26 12:30:53|179,50.1,228,35,2014-03-26 12:40:53|68,50.1,227,35,2014-03-26 12:50:53|71,50.1,226,34,2014-03-26 13:00:53|84,50,226,33,2014-03-26 13:10:53|68,50.1,226,32,2014-03-26 13:20:53|98,50,226,33,2014-03-26 13:30:53|104,50,227,33,2014-03-26 13:40:53|52,50.1,226,33,2014-03-26 13:50:53|118,50,226,33,2014-03-26 14:00:53|133,50,227,34,2014-03-26 14:10:53|110,50.1,226,35,2014-03-26 14:20:53|91,50.1,227,34,2014-03-26 14:30:53|44,50.1,226,33,2014-03-26 14:40:53|112,50,227,32,2014-03-26 14:50:53|84,50.1,227,31,2014-03-26 15:00:54|102,50.1,228,31,2014-03-26 15:10:54|88,50,227,32,2014-03-26 15:20:54|89,50,226,32,2014-03-26 15:30:54|73,50.1,226,32,2014-03-26 15:40:54|69,50.1,226,31,2014-03-26 15:50:54|64,50,226,30,2014-03-26 16:00:54|65,50.1,227,30,2014-03-26 16:10:54|60,50,226,30,2014-03-26 16:20:54|51,50.1,227,29,2014-03-26 16:30:54|40,50,227,29,2014-03-26 16:40:54|34,50,226,28,2014-03-26 16:50:54|25,50.1,227,28,2014-03-26 17:00:54|19,50,226,27,2014-03-26 17:10:54|14,50.1,226,25,2014-03-26 17:20:54|10,50.1,226,25,2014-03-26 17:30:54|6,50,226,23,2014-03-26 17:40:57|4,50,226,22,2014-03-26 17:50:54|2,50,225,22,2014-03-26 18:00:54|2,50,226,21,2014-03-26 18:10:54|2,50,226,21,2014-03-26 18:20:54|2,50,226,21,2014-03-26 18:30:54|0,50,226,21,2014-03-26 18:40:54|0,50,226,21,2014-03-26 18:50:54|0,50,226,21,2014-03-26 19:00:54|0,50,226,21,2014-03-26 19:10:54|0,50,226,21,2014-03-26 19:20:55|0,50,226,21,2014-03-26 19:30:55|0,50,226,21,2014-03-26 19:40:55|0,50,226,21,2014-03-26 19:50:55|0,50,226,21,2014-03-26 20:00:55|0,50,226,21,2014-03-26 20:10:55|0,50,226,21,2014-03-26 20:20:55|0,50,226,21,2014-03-26 20:30:55|0,50,226,21,2014-03-26 20:40:55|0,50,226,21,2014-03-26 20:50:55|0,50,226,21,2014-03-26 21:00:55|0,50,226,21,2014-03-26 21:10:55|0,50,226,21,2014-03-26 21:20:55|0,50,226,21,2014-03-26 21:30:55|0,50,226,21,2014-03-26 21:40:55|0,50,226,21,2014-03-26 21:50:55|0,50,226,21,2014-03-26 22:00:55|0,50,226,21,2014-03-26 22:10:55|0,50,226,21,2014-03-26 22:20:55|0,50,226,21,2014-03-26 22:30:55|0,50,226,21,2014-03-26 22:40:55|0,50,226,21,2014-03-26 22:50:55|0,50,226,21,2014-03-26 23:00:55|0,50,226,21,2014-03-26 23:10:55|0,50,226,21,2014-03-26 23:20:56|0,50,226,21,2014-03-26 23:30:56|0,50,226,21,2014-03-26 23:40:56|0,50,226,21,2014-03-26 23:50:56|0,50,226,21,2014-03-27 00:00:56|0,50,226,21,2014-03-27 00:10:56|0,50,226,21,2014-03-27 00:20:56|0,50,226,21,2014-03-27 00:30:56|0,50,226,21,2014-03-27 00:40:56|0,50,226,21,2014-03-27 01:00:56|0,50,226,21,2014-03-27 01:10:56|0,50,226,21,2014-03-27 01:20:56|2,50.1,229,12,2014-03-27 06:10:57|2,50.1,229,13,2014-03-27 06:20:57|3,50,229,13,2014-03-27 06:30:57|3,50,228,13,2014-03-27 06:40:59|7,50,228,13,2014-03-27 06:50:57|9,50,227,13,2014-03-27 07:00:57|10,50,227,14,2014-03-27 07:10:57|13,50,226,14,2014-03-27 07:20:57|18,50,227,14,2014-03-27 07:30:57|21,50,227,15,2014-03-27 07:40:58|18,50,226,16,2014-03-27 07:50:58|21,50,226,16,2014-03-27 08:00:58|35,50,226,17,2014-03-27 08:10:58|31,50.1,226,17,2014-03-27 08:20:58|30,50.1,226,18,2014-03-27 08:30:58|53,50,225,18,2014-03-27 08:40:58|43,50,225,18,2014-03-27 08:50:58|46,50.1,225,19,2014-03-27 09:00:58|63,50.1,225,19,2014-03-27 09:10:58|83,50.1,225,20,2014-03-27 09:20:58|43,50,224,20,2014-03-27 09:30:58|111,50,225,21,2014-03-27 09:40:58|08:00";
        var myarr = new Array();
        var str = "";
        var line = "";
        //[Date.UTC(2014, 03, 14, 13, 30, 44), 164]
        data = data.split("|"); //data[i].split(",")
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
            } else if (i == data.length - 3) { //倒数第二笔
                daynow = datadetail[4].substr(0, 10);
            }

        }
        set_Line4("divmbl_line", line, "", "", 300, 0, 100, times, 4, timeX1, timeX2, timeX3, line2, timeduan, daypre, daynow); //线A
    }