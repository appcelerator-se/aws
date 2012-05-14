describe("AWS SNS Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
		arn = '';
	},
	after_all : function() {
		AWS = null;
	},
	timeout : 5000,

	//*************Create Topic test cases start**************
	/**
	 *Test case for creating topic WithEmpty  name.
	 */
	createEmptyTopic_as_async : function(callback) {
		var params = {
			'Name' : ''//Empty
		};
		AWS.SNS.createTopic(params, function(data) {
			callback.failed('Some error occured');
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
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for creating topic by  a valid topic name.
	 */
	createValidTopic_as_async : function(callback) {
		var params = {
			'Name' : 'DrillBitTestTopic'//Required
		};
		AWS.SNS.createTopic(params, function(data) {
			callback.passed();
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn
			};
			AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
			}, function(error) {
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Create Topic test cases end**************

	//****************List Topic test cases start***************

	/**
	 *Test case for listing all topics.
	 */
	listTopic_as_async : function(callback) {
		var params = {
		};
		AWS.SNS.listTopics(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************List Topic test cases end**************
	//************Confirm Subscription test cases start.**************
	/**
	 *Test case for Confirming Subscription WithEmpty  Token.
	 */
	confirmSubscriptionWithEmptyToken_as_async : function(callback) {
		var params = {
			'Token' : '', //Token is empty
			'TopicArn' : arn
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
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
			'TopicArn' : arn
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription WithEmpty TopicArn.
	 */
	confirmSubscriptionWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805bfad098d77ccb5b355099356f979ecf6c8f579df806b3f9ec20aabea6f9a023f58bcd0bc07ba237c5dd0b70c46d4404b422cf07c1bc1bb415c125276db91e9e55c447cc3be68cec13165ed9462fb84c458137fdb3d257a0fd25cb65257cc249',
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription with invalid TopicArn.
	 */
	confirmSubscriptionWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'Token' : '2336412f37fb687f5d51e6e241d09c805bfad098d77ccb5b355099356f979ecf6c8f579df806b3f9ec20aabea6f9a023f58bcd0bc07ba237c5dd0b70c46d4404b422cf07c1bc1bb415c125276db91e9e55c447cc3be68cec13165ed9462fb84c458137fdb3d257a0fd25cb65257cc249',
			'TopicArn' : 'arn:aws:sns:us-east-'//Invalid TopicArn
		};
		AWS.SNS.confirmSubscription(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for Confirming Subscription.
	 * Test cases requires token that is sent through email, that needs to be copied to tiapp.xml
	 *
	 */
	confirmSubscription_as_async : function(callback) {
		var params = {
			'Name' : 'DrillBitTestTopic12'//Required
		};
		AWS.SNS.createTopic(params, function(data) {
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'Token' : Titanium.App.Properties.getString('token'),
				'TopicArn' : arn
			};
			AWS.SNS.confirmSubscription(params, function(data) {
				callback.passed();
				var params = {
					'TopicArn' : arn
				};
				AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Confirm Subscription test cases end**************

	//****************Delete Topic test cases start.*****************

	/**
	 *Test case for deleting topic WithEmpty TopicArn.
	 */
	deleteTopicWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : ''//TopicArn is empty
		};
		AWS.SNS.deleteTopic(params, function(data) {
			callback.failed('Some error occured');
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
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleting topic.
	 */
	deleteTopic_as_async : function(callback) {
		var params = {
			'Name' : 'DrillBitTestTopicForDeletion'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//Creating a topic for deletion
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn
			};
			AWS.SNS.deleteTopic(params, function(data) {//Calling deleteTopic API
				callback.passed();
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Delete Topic test cases end**************

	//**************GetSubscriptionAttributes test cases start.**************

	/**
	 *Test case for getting SubscriptionAttributes WithEmpty  SubscriptionArn.
	 */
	getSubscriptionAttributesWithEmptySubscriptionArn_as_async : function(callback) {
		var params = {
			'SubscriptionArn' : ''//SubscriptionArn is empty
		};
		AWS.SNS.getSubscriptionAttributes(params, function(data) {
			callback.failed('Some error occured');
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
			'QueueName' : 'DrillBitTestQueue886'
		};
		AWS.SQS.createQueue(params, function(data) {//Creating queue
			var queueUrl = data.CreateQueueResult[0].QueueUrl[0];
			var params = {
				'Name' : 'DrillBitTestTopic12345'//Required
			};
			AWS.SNS.createTopic(params, function(data) {//Craeting topic
				arn = data.CreateTopicResult[0].TopicArn[0];
				var params = {
					'Endpoint' : 'arn:aws:sqs:us-east-1:704687501311:DrillBitTestQueue886', //Required
					'Protocol' : 'sqs', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.subscribe(params, function(data) {//Calling subscribe
					var subscriptionArn = data.SubscribeResult[0].SubscriptionArn[0];
					var params = {
						'SubscriptionArn' : subscriptionArn//Required
					}
					AWS.SNS.getSubscriptionAttributes(params, function(data) {//Calling getSubscriptionAttributes
						callback.passed();
						AWS.SNS.unsubscribe(params, function(data) {//unsubscribing
							var params = {
								'AWSAccountId' : '704687501311',
								'QueueName' : 'DrillBitTestQueue886'
							};
							AWS.SQS.deleteQueue(params, function(data) {//Deleting queue
								var params = {
									'TopicArn' : arn//Required
								};
								AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic

								}, function(error) {
								});
							}, function(error) {
							});
						}, function(error) {
						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************GetSubscriptionAttributes test cases end**************

	//*************GetTopicAttributes test cases start****************

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
			'Name' : 'DrillBitTestTopic12'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//Creating a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn//Required
			};
			AWS.SNS.getTopicAttributes(params, function(data) {//Calling getTopicAttributes on the topic
				callback.passed();
				AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************GetTopicAttributes test cases end**************

	//****************List Subscriptions test cases start.***************

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
	//*************List Subscriptions test cases end**************

	//****************List Subscriptions By Topic test cases start.***************

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
			'Name' : 'DrillBitTestTopic123'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//creating a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn//Required
			};
			AWS.SNS.listSubscriptionsByTopic(params, function(data) {//Calling listSubsciptionByTopic on the topic
				callback.passed();
				AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************List Subscriptions test cases end***************

	//****************Publish test cases start.***************

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
			'Name' : 'DrillBitTestTopic1234'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//creating a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'Message' : 'Hello,this is a test message', //Message is required
				'TopicArn' : arn//Required
			};
			AWS.SNS.publish(params, function(data) {//Calling publish on the topic
				callback.passed();
				var params = {
					'TopicArn' : arn//Required
				};
				AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************Publish test cases end**************

	//*************Remove Permission test cases start****************
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
			'Name' : 'DrillBitTestTopic1234'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//Craeting a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn,
				'Label' : 'MyPermission',
				'ActionName.member.1' : 'GetTopicAttributes',
				'AWSAccountId.member.1' : '682109303140'
			};
			AWS.SNS.addPermission(params, function(data) {//Calling addPermission on the topic
				var params = {
					'Label' : 'MyPermission', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.removePermission(params, function(data) {//Calling removePermission to remove the permission
					callback.passed();
					var params = {
						'TopicArn' : arn//Required
					};
					AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
					}, function(error) {
					});
				}, function(error) {
					callback.failed('Some error occured')
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//***************Remove Permission test cases end****************

	//****************SetSubscriptionAttributes test cases start***************

	/**
	 *Test case for setting SubscriptionAttributes WithEmpty  AttributeName.
	 */
	setSubscriptionAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AttributeName' : '', //AttributeName is empty
			'AttributeValue' : '',
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:b7c57b3c-a8cf-4277-9d5a-648fa0dcd885'
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
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:b7c57b3c-a8cf-4277-9d5a-648fa0dcd885'
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
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:b7c57b3c-a8cf-4277-9d5a-648fa0dcd885'
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
			'SubscriptionArn' : 'arn:aws:sns:us-east-1:704687501311:LastTesting:b7c57b3c-a8cf-4277-9d5a-648fa0dcd885'
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
			'QueueName' : 'DrillBitTestQueue884'
		};
		AWS.SQS.createQueue(params, function(data) {//Creating queue
			var queueUrl = data.CreateQueueResult[0].QueueUrl[0];
			var params = {
				'Name' : 'DrillBitTestTopic12346'//Required
			};
			AWS.SNS.createTopic(params, function(data) {//Creating topic
				arn = data.CreateTopicResult[0].TopicArn[0];
				var params = {
					'Endpoint' : 'arn:aws:sqs:us-east-1:704687501311:DrillBitTestQueue884', //Required
					'Protocol' : 'sqs', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.subscribe(params, function(data) {//Calling subscribe
					var subscriptionArn = data.SubscribeResult[0].SubscriptionArn[0];
					var params = {
						'AttributeName' : 'DeliveryPolicy', //Required
						'AttributeValue' : '{}', //Required
						'SubscriptionArn' : subscriptionArn//Required
					}
					AWS.SNS.setSubscriptionAttributes(params, function(data) {//Calling setSubscriptionAttributes
						callback.passed();
						var params = {
							'SubscriptionArn' : subscriptionArn
						};
						AWS.SNS.unsubscribe(params, function(data) {//Calling unsubscribe
							var params = {
								'AWSAccountId' : '704687501311',
								'QueueName' : 'DrillBitTestQueue884'
							};
							AWS.SQS.deleteQueue(params, function(data) {//deleting the queue
								var params = {
									'TopicArn' : arn//Required
								};
								AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic

								}, function(error) {
								});
							}, function(error) {
							});
						}, function(error) {
						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************SetSubscriptionAttributes test cases end**************

	//****************SetTopicAttributes test cases start***************

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
			'Name' : 'DrillBitTestTopic1234'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//creating a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'AttributeName' : 'DisplayName', //Required
				'AttributeValue' : 'TestValue', //Required
				'TopicArn' : arn//Required
			};
			AWS.SNS.setTopicAttributes(params, function(data) {//Calling setTopicAttributes on the topic
				callback.passed();
				var params = {
					'TopicArn' : arn//Required
				};
				AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************SetTopicAttributes test cases end**************

	//****************Subscribe test cases start***************

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
			'QueueName' : 'DrillBitTestQueue888'
		};
		AWS.SQS.createQueue(params, function(data) {// Creating queue
			var queueUrl = data.CreateQueueResult[0].QueueUrl[0];
			var params = {
				'Name' : 'DrillBitTestTopic12343'//Required
			};
			AWS.SNS.createTopic(params, function(data) {//Creating topic
				arn = data.CreateTopicResult[0].TopicArn[0];
				var params = {
					'Endpoint' : 'arn:aws:sqs:us-east-1:704687501311:DrillBitTestQueue888', //Required
					'Protocol' : 'sqs', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.subscribe(params, function(data) {//Calling subscribe
					callback.passed();
					var subscriptionArn = data.SubscribeResult[0].SubscriptionArn[0];
					var params = {
						'SubscriptionArn' : subscriptionArn
					};
					AWS.SNS.unsubscribe(params, function(data) {//Calling unsubscribe
						var params = {
							'AWSAccountId' : '704687501311',
							'QueueName' : 'DrillBitTestQueue888'
						};
						AWS.SQS.deleteQueue(params, function(data) {//Deleting the queue
							var params = {
								'TopicArn' : arn//Required
							};
							AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic

							}, function(error) {
							});
						}, function(error) {
						});
					}, function(error) {
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************Subscribe test cases end**************

	//****************Unsubscribe test cases start***************
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
			'QueueName' : 'DrillBitTestQueue889'
		};
		AWS.SQS.createQueue(params, function(data) {
			var queueUrl = data.CreateQueueResult[0].QueueUrl[0];
			var params = {
				'Name' : 'DrillBitTestTopic12342'//Required
			};
			AWS.SNS.createTopic(params, function(data) {
				arn = data.CreateTopicResult[0].TopicArn[0];
				var params = {
					'Endpoint' : 'arn:aws:sqs:us-east-1:704687501311:DrillBitTestQueue889', //Required
					'Protocol' : 'sqs', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.subscribe(params, function(data) {//Calling Subscribe
					var subscriptionArn = data.SubscribeResult[0].SubscriptionArn[0];
					var params = {
						'SubscriptionArn' : subscriptionArn
					};
					AWS.SNS.unsubscribe(params, function(data) {//Calling unsubscribe
						callback.passed();
						var params = {
							'AWSAccountId' : '704687501311',
							'QueueName' : 'DrillBitTestQueue889'
						};
						AWS.SQS.deleteQueue(params, function(data) {//Deleting the queue
							var params = {
								'TopicArn' : arn//Required
							};
							AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic

							}, function(error) {
							});
						}, function(error) {
						});
					}, function(error) {
						callback.failed('Some error occured');
					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************Unsubscribe test cases end**************
	//***************addPermission test cases start**************
	/**
	 *Test case for addPermission without passing any parameter
	 */
	addPermissionWithEmptyParams_as_async : function(callback) {
		params = {
			'TopicArn' : '',
			'Label' : '',
			'ActionName.member.1' : '',
			'AWSAccountId.member.1' : ''
		}
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission without passing TopicArn
	 */
	addPermissionWithEmptyTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : '',
			'Label' : 'MyPermission',
			'ActionName.member.1' : 'GetTopicAttributes',
			'AWSAccountId.member.1' : '682109303140'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission without passing label
	 */
	addPermissionWithEmptyLabel_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:My-Topic123456',
			'Label' : '',
			'ActionName.member.1' : 'GetTopicAttributes',
			'AWSAccountId.member.1' : '682109303140'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission without passing ActionName
	 */
	addPermissionWithEmptyAWSOtherAccountId_as_async : function(callback) {
		var params = {
			'TopicArn' : '',
			'Label' : 'MyPermission',
			'ActionName.member.1' : '',
			'AWSAccountId.member.1' : '682109303140'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission without passing AWSAccountId
	 */
	addPermissionWithEmptyActionName_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:My-Topic123456',
			'Label' : 'MyPermission',
			'ActionName.member.1' : 'GetTopicAttributes',
			'AWSAccountId.member.1' : ''
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission with all valid parameters
	 */
	addPermission_as_async : function(callback) {
		var params = {
			'Name' : 'DrillBitTestTopic1234'//Required
		};
		AWS.SNS.createTopic(params, function(data) {//Craeting a topic
			arn = data.CreateTopicResult[0].TopicArn[0];
			var params = {
				'TopicArn' : arn,
				'Label' : 'MyPermission',
				'ActionName.member.1' : 'GetTopicAttributes',
				'AWSAccountId.member.1' : '682109303140'
			};
			AWS.SNS.addPermission(params, function(data) {//Calling addPermission on the topic
				callback.passed();
				var params = {
					'Label' : 'MyPermission', //Required
					'TopicArn' : arn//Required
				};
				AWS.SNS.removePermission(params, function(data) {//Calling removePermission to remove the permission
					var params = {
						'TopicArn' : arn//Required
					};
					AWS.SNS.deleteTopic(params, function(data) {//Calling delete topic for deleting the topic
					}, function(error) {
					});
				}, function(error) {
				});
			}, function(error) {
				callback.failed('Some error occured')
			});
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	/**
	 *Test case for addPermission with invalid TopicArn
	 */
	addPermissionWithInvalidTopicArn_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311',
			'Label' : 'MyPermission',
			'ActionName.member.1' : 'InvalidActionName',
			'AWSAccountId.member.1' : '682109303140'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission with invalid ActionName
	 */
	addPermissionWithInvalidActionName_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311', //Invalid TopicArn
			'Label' : 'MyPermission',
			'ActionName.member.1' : 'GetTopicAttributes',
			'AWSAccountId.member.1' : '682109303140'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission with invalid AWSAccountId
	 */
	addPermissionWithInvalidAWSOtherAccountId_as_async : function(callback) {
		var params = {
			'TopicArn' : 'arn:aws:sns:us-east-1:704687501311:My-Topic123456',
			'Label' : 'MyPermission',
			'ActionName.member.1' : 'GetTopicAttributes',
			'AWSAccountId.member.1' : '682109303140%876'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	}
	//*************addPermission test cases ends**************
});
