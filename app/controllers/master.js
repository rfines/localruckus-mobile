var api = require('utils/lrApiCall');
var geo = require('utils/geoCoder');

exports.initialStateNoLocation = function() {
	toggleSearchDrawer();
};

function showTimePicker() {
	view = $.timePicker;
	var slideUp = Titanium.UI.createAnimation();
	slideUp.height = "200";
	slideUp.duration = 300;
	view.open(slideUp);
	
}
function openDetail(e) {
	controller = Alloy.createController('detail');
	d = controller.getView();
	controller.setEvent(e.rowData.eventData);
	d.open();
}

function decreaseRadius(e) {
	var currentRadius = parseInt($.radiusLabel.text);
	var newRadius = currentRadius;
	if (currentRadius == 5) {
		newRadius = 1;
	} else if (currentRadius != 1) {
		newRadius = currentRadius - 5;	
	}
	$.radiusLabel.text = newRadius;
	
}
function increaseRadius(e) {
	var currentRadius = parseInt($.radiusLabel.text);
	var newRadius = currentRadius;
	if (currentRadius == 1) {
		newRadius = 5;
	} else if (currentRadius != 50) {
		newRadius = currentRadius + 5;	
	}
	$.radiusLabel.text = newRadius;	
}

var newAddress = undefined;
var myLocation = true;
function changeAddress(e) {
	newAddress = $.addressTextField.value;
	myLocation = false;
}

function myLocation(e) {
	Alloy.Globals.startWaiting();
	myLocation = true;
	var failure = function() {
		alert('Could not get your location');
	};
	var success = function() {
		$.locationLabel.text = Alloy.Globals.cityState;
		$.addressTextField.value = Alloy.Globals.displayAddress;
		changeAddress();
		myLocation = true;
	};
	geo.myLocation(failure, success);
}

function changeSearchCriteria(e) {
	toggleSearchDrawer();
	var failure = function() {
		alert('Could not get your location');
	};
	var success = function() {
		keyword = undefined;
		params = {
			radius : parseInt($.radiusLabel.text) * 1609,
			skip : 0
		};
		if ($.searchTerms.value && $.searchTerms.value != '') {
			params.keyword = $.searchTerms.value;
		} else {
			params.tags = tag;
		};
		exports.loadInitialData(params);
	};
	if (newAddress && !myLocation) {
		geo.customLocation(newAddress, failure, success);
	} else {
		success();
	}
}

var drawerOpen = false;
function toggleSearchDrawer() {
	view = $.topDrawer;
	if (drawerOpen) {
		var slideUp = Titanium.UI.createAnimation();
		slideUp.height = "0";
		slideUp.duration = 300;
		view.close(slideUp);
	} else {
		var slideDown = Titanium.UI.createAnimation();
		slideDown.height = Ti.UI.FILL;
		slideDown.duration = 300;
		view.open(slideDown);
	}
	drawerOpen = !drawerOpen;

}

var tag = "ENTERTAINMENT";
var reset = false;
var page = 0;
var radius = 10000;
function loadEntertainment(e) {
	page = 0;
	reset = true;
	exports.loadInitialData({
		tags : 'ENTERTAINMENT',
		radius : radius,
		skip : 0
	});
}

function loadFood(e) {
	page = 0;
	reset = true;
	tag = "FOOD-AND-DRINK";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});

}

function loadMusic(e) {
	page = 0;
	reset = true;
	tag = "MUSIC";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});
}

function loadArts(e) {
	page = 0;
	reset = true;
	tag = "ARTS";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});
}

function loadFamily(e) {
	page = 0;
	reset = true;
	tag = "FAMILY-AND-CHILDREN";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});
}

exports.loadInitialData = function(options) {
	Alloy.Globals.startWaiting();
	var moment = require('alloy/moment');
	var options = options || {};
	options.radius = options.radius || radius;
	options.tags = options.tags || 'ENTERTAINMENT';
	options.ll = Alloy.Globals.location.coords.longitude + ',' + Alloy.Globals.location.coords.latitude;
	options.start = options.start || moment().toISOString();
	options.callback = function(err, tableData) {
		if (err) {
			Ti.API.error(err);
			if (options.error) {
				options.error(err);
			}
		} else {
			$.locationLabel.text = Alloy.Globals.cityState;
			$.addressTextField.value = Alloy.Globals.displayAddress;
			if (!options.skip) {
				$.table.setData(tableData);
				Alloy.Globals.stopWaiting();
			} else if (options.success) {
				options.success(tableData);
				Alloy.Globals.stopWaiting();
			}
		}
	};
	api.getEvents(options);
};
$.master.open();
function myLoader(e) {
	var el = e;
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		success : function() {
			el.hide();
		},
		error : function() {
			el.hide();
		}
	});
}

function loadMore(e) {
	var el = e;
	page = page + 1;
	var skipNum = page * 25;
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : skipNum,
		success : function(data) {
			$.table.appendRow(data);
			(data.length == 25) ? el.success() : el.done();
		},
		error : function() {
			el.error();
		}
	});
}

function addContent(evt) {
	
	var popup = Ti.UI.createAlertDialog({
		title : "Add Event?",
		backgroundColor : 'white',
		buttonNames : ['Cancel', 'OK'],
		exitOnCLose : true,
		fullscreen : false,
		message : "Local Ruckus is powered by the Hoopla.io event platform, click 'OK' to enter your event for free."
	});
	popup.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
			popup.hide();
		}else if(e.index === 1){
			popup.hide();
			Titanium.Platform.openURL("https://www.hoopla.io");
		}
		Ti.API.info('e.cancel: ' + e.cancel);
		Ti.API.info('e.source.cancel: ' + e.source.cancel);
		Ti.API.info('e.index: ' + e.index);
	});
	popup.show();

}

function privacy(evt) {
	controller = Alloy.createController('privacy');
	controller.openPrivacy();
}

function terms(evt) {
	controller = Alloy.createController('terms');
	controller.openTerms();
}

function suggestContent(evt) {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Event/Business Suggestion";
	emailDialog.toRecipients = ['info@localruckus.com'];
	emailDialog.open();
}
