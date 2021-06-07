// Custom script to set the alt attribute on the yet-to-be-generated iframe
// This function is called on the onload of //www.instagram.com/embed.js
function set_instagram_iframe_attributes() {
    var i = 0;
    var iframes;
    var ping_for_iframe_gen = setInterval(function () {
        if ((iframes = document.getElementsByTagName("iframe")).length > 0) {
            iframes[0].alt = "Our Instagram feed";
            iframes[0].title = "Our Instagram feed";

            clearInterval(ping_for_iframe_gen);
        }
        // If after 60 cycles of 1000 ms (totalling over 1 minute) the iframe isn't loaded yet,
        // stop trying to ping it to not tank performance.
        if (i > 60) {
            clearInterval(ping_for_iframe_gen);
        }
        i++;
    }, 1000);
}
