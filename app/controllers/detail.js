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
	var defaultMessage = "Check out this awesome event -";
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
	var actions = createActions();
	win.add(actions.toolbar);
	setMap();

}
function createActions(){
	var actions={
		toolbar:undefined,
		buttons:activityButtons
	};
	
	var mi = {
		title : "More Info",
		image : "/images/more-info-icon.png",
		callback : function(e) {
			var url = data.website || "http://localruckus.com/event/" + data._id.toString();
			Titanium.Platform.openURL(url);
		}
	};
	activityButtons.push(mi);

	if (data.contactPhone != undefined && data.contactPhone.length > 0) {
		var phoneBtn = Ti.UI.createButton({
			title : "Call Event",
			id : "callBtn"
		});
		phoneBtn.addEventListener('click', callEvent);
		//buttons.push(phoneBtn);
		var pb = {
			title : "Call Event",
			image : "/images/call-me-icon.png",
			callback : function(e) {
				var cleanNumb = data.contactPhone.replace(/[^0-9]/g,"");
				var url = 'tel:'+cleanNumb;
				Titanium.Platform.openURL(url);
			}
		};
		activityButtons.push(pb);
	}

	if (data.ticketUrl != undefined && data.ticketUrl.length > 0) {
		var ticketBtn = Ti.UI.createButton({
			title : "Tickets",
			id : "ticketBtn"
		});
		ticketBtn.addEventListener('click', buyTickets);
		//buttons.push(ticketBtn);
		var tb = {
			title : "Tickets",
			image : "/images/ticket-icon.png",
			callback : function(e) {
				Titanium.Platform.openURL(data.ticketUrl);
			}
		};
		activityButtons.push(tb);
	}
	var gd = {
		title : "Directions",
		image : "/images/get-directions-icon.png",
		callback : function(e) {
			Ti.Platform.openURL("http://maps.apple.com/?saddr=" + Alloy.Globals.location.coords.latitude + "," + Alloy.Globals.location.coords.longitude + "&daddr=" + data.location.geo.coordinates[1] + "," + data.location.geo.coordinates[0]);
		}
	};
	activityButtons.push(gd);
	var shareBtn = Ti.UI.createButton({
		title : "Share",
		systemButton : Ti.UI.iPhone.SystemButton.ACTION,
		id : "shareBtn"
	});
	shareBtn.addEventListener('click', share);
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [shareBtn],
		bottom : 0,
		translucent : true,
		borderTop : true,
		borderBottom : false
	});
	actions.toolbar = toolbar;
	actions.buttons = activityButtons;
	return actions;
}
function setMap(){
	var loc = Ti.Map.createAnnotation({
		latitude : data.location.geo.coordinates[1],
		longitude : data.location.geo.coordinates[0],
		title : data.name,
		subtitle : data.location.address,
		myid : data._id,
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
		latitude : data.location.geo.coordinates[1],
		longitude : data.location.geo.coordinates[0],
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
