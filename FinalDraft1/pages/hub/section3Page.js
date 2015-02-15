(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};
            initAppBar();
            var listView = document.getElementById("basicListView").winControl;
            listView.addEventListener("iteminvoked", function (eventInfo) {
                var index = eventInfo.detail.itemIndex;
                console.log(eventInfo.detail.itemIndex);
                switch (index) {
                    case 0: WinJS.Navigation.navigate("/pages/audio/audio.html");
                        break;
                    case 1: WinJS.Navigation.navigate("/pages/vlc/vlc.html");
                        break;
                    case 2: WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", {url:null});
                        break;
                    case 3: WinJS.Navigation.navigate("/pages/joystick/joystick.html");
                        break;
                    case 4: WinJS.Navigation.navigate("/pages/stream/stream.html");
                        break;
                    case 5: WinJS.Navigation.navigate("/pages/keyboard/keyboard.html");
                        break;
                    case 6: WinJS.Navigation.navigate("/pages/accel/accel.html");
                        break;
                    case 7: WinJS.Navigation.navigate("/pages/filetransfer/filetransfer.html");
                        break;
                    case 8: WinJS.Navigation.navigate("/pages/kinect/kinect.html");
                        break;
                    default: WinJS.Navigation.navigate("/pages/FileManager/filemanager.html");
                }
                
            });
            
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });


    function initAppBar() {
        var appBar = document.getElementById("fileManagerAppBar").winControl;
        appBar.disabled = true;
    }
    
})();