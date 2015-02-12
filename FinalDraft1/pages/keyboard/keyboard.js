// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/keyboard/keyboard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            initKeyboard();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function initKeyboard() {
        $(function () {
            var $write = $('#write'),
                shift = false,
                capslock = false;

            $('#keyboard li').click(function () {
                var $this = $(this),
                    character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

                // Shift keys
                if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                    $('.letter').toggleClass('uppercase');
                    $('.symbol span').toggle();

                    shift = (shift === true) ? false : true;
                    capslock = false;
                    return false;
                }

                // Caps lock
                if ($this.hasClass('capslock')) {
                    $('.letter').toggleClass('uppercase');
                    capslock = true;
                    return false;
                }

                // Delete
                if ($this.hasClass('delete')) {
                    var html = $write.html();

                    $write.html(html.substr(0, html.length - 1));
                    return false;
                }

                // Special characters
                if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
                if ($this.hasClass('space')) character = ' ';
                if ($this.hasClass('tab')) character = "\t";
                if ($this.hasClass('return')) character = "\n";

                // Uppercase letter
                if ($this.hasClass('uppercase')) character = character.toUpperCase();

                // Remove shift once a key is clicked.
                if (shift === true) {
                    $('.symbol span').toggle();
                    if (capslock === false) $('.letter').toggleClass('uppercase');

                    shift = false;
                }

                // Change the URL here
                $write.html($write.html() + character);
                console.log(character);


            });
        });
    }
})();
