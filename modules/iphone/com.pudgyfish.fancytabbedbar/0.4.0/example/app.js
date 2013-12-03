// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'#fff'
});
window.open();

var fancytabbedbar = require('com.pudgyfish.fancytabbedbar');
Ti.API.info("module is => " + fancytabbedbar);

var label = Ti.UI.createLabel({
	bottom:20,
	height:30,
	width:300,
	font:{fontSize:16},
	color:'#333',
	textAlign:'center'
});
window.add(label);

// this will be passed to the textProps property of the 3rd button
var blue_b3textProps = {
	width:'auto',
	right:0,
	shadowColor:'#222',
	shadowOffset:{x:0,y:-1},
	color:'#eee',
	selectedColor:'#e2f0e2',
	font:{fontSize:16, fontStyle:'normal', fontWeight:'bold'},
	textAlign:'right'
};

// this will be passed to the imageView property of the 1st button
var blue_b1arrow = Ti.UI.createImageView({
	image:'images/blue/arrow_off.png',
	imageSelected:'images/blue/arrow_on.png',
	width:10,
	height:5,
	left:10,
	toggleRotation:180
});
// this will be passed to the imageView property of the 2nd button
var blue_b2arrow = Ti.UI.createImageView({
	image:'images/blue/arrow_off.png',
	imageSelected:'images/blue/arrow_on.png',
	width:10,
	height:5,
	left:12,
	toggleRotation:180
});
// this will be passed to the imageView property of the 3rd button
var blue_b3arrow = Ti.UI.createImageView({
	image:'images/blue/arrow_off.png',
	imageSelected:'images/blue/arrow_on.png',
	width:10,
	height:5,
	left:10,
	toggleRotation:180
});

// this is where we create an advanced tabbedBar
var blue_tabbedBar = fancytabbedbar.createFancyTabbedBar({
	top:20,
	height:40,
	index:2,
	labels:[
		{title:'Distance', backgroundImage:'images/blue/tab_left_off.png', backgroundSelectedImage:'images/blue/tab_left_on.png', width:110, textProps:{color:'#900', right:0}, imageView:blue_b1arrow},
		{title:'Name', backgroundImage:'images/blue/tab_center_off.png', backgroundSelectedImage:'images/blue/tab_center_on.png', width:88, imageView:blue_b2arrow, textProps:{right:0}}, 
		{
			title:'Cost', 
			backgroundImage:'images/blue/tab_right_off.png', 
			backgroundSelectedImage:'images/blue/tab_right_on.png', 
			width:80, 
			textProps:blue_b3textProps,
			imageView:blue_b3arrow
		}
	]
});

// this is where we create an advanced tabbedBar
var red_tabbedBar = fancytabbedbar.createFancyTabbedBar({
	top:80,
	height:40,
	index:1,
	labels:[
		{title:'Small', backgroundImage:'images/red/tab_left_off.png', backgroundSelectedImage:'images/red/tab_left_on.png', width:80},
		{title:'Medium', backgroundImage:'images/red/tab_center_off.png', backgroundSelectedImage:'images/red/tab_center_on.png', width:90}, 
		{title:'Large', backgroundImage:'images/red/tab_right_off.png', backgroundSelectedImage:'images/red/tab_right_on.png', width:80}
	]
});

// this is where we create an advanced tabbedBar
var mono_tabbedBar = fancytabbedbar.createFancyTabbedBar({
	top:140,
	height:40,
	index:2,
	labels:[
		{title:'One', backgroundImage:'images/mono/tab_left_off.png', backgroundSelectedImage:'images/mono/tab_left_on.png', width:60, textProps:{color:'#666', selectedColor:'#333'}},
		{title:'Two', backgroundImage:'images/mono/tab_center_off.png', backgroundSelectedImage:'images/mono/tab_center_on.png', width:60, textProps:{color:'#666', selectedColor:'#333'}}, 
		{title:'Three', backgroundImage:'images/mono/tab_center_off.png', backgroundSelectedImage:'images/mono/tab_center_on.png', width:70, textProps:{color:'#666', selectedColor:'#333'}}, 
		{title:'Four', backgroundImage:'images/mono/tab_right_off.png', backgroundSelectedImage:'images/mono/tab_right_on.png', width:60, textProps:{color:'#666', selectedColor:'#333'}}
	]
});

var b1 = Ti.UI.createButton({
	top:250,
	width:160,
	height:30,
	title:'Change index to 0'
});

b1.addEventListener('click', function(e) {
	// the 2nd parameter of changeIndex() is an array of integers that will set the multiClickState (the rotation of the imageView), 
	// this is useful for resetting sorting arrows
	blue_tabbedBar.changeIndex(0, [0,0,0]); 
	mono_tabbedBar.changeIndex(0);
	red_tabbedBar.changeIndex(0);
	Ti.API.info("blue_tabbedBar.index: " + blue_tabbedBar.index + "; blue_tabbedBar.multiClickState: " + blue_tabbedBar.multiClickState); 
	Ti.API.info("mono_tabbedBar.index: " + blue_tabbedBar.index); 
	Ti.API.info("red_tabbedBar.index: " + blue_tabbedBar.index); 
	label.text = "Set the index to 0";
});

blue_tabbedBar.addEventListener('click', function(e) {
	Ti.API.info("Clicked tab index: " + JSON.stringify(e.index));
	Ti.API.info("multiClickState: " + JSON.stringify(e.source.multiClickState));
	label.text = "You clicked blue_tabbedBar tab " + e.index;
});

red_tabbedBar.addEventListener('click', function(e) {
	Ti.API.info("Clicked tab index: " + JSON.stringify(e.index));
	Ti.API.info("multiClickState: " + JSON.stringify(e.source.multiClickState));
	label.text = "You clicked red_tabbedBar tab " + e.index;
});

mono_tabbedBar.addEventListener('click', function(e) {
	Ti.API.info("Clicked tab index: " + JSON.stringify(e.index));
	Ti.API.info("multiClickState: " + JSON.stringify(e.source.multiClickState));
	label.text = "You clicked mono_tabbedBar tab " + e.index;
});

Ti.API.info("active tab: " + blue_tabbedBar.index); 
// ******************************************************************************************************************
// ** NOTE ** .index is ONLY a property and CANNOT be used to set the index
//  If you need to set the index, use the changeIndex() function, as seen in the b1.addEventListener statement above
// ******************************************************************************************************************
label.text = "Current tab of blue_tabbedBar is " + blue_tabbedBar.index;

window.add(blue_tabbedBar);
window.add(red_tabbedBar);
window.add(mono_tabbedBar);
window.add(b1);
