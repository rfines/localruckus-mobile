var args = arguments[0] || {};
var eventData = args.eventData;
$.row.eventData = args.eventData;
$.row.name = $.name.text = args.eventData.name;
if(eventData.media != undefined && eventData.media.length >0){
	$.detailImage.image = eventData.media[0].url;
}
