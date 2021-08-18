jQuery(document).ready(function ($) {
    var error = $(".error");
    var filter = $(".deep");
    var filterDOB = $(".filter-dob");
    var dobBtn = $(".dob-btn");
    var vl = "";
    var order = $(".order");
    var search = $("#basic-addon1");
    var openMdl_4 = $(".mdl-kid-form");
    var modal = $(".modal");
    var dob = $("#dob");
    var age = $("#age");
    var deleteImage = $(".delete-image");
    var deleteFile = $(".delete-file");
    var expenseFieldsCount = parseInt($("#expyy").html());
    // var submitKid = $('#submitKid');
    var profilePic = $("#profilePic");
    var status = $(".custom-control-input")
    var editKid = $(".edit-kid");
    var deleteKid = $(".delete-kid");
    var profile = $(".profile");
    // var viewPassword = $("#basic-addon12");
    // var genPassword = $("#basic-addon2");
    var nextFieldset = $(".next");
    var prevFieldset = $(".back");
    var profile = $(".profile");
    var createExpenseField = $("#createExpense");
    var total_expyr = 0;
    // var removeExpenseField = $(".remove-expense");
    // console.log(removeExpenseField)

    var counter = [0];
    var inptArr = {};
    var fNames = ['Personal Bio', 'School Details', 'Expense Information', 'Parent Information', 'Profile Information'];




    //function for field1 validation
    function field1(inptArr) {
        nameRegex = /^[A-Za-z.\s-]*$/;
        emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        if (inptArr.category == "" || inptArr.category === null) {
            return [$(".category-error"), "Invalid or No Value for First Name Field."];
        } else if (inptArr.fname == "" || nameRegex.test(inptArr.fname) == false) {
            return [$(".fname-error"), "Invalid or No Value for First Name Field."];
        } else if (inptArr.lname == "" || nameRegex.test(inptArr.lname) == false) {
            return [$(".lname-error"), "Invalid or No Value for Last Name Field."];
        } else if (inptArr.mname != "" && nameRegex.test(inptArr.mname) == false) {
            return [$(".mname-error"), "Invalid or No Value for Middle Name Field."];
        } else if (inptArr.dob == "") {
            return [$(".dob-error"), "Invalid or No DOB Field."];
        } else if (inptArr.age == "" || parseInt(inptArr.age) < 1) {
            return [$(".age-error"), "Age Field Not Calculated Properly. Re-enter DOB."];
        } else if (inptArr.gender == "") {
            return [$(".gender-error"), "Invalid or No Value for Gender Field."];
        } else if (inptArr.country == "" || inptArr.country === null) {
            return [$(".country-error"), " Invalid or No Value for  Country Field."];
        } else if (inptArr.state_O == "" || inptArr.state_O === null) {
            return [$(".state-o-error"), "Invalid or No Value for State of Origin Field."];
        } else if (inptArr.state_R == "" || inptArr.state_R === null) {
            return [$(".state-r-error"), "Invalid or No Value for Residential State Field."];
        } else if (inptArr.lga != "" && nameRegex.test(inptArr.lga) == false) {
            return [$(".lga-error"), "Invalid value for Local Government Area Field."];
        } else if (inptArr.email != "" && emailRegex.test(inptArr.email) == false) {
            return [$(".email-error"), "Invalid or No Value for Email Field."];
        } else if (inptArr.tely != "" && telRegex.test(inptArr.tely) == false) {
            return [$(".tely-error"), "Invalid or No Value for Telephone Field."];
        } else {
            return "Data-Valid";
        }
    }

    //Function for field2 validation
    function field2(inptArr) {
        nameRegex = /^[A-Za-z.\s-]*$/;

        if (inptArr.sname != "" && nameRegex.test(inptArr.sname) == false) {
            return [$(".sname-error"), "Invalid or No Value for School Name Field."];
        } else if (inptArr.sname != "" && inptArr.los == "") {
            return [$(".los-error"), "Invalid or No Value for Level Of Study Field."];
        } else if (inptArr.sname != "" && inptArr.class == "") {
            return [$(".class-error"), "Invalid or No Value for Class Field."];
        } else if (inptArr.sname != "" && inptArr.saddress == "") {
            return [$(".saddress-error"), "Invalid or No Value for School Address Field."];
        } else if (inptArr.sother != "" && inptArr.sother.split(" ").length > 501) {
            return [$(".sother-error"), "Only 500 words Allowed."];
        } else {
            return "Data-Valid";
        }
    }

    // Function for field3 Validation
    function field3(inptArr) {
        nameRegex = /^[A-Za-z.\s-]*$/;
        emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;

        if (inptArr.ptitle == "" || nameRegex.test(inptArr.ptitle) == false) {
            return [$(".ptitle-error"), "Invalid or No Value for Parent Title Field."];
        } else if (inptArr.pname == "" || nameRegex.test(inptArr.pname) == false) {
            return [$(".pname-error"), "Invalid or No Value for Parent Name Field."];
        } else if (inptArr.pemail != "" && emailRegex.test(inptArr.pemail) == false) {
            return [$(".pemail-error"), "Invalid or No Value for Parent Email Field."];
        } else if (inptArr.ptel == "" || telRegex.test(inptArr.ptel) == false) {
            return [$(".ptel-error"), "Invalid or No Value for Telephone Field."];
        } else {
            return "Data-Valid";
        }
    }

    // Function for field4 Validation
    function field4(inptArr) {
        var validImageTypes = ['image/jpeg', 'image/png',];
        var validDocTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (inptArr.story != "" && inptArr.story.split(" ").length > 501) {
            return [$(".story-error"), "Only 500 words Allowed."];
        } else if (inptArr.goal != "" && inptArr.goal.split(" ").length > 501) {
            return [$(".goal-error"), "Only 500 words Allowed."];
        } else if (inptArr.bc !== undefined && inptArr.bc != "" && validDocTypes.includes(inptArr.bc.type) == false) {
            return [$(".bc-error"), "Only Image, pdf or docx files Allowed."];
        } else if (((inptArr.pp == undefined) || (inptArr.pp == "") || (inptArr.pp == null)) && $("#frame").attr("src") === undefined) {
            return [$(".pp-error"), "Profile Image is compulsory."];
        }
        else if ((inptArr.pp !== undefined && inptArr.pp != "" && validImageTypes.includes(inptArr.pp.type) == false)) {
            return [$(".pp-error"), "Only Image Files are Allowed."];
        } else {
            return "Data-Valid";
        }
    }

    // Function for expense validation
    function field5(expy) {
        let tot = 0;
        let elem;
        expenseFieldsCount = parseInt($("#expyy").html());
        console.log(expenseFieldsCount)
        for (var f = 0; f <= expenseFieldsCount - 1; f++) {
            if ($($(".ename")[f]).val() != "" && $($(".ename")[f]).val() !== undefined && $($(".evalue")[f]).val() != "" && $($(".evalue")[f]).val() != undefined && $($(".edesc")[f]).val() != "" && $($(".edesc")[f]).val() != undefined) {
                var expense = {};
                expense["ename"] = $($(".ename")[f]).val();
                expense["evalue"] = $($(".evalue")[f]).val();
                expense["edesc"] = $($(".edesc")[f]).val();
                tot = parseFloat(tot) + parseFloat($($(".evalue")[f]).val());
                expy.push(expense)

            }
            else {

                if ($($(".ename")[f]).val() == "" || $($(".ename")[f]).val() === undefined) {
                    console.log(f);
                    elem = $($(".ename-error")[f]);
                }
                else if ($($(".evalue")[f]).val() == "" || $($(".evalue")[f]).val() === undefined || parseInt($($(".evalue")[f]).val()) <= 0) {
                    console.log(f);
                    elem = $($(".evalue-error")[f])
                }
                else if ($($(".edesc")[f]).val() == "" || $($(".edesc")[f]).val() === undefined) {
                    console.log(f);
                    elem = $($(".edesc-error")[f])
                }
                return ["error", elem, "This field is compulsory."];
            }

        }

        return ["Data-Valid", expy, tot];
    }

    function editExpenseField(expy, tot) {
        var pary = $(".expense-home");
        expy = expy.expenses;

        var addHTML = ``;

        if (expy != undefined && expy != "" && expy.length > 0) {
            expenseFieldsCount = expy.length;
            $("#expyy").html(expenseFieldsCount);
            for (var k = 0; k < expy.length; k++) {
                var cur_exp = expy[k];
                var last_id = ((k + 1) * 4)
                total_expyr = parseFloat(total_expyr) + parseFloat(cur_exp.evalue);

                addHTML += `<div class="row rw-` + last_id + `">
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group bmd-form-group">
                                        <label class="bmd-label-floating">Expense Name</label>
                                        <input type="text" class="form-control ename" name="ename" value="` + cur_exp.ename + `" placeholder="Expense Name....">
                                        <span class="text-danger ename-error my-1"></span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-12">
                                    <div class="form-group bmd-form-group">
                                        <label class="bmd-label-floating">Expense Value</label>
                                        <input type="number" min="0" class="form-control evalue" name="evalue" value="` + cur_exp.evalue + `" placeholder="Expense Value....">
                                        <span class="text-danger evalue-error my-1"></span>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group bmd-form-group">
                                        <label class="bmd-label-floating">Expense Descroption</label>
                                        <textarea class="form-control edesc" name="edesc" placeholder="Expense Description....">` + cur_exp.edesc + `</textarea>
                                        <span class="text-danger edesc-error my-1"></span>
                                    </div>
                                </div>
                                <div class="col-lg-1 col-md-12">
                                    <a href="#" id="remove-` + last_id + `" onclick="removeExpenseField(event)" class="btn btn-primary remove-expense">
                                        <i class="fas fa-times"></i>
                                    </a>
                                </div>
                            </div>`;

            }

            $(".tot").html("&#8358; " + (total_expyr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")))
        }

        pary.append(addHTML);
    }


    //Function to Open Modal
    openMdl_4.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addKidModalForm");
        mdl.modal("show");
        $("input").val("")
        $("select").val("")
        $("textarea").val("")
        var fieldsets = $("fieldset")
        fieldsets.css({ 'display': "none" })
        $(fieldsets[0]).removeClass("deactivated");
        $(fieldsets[0]).css({ 'display': "block" })
        counter = [0];
        $(".fieldset-name").html(fNames[0]);
        $(".card-modal-title").html("Kids Form");
        $(".card-modal-description").html("Add a Child for the Kids To school Foundation.");
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

    $("#ptitle").on("change", function (e) {
        e.preventDefault();
        console.log($(this).val());

        if ($(this).val() == "Other") {
            $("#ptitle2").attr("type", "text");
        } else {
            $("#ptitle2").attr("type", "hidden");
        }
    });

    //function to move to the back fieldset
    prevFieldset.on("click", function (e) {
        e.preventDefault();

        var indx = counter[0];
        var fieldsets = $("fieldset");
        var prevField = fieldsets[indx - 1];
        var currentField = fieldsets[indx];
        var FieldsetName = $(".fieldset-name");
        counter[0] = indx - 1;
        FieldsetName.html(fNames[indx - 1]);
        prevFieldset.removeClass("deactivated");
        console.log(indx);

        if (indx - 1 == 0) {
            prevFieldset.addClass("deactivated");
        }

        if (indx == 2) {
            prevFieldset.removeClass("deactivated");
            nextFieldset.removeClass("deactivated");
        }
        nextFieldset.html("<i class='fas fa-long-arrow-alt-right'></i> Next");
        $(currentField).css({ 'display': 'none' });
        $(prevField).css({ 'display': "block" });

    });

    // function to add expense fields
    createExpenseField.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation()
        var par = $(".expense-home");
        var last_id = ((expenseFieldsCount + 1) * 4)
        expenseFieldsCount = parseInt($("#expyy").html());
        if (expenseFieldsCount >= 1) {
            expy = $(".evalue")
            total_expyr = 0;
            for (var k = 0; k < expy.length; k++) {
                var cur_exp = $(expy[k]);
                total_expyr = parseFloat(total_expyr) + parseFloat(cur_exp.val());
                $(".tot").html("&#8358; " + (total_expyr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")))
            }
        }
        var addHTML = ` <div class="row rw-` + last_id + `">
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group bmd-form-group">
                                    <label class="bmd-label-floating">Expense Name</label>
                                    <input type="text" class="form-control ename" name="ename" placeholder="Expense Name....">
                                    <span class="text-danger ename-error my-1"></span>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group bmd-form-group">
                                    <label class="bmd-label-floating">Expense Value</label>
                                    <input type="number" min="0" class="form-control evalue" name="evalue" placeholder="Expense Value....">
                                    <span class="text-danger evalue-error my-1"></span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group bmd-form-group">
                                    <label class="bmd-label-floating">Expense Descroption</label>
                                    <textarea class="form-control edesc" name="edesc" placeholder="Expense Description...."></textarea>
                                    <span class="text-danger edesc-error my-1"></span>
                                </div>
                            </div>
                            <div class="col-lg-1 col-md-12">
                                <a href="#" id="remove-` + last_id + `" onclick="removeExpenseField(event)" class="btn btn-primary remove-expense">
                                    <i class="fas fa-times"></i>
                                </a>
                            </div>
                        </div>`;
        par.append(addHTML);
        expenseFieldsCount++;
        $("#expyy").html(expenseFieldsCount);

    });

    //function to move to the next fieldset
    nextFieldset.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation()

        var indx = counter[0];
        // var fd = new FormData();
        var fieldsets = $("fieldset");
        var prevField = fieldsets[indx];
        var nextField = fieldsets[indx + 1];
        var FieldsetName = $(".fieldset-name");
        var url = $(this).attr("data-url");
        $(".text-danger").html("");
        $(".error").html("");


        if (indx == 0) {

            inptArr.category = $("#category").val();
            inptArr.fname = $("#fname").val();
            inptArr.lname = $("#lname").val();
            inptArr.mname = $("#mname").val();
            inptArr.dob = $("#dob").val();
            inptArr.age = $("#age").val();
            inptArr.gender = $("#gender").val();
            inptArr.country = $("#country").val();
            inptArr.state_O = $("#state-o").val();
            inptArr.state_R = $("#state-r").val();
            inptArr.lga = $("#lga").val();
            inptArr.email = $("#email").val();
            inptArr.tely = $("#telephone").val();
            inptArr.code = $("#countryCode").val();
            $(".text-danger").html("");
            // valid = "Data-Valid"
            valid = field1(inptArr);

            if (valid == "Data-Valid") {
                counter[0] = indx + 1;
                $(prevField).css({ 'display': "none" });
                $(nextField).css({ 'display': 'block' });
                FieldsetName.html(fNames[indx + 1]);
                prevFieldset.removeClass("deactivated");


            } else {
                // console.log(valid);
                valid[0].html(valid[1]);
            }

        }
        else if (indx == 1) {
            inptArr.sname = $("#sname").val();
            inptArr.los = $("#los").val();
            inptArr.class = $("#class").val();
            inptArr.saddress = $("#saddress").val();
            inptArr.sother = $("#sother").val();
            $(".text-danger").html("");
            // valid = "Data-Valid"
            valid = field2(inptArr);

            if (valid == "Data-Valid") {
                counter[0] = indx + 1;
                $(prevField).css({ 'display': "none" });
                $(nextField).css({ 'display': 'block' });
                FieldsetName.html(fNames[indx + 1]);
                prevFieldset.removeClass("deactivated");

            } else {
                console.log(valid);
                valid[0].html(valid[1]);
            }

        }
        else if (indx == 2) {
            var expenseArray = [];
            if (expenseFieldsCount <= 0) {
                error.html("");
                msg = "<span class='alert alert-success text-center'>No Expense Fields have been created</span>";
                error.html(msg);
            } else {
                valid = field5(expenseArray);

                if (valid[0] == "Data-Valid") {
                    inptArr.expenses = valid[1];
                    inptArr.totalExpense = valid[2];
                    console.log(inptArr);
                    counter[0] = indx + 1;
                    $(prevField).css({ 'display': "none" });
                    $(nextField).css({ 'display': 'block' });
                    FieldsetName.html(fNames[indx + 1]);
                    prevFieldset.removeClass("deactivated");
                }
                else {
                    console.log(valid);
                    valid[1].html(valid[2])
                }
            }

        }
        else if (indx == 3) {

            if ($("#ptitle").val() == "Other") {
                inptArr.ptitle = $("#ptitle2").val();
            } else {
                inptArr.ptitle = $("#ptitle").val();
            }
            inptArr.pname = $("#pname").val();
            inptArr.pemail = $("#pemail").val();
            inptArr.ptel = $("#ptel").val();
            $(".text-danger").html("");
            // valid = "Data-Valid"
            valid = field3(inptArr);

            if (valid == "Data-Valid") {
                counter[0] = indx + 1;
                $(prevField).css({ 'display': "none" });
                $(nextField).css({ 'display': 'block' });
                FieldsetName.html(fNames[indx + 1]);
                prevFieldset.removeClass("deactivated");
                $(this).html("<i class='far fa-paper-plane'></i>Submit")


            } else {

                console.log(valid);
                valid[0].html(valid[1]);
            }
        }
        else if (indx == 4) {
            inptArr.story = $("#story").val();
            inptArr.goal = $("#goal").val();
            if ($("#bc")[0].files[0] === undefined) {
                inptArr.bc = "";
            } else {
                inptArr.bc = $("#bc")[0].files[0];
            }

            if (profilePic[0].files[0] === undefined) {
                inptArr.pp = "";
            } else {
                inptArr.pp = profilePic[0].files[0];
            }

            $(".text-danger").html("");
            // valid = "Data-Valid"
            valid = field4(inptArr);

            if (valid == "Data-Valid") {
                console.log(inptArr)
                var fd = new FormData();
                fd.append("category", inptArr.category);
                fd.append("fname", inptArr.fname.charAt(0).toUpperCase() + inptArr.fname.substr(1).toLowerCase());
                fd.append("lname", inptArr.lname.charAt(0).toUpperCase() + inptArr.lname.substr(1).toLowerCase());
                fd.append("mname", inptArr.mname.charAt(0).toUpperCase() + inptArr.mname.substr(1).toLowerCase());
                fd.append("dob", inptArr.dob);
                fd.append("age", inptArr.age);
                fd.append("gender", inptArr.gender);
                var cix = $("#country").val().split("-");
                if (cix[1] == "" || cix[1] == undefined) {
                    fd.append("country", "Nigeria-131");
                } else {
                    fd.append("country", inptArr.country);
                }

                fd.append("state_o", inptArr.state_O);
                fd.append("state_r", inptArr.state_R);
                fd.append("lga", inptArr.lga);
                fd.append("email", inptArr.email);
                fd.append("tely", inptArr.code + "-" + inptArr.tely);
                fd.append("sname", inptArr.sname.charAt(0).toUpperCase() + inptArr.sname.substr(1).toLowerCase());
                fd.append("saddress", inptArr.saddress.charAt(0).toUpperCase() + inptArr.saddress.substr(1).toLowerCase());
                fd.append("los", inptArr.los);
                fd.append("class", inptArr.class);
                // fd.append("sfees", inptArr.sfees);
                fd.append("sother", inptArr.sother);
                fd.append("expenses", JSON.stringify({ "expenses": inptArr.expenses }));
                console.log(JSON.stringify({ "expenses": inptArr.expenses }))
                fd.append("totalExpense", inptArr.totalExpense)
                fd.append("pname", inptArr.pname.charAt(0).toUpperCase() + inptArr.pname.substr(1).toLowerCase());
                fd.append("ptitle", inptArr.ptitle.charAt(0).toUpperCase() + inptArr.ptitle.substr(1).toLowerCase());
                fd.append("pemail", inptArr.pemail);
                fd.append("ptel", inptArr.ptel);
                fd.append("story", inptArr.story);
                fd.append("goal", inptArr.goal);
                fd.append("bc", inptArr.bc);
                fd.append("pp", inptArr.pp);
                fd.append("title", "KDS")

                if (nextFieldset.attr("data-type") == "edit") {
                    fd.append("id", nextFieldset.attr("data-id"));
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        Swal.fire({
                            title: 'Auto close alert!',
                            html: 'Please Hold on as details are uploaded, do not refresh.',
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

                            if ($(this).attr("data-type") == "add") {
                                Swal.fire({
                                    icon: "success",
                                    title: data.success,
                                    text: "Click OK to proceed to Dashboard or Add to Add Another Sponsor",
                                    showCancelButton: true,
                                    confirmButtonText: `OK`,
                                    cancelButtonText: `Add`,
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    if (result.value) {
                                        location.replace("/admin/Kids");
                                    } else {
                                        if (modal != undefined) {
                                            $("#addKidModalForm").modal("show");
                                            $("input, textarea, select").val("");
                                            $("#frame").attr('src', "");
                                            $(".prev").addClass("deactivated");
                                        } else {
                                            location.replace("/admin/Kids/add_kid");
                                        }
                                    }
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: data.success,
                                    text: "Click OK to proceed to Dashboard or Edit to Edit Sponsor",
                                    showCancelButton: true,
                                    confirmButtonText: `OK`,
                                    cancelButtonText: `Add`,
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    location.reload();
                                });
                            }

                        } else if (data.url) {
                            location.replace(data.url);
                        }
                        else {
                            swal.close();
                            fd = new FormData();
                            error.html("");
                            msg = "<span class='alert alert-success text-center'>" + data.error + "</span>";
                            error.html(msg);
                        }

                    }
                });
            } else {
                console.log(valid);
                valid[0].html(valid[1]);
            }
        }
    });

    //Function To Change Status
    status.on("change", function (e) {
        var ID = $(this).attr("id").split("-")[1];
        var value = $(this).val();
        var url = "/admin/Kids/chnage_status";
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

    //Function To Delete Image
    deleteImage.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        profilePic.val("");
        $("#frame").attr("src", "");
        $(".filly").removeClass("deactivated");
        $(".prev").addClass("deactivated");

    });

    //Function To Delete File
    deleteFile.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        $("#bc").val("");
        $(".path").html("");
        $(".dilly").removeClass("deactivated");
        $(".jev").addClass("deactivated");

    });

    //Function to edit Admin
    editKid.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addKidModalForm");
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

                console.log(data);
                if (data.success) {

                    if (type[1] == "modal") {
                        var fieldsets = $("fieldset")
                        fieldsets.css({ 'display': "none" })
                        $(fieldsets[0]).removeClass("deactivated");
                        $(fieldsets[0]).css({ 'display': "block" })
                        counter = [0];
                        $(".card-modal-title").html(data.success.fname + " " + data.success.lname + " Profile Form");
                        $(".card-modal-description").html("Edit " + data.success.fname + "'s Kid Profile");
                        $("#category").val(data.success.category);
                        $("#fname").val(data.success.fname)
                        $("#lname").val(data.success.lname)
                        $("#mname").val(data.success.mname)
                        $("#dob").val(data.success.dob.split("T")[0]);
                        $("#age").val(data.success.age);
                        $("#gender").val(data.success.gender);
                        $("#country").val(data.success.country);
                        var cix = data.success.country.split("-");
                        console.log(cix)
                        if (cix[1] == "" || cix[1] == undefined) {
                            var states = countries["131"].states;
                        } else {
                            var states = countries[cix[1]].states;
                        }
                        $("#state-o").empty();
                        $("#state-r").empty();
                        html_state = "<option value=''><!-----choose----></option>";

                        for (var u = 0; u < states.length; u++) {
                            var ste = states[u];
                            html_state += "<option value='" + ste + "'>" + ste + "</option>";
                        }


                        $("#state-o").html(html_state);
                        $("#state-r").html(html_state);

                        $("#state-o").val(data.success.state_o.trim());
                        $("#state-r").val(data.success.state_r.trim());

                        $("#lga").val(data.success.lga);
                        $("#email").val(data.success.email);
                        $("#telephone").val(data.success.telephone.split("-")[1]);
                        $("#countryCode").val(data.success.telephone.split("-")[0]);
                        $("#sname").val(data.success.school_name);
                        $("#los").val(data.success.los);
                        if (data.success.los && data.success.los != "") {
                            var cix = $("#los").val().split("-");
                            var classes = levels[cix[1]].class;
                            $("#class").empty();
                            html_class = "<option value=''><!-----choose----></option>";
                            for (var u = 0; u < classes.length; u++) {
                                var ste = classes[u];
                                html_class += "<option value='" + ste + "'>" + ste + "</option>";
                            }
                            $("#class").append(html_class);
                            $("#class").val(data.success.class);
                        }

                        $("#saddress").val(data.success.school_address);
                        $("#sother").val(data.success.other_school_details);
                        editExpenseField(data.success.expenses, data.success.school_fees)
                        $('#ptitle option').each(function () {
                            if (this.value.trim() == data.success.parent_title.trim()) {
                                $("#ptitle").val(data.success.parent_title)
                            }
                        });

                        if ($("#ptitle").val() == "") {
                            $("#ptitle").val("Other")
                            $("#ptitle2").attr("type", "text");
                            $("#ptitle2").val(data.success.parent_title);
                        }

                        $("#pname").val(data.success.parent_name);
                        $("#pemail").val(data.success.parent_email);
                        $("#ptel").val(data.success.parent_telephone);
                        $("#story").val(data.success.story);
                        $("#goal").val(data.success.goal);

                        if (data.success.profile_photo) {
                            profilePic.val("");
                            $("#frame").attr("src", data.success.profile_photo);
                            $(".filly").addClass("deactivated");
                            $(".prev").removeClass("deactivated");
                        }
                        nextFieldset.attr("data-url", "/admin/kids/edit_profile");
                        nextFieldset.attr("data-type", "edit");
                        nextFieldset.attr("data-id", ID);
                        mdl.modal("show");
                    } else {
                        console.log(data.type);
                        var url = "/admin/Kids/edit_kid/" + ID;
                        location.replace(url);
                    }

                }


            }
        });

    });

    //Function to Delete Admin
    deleteKid.on("click", function (e) {
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

    //Function to Open Profile Modal
    profile.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        var url = $(this).attr("data-url");
        var mdl = $("#kidProfileModal");
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
                    $(".card-modal-title").html(data.success.fname + " " + data.success.lname + " Profile");
                    $(".card-modal-description").html("Who is " + data.success.fname + " " + data.success.lname + "of the Kids To school Foundation.");
                    var info = [{
                        'category': data.success.category,
                        'name': data.success.lname + " " + data.success.mname + " " + data.success.fname,
                        'D.O.B': data.success.dob.split("T")[0],
                        'age': data.success.age + " Yeras Old",
                        'gender': data.success.gender,
                        'country': data.success.country.split("-")[0] + ", " + data.success.state_o + " - " + data.success.state_r + "(" + data.success.lga + ")",
                        'email': "<a href='mailto:" + data.success.email + "'>" + data.success.email + "</a>",
                        'Tel': "<a href='tel:" + data.success.telephone + "'>" + data.success.telephone + "</a>",
                        'Home Address': data.success.address
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
                        "Date Joined": prettyDate(data.success.dob),
                        "Date of last Edit": prettyDate(data.success.last_edit),
                        "Created By": "<h6 class='text-danger'>" + data.success.created_by + "</h6>",
                        "Editted By": "<h6 class='text-danger'>" + data.success.editted_by + "</h6>",

                    }];

                    if (data.type == "modal") {
                        if (data.success.profile_photo != "") {
                            $(".avatar").attr('src', data.success.profile_photo);
                        } else {
                            $(".avatar").attr('src', '/images/profile/avatar/avatar.png');
                        }
                        $(".k-id").html("<h4>" + data.success.kid_id + "</h4>");

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
                                                    <span class='text-info'>`+ name + `</span>
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

                        if (data.success.expenses && data.success.expenses != null && data.success.expenses != "" && data.success.expenses != undefined) {
                            var darkside = data.success.expenses.expenses;
                            var data_html = "";
                            for (var b = 0; b < darkside.length; b++) {
                                var _html = `  <div class="row ml-3 my-4">
                                                    <div class="col-md-4">
                                                        <span class="frera">` + darkside[b].ename.toUpperCase() + `</span>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <span class="text-black mr-2 nigs">`+ prettyCurrency(darkside[b].evalue) + `</span>
                                                    </div>
                                                    
                                                    <div class="col-md-4">
                                                        <div class="data-sub bera">
                                                            <span>`+ darkside[b].edesc.toUpperCase() + `</span>
                                                        </div>
                                                    </div>
                                                </div >`;
                                data_html += _html
                            }
                        } else {
                            var data_html = `<span class=text-danger">No Expenses set Yet</span>`;
                        }
                        $(".exp-info").html(data_html);

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

    filterDOB.on("keydown", function (e) {

        var keys = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]

        if (keys.includes(parseInt(e.keyCode))) {
            vl += String.fromCharCode(e.keyCode)
            dobBtn.attr("data-dob", vl);
        } else {
            e.preventDefault()
        }

    });

    filter.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("yep");

        var param_1 = $(this).attr("data-data");
        var param_2 = $(this).attr("data-date");
        var param_3 = $(this).attr("data-dob");
        var order = $(this).attr("data-order");
        var url = $(".bingo").attr("data-url");

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
            var first = $(".active.get-kids").attr("data-url").trim();
            var url = first + "/search/keyword=" + new_val + "/page=0";
            location.replace(url);
        }

    });






});

function removeExpenseField(e) {
    console.log("here")
    var expenseFieldsCount = parseInt($("#expyy").html());
    e.preventDefault();
    e.stopPropagation();

    if ($(e.target).hasClass("remove-expense")) {
        var no = e.target.id.split("-")[1];
    } else {
        console.log($(e.target).parent())
        var no = $(e.target).parent().attr("id").split("-")[1];
    }
    var ky = ".rw-" + no;
    expenseFieldsCount--;
    $("#expyy").html(expenseFieldsCount)
    $(ky).remove();
};