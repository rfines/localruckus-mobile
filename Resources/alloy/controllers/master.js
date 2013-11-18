function Controller() {
    function openDetail(e) {
        $.trigger("detail", e.rowData.eventData);
    }
    function loadEntertainment() {
        exports.loadInitialData({
            tags: "ENTERTAINMENT",
            radius: 1e3
        });
    }
    function loadFood() {
        exports.loadInitialData({
            tags: "FOOD-AND-DRINK",
            radius: 1e3
        });
    }
    function loadMusic() {
        exports.loadInitialData({
            tags: "MUSIC",
            radius: 1e3
        });
    }
    function loadArts() {
        exports.loadInitialData({
            tags: "ARTS",
            radius: 1e3
        });
    }
    function loadFamily() {
        exports.loadInitialData({
            tags: "FAMILY-AND-CHILDREN",
            radius: 1e3
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.master = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Local Ruckus",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.table = Ti.UI.createTableView({
        height: "80%",
        id: "table",
        top: "0"
    });
    $.__views.master.add($.__views.table);
    openDetail ? $.__views.table.addEventListener("click", openDetail) : __defers["$.__views.table!click!openDetail"] = true;
    var __alloyId9 = [];
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "Entertainment",
        id: "__alloyId10"
    });
    __alloyId9.push($.__views.__alloyId10);
    loadEntertainment ? $.__views.__alloyId10.addEventListener("click", loadEntertainment) : __defers["$.__views.__alloyId10!click!loadEntertainment"] = true;
    $.__views.__alloyId11 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createButton({
        title: "Music",
        id: "__alloyId12"
    });
    __alloyId9.push($.__views.__alloyId12);
    loadMusic ? $.__views.__alloyId12.addEventListener("click", loadMusic) : __defers["$.__views.__alloyId12!click!loadMusic"] = true;
    $.__views.__alloyId13 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "Arts",
        id: "__alloyId14"
    });
    __alloyId9.push($.__views.__alloyId14);
    loadArts ? $.__views.__alloyId14.addEventListener("click", loadArts) : __defers["$.__views.__alloyId14!click!loadArts"] = true;
    $.__views.__alloyId15 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createButton({
        title: "Family",
        id: "__alloyId16"
    });
    __alloyId9.push($.__views.__alloyId16);
    loadFamily ? $.__views.__alloyId16.addEventListener("click", loadFamily) : __defers["$.__views.__alloyId16!click!loadFamily"] = true;
    $.__views.__alloyId17 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createButton({
        title: "Food",
        id: "__alloyId18"
    });
    __alloyId9.push($.__views.__alloyId18);
    loadFood ? $.__views.__alloyId18.addEventListener("click", loadFood) : __defers["$.__views.__alloyId18!click!loadFood"] = true;
    $.__views.__alloyId7 = Ti.UI.iOS.createToolbar({
        items: __alloyId9,
        bottom: "0",
        height: "20%",
        id: "__alloyId7"
    });
    $.__views.master.add($.__views.__alloyId7);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.loadInitialData = function(options) {
        var data = [];
        var options = options || {};
        var radius = options.radius || 1e3;
        var tags = options.tags || "ENTERTAINMENT";
        var ll = Alloy.Globals.location.coords.longitude + "," + Alloy.Globals.location.coords.latitude;
        var url = "http://api-stage.hoopla.io/event?ll=" + ll + "&radius=" + radius + "&tags=" + tags;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                data = JSON.parse(this.responseText);
                var tableData = [];
                for (var i = 0; data.length > i; i++) {
                    item = data[i];
                    tableData.push(Alloy.createController("row", {
                        eventData: item,
                        name: item.name
                    }).getView());
                }
                alert("set table data");
                $.table.setData(tableData);
            },
            onerror: function(e) {
                alert(e);
                alert(e.source || "");
                Ti.API.error(e);
            }
        });
        Ti.API.error("Sending xh request");
        xhr.open("GET", url);
        xhr.setTimeout(3e4);
        xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
        xhr.send();
    };
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    __defers["$.__views.__alloyId10!click!loadEntertainment"] && $.__views.__alloyId10.addEventListener("click", loadEntertainment);
    __defers["$.__views.__alloyId12!click!loadMusic"] && $.__views.__alloyId12.addEventListener("click", loadMusic);
    __defers["$.__views.__alloyId14!click!loadArts"] && $.__views.__alloyId14.addEventListener("click", loadArts);
    __defers["$.__views.__alloyId16!click!loadFamily"] && $.__views.__alloyId16.addEventListener("click", loadFamily);
    __defers["$.__views.__alloyId18!click!loadFood"] && $.__views.__alloyId18.addEventListener("click", loadFood);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;