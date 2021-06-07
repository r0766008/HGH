var last_opened_card_id;

$(document).ready(function () {
    function open_developer_card(e) {
        var developer_name = e.srcElement.id.replace("link_", "");
        var card = $("#activator_" + developer_name);
        card.click();
    }

    function opened_developer_card(e) {
        var clicked_card = e.srcElement.parentNode.parentNode;
        
        var links = clicked_card.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            links[i].tabIndex = "-1";
        }
        clicked_card.querySelector(".card_close a").tabIndex = "0";

        if (last_opened_card_id != undefined && last_opened_card_id != clicked_card.id)
            document.getElementById(last_opened_card_id).getElementsByClassName("card_close")[0].click();

        last_opened_card_id = e.srcElement.parentNode.parentNode.id;

        e.preventDefault();


        clicked_card.querySelector(".card_close a").focus();

        
        // On ESC press, close card
        $(clicked_card.querySelector(".card-title.activator")).on("keyup", function(e){
            if (e.keyCode == 27) clicked_card.querySelector(".card-reveal .card-title").click();
        });
        
    }

    // When clicking on card_close icon, close developer card
    function close_developer_card(e) {
        if (e.type == "click" || e.keyCode == 27 || e.keyCode == 13) {
            e.target.parentNode.parentNode.click();
        }
    }

    function closed_developer_card(e) {
        var clicked_card = document.getElementById(last_opened_card_id);

        var links = clicked_card.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            links[i].tabIndex = "0";
        }
        clicked_card.querySelector(".card-reveal .card-title a").tabIndex = "-1";

        $(document.body).off("keyup");
    }

    // Elements with the activator class are used to open the (dev) cards
    var activators = document.getElementsByClassName("activator");
    for (var i = 0; i < activators.length; i++) {
        activators[i].addEventListener("click", opened_developer_card);
    }

    var developers = $("#dev_links").children();
    for (var i = 0; i < developers.length; i++) {
        developers[i].addEventListener("click", open_developer_card);
    }

    $(".card_close").on("click keydown", close_developer_card);
    $(".card-reveal .card-title").on("click", closed_developer_card)
});