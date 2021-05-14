// jQuery(document).ready(function ($) {
var error = $(".error");
var sidebarToggler = $("#sideBarToggler");
var closeSidebar = $(".close-sidebar");
var window_width = $(window).width();
var sideBar = $("#sideBar");
var mainPanel = $(".main-content");
var dates = $(".pretty-date");
var openMdl_5 = $(".mdl-task-form");
var modal = $(".modal");
var closeModl = $(".close-modal");
var statuy = $(".custom-control-input");
var submitTask = $('#submitTask');
var editTask = $(".edit-task");
var infoTask = $(".task-info");
var deleteTask = $(".delete-task");
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var socket = io('http://localhost:3000');
var user_id = user_id;
console.log(user_id);
socket.emit("user_connected", user_id);
var count = parseInt($(".info-count").html());

if (window_width <= 991) {
    if (!$(".side-nav li").hasClass("mob")) {
        var html = `<li class="nav-item mob">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-search"></i>
                            
                            <input type="text" class="form-control" placeholder="What are you looking for..." aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %> mob">
                    <a class="nav-link" href="sponsors.html">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
        $(".side-nav").prepend(html);
    }
} else {
    if ($(".side-nav li").length > 6) {
        $(".side-nav li").eq(0).remove();
        $(".side-nav li").eq(0).remove();
    }
}

for (var i = 0; i < $(".card-title").length; i++) {
    if ($($(".card-title")[i]).html().trim() == "") {
        $($(".card-title")[i]).html("0");
        console.log($($(".card-title")[i]).html())
    }
}



for (var t = 0; t < dates.length; t++) {
    var date = prettyDate($(dates[t]).html().trim());
    $(dates[t]).html(date);
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
}

//Function date is greater than today
function dateGreater(date) {
    var today = new Date();
    var d = new Date(date);

    if (d > today) {
        return true;
    } else {
        return false;
    }
}

//Function to acativate Tool Tip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//Function to adjust sidebar on window size change
$(window).on('resize', function () {
    var width = $(window).width();
    if (width <= 991) {
        if (!$(".side-nav li").hasClass("mob")) {
            var html = `<li class="nav-item mob">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-search"></i>
                            
                            <input type="text" class="form-control" placeholder="What are you looking for..." aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %> mob">
                    <a class="nav-link" href="sponsors.html">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
            $(".side-nav").prepend(html);
        }
    } else {
        if ($(".side-nav li").length > 6) {
            $(".side-nav li").eq(0).remove();
            $(".side-nav li").eq(0).remove();
        }


    }
});

//
// $(document).on("click",  function(e) {
//     // console.log(e.target);
// });

//Function to open and close sidebar in mobile view
sidebarToggler.on("click", function (e) {
    e.preventDefault();
    sideBar.toggleClass("show");
    $(".overlay").removeClass("deactivated");
    if (sidebarToggler.hasClass("show")) {
        $(".logo").css({ "display": "none" })
    }
});

//Function To Close Sidebar Mobile VIEW
closeSidebar.on("click", function (e) {
    //console.log("yep");
    e.preventDefault();
    sideBar.removeClass("show");
    $(".overlay").addClass("deactivated");
});

//If Over Lay is Clicked
$(".overlay").on("click", function (e) {
    e.preventDefault();
    sideBar.removeClass("show");
    $(".overlay").addClass("deactivated");
});

//
mainPanel.on("click", function (e) {
    // console.log(e.target);
    if (!$(e.target).hasClass("fa-bars") && !$(e.target).hasClass("icon-reorder")) {
        sideBar.removeClass("show");
    }

});

//Function to close Modal
closeModl.on("click", function (e) {
    modal.modal("hide");
});

//Function to Open Modal
openMdl_5.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var mdl = $("#addTaskModalForm");
    $("input").val("");
    $("textarea").val("");
    $("input").removeAttr("disabled");
    $("textarea").removeAttr("disabled");
    submitTask.attr("data-type", "");
    submitTask.attr("data-id", "");
    mdl.modal("show");
    //content.css({"position":"static", "top" : "none"});
});

//Function To Change Status
statuy.on("change", function (e) {
    var ID = $(this).attr("id").split("-")[1];
    var value = $(this).val();
    var url = "/envoy/Task/change_status";
    var data = { id: ID, status: value };

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        beforeSend: function () {
            Swal.fire({
                title: 'Auto close alert!',
                html: 'Please Hold on as your details are uploaded, do not refresh.',
                timer: 40000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        },
        success: function (data) {
            console.log(data.success);
            if (data.success) {
                modal.modal("hide");
                Swal.fire(data.success, "Click OK to Proceed", "success").then(
                    function () {
                        location.reload();
                    }
                )
            } else if (data.url) {
                location.replace(data.url);
            }
            else {
                error.html("");
                msg = "<span class='alert alert-success'>" + data.error + "</span>";
                error.html(msg);
            }

        }
    });
});

//Create a task
submitTask.on("click", function (e) {
    e.preventDefault();
    $(".form-group .text-danger").html("");
    var task_to = $("#to").val();
    var task_subj = $("#subject").val();
    var task_desc = $("#description").val();
    var category = "task";
    var task_due = $("#due").val();
    var msg = "";
    var typen = $(this).attr("data-type");

    if (task_to == "") {
        msg = "Invalid or No Value for Task To Field.";
        $(".to-error").html(msg);
    } else if (task_subj == "" || task_subj.split(" ").length >= 100) {
        msg = "Invalid or No Value for Task Subject Field or words more than 100.";
        $(".subject-error").html(msg);
    } else if (task_desc == "") {
        msg = "Invalid or No Value for description Field.";
        $(".description-error").html(msg);
    } else if (task_due != "" && !(dateGreater(task_due))) {
        msg = "Invalid or No Value for Task Due Date Field.";
        $(".due-error").html(msg);
    } else {
        if (msg == "") {
            task_subj = task_subj.charAt(0).toUpperCase() + task_subj.substr(1).toLowerCase();

            if (typen && typen == "edit") {
                var td = {
                    sender: user_id,
                    receiver: task_to.trim(),
                    subject: task_subj,
                    category: category,
                    desc: task_desc,
                    due: task_due,
                    count: count,
                    ID: $(this).attr("data-id")
                }
            } else {
                var td = {
                    sender: user_id,
                    receiver: task_to.trim(),
                    subject: task_subj,
                    category: category,
                    desc: task_desc,
                    due: task_due,
                    count: count,
                }
            }

            console.log(td);

            socket.emit("send_task", td);

            socket.on('new_task_succeded', function (data) {
                console.log(data);
                modal.modal("hide");
                Swal.fire({
                    icon: "success",
                    title: data.success,
                    text: "Click OK to Continue",
                    showCancelButton: false,
                    confirmButtonText: `OK`,
                    allowOutsideClick: false,
                }).then((result) => {
                    location.reload();
                });
            });


        }
    }
});

//Function to Delete Task
deleteTask.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var ID = $(this).attr("data-id");
    var url = $(this).attr("data-url");
    var data = { id: ID };

    Swal.fire({
        icon: 'question',
        title: 'Are you Sure you want to Delete ?',
        text: 'This will permanently delete this profile, click yes to confirm',
        showCancelButton: true,
        confirmButtonText: `Yes`,
        cancelButtonText: `No`,
        allowOutsideClick: false,
    }).then(async (result) => {
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
                            title: 'Delete Operation Successful',
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
                            title: 'Delete Operation Un-successful',
                            text: data.error,
                        });
                    }
                }
            });
        }
    });

});

//Function to edit task
editTask.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var mdl = $("#addTaskModalForm");
    var ID = $(this).attr("data-id");
    var url = $(this).attr("data-url");
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

            //console.log(data.type);
            if (data.success) {

                if (type[1] == "modal") {
                    console.log(data.success.due_date);
                    $(".card-modal-description").html("Edit " + data.success.message_topic + " Task");
                    $("#subject").val(data.success.message_topic);
                    $("#due").val(data.success.due_date.split("Z")[0]);
                    $("#description").val(data.success.message);
                    // $("#dob").val(data.success.dob.split("T")[0]);
                    submitTask.attr("data-type", "edit");
                    submitTask.attr("data-id", ID);
                    mdl.modal("show");
                }

            } else if (data.url) {
                location.replace(data.url);
            }


        }
    });

});


//Function to see task infor
infoTask.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var mdl = $("#addTaskModalForm");
    var ID = $(this).attr("data-id");
    var url = $(this).attr("data-url");
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

            //console.log(data.type);
            if (data.success) {

                if (type[1] == "modal") {
                    console.log(data.success.due_date);
                    $("input").attr("disabled", "disabled");
                    $("textarea").attr("disabled", "disabled");
                    $(".card-modal-description").html("View " + data.success.message_topic + " Task Form");
                    $("#subject").val(data.success.message_topic);
                    $("#due").val(data.success.due_date.split("Z")[0]);
                    $("#description").val(data.success.message);
                    submitTask.addClass("deactivated");
                    mdl.modal("show");
                }

            } else if (data.url) {
                location.replace(data.url);
            }


        }
    });

});


$(".box").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var chatList = $(".chat-contacts");
    var chats = $(".chat-convo");
    var id = $(this).attr("data-id");
    var namey = $(this).attr("data-name");
    console.log($(this).attr("data-convo"));
    var convo = JSON.parse($(this).attr("data-convo"));
    var chat_area = $(".gratty");
    var html = ""

    if (convo.length <= 0) {
        chat_area.html("");
        html = `<div class="text-center my-3"><span class="between">No conversations yet</span></div>`;
        chat_area.html(html);
    } else {
        chat_area.html("");

        for (var y = 0; y < convo.length; y++) {
            if (convo[y].who == "sender") {
                html += `<div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2">
                                <span class="name">` + convo[y].name + `</span>
                                <p class="msg">` + convo[y].msg + `</p>
                            </div>
                            <div>
                                <img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" />
                            </div>
                        </div>`
            }

            if (convo[y].who == "receiver") {
                html += `<div class="d-flex align-items-center">
                            <div class="text-left pr-1">
                                <img src="https://img.icons8.com/color/40/000000/guest-female.png"
                                    width="30" class="img1" />
                            </div>
                            <div class="pr-2 pl-1">
                                <span class="name">` + convo[y].name + `</span>
                                <p class="msg">` + convo[y].msg + `</p>
                            </div>
                        </div>`
            }
        }
        chat_area.html(html);
    }

    console.log(namey);
    $(".name").html(namey)
    chatList.fadeOut('slow', function () {
        chats.fadeIn('slow');
        chats.removeClass('deactivated');
    });


});


$(".fa-chevron-left").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var chatList = $(".chat-contacts");
    var chats = $(".chat-convo");
    chats.fadeOut('slow', function () {
        chatList.fadeIn('slow');
        chatList.removeClass('deactivated');
    });


});

// });

