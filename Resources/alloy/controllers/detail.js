function Controller() {
    function showBusinessDetails(e) {
        alert(e);
    }
    function doClick(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    function linkToPage(evt) {
        alert(evt);
        "website" == evt.clicksource || "tickets" == evt.clicksource;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    var __alloyId3 = [];
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId3,
        id: "mapview",
        ns: Ti.Map,
        height: "200",
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.detail.add($.__views.mapview);
    doClick ? $.__views.mapview.addEventListener("click", doClick) : __defers["$.__views.mapview!click!doClick"] = true;
    $.__views.details = Ti.UI.createView({
        id: "details",
        height: "500"
    });
    $.__views.detail.add($.__views.details);
    $.__views.description = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "11dp",
            fontWeight: "normal"
        },
        textAlign: "center",
        id: "description"
    });
    $.__views.details.add($.__views.description);
    $.__views.location = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "12dp",
            fontWeight: "normal"
        },
        textAlign: "center",
        id: "location"
    });
    $.__views.details.add($.__views.location);
    $.__views.businessName = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "18dp",
            fontWeight: "bold"
        },
        textAlign: "left",
        id: "businessName"
    });
    $.__views.details.add($.__views.businessName);
    showBusinessDetails ? $.__views.businessName.addEventListener("click", showBusinessDetails) : __defers["$.__views.businessName!click!showBusinessDetails"] = true;
    $.__views.time = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "11dp",
            fontWeight: "normal"
        },
        textAlign: "center",
        id: "time"
    });
    $.__views.details.add($.__views.time);
    $.__views.website = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "11dp",
            fontWeight: "normal"
        },
        textAlign: "center",
        id: "website"
    });
    $.__views.details.add($.__views.website);
    linkToPage ? $.__views.website.addEventListener("click", linkToPage) : __defers["$.__views.website!click!linkToPage"] = true;
    $.__views.tickets = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "11dp",
            fontWeight: "normal"
        },
        textAlign: "center",
        id: "tickets"
    });
    $.__views.details.add($.__views.tickets);
    linkToPage ? $.__views.tickets.addEventListener("click", linkToPage) : __defers["$.__views.tickets!click!linkToPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setBoxerStats = function(eventData) {
        alert("details page");
        $.detail.title = eventData.name;
        var d = eventData.description || "No description provided.";
        d = "At: " + eventData.location.address + " \r" + d;
        $.description.text = d;
        void 0 != eventData.website && eventData.website.length > 0 && ($.website = eventData.website);
        void 0 != eventData.ticketUrl && eventData.ticketUrl.lenght > 0 && ($.tickets = eventData.ticketUrl);
        var loc = Ti.Map.createAnnotation({
            latitude: eventData.location.geo.coordinates[1],
            longitude: eventData.location.geo.coordinates[0],
            title: eventData.name,
            subtitle: eventData.location.address,
            myid: eventData._id,
            animate: true,
            pincolor: Ti.Map.ANNOTATION_GREEN
        });
        var map = Ti.Map.createView({
            mapType: Ti.Map.STANDARD_TYPE,
            annotations: [ loc ],
            animate: true,
            regionFit: true,
            userLocation: true
        });
        $.mapView = map;
        $.mapview.region = {
            latitude: Alloy.Globals.location.coords.latitude,
            longitude: Alloy.Globals.location.coords.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
        $.mapview.addEventListener("click", function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
            ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
        });
        $.mapview.addAnnotation(loc);
        alert($.mapview.annotations.length);
    };
    __defers["$.__views.mapview!click!doClick"] && $.__views.mapview.addEventListener("click", doClick);
    __defers["$.__views.businessName!click!showBusinessDetails"] && $.__views.businessName.addEventListener("click", showBusinessDetails);
    __defers["$.__views.website!click!linkToPage"] && $.__views.website.addEventListener("click", linkToPage);
    __defers["$.__views.tickets!click!linkToPage"] && $.__views.tickets.addEventListener("click", linkToPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;