function AddView() {
	var self = Ti.UI.createView();
	
	var lbl = Ti.UI.createLabel({
		text:'Please select an item',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		lbl.text = e.name + ':  $'+e.price;
	});
	
	return self;
};

module.exports = AddView;


	// bh.ui.createAddWindow = function() {
		// var win = Ti.UI.createWindow({
			// title:L('new_fugitive'),
			// layout:'vertical',
			// backgroundColor:'#fff'
		// });
// 		
		// if (Ti.Platform.osname === 'iphone') {
			// var b = Titanium.UI.createButton({
				// title:'Close',
				// style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			// });
			// b.addEventListener('click',function() {
				// win.close();
			// });
			// win.setRightNavButton(b);
		// }
// 		
		// return win;
	// };