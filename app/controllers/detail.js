exports.setBoxerStats = function(eventData) {
	//var stats = Alloy.Globals.data[name];
	alert(eventData);
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		$.detail.title = eventData.name;
	}
};