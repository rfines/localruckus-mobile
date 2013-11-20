var business = {};
var buttons = [];
exports.setBusinessInfo = function(bus) {
	business = bus;
	var win = $.myWindow;
	if (OS_ANDROID) {
		$.name.text = 'Name: ' + bus.name;
	} else {
		Ti.API.error(bus);
		$.name.text = bus.name;
		$.location.text = bus.location.address;
		$.descriptionView.setHtml(bus.description || "No Description Provided");
		var image = "";
		if (bus.media != undefined && bus.media.length > 0) {
			image = bus.media[0].url;
		}
		$.detailImage.image = image;
		//Toolbar buttons
		if (bus.website != undefined && bus.website.length > 0) {
			var webBtn = Ti.UI.createButton({
				title : "More Info",
				id : "moreInfoBtn"
			});
			webBtn.addEventListener('click', moreInfo);
			buttons.push(webBtn);
		}
		if (bus.phone != undefined && bus.phone.length > 0) {
			var phoneBtn = Ti.UI.createButton({
				title : "Call Event",
				id : "callBtn"
			});
			phoneBtn.addEventListener('click', callBusiness);
			buttons.push(phoneBtn);
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
			latitude : bus.location.geo.coordinates[1],
			longitude : bus.location.geo.coordinates[0],
			title : bus.name,
			subtitle : bus.location.address,
			myid : bus._id,
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

		$.mapview.region = {
			latitude : Alloy.Globals.location.coords.latitude,
			longitude : Alloy.Globals.location.coords.longitude,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		};

		$.mapview.addEventListener('click', function(evt) {
			Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
			if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
				Ti.API.info("Annotation " + evt.title + ", left button clicked.");
			}
		});
		$.mapview.addAnnotation(loc);
	}
};
function doClick(evt) {
	Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
	if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
		Ti.API.info("Annotation " + evt.title + ", left button clicked.");
	}
}

function moreInfo(evt) {
	if (business.website) {
		Titanium.Platform.openURL(business.website);
	}
}

function callBusiness(bus) {
	var url = 'tel:' + bus.phone;
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
	var social = require('alloy/social').create({
		consumerSecret : Ti.App.Properties.getString('ti.twitter.consumerSecret'),
		consumerKey : Ti.App.Properties.getString('ti.twitter.consumerKey')
	});
	//Ti.API.error(social);
	var optionsAlertOpts = {
		buttonNames : ['Cancel', 'Facebook'],
		message : "Post to Facebook?",
		title : 'Share this business'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
	// DIALOG EVENT CLICK
	dialog.addEventListener('click', function(e) {
		if (e.index == '1') {//Facebook button
			// Ask for write permission
			fb.reauthorize(['publish_stream', 'rsvp_event', 'publish_actions'], 'friends', function(e) {
				if (e.success) {
					// If successful, proceed with a publish call
					var defaultMessage = "Check out this awesome business! I'm thinking about checking it out, who wants to go with me?";
					var mediaUrl = "";
					if (business.media != undefined && business.media.length > 0) {
						mediaUrl = business.media[0].url;
					}
					var description = business.name + " at " + business.location.address;
					if (business.description != undefined && business.description.length > 0) {
						description = business.description;
					}
					var link = "http://www.localruckus.com/business/" + business._id.toString();
					var fbdata = {
						link : link,
						name : "Local Ruckus Mobile",
						message : defaultMessage,
						caption : business.name,
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

		}
	});
	dialog.show();
	if (!fb.loggedIn) {
		fb.authorize();
	}
}

function getDirections(evt) {
	Ti.Platform.openURL("http://maps.apple.com/?saddr=" + Alloy.Globals.location.coords.latitude + "," + Alloy.Globals.location.coords.longitude + "&daddr=" + business.location.geo.coordinates[1] + "," + business.location.geo.coordinates[0]);
}