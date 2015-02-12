// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var pageOptions;
    WinJS.UI.Pages.define("/pages/FileManager/filemanager.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            if (typeof (options) == "undefined") {
                options = {url: "root"};
            }
            pageOptions = options;
            $("#currentLocation").text(options.url);
            makeAjaxCall(options.url);
            
            

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    var jsonResponse;
    function makeAjaxCall(url) {
        console.log("making ajax to " + url);
        var url = encodeURI("http://localhost:8080/api");
        console.log(url);
        $.getJSON(url, function (data) {
            jsonResponse = data;
            populateView(data);
        });
    }
    //<a href='filemanager.html'><img src='../../images/Square44x44Logo.scale-240.png'/><p></p></a>
    
    function populateView(data) {
        var targetDiv = $('#listView');
        for (var i = 0 ; i < data.contents.length;i++) {
            targetDiv.append("<div style='width:100%;height:100px;'><img style='background-color:red;' id='as' class='linkClass'/><p id='p'>" + data.contents[i].title + "</p></div>");
            //$(".last().attr("id", i);
            $('#as').attr("id", i);
        }
        WinJS.Utilities.query(".linkClass").listen("click", fileManagerClickEventHandler, false);
    }
    function fileManagerClickEventHandler(eventInfo) {
        console.log("Called link handler");
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: jsonResponse.contents[link.id].absoluteUrl});
    }
})();
