describe("AWS SimpleDB Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
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
	 */
	SQSCreateValidQueue_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestqueue66'
		};
		AWS.SQS.createQueue(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for creating queue with duplicate queue name
	 */

	SQSCreateEmptyQueue_as_async : function(callback) {
		var params = {
			'QueueName' : 'DrillBitTestqueue66'
		};
		AWS.SQS.createQueue(params, function(data) {
			callback.passed();
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
	 */
	SQSgetQueueUrl_as_async : function(callback) {
		var params = {
			'QueueName' : 'test',
			'QueueOwnerAWSAccountId' : ''
		};
		AWS.SQS.getQueueUrl(params, function(data) {
			callback.passed();
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
	 */
	SQSaddPermission_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue55555',
			'Label' : 'addPermissiontest',
			'AWSAccountId.1' : '682109303140',
			'ActionName.1' : 'SendMessage'
		};
		AWS.SQS.addPermission(params, function(data) {
			callback.passed();
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
	 *Test case for setQueueAttributes with passing all required valid parameters
	 */
	SQSsetQueueAttributes_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Attribute.Name' : 'VisibilityTimeout',
			'Attribute.Value' : '3000'
		};
		AWS.SQS.setQueueAttributes(params, function(data) {
			callback.passed();
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
			'AttributeName.1' : ''//Empty AttributeName.1
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getQueueAttributes with passing all parameter
	 */
	SQSgetQueueAttributes_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'AttributeName.1' : 'All'
		};
		AWS.SQS.getQueueAttributes(params, function(data) {
			callback.passed();
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
	 *Test case for sendMessage with passing MessageBody
	 */
	SQSsendMessage_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'MessageBody' : 'This is test message in SQS.',
			'DelaySeconds' : ''//Not a required parameter
		};
		AWS.SQS.sendMessage(params, function(data) {
			callback.passed();
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
	 */
	SQSsendMessageBatch_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'SendMessageBatchRequestEntry.1.Id' : 'test_msg_1',
			'SendMessageBatchRequestEntry.1.MessageBody' : 'Test',
			'SendMessageBatchRequestEntry.1.DelaySeconds' : '3000'//Not a required parameter
		};
		AWS.SQS.sendMessageBatch(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************sendMessageBatch test cases ends**************

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
	 */
	SQSdeleteMessage_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'
		};
		AWS.SQS.deleteMessage(params, function(data) {
			callback.passed();
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
	 */
	SQSdeleteMessageBatchWithEmptyReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : ''
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteMessageBatch with passing invalid DeleteMessageBatchRequestEntryReceiptHandle parameters
	 */
	SQSdeleteMessageBatchWithInvalidReceiptHandle_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9'//Invalid ReceiptHandle
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteMessageBatch with passing all parameters
	 */
	SQSdeleteMessageBatch_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'DeleteMessageBatchRequestEntry.1.Id' : 'msg1',
			'DeleteMessageBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC'
		};
		AWS.SQS.deleteMessageBatch(params, function(data) {
			callback.passed();
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
	 */
	SQSchangeMessageVisibility_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'VisibilityTimeout' : '9000'
		};
		AWS.SQS.changeMessageVisibility(params, function(data) {
			callback.passed();
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
	 */
	SQSchangeMessageVisibilityBatch_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'ChangeMessageVisibilityBatchRequestEntry.1.Id' : 'msgbatch1',
			'ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle' : 'ib8MCWgVft3+gAud/LDOFZB12lAys+eiIM4/ZoslzmGxeDx54R/I1OOwr9jwV7hPFUYtcKnEcboDeSpaP5yeypQxdppdDbn0QFatuSVvVSyw4kvBtpNH8pUxCaPSsX/5Xrtu/T2VHSkIC0DOHR0XupPRY0OlcjmOe0PpYFnOvNlStPL6pN0aNy8I5iwCHyZlI8ls0aAC/P2Bm24BtCAuqhSKeruTyC7D9bhv4OmSyhLdYLjqKa3ml2zS2rCBg3PJ+sL30JEMfdKDBCO9JEpJBoMHtOkupLgC',
			'ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout' : '7000'
		};
		AWS.SQS.changeMessageVisibilityBatch(params, function(data) {
			callback.passed();
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
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
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
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
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
	 */
	SQSremovePermission_as_async : function(callback) {
		var params = {
			'AWSAccountId' : '704687501311',
			'QueueName' : 'TestQueue676767',
			'Label' : 'addPermissiontest'
		};
		AWS.SQS.removePermission(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	}
	//*************removePermission test cases ends**************

}); 