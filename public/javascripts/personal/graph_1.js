jQuery(document).ready(function ($) {
    var pieChartCanvas_1 = $("#pieChart-1").get(0).getContext("2d");
    var pieChartCanvas_2 = $("#pieChart-2").get(0).getContext("2d");
    var pieChartCanvas_3 = $("#pieChart-3").get(0).getContext("2d");
    var pieChartCanvas_4 = $("#pieChart-4").get(0).getContext("2d");
    var taskChartCanvas = $("#taskChart").get(0).getContext("2d");
    var pieChart_1 = new Chart(pieChartCanvas_1);
    var pieChart_2 = new Chart(pieChartCanvas_2);
    var pieChart_3 = new Chart(pieChartCanvas_3);
    var pieChart_4 = new Chart(pieChartCanvas_4);
    var taskChart = new Chart(taskChartCanvas);
    var yart = [parseInt($(".A").html()), parseInt($(".B").html()), parseInt($(".C").html()), parseInt($(".D").html())]
    var yart_2 = [parseInt($(".A .m").html()), parseInt($(".A .f").html()), parseInt($(".B .m").html()), parseInt($(".B .f").html()), parseInt($(".C .m").html()), parseInt($(".C .f").html()), parseInt($(".D .m").html()), parseInt($(".D .f").html())]
    console.log(yart_2);
    var maxValue = 0;

    if (yart[0] == 0 && yart[1] == 0 && yart[2] == 0 && yart[3] == 0) {
        console.log("heret");
        $(".yart").addClass("deactivated");
        $(".yart-no-data").removeClass("deactivated");
    } else {
        $(".yart-no-data").addClass("deactivated");
        $(".yart").removeClass("deactivated");
    }

    if (yart_2[0] == 0 && yart_2[1] == 0) {
        console.log("heret");
        $(".yart-A").addClass("deactivated");
        $(".yart-A-no-data").removeClass("deactivated");
    } else {
        $(".yart-A-no-data").addClass("deactivated");
        $(".yart-A").removeClass("deactivated");
    }

    if (yart_2[2] == 0 && yart_2[3] == 0) {
        console.log("heret");
        $(".yart-B").addClass("deactivated");
        $(".yart-B-no-data").removeClass("deactivated");
    } else {
        $(".yart-B-no-data").addClass("deactivated");
        $(".yart-B").removeClass("deactivated");
    }

    if (yart_2[4] == 0 && yart_2[5] == 0) {
        console.log("heret");
        $(".yart-C").addClass("deactivated");
        $(".yart-C-no-data").removeClass("deactivated");
    } else {
        $(".yart-C-no-data").addClass("deactivated");
        $(".yart-C").removeClass("deactivated");
    }

    if (yart_2[6] == 0 && yart_2[7] == 0) {
        console.log("heret");
        $(".yart-D").addClass("deactivated");
        $(".yart-D-no-data").removeClass("deactivated");
    } else {
        $(".yart-D-no-data").addClass("deactivated");
        $(".yart-D").removeClass("deactivated");
    }

    var data = {
        a: yart[0],
        b: yart[1],
        c: yart[2],
        d: yart[3]
    };

    var PieData_1 = [
        {
            value: yart_2[0],
            color: "#3f1363",
            highlight: "#3f1363",
            label: "Male"
        },
        {
            value: yart_2[1],
            color: "#56118fb4",
            highlight: "#56118fb4",
            label: "Female"
        }
    ];

    var PieData_2 = [
        {
            value: yart_2[2],
            color: "#3f1363",
            highlight: "#3f1363",
            label: "Male"
        },
        {
            value: yart_2[3],
            color: "#56118fb4",
            highlight: "#56118fb4",
            label: "Female"
        }
    ];

    var PieData_3 = [
        {
            value: yart_2[4],
            color: "#3f1363",
            highlight: "#3f1363",
            label: "Male"
        },
        {
            value: yart_2[5],
            color: "#56118fb4",
            highlight: "#56118fb4",
            label: "Female"
        }
    ];

    var PieData_4 = [
        {
            value: yart_2[6],
            color: "#3f1363",
            highlight: "#3f1363",
            label: "Male"
        },
        {
            value: yart_2[7],
            color: "#56118fb4",
            highlight: "#56118fb4",
            label: "Female"
        }
    ];

    var taskData = [
        {
            value: 40,
            color: "#3f1363",
            highlight: "#3f1363",
            label: "Complete"
        },

        {
            value: 100 - 40,
            color: "#8a2671",
            highlight: "#8a2671",
            label: "Incomplete"
        },
    ];

    var pieOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 200,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

    var taskOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 80, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 200,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };


    for (var i in data) {
        if (data[i] > maxValue) {
            maxValue = data[i]
        }
    }

    maxValue = Math.ceil((maxValue / 10) * 1.1) * 10
    var halfValue = maxValue / 2
    $('.max').html('<span>' + maxValue + '</span>')
    $('.half').html('<span>' + halfValue + '</span>')

    var barsHtml = ''
    for (var i in data) {
        var num = data[i]
        var percent = (num / maxValue * 100)
        barsHtml += '\
                        <li>\
                            <div data-height="' + percent + '" class="bar">\
                                <div class="per">' + num + '</div>\
                            </div>\
                            <span>' + i.toUpperCase() + '</span>\
                        </li>'
    }

    $('.bars').html(barsHtml)

    setTimeout(function () {
        $(".bars li .bar").each(function (key, bar) {
            var $this = $(this)
            $this.css('height', $this.attr('data-height') + '%')
        })
    }, 0);

    pieChart_1.Doughnut(PieData_1, pieOptions);
    pieChart_2.Doughnut(PieData_2, pieOptions);
    pieChart_3.Doughnut(PieData_3, pieOptions);
    pieChart_4.Doughnut(PieData_4, pieOptions);
    taskChart.Doughnut(taskData, taskOptions);

});