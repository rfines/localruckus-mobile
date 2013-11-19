function Controller() {
    function showBusinessDetails(e) {
        alert(e);
    }
    function doClick(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    function linkToPage(evt) {
        "tickets" == evt.clicksource && Titanium.Platform.openURL(data.ticketUrl);
    }
    function moreInfo() {
        data.website && Titanium.Platform.openURL(data.website);
    }
    function callEvent() {
        var url = "tel:" + data.contactPhone;
        Titanium.UI.currentWindow;
        var optionsAlertOpts = {
            buttonNames: [ "Cancel", "Call" ],
            message: "Would you like to call now?",
            title: "Call Contact Number"
        };
        var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts).show();
        dialog.addEventListener("click", function(e) {
            "1" == e.index && Titanium.Platform.openURL(url);
        });
    }
    function buyTickets() {
        data.ticketUrl && Titanium.Platform.openURL(data.ticketUrl);
    }
    function share() {
        var fb = require("facebook");
        fb.appid = "1433425413548423";
        fb.permissions = [ "read_stream" ];
        fb.forceDialogAuth = false;
        fb.addEventListener("login", function(e) {
            e.success ? alert("Logged In") : e.error ? alert(e.error) : e.cancelled && alert("Cancelled");
        });
        var optionsAlertOpts = {
            buttonNames: [ "Cancel", "Facebook", "Twitter" ],
            message: "Facebook or Twitter?",
            title: "Share this event"
        };
        var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
        dialog.addEventListener("click", function(e) {
            alert(e);
            "1" == e.index ? fb.reauthorize([ "publish_stream", "rsvp_event", "publish_actions" ], "friends", function(e) {
                if (e.success) {
                    var defaultMessage = "Check out this awesome event! I'm thinking about going, who wants to go with me?";
                    var mediaUrl = "";
                    void 0 != data.media && data.media.length > 0 && (mediaUrl = data.media[0].url);
                    alert(mediaUrl);
                    var description = data.name + " at " + data.location.address;
                    void 0 != data.description && data.description.length > 0 && (description = data.description);
                    alert(description);
                    var link = "http://www.localruckus.com/event/" + data._id.toString();
                    alert(link);
                    var fbdata = {
                        link: link,
                        name: "Local Ruckus Mobile",
                        message: defaultMessage,
                        caption: data.name,
                        picture: mediaUrl,
                        description: description
                    };
                    fb.dialog("feed", fbdata, function(e) {
                        e.success && e.result ? alert("Success! New Post ID: " + e.result) : e.error ? alert(e.error) : alert("User canceled dialog.");
                    });
                } else e.error ? alert(e.error) : alert("Unknown result");
            }) : "2" == e.index && alert("twitter");
        });
        dialog.show();
        fb.loggedIn || fb.authorize();
    }
    function getDirections() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "myWindow"
    });
    $.__views.myWindow && $.addTopLevelView($.__views.myWindow);
    var __alloyId2 = [];
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId2,
        id: "mapview",
        ns: Ti.Map,
        layout: "vertical",
        height: "150",
        bottom: "2",
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.myWindow.add($.__views.mapview);
    doClick ? $.__views.mapview.addEventListener("click", doClick) : __defers["$.__views.mapview!click!doClick"] = true;
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.myWindow.add($.__views.__alloyId3);
    $.__views.descriptionView = Ti.UI.createView({
        id: "descriptionView",
        layout: "vertical"
    });
    $.__views.__alloyId3.add($.__views.descriptionView);
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
    $.__views.descriptionView.add($.__views.location);
    getDirections ? $.__views.location.addEventListener("click", getDirections) : __defers["$.__views.location!click!getDirections"] = true;
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
    $.__views.descriptionView.add($.__views.description);
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
    $.__views.descriptionView.add($.__views.businessName);
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
    $.__views.descriptionView.add($.__views.time);
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
    $.__views.descriptionView.add($.__views.website);
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
    $.__views.descriptionView.add($.__views.tickets);
    linkToPage ? $.__views.tickets.addEventListener("click", linkToPage) : __defers["$.__views.tickets!click!linkToPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = {};
    exports.setBoxerStats = function(eventData) {
        data = eventData;
        var win = $.myWindow;
        win.title = eventData.name;
        var buttons = [];
        var d = eventData.description || "No description provided.";
        var l = "At: " + eventData.location.address;
        $.description.text = d;
        $.location.text = l;
        alert(eventData.ticketUrl);
        if (void 0 != eventData.website && eventData.website.length > 0) {
            var webBtn = Ti.UI.createButton({
                title: "More Info",
                id: "moreInfoBtn"
            });
            webBtn.addEventListener("click", moreInfo);
            buttons.push(webBtn);
        }
        if (void 0 != eventData.contactPhone && eventData.contactPhone.length > 0) {
            var phoneBtn = Ti.UI.createButton({
                title: "Call Event",
                id: "callBtn"
            });
            phoneBtn.addEventListener("click", callEvent);
            buttons.push(phoneBtn);
        }
        if (void 0 != eventData.ticketUrl && eventData.ticketUrl.length > 0) {
            var ticketBtn = Ti.UI.createButton({
                title: "Tickets",
                id: "ticketBtn"
            });
            ticketBtn.addEventListener("click", buyTickets);
            buttons.push(ticketBtn);
        }
        var shareBtn = Ti.UI.createButton({
            title: "Share",
            id: "shareBtn"
        });
        shareBtn.addEventListener("click", share);
        buttons.push(shareBtn);
        win.setToolbar(buttons, {
            animated: true,
            barColor: "black",
            tintColor: "lime",
            id: "detailToolbar"
        });
        var loc = Ti.Map.createAnnotation({
            latitude: eventData.location.geo.coordinates[1],
            longitude: eventData.location.geo.coordinates[0],
            title: eventData.name,
            subtitle: eventData.location.address,
            myid: eventData._id,
            animate: true,
            pincolor: Ti.Map.ANNOTATION_RED
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
    };
    __defers["$.__views.mapview!click!doClick"] && $.__views.mapview.addEventListener("click", doClick);
    __defers["$.__views.location!click!getDirections"] && $.__views.location.addEventListener("click", getDirections);
    __defers["$.__views.businessName!click!showBusinessDetails"] && $.__views.businessName.addEventListener("click", showBusinessDetails);
    __defers["$.__views.website!click!linkToPage"] && $.__views.website.addEventListener("click", linkToPage);
    __defers["$.__views.tickets!click!linkToPage"] && $.__views.tickets.addEventListener("click", linkToPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;