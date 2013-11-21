function openDetail(e) {
	controller = Alloy.createController('detail');
	d = controller.getView();
	controller.setBoxerStats(e.rowData.eventData);
	d.open();
}

var drawerOpen = false;
function openSearchDrawer() {	

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
var tag="ENTERTAINMENT";
var reset = false;
var page=0;
var radius = 10000;
function loadEntertainment(e) {
	page = 0;
	reset = true;
	exports.loadInitialData({
		tags : 'ENTERTAINMENT',
		radius : radius,
		skip:0
	});
}

function loadFood(e) {
	page = 0;
	reset = true;
	tag = "FOOD-AND-DRINK";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip:0
	});
	
}

function loadMusic(e) {
	page = 0;
	reset = true;
	tag = "MUSIC";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip:0
	});
}

function loadArts(e) {
	page = 0;
	reset = true;
	tag = "ARTS";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip:0
	});
}

function loadFamily(e) {
	page = 0;
	reset = true;
	tag = "FAMILY-AND-CHILDREN";
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip:0
	});
}

exports.loadInitialData = function(options) {
	var data = [];
	var moment = require('alloy/moment');
	var options = options || {};
	var radius = options.radius || radius;
	var tags = options.tags || 'ENTERTAINMENT';
	var ll = Alloy.Globals.location.coords.longitude + ',' + Alloy.Globals.location.coords.latitude;
	var start = moment().toISOString();
	var skip='';
	if(options.skip){
		skip = options.skip;
	}
	var url = "http://api-stage.hoopla.io/event?ll=" + ll + "&radius=" + radius + "&tags=" + tags + "&height=150&imageType=circle&width=150&start=" + start+"&limit=25&skip="+skip;
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			data = JSON.parse(this.responseText);
			var tableData = [];
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				tableData.push(Alloy.createController('row', {
					eventData : item,
					name : item.name
				}).getView());
			}
			$.locationLabel.text = Alloy.Globals.reverseLocation.places[0].city + ', ' + Alloy.Globals.reverseLocation.places[0].zipcode;
			$.addressTextField.value = Alloy.Globals.reverseLocation.places[0].address;
			
			if(!options.skip){
				$.table.setData(tableData);
			}else if(options.success){
				options.success(tableData);
			}
		},
		onerror : function(e) {
			Ti.API.error(e);
			if(options.error){
				options.error();
			}
		}
	});
	Ti.API.error("Sending xhr request");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();
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
		error : function(){
			el.hide();
		}
	});
}
function loadMore(e){
	var el = e;
	page = page+1;
	var skipNum=page*25;
	exports.loadInitialData({
		tags : tag,
		radius : radius,
		skip:skipNum,
		success : function(data) {
			$.table.appendRow(data);
			if(data.length == 25){
				el.success();
			}else{
				el.done();
			}
			
		},
		error : function(){
			el.error();
		}
	});
}
