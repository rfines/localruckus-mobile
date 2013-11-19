if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
            e.coords = {};
        	e.coords.latitude = 39.102704;
        	e.coords.longitude = -94.595033;
        }
        Alloy.Globals.location = e;
        Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
        	if(reverseGeocoderResonse.places[0] != undefined){
        		Alloy.Globals.reverseLocation = reverseGeocoderResonse;
    		}
			$.master.loadInitialData();
    	});     
    });
} else {
    alert('Please enable location services');
}