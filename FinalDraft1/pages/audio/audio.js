// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var PAGEDOMELEMENT;
    WinJS.UI.Pages.define("/pages/audio/audio.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            console.log(element);
            PAGEDOMELEMENT = element;
            document.getElementById("playBackControl").addEventListener("change", playBackControlEventHandler, false);
            document.getElementById("lowerVolume").addEventListener("click", lowerVolume, false);
            document.getElementById("raiseVolume").addEventListener("click", raiseVolume, false);
            document.getElementById("playSong").addEventListener("click", playSong, false);
            document.getElementById("prevSong").addEventListener("click", playPrev, false);
            document.getElementById("nextSong").addEventListener("click", playNext, false);
        },

        unload: function (elements) {
            // TODO: Respond to navigations away from this page.
            console.log(elements);
            
            //elements.
            var controlDiv = document.getElementsByTagName("style");
            console.log(controlDiv);
            //controlDiv.parentNode.removeChild()
            //.parentNode.removeChild();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function playBackControlEventHandler(eventInfo) {
        console.log(eventInfo.target.value);
        //Update volume on the server

    }

    function lowerVolume() {
        var url = encodeURI("http://localhost:8080/api/audio/LowerVolume");
        console.log(url);
        $.getJSON(url, function (data) {
            console.log("Response from server : " + data.status);
        })
            .fail(function (jqxhr, textStatus, error) {
                console.log("Error!");
                networkErrorDisplay();
            });
    }
    function raiseVolume() {
        //console.log("lower volume API called");
        var url = encodeURI("http://localhost:8080/api/audio/RaiseVolume");
        console.log(url);
        $.getJSON(url, function (data) {
            console.log("Response from server : " + data.status);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.log("Error!");
            networkErrorDisplay();
        });
    }
    function playSong() {
        
        var url = encodeURI("http://localhost:8080/api/audio/Play");
        console.log(url);
        $.getJSON(url, function (data) {
            console.log("Response from server : " + data.status);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.log("Error!");
            networkErrorDisplay();
        });
    }

    function playNext() {
        
        var url = encodeURI("http://localhost:8080/api/audio/Next");
        console.log(url);
        $.getJSON(url, function (data) {
            console.log("Response from server : " + data.status);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.log("Error!");
            networkErrorDisplay();
        });
    }

    function playPrev() {
        console.log("lower volume API called");
        var url = encodeURI("http://localhost:8080/api/audio/Prev");
        console.log(url);
        $.getJSON(url, function (data) {
            console.log("Response from server : " + data.status);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.log("Error!");
            networkErrorDisplay();
        });
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
