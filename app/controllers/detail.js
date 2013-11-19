var data = {};
var moment = require('moment');
exports.setBoxerStats = function(eventData) {
	data = eventData;
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		//$.detail.title = eventData.name;
		var win = $.myWindow;
		win.title = eventData.name;
		var buttons=[];
		var d = eventData.description || "No description provided.";
		var l ="At: "+ eventData.location.address;
		$.description.text = d;
		$.location.text = l;
		$.name.text = eventData.name;
		$.time.text = eventData.scheduleText;
		//moment(eventData.nextOccurrence.start).format('h:mm a')+" to "+moment(eventData.nextOccurrence.end).format("h:mm a");
		Ti.API.error(eventData);
		//Toolbar buttons
		if(eventData.website != undefined && eventData.website.length > 0){
			var webBtn = Ti.UI.createButton({title:"More Info", id:"moreInfoBtn"});
			webBtn.addEventListener('click',moreInfo);
			buttons.push(webBtn);
		}
		if(eventData.contactPhone != undefined && eventData.contactPhone.length >0){
			var phoneBtn = Ti.UI.createButton({title:"Call Event", id:"callBtn"});
			phoneBtn.addEventListener('click',callEvent);
			buttons.push(phoneBtn);
		}
		
		if(eventData.ticketUrl != undefined && eventData.ticketUrl.length >0 ){
			var ticketBtn = Ti.UI.createButton({title:"Tickets", id:"ticketBtn"});
			ticketBtn.addEventListener('click',buyTickets);
			buttons.push(ticketBtn);
		}
		var shareBtn = Ti.UI.createButton({title:"Share", id:"shareBtn"});
		shareBtn.addEventListener('click', share);
		buttons.push(shareBtn);
		win.setToolbar(buttons,{animated:true,barColor:'black',tintColor:'lime', id:"detailToolbar" });
		
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
   if(evt.clicksource == 'tickets'){
		Titanium.Platform.openURL(data.ticketUrl);
	}
}
function moreInfo(evt){
	if(data.website){
		Titanium.Platform.openURL(data.website);
	}
}
function callEvent(evt){
	var url = 'tel:'+data.contactPhone;
	var win = Titanium.UI.currentWindow;
	var optionsAlertOpts = {
    	buttonNames:['Cancel','Call'],
    	message: "Would you like to call now?",
    	title:'Call Contact Number'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts).show();
 	// DIALOG EVENT CLICK
    dialog.addEventListener('click',function(e)
	{
		if(e.index == '1') {
    		Titanium.Platform.openURL(url);
		}
	});
}
function buyTickets(evt){
	if(data.ticketUrl){
		Titanium.Platform.openURL(data.ticketUrl);
	}
}
function share(evt){
	var fb = require('facebook');
 	fb.appid = "1433425413548423";
 	fb.permissions = ['read_stream'];
 	fb.forceDialogAuth = false;
 	fb.addEventListener('login', function(e){
 		if(e.success){
 			Ti.API.info('Logged In');
 		}else if (e.error){
 			Ti.API.info(e.error);
 		}else if(e.cancelled){
 			Ti.API.info('Cancelled');
 		}
 	});
 	var optionsAlertOpts = {
    	buttonNames:['Cancel','Facebook', "Twitter"],
    	message: "Facebook or Twitter?",
    	title:'Share this event'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
 	// DIALOG EVENT CLICK
    dialog.addEventListener('click',function(e)
	{
		if(e.index == '1') { //Facebook button
    		// Ask for write permission
    		fb.reauthorize(['publish_stream','rsvp_event','publish_actions'], 'friends', function(e){
        		if (e.success) {
            		// If successful, proceed with a publish call
            		var defaultMessage = "Check out this awesome event! I'm thinking about going, who wants to go with me?";
            		var mediaUrl = "";
            		if (data.media != undefined && data.media.length >0){
            			mediaUrl = data.media[0].url;
            		}
            		var description = data.name+" at "+data.location.address;
            		if (data.description!=undefined && data.description.length >0){
            			description = data.description;
            		}
            		var link = "http://www.localruckus.com/event/"+data._id.toString();
            		var fbdata = {
    					link : link,
    					name : "Local Ruckus Mobile",
    					message : defaultMessage,
    					caption : data.name,
    					picture : mediaUrl,
    					description : description
					};
            		fb.dialog("feed", fbdata, function(e) {
                		if(e.success && e.result) {
                    		Ti.API.info("Success! New Post ID: " + e.result);
                		} else {
                    		if(e.error) {
                        		Ti.API.info(e.error);
                    		} else {
                        		Ti.API.info("User canceled dialog.");
                    		}
                		}
            		});
        		} else {
            		if (e.error) {
                		Ti.API.info(e.error);
            		} else {
                		Ti.API.error("Unknown result");
            		}
        		}
    		});
		}else if (e.index =='2'){
			alert('twitter');
		}
	});
	dialog.show();
	if (!fb.loggedIn) {
    	fb.authorize();
	}
}
function getDirections(evt){}
