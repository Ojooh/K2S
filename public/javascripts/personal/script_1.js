jQuery(document).ready(function( $ ) {
    var error                   = $(".error");
    var sidebarToggler          = $("#sideBarToggler");
    var window_width            = $(window).width();
    var sideBar                 = $("#sideBar");
    var mainPanel               = $(".main-content");
    var dates                   = $(".pretty-date");
    var openMdl_1               = $(".mdl-admin-form");
    var modal                   = $(".modal");
    var closeModl               = $(".close-modal");
    var dob                     = $("#dob");
    var age                     = $("#age");
    var deleteImage             = $(".delete-image");
    var submitAdmin             = $('#submitAdmin');
    var profilePic              = $("#profilePic");
    var status                  = $(".custom-control-input")
    var editAdmin               = $(".edit-admin");
    var deleteAdmin             = $(".delete-admin");
    var profile                 = $(".profile");
    const days                  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames            = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (window_width <= 991 ){
            if ($(".side-nav li").length == 6) {
                    var html = `<li class="nav-item">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-search"></i>
                            
                            <input type="text" class="form-control" placeholder="What are you looking for..." aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %>">
                    <a class="nav-link" href="sponsors.html">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
                $(".side-nav").prepend(html);
            }
    } else {
        if ($(".side-nav li").length != 6) {
            $(".side-nav li").eq(0).remove();
            $(".side-nav li").eq(0).remove();
        }
    }


    for(var t = 0; t < dates.length; t ++){
        var date = prettyDate($(dates[t]).html().trim());
        $(dates[t]).html(date);
    }

    //function to make date-time pretty
    function prettyDate (date) {
        if (date != "0000-00-00 00:00:00"){
            var d           = new Date (date);
            var day         = d.getDate();
            var dayName     = days[d.getDay()];
            var month       = monthNames[d.getMonth()];
            var year        = d.getFullYear();
            var h           = d.getHours()
            var m           = d.getMinutes();
            var _time       = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
            var result      =  dayName + " " + day + " " + month + ", " + year + " " + _time;
            return result
        } else {
            return "Never";
        }
    }

    //Function to make date pretty
    function prettyDateOnly (date) {
        if (date != "0000-00-00 00:00:00"){
            var d           = new Date (date);
            var day         = d.getDate();
            var dayName     = days[d.getDay()];
            var month       = monthNames[d.getMonth()];
            var year        = d.getFullYear();
            var result      =  dayName + " " + day + " " + month + ", " + year;
            return result
        } else {
            return "Never";
        }
    }

    //Function to acativate Tool Tip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    //Function to adjust sidebar on window size change
    $(window).on('resize', function() {
        var width = $(window).width();
        if (width <= 991 ){
            if ($(".side-nav li").length == 6) {
                    var html = `<li class="nav-item">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fas fa-search"></i>
                            
                            <input type="text" class="form-control" placeholder="What are you looking for..." aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %>">
                    <a class="nav-link" href="sponsors.html">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
                $(".side-nav").prepend(html);
            }
        } else {
            if ($(".side-nav li").length != 6) {
                $(".side-nav li").eq(0).remove();
                $(".side-nav li").eq(0).remove();
            }
            

        }
    });

    //
    // $(window).on("click",  function(e) {
    // });

    //Function to open and close sidebar in mobile view
    sidebarToggler.on("click", function (e){
        e.preventDefault();
        sideBar.toggleClass("show");
        if (sidebarToggler.hasClass("show")){
            $(".logo").css({"display": "none"})
        }
    });

    //
    mainPanel.on("click", function(e){
        if (!$(e.target).hasClass("fa-bars") && !$(e.target).hasClass("icon-reorder")){
            sideBar.removeClass("show");
        }
        
    });

    //Function to close Modal
    closeModl.on("click", function(e){
        modal.modal("hide");
    });

    //Function to Open Modal
    openMdl_1.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addAdminModalForm");
        var content     = $(".admin-form-modal");
        mdl.modal("show");
        //content.css({"position":"static", "top" : "none"});
    });

    //Function To calculate and display age
    dob.on("change", function(e) {
        var d               = new Date();
        var val             = $(this).val();
        var date_divide     = val.split("-");
        var user_year       = date_divide[0];
        var current_year    = d.getFullYear();
        var new_age         = parseInt(current_year) - parseInt(user_year);
        age.val(new_age)
    });

    //Function To Preview Image
    profilePic.on("change", function (e){
        $('.prev').removeClass("deactivated");
        $('#frame').attr('src', URL.createObjectURL(e.target.files[0]));
    });

    //Function To Submit Form
    submitAdmin.on("click", function(e){
        e.preventDefault();
        $(".form-group .text-danger").html("");

        var fd          = new FormData();
        var fname      = $("#fname").val().trim();
        var lname      = $("#lname").val().trim();
        var dob        = $("#dob").val().trim();
        var age        = $("#age").val().trim();
        var gender     = $("#gender").val().trim();
        var country    = $("#country").val().trim();
        var state      = $("#state").val().trim();
        var email      = $("#email").val().trim();
        var tely       = $("#telephone").val().trim();
        var code       = $("#countryCode").val().trim();
        var title      = $("#title").val().trim();
        var password   = $("#password").val().trim();
        var pp         = profilePic[0].files[0];
        var nameRegex  = /^[A-Za-z.\s-]*$/;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        var telRegex   = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        var passRegex  = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/
        var msg        = "";
        var validImageTypes = ['image/jpeg', 'image/png', ];

        if (fname == "" || nameRegex.test(fname) == false){
            msg = "Invalid or No Value for First Name Field.";
            $(".fname-error").html(msg);
        } else if (lname == "" || nameRegex.test(lname) == false){
            msg = "Invalid or No Value for Last Name Field.";
            $(".lname-error").html(msg);
        } else if (dob == ""){
            msg = "Invalid or No DOB Field.";
            $(".dob-error").html(msg);
        } else if (age == "" || parseInt(age) < 12){
            msg = "Age Field Not Calculated Properly. Re-enter DOB.";
            $(".age-error").html(msg);
        } else if (gender == ""){
            msg = "Invalid or No Value for Gender Field.";
            $(".gender-error").html(msg);
        } else if (country == ""){
            msg = " Invalid or No Value for  Country Field.";
            $(".country-error").html(msg);
        } else if (state == ""){
            msg = "Invalid or No Value for State Field.";
            $(".state-error").html(msg);
        } else if (email == "" || emailRegex.test(email) == false){
            msg = "Invalid or No Value for Email Field.";
            $(".email-error").html(msg);
        } else if (tely == "" || telRegex.test(tely) == false){
            msg = "Invalid or No Value for Telephone Field.";
            $(".tely-error").html(msg);
        } else if (title == ""){
            msg = "Invalid or No Value for Title Field.";
            $(".title-error").html(msg);
        } else if ((password == ""  || passRegex.test(password) == false) && submitAdmin.attr("data-type") == "add"){
            msg = "Invalid or No Value for Password Field. must be 7 charcter long with at least one special charcter and number";
            $(".password-error").html(msg);
        } else if (pp !== undefined && validImageTypes.includes(pp.type) == false){
            msg = "Invalid or No Image was selected.";
            $(".pp-error").html(msg);
        } else {
            if (msg == ""){
                if (pp == "" || pp == undefined){
                    pp = "";
                }

                if (submitAdmin.attr("data-type") == "edit"){
                    fd.append("id", submitAdmin.attr("data-id"));
                }

                fd.append("fname", fname.charAt(0).toUpperCase() + fname.substr(1).toLowerCase());
                fd.append("lname", lname.charAt(0).toUpperCase() + lname.substr(1).toLowerCase());
                fd.append("dob", dob);
                fd.append("age", age);
                fd.append("gender", gender);
                fd.append("country", country);
                fd.append("state", state);
                fd.append("email", email);
                fd.append("code", code);
                fd.append("telephone", tely);
                fd.append("title", title);
                fd.append("password", password);
                fd.append("pp", pp);
                var url = $(this).attr("data-url");

                $.ajax({
                url: url,
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                beforeSend: function() {
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
                    if (data.success){
                        modal.modal("hide");
                        Swal.fire(data.success, "Click OK to Proceed", "success").then(
                            function(){
                                // console.log("okay");
                               location.replace("/admin/Administrators");
                            }
                        )
                    }
                    else{
                        swal.close();
                        error.html("");
                        msg = "<span class='alert alert-success text-center'>" + data.error + "</span>";
                        error.html(msg);
                    }
                    
                }
                });
            }
        }
    });


    //Function To Delete Image
    deleteImage.on("click", function(e){
        e.preventDefault();

        if ($(this).attr("data-type") == "add"){
            profilePic.val("");
            $("#frame").attr("src", "");
            $(".filly").removeClass("deactivated");
            $(".prev").addClass("deactivated");
        }
    });

    //Function To Change Status
    status.on("change", function(e){
        var ID      = $(this).attr("id").split("-")[1];
        var value   = $(this).val();
        var url     = "/admin/Administrators/chnage_status";
        var data    = {id : ID, status : value};

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function() {
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
                if (data.success){
                    modal.modal("hide");
                    Swal.fire(data.success, "Click OK to Proceed", "success").then(
                        function(){
                            location.reload();
                        }
                    )
                }
                else{
                    error.html("");
                    msg = "<span class='alert alert-success'>" + data.error + "</span>";
                    error.html(msg);
                }
                    
            }
        });
    });

    //Function to edit Admin
    editAdmin.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var mdl         = $("#addAdminModalForm");
        var ID          = $(this).attr("data-id");
        var url         = $(this).attr("data-url");
        var type        = $(this).attr("data-type");
        var data        = {id : ID, type : type};

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function() {
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
                if(data.success){
                    
                    if (type == "modal"){
                        $(".card-modal-title").html(data.success.fname + " Administrator Profile Form ");
                        $(".card-modal-description").html("Edit " + data.success.fname + "'s Administrator Profile");
                        $("#userID").val(data.success.user_id)
                        $("#fname").val(data.success.fname);
                        $("#lname").val(data.success.lname);
                        $("#dob").val(data.success.dob.split("T")[0]);
                        $("#age").val(data.success.age);
                        $("#gender").val(data.success.gender);
                        $("#country").val(data.success.country);
                        var cix = $("#country").val().split("-");
                        var states = countries[cix[1]].states;
                        $("#state").empty();
                        html_state = "<option value=''><!-----choose----></option>";
                        for (var u = 0; u < states.length; u++){
                            var ste = states[u];
                            html_state += "<option value='" + ste + "'>" + ste + "</option>";
                        }
                        $("#state").append(html_state);
                        $("#state").val(data.success.state);
                        $("#email").val(data.success.email);
                        $("#telephone").val(data.success.telephone.split("-")[1]);
                        $("#countryCode").val(data.success.telephone.split("-")[0]);
                        $("#title").val(data.success.user_type);
                        $("#password").val("");
                        if (data.success.profile_photo){
                            profilePic.val("");
                            $("#frame").attr("src", data.success.profile_photo);
                            $(".filly").addClass("deactivated");
                            $(".prev").removeClass("deactivated");
                        }
                        submitAdmin.attr("data-url", "/admin/Administrators/edit_profile");
                        submitAdmin.attr("data-type", "edit");
                        submitAdmin.attr("data-id", ID);
                        mdl.modal("show");
                    } else {
                        location.replace(data.success);
                    }
                    
                }
                
                    
            }
        });
        
    });

    //Function to Delete Admin
    deleteAdmin.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var ID          = $(this).attr("data-id");
        var url         = $(this).attr("data-url");
        var data        = {id : ID};

        Swal.fire({
            icon: 'question',
            title: 'Are you Sure you want to Delete ?',
            text: 'This will permanently delete this profile, click yes to confirm',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText:   `No`,
            allowOutsideClick: false,
        }).then( async (result) => {
            if(result.value){

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    beforeSend: function() {
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
                        if(data.success){
                            Swal.fire({
                                icon: 'success',
                                title: 'Delete Operation Successful',
                                text: data.success,
                            }).then(
                                function(){
                                    location.reload();
                                }
                            );
                        }  else {
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
    profile.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var ID          = $(this).attr("data-id");
        var url         = $(this).attr("data-url");
        var mdl         = $("#adminProfileModal");

        var data        = {id : ID, type : "modal"};

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function() {
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
                if(data.success){
                    
                    if (data.type == "modal"){
                        if (data.success.profile_photo != ""){
                            $(".avatar").attr('src', data.success.profile_photo);
                        } else {
                            $(".avatar").attr('src','/images/profile/avatar/avatar.png');
                        }
                        $(".u-id").html("<strong>" + data.success.title.toUpperCase() + ": " + data.success.user_id + "</strong>")
                        $(".f-name").html("<i class='fas fa-glasses'></i> First Name : " + "<span class='text-info'>" + data.success.fname + "</span>");
                        $(".l-name").html("<i class='fab fa-lastfm'></i> Last Name : " + "<span class='text-info'>" + data.success.lname + "</span>");
                        $(".dob").html("<i class='fas fa-calendar-week'></i> Date of Birth : " + "<span class='text-info'>" + prettyDateOnly(data.success.dob.split("T")[0]) + "</span>" );
                        $(".age").html("<i class='fas fa-sort-numeric-down-alt'></i> Age : " + "<span class='text-info'>" + data.success.age + "</span>" );
                        $(".gender").html("<i class='fas fa-user-check'></i> Gender : " + "<span class='text-info'>" + data.success.gender + "</span>" );
                        $(".country").html("<i class='far fa-flag'></i> Country : " + "<span class='text-danger'>" + data.success.country.split("-")[0] + ", " + data.success.state + "</span>" );
                        $(".email").html("<i class='far fa-envelope'></i> Email : " + "<a href='mailto:" + data.success.email + "'> " + data.success.email + "</a>");
                        $(".telephone").html("<i class='fas fa-phone-alt'></i> Telephone : " +  "<span class='text-info'>" + data.success.telephone + "</span>" );
                        $(".doj").html("<i class='far fa-clock'></i> Join Date : " + "<span class='text-info'>" + prettyDate(data.success.date_created) + "</span>" );
                        $(".ll").html("<i class='far fa-clock'></i> Last Login : " + "<span class='text-info'>" + prettyDate(data.success.last_login) + "</span>" );
                        $(".eb").html("<i class='far fa-user'></i> Last Editted By : " + "<span class='text-info'>" + data.success.editted_by + "</span>" );
                        $(".le").html("<i class='far fa-calendar-check'></i> Last Editted : " + "<span class='text-info'>" + prettyDate(data.success.last_editted) + "</span>" );
                        mdl.modal("show");
                    } else {
                        location.replace(data.success);
                    }
                    
                }
                
                    
            }
        });
    });







});