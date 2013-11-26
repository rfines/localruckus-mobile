var flurry = require('sg.flurry');
flurry.startSession('M3MCW6KYR53Y83CVXF3M');
flurry.logUncaughtExceptions(true);
flurry.crashReportingEnabled(true);
flurry.logEvent('start');

Alloy.Globals.baseUrl = "http://api-stage.hoopla.io";
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.stopWaiting = function cancel() {
	Alloy.Globals.loading.hide();
};

Alloy.Globals.startWaiting = function load() {
    Alloy.Globals.loading.show('Loading...', false);
};