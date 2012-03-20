/*
 * A Test Application which exercises the AWS Module being developed.
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * Currently, the Application Tests only the 'SimpleDb' service.
 * 
 * Some of the outstanding Issues on the 'Test App' front.
 * - Structure of the app needs to be fixed, for it to be extended for writing additional test-services.
 * - Incorporation of Drillbit test suite
 * - More elegant way of managing the Security keys
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else if (Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
}
else {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	var AccessCredentialsWindow = require('/ui/common/AccessCredentialsWindow');
	var popup=new AccessCredentialsWindow();
	popup.addEventListener('close',function(e){
		var accessKey=Ti.App.Properties.getString('aws.access_key');
		var secretKey=Ti.App.Properties.getString('aws.secret_key');
		
		Ti.API.info('Popup Closed, logging in...');

		Ti.App.AWS=require('ti.aws'); //Make the AWS Module publically available across the App
		Ti.App.AWS.authorize(accessKey, secretKey);
					
		//require and open top level UI component
		var Window;
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		new Window().open();
		
	})
	popup.open();
	
}
