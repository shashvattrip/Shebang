(function () {
    "use strict";

    function initListView() {
        var dataArray = [];

        var dataList = new WinJS.Binding.List(dataArray);
        var publicMembers = {
            directories: dataList
        };

        WinJS.Namespace.define("DirectoriesArray", publicMembers);
    }

    initListView();
    

})();