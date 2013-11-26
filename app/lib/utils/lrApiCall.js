exports.getEvents = function(options) {
	options.height = options.height || 150;
	options.width = options.width || 150;
	options.imageType = 'circle';
	options.limit = options.limit || 25;
	argList = [];
	for (var i=0; i < _.keys(options).length; i++) {
	  item = _.keys(options)[i];
	  if (item != 'callback' && item != 'success' && item != 'error' && options[item]) {
	  	argList.push(item + '=' + options[item]);
	  }
	};
	var url = Alloy.Globals.baseUrl + "/event?" + argList.join('&');
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data = JSON.parse(this.responseText);
			var tableData = [];
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				tableData.push(Alloy.createController('row', {
					eventData : item,
					name : item.name
				}).getView());
			}
			options.callback(undefined, tableData);
		},
		onerror : function(e) {
			Ti.API.error(e);
			options.callback(e,undefined);
		}
	});
	Ti.API.error("Sending xhr request");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic aHJkZmVwU3p6UGVPQ1dvVVNvVDU6Nlg2MlF1SEdCZFIxcExOTXFQSlEwVE5KVU9WcjBnS0daVXlESU01bQ==");
	xhr.send();
};
exports.getBusinessEvents = function(options){
	options.height = options.height || 150;
	options.width = options.width || 150;
	options.imageType = 'circle';
	options.start || moment().toISOString();
	var url = Alloy.Globals.baseUrl + "/business/" +options.id+"/events?height="+options.height+"&width="+options.width+"&imageType="+options.imageType+"&start="+options.start; 
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data = JSON.parse(this.responseText);
			var tableData = [];
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				tableData.push(Alloy.createController('row', {
					eventData : item
				}).getView());
			}
			options.callback(undefined, tableData);
		},
		onerror : function(e) {
			Ti.API.error(e);
			Ti.API.error(e.source);
			options.callback(e,undefined);
		}
	});
	Ti.API.error("Sending xhr request to get business Events");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();
};
