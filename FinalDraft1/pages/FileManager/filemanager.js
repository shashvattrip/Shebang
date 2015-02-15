// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var pageOptions;
    var articlesList = [];
    var counter = 0;
    var selectionModeActive = false;
    var articleListView;
    var promise;
    function onPageNavigatedTo(url) {
        
        articlesList = [];
        if (url == null) {
            url = "";
        }
        counter++;
        var serverLink = MyGlobals.serverLink;
        console.log("Calling Api : " + serverLink + "/files" + url);
        var LINK = encodeURI(serverLink + "/files" + url);
        console.log(LINK);
        promise = WinJS.xhr({ url: LINK });
        promise.done(
           // Complete function
           
           function (response) {
               articlesList = [];

               var items = JSON.parse(response.responseText);
               console.log("content response");
               console.log(items.contents);
               for (var ctr = 0; ctr < items.contents.length; ctr++) {
                   var article = {};
                   article.title = items.contents[ctr].title;
                   article.pubDate = "date";
                   article.absoluteUrl = items.contents[ctr].absoluteUrl;
                   if (items.contents[ctr].type == "audio") {
                       article.type = "/images/music.png";
                   } else if (items.contents[ctr].type == "video") {
                       article.type = "/images/movie.png";
                   } else if (items.contents[ctr].type == "folder") {
                       article.type = "/images/folder1.png";
                   } else {
                       article.type = "/images/gray.png";
                   }
                   articlesList.push(article);
               }
               console.log(articlesList);
               var dataList = new WinJS.Binding.List(articlesList);
               
               articleListView = document.getElementById('articleListView').winControl;
               articleListView.itemDataSource = dataList.dataSource;

               //define events on listView items
               console.log("eventhandler ativated");
               articleListView.addEventListener("iteminvoked", navigateToPage,false);
           },

           // Error function
           function (response) {
               // handle error here...
               var erroMsg = new Windows.UI.Popups.MessageDialog("Oops. Looks you are not connected to a network!");
               erroMsg.showAsync();
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
            initAppBar();

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });


    function initAppBar() {
        var appBar = document.getElementById("fileManagerAppBar").winControl;
        appBar.disabled = false;
        var oneDriveCommand = appBar.getCommandById("cmdOneDrive");

        document.querySelector("#cmdSelect").addEventListener("click", doClickSelect, false);
        
        oneDriveCommand.disabled = false;

        oneDriveCommand.addEventListener("click", function (eventInfo) {
            //check if items are selected in the listview
            var listView = document.getElementById('articleListView').winControl;
            var indicesOfSelectedItems = listView.selection.getIndices();
            //console.log(listView.selection.getIndices());
            if (listView.selection.getIndices().length == 0) {
                //console.log("nothing selected!");
                var erroMsg = new Windows.UI.Popups.MessageDialog("Select folders/files to share");
                erroMsg.showAsync();
                return;
            }
            var urlArray = [];
            //send the absoluteUrl of all the folders/files selected
            for (var i = 0; i < indicesOfSelectedItems.length; i++) {
                urlArray.push(articlesList[indicesOfSelectedItems[i]].absoluteUrl);
                console.log(articlesList[indicesOfSelectedItems[i]].absoluteUrl);
            }
            //console.log(urlArray);
            //send ajax request 
            console.log("share to onedrive");
        }, false);
    }


    function doClickSelect() {

        console.log("Clicking select");
        var articleListView = document.getElementById('articleListView').winControl;
        //if selection mode is active then add oniteminvoked eventhandler

        if (selectionModeActive == false) {
            articleListView.removeEventListener("iteminvoked", navigateToPage);
        } else {
            articleListView.addEventListener("iteminvoked", navigateToPage, false);
        }
        selectionModeActive = !selectionModeActive;
        console.log("selectionMode"+selectionModeActive);
        var listViewEl = document.getElementById("articleListView").winControl;

        if (listViewEl) {
            var listView = listViewEl.element.winControl;
            toggleSelectionMode(listView);
        }
    }

    function toggleSelectionMode(listView) {
        if (listView.selectionModeActive) {
            listView.selectionModeActive = false;
            listView.tapBehavior = WinJS.UI.TapBehavior.invokeOnly;
            listView.selectionMode = WinJS.UI.SelectionMode.none;
            listView.selection.clear();
        } else {
            listView.selectionModeActive = true;
            listView.tapBehavior = WinJS.UI.TapBehavior.toggleSelect;
            listView.selectionMode = WinJS.UI.SelectionMode.multi;
            //var articleListView = document.getElementById('articleListView').winControl;
            //articleListView.removeEventListener("iteminvoked");
        }
        //updateAppBar();
        return listView.selectionModeActive;
    };

    function navigateToPage(eventInfo) {
        //if filetype is directory
        console.log("Page changed");
        console.log(articlesList[eventInfo.detail.itemIndex].type);
        if (articlesList[eventInfo.detail.itemIndex].type == "/images/folder.png") {
            WinJS.Navigation.navigate("/pages/FileManager/filemanager.html", { url: articlesList[eventInfo.detail.itemIndex].absoluteUrl });
        } else {
            //do  nothing
        }
        
    }

})();
