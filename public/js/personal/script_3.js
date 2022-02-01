jQuery(document).ready(function ($) {
    var error = $(".error");
    var openMdl_3 = $(".mdl-envoy-form");
    var modal = $(".modal");
    var dob = $("#dob");
    var age = $("#age");
    var deleteImage = $(".delete-image");
    var submitEnvoy = $('#submitEnvoy');
    var profilePic = $("#profilePic");
    var status = $(".custom-control-input")
    var editEnvoy = $(".edit-envoy");
    var deleteEnvoy = $(".delete-envoy");
    var profile = $(".profile");
    var viewPassword = $("#basic-addon12");
    var genPassword = $("#basic-addon2");
    var search = $("#basic-addon1");



    //Function to Open Modal
    openMdl_3.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addEnvoyModalForm");
        mdl.modal("show");
        $("input").val("")
        $("select").val("")
        $("textarea").val("")
        submitEnvoy.attr("data-url", "/admin/Envoys/add_envoy");
        submitEnvoy.attr("data-type", "add");
        profilePic.val("");
        $("#frame").attr("src", '');
        $(".filly").removeClass("deactivated");
        $(".prev").addClass("deactivated");
    });

    //Function To calculate and display age
    dob.on("change", function (e) {
        var d = new Date();
        var val = $(this).val();
        var date_divide = val.split("-");
        var user_year = date_divide[0];
        var current_year = d.getFullYear();
        var new_age = parseInt(current_year) - parseInt(user_year);
        age.val(new_age)
    });

    //Function To Preview Image
    profilePic.on("change", function (e) {
        $('.prev').removeClass("deactivated");
        $('#frame').attr('src', URL.createObjectURL(e.target.files[0]));
    });

    //Function To Submit Form
    submitEnvoy.on("click", function (e) {
        e.preventDefault();
        $(".form-group .text-danger").html("");

        var fd = new FormData();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var dob = $("#dob").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var country = $("#country").val();
        var state = $("#state").val();
        var email = $("#email").val();
        var tely = $("#telephone").val();
        var code = $("#countryCode").val();
        var title = $("#title").val();
        var password = $("#password").val();
        var pp = profilePic[0].files[0];
        var nameRegex = /^[A-Za-z.\s-]*$/;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        var telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/
        var msg = "";
        var validImageTypes = ['image/jpeg', 'image/png',];

        if (fname == "" || nameRegex.test(fname) == false) {
            msg = "Invalid or No Value for First Name Field.";
            $(".fname-error").html(msg);
        } else if (lname == "" || nameRegex.test(lname) == false) {
            msg = "Invalid or No Value for Last Name Field.";
            $(".lname-error").html(msg);
        } else if (dob == "") {
            msg = "Invalid or No DOB Field.";
            $(".dob-error").html(msg);
        } else if (age == "" || parseInt(age) < 12) {
            msg = "Age Field Not Calculated Properly. Re-enter DOB.";
            $(".age-error").html(msg);
        } else if (gender == "" || gender == null) {
            msg = "Invalid or No Value for Gender Field.";
            $(".gender-error").html(msg);
        } else if (country == "" || country == null) {
            msg = " Invalid or No Value for  Country Field.";
            $(".country-error").html(msg);
        } else if (state == "" || state === undefined || state == null) {
            msg = "Invalid or No Value for State Field.";
            $(".state-error").html(msg);
        } else if (email == "" || emailRegex.test(email) == false) {
            msg = "Invalid or No Value for Email Field.";
            $(".email-error").html(msg);
        } else if (tely == "" || telRegex.test(tely) == false) {
            msg = "Invalid or No Value for Telephone Field.";
            $(".tely-error").html(msg);
        } else if (title != "" && nameRegex.test(title) == false) {
            msg = "Invalid or No Value for Title Field.";
            $(".title-error").html(msg);
        } else if ((password == "" || passRegex.test(password) == false) && submitEnvoy.attr("data-type") == "add") {
            msg = "Invalid or No Value for Password Field. must be 7 charcter long with at least one special charcter and number";
            $(".password-error").html(msg);
        } else if (pp !== undefined && validImageTypes.includes(pp.type) == false) {
            msg = "Invalid or No Image was selected.";
            $(".pp-error").html(msg);
        } else {
            if (msg == "") {
                if (pp == "" || pp == undefined) {
                    pp = "";
                }

                if (submitEnvoy.attr("data-type") == "edit") {
                    fd.append("id", submitEnvoy.attr("data-id"));
                }

                fd.append("fname", fname.charAt(0).toUpperCase() + fname.substr(1).toLowerCase());
                fd.append("lname", lname.charAt(0).toUpperCase() + lname.substr(1).toLowerCase());
                fd.append("dob", dob);
                fd.append("age", age.trim());
                fd.append("gender", gender.trim());
                fd.append("country", country.trim());
                fd.append("state", state.trim());
                fd.append("email", email.trim());
                fd.append("code", code);
                fd.append("telephone", tely);
                fd.append("prof", title.trim());
                fd.append("title", "ENV");
                fd.append("password", password.trim());
                fd.append("pp", pp);
                var url = $(this).attr("data-url");

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        Swal.fire({
                            title: 'Loading.....',
                            html: 'Please Hold on as your details are uploaded, do not refresh.',
                            timer: 4000000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                        });
                    },
                    success: function (data) {
                        //console.log(data.success);
                        if (data.success) {
                            error.html("");
                            modal.modal("hide");

                            if (submitEnvoy.attr("data-type") == "add") {
                                Swal.fire({
                                    icon: "success",
                                    title: data.success,
                                    text: "Click OK to proceed",
                                    showCancelButton: false,
                                    confirmButtonText: `OK`,
                                    allowOutsideClick: false,
                                }).then(() => { location.reload() });
                            } else if (data.url) {
                                location.replace(data.url);
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: data.success,
                                    text: "Click OK to proceed",
                                    showCancelButton: false,
                                    confirmButtonText: `OK`,
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    location.reload();
                                });
                            }

                        }
                        else {
                            swal.close();

                            msg = "<span class='alert alert-success text-center'>" + data.error + "</span>";
                            error.html(msg);
                        }

                    }
                });
            }
        }
    });

    //Function To Delete Image
    deleteImage.on("click", function (e) {
        e.preventDefault();

        if ($(this).attr("data-type") == "add") {
            profilePic.val("");
            $("#frame").attr("src", "");
            $(".filly").removeClass("deactivated");
            $(".prev").addClass("deactivated");
        }
    });

    //Function To Change Status
    status.on("change", function (e) {
        var ID = $(this).attr("id").split("-")[1];
        var value = $(this).val();
        var url = "/admin/User/chnage_status";
        var data = { id: ID, status: value };

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function () {
                Swal.fire({
                    title: 'Loading.....',
                    html: 'Please Hold on as your details are uploaded, do not refresh.',
                    timer: 4000000,
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

    //Function to edit Admin
    editEnvoy.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addEnvoyModalForm");
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
                    title: 'Loading.....',
                    html: 'Please Hold on as Details are being Fetched.',
                    timer: 4000000,
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
                        $(".card-modal-title").html(data.success.fname + " Envoy Profile Form ");
                        $(".card-modal-description").html("Edit " + data.success.fname + "'s envoy Profile");
                        $("#userID").val(data.success.user_id)
                        $("#fname").val(data.success.fname);
                        $("#lname").val(data.success.lname);
                        $("#dob").val(data.success.dob.split("T")[0]);
                        $("#age").val(data.success.age);
                        $("#gender").val(data.success.gender);
                        $("#country").val(data.success.country);
                        var cix = $("#country").val().split("-");
                        // console.log(cix);
                        if (cix.length > 0 && cix[1] !== undefined) {
                            var states = countries[cix[1]].states;
                        } else {
                            var states = []
                        }

                        $("#state").html("");
                        html_state = "<option value=''><!-----choose----></option>";
                        for (var u = 0; u < states.length; u++) {
                            var ste = states[u];
                            html_state += "<option value='" + ste + "'>" + ste + "</option>";
                        }
                        $("#state").html(html_state);
                        $("#state").val(data.success.state);
                        $("#email").val(data.success.email);
                        $("#telephone").val(data.success.telephone.split("-")[1]);
                        $("#countryCode").val(data.success.telephone.split("-")[0]);
                        $("#title").val(data.success.proffession);
                        $("#password").val("");
                        if (data.success.profile_photo) {
                            profilePic.val("");
                            $("#frame").attr("src", data.success.profile_photo);
                            $(".filly").addClass("deactivated");
                            $(".prev").removeClass("deactivated");
                        } else {
                            profilePic.val("");
                            $("#frame").attr("src", data.success.profile_photo);
                            $(".filly").removeClass("deactivated");
                            $(".prev").addClass("deactivated");
                        }
                        submitEnvoy.attr("data-url", "/admin/Envoys/edit_profile");
                        submitEnvoy.attr("data-type", "edit");
                        submitEnvoy.attr("data-id", ID);
                        mdl.modal("show");
                    } else {
                        var url = "/admin/Envoys/edit_sponsor/" + ID;
                        location.replace(url);
                    }

                } else if (data.url) {
                    location.replace(data.url);
                }


            }
        });

    });

    //Function to Delete Admin
    deleteEnvoy.on("click", function (e) {
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
                            title: 'Loading.....',
                            html: 'Please Hold on as Details are being Fetched.',
                            timer: 4000000,
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

    //Function to Open Profile Modal
    profile.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        var url = $(this).attr("data-url");
        var mdl = $("#envoyProfileModal");
        var type = $(this).attr("data-type").split("-");
        var data = { id: ID, type: type[0], mode: type[1] };

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function () {
                Swal.fire({
                    title: 'Loading.....',
                    html: 'Please Hold on as Details are being Fetched.',
                    timer: 4000000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            },
            success: function (data) {
                swal.close();
                if (data.success) {

                    if (data.type == "modal") {
                        if (data.success.profile_photo != "") {
                            $(".avatar").attr('src', data.success.profile_photo);
                        } else {
                            $(".avatar").attr('src', '/images/profile/avatar/avatar.png');
                        }
                        $(".u-id").html("<strong>" + data.success.title.toUpperCase() + ": " + data.success.user_id + "</strong>")
                        $(".f-name").html("<i class='fas fa-glasses'></i> First Name : " + "<span class='text-info'>" + data.success.fname + "</span>");
                        $(".l-name").html("<i class='fab fa-lastfm'></i> Last Name : " + "<span class='text-info'>" + data.success.lname + "</span>");
                        $(".dob").html("<i class='fas fa-calendar-week'></i> Date of Birth : " + "<span class='text-info'>" + prettyDateOnly(data.success.dob.split("T")[0]) + "</span>");
                        $(".age").html("<i class='fas fa-sort-numeric-down-alt'></i> Age : " + "<span class='text-info'>" + data.success.age + "</span>");
                        $(".gender").html("<i class='fas fa-user-check'></i> Gender : " + "<span class='text-info'>" + data.success.gender + "</span>");
                        $(".country").html("<i class='far fa-flag'></i> Country : " + "<span class='text-danger'>" + data.success.country.split("-")[0] + ", " + data.success.state + "</span>");
                        $(".email").html("<i class='far fa-envelope'></i> Email : " + "<a href='mailto:" + data.success.email + "'> " + data.success.email + "</a>");
                        $(".telephone").html("<i class='fas fa-phone-alt'></i> Telephone : " + "<span class='text-info'>" + data.success.telephone + "</span>");
                        $(".doj").html("<i class='far fa-clock'></i> Join Date : " + "<span class='text-info'>" + prettyDate(data.success.date_created) + "</span>");
                        $(".ll").html("<i class='far fa-clock'></i> Last Login : " + "<span class='text-info'>" + prettyDate(data.success.last_login) + "</span>");
                        $(".eb").html("<i class='far fa-user'></i> Last Editted By : " + "<span class='text-info'>" + data.success.editted_by + "</span>");
                        $(".le").html("<i class='far fa-calendar-check'></i> Last Editted : " + "<span class='text-info'>" + prettyDate(data.success.last_editted) + "</span>");
                        mdl.modal("show");
                    } else {
                        location.replace(data.success);
                    }

                } else if (data.url) {
                    location.replace(data.url);
                }


            }
        });
    });

    //Function to view password
    viewPassword.on("click", function (e) {
        console.log("yep");
        e.preventDefault();
        if ($(this).hasClass("see")) {
            $(this).removeClass("see");
            $($(this).children()[0]).addClass("fa-eye")
            $($(this).children()[0]).removeClass("fa-eye-slash");
            $("#password").attr("type", "password");
        } else {
            $(this).addClass("see");
            $($(this).children()[0]).removeClass("fa-eye")
            $($(this).children()[0]).addClass("fa-eye-slash");
            $("#password").attr("type", "text");
        }

    });

    //Function to generate a random password
    genPassword.on("click", function (e) {
        e.preventDefault();
        var spec_char = "*#?@<>!$%^&";
        var rands = "";
        var gen = Math.random().toString(36).slice(-8);
        rands = spec_char.charAt(Math.floor(Math.random() * spec_char.length));
        rands = gen + rands;
        $("#password").val(rands);
    });

    search.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var valhala = $(".kwy").val();
        if (valhala != "" && valhala != undefined) {
            var new_val = "envoys-" + valhala;
            var first = $(".active.get-kids").attr("data-url").trim();
            // console.log(first)
            var url = first + "/search/keyword=" + new_val + "/page=0";
            location.replace(url);
        }

    });

});