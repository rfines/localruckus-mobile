var flurry = require('sg.flurry');
exports.myLocation = function(onError, onSuccess) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.purpose = 'Get Current Location';
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				onError();
			} else {
				Alloy.Globals.location = e;
				flurry.setLatitude(e.coords.latitude, e.coords.longitude);
				reverse(e.coords.latitude, e.coords.longitude, onSuccess);
			}
		});
	} else {
		onError();
	}
};

exports.customLocation = function(address, onError, onSuccess) {
	var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address="+encodeURIComponent(address);
	var addrReq = Titanium.Network.createHTTPClient({
		onload: function() {
			var response = JSON.parse(this.responseText);
			if (response.status == 'OK' && response.results && response.results.length > 0) {
				Alloy.Globals.location.coords.longitude = response.results[0].geometry.location.lng;
				Alloy.Globals.location.coords.latitude = response.results[0].geometry.location.lat;
				Alloy.Globals.displayAddress = address;
				reverse(Alloy.Globals.location.coords.latitude, Alloy.Globals.location.coords.longitude, onSuccess);
			} else {
				onError(forwardGeocoderResponse);
			}
			onSuccess();
		}
	});		
	addrReq.open("GET",addrUrl);	
	addrReq.send();
};


function reverse(lat, lng, onSuccess) {
	var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng="+lat+","+lng;
	var addrReq = Titanium.Network.createHTTPClient({
		onload: function() {
			var response = JSON.parse(this.responseText);
			if (response.status == 'OK' && response.results && response.results.length > 0) {
				Alloy.Globals.displayAddress = response.results[0].formatted_address;
				Alloy.Globals.cityState = getCityState(response);
			} else {
				Alloy.Globals.cityState = "Location Unknown";
			}
			onSuccess();
		}
	});		
	addrReq.open("GET",addrUrl);	
	addrReq.send();
};

function getCityState(response) {
	var address = {
	   streetName      :'Not Found',
	   streetNumber    :'',
	   city            :'',
	   country         :'',
	   stateName       :'',
	   postalCode      :'',
	   latitude      :'',
	   longitude     :''
	};
   var resLen = response.results[0].address_components.length;
   for(var i=0; i < resLen; i++) {
       switch (response.results[0].address_components[i].types[0])
       {
           case "street_number":
               address.streetNumber  = response.results[0].address_components[i].long_name;
               break;
           case "route":
               address.streetName    = response.results[0].address_components[i].long_name;
               break;
           case "locality":
               address.city          = response.results[0].address_components[i].long_name;
               break;
           case "administrative_area_level_1":
               address.stateName     = response.results[0].address_components[i].long_name;
               break;
           case "postal_code":
               address.postalCode    = response.results[0].address_components[i].long_name;
               break;
           case "country":
               address.country       = response.results[0].address_components[i].long_name;
               break;
           }
   }
   return address.city + ', ' + address.stateName + ' ' + address.postalCode;
};
