windowFunctions['createQueue'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];
	Ti.App.AWS.SQS.createQueue({
		'QueueName' : 'TestQueue676767'
	}, function(response) {
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		Ti.API.info(JSON.stringify(response));

	});
	win.open();
};


windowFunctions['listQueues'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];
	Ti.App.AWS.SQS.listQueues({
		
	}, function(response) {
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		Ti.API.info(JSON.stringify(response));

	});
	win.open();
};


windowFunctions['getQueueUrl'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];
	Ti.App.AWS.SQS.getQueueUrl({
		'QueueName' : 'TestQueue676767'
	}, function(response) {
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		Ti.API.info(JSON.stringify(response));

	});
	win.open();
};


windowFunctions['setQueueAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];
	Ti.App.AWS.SQS.setQueueAttributes({
		'AWSAccountId':'704687501311','QueueName': 'TestQueue676767','Attribute.Name':'VisibilityTimeout','Attribute.Value':'35'
	}, function(response) {
		Ti.API.info(JSON.stringify(response));

	}, function(error) {
		Ti.API.info(JSON.stringify(response));

	});
	win.open();
};

