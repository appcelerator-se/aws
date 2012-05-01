describe("AWS SNS Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
		failedCases='';
	},
	after_all :function()
	{
		alert(failedCases);
		
	},
	timeout : 5000,

	/**
	 *Test case for creating topic WithEmpty  name.
	 */
	createEmptyTopic_as_async : function(callback) {
		var params = {
			'Name' : ''//Empty
		};
		AWS.SNS.createTopic(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "createEmptyTopic_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for creating topic by  an Invalid name.
	 */
	createInvalidTopic_as_async : function(callback) {
		var params = {
			'Name' : 'DrillInvalidTopic#'//Only uppercase and lowercase ASCII letters, numbers, and hyphens valid.
		};
		AWS.SNS.createTopic(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "createInvalidTopic_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for creating topic by  a valid topic name.
	 */
	createValidTopic_as_async : function(callback) {
		var params = {
			'Name' : 'TestTopic1'//Required
		};
		AWS.SNS.createTopic(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
			failedCases = failedCases + "createValidTopic_as_async, ";
		});
	},
	//*************Create Topic test cases ends**************
	//****************List Topic test cases starts.***************

	/**
	 *Test case for listing all topics.
	 */
	listTopic_as_async : function(callback) {
		var params = {
		};
		AWS.SNS.listTopics(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
			failedCases = failedCases + "listTopic_as_async, ";
		});
	},
	//*************List Topic test cases ends**************
	//************Confirm Subscription test cases starts.**************
	/**
	 *Test case for Confirming Subscription WithEmpty  Token.
	 */
	confirmSubscriptionWithEmptyToken_as_async : function(callback) {
		var params = {
			'Token' : '', //Token is empty
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "confirmSubscriptionWithEmptyToken_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription with invalid Token.
	 */
	confirmSubscriptionWithInvalidToken_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805a5ajhhjkagjkaskluagaudy8789689689asdgt76627sghd6895be8b31efbc4483c32d', //Invalid token
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "confirmSubscriptionWithInvalidToken_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription WithEmpty TopicArn.
	 */
	confirmSubscriptionWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805a5a57b0cf345c7a71d42b5d9294cd2c8bbb33aec57d98fa2aea0d541f648059b26f2afcc5b86a60f8a1023c84d836ff3090e96509cd4172eab9e7c82346a0cecc1bbbccc4bf85ab490c999084ca1560bb8c899a7aa295be8b31efbc4483c32d',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "confirmSubscriptionWithEmptyTopicArn_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription with invalid TopicArn.
	 */
	confirmSubscriptionWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805a5a57b0cf345c7a71d42b5d9294cd2c8bbb33aec57d98fa2aea0d541f648059b26f2afcc5b86a60f8a1023c84d836ff3090e96509cd4172eab9e7c82346a0cecc1bbbccc4bf85ab490c999084ca1560bb8c899a7aa295be8b31efbc4483c32d',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//Invalid TopicArn
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "confirmSubscriptionWithInvalidTopicArn_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription.
	 */
	confirmSubscription_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805a5a57b0cf345c7a71d42b5d9294cd2c8bbb33aec57d98fa2aea0d541f648059b26f2afcc5b86a60f8a1023c84d836ff3090e96509cd4172eab9e7c82346a0cecc1bbbccc4bf85ab490c999084ca1560bb8c899a7aa295be8b31efbc4483c32d',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
			failedCases = failedCases + "confirmSubscription_as_async, ";
		});
	},
	//*************Confirm Subscription test cases ends**************

	//****************Delete Topic test cases starts.*****************

	/**
	 *Test case for deleting topic WithEmpty TopicArn.
	 */
	deleteTopicWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.deleteTopic(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "deleteTopicWithEmptyTopicArn_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleting topic with invalid TopicArn.
	 */
	deleteTopicWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1'//TopicArn is invalid
		};
		AWS.SNS.deleteTopic(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "deleteTopicWithInvalidTopicArn_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleting topic.
	 */
	deleteTopic_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:7046875'//Required
		};
		AWS.SNS.deleteTopic(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
			failedCases = failedCases + "deleteTopic_as_async, ";
		});
	},
	//*************Delete Topic test cases ends**************

	//**************GetSubscriptionAttributes test cases starts.**************

	/**
	 *Test case for getting SubscriptionAttributes WithEmpty  SubscriptionArn.
	 */
	getSubscriptionAttributesWithEmptySubscriptionArn_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : ''//SubscriptionArn is empty
		};
		AWS.SNS.getSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
			failedCases = failedCases + "getSubscriptionAttributesWithEmptySubscriptionArn_as_async, ";
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getting SubscriptionAttributes with invalid SubscriptionArn.
	 */
	getSubscriptionAttributesWithInvalidSubscriptionArn_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//SubscriptionArn is invalid
		};
		AWS.SNS.getSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getting SubscriptionAttributes.
	 */
	getSubscriptionAttributes_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'//Required
		};
		AWS.SNS.getSubscriptionAttributes(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************GetSubscriptionAttributes test cases ends**************

	//*************GetTopicAttributes test cases starts****************

	/**
	 *Test case for getting TopicAttributes WithEmpty TopicArn.
	 */
	getTopicAttributesWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.getTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getting TopicAttributes with invalid TopicArn.
	 */
	getTopicAttributesWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//TopicArn is invalid
		};
		AWS.SNS.getTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getting TopicAttributes.
	 */
	getTopicAttributes_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//Required
		};
		AWS.SNS.getTopicAttributes(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************GetTopicAttributes test cases ends**************

	//****************List Subscriptions test cases starts.***************

	/**
	 *Test case for listing all subscriptions.
	 */
	listSubscriptions_as_async : function(callback) {
		var params = {
		};
		AWS.SNS.listSubscriptions(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************List Subscriptions test cases ends**************

	//****************List Subscriptions By Topic test cases starts.***************

	/**
	 *Test case for listing Subscriptions By Topic WithEmpty TopicArn.
	 */
	listSubscriptionsByTopicWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.listSubscriptionsByTopic(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for listing Subscriptions By Topic with invalid TopicArn.
	 */
	listSubscriptionsByTopicWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//TopicArn is invalid
		};
		AWS.SNS.listSubscriptionsByTopic(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for listing all subscriptions By Topic.
	 */
	listSubscriptionsByTopic_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//Required
		};
		AWS.SNS.listSubscriptionsByTopic(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************List Subscriptions test cases ends***************

	//****************Publish test cases starts.***************

	/**
	 *Test case for publishing WithEmpty  Message.
	 */
	publishWithEmptyMessage_as_async : function(callback) {
		var params = {
			'Message' : '', //Message is empty
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.publish(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for publishing WithEmpty TopicArn.
	 */
	publishWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'Message' : 'Hello,this is a test message',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.publish(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for publishing with invalid TopicArn.
	 */
	publishWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'Message' : 'Hello,this is a test message',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//TopicArn is invalid
		};
		AWS.SNS.publish(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for publishing.
	 */
	publish_as_async : function(callback) {
		var params = {
			'Message' : 'Hello,this is a test message', //Message is required
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//TopicArn is required
		};
		AWS.SNS.publish(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Publish test cases ends**************

	//*************Remove Permission test cases starts****************

	/**
	 *Test case for removing permission WithEmpty TopicArn.
	 */
	removePermissionWithEmptyLabel_as_async : function(callback) {
		var params = {
			'Label' : '', //Label is empty
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.removePermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for removing permission WithEmpty TopicArn.
	 */
	removePermissionWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'Label' : '1',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.removePermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for removing permission with invalid TopicArn.
	 */
	removePermissionWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'Label' : '1',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//TopicArn is invalid
		};
		AWS.SNS.removePermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for removing permission.
	 */
	removePermission_as_async : function(callback) {
		var params = {
			'Label' : '1', //Required
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//Required
		};
		AWS.SNS.removePermission(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//***************Remove Permission test cases ends****************

	//****************SetSubscriptionAttributes test cases starts***************

	/**
	 *Test case for setting SubscriptionAttributes WithEmpty  AttributeName.
	 */
	setSubscriptionAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AttributeName' : '', //AttributeName is empty
			'AttributeValue' : '',
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes with invalid AttributeName.
	 */
	setSubscriptionAttributesWithInvalidAttributeName_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicySNS', //AttributeName is invalid
			'AttributeValue' : '',
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes WithEmpty AttributeValue.
	 */
	setSubscriptionAttributesWithEmptyAttributeValue_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicy',
			'AttributeValue' : '{}', //AttributeValue is empty
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes with invalid AttributeValue.
	 */
	setSubscriptionAttributesWithInvalidAttributeValue_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicy',
			'AttributeValue' : '{value: \'hdfks\'}', //AttributeValue is invalid
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes WithEmpty SubscriptionArn.
	 */
	setSubscriptionAttributesWithEmptySubscriptionArn_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicy',
			'AttributeValue' : '',
			'SubscriptionArn' : ''//SubscriptionArn is empty
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes with invalid SubscriptionArn.
	 */
	setSubscriptionAttributesWithInvalidSubscriptionArn_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicy',
			'AttributeValue' : '',
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//SubscriptionArn is invalid
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting SubscriptionAttributes.
	 */
	setSubscriptionAttributes_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DeliveryPolicy', //Required
			'AttributeValue' : '', //Required
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'//Required
		};
		AWS.SNS.setSubscriptionAttributes(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************SetSubscriptionAttributes test cases ends**************

	//****************SetTopicAttributes test cases starts***************

	/**
	 *Test case for setting TopicAttributes WithEmpty AttributeName.
	 */
	setTopicAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AttributeName' : '', //AttributeName is empty
			'AttributeValue' : 'TestValue',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting TopicAttributes with invalid AttributeName.
	 */
	setTopicAttributesWithInvalidAttributeName_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DisplayNameSNS', //AttributeName is invalid
			'AttributeValue' : 'TestValue',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting TopicAttributes WithEmpty AttributeValue.
	 */
	setTopicAttributesWithEmptyAttributeValue_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DisplayName',
			'AttributeValue' : '', //AttributeValue is empty
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting TopicAttributes WithEmpty TopicArn.
	 */
	setTopicAttributesWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DisplayName',
			'AttributeValue' : 'TestValue',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting TopicAttributes with invalid TopicArn.
	 */
	setTopicAttributesWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DisplayName',
			'AttributeValue' : 'TestValue',
			'TopicArn' : ''//TopicArn is invalid
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setting TopicAttributes.
	 */
	setTopicAttributes_as_async : function(callback) {
		var params = {
			'AttributeName' : 'DisplayName', //Required
			'AttributeValue' : 'TestValue', //Required
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//Required
		};
		AWS.SNS.setTopicAttributes(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************SetTopicAttributes test cases ends**************

	//****************Subscribe test cases starts***************

	/**
	 *Test case for subscribing WithEmpty Endpoint.
	 */
	subscribeWithEmptyEndpoint_as_async : function(callback) {
		var params = {
			'Endpoint' : '', //Endpoint is empty
			'Protocol' : 'email',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing with invalid Endpoint.
	 */
	subscribeWithInvalidEndpoint_as_async : function(callback) {
		var params = {
			'Endpoint' : 'test.test@globallogic', //Endpoint is invalid
			'Protocol' : 'email',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing WithEmpty Protocol.
	 */
	subscribeWithEmptyProtocol_as_async : function(callback) {
		var params = {
			'Endpoint' : 'rahul.upreti@globallogic.com',
			'Protocol' : '', //Protocol is empty
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing with invalid Protocol.
	 */
	subscribeWithInvalidProtocol_as_async : function(callback) {
		var params = {
			'Endpoint' : 'rahul.upreti@globallogic.com',
			'Protocol' : 'invalidProtocol', //Protocol is invalid
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing WithEmpty  TopicArn.
	 */
	subscribeWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'Endpoint' : 'rahul.upreti@globallogic.com',
			'Protocol' : 'email',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing with invalid TopicArn.
	 */
	subscribeWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'Endpoint' : 'rahul.upreti@globallogic.com',
			'Protocol' : 'email',
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311'//TopicArn is invalid
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for subscribing.
	 */
	subscribe_as_async : function(callback) {
		var params = {
			'Endpoint' : 'rahul.upreti@globallogic.com', //Required
			'Protocol' : 'email', //Required
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//Required
		};
		AWS.SNS.subscribe(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Subscribe test cases ends**************

	//****************Unsubscribe test cases starts***************
	/**
	 *Test case for unsubscribing WithEmpty SubscriptionArn.
	 */
	unsubscribeWithEmptySubscriptionArn_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : ''//SubscriptionArn is empty
		};
		AWS.SNS.unsubscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for unsubscribing with invalid SubscriptionArn.
	 */
	unsubscribeWithInvalidSubscriptionArn_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting'//SubscriptionArn is invalid
		};
		AWS.SNS.unsubscribe(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for unsubscribing.
	 */
	unsubscribe_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:2eaabe64-8c72-4926-856d-8cf7e3c63640'//Required
		};
		AWS.SNS.unsubscribe(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	}
	//*************Unsubscribe test cases ends**************
});
