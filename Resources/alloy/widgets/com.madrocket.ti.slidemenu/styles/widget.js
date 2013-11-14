function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.madrocket.ti.slidemenu/" + s : s.substring(0, index) + "/com.madrocket.ti.slidemenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#fff"
    }
}, {
    isApi: true,
    priority: 1000.0003,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000"
    }
} ];