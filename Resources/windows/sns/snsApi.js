windowFunctions['addPermission'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	
	win.open();

};
windowFunctions['confirmSubscription'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.confirmSubscription({
		'Token' : '',
		'TopicArn' : ''
	}, function(response) {
		alert('success' + response);
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['createTopic'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.createTopic({
		'Name' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['deleteTopic'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.deleteTopic({
		'TopicArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['getSubscriptionAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.getSubscriptionAttributes({
		'SubscriptionArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['getTopicAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.getTopicAttributes({
		'TopicArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['listSubscriptions'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.listSubscriptions({

	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['listSubscriptionsByTopic'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.listSubscriptionsByTopic({
		'TopicArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['listTopics'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.listTopics({

	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['publish'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.publish({
		'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:My-Topic123456',
		'Message' : 'Hello,Test this side'
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['removePermission'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.removePermission({
		'Label' : '1',
		'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:My-Topic123456',
	}, function(response) {
	alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};

windowFunctions['setSubscriptionAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);
	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.setSubscriptionAttributes({
		'AttributeName' : '',//DeliveryPolicy
		'AttributeValue' : '',
		'SubscriptionArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['setTopicAttributes'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.setTopicAttributes({
		AttributeName : '',//DisplayName
		AttributeValue : '',
		TopicArn : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['subscribe'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.subscribe({
		'TopicArn' : '',
		'Endpoint' : '',
		'Protocol' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
windowFunctions['unsubscribe'] = function(evt) {
	var win = createWindow();
	var offset = addBackButton(win);

	var table = Ti.UI.createTableView({
		top : 44
	});
	win.add(table);
	var arrDomains = [];

	Ti.App.AWS.SNS.unsubscribe({
		'SubscriptionArn' : ''
	}, function(response) {
		alert('success' + JSON.stringify(response));
	}, function(error) {
		alert('error' + error);
	});
	win.open();

};
