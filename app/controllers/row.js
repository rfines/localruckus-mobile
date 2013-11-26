var args = arguments[0] || {};
var moment = require('alloy/moment');
if (args.eventData.nextOccurrence != undefined && args.eventData.nextOccurrence.start != undefined && args.eventData.nextOccurrence.end != undefined) {
	var eventData = args.eventData;
	var displayStartOccurrence = moment(args.eventData.nextOccurrence.start).utc();
	var displayEndOccurrence = moment(args.eventData.nextOccurrence.end).utc();
	if (Alloy.Globals.timeFrame.start.isAfter(moment().endOf('day'))) {
		ne = _.find(args.eventData.occurrences, function(item) {
			return moment(item.start).isAfter(Alloy.Globals.timeFrame.start);
		});
		displayStartOccurrence = moment(ne.start).utc();
		displayEndOccurrence = moment(ne.end).utc();
	}
	var day = displayStartOccurrence.calendar().split(' ')[0];
	$.row.eventData = args.eventData;
	$.row.name = $.name.text = args.eventData.name;
	$.row.date = $.date.text = displayStartOccurrence.format('D');
	$.row.time = $.time.text = displayStartOccurrence.format('h a') + "-" + displayEndOccurrence.format('h a');
	$.row.day = $.day.text = day;
	if (eventData.media != undefined && eventData.media.length > 0) {
		$.detailImage.image = eventData.media[0].url;
	}
}
