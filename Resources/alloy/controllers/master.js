function Controller() {
    function openDetail(e) {
        $.trigger("detail", e);
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
        navBarHidden: true,
        exitOnClose: true,
        title: "Local Ruckus",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.master.add($.__views.table);
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "...",
        id: "__alloyId5"
    });
    $.__views.header = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "50dp",
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#44f",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        text: "Events",
        id: "header"
    });
    $.__views.table.headerView = $.__views.header;
    openDetail ? $.__views.table.addEventListener("click", openDetail) : __defers["$.__views.table!click!openDetail"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = [];
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) {
                Ti.API.error("Error: " + e.error);
                alert("Your location is not available");
                e.coords = {};
                e.coords.latitude = 39.102704;
                e.coords.longitude = -94.595033;
            }
            Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
                alert(reverseGeocoderResonse.places[0].city);
            });
            var ll = e.coords.longitude + "," + e.coords.latitude;
            var url = "http://api-stage.hoopla.io/event?ll=" + ll + "&radius=1000";
            var xhr = Ti.Network.createHTTPClient({
                onload: function() {
                    alert("got data");
                    data = JSON.parse(this.responseText);
                    var tableData = [];
                    for (var i = 0; data.length > i; i++) {
                        item = data[i];
                        tableData.push(Alloy.createController("row", {
                            name: item.name
                        }).getView());
                    }
                    $.table.setData(tableData);
                },
                onerror: function(e) {
                    alert(e.error);
                    alert(e.code);
                    Ti.API.error(e);
                },
                timeout: 1e4
            });
            Ti.API.error("Sending xh request");
            xhr.open("GET", url);
            xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
            xhr.send();
        });
    } else alert("Please enable location services");
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;