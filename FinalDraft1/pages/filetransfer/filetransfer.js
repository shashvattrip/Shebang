// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/filetransfer/filetransfer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.querySelector("#pickPick").addEventListener("click", pickSinglePhoto, false);
            console.log(MyGlobals.serverLink);
            //pickSinglePhoto();


            if (options && options.activationKind === Windows.ApplicationModel.Activation.ActivationKind.pickFileContinuation) {
                continueFileOpenPicker(options.activatedEventArgs);
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function pickSinglePhoto() {
        // Clean scenario output
        //WinJS.log && WinJS.log("", "sample", "status");

        // Create the picker object and set options
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        // Users expect to have a filtered view of their folders depending on the scenario.
        // For example, when choosing a documents folder, restrict the filetypes to documents for your application.
        openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);
        console.log("picker");
        // Open the picker for the user to pick a file
        //openPicker.pickSingleFileAndContinue();
        openPicker.pickSingleFileAndContinue();
    }

    // Called when app is activated from file open picker
    // eventObject contains the returned files picked by user
    function continueFileOpenPicker(eventObject) {
        console.log("continuing");
        var files = eventObject[0].files;
        var filePicked = files.size > 0 ? files[0] : null;
        if (filePicked !== null) {
            // Application now has read/write access to the picked file
            console.log("File picked");
            console.log(filePicked.name);

            //filePicked.
            Windows.Storage.StorageFile.getFileFromPathAsync(filePicked.path)
                .then(function (file) {
                    return file.openAsync(Windows.Storage.FileAccessMode.read);
                })
            .then(function (fileStream) {
                var blob = MSApp.createBlobFromRandomAccessStream("image/bmp", fileStream);
                console.log("Posting");
                var formData = new FormData();
                formData.append("file", blob);
                console.log(filePicked.name);
                formData.append("fileName", filePicked.name);
                var serverUrl = MyGlobals.serverLink;
                var options = { url: serverUrl + "/upload", type: "post", data: formData, headers: { "Content-Type": "multipart/form-data" } };
                var request = WinJS.xhr(options);
                request.done(function (response) {
                    console.log("Upload successful!");
                    console.log(response);

                }, function (error) {
                    console.log("error");
                    console.log(error);
                });
            });


            //    done(function (file) {
            //    console.log("HGFGHJK");
            //    var url = URL.createObjectURL(file, { oneTimeOnly: true });
            //    var imageElement = document.getElementById("picDiv");
            //    imageElement.src = url;
            //    var blob = MSApp.createBlobFromRandomAccessStream("image/bmp", file);
            //    var postRequest = WinJS.xhr({ type: "POST", url: "something", data: blob });

            //});



            //WinJS.log && WinJS.log("Picked photo: " + filePicked.name, "sample", "status");
        } else {
            // The picker was dismissed with no selected file
            console.log("Something went wrong");
            //WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
        }
    }

    function readFromStream(sampleFile) {
        if (sampleFile !== null) {
            sampleFile.openAsync(Windows.Storage.FileAccessMode.read).then(function (readStream) {
                var size = readStream.size;
                var maxuint32 = 4294967295; // loadAsync only takes UINT32 value.
                if (size <= maxuint32) {
                    var dataReader = new Windows.Storage.Streams.DataReader(readStream);
                    dataReader.loadAsync(size).done(function (numBytesLoaded) {
                        var fileContent = dataReader.readString(numBytesLoaded);
                        WinJS.log && WinJS.log("The following text was read from '" + sampleFile.name + "' using a stream:\n" + fileContent, "sample", "status");
                        dataReader.close();
                    });
                } else {
                    var error = "File " + sampleFile.name + " is too big for LoadAsync to load in a single chunk. Files larger than 4GB need to be broken into multiple chunks to be loaded by LoadAsync.";
                    WinJS.log && WinJS.log(error, "sample", "error");
                }
            },
            function (error) {
                WinJS.log && WinJS.log(error, "sample", "error");
            });
        }
    };

})();
