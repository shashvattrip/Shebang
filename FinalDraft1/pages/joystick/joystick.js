// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/joystick/joystick.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            initJoystick();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function initJoystick() {
        // Get the canvas element.
        var canvas = document.getElementById("canvas");
        var diff = -10;
        var init_x = 0;
        var init_y = 0;

        // Specify a 2-D drawing context.
        var context = canvas.getContext("2d");
        canvas.width = window.outerWidth;
        canvas.height = window.outerHeight;
        var w = canvas.width,                           // cache some values
         h = canvas.height,

         glow = 0,                                   // size of glow
         dlt = 1,                                    // speed
         max = 40;                                   // max glow radius

        canvas.addEventListener("MSPointerDown", onFirstContact, false);
        canvas.addEventListener("MSPointerMove", onMove, false);
        canvas.addEventListener("MSPointerUp", touchHandler, false);




        function onFirstContact(event) {
            var pointerD = event.currentPoint;
            clearScreen();
            if (diff < 0) {
                diff = 0;
                init_x = pointerD.position.x;
                init_y = pointerD.position.y;
                drawCircle(init_x, init_y);
            }

        }

        //var request;
        var sens = 150.0;
        var counter = 0;
        function onMove(event) {
            var pointerD = event.currentPoint;
            var px = pointerD.position.x;
            var py = pointerD.position.y
            clearScreen();
            var diff_x = init_x - px;
            var diff_y = init_y - py;
            var LINK = MyGlobals.serverLink + "/joypad/";
            //console.log("LINK is: " + LINK);

            if (diff == 0 ) {
                if (diff_x > sens) {
                    console.log("Left");
                    counter++;
                    console.log(counter);
                    var request = WinJS.xhr({ url: LINK + "left" });
                    request.done(function () {
                    }, function (error) {
                        var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                        erroMsg.showAsync();
                    });
                }                    
                if (diff_x < -sens) {
                    console.log("Right");
                    counter++;
                    console.log(counter);
                    var request = WinJS.xhr({ url: LINK + "right" });
                    request.done(function () {
                    }, function (error) {
                        var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                        erroMsg.showAsync();
                    });
                }
                if (diff_y > sens) {
                    console.log("Up");
                    counter++;
                    console.log(counter);
                    var request = WinJS.xhr({ url: LINK + "up" });
                    request.done(function () {
                    }, function (error) {
                        var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                        erroMsg.showAsync();
                    });
                }
                if (diff_y < -sens) {
                    console.log("Down");
                    counter++;
                    var request = WinJS.xhr({ url: LINK + "down" });
                    request.done(function () {
                    }, function (error) {
                        var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
                        erroMsg.showAsync();
                    });
                }
                    
            }
            drawCircle(pointerD.position.x, pointerD.position.y);
            //console.log(pointerD.position.x + " : " + pointerD.position.y)

        }

        function touchHandler(event) {
            diff = -10;
            var init_x = 0;
            var init_y = 0;
            clearScreen();


        }

        function clearScreen() {
            context.clearRect(0, 0, w, h);

        }

        function drawCircle(centerX, centerY) {

            // var centerX = canvas.width / 2;
            // var centerY = canvas.height / 2;
            var radius = w * 0.1;

            context.beginPath();


            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.arc(centerX, centerY, radius + w * 0.05, 0, 2 * Math.PI, false);


            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#0404B4';
            context.stroke();



        }
        //cx = w * 0.5,
        // cy = h * 0.5,
        function anim(cx, cy) {
            context.clearRect(0, 0, w, h);                  // clear frame
            context.shadowBlur = glow;                      // set "glow" (shadow)

            context.beginPath();                            // draw circle
            context.arc(cx, cy, cx * 0.25, 0, 6.28);
            context.fill();                                 // fill and draw glow

            glow += dlt;                                // animate glow
            if (glow <= 0 || glow >= max) dlt = -dlt;

            requestAnimationFrame(anim);                // loop
        }
    }
})();
