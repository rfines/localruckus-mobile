var data = {};
var business = {};
var moment = require('alloy/moment');
exports.setBoxerStats = function(eventData) {
	data = eventData;
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + eventData.name;
	} else {
		if (Alloy.Globals.businesses != undefined && Alloy.Globals.businesses.length > 0) {
			business = _.find(Alloy.Globals.businesses, function(b) {
				return b._id == eventData.host;
			});
		} else {
			Alloy.Globals.businesses = [];
		}

		if (business._id == undefined) {
			getBusiness(eventData.host, function(err, bus) {
				if (err) {
					Ti.API.error(err);
				} else {
					Alloy.Globals.businesses.push(bus);
					business = bus;
					setWindow(eventData, bus);
				}

			});
		}else{
			setWindow(eventData, business);
		}
	}
};

function showBusinessDetails(e) {
	var controller = OS_IOS && Alloy.isTablet ? $.business : Alloy.createController('business');
	var win = controller.getView();
	controller.setBusinessInfo(business);
	if (OS_IOS && Alloy.isHandheld) {
		Alloy.Globals.navgroup.open(win);
	} else if (OS_ANDROID) {
		win.open();
	}

}


function doClick(evt) {
	Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

	// Check for all of the possible names that clicksouce
	// can report for the left button/view.
	if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
		Ti.API.info("Annotation " + evt.title + ", left button clicked.");
	}
}

function linkToPage(evt) {
	if (evt.clicksource == 'tickets') {
		Titanium.Platform.openURL(data.ticketUrl);
	}
}

function moreInfo(evt) {
	if (data.website) {
		Titanium.Platform.openURL(data.website);
	}
}

function callEvent(evt) {
	var url = 'tel:' + data.contactPhone;
	var win = Titanium.UI.currentWindow;
	var optionsAlertOpts = {
		buttonNames : ['Cancel', 'Call'],
		message : "Would you like to call now?",
		title : 'Call Contact Number'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts).show();
	// DIALOG EVENT CLICK
	dialog.addEventListener('click', function(e) {
		if (e.index == '1') {
			Titanium.Platform.openURL(url);
		}
	});
}

function buyTickets(evt) {
	if (data.ticketUrl) {
		Titanium.Platform.openURL(data.ticketUrl);
	}
}

function share(evt) {
	var fb = require('facebook');
	fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
	fb.permissions = ['read_stream'];
	fb.forceDialogAuth = false;
	fb.addEventListener('login', function(e) {
		if (e.success) {
			Ti.API.info('Logged In');
		} else if (e.error) {
			Ti.API.info(e.error);
		} else if (e.cancelled) {
			Ti.API.info('Cancelled');
		}
	});
	// var social= require('alloy/social').create({
	// consumerSecret:Ti.App.Properties.getString('ti.twitter.consumerSecret'),
	// consumerKey:Ti.App.Properties.getString('ti.twitter.consumerKey')
	// });
	//Ti.API.error(social);
	var optionsAlertOpts = {
		buttonNames : ['Cancel', 'Facebook'],
		message : "Post to Facebook?",
		title : 'Share this event'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
	// DIALOG EVENT CLICK
	dialog.addEventListener('click', function(e) {
		if (e.index == '1') {//Facebook button
			// Ask for write permission
			fb.reauthorize(['publish_stream', 'rsvp_event', 'publish_actions'], 'friends', function(e) {
				if (e.success) {
					// If successful, proceed with a publish call
					var defaultMessage = "Check out this awesome event! I'm thinking about going, who wants to go with me?";
					var mediaUrl = "";
					if (data.media != undefined && data.media.length > 0) {
						mediaUrl = data.media[0].url;
					}
					var description = data.name + " at " + data.location.address;
					if (data.description != undefined && data.description.length > 0) {
						description = data.description;
					}
					var link = "http://www.localruckus.com/event/" + data._id.toString();
					var fbdata = {
						link : link,
						name : "Local Ruckus Mobile",
						message : defaultMessage,
						caption : data.name,
						picture : mediaUrl,
						description : description
					};
					fb.dialog("feed", fbdata, function(e) {
						if (e.success && e.result) {
							Ti.API.info("Success! New Post ID: " + e.result);
						} else {
							if (e.error) {
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
		} else if (e.index == '2') {
			if (!social.isAuthorized()) {
				social.authorize();
			}
			social.share({
				message : "Salut, Monde!",
				success : function(e) {
					Ti.API.error('Success!');
				},
				error : function(e) {
					Ti.API.error('Error!');
				}
			});

			alert('twitter');
		}
	});
	dialog.show();
	if (!fb.loggedIn) {
		fb.authorize();
	}
}

function getDirections(evt) {
}

function getBusiness(id, callback) {
	var url = "http://api-stage.hoopla.io/business/" + id;
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			data = JSON.parse(this.responseText);
			alert("calling callback with null " + data.name);
			callback(null, data);
		},
		onerror : function(e) {
			Ti.API.error(e);
			callback(e, null);
		}
	});
	Ti.API.error("Sending xhr request to get business");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();
}

function setWindow(eventData, business) {
	Ti.API.error(business);
	var win = $.myWindow;
	win.title = eventData.name;
	var buttons = [];
	var d = eventData.description || "No description provided.";
	var l = eventData.location.address;
	$.descriptionView.setHtml(d);
	$.location.text = l;
	$.name.text = eventData.name;
	$.time.text = eventData.scheduleText;
	$.businessName.text = business.name;
	//moment(eventData.nextOccurrence.start).format('h:mm a')+" to "+moment(eventData.nextOccurrence.end).format("h:mm a");
	Ti.API.error(eventData);
	//Toolbar buttons
	if (eventData.website != undefined && eventData.website.length > 0) {
		var webBtn = Ti.UI.createButton({
			title : "More Info",
			id : "moreInfoBtn"
		});
		webBtn.addEventListener('click', moreInfo);
		buttons.push(webBtn);
	}
	if (eventData.contactPhone != undefined && eventData.contactPhone.length > 0) {
		var phoneBtn = Ti.UI.createButton({
			title : "Call Event",
			id : "callBtn"
		});
		phoneBtn.addEventListener('click', callEvent);
		buttons.push(phoneBtn);
	}

	if (eventData.ticketUrl != undefined && eventData.ticketUrl.length > 0) {
		var ticketBtn = Ti.UI.createButton({
			title : "Tickets",
			id : "ticketBtn"
		});
		ticketBtn.addEventListener('click', buyTickets);
		buttons.push(ticketBtn);
	}
	var shareBtn = Ti.UI.createButton({
		title : "Share",
		id : "shareBtn"
	});
	shareBtn.addEventListener('click', share);
	buttons.push(shareBtn);
	win.setToolbar(buttons, {
		animated : true,
		barColor : 'black',
		tintColor : 'lime',
		id : "detailToolbar"
	});

	var loc = Ti.Map.createAnnotation({
		latitude : eventData.location.geo.coordinates[1],
		longitude : eventData.location.geo.coordinates[0],
		title : eventData.name,
		subtitle : eventData.location.address,
		myid : eventData._id,
		animate : true,
		pincolor : Ti.Map.ANNOTATION_RED
	});
	var map = Ti.Map.createView({
		mapType : Ti.Map.STANDARD_TYPE,
		annotations : [loc],
		animate : true,
		regionFit : true,
		userLocation : true
	});
	$.mapView = map;
	//Alloy.Globals.location.coords.latitude, longitude:Alloy.Globals.coords.location.longitude
	$.mapview.region = {
		latitude : Alloy.Globals.location.coords.latitude,
		longitude : Alloy.Globals.location.coords.longitude,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	};
	// Handle click events on any annotations on this map.
	$.mapview.addEventListener('click', function(evt) {
		Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
		// Check for all of the possible names that clicksouce
		// can report for the left button/view.
		if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
			Ti.API.info("Annotation " + evt.title + ", left button clicked.");
		}
	});
	$.mapview.addAnnotation(loc);

}
