function Controller() {
    function showBusinessDetails(e) {
        alert(e);
    }
    function doClick(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    function setRegion() {}
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
    $.__views.detailImage = Ti.UI.createImageView({
        id: "detailImage",
        height: "200",
        width: "250",
        bottom: "10"
    });
    $.__views.detail.add($.__views.detailImage);
    var __alloyId3 = [];
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId3,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.detail.add($.__views.mapview);
    doClick ? $.__views.mapview.addEventListener("click", doClick) : __defers["$.__views.mapview!click!doClick"] = true;
    setRegion ? $.__views.mapview.addEventListener("complete", setRegion) : __defers["$.__views.mapview!complete!setRegion"] = true;
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        height: "1500"
    });
    $.__views.detail.add($.__views.scrollView);
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
    $.__views.scrollView.add($.__views.description);
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
    $.__views.scrollView.add($.__views.location);
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
    $.__views.scrollView.add($.__views.businessName);
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
    $.__views.scrollView.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setBoxerStats = function(eventData) {
        $.detail.title = eventData.name;
        var d = eventData.description || "No description provided.";
        d = "At: " + eventData.location.address + " \r" + d;
        $.description.text = d;
        void 0 != eventData.media && eventData.media.length > 0 && ($.detailImage.image = eventData.media[0].url);
        var location = Titanium.Map.createAnnotation({
            latitude: eventData.location.geo.coordinates[1],
            longitude: eventData.location.geo.coordinates[0],
            title: eventData.name,
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            animate: true,
            myid: eventData._id
        });
        alert(location.latitude);
        var mapview = Titanium.Map.createView({
            mapType: Titanium.Map.STANDARD_TYPE,
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ location ]
        });
        $.mapview = mapview;
        mapview.addEventListener("click", function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
            ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
        });
        $.mapview.region = {
            latitude: eventData.location.geo.coordinates[1],
            longitude: eventData.location.geo.coordinates[0],
            latitudeDelta: .01,
            longitudeDelta: .01
        };
    };
    __defers["$.__views.mapview!click!doClick"] && $.__views.mapview.addEventListener("click", doClick);
    __defers["$.__views.mapview!complete!setRegion"] && $.__views.mapview.addEventListener("complete", setRegion);
    __defers["$.__views.businessName!click!showBusinessDetails"] && $.__views.businessName.addEventListener("click", showBusinessDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;