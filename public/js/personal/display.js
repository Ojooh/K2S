jQuery(document).ready(function ($) {
    var display = $(".list-tab-item");

    //Function to change display
    display.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass("grid")) {

            var t = {};
            t["tab_grid"] = 'active';
            t["tab_list"] = '';
            t["row_grid"] = '';
            t["row_list"] = 'deactivated';

        }

        if ($(this).hasClass("listn")) {
            var t = {};
            t["tab_grid"] = '';
            t["tab_list"] = 'active';
            t["row_grid"] = 'deactivated';
            t["row_list"] = '';

        }

        var data = { "pref": JSON.stringify(t) };
        var url = $(this).attr("data-url");
        console.log(url);

        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (data) {
                console.log(data)
                location.reload();
            }
        })
    });

});