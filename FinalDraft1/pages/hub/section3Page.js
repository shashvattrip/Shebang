(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};

            var listView = document.getElementById("basicListView").winControl;
            listView.addEventListener("iteminvoked", function (eventInfo) {
                var index = eventInfo.detail.itemIndex;
                console.log(eventInfo.detail.itemIndex);
                switch (index) {
                    case 0: WinJS.Navigation.navigate("/pages/audio/audio.html", { url: "root" });
                        break;
                    case 1: WinJS.Navigation.navigate("/pages/audio/audio.html", { url: "root" });
                        break;
                    case 2: WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: "root" });
                        break;
                    case 3: WinJS.Navigation.navigate("/pages/joystick/joystick.html", { url: "root" });
                        break;
                    case 4: WinJS.Navigation.navigate("/pages/stream/stream.html", { url: "root" });
                        break;
                    case 5: WinJS.Navigation.navigate("/pages/keyboard/keyboard.html", { url: "root" });
                        break;
                    case 6: WinJS.Navigation.navigate("/pages/audio/audio.html", { url: "root" });
                        break;
                    case 7: WinJS.Navigation.navigate("/pages/filetransfer/filetransfer.html", { url: "root" });
                        break;
                    default: WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: "root" });
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

    
})();