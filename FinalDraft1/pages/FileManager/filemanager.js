// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var pageOptions;
    var articlesList = [];
    var counter = 0;
    function onPageNavigatedTo(url) {
        
        articlesList = [];
        if (typeof (url) == "undefined") {
            url = "root";
        }
        counter++;
        console.log("Calling Api : http://localhost:8080/api/fm/" + url);
        var promise = WinJS.xhr({ url: "http://localhost:8080/api/fm/" + url });
        promise.done(
           // Complete function
           
           function (response) {
               var items = JSON.parse(response.responseText);
               console.log(counter);
               for (var ctr = 0; ctr < items.contents.length; ctr++) {
                   var article = {};
                   article.title = items.contents[ctr].title;
                   article.pubDate = "date";
                   article.absoluteUrl = items.contents[ctr].absoluteUrl;
                   articlesList.push(article);
               }

               var dataList = new WinJS.Binding.List(articlesList);
               var articleListView = document.getElementById('articleListView').winControl;
               articleListView.itemDataSource = dataList.dataSource;

               //define events on listView items
               articleListView.addEventListener("iteminvoked", function (eventInfo) {
                   WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: articlesList[eventInfo.detail.itemIndex].absoluteUrl });
               });
           },

           // Error function
           function (response) {
               // handle error here...
           },

           // Progress function
           function (response) {
               // progress implementation goes here...
           }
        );
    }
    

    WinJS.UI.Pages.define("/pages/FileManager/filemanager.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //if (typeof (options) == "undefined") {
            //    options = {url: "root"};
            //}
            //pageOptions = options;
            //$("#currentLocation").text(options.url);
            //makeAjaxCall(options.url);
            
            onPageNavigatedTo(options.url);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });




    //var jsonResponse;
    //function makeAjaxCall(url) {
    //    console.log("making ajax to " + url);
    //    var url = encodeURI("http://localhost:8080/api");
    //    console.log(url);
    //    $.getJSON(url, function (data) {
    //        jsonResponse = data;
    //        populateView(data);
    //    });
    //}
    
    
    //function populateView(data) {
    //    var targetDiv = $('#listView');
    //    for (var i = 0 ; i < data.contents.length;i++) {
    //        targetDiv.append("<div style='width:100%;height:100px;'><img style='background-color:red;' id='as' class='linkClass'/><p id='p'>" + data.contents[i].title + "</p></div>");
    //        //$(".last().attr("id", i);
    //        $('#as').attr("id", i);
    //    }
    //    WinJS.Utilities.query(".linkClass").listen("click", fileManagerClickEventHandler, false);
    //}
    //function fileManagerClickEventHandler(eventInfo) {
    //    console.log("Called link handler");
    //    eventInfo.preventDefault();
    //    var link = eventInfo.target;
    //    WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: jsonResponse.contents[link.id].absoluteUrl});
    //}
})();
