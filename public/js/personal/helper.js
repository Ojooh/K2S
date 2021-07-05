jQuery(document).ready(function ($) {
    var dates = $(".pretty-date");
    var timeO = $(".time-only");
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var closeModal = $(".close-modal");
    var modal = $(".modal");
    var currency = $(".pretty-currency");

    for (var t = 0; t < timeO.length; t++) {
        var time = prettyTime($(timeO[t]).html().trim());
        $(timeO[t]).html(time);
    }

    for (var t = 0; t < dates.length; t++) {
        var date = prettyDate($(dates[t]).html().trim());
        $(dates[t]).html(date);
    }

    for (var t = 0; t < currency.length; t++) {
        var cur = prettyCurrency($(currency[t]).html().trim());
        $(currency[t]).html(cur);
    }


    for (var i = 0; i < $(".card-title").length; i++) {
        if ($($(".card-title")[i]).html().trim() == "") {
            $($(".card-title")[i]).html("0");
            console.log($($(".card-title")[i]).html())
        }
    }



    //function to make date-time pretty
    function prettyDate(date) {
        if (date != "0000-00-00 00:00:00") {
            var d = new Date(date);
            var day = d.getDate();
            var dayName = days[d.getDay()];
            var month = monthNames[d.getMonth()];
            var year = d.getFullYear();
            var h = d.getHours()
            var m = d.getMinutes();
            var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');
            var result = dayName + " " + day + " " + month + ", " + year + " " + _time;
            return result
        } else {
            return "Never";
        }
    };

    //function to format currency
    function prettyCurrency(amount) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        });

        return formatter.format(amount)
    }


    //function to make date-time pretty
    function prettyTime(date) {
        if (date != "0000-00-00 00:00:00") {
            var d = new Date(date);
            var h = d.getHours()
            var m = d.getMinutes();
            var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');
            var result = _time;
            return result
        } else {
            return "Never";
        }
    }

    //Function to make date pretty
    function prettyDateOnly(date) {
        if (date != "0000-00-00 00:00:00") {
            var d = new Date(date);
            var day = d.getDate();
            var dayName = days[d.getDay()];
            var month = monthNames[d.getMonth()];
            var year = d.getFullYear();
            var result = dayName + " " + day + " " + month + ", " + year;
            return result
        } else {
            return "Never";
        }
    };


    //Function to acativate Tool Tip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    closeModal.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        modal.modal("hide");

    });





});