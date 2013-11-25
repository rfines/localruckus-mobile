var api = require('utils/lrApiCall');
var business = {};

function backToBusiness() {
	$.businessEventsWindow.close();
}
function openDetail(e) {
	controller = Alloy.createController('detail');
	d = controller.getView();
	controller.setEvent(e.rowData.eventData);
	d.open();
}

exports.setBusinesEvents = function(eventData,bus){
	if(eventData.length >0){
		$.table.setData(eventData);
	}else{
		$.table.visible=false;
		$.noContentView.visible = true;
	}
	business = bus;
};
