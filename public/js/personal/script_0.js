jQuery(document).ready(function ($) {
    // var isHovered = $('.dropdown-toggle').is(":hover");

    // $('.navbar-menu .has-dropdown > a').on('click', function (e) {
    //     e.preventDefault(); $(this).parent().toggleClass('dropdown-active');
    // });



    $('#testimonial-owl').owlCarousel({
        loop: true,
        margin: 15,
        dots: true,
        nav: false,
        autoplay: true,
        responsive: { 0: { items: 1 }, 992: { items: 2 } }
    });
    $(".owl-dots").removeClass("disabled");

});