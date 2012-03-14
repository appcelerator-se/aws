function ApplicationWindow() {
	
	Ti.API.info('BEGIN ApplicationWindow');
	
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		AddView = require('ui/common/AddView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();
		addView = new AddView();
		
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'Domains'
	});
	var b = Titanium.UI.createButton({
		title:'Add',
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	b.addEventListener('click',function() {
		Ti.API.info('clicked the add button');
		alert('*Add* Coming Soon!');
		//masterContainerWindow.close();
	});
	masterContainerWindow.setRightNavButton(b);
	masterContainerWindow.add(masterView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Details'
	});
	detailContainerWindow.add(detailView);
	
	//create add view container
	var addContainerWindow = Ti.UI.createWindow({
		title:'Add'
	});
	addContainerWindow.add(detailView);
	
	//createiOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	
	return self;
};

module.exports = ApplicationWindow;
