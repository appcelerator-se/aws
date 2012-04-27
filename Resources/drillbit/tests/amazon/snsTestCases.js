describe("SNS tests", {
	before_all : function() {
		Ti.App.AWS = require('ti.aws');
		//Make the AWS Module publically available across the App
		Ti.App.AWS.authorize('accessKey', 'secretKey');
		//put in you access keys and secret key
	},
	// Test that cloud module is part of TiSDK
	awsModule : function() {
		// Verify that the module is defined
		valueOf(Ti.App.AWS).shouldBeObject();
	},
	//***************CreateTopic test cases start**************

	/**
	 *Test case for creating topic without passing name.
	 */

	snsCreateEmptyTopic : asyncTest({
		start : function(callback) {
			var data = {
				'Name' : ''
			};
			Ti.App.AWS.SNS.createTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSCreateEmptyTopic response'
	}),

	/**
	 *Test case for creating topic by passing a valid topic name.
	 */
	snsCreateValidTopic : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'DrillBitTestTopic'
			};
			Ti.App.AWS.SNS.createTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSCreateValidTopic response'
	}),
	/**
	 *Test case for creating topic by passing an Invalid name.
	 */
	snsCreateInValidTopic : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'drillInvalidTopic#' //Only uppercase and lowercase ASCII letters, numbers, and hyphens valid.
			};
			Ti.App.AWS.SNS.createTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSCreateInValidTopic response'
	}),
	//*************Create Topic test cases ends**************

	//****************List Topic test cases starts.***************

	/**
	 *Test case for listing all topics.
	 */
	snsListTopic : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken' : ''
			};
			Ti.App.AWS.SNS.listTopics(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSListTopics response'
	}),

	//*************List Topic test cases ends**************

	//**************Confirm Subscription test cases starts.**************

	/**
	 *Test case for Confirming Subscription without passing Token.
	 */
	snsConfirmSubscriptionWithoutToken : asyncTest({
		start : function(callback) {
			var data = {
				'AuthenticateOnUnsubscribe' : '',
				'Token' : '', //Token is empty
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.confirmSubscription(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSConfirmSubscriptionWithoutToken response'
	}),

	/**
	 *Test case for Confirming Subscription with invalid Token.
	 */
	snsConfirmSubscriptionWithInvalidToken : asyncTest({
		start : function(callback) {
			var data = {
				'AuthenticateOnUnsubscribe' : '',
				'Token' : '*&&$@#&*#&', //Token is invalid
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.confirmSubscription(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSConfirmSubscriptionWithInvalidToken response'
	}),

	/**
	 *Test case for Confirming Subscription without passing TopicArn.
	 */
	snsConfirmSubscriptionWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AuthenticateOnUnsubscribe' : '',
				'Token' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.confirmSubscription(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSConfirmSubscriptionWithoutTopicArn response'
	}),

	/**
	 *Test case for Confirming Subscription with invalid TopicArn.
	 */
	snsConfirmSubscriptionWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AuthenticateOnUnsubscribe' : '',
				'Token' : '',
				'TopicArn' : 'mytopicarn'//TopicArn is invalid
			};
			Ti.App.AWS.SNS.confirmSubscription(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSConfirmSubscriptionWithInvalidTopicArn response'
	}),

	/**
	 *Test case for Confirming Subscription.
	 */
	snsConfirmSubscription : asyncTest({
		start : function(callback) {
			var data = {
				'AuthenticateOnUnsubscribe' : '',
				'Token' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.confirmSubscription(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSConfirmSubscription response'
	}),

	//*************Confirm Subscription test cases ends**************

	//****************Delete Topic test cases starts.*****************

	/**
	 *Test case for deleting topic without passing TopicArn.
	 */
	snsDeleteTopicWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.deleteTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSDeleteTopicWithoutTopicArn response'
	}),

	/**
	 *Test case for deleting topic with invalid TopicArn.
	 */
	snsDeleteTopicWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.deleteTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSDeleteTopicWithInvalidTopicArn response'
	}),

	/**
	 *Test case for deleting topic.
	 */
	snsDeleteTopic : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.deleteTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSDeleteTopic response'
	}),

	//*************Delete Topic test cases ends**************

	//**************GetSubscriptionAttributes test cases starts.**************

	/**
	 *Test case for getting SubscriptionAttributes without passing SubscriptionArn.
	 */
	snsGetSubscriptionAttributesWithoutSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''//SubscriptionArn is empty
			};
			Ti.App.AWS.SNS.getSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetSubscriptionAttributesWithoutSubscriptionArn response'
	}),

	/**
	 *Test case for getting SubscriptionAttributes with invalid SubscriptionArn.
	 */
	snsGetSubscriptionAttributesWithInvalidSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''//SubscriptionArn is invalid
			};
			Ti.App.AWS.SNS.getSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetSubscriptionAttributesWithInvalidSubscriptionArn response'
	}),

	/**
	 *Test case for getting SubscriptionAttributes.
	 */
	snsGetSubscriptionAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''
			};
			Ti.App.AWS.SNS.getSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetSubscriptionAttributes response'
	}),

	//*************GetSubscriptionAttributes test cases ends**************

	//*************GetTopicAttributes test cases starts****************

	/**
	 *Test case for getting TopicAttributes without passing TopicArn.
	 */
	snsGetTopicAttributesWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.getTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetTopicAttributesWithoutTopicArn response'
	}),

	/**
	 *Test case for getting TopicAttributes with invalid TopicArn.
	 */
	snsGetTopicAttributesWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.getTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetTopicAttributesWithInvalidTopicArn response'
	}),

	/**
	 *Test case for getting TopicAttributes.
	 */
	snsGetTopicAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.getTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for snsGetTopicAttributes response'
	}),

	//*************GetTopicAttributes test cases ends**************

	//****************List Subscriptions test cases starts.***************

	/**
	 *Test case for listing all subscriptions.
	 */
	snsListSubscriptions : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken' : ''
			};
			Ti.App.AWS.SNS.listSubscriptions(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for snsListSubscriptions response'
	}),

	//*************List Subscriptions test cases ends**************

	//****************List Subscriptions By Topic test cases starts.***************

	/**
	 *Test case for getting TopicAttributes without passing TopicArn.
	 */
	snsListSubscriptionsByTopicWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.listSubscriptionsByTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSListSubscriptionsByTopicWithoutTopicArn response'
	}),

	/**
	 *Test case for getting TopicAttributes with invalid TopicArn.
	 */
	snsListSubscriptionsByTopicWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.listSubscriptionsByTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSListSubscriptionsByTopicWithInvalidTopicArn response'
	}),

	/**
	 *Test case for listing all subscriptions By Topic.
	 */
	snsListSubscriptionsByTopic : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken' : '',
				'TopicArn' : ''//Required
			};
			Ti.App.AWS.SNS.listSubscriptionsByTopic(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSListSubscriptionsByTopic response'
	}),

	//*************List Subscriptions test cases ends***************

	//****************Publish test cases starts.***************

	/**
	 *Test case for publishing without passing Message.
	 */
	snsPublishWithoutMessage : asyncTest({
		start : function(callback) {
			var data = {
				'Message' : '', //Message is empty
				'MessageStructure' : '',
				'Subject' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.publish(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSPublishWithoutMessage response'
	}),

	/**
	 *Test case for publishing with invalid Message.
	 */
	snsPublishWithInvalidMessage : asyncTest({
		start : function(callback) {
			var data = {
				'Message' : '', //Message is invalid
				'MessageStructure' : '',
				'Subject' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.publish(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSPublishWithInvalidMessage response'
	}),

	/**
	 *Test case for publishing without passing TopicArn.
	 */
	snsPublishWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Message' : '',
				'MessageStructure' : '',
				'Subject' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.publish(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSPublishWithoutTopicArn response'
	}),

	/**
	 *Test case for publishing with invalid TopicArn.
	 */
	snsPublishWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Message' : '',
				'MessageStructure' : '',
				'Subject' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.publish(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSPublishWithInvalidTopicArn response'
	}),

	/**
	 *Test case for publishing.
	 */
	snsPublish : asyncTest({
		start : function(callback) {
			var data = {
				'Message' : '', //Message is required
				'MessageStructure' : '',
				'Subject' : '',
				'TopicArn' : ''//TopicArn is required
			};
			Ti.App.AWS.SNS.publish(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSPublish response'
	}),

	//*************Publish test cases ends**************

	//*************Remove Permission test cases starts****************

	/**
	 *Test case for removing permission without passing TopicArn.
	 */
	snsRemovePermissionWithoutLabel : asyncTest({
		start : function(callback) {
			var data = {
				'Label' : '', //Label is empty
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.removePermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for snsRemovePermissionWithoutLabel response'
	}),

	/**
	 *Test case for removing permission with invalid Label.
	 */
	snsRemovePermissionWithInvalidLabel : asyncTest({
		start : function(callback) {
			var data = {
				'Label' : '', //Label is invalid
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.removePermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for snsRemovePermissionWithInvalidLabel response'
	}),

	/**
	 *Test case for removing permission without passing TopicArn.
	 */
	snsRemovePermissionWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Label' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.removePermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSRemovePermissionWithoutTopicArn response'
	}),

	/**
	 *Test case for removing permission with invalid TopicArn.
	 */
	snsRemovePermissionWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Label' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.removePermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSGetTopicAttributesWithInvalidTopicArn response'
	}),

	/**
	 *Test case for removing permission.
	 */
	snsRemovePermission : asyncTest({
		start : function(callback) {
			var data = {
				'Label' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.removePermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for snsRemovePermission response'
	}),

	//***************Remove Permission test cases ends****************

	//****************AddPermission test cases starts.***************

	/**
	 *Test case for adding permission without passing AWSAccountId.
	 */
	snsAddPermissionWithoutAWSAccountId : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '', //AWSAccountId is empty
				'ActionName.member.1' : '',
				'Label' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithoutAWSAccountId response'
	}),

	/**
	 *Test case for adding permission with invalid AWSAccountId.
	 */
	snsAddPermissionWithInvalidAWSAccountId : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '', //AWSAccountId is invalid
				'ActionName.member.1' : '',
				'Label' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithInvalidAWSAccountId response'
	}),

	/**
	 *Test case for adding permission without passing ActionName.
	 */
	snsAddPermissionWithoutActionName : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '', //ActionName is empty
				'Label' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithoutActionName response'
	}),

	/**
	 *Test case for adding permission with invalid ActionName.
	 */
	snsAddPermissionWithInvalidActionName : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '', //ActionName is invalid
				'Label' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithInvalidActionName response'
	}),

	/**
	 *Test case for adding permission without passing Label.
	 */
	snsAddPermissionWithoutLabel : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '',
				'Label' : '', //Label is empty
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithoutLabel response'
	}),

	/**
	 *Test case for adding permission with invalid Label.
	 */
	snsAddPermissionWithInvalidLabel : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '',
				'Label' : '', //Label is invalid
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithInvalidLabel response'
	}),

	/**
	 *Test case for adding permission without passing TopicArn.
	 */
	snsAddPermissionWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '',
				'Label' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithoutTopicArn response'
	}),

	/**
	 *Test case for adding permission with invalid TopicArn.
	 */
	snsAddPermissionWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '',
				'ActionName.member.1' : '',
				'Label' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermissionWithInvalidTopicArn response'
	}),

	/**
	 *Test case for adding permission.
	 */
	snsAddPermission : asyncTest({
		start : function(callback) {
			var data = {
				'AWSAccountId.member.1' : '', //Required
				'ActionName.member.1' : '', //Required
				'Label' : '', //Required
				'TopicArn' : ''//Required
			};
			Ti.App.AWS.SNS.addPermission(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSAddPermission response'
	}),

	//*************AddPermission test cases ends**************

	//****************SetSubscriptionAttributes test cases starts***************

	/**
	 *Test case for setting SubscriptionAttributes without passing AttributeName.
	 */
	snsSetSubscriptionAttributesWithoutAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //AttributeName is empty
				'AttributeValue' : '',
				'SubscriptionArn' : ''
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithoutAttributeName response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes with invalid AttributeName.
	 */
	snsSetSubscriptionAttributesWithInvalidAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //AttributeName is invalid
				'AttributeValue' : '',
				'SubscriptionArn' : ''
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithInvalidAttributeName response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes without passing AttributeValue.
	 */
	snsSetSubscriptionAttributesWithoutAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '', //AttributeValue is empty
				'SubscriptionArn' : ''
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithoutAttributeValue response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes with invalid AttributeValue.
	 */
	snsSetSubscriptionAttributesWithInvalidAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '', //AttributeValue is invalid
				'SubscriptionArn' : ''
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithInvalidAttributeValue response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes without passing SubscriptionArn.
	 */
	snsSetSubscriptionAttributesWithoutSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '',
				'SubscriptionArn' : ''//SubscriptionArn is empty
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithoutSubscriptionArn response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes with invalid SubscriptionArn.
	 */
	snsSetSubscriptionAttributesWithInvalidSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '',
				'SubscriptionArn' : ''//SubscriptionArn is invalid
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributesWithInvalidSubscriptionArn response'
	}),

	/**
	 *Test case for setting SubscriptionAttributes.
	 */
	snsSetSubscriptionAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //Required
				'AttributeValue' : '', //Required
				'SubscriptionArn' : ''//Required
			};
			Ti.App.AWS.SNS.setSubscriptionAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetSubscriptionAttributes response'
	}),

	//*************SetSubscriptionAttributes test cases ends**************

	//****************SetTopicAttributes test cases starts***************

	/**
	 *Test case for setting TopicAttributes without passing AttributeName.
	 */
	snsSetTopicAttributesWithoutAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //AttributeName is empty
				'AttributeValue' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithoutAttributeName response'
	}),

	/**
	 *Test case for setting TopicAttributes with invalid AttributeName.
	 */
	snsSetTopicAttributesWithInvalidAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //AttributeName is invalid
				'AttributeValue' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithInvalidAttributeName response'
	}),

	/**
	 *Test case for setting TopicAttributes without passing AttributeValue.
	 */
	snsSetTopicAttributesWithoutAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '', //AttributeValue is empty
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithoutAttributeValue response'
	}),

	/**
	 *Test case for setting TopicAttributes with invalid AttributeValue.
	 */
	snsSetTopicAttributesWithInvalidAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '', //AttributeValue is invalid
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithInvalidAttributeValue response'
	}),

	/**
	 *Test case for setting TopicAttributes without passing TopicArn.
	 */
	snsSetTopicAttributesWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithoutTopicArn response'
	}),

	/**
	 *Test case for setting TopicAttributes with invalid TopicArn.
	 */
	snsSetTopicAttributesWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '',
				'AttributeValue' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributesWithInvalidTopicArn response'
	}),

	/**
	 *Test case for setting TopicAttributes.
	 */
	snsSetTopicAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : '', //Required
				'AttributeValue' : '', //Required
				'TopicArn' : ''//Required
			};
			Ti.App.AWS.SNS.setTopicAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSetTopicAttributes response'
	}),

	//*************SetTopicAttributes test cases ends**************

	//****************Subscribe test cases starts***************

	/**
	 *Test case for subscribing without passing Endpoint.
	 */
	snsSubscribeWithoutEndpoint : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '', //Endpoint is empty
				'Protocol' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithoutEndpoint response'
	}),

	/**
	 *Test case for subscribing with invalid Endpoint.
	 */
	snsSubscribeWithInvalidEndpoint : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '', //Endpoint is invalid
				'Protocol' : '',
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithInvalidEndpoint response'
	}),

	/**
	 *Test case for subscribing without passing Protocol.
	 */
	snsSubscribeWithoutProtocol : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '',
				'Protocol' : '', //Protocol is empty
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithoutProtocol response'
	}),

	/**
	 *Test case for subscribing with invalid Protocol.
	 */
	snsSubscribeWithInvalidProtocol : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '',
				'Protocol' : '', //Protocol is invalid
				'TopicArn' : ''
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithInvalidProtocol response'
	}),

	/**
	 *Test case for subscribing without passing TopicArn.
	 */
	snsSubscribeWithoutTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '',
				'Protocol' : '',
				'TopicArn' : ''//TopicArn is empty
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithoutTopicArn response'
	}),

	/**
	 *Test case for subscribing with invalid TopicArn.
	 */
	snsSubscribeWithInvalidTopicArn : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '',
				'Protocol' : '',
				'TopicArn' : ''//TopicArn is invalid
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribeWithInvalidTopicArn response'
	}),

	/**
	 *Test case for subscribing.
	 */
	snsSubscribe : asyncTest({
		start : function(callback) {
			var data = {
				'Endpoint' : '', //Required
				'Protocol' : '', //Required
				'TopicArn' : ''//Required
			};
			Ti.App.AWS.SNS.subscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSSubscribe response'
	}),

	//*************Subscribe test cases ends**************

	//****************Unsubscribe test cases starts***************
	/**
	 *Test case for unsubscribing without passing SubscriptionArn.
	 */
	snsUnsubscribeWithoutSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''//SubscriptionArn is empty
			};
			Ti.App.AWS.SNS.unsubscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSUnsubscribeWithoutSubscriptionArn response'
	}),

	/**
	 *Test case for unsubscribing with invalid SubscriptionArn.
	 */
	snsUnsubscribeWithInvalidSubscriptionArn : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''//SubscriptionArn is invalid
			};
			Ti.App.AWS.SNS.unsubscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSUnsubscribeWithInvalidSubscriptionArn response'
	}),

	/**
	 *Test case for unsubscribing.
	 */
	snsUnsubscribe : asyncTest({
		start : function(callback) {
			var data = {
				'SubscriptionArn' : ''//Required
			};
			Ti.App.AWS.SNS.unsubscribe(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for SNSUnsubscribe response'
	}),

	//*************Unsubscribe test cases ends**************

});
