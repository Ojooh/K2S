$(window).on('load', function () {
    $('#preloader-active').delay(4500).fadeOut('slow');
    $('body').delay(4500).css({ 'overflow': 'visible' });
    console.log("here");
});

jQuery(document).ready(function ($) {
    var langList = $(".nice-select");
    var menu = $('ul#navigation');
    var error = $(".error");
    var openMdl_3 = $(".mdl-envoy-form");
    var nextEnvoy = $("#envoyNext");
    var backEnvoy = $("#envoyBack");
    var data = {};

    function validEnvoy(id) {
        var field = $("fieldset");
        nameRegex = /^[A-Za-z.\s-]*$/;
        emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;

        if (id == 0) {
            var category = $("#category").val();
            var fname = $("#first_name").val();
            var lname = $("#last_name ").val();

            if (category === null || category === undefined || category == '') {
                return [false, "Category Input Data not valid, Category Field is required"];
            }
            else if (fname === null || fname === undefined || fname == '' || nameRegex.test(fname) == false) {
                return [false, "First Name Input Data not valid, First Name Field is required"];
            }
            else if (lname === null || lname === undefined || lname == '' || nameRegex.test(lname) == false) {
                return [false, "Last Name Input Data not valid, Last Name Field is required"];
            }
            else {
                data.category = category;
                data.fname = fname;
                data.lname = lname
                $(field[id]).animate({
                    width: 0,
                });
                $(field[id]).removeClass("d-block")
                $(field[id]).addClass("d-none")
                $(field[id + 1]).addClass("d-block");
                $(field[id + 1]).removeClass("d-none");
                console.log($(field[id + 1]))

                $(field[id + 1]).animate({
                    width: "100%"
                });
                backEnvoy.removeClass("d-none");
                backEnvoy.addClass("d-block");
                return [true, "Input Data valid"];
            }

        } else if (id == 1) {
            var gender = $("#gender").val();
            var email = $("#email").val();
            var phone = $("#phone").val();

            if (gender === null || gender === undefined || gender == '') {
                return [false, "Gender Input Data not valid, Gender Field is required"];
            }
            else if (email === null || email === undefined || email == '' || emailRegex.test(email) == false) {
                return [false, "Email Input Data not valid, Email Field is required"];
            }
            else if (phone === null || phone === undefined || phone == '' || telRegex.test(phone) == false) {
                return [false, "Phone Number Input Data not valid, Phone Number Field is required"];
            }
            else {
                data.gender = gender;
                data.email = email;
                data.phone = phone;

                return ["send", "Input Data valid"];
            }
        }

    }

    openMdl_3.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var mdl = $("#addEnvoyModalForm");
        mdl.modal("show");
        $("input").val("")
        $("select").val("")
        $("textarea").val("")
    });


    nextEnvoy.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        error.addClass("d-none");
        var id = parseInt($(this).attr("data-id"));

        let [state, msg] = validEnvoy(id);



        if (state && id == 0) {
            console.log(state);
            id = id + 1;
            console.log(id)
            $(this).attr("data-id", id);

        } else if (state == "send") {
            var url = "/register/user/";
            console.log(data);
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    Swal.fire({
                        title: 'Loading.....',
                        html: 'Please Hold on as details are uploaded, do not refresh.',
                        timer: 4000000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                },
                success: function (data) {
                    var mdl = $("#addEnvoyModalForm");
                    console.log(data.success);
                    if (data.success) {
                        mdl.modal("hide");
                        Swal.fire({
                            icon: "success",
                            title: data.success,
                            text: "Please follow the link sent to your email to validate your account and login",
                            allowOutsideClick: false,
                        }).then((result) => {
                            location.reload();
                        });

                    } else {
                        swal.close();
                        mdl.modal("show")
                        error.removeClass("d-none");
                        error.html(data.error);
                    }

                }
            });

        } else {
            error.removeClass("d-none");
            error.html(msg);
        }


    });

    backEnvoy.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        error.addClass("d-none");
        var field = $("fieldset");
        var id = parseInt(nextEnvoy.attr("data-id"));

        if (id > 0) {
            console.log(id);
            $(field[id]).animate({
                width: 0,
            });
            $(field[id]).removeClass("d-block")
            $(field[id]).addClass("d-none")
            $(field[id - 1]).addClass("d-block");
            $(field[id - 1]).removeClass("d-none");

            $(field[id - 1]).animate({
                width: "100%"
            });
            $(this).addClass("d-none");
            $(this).removeClass("d-block");
            nextEnvoy.attr("data-id", id - 1);
        }
    });




    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: '+',
            openedSymbol: '-'
        });
    };

    // $(document).on("click", function (e) {
    //     langList.toggleClass("open");
    //     $($(".option")[0]).toggleClass("selected focus");
    // })

    langList.on("click", function (e) {
        $(this).toggleClass("open");
        $($(".option")[0]).toggleClass("selected focus")
    });

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
            $(".header-sticky").removeClass("sticky-bar");
            $('#back-top').fadeOut(500);
        } else {
            $(".header-sticky").addClass("sticky-bar");
            $('#back-top').fadeIn(500);
        }
    });


    $('#back-top a').on("click", function () {
        $('body,html').animate({ scrollTop: 0 }, 800); return false;
    });


});

function mainSlider() {
    var BasicSlider = $('.slider-active');
    BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
    });
    BasicSlider.not('.slick-initialized').slick({
        autoplay: false,
        autoplaySpeed: 4000,
        dots: false,
        fade: true,
        arrows: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
            });
        });
    }
}
mainSlider();

var testimonial = $('.h1-testimonial-active');
if (testimonial.length) {
    testimonial.slick({
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: false,
        arrows: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrow: true
                }
            }, { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false, arrow: true } }, { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false, arrow: true } }]
    });
}/* 6. Nice Selectorp  */

var nice_Select = $('select');
if (nice_Select.length) {
    nice_Select.niceSelect();
}

$("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
});

new WOW().init();

$('.counter').counterUp({ delay: 10, time: 3000 });

$('#bar1').barfiller();
$('#bar2').barfiller();
$('#bar3').barfiller();
$('#bar4').barfiller();
$('#bar5').barfiller();
$('#bar6').barfiller();

