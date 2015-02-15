(function () {
    "use strict";

    var dataArray = [
    { title: "WMV", text: "A remote to control Windows Media Player", picture: "images/WMV.png" },
    { title: "VLC", text: "A remote to control VLC player", picture: "images/VLC.png" },
    { title: "File Manager", text: "View all files on your computer", picture: "images/folder.png" },
    { title: "Joystick", text: "A virtual joystick to use with your computer", picture: "images/joystick.png" },
    { title: "Stream", text: "Stream a video from your computer", picture: "images/stream.png" },
    { title: "Keyboard", text: "Virtual keyboard to control your computer", picture: "images/keyboard1.png" },
    { title: "Accello", text: "Use the phone's accelerometer to play games on your laptop", picture: "images/accelo.jpg" },
    { title: "File Transfer", text: "File transfer", picture: "images/filetransfer.png" },
    { title: "Kinect", text: "Konnect to Kinect", picture: "images/Kinect.png" }
    ];


    var dataList = new WinJS.Binding.List(dataArray);

    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            itemList: dataList
        };
    WinJS.Namespace.define("DataExample", publicMembers);

})();