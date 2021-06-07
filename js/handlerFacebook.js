// Timer that - when expired - rerenders the Facebook plugin
var time;
// The browser window size before resizing
var clientWidth = -1;
// I coded the ping to - amongst other things - check for the fb-xfbml-state
// attribute in the plugin, which should hold the "rendered" value
// However, the value is still "rendered" when first starting the resize
// So this bool will be set to false by default, and only to true when the
// plugin has rerendered
var rerendered;

// When the page loads or resizes, the facebook page needs to be scaled and reparsed
$(window).on("resize load", function () {
    var fb_container = document.getElementById("facebook-container");
    var fb_loading_screen = document.getElementById("facebook-loading").style;

    // The browser width during the resize
    var newWidth = document.documentElement.clientWidth;


    fb_container.className = "col s12 l6 center";

    // Facebook does not need to be scaled if height is changed, so check for width difference
    // This will still run when initially loading, since clientWidth is set to -1 default
    if (clientWidth != newWidth) {
        rerendered = false;

        var instagram_not_loading;
        // There's a loading screen above the Facebook box to make the horrible flashing less apparent
        // If Facebook just had a responsive box like Instagram that would have saved me a lot of time
        // This function pings regularly to check whether the facebook plugin has properly re-rendered
        var resize_loading_screen = setInterval(function () {
            try {
                // Set the facebook container width and height to the instagram width/height
                var instagram_container = document.getElementById("instagram-embed-0");
                fb_container.style.height = instagram_container.offsetHeight + "px";
                fb_container.style.width = instagram_container.offsetWidth + "px";

                clearTimeout(instagram_not_loading);
            } catch {
                instagram_not_loading = setTimeout(function(){
                    clearInterval(resize_loading_screen);
                }, 5000);
            }
            
            // Show the loading screen
            fb_loading_screen.display = "initial";

            try {
                // Fetch the facebook render to check whether the render has rendered
                var fb_page = document.querySelector(".fb-page");
                // Get the height of the instagram box, which the facebook page equals once it's ready
                var desired_height = document.getElementById("instagram-embed-0").height;
                // If the Facebook plugin has rendered
                if (fb_page.getAttribute("fb-xfbml-state") == "rendered" && fb_page.getAttribute("data-height") == desired_height && rerendered) {
                    // Stop pinging
                    clearInterval(resize_loading_screen);
                    // In 500 ms...
                    setTimeout(function () {
                        // ... put the z-depth-2 class on the Facebook container
                        fb_container.className = "col s12 l6 center";
                        // Use a 200ms fadeout animation to elegantly show the rendered page
                        $("#facebook-loading").fadeOut(200, function () {
                            // After the fadeout is done, unrender the loading screen
                            fb_loading_screen.display = "none";
                        });
                    }, 500)
                }

            } catch { }

        }, 150);

        // The actual Facebook box has to be re-rendered after the moving is done
        // In 500ms, scale and reparse the Facebook box, unless it's moved again
        clearTimeout(time);
        time = setTimeout(function () {
            var fb_plugin = document.getElementById("facebook-plugin");

            var element_with_desired_height = document.getElementById("instagram-embed-0") || document.querySelector(".instagram-media.center");

            // Load in the plugin, which will adapt to the container width and height
            fb_plugin.innerHTML = '<div style="margin: auto; min-width: 180px; max-width: 500px; z-depth-2"><div class="fb-page" data-href="https://www.facebook.com/hetgoudenhart.vzw/" data-width="' + fb_plugin.offsetWidth + '" data-height="' + element_with_desired_height.offsetHeight + '" data-tabs="timeline" data-small-header="false" data-hide-cover="false" data-show-facepile="true"> <blockquote cite="https://www.facebook.com/hetgoudenhart.vzw/?view_public_for=297059091163262" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/hetgoudenhart.vzw/">HGH</a></blockquote></div></div>';
            // Render the plugin
            FB.XFBML.parse();
            // Set rerendered true, so the code above knows that the rendering is done
            rerendered = true;
        }, 250);

        // Save the new width as the current width for when the browser is resized again
        clientWidth = newWidth;
    }
});