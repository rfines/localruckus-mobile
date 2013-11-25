var api = require('utils/lrApiCall');
var business = {};

function backToBusiness() {
	$.businessEventsWindow.close();
}
exports.setBusinesEvents = function(events,bus){
	if(events.length >0){
		$.table.setData(events);
	}else{
		$.table.visible=false;
		$.noContentView.visible = true;
	}
	business = bus;
};
