(function ($) {
    $(function () {
        $('.sidenav').sidenav();
        $('.parallax').parallax();
        $('.tabs').tabs();
        $('.dropdown-trigger').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          coverTrigger: false // Displays dropdown below the button
        }
      );
    }); // end of document ready
})(jQuery); // end of jQuery name space
