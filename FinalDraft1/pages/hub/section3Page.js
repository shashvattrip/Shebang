(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};

            WinJS.Utilities.query("#audio").listen("click", audioClickEventHandler, false);
            WinJS.Utilities.query("#video").listen("click", videoClickEventHandler, false);
            WinJS.Utilities.query("#mouse").listen("click", mouseClickEventHandler, false);
            WinJS.Utilities.query("#fileManager").listen("click", fileManagerClickEventHandler, false);
            WinJS.Utilities.query("#keyboard").listen("click", keyboardClickEventHandler, false);
            WinJS.Utilities.query("#stream").listen("click", streamClickEventHandler, false);
            

            //var listView = element.querySelector(".itemslist").winControl;
            //console.log(options.dataSource);
            //listView.itemDataSource = options.dataSource;
            //listView.layout = options.layout;
            //listView.oniteminvoked = options.oniteminvoked;
            initListView();
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });

    function fileManagerClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: "root", name: "tripathi", previous: "none" });
    }

    function audioClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/audio/audio.html");
    }

    function keyboardClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/keyboard/keyboard.html");
    }

    function mouseClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/mouse/mouse.html");
    }
    function videoClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/video/video.html");
    }
    function streamClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/stream/stream.html");
    }
    function initListView() {

    }
})();