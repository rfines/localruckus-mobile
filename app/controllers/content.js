if (OS_IOS && Alloy.isHandheld) {
	Alloy.Globals.navgroup = $.navgroup;
}

$.master.on('detail', function(e) {
	var controller = OS_IOS && Alloy.isTablet ? $.detail : Alloy.createController('detail');
	var win = controller.getView();
	controller.setBoxerStats(e);
	if (OS_IOS && Alloy.isHandheld) {
		Alloy.Globals.navgroup.open(win);
	} else if (OS_ANDROID) {
		win.open();
	}
});

if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
            alert('Your location is not available');
            e.coords = {};
        	e.coords.latitude = 39.102704;
        	e.coords.longitude = -94.595033;
        }
        Alloy.Globals.location = e;
        Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
        	if(reverseGeocoderResonse.places[0] != undefined){
        		Alloy.Globals.reverseLocation = reverseGeocoderResonse;
    		}
			if (OS_ANDROID) {
				//$.master.getView().open();
			} else {
				alert(Alloy.Globals);
				$.index.open();
				$.master.loadInitialData();
			}
    	});     
    });
} else {
    alert('Please enable location services');
}