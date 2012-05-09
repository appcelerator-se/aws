var AppTabGroup = (function() {
	
	var API = {};
	
	API.APP = null;
	API.tabGroup = null;
	API.currentUser = null;
	
	API.init = function(args) {
		
		var UIWin = require('/samples/highscores/UIWin'); UIWin.APP = API.APP;
		
		//create module instance
		API.tabGroup = Ti.UI.createTabGroup();
			
			var winHome = new UIWin.factoryWindow({});
			tabHome = Ti.UI.createTab({ title: L(UIWin.name), icon: UIWin.icon, window: winHome });
			UIWin.parentNav = tabHome;
			API.tabGroup.addTab(tabHome);
			
		/*
		//lets add some global event listeners
		Titanium.App.addEventListener('logout', function(e)
		{
		});//end logout
		*/
		
		API.tabGroup.addEventListener('open',function()
		{
			
		});//end open
		
	};//end init
	
	API.open = function()
	{
		if ( API.tabGroup == null) { API.init({}); }
		API.tabGroup.open();
	}//end open
	
  	return API;
})(); //end AppTabGroup
module.exports = AppTabGroup;