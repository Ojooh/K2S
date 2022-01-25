
jQuery(document).ready(function ($) {
    var loginBtn = $(".loginBtn");
    var error = $('.error');


    loginBtn.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        error.html("");
        var url = "/login";
        var username = $('#username').val();
        var password = $('#password').val();
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        var usernameRegex = /^[A-Z]+[-]+[0-9]+[0-9]$/i;
        // var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{7,15}$/;
        var msg = "";

        if (username == "" || password == "") {
            msg = "<span class='alert alert-success'>Please enter a valid username and passsword</span>";
            error.html(msg);
        }
        else if (usernameRegex.test(username) == false && emailRegex.test(username) == false) {
            msg = "<span class='alert alert-success'>Enter a valid username</span>";
            error.html(msg);
        }
        else if (password.length < 7) {
            msg = "<span class='alert alert-success'>Invalid Password</span>";
            error.html(msg);
        }
        else {
            error.html("")
            var data = {
                'email': username,
                'password': password,
            }

            $.ajax({
                url: url,
                data: data,
                type: "post",
                beforeSend: function () {
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'Please Hold on as your details are being confirmed',
                        timer: 40000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                },
                success: function (data) {
                    if (data.success) {

                        Swal.fire(data.success, "Click OK to proceed to Dashoboard", "success").then(
                            function () {
                                location.replace(data.url);
                            }
                        )
                    }
                    else {
                        swal.close();
                        msg = "<span class='alert alert-success'>" + data.error + "</span>";
                        error.html(msg);
                    }

                }
            });
        }
    });

});


