var flurry = require('sg.flurry');
exports.myLocation = function(onError, onSuccess) {
	if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.purpose = 'Get Current Location';
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				onError();
			} else {
				Alloy.Globals.location = e;
				flurry.setLatitude(e.coords.latitude, e.coords.longitude);
				Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
					if (reverseGeocoderResonse.code == 0 && reverseGeocoderResonse.places[0] != undefined) {
						Alloy.Globals.displayAddress = reverseGeocoderResonse.places[0].address;
						Alloy.Globals.cityState = reverseGeocoderResonse.places[0].city + ' - ' + reverseGeocoderResonse.places[0].zipcode;
					} else {
						Alloy.Globals.displayAddress = '';
						Alloy.Globals.cityState = "Location Unknown";
					}
					onSuccess();
				});
			}
		});
	} else {
		onError();
	}
};

exports.customLocation = function(address, onError, onSuccess) {
	Titanium.Geolocation.forwardGeocoder(address, function(forwardGeocoderResponse) {
		if (forwardGeocoderResponse.error !=undefined && forwardGeocoderResponse.error.length >0) {
			Ti.API.error(forwardGeocoderResponse.error);
			onError(forwardGeocoderResponse);
		} else {
			Alloy.Globals.location.coords.longitude = forwardGeocoderResponse.longitude;
			Alloy.Globals.location.coords.latitude = forwardGeocoderResponse.latitude;
			Titanium.Geolocation.reverseGeocoder(forwardGeocoderResponse.latitude, forwardGeocoderResponse.longitude, function(reverseGeocoderResonse) {
				if (reverseGeocoderResonse.code == 0 && reverseGeocoderResonse.places[0] != undefined) {
					Alloy.Globals.displayAddress = address;
					Alloy.Globals.cityState = reverseGeocoderResonse.places[0].city + ' - ' + reverseGeocoderResonse.places[0].zipcode;
				} else {
					Alloy.Globals.displayAddress = address;
					Alloy.Globals.cityState = "Location Unknown";
				}
				onSuccess();
			});
		}
	});
};
