var string = require('utils/string');
var moment = require('alloy/moment');

function backToList() {
	$.myWindow.close();
}

var activityButtons = [];
var data = {};
var business = {};

exports.setEvent = function(eventData) {
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

		if (business == undefined || business._id == undefined) {
			getBusiness(eventData.host, function(err, bus) {
				if (err) {
					Ti.API.error(err);
				} else {
					Alloy.Globals.businesses.push(bus);
					business = bus;
					setWindow(eventData, bus);
				}

			});
		} else {
			setWindow(eventData, business);
		}
	}
};

function showBusinessDetails(e) {
	var controller = OS_IOS && Alloy.isTablet ? $.business : Alloy.createController('business');
	var win = controller.getView();
	controller.setBusinessInfo(business);
	controller.getView().open();
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
	var optionsAlertOpts = {
		buttonNames : ['Cancel', 'Call'],
		message : "Would you like to call now?",
		title : 'Call Contact Number'
	};
	var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
	// DIALOG EVENT CLICK
	dialog.addEventListener('click', function(e) {
		if (e.index == '1') {
			Ti.Platform.openURL(url);
		}
	});
	dialog.show();
}

function buyTickets(evt) {

}

function share(evt) {
	// var fb = require('facebook');
	// fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
	// fb.permissions = ['read_stream'];
	// fb.forceDialogAuth = false;
	// fb.addEventListener('login', function(e) {
	// if (e.success) {
	// Ti.API.info('Logged In');
	// } else if (e.error) {
	// Ti.API.info(e.error);
	// } else if (e.cancelled) {
	// Ti.API.info('Cancelled');
	// }
	// });
	// // var social= require('alloy/social').create({
	// // consumerSecret:Ti.App.Properties.getString('ti.twitter.consumerSecret'),
	// // consumerKey:Ti.App.Properties.getString('ti.twitter.consumerKey')
	// // });
	// //Ti.API.error(social);
	// var optionsAlertOpts = {
	// buttonNames : ['Cancel', 'Facebook', 'Twitter'],
	// message : "Post to Facebook?",
	// title : 'Share this event'
	// };
	// var dialog = Titanium.UI.createAlertDialog(optionsAlertOpts);
	// // DIALOG EVENT CLICK
	// dialog.addEventListener('click', function(e) {
	// if (e.index == '1') {//Facebook button
	// // Ask for write permission
	// fb.reauthorize(['publish_stream', 'rsvp_event', 'publish_actions'], 'friends', function(e) {
	// if (e.success) {
	// // If successful, proceed with a publish call
	// var defaultMessage = "Check out this awesome event! I'm thinking about going, who wants to go with me?";
	// var mediaUrl = "";
	// if (data.media != undefined && data.media.length > 0) {
	// mediaUrl = data.media[0].url;
	// }
	// var description = data.name + " at " + data.location.address;
	// if (data.description != undefined && data.description.length > 0) {
	// description = data.description;
	// }
	// var link = "http://www.localruckus.com/event/" + data._id.toString();
	// var fbdata = {
	// link : link,
	// name : data.name,
	// message : defaultMessage,
	// caption : data.name,
	// picture : mediaUrl,
	// description : description
	// };
	// fb.dialog("feed", fbdata, function(e) {
	// if (e.success && e.result) {
	// Ti.API.info("Success! New Post ID: " + e.result);
	// } else {
	// if (e.error) {
	// Ti.API.info(e.error);
	// } else {
	// Ti.API.info("User canceled dialog.");
	// }
	// }
	// });
	// } else {
	// if (e.error) {
	// Ti.API.info(e.error);
	// } else {
	// Ti.API.error("Unknown result");
	// }
	// }
	// });
	// } else if (e.index == '2') {
	// if (!social.isAuthorized()) {
	// social.authorize();
	// }
	// social.share({
	// message : "Salut, Monde!",
	// success : function(e) {
	// Ti.API.error('Success!');
	// },
	// error : function(e) {
	// Ti.API.error('Error!');
	// }
	// });
	//
	// alert('twitter');
	// }
	// });
	// dialog.show();
	// if (!fb.loggedIn) {
	// fb.authorize();
	// }
	var defaultMessage = "Check out this awesome event! I'm thinking about going, who wants to go with me?";
	var link = "http://localruckus.com/event/" + data._id;
	defaultMessage = defaultMessage + " " + link;
	var image = "";
	if (data.media != undefined && data.media.length > 0) {
		image = data.media[0].url;
	}

	var Social = require('dk.napp.social');
	Social.activityView({
		text : defaultMessage,
		image : image,
		removeIcons : "camera,contact,print,copy"
	}, activityButtons);

}

function getDirections(evt) {

}

function getBusiness(id, callback) {
	var url = Alloy.Globals.baseUrl + "/business/" + id + "?height=150&width=150&imageType=circle";
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			data = JSON.parse(this.responseText);
			callback(null, data);
		},
		onerror : function(e) {
			Ti.API.error(e);
			callback(e, null);
		}
	});
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();
}

function setWindow(eventData, business) {
	var win = $.myWindow;
	var buttons = [];
	var d = eventData.description || "No description provided.";
	var l = eventData.location.address;
	var image = "";
	if (eventData.media != undefined && eventData.media.length > 0) {
		image = eventData.media[0].url;
	}
	$.detailImage.image = image;
	$.descriptionView.setText(string.htmlToLabel(d));
	$.location.text = l;
	$.name.text = eventData.name;
	$.time.text = moment(eventData.nextOccurrence.start).utc().calendar() + " until " + moment(eventData.nextOccurrence.end).utc().format("h:mm a");
	$.businessName.text = business.name;
	var url = eventData.website || "http://localruckus.com/event/" + data._id.toString();
	var mi = {
		title : "More Info",
		image : "/images/safari.png",
		callback : function(e) {
			Titanium.Platform.openURL(url);
		}
	};
	activityButtons.push(mi);

	if (eventData.contactPhone != undefined && eventData.contactPhone.length > 0) {
		var phoneBtn = Ti.UI.createButton({
			title : "Call Event",
			id : "callBtn"
		});
		phoneBtn.addEventListener('click', callEvent);
		//buttons.push(phoneBtn);
		var cleanNumb = eventData.contactPhone.replace(/[^0-9]/g,"");
		var pb = {
			title : "Call Event",
			image : "/images/safari.png",
			callback : function(e) {
				var url = 'tel:'+cleanNumb;
				Titanium.Platform.openURL(url);
			}
		};
		activityButtons.push(pb);
	}

	if (eventData.ticketUrl != undefined && eventData.ticketUrl.length > 0) {
		var ticketBtn = Ti.UI.createButton({
			title : "Tickets",
			id : "ticketBtn"
		});
		ticketBtn.addEventListener('click', buyTickets);
		//buttons.push(ticketBtn);
		var tb = {
			title : "Tickets",
			image : "/images/safari.png",
			callback : function(e) {
				if (data.ticketUrl) {
					Titanium.Platform.openURL(data.ticketUrl);
				}
			}
		};
		activityButtons.push(tb);
	}
	var gd = {
		title : "Directions",
		image : "/images/safari.png",
		callback : function(e) {
			Ti.Platform.openURL("http://maps.apple.com/?saddr=" + Alloy.Globals.location.coords.latitude + "," + Alloy.Globals.location.coords.longitude + "&daddr=" + data.location.geo.coordinates[1] + "," + data.location.geo.coordinates[0]);
		}
	};
	activityButtons.push(gd);
	var shareBtn = Ti.UI.createButton({
		title : "Share",
		systemButton : Ti.UI.iPhone.SystemButton.ACTION,
		id : "shareBtn",
		left:150
	});
	shareBtn.addEventListener('click', share);
	buttons.push(shareBtn);
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : buttons,
		bottom : 0,
		borderTop : true,
		borderBottom : false
	});
	win.add(toolbar);

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

	$.mapview.region = {
		latitude : eventData.location.geo.coordinates[1],
		longitude : eventData.location.geo.coordinates[0],
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
