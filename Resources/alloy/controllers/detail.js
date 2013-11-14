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
    $.__views.height = Ti.UI.createLabel({
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
        id: "height"
    });
    $.__views.detail.add($.__views.height);
    $.__views.weight = Ti.UI.createLabel({
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
        id: "weight"
    });
    $.__views.detail.add($.__views.weight);
    $.__views.age = Ti.UI.createLabel({
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
        id: "age"
    });
    $.__views.detail.add($.__views.age);
    $.__views.record = Ti.UI.createLabel({
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
        id: "record"
    });
    $.__views.detail.add($.__views.record);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setBoxerStats = function(name) {
        $.detail.title = name;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;