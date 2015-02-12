// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var counterDelay = 0;
    WinJS.UI.Pages.define("/pages/mouse/mouse.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            initMouse();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function initMouse() {
        var canvas = document.getElementById("canvas");

        // Specify a 2-D drawing context.
        var context = canvas.getContext("2d");

        canvas.addEventListener("MSPointerMove", updateMouseCoordinates, false);

        //function touchHandler(event) {

        //    console.log(event.x, event.y);
        //    //send request
        //}
    }

    function updateMouseCoordinates(event) {
        counterDelay++;
        if (counterDelay % 5 == 0) {
            var url = encodeURI("http://localhost:8080/api/mouse/" + event.x + '/' + event.y);
            console.log(url);
            $.getJSON(url, function (data) {
                console.log("Response from server : " + data.status);
            })
                .fail(function (jqxhr, textStatus, error) {
                    console.log("Error!");
                    networkErrorDisplay();
                });
        }
    }

    function networkErrorDisplay(error) {
        var msg = new Windows.UI.Popups.MessageDialog(
            "not connexted to network");
        // Add commands and set their command handlers
        //msg.commands.append(new Windows.UI.Popups.UICommand(
        //    "Try again",
        //    tryAgainCommandInvokedHandler));
        msg.commands.append(
            new Windows.UI.Popups.UICommand("Close", closeCommandInvokedHandler));

        // Set the command that will be invoked by default
        msg.defaultCommandIndex = 0;

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 1;
        msg.showAsync();
    }

    function closeCommandInvokedHandler() {
        console.log("Handler Called!");
    }

})();
