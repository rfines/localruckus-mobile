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
    var url = "http://api-stage.hoopla.io/event?near=64105&radius=600";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            data = JSON.parse(this.responseText);
            Ti.API.debug(data);
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
        timeout: 5e3
    });
    Ti.API.error("Sending xh request");
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
    xhr.send();
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;