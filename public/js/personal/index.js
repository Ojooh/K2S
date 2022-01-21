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
    var modal = $(".modal");

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

