exports.openPrivacy=function(){
	
	var win = $.privacyWindow;
	$.homeBar.height = 25;
	$.homeBar.top = 5;
	$.homeBar.backgroundColor = 'black';
	$.privacyPolicyView.top =40;
	win.open();
};

function home(){
	Ti.API.info("Going Home");
	controller = Alloy.createController('master');
	d = controller.getView();
	controller.loadInitialData({tags:"ENTERTAINMENT"});
	d.open();
	
}
