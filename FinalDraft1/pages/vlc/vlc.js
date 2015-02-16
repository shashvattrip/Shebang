// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/vlc/vlc.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //document.getElementById("playBackControl").addEventListener("change", playBackControlEventHandler, false);
            document.getElementById("lowerVolume").addEventListener("click", lowerVolume, false);
            document.getElementById("raiseVolume").addEventListener("click", raiseVolume, false);
            document.getElementById("mute").addEventListener("click", muteVolume, false);
            document.getElementById("playSong").addEventListener("click", playSong, false);
            document.getElementById("pauseSong").addEventListener("click", pauseSong, false);
            document.getElementById("prevSong").addEventListener("click", playPrev, false);
            document.getElementById("nextSong").addEventListener("click", playNext, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function lowerVolume() {
        //console.log("lower volume API called");
        var LINK = MyGlobals.serverLink + "/vlc/LowerVolume";
        //console.log(url);
        var request = WinJS.xhr({ url: LINK });
        request.done(function () {
        }, function (error) {
        });
    }
    function raiseVolume() {
        //console.log("lower volume API called");
        var LINK = MyGlobals.serverLink + "/vlc/RaiseVolume";
        //console.log(url);
        var request = WinJS.xhr({ url: LINK });
        request.done(function () {
        }, function (error) {
        });
    }
    function muteVolume() {
        //console.log("lower volume API called");
        var LINK = MyGlobals.serverLink + "/vlc/mute";
        //console.log(url);
        var request = WinJS.xhr({ url: LINK });
        request.done(function () {
            console.log("Done!");
        }, function (error) {
            console.log("Not Done!");
        });
    }
    var requestPLAY;
    function playSong() {
        console.log("play song API called");
        var LINK = MyGlobals.serverLink + "/vlc/Play";
        console.log(LINK);
        requestPLAY = new WinJS.xhr({ url: LINK });
        requestPLAY.done(function () {
            console.log("Done!");
        }, function (error) {
            console.log("Not Done!");
        });
    }

    function pauseSong() {
        console.log("play song API called");
        var LINK = MyGlobals.serverLink + "/vlc/Pause";
        console.log(LINK);
        var requestPLAY = new WinJS.xhr({ url: LINK });
        requestPLAY.done(function () {
            console.log("Done!");
        }, function (error) {
            console.log("Not Done!");
        });
    }
    function playNext() {
        //console.log("lower volume API called");
        var LINK = MyGlobals.serverLink + "/vlc/Forward";
        //console.log(url);
        var request = WinJS.xhr({ url: LINK });
        request.done(function () {
            console.log("Done!");
        }, function (error) {
            console.log("NotDone!");
        });
    }

    function playPrev() {
        //console.log("lower volume API called");
        var LINK = MyGlobals.serverLink + "/vlc/Prev";
        //console.log(url);
        var request = WinJS.xhr({ url: LINK });
        request.done(function () {
            console.log("Done!");
        }, function (error) {
            console.log("not Done!");
        });
    }

})();
