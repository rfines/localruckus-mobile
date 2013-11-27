var flurry = require('sg.flurry');
var api = require('utils/lrApiCall');
var geo = require('utils/geoCoder');
var moment = require('alloy/moment');

var timeFrames = [
	{text : 'Any Time', tf: {start: moment().startOf('day')}},
	{text : 'Today', tf: {start: moment().startOf('day'), end : moment().endOf('day')}},
	{text : 'Tomorrow', tf:{start: moment().startOf('day').add('days',1), end : moment().endOf('day').add('days',1)}},
	{text : 'This Weekend', tf: {start: moment().day(5).startOf('day'), end : moment().day(7).endOf('day')}},
	{text : 'Next Week', tf:{start: moment().startOf('week').add('weeks',1).add('days',1), end : moment().endOf('week').add('weeks', 1).add('days',1)}},
	{text : 'Next Weekend', tf:{start: moment().day(5).startOf('day').add('weeks',1), end : moment().day(7).endOf('day').add('weeks',1)}},
	{text : 'Later', tf: {start: moment().startOf('day').day(1).add('weeks',2)}}
];
var radii = [
	{text : '1 mile', distance : 1},
	{text : '5 miles', distance : 5},
	{text : '10 miles', distance : 10},
	{text : '25 mile', distance : 25},
	{text : '50 miles', distance : 50}
];
	
Alloy.Globals.timeFrame = timeFrames[0].tf;
Alloy.Globals.radius = radii[0].distance;
exports.initialStateNoLocation = function() {
	toggleSearchDrawer();
};

function increaseTimeFrame() {
	i = _.indexOf(timeFrames, _.find(timeFrames, function(i) {
		return $.selectedTimeFrame.text == i.text;
	}));
	if (i < timeFrames.length-1) {
		$.selectedTimeFrame.text = timeFrames[i+1].text;
		Alloy.Globals.timeFrame = 	timeFrames[i+1].tf;	
	}
}
function decreaseTimeFrame() {
	i = _.indexOf(timeFrames, _.find(timeFrames, function(i) {
		return $.selectedTimeFrame.text == i.text;
	}));
	if (i != 0) {
		$.selectedTimeFrame.text = timeFrames[i-1].text;
		Alloy.Globals.timeFrame = 	timeFrames[i-1].tf;
	}
}

function increaseRadius() {
	i = _.indexOf(radii, _.find(radii, function(i) {
		return $.selectedRadius.text == i.text;
	}));
	if (i < radii.length-1) {
		$.selectedRadius.text = radii[i+1].text;
		Alloy.Globals.radius = radii[i+1].distance;	
	}
}
function decreaseRadius() {
	i = _.indexOf(radii, _.find(radii, function(i) {
		return $.selectedRadius.text == i.text;
	}));
	if (i != 0) {
		$.selectedRadius.text = radii[i-1].text;
		Alloy.Globals.radius = 	radii[i-1].distance;
	}
}


function openDetail(e) {
	controller = Alloy.createController('detail');
	d = controller.getView();
	controller.setEvent(e.rowData.eventData);
	d.open();
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
		alert('We were unable to get your current location.  Please enable location services.');
	};
	var success = function() {
		$.locationLabel.text = Alloy.Globals.cityState;
		$.addressTextField.value = Alloy.Globals.displayAddress;
		changeAddress();
		Alloy.Globals.stopWaiting();
		myLocation = true;
	};
	geo.myLocation(failure, success);
}

function changeSearchCriteria(e) {
	toggleSearchDrawer();
	var failure = function() {
		var dialog = Ti.UI.createAlertDialog({
			title:"Oops",
			message:"The address you entered could not be found.  Try entering your city and state or your zip code.",
			animate:true,
			ok:'Ok'
		}).show();
		
	};
	var success = function() {
		var radius=Alloy.Globals.radius;
		keyword = undefined;
		params = {
			radius : parseInt(radius) * 1609,
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
		$.timePicker.close();
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
var loading = false;
var tag = "ENTERTAINMENT";
var reset = false;
var page = 0;
var radius = 10000;
function loadEntertainment(e) {
	flurry.logEvent('viewEvents', {category: 'ENTERTAINMENT'});
	page = 0;
	reset = true;
	tag = "ENTERTAINMENT";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});
}
function loadCampus(e) {
	flurry.logEvent('viewEvents', {category: 'CAMPUS'});
	page = 0;
	reset = true;
	tag = "CAMPUS";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip : 0
	});
}
function loadFood(e) {
	flurry.logEvent('viewEvents', {category: 'FOOD-AND-DRINK'});
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
	flurry.logEvent('viewEvents', {category: 'MUSIC'});
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
	flurry.logEvent('viewEvents', {category: 'ARTS'});
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
	flurry.logEvent('viewEvents', {category: 'FAMILY-AND-CHILDREN'});
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
	var options = options || {};
	options.radius = options.radius || radius;
	options.tags = options.tags || 'ENTERTAINMENT';
	options.ll = Alloy.Globals.location.coords.longitude + ',' + Alloy.Globals.location.coords.latitude;
	options.start = options.start || Alloy.Globals.timeFrame.start.toISOString();
	if (options.end || Alloy.Globals.timeFrame.end) {
		options.end = options.end || Alloy.Globals.timeFrame.end.toISOString();
	}
	options.callback = function(err, tableData) {
		if (err) {
			Ti.API.error(err);
			if (options.error) {
				options.error(err);
			}
			$.table.setData([]);
			Alloy.Globals.stopWaiting();
		} else {
			$.locationLabel.text = Alloy.Globals.cityState;
			$.addressTextField.value = Alloy.Globals.displayAddress;
			if (!options.skip) {
				tableData = _.sortBy(tableData, function(item) {
					if (Alloy.Globals.timeFrame.start.isAfter(moment().endOf('day'))) {
						ne = _.find(item.eventData.occurrences, function(occ) {
							return moment(occ.start).isAfter(Alloy.Globals.timeFrame.start);
						});
						return moment(ne.start).toISOString();						
					} else {
						return moment(item.eventData.nextOccurrence.start).toISOString();
					}
				});
				(tableData.length ===25) ? $.is.state="DONE" : $.is.state="SUCCESS";				
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
$.mainWindow.open();
function myLoader(e) {
	var el = e;
	if(!loading){
		loading = true;
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
	}else{
		el.hide();
	}
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
