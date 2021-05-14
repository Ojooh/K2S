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

$(".dropdown-item").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(this).attr("data-id");
    var url_go = $(this).attr("href");
    var url = "/envoy/Message/seen";
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

