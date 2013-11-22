exports.openTerms = function(){
	var win = $.termsWindow;
	$.homeBar.height = 25;
	$.homeBar.top = 5;
	$.homeBar.backgroundColor = 'black';
	$.termsOfUse.top =40;
	win.open();
};
function home(){
	controller = Alloy.createController('master');
	d = controller.getView();
	controller.loadInitialData();
	d.open();
}
function showTerms(){
	alert("showTerms");
}
