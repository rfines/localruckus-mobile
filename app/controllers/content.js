var geo = require('utils/geoCoder');
var error = function() {
	Alloy.Globals.location = {};
	Alloy.Globals.location.coords = {};
	$.master.initialStateNoLocation();
};
var success = function() {
	$.master.loadInitialData();
};
Alloy.Globals.startWaiting();
geo.myLocation(error, success);