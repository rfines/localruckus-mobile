function openDetail(e) {
	$.trigger('detail',e.rowData.eventData);
}

function loadEntertainment(e) {
	exports.loadInitialData({tags:'ENTERTAINMENT', radius: 1000});
}

function loadFood(e) {
	exports.loadInitialData({tags:'FOOD-AND-DRINK', radius: 1000});
}

function loadMusic(e) {
	exports.loadInitialData({tags:'MUSIC', radius: 1000});
}

function loadArts(e) {
	exports.loadInitialData({tags:'ARTS', radius: 1000});
}

function loadFamily(e) {
	exports.loadInitialData({tags:"FAMILY-AND-CHILDREN", radius:1000});
}

exports.loadInitialData = function(options) {
	var data = [];
	var moment = require('alloy/moment');
	var options = options || {};
	var radius = options.radius || 1000;
	var tags = options.tags || 'ENTERTAINMENT'; 
	var ll = Alloy.Globals.location.coords.longitude + ',' + Alloy.Globals.location.coords.latitude;
	var start = moment().toISOString();
	var url = "http://api-stage.hoopla.io/event?ll="+ ll + "&radius=" + radius + "&tags=" + tags + "&height=50&width=50&start="+start;
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        data = JSON.parse(this.responseText);
			var tableData = [];
			for (var i=0; i < data.length; i++) {
				item = data[i];
				tableData.push(Alloy.createController('row', {
					eventData : item,
					name: item.name
				}).getView());			
			}
			$.table.setData(tableData);		    
	    },
	    onerror: function(e) {
	        Ti.API.error(e);
	    }
	});
	Ti.API.error("Sending xhr request");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();	      
};
