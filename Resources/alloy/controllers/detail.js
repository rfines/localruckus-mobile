function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.detail = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.description = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        id: "description"
    });
    $.__views.detail.add($.__views.description);
    $.__views.businessName = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 15,
        top: 10,
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        textAlign: "left",
        id: "businessName"
    });
    $.__views.detail.add($.__views.businessName);
    $.__views.detailImage = Ti.UI.createImageView({
        id: "detailImage"
    });
    $.__views.detail.add($.__views.detailImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setBoxerStats = function(eventData) {
        alert(eventData);
        $.detail.title = eventData.name;
        $.description.text = eventData.description || "No description provided.";
        $.detailImage.image = eventData.media[0].url;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;