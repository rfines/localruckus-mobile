exports.myLocation = function(onError, onSuccess) {
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	        	alert('error1');
				onError();
	        } else {
		        Alloy.Globals.location = e;
		        Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
		        	if(reverseGeocoderResonse.places[0] != undefined){
		        		Alloy.Globals.reverseLocation = reverseGeocoderResonse;
		    		}
					onSuccess();
		    	});     
	    	}
	    });
	} else {
		alert('error2');
	    onError();
	}	
};

exports.customLocation = function(address, onError, onSuccess) {
	Titanium.Geolocation.forwardGeocoder(address, function(forwardGeocoderResponse) {
		Alloy.Globals.location.coords.longitude = forwardGeocoderResponse.longitude;
		Alloy.Globals.location.coords.latitude = forwardGeocoderResponse.latitude;
        Titanium.Geolocation.reverseGeocoder(forwardGeocoderResponse.latitude, forwardGeocoderResponse.longitude, function(reverseGeocoderResonse) {
        	if(reverseGeocoderResonse.places[0] != undefined){
        		Alloy.Globals.reverseLocation = reverseGeocoderResonse;
    		}
			onSuccess();
		});
	});	
};
