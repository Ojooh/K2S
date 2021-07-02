jQuery(document).ready(function ($) {
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



    if ($("#walletEmptyChart")[0] && $("#walletEmptyChart")[0] != undefined) {
        var walletEmptyChartCanvas = $("#walletEmptyChart").get(0).getContext("2d");
        var walletEmptyChart = new Chart(walletEmptyChartCanvas);
        var taskData = [

            {
                value: 100,
                color: "#8a2671",
                highlight: "#8a2671",
                label: "Empty Wallet"
            },
        ];
        walletEmptyChart.Doughnut(taskData, taskOptions);
    } else {
        var walletChartCanvas = $("#walletChart").get(0).getContext("2d");
        var walletChart = new Chart(walletChartCanvas);
        var yart_2 = [parseInt($(".A .q").html()), parseInt($(".A .a").html()), parseInt($(".A .d").html())];

        var wallChartData = [
            {
                value: yart_2[0],
                color: "#330f52e1",
                highlight: "#813ea0de",
                label: "Quick Savings"
            },
            {
                value: yart_2[1],
                color: "#bb6905",
                highlight: "#d1b07eb4",
                label: "Auto Savings"
            },

            {
                value: yart_2[2],
                color: "#04c7e0",
                highlight: "#c4eef3ce",
                label: "Donations"
            }
        ];




        walletChart.Doughnut(wallChartData, taskOptions);
    }

});