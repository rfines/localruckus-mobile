var alloyString = require('alloy/string');

exports.htmlToLabel = function(str) {
	var regex1 = /<(br\s+\/|br)>/gi;
	var regex2 = /<(p|\/p)>/gi;
	var allOtherTags = /<(.|\n)*?>/gi;
	var newstr = str.replace(/&nbsp;/gi, ' ').replace(regex1, "\n").replace(regex2, "\n").replace(allOtherTags, "");
	newstr = newstr.replace(/\n+/g, '\n\n');
	return alloyString.trim(newstr);
};
