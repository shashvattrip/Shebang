// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/kinect/kinect.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("btnOn").addEventListener("click", kinectOnEvent, false);
            document.getElementById("btnOff").addEventListener("click", kinectOffEvent, false);
            document.getElementById("btnStatus").addEventListener("click", kinectStatusEvent, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function kinectOnEvent(eventInfo) {
        var LINK = MyGlobals.serverLink + "/kinect/init";
        var promise = WinJS.xhr({ url: LINK });
        promise.done(function (ev) {
            console.log(ev.responseText);
            
        }, function () {
            
        });
    }
    function kinectOffEvent(eventInfo) {
        var LINK = MyGlobals.serverLink + "/kinect/stop";
        var promise = WinJS.xhr({ url: LINK });

        promise.then(function (ev) {
            console.log(ev.responseText);
            
        }, function () {
            
        });
    }
    function kinectStatusEvent(eventInfo) {
        var LINK = MyGlobals.serverLink + "/kinect/status";
        var promise = WinJS.xhr({ url: LINK });
        promise.then(function (res) {
            
        }, function () {
            
        });
    }

})();
