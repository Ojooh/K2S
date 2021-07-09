var socket = io('http://localhost:3000');
// var user_id = user_id;
// console.log(user_id);
socket.emit("user_connected", user_id);

socket.on("new_task", function (data) {
    if (data.action == "reload") {
        location.reload();
    } else {
        console.log(data);
    }
});

socket.on("new_message", function (data) {
    // console.log(data);
    var html = $(".gratty").html();
    var chat_area = $(".gratty");
    if (data.sender == user_id) {
        html += `<div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2">
                                <span class="name">` + data.send_name + `</span>
                                <p class="msg">` + data.msg + `</p>
                            </div>
                            <div>
                                <img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" />
                            </div>
                        </div>`
    }

    if (data.receiver == user_id) {
        html += `<div class="d-flex align-items-center">
                    <div class="text-left pr-1">
                        <img src="https://img.icons8.com/color/40/000000/guest-female.png"
                            width="30" class="img1" />
                    </div>
                    <div class="pr-2 pl-1">
                        <span class="name">` + data.rec_name + `</span>
                        <p class="msg">` + data.msg + `</p>
                    </div>
                </div>`;
    }
    // console.log(html)
    chat_area.html("");
    chat_area.html(html);
});


$(".gotty").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(this).attr("data-id");
    var url_go = window.location.href;
    var url = $(this).attr("data-url");
    var data = { id: id };

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
                Swal.fire("Message Marked as Seen", "Click OK to Proceed", "success").then(
                    function () {
                        location.replace(url_go);
                    }
                );
            }
            else {
                Swal.fire("Message Not Marked as Seen", "Click OK to Proceed", "error").then(
                    function () {
                        location.reload();
                    }
                )
            }

        }
    });
});

