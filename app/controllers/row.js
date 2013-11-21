var args = arguments[0] || {};
var moment = require('alloy/moment');
if (args.eventData.nextOccurrence != undefined && args.eventData.nextOccurrence.start != undefined && args.eventData.nextOccurrence.end != undefined) {
	var eventData = args.eventData;
	var day = moment(args.eventData.nextOccurrence.start).utc().calendar().split(' ')[0];
	$.row.eventData = args.eventData;
	$.row.name = $.name.text = args.eventData.name;
	$.row.date = $.date.text = moment(args.eventData.nextOccurrence.start).utc().format('D');
	$.row.time = $.time.text = moment(args.eventData.nextOccurrence.start).utc().format('h a') + "-" + moment(args.eventData.nextOccurrence.end).utc().format('h a');
	$.row.day = $.day.text = day;
	if (eventData.media != undefined && eventData.media.length > 0) {
		$.detailImage.image = eventData.media[0].url;
	}
}
