jQuery(document).ready(function ($) {
    var sidebarToggler = $("#sideBarToggler");
    var closeSidebar = $(".close-sidebar");
    var window_width = $(window).width();
    var sideBar = $("#sideBar");
    var mainPanel = $(".main-content");
    var original = $(".side-nav li").length;

    if (window_width <= 991) {
        if (!$(".side-nav li").hasClass("mob")) {
            var html = `<li class="nav-item mob">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="form-control kwy" placeholder="What are you looking for..." aria-label="Username"
                            aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %> mob">
                    <a class="nav-link" href="sponsors.html">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
            $(".side-nav").prepend(html);
        }
    } else {
        if ($(".side-nav li").length > original + 1) {
            $(".side-nav li").eq(0).remove();
            $(".side-nav li").eq(0).remove();
        }
    }

    for (var i = 0; i < $(".card-title").length; i++) {
        if ($($(".card-title")[i]).html().trim() == "") {
            $($(".card-title")[i]).html("0");
            console.log($($(".card-title")[i]).html())
        }
    }

    // $(document).on("click", function (e) {
    //     console.log(e.target);
    // });

    //Function to adjust sidebar on window size change
    $(window).on('resize', function () {

        var width = $(window).width();
        if (window_width <= 991) {
            if (!$(".side-nav li").hasClass("mob")) {
                var html = `<li class="nav-item mob">
                    <div class="search-area mt-2">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="form-control kwy" placeholder="What are you looking for..." aria-label="Username"
                            aria-describedby="basic-addon1">
                        </div>
                    </div>
                </li>
                <li class="nav-item <%= active.usr %> mob">
                   <a class="nav-link" href="/envoy/profile">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                </li>`;
                $(".side-nav").prepend(html);
            }
        } else {
            if ($(".side-nav li").length > original + 1) {
                $(".side-nav li").eq(0).remove();
                $(".side-nav li").eq(0).remove();
            }
        }
    });

    //Function to open and close sidebar in mobile view
    sidebarToggler.on("click", function (e) {
        e.preventDefault();
        sideBar.toggleClass("show");
        $(".overlay").removeClass("deactivated");
        if (sidebarToggler.hasClass("show")) {
            $(".logo").css({ "display": "none" })
        }
    });

    //Function To Close Sidebar Mobile VIEW
    closeSidebar.on("click", function (e) {
        //console.log("yep");
        e.preventDefault();
        sideBar.removeClass("show");
        $(".overlay").addClass("deactivated");
    });

    //
    mainPanel.on("click", function (e) {
        // console.log(e.target);
        if (!$(e.target).hasClass("fa-bars") && !$(e.target).hasClass("icon-reorder")) {
            sideBar.removeClass("show");
        }

    });

    //If Over Lay is Clicked
    $(".overlay").on("click", function (e) {
        e.preventDefault();
        sideBar.removeClass("show");
        $(".overlay").addClass("deactivated");
    });




});