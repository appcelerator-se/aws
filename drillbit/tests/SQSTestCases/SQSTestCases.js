describe("AWS SQS Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
	},
	after_all : function() {
		AWS = null;
	},
	timeout : 5000,
	/**
	 *Test case for creating queue without passing queue name
	 */
	/**
	 *Test case for creating queue without passing queue name
	 */

	SQSCreateEmptyQueue_as_async : function(callback) {
		var params = {
			'QueueName' : ''
		};
		AWS.SQS.createQueue(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for creating queue by passing a Invalid queue name
	 */
	SQSCreateInValidQueue_as_async : function(callback) {
		var params = {
			'QueueName' : 'Queue@@drill'// special characters not allowed
		};
		AWS.SQS.createQueue(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for creating queue by passing a valid queue name
	 *Creating Queue with valid Queue Name
	 *Deleting Queue
	 */

	SQSCreateValidQueue_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue1'
		};
		AWS.SQS.createQueue(params, function(data) {
			callback.passed();
			var params = {
				'QueueName' : 'DrillBitTestQueue1',
				'AWSAccountId' : '704687501311',
			};
			AWS.SQS.deleteQueue(params, function(data) {
			}, function(error) {

			});

		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	//*************Create queue test cases ends**************
	//***************list queue test cases start**************
	SQSlistQueues_as_async : function(callback) {
		var params = {
			'QueueNamePrefix' : ''// its not required parameter
		};
		AWS.SQS.listQueues(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************list queue test cases ends**************

	//***************getQueueUrl test cases start**************
	/**
	 *Test case for getting QueueUrl without passing queue name
	 */
	SQSgetQueueUrlWithEmptyQueueName_as_async : function(callback) {
		var params = {
			'QueueName' : '',
			'QueueOwnerAWSAccountId' : ''
		};
		AWS.SQS.getQueueUrl(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getting QueueUrl with passing queue name
	 *Creating Queue to get QueueUrl
	 *Getting QueueUrl
	 *Deleting Queue
	 */
	SQSgetQueueUrl_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue2'

		};
		AWS.SQS.createQueue(params, function(data) {
			AWS.SQS.getQueueUrl(params, function(data) {
				callback.passed();
				var params = {
					'QueueName' : 'DrillBitTestQueue2',
					'AWSAccountId' : '704687501311',
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured')
			})
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************getQueueUrl test cases ends**************

	//***************addPermission test cases start**************
	/**
	 *Test case for addPermission without passing any parameter
	 */
	SQSaddPermissionWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : '',
			'AWSAccountId.1' : '',
			'ActionName.1' : ''
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
	SQSaddPermissionWithEmptyLabel_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : '', //Label is empty
			'AWSAccountId.1' : '682109303140',
			'ActionName.1' : 'SendMessage '
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission without passing AWSAccountId.1
	 */
	SQSaddPermissionWithEmptyAWSOtherAccountId_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '', //AWSOtherAccountId is empty
			'ActionName.1' : 'SendMessage'
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
	SQSaddPermissionWithEmptyActionName_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '682109303140',
			'ActionName.1' : ''//ActionName is empty
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission with all valid parameters
	 *Creating Queue to add permission
	 *Add Permission
	 *Remove Permission
	 *Deleting Queue
	 */
	SQSaddPermission_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue3'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue3',
				'Label' : 'AddPermissionTest',
				'AWSAccountId.1' : '682109303140',
				'ActionName.1' : 'SendMessage'
			};
			AWS.SQS.addPermission(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue3',
					'Label' : 'AddPermissionTest',
				};
				callback.passed();
				AWS.SQS.removePermission(params, function(data) {
					var params = {
						'QueueName' : 'DrillBitTestQueue3'
					};
					var params = {
						'QueueName' : 'DrillBitTestQueue3',
						'AWSAccountId' : '704687501311',
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for addPermission with invalid Action Name
	 */
	SQSaddPermissionWithInvalidActionName_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '682109303140',
			'ActionName.1' : 'SendMessageToAll'//Invalid ActionName
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for addPermission with invalid AWSAccountId.1
	 */
	SQSaddPermissionWithInvalidAWSOtherAccountId_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '68210930314067', //Invalid AWSOtherAccountId
			'ActionName.1' : 'SendMessage'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	//*************addPermission test cases ends**************
	//***************setQueueAttributes test cases start**************
	/**
	 *Test case for setQueueAttributes without passing any parameter
	 */
	SQSsetQueueAttributesWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : '',
			'Attribute.Value' : ''
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setQueueAttributes without passing Attribute Name
	 */
	SQSsetQueueAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : '', //Empty Attribute.Name
			'Attribute.Value' : '3000'
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setQueueAttributes without passing Attribute Value
	 */
	SQSsetQueueAttributesWithEmptyAttributeValue_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeout',
			'Attribute.Value' : ''//Empty Attribute.Value
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setQueueAttributes with passing Invalid Attribute Name
	 */
	SQSsetQueueAttributesWithEmptyAttributeValue_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeouts', //Invalid Attribute Name
			'Attribute.Value' : '35'
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setQueueAttributes with passing Invalid Attribute Value
	 */
	SQSsetQueueAttributesWithEmptyAttributeValue_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeout',
			'Attribute.Value' : '35dasda'//Invalid Attribute Value
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for setQueueAttributes with passing all required valid parameters
	 *Creating Queue To set Attribute
	 *SetQueueAttribute
	 *Deleting Queue
	 */
	SQSsetQueueAttributes_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue4'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue4',
				'Attribute.Name' : 'VisibilityTimeout',
				'Attribute.Value' : '3000'
			};
			AWS.SQS.setQueueAttributes(params, function(data) {
				var params = {
					'QueueName' : 'DrillBitTestQueue4'
				};
				callback.passed();
				var params = {
					'QueueName' : 'DrillBitTestQueue4',
					'AWSAccountId' : '704687501311',
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************setQueueAttributes test cases ends**************
	//***************getQueueAttributes test cases start**************
	/**
	 *Test case for getQueueAttributes without passing AttributeName
	 */
	SQSgetQueueAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'AttributeName.1' : ''//Empty AttributeName
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getQueueAttributes with Invalid AttributeName
	 */
	SQSgetQueueAttributesWithEmptyAttributeName_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'AttributeName.1' : 'TestInvalid'//Invalid AttributeName
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getQueueAttributes with passing all parameter
	 *Creating Queue to set Attribute
	 *SetQueueAttribute to get Attribute
	 *GetQueueAttribute
	 *Delete Queue
	 */
	SQSgetQueueAttributes_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue5'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue5',
				'Attribute.Name' : 'VisibilityTimeout',
				'Attribute.Value' : '3000'
			};
			AWS.SQS.setQueueAttributes(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue5',
					'AttributeName.1' : 'All'
				};
				AWS.SQS.getQueueAttributes(params, function(data) {
					var params = {
						'QueueName' : 'DrillBitTestQueue5'
					};
					callback.passed();
					var params = {
						'QueueName' : 'DrillBitTestQueue5',
						'AWSAccountId' : '704687501311',
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});

	},
	//*************getQueueAttributes test cases ends**************
	//***************sendMessage test cases start**************
	/**
	 *Test case for sendMessage without passing message body
	 */
	SQSsendMessageWithEmptyMessageBody_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'MessageBody' : '', //Empty MessageBody
			'DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessage(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendMessage with valid Parameters
	 *Create Queue to send Message
	 *Send Message
	 *Delete Queue
	 */
	SQSsendMessage_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue6'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue6',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'QueueName' : 'DrillBitTestQueue6'
				};
				callback.passed();
				var params = {
					'QueueName' : 'DrillBitTestQueue6',
					'AWSAccountId' : '704687501311',
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************sendMessage test cases ends**************

	//***************sendMessageBatch test cases start**************
	/**
	 *Test case for sendMessageBatch without passing any parameters
	 */
	SQSsendMessageBatchWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : '',
			'SendMessageBatchRequestEntry.1.MessageBody' : '',
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendMessageBatch without passing SendMessageBatchRequestEntryId
	 */
	SQSsendMessageBatchWithEmptyEntryId_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : '', //Empty EntryId
			'SendMessageBatchRequestEntry.1.MessageBody' : 'Test',
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendMessageBatch without passing SendMessageBatchRequestEntryMessageBody parameters
	 */
	SQSsendMessageBatchWithEmptyMessageBody_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : 'test_msg_1',
			'SendMessageBatchRequestEntry.1.MessageBody' : '', //Empty MessageBody
			'SendMessageBatchRequestEntry.n.DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendMessageBatch with passing all parameters
	 *Creating Queue
	 *SendMessageBatch
	 *Deleting Queue
	 */
	SQSsendMessageBatch_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue7'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue7',
				'SendMessageBatchRequestEntry.1.Id' : 'test_msg_1',
				'SendMessageBatchRequestEntry.1.MessageBody' : 'This is DrillBit Test Cases Message Body'

			};
			AWS.SQS.sendMessageBatch(params, function(data) {
				
				callback.passed();
				var params = {
					'QueueName' : 'DrillBitTestQueue7',
					'AWSAccountId' : '704687501311',
				};
				AWS.SQS.deleteQueue(params, function(data) {

				}, function(error) {

				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************sendMessageBatch test cases ends**************
	//*************receive Message test cases starts**************
	/**
	 *Test case for receiveMessage with valid parameters
	 *Creating Queue
	 *Send Message
	 *receive Message
	 *Delete Queue
	 */
	SQSreceiveMessage_as_async : function(callback) {

		var params = {
			'QueueName' : 'DrillBitTestQueue8'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue8',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue8'
				};
				AWS.SQS.receiveMessage(params, function(data) {

					callback.passed();
					var params = {
						'QueueName' : 'DrillBitTestQueue8',
						'AWSAccountId' : '704687501311',
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {
						callback.failed(JSON.stringify(error));
					})
				}, function(error) {
					callback.failed(JSON.stringify(error));
				})
			}, function(error) {
				callback.failed(JSON.stringify(error));
			})
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});
	},

	//*************receive Message test cases ends**************
	//***************deleteMessage test cases start**************
	/**
	 *Test case for deleteMessage without passing ReceiptHandle
	 */
	SQSdeleteMessageWithEmptyReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : ''//Empty ReceiptHandle
		};
		AWS.SQS.deleteMessage(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteMessage with passing parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get Reciept Handle
	 *Delete Message
	 *Delete Queue
	 */
	SQSdeleteMessage_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue9'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue9',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue9'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var recieptHandle = data.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
					var params = {
						'AWSAccountId' : '704687501311',
						'QueueName' : 'DrillBitTestQueue9',
						'ReceiptHandle' : recieptHandle
					};
					AWS.SQS.deleteMessage(params, function(data) {
						var params = {
							'QueueName' : 'DrillBitTestQueue9'
						};
						callback.passed();
						var params = {
							'QueueName' : 'DrillBitTestQueue9',
							'AWSAccountId' : '704687501311',
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for deleteMessage with passing invalid reciept handle parameters
	 */
	SQSdeleteMessageWithInvalidReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'//Invalid ReceiptHandle
		};
		AWS.SQS.deleteMessage(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	//*************deleteMessage test cases ends**************

	//***************deleteMessageBatch test cases start**************
	/**
	 *Test case for deleteMessageBatch without passing any parameters
	 */
	SQSdeleteMessageBatchWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : '',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : ''
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteMessageBatch without passing DeleteMessageBatchRequestEntryId parameters
	 */
	SQSdeleteMessageBatchWithEmptyId_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : '',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteMessageBatch without passing DeleteMessageBatchRequestEntryReceiptHandle parameters
	 * Api's is returning success even if a parameter is missing. That's why test cases is failing
	 */
	SQSdeleteMessageBatchWithEmptyReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : ''
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(JSON.stringify(data));
		});
	},
	/**
	 *Test case for deleteMessageBatch with passing invalid DeleteMessageBatchRequestEntryReceiptHandle parameters
	 * Api's is returning success even if a parameter is invalid. That's why test cases is failing
	 */
	SQSdeleteMessageBatchWithInvalidReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9'//Invalid ReceiptHandle
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(JSON.stringify(data));
		});
	},
	/**
	 *Test case for deleteMessageBatch with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get Reciept Handle
	 *Delete Message Batch
	 *Delete Queue

	 */

	SQSdeleteMessageBatch_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue10'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue10',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue10'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var recieptHandle = data.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
					var params = {
						'AWSAccountId' : '704687501311',
						'QueueName' : 'DrillBitTestQueue10',
						'DeleteMessageBatchRequestEntry.1.Id' : 'testdelete',
						'ReceiptHandle' : recieptHandle
					};
					AWS.SQS.deleteMessageBatch(params, function(data) {
						var params = {
							'QueueName' : 'DrillBitTestQueue10'
						};
						callback.passed();
						var params = {
							'QueueName' : 'DrillBitTestQueue10',
							'AWSAccountId' : '704687501311',
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	//*************deleteMessageBatch test cases ends**************
	//***************changeMessageVisibility test cases start**************
	/**
	 *Test case for changeMessageVisibility without passing any parameters
	 */
	SQSchangeMessageVisibilityWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : '',
			'VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibility with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get Reciept Handle
	 *changeMessageVisibility
	 *Delete Queue
	 */
	SQSchangeMessageVisibility_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue11'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue11',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue11'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var recieptHandle = data.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
					var params = {
						'AWSAccountId' : '704687501311',
						'QueueName' : 'DrillBitTestQueue11',
						'VisibilityTimeout' : '9000',
						'ReceiptHandle' : recieptHandle
					};
					AWS.SQS.changeMessageVisibility(params, function(data) {
						var params = {
							'QueueName' : 'DrillBitTestQueue11'
						};
						callback.passed();
						var params = {
							'QueueName' : 'DrillBitTestQueue11',
							'AWSAccountId' : '704687501311',
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for changeMessageVisibility without passing ReceiptHandle parameters
	 */
	SQSchangeMessageVisibilityWithEmptyReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : '',
			'VisibilityTimeout' : '9000'
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibility without passing VisibilityTimeout parameters
	 */
	SQSchangeMessageVisibilityWithEmptyVisibilityTimeout_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibility with passing invalid ReceiptHandle parameters
	 */
	SQSchangeMessageVisibilityWithInvalidReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4eruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC', //Invalid ReceiptHandle
			'VisibilityTimeout' : '9000'
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibility with passing invalid VisibilityTimeout parameters;VisibilityTimeout must not exceed 43200
	 */
	SQSchangeMessageVisibilityWithInvalidVisibilityTimeout_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'VisibilityTimeout' : '43500'//Invalid VisibilityTimeout- must not exceed 43200
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	//*************changeMessageVisibility test cases ends**************

	//***************changeMessageVisibilityBatch test cases start**************
	/**
	 *Test case for changeMessageVisibilityBatch without passing any parameters
	 */
	SQSchangeMessageVisibilityBatchWithEmptyParameters_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : ''
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibilityBatch with passing all parameters
	 *Create Queue to send message
	 *Send Message
	 *receive Message to get Reciept Handle
	 *changeMessageVisibility Batch
	 *Delete Queue
	 */
	SQSchangeMessageVisibilityBatch_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue12'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue12',
				'MessageBody' : 'This is test message in SQS.'
			};
			AWS.SQS.sendMessage(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue12'
				};
				AWS.SQS.receiveMessage(params, function(data) {
					var recieptHandle = data.ReceiveMessageResult[0].Message[0].ReceiptHandle[0];
					var params = {
						'AWSAccountId' : '704687501311',
						'QueueName' : 'DrillBitTestQueue12',
						'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'testbatch1',
						'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : recieptHandle,
						'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
					};
					AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
						var params = {
							'QueueName' : 'DrillBitTestQueue12'
						};
						callback.passed();
						var params = {
							'QueueName' : 'DrillBitTestQueue12',
							'AWSAccountId' : '704687501311',
						};
						AWS.SQS.deleteQueue(params, function(data) {

						}, function(error) {

						})
					}, function(error) {
						callback.failed('Some error occured');
					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});

	},
	/**
	 *Test case for changeMessageVisibilityBatch without passing ChangeMessageVisibilityBatchRequestEntryId parameter
	 */
	SQSchangeMessageVisibilityBatchWithEmptyId_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for changeMessageVisibilityBatch without passing ChangeMessageVisibilityBatchRequestEntryReceiptHandle parameter
	 */
	SQSchangeMessageVisibilityBatchWithEmptyReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'msgbatch1',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : '',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for changeMessageVisibilityBatch with passing invalid ChangeMessageVisibilityBatchRequestEntryReceiptHandle parameter
	 */
	SQSchangeMessageVisibilityBatchWithInvalidReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'msgbatch1',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************changeMessageVisibilityBatch test cases ends**************

	//***************removePermission test cases start**************
	/**
	 *Test case for removePermission without passing any parameters
	 */
	SQSremovePermissionWithEmptyParams_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Label' : ''
		};
		AWS.SQS.removePermission(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for removePermission with passing all parameters
	 *Creating Queue to add permission
	 *Adding Permission to remove permission
	 *Remove Permission
	 *Delete Queue
	 */
	SQSremovePermission_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue13'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'AWSAccountId' : '704687501311',
				'QueueName' : 'DrillBitTestQueue13',
				'Label' : 'AddPermissionTest',
				'AWSAccountId.1' : '682109303140',
				'ActionName.1' : 'SendMessage'
			};
			AWS.SQS.addPermission(params, function(data) {
				var params = {
					'AWSAccountId' : '704687501311',
					'QueueName' : 'DrillBitTestQueue13',
					'Label' : 'AddPermissionTest',
				};
				AWS.SQS.removePermission(params, function(data) {
					var params = {
						'QueueName' : 'DrillBitTestQueue13'
					};
					callback.passed();
					var params = {
						'QueueName' : 'DrillBitTestQueue13',
						'AWSAccountId' : '704687501311',
					};
					AWS.SQS.deleteQueue(params, function(data) {

					}, function(error) {

					})
				}, function(error) {
					callback.failed('Some error occured');
				})
			}, function(error) {
				callback.failed('Some error occured');
			})
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************removePermission test cases ends**************
	//*************deleteQueue test cases ends**************
	/**
	 *Test case for deleteQueue with valid  parameters
	 */
	SQSDeleteValidQueue_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestQueue14'
		};
		AWS.SQS.createQueue(params, function(data) {
			var params = {
				'QueueName' : 'DrillBitTestQueue14',
				'AWSAccountId' : '704687501311',
			};
			AWS.SQS.deleteQueue(params, function(data) {
				callback.passed();
			}, function(error) {

			});

		}, function(error) {
			callback.failed('Some error occured');
		});
	}
	//*************deleteQueue test cases ends**************
});
