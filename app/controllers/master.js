function openDetail(e) {
	$.trigger('detail',e.rowData.eventData);
}

var data = [];
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
        Titanium.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(reverseGeocoderResonse) {
        	if(reverseGeocoderResonse.places[0] != undefined){
    		}
    	});
    	var ll = e.coords.longitude + ',' + e.coords.latitude;
		var url = "http://api-stage.hoopla.io/event?ll="+ ll + "&radius=1000";
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		        data = JSON.parse(this.responseText);
				var tableData = [];
				for (var i=0; i < data.length; i++) {
					item = data[i];
					tableData.push(Alloy.createController('row', {
						eventData : item,
						name: item.name
					}).getView());			
				}
				$.table.setData(tableData);		    
		    },
		    onerror: function(e) {
		        alert(e);
		        alert(e.source || "");
		        Ti.API.error(e);
		    }
		});
		Ti.API.error("Sending xh request");
		xhr.open("GET", url);
		xhr.setTimeout(30000);
		xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
		xhr.send();	      
    });
} else {
    alert('Please enable location services');
}
