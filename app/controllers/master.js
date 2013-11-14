function openDetail(e) {
	$.trigger('detail', e);
}

var data = [];
var url = "http://api-stage.hoopla.io/event?near=64105&radius=600";
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        data = JSON.parse(this.responseText);
        Ti.API.debug(data);
		//some dummy data for our table view
		var tableData = [];
		for (var i=0; i < data.length; i++) {
			item = data[i];
			tableData.push(Alloy.createController('row', {
				name: item.name
			}).getView());			
		}
		$.table.setData(tableData);		    
    },
    onerror: function(e) {
        alert(e.error);
        alert(e.code);
        Ti.API.error(e);
    },
    timeout:5000
});
Ti.API.error("Sending xh request");
xhr.open("GET", url);
xhr.setRequestHeader("Authorization", "Basic TUVUa3dJMTVCZzBoZXVSTmFydTY6Nm4wcFJob2s0V1I4eXg4VnVkVUQ3WHNoYm9OQ3o1MW9GWEp2WkEyeQ==");
xhr.send();	