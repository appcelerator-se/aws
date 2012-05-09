var STYLE = (function() {
  	
  	var API = {};
  	
  	API.platform = Ti.Platform.osname;
	API.android =  (Ti.Platform.name == 'android');
	
	API.LogoView = 
	{
		image: '/images/APP_logo.png',
		width: 267,
		height: 56
	};
	
	API.LogoView2 = 
	{
		image: '/images/homelogo.png',
		width: 320,
		height: 48
	};
  	
	API.Win = 
	{
		//backgroundImage : '/ui/images/Screen-Banner.png',
		barColor: '#26763A',
		backgroundColor:API.android ? 'red' : 'white',
	};//end Window
	
	API.View =
	{
		backgroundColor: API.android ? 'transparent' : 'transparent'
	};//endView
	
	API.TableViewNav =
	{
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		
		backgroundColor:'white',
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		headerTitle:' ',
		footerTitle:' ',
		backgroundColor: API.android ? 'transparent' : 'transparent',
		//backgroundColor: 'transparent',
		rowColor:'black',
		rowBackgroundColor:'white'
	};
	
	API.Button = 
	{
		height: '35dp',
		width: '210dp',
		color: '#131313',
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		borderWidth: 0,
		font: {
			fontSize: 20,
		},
		left: 10
	};//end Button
	
	API.Label =
	{
		textAlign:'left',
		color:'#131313',
		font:{fontSize:'17dp',fontFamily:'Helvetica Neue',fontWeight:'bold'}
	};//end label
	
	//API.platform = Ti.Platform.osname;
	//API.android = (Ti.Platform.name == 'android');
	
  	return API;
})(); //end STYLE
module.exports = STYLE;