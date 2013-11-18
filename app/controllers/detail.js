
exports.setBoxerStats = function(eventData) {
	
	alert("details page");
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		$.detail.title = eventData.name;
		var d = eventData.description || "No description provided.";
		d ="At: "+ eventData.location.address+" \r" + d;
		$.description.text = d;
		if(eventData.website != undefined && eventData.website.length > 0){
			$.website  = eventData.website;
		}
		if(eventData.ticketUrl != undefined && eventData.ticketUrl.lenght >0 ){
			$.tickets = eventData.ticketUrl;
		}
		var loc = Ti.Map.createAnnotation({latitude:eventData.location.geo.coordinates[1], longitude:eventData.location.geo.coordinates[0],
			title:eventData.name, subtitle:eventData.location.address, myid:eventData._id, animate:true, pincolor:Ti.Map.ANNOTATION_RED
			});
		var map = Ti.Map.createView({
			mapType: Ti.Map.STANDARD_TYPE,
			annotations:[loc],
			animate:true,
			regionFit:true,
			userLocation:true	
		});
		$.mapView = map;
		//Alloy.Globals.location.coords.latitude, longitude:Alloy.Globals.coords.location.longitude
		$.mapview.region = {
        	latitude:Alloy.Globals.location.coords.latitude, longitude:Alloy.Globals.location.coords.longitude,
        	latitudeDelta:0.01, longitudeDelta:0.01
        };
		// Handle click events on any annotations on this map.
		$.mapview.addEventListener('click', function(evt) {
    		Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    		// Check for all of the possible names that clicksouce
    		// can report for the left button/view.
    		if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        		evt.clicksource == 'leftView') {
        		Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    		}
		});
		$.mapview.addAnnotation(loc);
		alert($.mapview.annotations.length);
		//$.businessName.text = eventData.business.name;
		//$.location.text = "At: "+eventData.location.address;
		//alert(eventData.host);
		//$.time.text = "Starts: "+eventData.nextOccurrence.start;
		
	}
};
function showBusinessDetails(e){
	alert(e);
}
function doClick(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
}
function linkToPage(evt){
	alert(evt);
	if(evt.clicksource == 'website'){
		
	}else if(evt.clicksource == 'tickets'){
		
	}
}
