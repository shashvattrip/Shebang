// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/accel/accel.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            initAccel();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function initAccel() {
        var accelerometer;
        //screen.msLockOrientation("landscape-primary", "landscape-secondary");

        accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
        console.log("accelrometer initialized");

        // Establish the report interval
        var minimumReportInterval = accelerometer.minimumReportInterval;
        var reportInterval = minimumReportInterval > 16 ? minimumReportInterval : 16;
        accelerometer.reportInterval = 500;

        console.log("event report interval established");
        // Establish the event handler
        accelerometer.addEventListener("readingchanged", onDataChanged);
        accelerometer.addEventListener("shaken", shakeshake);
        console.log("handlers established");

        var LINK = MyGlobals.serverLink + "/joypad/";

        // This function is called each time an accelerometer event
        // is fired by the driver.

        function onDataChanged(e) {
            //console.log("Data changed");
            var reading = e.reading;
            var accelX = reading.accelerationX;
            var accelY = reading.accelerationY;
            var accelZ = reading.accelerationZ;
            //console.log(accelX,accelY,accelZ);

            if (accelZ > 0.350 && accelZ < 0.950) {
                console.log("accelerate");
                var request = WinJS.xhr({ url: LINK + "down" });
                request.done(function () {
                }, function (error) {
                    //var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                    //erroMsg.showAsync();
                });
            }
                

            if (accelZ < -0.350 && accelZ > -0.950) {
                console.log("break");
                var request = WinJS.xhr({ url: LINK + "up" });
                request.done(function () {
                }, function (error) {
                    //var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                    //erroMsg.showAsync();
                });
            }
                


            if (accelY > 0.350 && accelY < 0.950) {
                console.log("Right");
                var request = WinJS.xhr({ url: LINK + "left" });
                request.done(function () {
                }, function (error) {
                    //var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                    //erroMsg.showAsync();
                });
            }
                


            if (accelY < -0.350 && accelY > -0.950) {
                console.log("left");
                var request = WinJS.xhr({ url: LINK + "right" });
                request.done(function () {
                }, function (error) {
                    //var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                    //erroMsg.showAsync();
                });
            }
                
        }

        function shakeshake(e) {
            console.log("I am shaking babY!!");
        }

    }
})();
