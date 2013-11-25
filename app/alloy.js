Alloy.Globals.baseUrl = "http://api-stage.hoopla.io";
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.stopWaiting = function cancel() {
	Alloy.Globals.loading.hide();
};

Alloy.Globals.startWaiting = function load() {
    Alloy.Globals.loading.show('Loading...', false);
};