exports.setBoxerStats = function(eventData) {
	//var stats = Alloy.Globals.data[name];
	//alert(eventData);
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		$.detail.title = eventData.name;
		var d = eventData.description || "No description provided.";
		d ="At: "+ eventData.location.address+" \r" + d;
		$.description.text = d;
		if(eventData.media != undefined && eventData.media.length >0){
			$.detailImage.image = eventData.media[0].url;
		}
		alert(eventData.location.geo.coordinates[1]);
		var location = Titanium.Map.createAnnotation({
			latitude:eventData.location.geo.coordinates[1], 
			longitude:eventData.location.geo.coordinates[0],
			title: eventData.name,
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			animate:true,
			myid:eventData._id
		});
		alert(location.latitude);
		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
    		region: {latitude:39.102704, longitude:-94.595033,
            latitudeDelta:0.01, longitudeDelta:0.01},
    		animate:true,
    		regionFit:true,
    		userLocation:true,
    		annotations:[location]
		});
		$.mapview = mapview;
		// Handle click events on any annotations on this map.
		mapview.addEventListener('click', function(evt) {
    		Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    		// Check for all of the possible names that clicksouce
    		// can report for the left button/view.
    		if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        		evt.clicksource == 'leftView') {
        		Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    		}
		});
		
		
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
};

function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    if (OS_IOS) {
        $.mapview.region = {
            latitude:37.390749, longitude:-122.081651,
            latitudeDelta:0.01, longitudeDelta:0.01
        };
    }
}