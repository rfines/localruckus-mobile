function Controller() {
    function openDetail(e) {
        $.trigger("detail", e.rowData.eventData);
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
        id: "table"
    });
    $.__views.master.add($.__views.table);
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
                void 0 != reverseGeocoderResonse.places[0] && alert(reverseGeocoderResonse.places[0].city);
            });
            var ll = e.coords.longitude + "," + e.coords.latitude;
            var url = "http://api-stage.hoopla.io/event?ll=" + ll + "&radius=1000";
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
        });
    } else alert("Please enable location services");
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;