exports.hello = function() {
	alert('hello world');
};
exports.getEvents = function(skip, limit, tag, radius, ll, start, end, callback){
	var data = [];
	var url = Alloy.Globals.baseUrl + "/event?ll=" + ll + "&radius=" + radius + "&tags=" + tag + "&height=150&imageType=circle&width=150&start=" + start+"&end=" + end + "&limit=25&skip="+skip;
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
			callback(undefined, tableData);
		},
		onerror : function(e) {
			Ti.API.error(e);
			callback(e,undefined);
		}
	});
	Ti.API.error("Sending xhr request");
	xhr.open("GET", url);
	xhr.setTimeout(30000);
	xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
	xhr.send();
};
