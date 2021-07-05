jQuery(document).ready(function ($) {
    var filter = $(".dropdown-item");
    var filterDOB = $(".filter-dob");
    var dobBtn = $(".dob-btn");
    var vl = "";
    var order = $(".order");
    var search = $("#basic-addon1");
    var modal = $("#viewKidModal");
    var profile = $(".s-profile");
    var display = $(".list-tab-item");
    var adopt = $('#adoptKid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

    filterDOB.on("keydown", function (e) {

        var keys = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]

        if (keys.includes(parseInt(e.keyCode))) {
            vl += String.fromCharCode(e.keyCode)
            dobBtn.attr("data-dob", vl);
        } else {
            e.preventDefault()
        }

    })



    filter.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var param_1 = $(this).attr("data-data");
        var param_2 = $(this).attr("data-date");
        var param_3 = $(this).attr("data-dob");
        var order = $(this).attr("data-order");
        var url = "/sponsor/Kids/Filter";
        var data = {};

        if (param_1 != undefined) {
            url = url + "/filter=" + param_1 + "/date=0" + "/dob=0" + "/order=" + order + "/page=0";
            location.replace(url);
        } else if (param_2 != undefined) {
            url = url + "/filter=" + param_2 + "/date=1" + "/dob=0" + "/order=" + order + "/page=0";
            location.replace(url);
        } else if (param_3 != undefined) {
            url = url + "/filter=" + param_3 + "/date=0" + "/dob=1" + "/order=" + order + "/page=0";
            location.replace(url);
        }

    });


    order.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation()
        var action = $(this).attr("data-data");
        var url = window.location.href.split("order=");
        var fp = url[0] + "order=" + action + "/";
        var sp = url[1].split("/")[1]
        var new_url = fp + sp
        location.replace(new_url)

    });


    search.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var valhala = $(".kwy").val();
        if (valhala != "" && valhala != undefined) {
            var new_val = "kids-" + valhala;
            var url = "/sponsor/Kids/search/keyword=" + new_val + "/page=0";
            location.replace(url);
        }

    });

    //Function to Open Profile Modal
    profile.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        var url = $(this).attr("data-url");
        var mdl = modal
        var type = $(this).attr("data-type").split("-");
        var data = { id: ID, type: type[0], mode: type[1] };

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function () {
                Swal.fire({
                    title: 'Auto close alert!',
                    html: 'Please Hold on as Details are being Fetched.',
                    timer: 40000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            },
            success: function (data) {
                swal.close();
                if (data.success) {
                    adopt.attr("data-id", data.success.id);
                    adopt.attr("data-name", data.success.fname);
                    $(".card-modal-title").html(data.success.fname + " " + data.success.lname + " Profile");
                    $(".card-modal-description").html("Who is " + data.success.fname + " " + data.success.lname + "of the Kids To school Foundation.");
                    if (data.success.profile_photo != "") {
                        $(".avartart").attr('src', data.success.profile_photo);
                    } else {
                        $(".avartart").attr('src', '/images/profile/avatar/avatar.png');
                    }
                    var info = [{
                        'category': data.success.category,
                        'name': data.success.lname + " " + data.success.mname + " " + data.success.fname,
                        'D.O.B': data.success.dob.split("T")[0],
                        'age': data.success.age + " Yeras Old",
                        'gender': data.success.gender,
                        'country': data.success.country.split("-")[0] + ", " + data.success.state_o + " - " + data.success.state_r + "(" + data.success.lga + ")",
                        'email': "<a href='mailto:" + data.success.email + "'>" + data.success.email + "</a>",
                        'Tel': "<a href='tel:" + data.success.telephone + "'>" + data.success.telephone + "</a>",
                        'Home Address': data.success.address,
                        "Date Joined": prettyDate(data.success.dob),
                    },
                    {
                        "School Name": data.success.school_name,
                        "Level of study": data.success.los.split("-")[0] + " - " + data.success.class,
                        "School Address": data.success.school_address,
                        "School Fees": prettyCurrency(data.success.school_fees),
                        "Other Information": data.success.other_school_details,
                    },
                    {
                        "Parent Title": data.success.parent_title,
                        "Parent Name": data.success.parent_name,
                        "Parent Email": data.success.parent_email,
                        "Parent Tel": data.success.parent_telephone
                    },
                    {
                        "Story": data.success.story,
                        "Goal": data.success.goal,

                    }];

                    var data_html = "";
                    Object.keys(info[0]).forEach(function (key) {
                        var _html = `  <div class="data ml-3">
                                                <span>` + key + `</span>
                                                <div class="data-sub">
                                                    <span>`+ info[0][key] + `</span>
                                                </div>
                                            </div >`;
                        data_html += _html
                    });
                    $(".info").html(data_html);

                    var data_html = "";
                    Object.keys(info[1]).forEach(function (key) {
                        var _html = `  <div class="data ml-3">
                                                <span>` + key + `</span>
                                                <div class="data-sub">
                                                    <span>`+ info[1][key] + `</span>
                                                </div>
                                            </div >`;
                        data_html += _html
                    });
                    $(".s-info").html(data_html);

                    var data_html = "";
                    Object.keys(info[2]).forEach(function (key) {
                        var _html = `  <div class="data ml-3">
                                                <span>` + key + `</span>
                                                <div class="data-sub">
                                                    <span>`+ info[2][key] + `</span>
                                                </div>
                                            </div >`;
                        data_html += _html
                    });
                    $(".p-info").html(data_html);

                    var data_html = "";
                    Object.keys(info[3]).forEach(function (key) {
                        var _html = `  <div class="data ml-3">
                                                <span>` + key + `</span>
                                                <div class="data-sub">
                                                    <span>`+ info[3][key] + `</span>
                                                </div>
                                            </div >`;
                        data_html += _html
                    });
                    if (data.success.bc != "") {
                        var rarr = data.success.bc.split("/")
                        var name = rarr[rarr.length - 1];
                        var _html = `  <div class="data ml-3">
                                                <span>` + "Birth Certificate Doc" + `</span>
                                                <div class="data-sub">
                                                    <a href='` + data.success.bc + `'>
                                                        <span class='text-info'>`+ name + `</span>
                                                    </a>
                                                </div>
                                            </div >`;
                        data_html += _html;
                    } else {
                        var _html = `  <div class="data ml-3">
                                                <span>` + "Birth Certificate Doc" + `</span>
                                                <div class="data-sub">
                                                    <span class='text-info'> No Doc </span>
                                                </div>
                                            </div >`;
                        data_html += _html;
                    }
                    $(".pro-info").html(data_html);

                    mdl.modal("show");

                } else if (data.url) {
                    location.replace(data.url);
                }


            }
        });
    });

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
        console.log(data);

        $.ajax({
            url: "/Sponsor/Preference",
            type: "POST",
            data: data,
            success: function (data) {
                console.log(data)
                location.reload();
            }
        })
    });

    //Function to adopt kid
    adopt.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        var url = $(this).attr("data-url");
        var fname = $(this).attr("data-name");
        var sname = $(this).attr("data-sname");
        var data = { id: ID };
        var msg = `Dear ` + sname + ` you are about to agree to take on the financial responsibility of ` + fname;
        msg = msg.toUpperCase();

        modal.modal("hide");
        Swal.fire({
            icon: 'question',
            title: msg,
            text: 'If you are sure and ready for this financial commitment please click on Yes to confirm or click No to go back',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText: `No`,
            allowOutsideClick: false,
        }).then(async (result) => {
            console.log(result);
            if (result.value) {

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    beforeSend: function () {
                        Swal.fire({
                            title: 'Auto close alert!',
                            html: 'Please Hold on as Details are being Fetched.',
                            timer: 40000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                        });
                    },
                    success: function (data) {
                        swal.close();
                        if (data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Adoption Operation',
                                text: data.success,
                            }).then(
                                function () {
                                    location.reload();
                                }
                            );
                        } else if (data.url) {
                            location.replace(data.url);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Adoption Operation Un-successful',
                                // text: data.error,
                            });
                        }
                    }
                });
            }
        });
    });
});