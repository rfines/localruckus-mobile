exports.setBoxerStats = function(name) {
	//var stats = Alloy.Globals.data[name];
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + name;
	} else {
		$.detail.title = name;
	}
};