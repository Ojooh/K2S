// jQuery(document).ready(function ($) {
var error = $(".error");
var window_width = $(window).width();
var openMdl_5 = $(".mdl-task-form");
var modal = $(".modal");
var statuy = $(".custom-control-input");
var submitTask = $('#submitTask');
var editTask = $(".edit-task");
var infoTask = $(".task-info");
var deleteTask = $(".delete-task");
var startConvo = $(".start-convo");
var send = $(".warki");
var socket = io('http://localhost:3000');
var chat_id = "";
var user_id = user_id;
console.log(user_id);
socket.emit("user_connected", user_id);
var count = parseInt($(".info-count").html());




//Function date is greater than today
function dateGreater(date) {
    var today = new Date();
    var d = new Date(date);

    if (d > today) {
        return true;
    } else {
        return false;
    }
};

//Function to send message to receipient
function sendMessage(e, input, rec, sendy, rec_name, id) {
    // e.preventDefault();
    // e.stopPropagation();

    var msg = input.val();
    var receiver = rec;
    var sender = sendy;
    var data = {
        sender: sender,
        receiver: receiver,
        msg: msg,
        send_name: user_name,
        rec_name: rec_name
    };

    if (id && id != "") {
        data["id"] = id
    }

    console.log(data)

    socket.emit("send_message", data);

    if (id == undefined || id == "") {
        console.log("therey")
        socket.on("new_id", function (data) {
            send.attr("data-id", data);
            chat_id = data
        });
    } else {
        send.attr("data-id", data.id);

    }

    return msg
};

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
    submitTask.html("<i class='fas fa-plus'></i> Add Task");
    mdl.modal("show");
    //content.css({"position":"static", "top" : "none"});
});

//Function To Change Status
statuy.on("change", function (e) {
    var ID = $(this).attr("id").split("-")[1];
    var value = $(this).val();
    var url = $(this).attr("data-url");
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
        msg = "Invalid or No Value for Task Due Date, Date must be in the future.";
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
                    submitTask.html("<i class='fas fa-pencil-alt'></i> Edit Task");
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

//click on contact to see convos
$(".box").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var chatList = $(".chat-contacts");
    var chats = $(".chat-convo");
    var id = $(this).attr("data-id");
    var rec_id = $(this).attr("data-user");
    var namey = $(this).attr("data-name");
    // console.log($(this).attr("data-convo"));
    var convo = JSON.parse($(this).attr("data-convo"));
    var chat_area = $(".gratty");
    var html = ""
    send.attr("data-id", id);
    $("#send-message").attr("data-rec", rec_id + "*" + namey);

    if (convo.length <= 0) {
        chat_area.html("");
        html = `<div class="text-center my-3"><span class="between">No conversations yet</span></div>`;
        chat_area.html(html);
    } else {
        chat_area.html("");

        for (var y = 0; y < convo.length; y++) {
            if (convo[y].sender == user_id) {
                html += `<div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2">
                                <span class="name">You</span>
                                <p class="msg">` + convo[y].msg + `</p>
                            </div>
                            <div>
                                <img src="/images/profile/avatar/avatar.png" width="30" class="img1" />
                            </div>
                        </div>`
            }

            if (convo[y].receiver == user_id) {
                console.log("yep")
                html += `<div class="d-flex align-items-center">
                            <div class="text-left pr-1">
                                <img src="/images/profile/avatar/avatar_1.jpg"
                                    width="30" class="img1" />
                            </div>
                            <div class="pr-2 pl-1">
                                <span class="name">` + convo[y].rec_name + `</span>
                                <p class="msg">` + convo[y].msg + `</p>
                            </div>
                        </div>`
            }
        }
        chat_area.html(html);
    }

    // console.log(namey);
    $(".grame").html(namey)
    chatList.fadeOut('slow', function () {
        chats.fadeIn('slow');
        chats.removeClass('deactivated');
    });


});


//click the back button to see contact list
$(".fa-chevron-left").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    // var chatList = $(".chat-contacts");
    // var chats = $(".chat-convo");
    // chats.fadeOut('slow', function () {
    //     chatList.fadeIn('slow');
    //     chatList.removeClass('deactivated');
    // });
    location.reload();

});


//function to handle new convo
startConvo.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $.ajax({
        url: $(this).attr("data-url"),
        type: 'GET',
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
                var userList = {};
                var convos = [];
                $.each($(".box"), function (i, val) {
                    convos.push($(val).attr("data-user"))
                });
                for (var u = 0; u < data.success.length; u++) {
                    if (data.success[u].user_id != user_id && !convos.includes(data.success[u].user_id)) {
                        var key = data.success[u].user_id + "*" + data.success[u].fname + " " + data.success[u].lname;;
                        var value = data.success[u].user_id + " " + data.success[u].fname + " " + data.success[u].lname;
                        userList[key] = value;
                    }
                }


                Swal.fire({
                    title: 'Select User From List',
                    input: 'select',
                    inputOptions: userList,
                    inputPlaceholder: 'Select a User',
                    showCancelButton: true,
                    confirmButtonText: 'Start',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                        console.log(login);
                        if (login == "") {
                            Swal.showValidationMessage(
                                `Request failed: No User Was Selected`
                            )
                        }
                    }
                }).then((result) => {
                    if (result.value && result.value != "") {

                        var rar = result.value.split("*")
                        var receiver = rar[0];
                        var name = rar[1];
                        var chat_area = $(".gratty");
                        var chatList = $(".chat-contacts");
                        var chats = $(".chat-convo");
                        chat_area.html("");
                        html = `<div class="text-center my-3"><span class="between">No conversations yet</span></div>`;
                        chat_area.html(html);
                        $(".name").html(name)
                        $("#send-message").attr("data-rec", result.value);
                        chatList.addClass("deactivated");
                        chats.removeClass('deactivated');
                    }
                });

            } else if (data.url) {
                location.replace(data.url);
            }


        }
    });

});


//function to send a message
send.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var inputy = $("#send-message");
    var sender = user_id;
    var rec = inputy.attr("data-rec").split("*");
    var chat_area = $(".gratty");
    var id = $(this).attr("data-id");
    var html = $(".gratty").html();

    if (inputy.val() != "") {
        var msg = sendMessage(e, inputy, rec[0], sender, rec[1], id);

        html += `<div class="d-flex align-items-center text-right justify-content-end ">
                <div class="pr-2">
                    <span class="name">You</span>
                    <p class="msg">` + msg + `</p>
                </div>
                <div>
                    <img src="/images/profile/avatar/avatar.png" width="30" class="img1" />
                </div>
            </div>`
        chat_area.html(html);
        inputy.val("");
    }
});


//function to send a message on enter key for input
$("#send-message").keypress(async function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        e.preventDefault();
        e.stopPropagation();
        var inputy = $("#send-message");
        var sender = user_id;
        var rec = inputy.attr("data-rec").split("*");
        var chat_area = $(".gratty");
        var id = send.attr("data-id");
        console.log(id);
        var html = $(".gratty").html();
        if (inputy.val() != "") {
            var msg = await sendMessage(e, inputy, rec[0], sender, rec[1], id);

            html += `<div class="d-flex align-items-center text-right justify-content-end ">
                    <div class="pr-2">
                        <span class="name"> You </span>
                        <p class="msg">` + msg + `</p>
                    </div>
                    <div>
                        <img src="/images/profile/avatar/avatar.png" width="30" class="img1" />
                    </div>
                </div>`
            chat_area.html(html);
            inputy.val("");
        }

    }
});



// });

