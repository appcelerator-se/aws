windowFunctions['verifyEmailAddress'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.verifyEmailAddress({
		'emailAddress' : 'test@test.com'
	}, function(response) {
		
	}, function(error) {
		

	});
	win.open();

};
windowFunctions['deleteVerifiedEmailAddress'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.deleteVerifiedEmailAddress({
		'emailAddress' : 'test@test.com'
	}, function(response) {
		
	}, function(error) {
		

	});
	win.open();

};
windowFunctions['getSendQuota'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.getSendQuota({}, function(response) {

	}, function(error) {

	});
	win.open();

};
windowFunctions['getSendStatistics'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.getSendStatistics({

	}, function(response) {

	}, function(error) {

	});
	win.open();

};
windowFunctions['listVerifiedEmailAddresses'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.listVerifiedEmailAddresses({

	}, function(response) {

	}, function(error) {

	});
	win.open();

};
windowFunctions['sendEmail'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SES.sendEmail({
		source : 'test@test.com',
		destination : {
			to : ['test@test.com'],
			cc : ['test@test.com'],
			bcc : ['test@test.com']
		},
		message : {
			subject : 'Hello Message',
			body : {
				text : 'Hi... This is a test message.'
			}
		}
		
	});
	win.open();

};
