var UIWin = (function() {
	
	var STYLE = require('/samples/highscores/STYLE');
	var UTILS = require('/samples/highscores/UTILS');
	
	var API = {};
	API.APP = null;
	API.name = "UIWin";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
	
	API.AWS = require('ti.aws');
	API.accessKey = Ti.App.Properties.getString('aws.access_key');
	API.secretKey = Ti.App.Properties.getString('aws.secret_key');
	
	API.AWS.authorize(API.accessKey, API.secretKey);
	
	API.populateHighScores = function(e)
	{
		Ti.API.info( "populate high scores");
		//Ti.App.AWS.SimpleDB.
	};//end populateHighScores
	
	API.addSingleScore = function(e)
	{
		Ti.API.info( "addSingleScore");
	};//end addSingleScore

	API.viewScores = function(e)
	{
		Ti.API.info( "view Scores");
	};//end viewScores
	
	API.clearHighScoreList = function(e)
	{
		Ti.API.info( "clear Scores");
	};//end clearHighScoreList
	
	API.factoryView = function(args) {
		var topView = Ti.UI.createView(UTILS.combine(STYLE.View, {
			backgroundColor : 'white',
			layout: 'vertical'
		})); //end topView
		
		var popHSListButton = Ti.UI.createButton(UTILS.combine(STYLE.Button, {
			title: "Populate High Scores List",
			width:'300dp',
			height: '40dp'
		}));
		popHSListButton.addEventListener('click', API.populateHighScores );
		topView.add( popHSListButton );
		
		var addSingleScoreButton = Ti.UI.createButton(UTILS.combine(STYLE.Button, {
			title: "Add Single Score",
			width:'300dp',
			height: '40dp'
		}));
		addSingleScoreButton.addEventListener('click', API.addSingleScore );
		topView.add( addSingleScoreButton );
		
		var viewScoresButton = Ti.UI.createButton(UTILS.combine(STYLE.Button, {
			title: "View Scores",
			width:'300dp',
			height: '40dp'
		}));
		viewScoresButton.addEventListener('click', API.viewScores );
		topView.add( viewScoresButton );
		
		var viewA = Ti.UI.createView({
			layout:'horizontal',
			height: '40dp'
		});
			var switchA =Titanium.UI.createSwitch({
				value:false
			});
			viewA.add( switchA );
			var labelA = Ti.UI.createLabel({
				text:"Sort By Player"
			});
			viewA.add( labelA );
		topView.add( viewA );		
		
		var viewB = Ti.UI.createView({
			layout:'horizontal',
			height: '40dp'
		});
			var switchB =Titanium.UI.createSwitch({
				value:false
			});
			viewB.add( switchB );		
			var labelB = Ti.UI.createLabel({
				text:"Sort By Score"
			});
			viewB.add( labelB );
		topView.add( viewB );
		
		var clearScoresButton = Ti.UI.createButton(UTILS.combine(STYLE.Button, {
			title: "Clear High Scores List",
			width:'300dp',
			height: '40dp'
		}));
		topView.add( clearScoresButton );
		
		return topView;
	};//end factoryView
	
	API.factoryWindow = function(args) {
		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, { title : API.name }));
		API.win.add( API.factoryView({ }));
		return API.win;
	};//end factoryWindow
	
	return API;
})(); //end UIWin

module.exports = UIWin;