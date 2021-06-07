function tab_enabled(query, enable) {
    var elements = document.querySelectorAll(query);
    for (var i = 0; i < elements.length; i++) {
        if (enable) {
            elements[i].tabIndex = "0";
        } else {
            elements[i].tabIndex = "-1"
        }
    }
}


$(window).on("resize load", function () {
    console.log("e")
    if ($(window).width() < 992) {
        tab_enabled(".hide-on-med-and-down a", false);
        tab_enabled(".sidenav-trigger", true);

    }
    // When the screen is large
    else {
        tab_enabled(".hide-on-med-and-down a", true);
        tab_enabled(".sidenav-trigger", false);
    }
});

$(document).ready(function () {

    $("#open-sidenav").on("keyup click", function (e) {
        var valid_keypress = (e.type == "keyup" && e.keyCode == 13);
        var valid_click = (e.type == "click");

        if (valid_keypress || valid_click) {
            tab_enabled(".sidenav a", true);
            document.querySelector("#nav-mobile a").focus();
        }
    });

    $("#nav-mobile a").keydown(function (e) {
        // TAB
        if (e.keyCode == 9 && !e.shiftKey) {
            // If last option has been reached
            if (e.target.parentNode.nextElementSibling == null) {
                e.preventDefault();
                document.getElementById("nav-mobile").querySelector("a").focus();
            }
        }
        // Shift + TAB
        else if (e.keyCode == 9 && e.shiftKey) {
            // If first element has been reached
            if (e.target.parentNode.previousElementSibling == null) {
                e.preventDefault();
                var options = document.getElementById("nav-mobile").querySelectorAll("a");
                options[options.length - 1].focus();
            }
        }
        else if (e.keyCode == 13) {
            document.querySelector(".sidenav-overlay").click();
        }
        // ESC or click 
        else if (e.keyCode == 27 || e.type == "click") {
            tab_enabled(".sidenav a", false);
            document.querySelector(".sidenav-overlay").click();
        }
    });

});
