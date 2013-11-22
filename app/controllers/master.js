var api = require('utils/lrApiCall');
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

function changeSearchCriteria(e) {
	toggleSearchDrawer();
	exports.loadInitialData({
		tags : tag,
		radius : parseInt($.radiusLabel.text) * 1609,
		skip : 0
	});	
	
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
	var moment = require('alloy/moment');
	var options = options || {};
	var radius = options.radius || radius;
	var tags = options.tags || 'ENTERTAINMENT';
	var ll = Alloy.Globals.location.coords.longitude + ',' + Alloy.Globals.location.coords.latitude;
	var start = moment().toISOString();
	var end = '';
	if (options.end) {
		end = moment(options.end).toISOString();
	}
	var skip = '';
	if (options.skip) {
		skip = options.skip;
	}
	api.getEvents(skip, 25, tag, radius, ll, start, end, function(err, tableData) {
		if (err) {
			Ti.API.error(err);
			if(options.error){
				options.error(err);
			}
		} else {
			$.locationLabel.text = Alloy.Globals.reverseLocation.places[0].city + ', ' + Alloy.Globals.reverseLocation.places[0].zipcode;
			$.addressTextField.value = Alloy.Globals.reverseLocation.places[0].address;
			if (!options.skip) {
				$.table.setData(tableData);
			} else if (options.success) {
				options.success(tableData);
			}
		}

	});

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
			if (data.length == 25) {
				el.success();
			} else {
				el.done();
			}

		},
		error : function() {
			el.error();
		}
	});
}
