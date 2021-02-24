jQuery(document).ready(function( $ ) {
    var error                   = $(".error");
    var sidebarToggler          = $("#sideBarToggler");
    var closeSidebar            = $(".close-sidebar");
    var window_width            = $(window).width();
    var sideBar                 = $("#sideBar");
    var mainPanel               = $(".main-content");
    var dates                   = $(".pretty-date");
    var openMdl_4               = $(".mdl-kid-form");
    var modal                   = $(".modal");
    var closeModl               = $(".close-modal");
    var dob                     = $("#dob");
    var age                     = $("#age");
    var deleteImage             = $(".delete-image");
    var submitKid               = $('#submitKid');
    var profilePic              = $("#profilePic");
    var status                  = $(".custom-control-input")
    var editAdmin               = $(".edit-admin");
    var deleteAdmin             = $(".delete-admin");
    var profile                 = $(".profile");
    var viewPassword            = $("#basic-addon12");
    var genPassword             = $("#basic-addon2");
    var nextFieldset            = $(".next");
    var prevFieldset            = $(".back");
    var counter                 = [0];
    const days                  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames            = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var fNames                  = ['Personal Bio', 'School Details', 'Parent Information', 'Profile Information'];

    if (window_width <= 991 ){
            if ($(".side-nav li").length <= 6) {
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
        if ($(".side-nav li").length > 6) {
            $(".side-nav li").eq(0).remove();
            $(".side-nav li").eq(0).remove();
        }
    }
    for (var i = 0; i < $(".card-title").length; i++){
        if ($($(".card-title")[i]).html().trim() == ""){
           $($(".card-title")[i]).html("0");
           console.log($($(".card-title")[i]).html())
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

    //function for field1 validation
    function field1 (inptArr){
        nameRegex  = /^[A-Za-z.\s-]*$/;
        emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        telRegex   = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        if (inptArr.category == "" || inptArr.category === null){
            return [ $(".category-error"), "Invalid or No Value for First Name Field."];
        } else if (inptArr.fname == "" || nameRegex.test(inptArr.fname) == false){
            return [ $(".fname-error"), "Invalid or No Value for First Name Field."];
        } else if (inptArr.lname == "" || nameRegex.test(inptArr.lname) == false){
            return [ $(".lname-error"), "Invalid or No Value for Last Name Field."];
        } else if (inptArr.mname != "" && nameRegex.test(inptArr.mname) == false){
            return [ $(".mname-error"), "Invalid or No Value for Middle Name Field."];
        } else if (inptArr.dob == ""){
            return [  $(".dob-error"), "Invalid or No DOB Field."];
        } else if (inptArr.age == "" || parseInt(inptArr.age) < 4){
            return [$(".age-error"), "Age Field Not Calculated Properly. Re-enter DOB."];
        } else if (inptArr.gender == ""){
            return [$(".gender-error"), "Invalid or No Value for Gender Field."];
        } else if (inptArr.country == "" || inptArr.country === null){
            return [$(".country-error"), " Invalid or No Value for  Country Field."];
        } else if (inptArr.state_O == ""|| inptArr.state_O === null){
            return [ $(".state-o-error"), "Invalid or No Value for State of Origin Field."];
        } else if (inptArr.state_R == "" || inptArr.state_R === null){
            return [$(".state-r-error"), "Invalid or No Value for Residential State Field."];
        } else if (inptArr.lga != "" && nameRegex.test(inptArr.lga) == false) {
            return [$(".lga-error"), "Invalid value for Local Government Area Field."];
        } else if (inptArr.email != "" && emailRegex.test(inptArr.email) == false){
            return [$(".email-error"), "Invalid or No Value for Email Field."];
        } else if (inptArr.tely != "" && telRegex.test(inptArr.tely) == false){
            return [$(".tely-error"), "Invalid or No Value for Telephone Field."];
        } else{
            return "Data-Valid";
        }
    }

    //Function for field2 validation
    //function for field1 validation
    function field2 (inptArr){
        nameRegex  = /^[A-Za-z.\s-]*$/;

        if (inptArr.sname != "" && nameRegex.test(inptArr.sname) == false){
            return [ $(".sname-error"), "Invalid or No Value for School Name Field."];
        }  else if (inptArr.sfees != "" && isNaN(inptArr.sfees)){
            return [$(".sfees-error"), "Invalid or No Value for School Fees."];
        } else{
            return "Data-Valid";
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
            if ($(".side-nav li").length <= 6) {
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
    sidebarToggler.on("click", function (e){
        e.preventDefault();
        sideBar.toggleClass("show");
        $(".overlay").removeClass("deactivated");
        if (sidebarToggler.hasClass("show")){
            $(".logo").css({"display": "none"})
        }
    });

    //Function To Close Sidebar Mobile VIEW
    closeSidebar.on("click", function(e){
        //console.log("yep");
        e.preventDefault();
        sideBar.removeClass("show");
        $(".overlay").addClass("deactivated");
    });

    //If Over Lay is Clicked
    $(".overlay").on("click", function(e){
        e.preventDefault();
        sideBar.removeClass("show");
        $(".overlay").addClass("deactivated");
    });

    //
    mainPanel.on("click", function(e){
        // console.log(e.target);
        if (!$(e.target).hasClass("fa-bars") && !$(e.target).hasClass("icon-reorder")){
            sideBar.removeClass("show");
        }
        
    });

    //Function to close Modal
    closeModl.on("click", function(e){
        modal.modal("hide");
    });

    //Function to Open Modal
    openMdl_4.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addKidModalForm");
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

    $("#ptitle").on("change", function (e){
        e.preventDefault();
        console.log($(this).val());

        if ($(this).val() == "Other"){
            $("#ptitle2").attr("type", "text");
        }
    });

    //function to move to the back fieldset
    prevFieldset.on("click", function(e){
        e.preventDefault();
        
        var indx            = counter[0];
        var fieldsets       = $("fieldset");
        var prevField       = fieldsets[indx - 1];
        var currentField    = fieldsets[indx];
        var FieldsetName    = $(".fieldset-name");
        counter[0]          = indx - 1; 
       
        FieldsetName.html(fNames[indx - 1]);
        prevFieldset.removeClass("deactivated");
        console.log(indx);

        if (indx - 1 == 0){
            prevFieldset.addClass("deactivated");
        }

        if (indx == 2){
            prevFieldset.removeClass("deactivated");
            nextFieldset.removeClass("deactivated");
            submitKid.addClass("deactivated");
        }
        $(currentField).css({'display' : 'none'});
        $(prevField).css({'display' : "block"});

    });

    //function to move to the next fieldset
    nextFieldset.on("click", function(e){
        e.preventDefault();
        e.stopPropagation()

        var indx            = counter[0];
        var fieldsets       = $("fieldset");
        var prevField       = fieldsets[indx];
        var nextField       = fieldsets[indx + 1];
        var fd              = new FormData();
        var FieldsetName    = $(".fieldset-name");
        

        if (indx == 0) {
            var inptArr        = {};
            inptArr.category   = $("#category").val();
            inptArr.fname      = $("#fname").val().trim();
            inptArr.lname      = $("#lname").val().trim();
            inptArr.mname      = $("#mname").val().trim();
            inptArr.dob        = $("#dob").val();
            inptArr.age        = $("#age").val().trim();
            inptArr.gender     = $("#gender").val();
            inptArr.country    = $("#country").val();
            inptArr.state_O    = $("#state-o").val();
            inptArr.state_R    = $("#state-r").val();
            inptArr.lga        = $("#lga").val().trim();
            inptArr.email      = $("#email").val().trim();
            inptArr.tely       = $("#telephone").val().trim();
            inptArr.code       = $("#countryCode").val().trim();
            $(".text-danger").html("");
            valid = field1(inptArr);

            // if (valid == "Data-Valid"){
            //     counter[0] = indx + 1;
            //     $(prevField).css({'display' : "none"});
            //     $(nextField).css({'display' : 'block'});
            //     FieldsetName.html(fNames[indx + 1]);
            //     prevFieldset.removeClass("deactivated");
            // } else {
            //     console.log(valid);
            //     valid[0].html(valid[1]);
            // }  
            counter[0] = indx + 1;
                $(prevField).css({'display' : "none"});
                $(nextField).css({'display' : 'block'});
                FieldsetName.html(fNames[indx + 1]);
                prevFieldset.removeClass("deactivated");   
            
        } else if (indx == 1) {
            var inptArr         = {};
            inptArr.sname       = $("#sname").val();
            inptArr.los         = $("#los").val().trim();
            inptArr.class       = $("#class").val().trim();
            inptArr.saddress    = $("#saddress").val().trim();
            inptArr.sfees       = $("#sfees").val();
            $(".text-danger").html("");
            valid = field2(inptArr);

            if (valid == "Data-Valid"){
                counter[0] = indx + 1;
                $(prevField).css({'display' : "none"});
                $(nextField).css({'display' : 'block'});
                FieldsetName.html(fNames[indx + 1]);
                prevFieldset.removeClass("deactivated");
            } else {
                console.log(valid);
                valid[0].html(valid[1]);
            }  

        } else if (indx == 2) {
            counter[0] = indx + 1;
            $(prevField).css({'display' : "none"});
            $(nextField).css({'display' : 'block'});
            FieldsetName.html(fNames[indx + 1]);
            prevFieldset.removeClass("deactivated");
            $(this).addClass("deactivated");
            submitKid.removeClass("deactivated");
        }
    });



});