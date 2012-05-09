if ( false )
{
	var APP = {
		appName: 'App Name',
		platform : Ti.Platform.osname,
		height : Ti.Platform.displayCaps.platformHeight,
		width : Ti.Platform.displayCaps.platformWidth
	}//end APP
	
	APP.AppTabGroup = require('/samples/highscores/UIAppTabGroup');APP.AppTabGroup.APP = APP;
	APP.AppTabGroup.init({});
	
	//start the APP
	APP.AppTabGroup.open();
}//end if	
else
{
/*
 * We'll follow a really simple paradigm in this example app. It's going to be a hierarchy of tables where you can drill
 * in to individual examples for each Amazon WebService namespace.
 *
 * To facilitate that, we will have a collection of "windowFunctions" like the "Users" window, and the "Login" window.
 *
 * These are defined in the "windows" folder and its children.
 *
 * That's it! Enjoy.
 */
	
	// Define our window store.
	var windowFunctions = {};
	function handleOpenWindow(evt) {
	    var target = (evt.row && evt.row.title) || evt.target;
	    if (windowFunctions[target]) {
	        windowFunctions[target](evt);
	    }
	}
	
	// Utility functions for defining windows.
	var u = Ti.Android != undefined ? 'dp' : 0;
	function createWindow() {
	    return Ti.UI.createWindow({
	        backgroundColor: '#fff',
	        navBarHidden: true
	    });
	}
	function addBackButton(win) {
	    if (Ti.Android) {
	        return 0;
	    }
	    var back = Ti.UI.createButton({
	        title: 'Back',
	        color: '#fff', backgroundColor: '#000',
	        style: 0,
	        top: 0, left: 0, right: 0,
	        height: 40 + u
	    });
	    back.addEventListener('click', function (evt) {
	        win.close();
	    });
	    win.add(back);
	    return 40;
	}
	function createRows(rows) {
	    for (var i = 0, l = rows.length; i < l; i++) {
	        rows[i] = Ti.UI.createTableViewRow({
	            backgroundColor: '#fff',
	            title: rows[i],
	            hasChild: true
	        });
	    }
	    return rows;
	}
	
	function enumerateProperties(container, obj, offset) {
	    for (var key in obj) {
	        if (!obj.hasOwnProperty(key))
	            continue;
	        container.add(Ti.UI.createLabel({
	            text: key + ': ' + obj[key], textAlign: 'left',
	            color: '#000', backgroundColor: '#fff',
	            height: 30 + u, left: offset, right: 20 + u
	        }));
	        if (obj[key].split && obj[key].split('storage.cocoa').length > 1) {
	            container.add(Ti.UI.createImageView({
	                image: obj[key],
	                height: 120 + u, width: 120 + u,
	                left: offset
	            }));
	        }
	        if (typeof(obj[key]) == 'object') {
	            enumerateProperties(container, obj[key], offset + 20);
	        }
	    }
	}
	
	function error(e) {
	    alert((e.error && e.message) || JSON.stringify(e));
	}

	Ti.App.AWS = require('ti.aws'); //Make the AWS Module publically available across the App	
	// Include the window hierarchy.
	Ti.include(
	    'windows/simpledb/table.js',
	    'windows/s3/table.js',
	    'windows/ses/table.js',
	    'windows/sqs/table.js',
	    'windows/sns/table.js'
	);
	
	var accessKey=Ti.App.Properties.getString('aws.access_key');
	var secretKey=Ti.App.Properties.getString('aws.secret_key');
	
	Ti.App.AWS=require('ti.aws'); //Make the AWS Module publically available across the App
	Ti.App.AWS.authorize(accessKey, secretKey);
			
	var win = Ti.UI.createWindow({
		backgroundColor: '#fff',
		navBarHidden: true,
		exitOnClose: true
	});
		
	var table = Ti.UI.createTableView({
		backgroundColor: '#fff',
		data: createRows([
			'SimpleDb',
			'S3',
			'SES',
			'SQS',
			'SNS'
		])
	});
	table.addEventListener('click', handleOpenWindow);
	win.add(table);
	win.open();
}//end else