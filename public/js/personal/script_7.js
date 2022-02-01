jQuery(document).ready(function ($) {
    var error = $(".error");
    var sideBar = $("#sideBar");
    var openMdl_2 = $(".savings-card");
    var modal = $(".modal");
    var closeModl = $(".close-modal");
    var next = $(".next");
    var back = $(".back");
    var cardsy = $(".cardsy");
    var banky = $(".banky");
    var oldy = $(".oldy");
    var cc = $(".credit-cards");
    var inptArr = {};
    var start = 1;

    function isCurrent(d) {
        var tdy = new Date();
        var tst = new Date(d);

        if (tst >= tdy) {
            return true;
        } else {
            return false;
        }
    };

    function validateInput1(amount, to) {
        if (amount == "") {
            return [false, "Amount Field cannot be empty"];
        } else if (isNaN(amount) || parseInt(amount) < 0) {
            return [false, "Amount must be a number. greater than 0"];
        } else if (to == "") {
            return [false, "To Where Field cannot be empty"];
        } else {
            return [true, "Details Correct"];
        }
    };

    function validateInput2(input_1, input_2) {
        if (input_1 == "") {
            return [false, "Start Date is not set, Enter a start Date"];
        } else if (isCurrent(input_1) == false) {
            return [false, "Start date is set to the past, choose a future date"];
        } else if (input_2 == "" || input_2 == undefined) {
            return [false, "Debit Time is compulsory, Select a Debit time"];
        } else {
            return [true, "Details Correct"];
        }
    };

    function payWithPaystack(options) {
        let handler = PaystackPop.setup({
            key: options.key,
            email: options.email,
            amount: options.amount,
            ref: options.ref,
            channels: options.channels,
            currency: options.currency,
            fullname: options.fullname,
            onClose: function () {
                modal.modal("hide");
                Swal.fire({
                    icon: "error",
                    title: "Transaction Stopped",
                    text: "Click OK to proceed to Dashboard",
                    showCancelButton: false,
                    confirmButtonText: `OK`,
                    allowOutsideClick: false,
                }).then(() => {
                    location.reload();
                });
            },
            callback: function (response) {
                modal.modal("hide");
                let url = 'sponsor/payment/verify=' + response.reference + '/wallet=' + options.to;
                console.log(url);
                $.ajax({
                    url: url,
                    method: "GET",
                    dataType: "json",
                    beforeSend: function (xhr) {
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
                        inptArr = {};
                        console.log(data);
                        if (data.success) {
                            modal.modal("hide");

                            Swal.fire({
                                icon: "success",
                                title: data.success,
                                text: "Click OK to proceed to Dashboard",
                                confirmButtonText: `OK`,

                                allowOutsideClick: false,
                            }).then(() => {
                                location.reload();
                            });

                        } else {
                            swal.close();
                            error.html("");
                            msg = "<span class='alert alert-success text-center'>" + data.error + "</span>";
                            error.html(msg);
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus + " error encountered: " + errorThrown)
                    }
                });
            }
        });
        handler.openIframe();
    }


    //If Over Lay is Clicked
    $(".overlay").on("click", function (e) {
        e.preventDefault();
        sideBar.removeClass("show");
        $(".overlay").addClass("deactivated");
    });


    //Function to close Modal
    closeModl.on("click", function (e) {
        modal.modal("hide");
    });

    //Function to Open Modal
    openMdl_2.on("click", function (e) {
        console.log("here");
        e.preventDefault();
        e.stopPropagation();
        var mdl = $("#paymentModal");

        if ($(this).hasClass("qk")) {
            $(".card-modal-title").html("Quick Save Payment");
            $(".card-modal-description").html("Send money to e-wallet");
            $(".qky").removeClass("deactivated");
            $(".dny").addClass("deactivated");
            $(".asy").addClass("deactivated");
            $('.card-modal-header').addClass("bg-success");
            $('.card-modal-header').removeClass("bg-info");
            $('.card-modal-header').removeClass("bg-warning");
            next.attr("data-type", "qky");
        } else if ($(this).hasClass("dn")) {
            $(".card-modal-title").html("Donations");
            $(".card-modal-description").html("Money in this wallet is used to attend to kids that are not focused on.");
            $(".dny").removeClass("deactivated");
            $(".qky").addClass("deactivated");
            $(".asy").addClass("deactivated");
            $('.card-modal-header').addClass("bg-info");
            $('.card-modal-header').removeClass("bg-success");
            $('.card-modal-header').removeClass("bg-warning");
            // next.addClass("bg-warning");
            next.attr("data-type", "dny");
        } else if ($(this).hasClass("as")) {
            $(".card-modal-title").html("Auto Save");
            $(".card-modal-description").html("Enable Auto save for recurrent deductions to e-wallet");
            $(".asy").removeClass("deactivated");
            $(".qky").addClass("deactivated");
            $(".dny").addClass("deactivated");
            $('.card-modal-header').addClass("bg-warning");
            $('.card-modal-header').removeClass("bg-success");
            $('.card-modal-header').removeClass("bg-info");
            // next.addClass("bg-warning");
            next.attr("data-type", "asy");
        }



        mdl.modal("show");
        //content.css({"position":"static", "top" : "none"});
    });

    //Function to handle next button
    next.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var type = $(this).attr("data-type");

        if (type == "qky" || type == "dny") {
            var amount = $("." + type + " #amount").val();
            var to = $("." + type + " #to").val();
            var email = $("." + type + " #email").val();
            var f_name = $("." + type + " #fname").val();
            var [valid, err] = validateInput1(amount, to);

            if (valid) {
                error.html("");
                var before = "." + type + " .slide-" + start.toString();
                start += 1
                var select = "." + type + " .slide-" + start.toString();
                $(select).removeClass("deactivated");
                $(before).addClass("deactivated");
                $(this).addClass("deactivated");
                if (start > 1) {
                    back.removeClass("deactivated");
                }


                inptArr.amount = amount * 100;
                inptArr.to = to;
                inptArr.email = email;
                inptArr.f_name = f_name;
            } else {
                msg = "<span class='alert alert-success text-center'>" + err + "</span>";
                error.html(msg);
            }

        } else if (type == "asy" && start == 1) {
            var amount = $("." + type + " #amount").val();
            var to = $("." + type + " #to").val();
            var rout = $("." + type + " input[name=routine]:checked").val();
            var email = $("." + type + " #email").val();
            var f_name = $("." + type + " #fname").val();
            var [valid, err] = validateInput1(amount, to);

            if ((valid) && (rout == "" || rout == undefined)) {
                [valid, err] = [false, "Select How often for Deduction, before proceeding"]
            }

            if (valid) {
                error.html("");
                var before = "." + type + " .slide-" + start.toString();
                start += 1
                var select = "." + type + " .slide-" + start.toString();
                $(select).removeClass("deactivated");
                $(before).addClass("deactivated");
                if (start > 1) {
                    back.removeClass("deactivated");
                }

                inptArr.amount = amount * 100;
                inptArr.to = to;
                inptArr.rout = rout
                inptArr.email = email;
                inptArr.f_name = f_name;
            } else {
                msg = "<span class='alert alert-success text-center w-100'>" + err + "</span>";
                error.html(msg);
            }
        } else if (type == "asy" && start == 2) {
            var startt = $("." + type + " #startt").val();
            var debit_t = $("." + type + " input[name=debit-t]:checked").val();
            var [valid, err] = validateInput2(startt, debit_t);

            if (valid) {
                error.html("");
                var before = "." + type + " .slide-" + start.toString();
                start += 1
                var select = "." + type + " .slide-" + start.toString();
                $(select).removeClass("deactivated");
                $(before).addClass("deactivated");
                if (start > 1) {
                    back.removeClass("deactivated");
                }

                if ($("." + type + " .credit-cards").length == 0) {
                    console.log("." + type + " .creidt-cards")
                    next.addClass("deactivated")
                }
                inptArr.start = startt;
                inptArr.debit = debit_t;
            } else {
                msg = "<span class='alert alert-success text-center w-100'>" + err + "</span>";
                error.html(msg);
            }
        } else if (type == "asy" && start == 3) {
            var pyt = $(".credit-cards.selected").attr("data-no")

            if (pyt && (pyt != "" || pyt !== undefined)) {
                error.html("");
                modal.modal("hide");
                Swal.fire({
                    icon: "success",
                    title: "Auto Save has been set",
                    text: "Click OK to proceed to Dashboard",
                    confirmButtonText: `OK`,
                    allowOutsideClick: false,
                }).then(() => {
                    location.reload();
                });
            } else {
                msg = "<span class='alert alert-success text-center w-100'>Selct a payment method</span>";
                error.html(msg);
            }
        }


    });

    //function to handle go back button
    back.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var type = next.attr("data-type");

        var current = "." + type + " .slide-" + start.toString();
        start -= 1
        var select = "." + type + " .slide-" + start.toString();
        $(select).removeClass("deactivated");
        $(current).addClass("deactivated");

        if (start == 1) {
            back.addClass("deactivated");
            next.removeClass("deactivated");
        } else {
            back.removeClass("deactivated");
        }



    });


    //function to handle card payment
    cardsy.on("click", function (e) {
        e.preventDefault();
        inptArr.key = "pk_test_d92bb45a27490f6eba1bfd8cd966211c7fcbc0f6";
        inptArr.ref = '' + Math.floor((Math.random() * 1000000000) + 1);
        inptArr.channels = ['card'];
        inptArr.currency = 'NGN';

        payWithPaystack(inptArr);

    });

    //function to handle bank Payment
    banky.on("click", function (e) {
        e.preventDefault();
        inptArr.key = "pk_test_d92bb45a27490f6eba1bfd8cd966211c7fcbc0f6";
        inptArr.ref = '' + Math.floor((Math.random() * 1000000000) + 1);
        inptArr.channels = ['bank'];
        inptArr.currency = 'NGN';

        console.log(inptArr);
        payWithPaystack(inptArr);

    });

    //function to handle bank Payment
    oldy.on("click", function (e) {
        e.preventDefault();
        inptArr.key = "pk_test_d92bb45a27490f6eba1bfd8cd966211c7fcbc0f6";
        inptArr.ref = '' + Math.floor((Math.random() * 1000000000) + 1).toString();
        var url = "/sponsor/charge";
        var data = { card_no: $(this).attr("data-no"), amount: inptArr.amount, wllt: inptArr.to };

        modal.modal("hide");
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
                inptArr = {};
                console.log(data);
                if (data.success) {
                    modal.modal("hide");

                    Swal.fire({
                        icon: "success",
                        title: data.success,
                        text: "Click OK to proceed to Dashboard",
                        confirmButtonText: `OK`,
                        allowOutsideClick: false,
                    }).then(() => {
                        location.reload();
                    });

                } else {
                    modal.modal("show");
                    swal.close();
                    error.html("");
                    msg = "<span class='alert alert-success text-center'>" + data.error + "</span>";
                    error.html(msg);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " error encountered: " + errorThrown)
            }
        });

    });

    //function to handle credit card onclick
    cc.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        cc.removeClass("selected");
        $(this).toggleClass("selected");
    });



});