exports.setBoxerStats = function(eventData) {
	//var stats = Alloy.Globals.data[name];
	alert(eventData);
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		$.detail.title = eventData.name;
		$.description.text = eventData.description || "No description provided.";
		$.detailImage.image = eventData.media[0].url;
	}
};