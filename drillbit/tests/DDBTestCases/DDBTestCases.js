describe("DDB tests", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
	},
    after_all : function()
	{
		AWS= null;
	},
	timeout : 5000,
		/**
	 *Test case for createTable With a valid requestJSON.
	 */
	createTable_as_async : function(callback) {
		
			var  requestJSON = {
    "TableName" : "my-panki-goyal123450001-tab",
    "KeySchema" : {
     "HashKeyElement" : {
      "AttributeName" : "name",
      "AttributeType" : "S",
      "AttributeValue" : "pankaj"
     },
     "RangeKeyElement" : {
      "AttributeName" : "1234",
      "AttributeType" : "N",
      "AttributeValue" : "pankaj2"
     }
    },
    "ProvisionedThroughput" : {
     "ReadCapacityUnits" : 10,
     "WriteCapacityUnits" : 10
    }
   };
		
		AWS.DDB.CreateTable(requestJSON, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},

	//***************batchGetItem test cases start**************
	/**
	 *Test case for batchGetItem WithEmpty  requestJSON.
	 */
	batchGetItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {} //Empty
		};
		AWS.DDB.batchGetItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for batchGetItem With an Invalid requestJSON.
	 */
	batchGetItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {'test': 'test'} //Empty
		};
		AWS.DDB.batchGetItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for batchGetItem With a valid requestJSON.
	 */
	batchGetItem_as_async : function(callback) {
		var params = {
			requestJSON : {
				"RequestItems" : {
					"my-panki-goyal12345-tab" : {
						"Keys" : [{
							"HashKeyElement" : {
								"S" : "name"
							},
							"RangeKeyElement" : {
								"N" : "1234"
							}
						}]
					}
				}
			}
		}//Required

		AWS.DDB.batchGetItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************batchGetItem test cases ends**************

	//***************batchWriteItem test cases start**************

	/**
	 *Test case for BatchWriteItem WithEmpty  requestJSON.
	 */
	batchWriteItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.batchWriteItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for batchWriteItem With an Invalid requestJSON.
	 */
	batchWriteItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.batchWriteItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for batchWriteItem With a valid requestJSON.
	 */
	batchWriteItem_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"RequestItems" : {
					"my-panki-goyal12345-tab" : [{
						"PutRequest" : {
							"Item" : {
								"name" : {
									"S" : "dynamodbtestwrite"
								},

								"1234" : {
									"N" : "1234567"
								}
							}
						}
					}]
				}
			}//Required
		};
		AWS.DDB.batchWriteItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},

	//*************batchWriteItem test cases ends**************

	//***************createTable test cases start**************

	/**
	 *Test case for createTable WithEmpty  requestJSON.
	 */
	createTableWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.createTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for createTable With an Invalid requestJSON.
	 */
	createTableWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.createTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	//*************createTable test cases ends**************

	//***************deleteItem test cases start**************
	/**
	 *Test case for deleteItem WithEmpty  requestJSON.
	 */
	deleteItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.deleteItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteItem With an Invalid requestJSON.
	 */
	deleteItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.deleteItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteItem With a valid requestJSON.
	 */
	deleteItem_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pank-goyal-tab",
				"Key" : {
					"HashKeyElement" : {
						"S" : "name"
					}
				}
			} //Required
		};
		AWS.DDB.deleteItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************deleteItem test cases ends**************



	//***************describeTable test cases start**************
	/**
	 *Test case for describeTable WithEmpty  requestJSON.
	 */
	describeTableWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.describeTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for describeTable With an Invalid requestJSON.
	 */
	describeTableWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.describeTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for describeTable With a valid requestJSON.
	 */
	describeTable_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				'TableName' : 'my-pank-goyal-tab'
			}//Required
		};
		AWS.DDB.describeTable(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************DescribeTable test cases ends**************

	//***************GetItem test cases start**************
	/**
	 *Test case for getItem WithEmpty  requestJSON.
	 */
	getItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.getItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getItem With an Invalid requestJSON.
	 */
	getItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.getItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for getItem With a valid requestJSON.
	 */
	getItem_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pank-goyal-tab",
				"Key" : {
					"HashKeyElement" : {
						"S" : "name"
					}
				},
				"ConsistentRead" : true
			}   //Required
		};
		AWS.DDB.getItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************getItem test cases ends**************

	//***************listTables test cases start**************

	/*
	 *Test case for listTables With an Invalid requestJSON.
	 */
	listTablesWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.listTables(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for listTables With a valid requestJSON.
	 */
	listTables_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Required
		};
		AWS.DDB.listTables(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************listTables test cases ends**************

	//***************putItem test cases start**************
	/**
	 *Test case for putItem WithEmpty  requestJSON.
	 */
	putItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.putItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for putItem With an Invalid requestJSON.
	 */
	putItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.putItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for putItem With a valid requestJSON.
	 */
	putItem_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pank-goyal1-tab",
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************putItem test cases ends**************

	//***************query test cases start**************
	/**
	 *Test case for query WithEmpty  requestJSON.
	 */
	queryWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.query(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for query With an Invalid requestJSON.
	 */
	queryWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.query(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for query With a valid requestJSON.
	 */
	query_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pank-goyal12-tab",
				"HashKeyValue" : {
					"S" : "name"
				}
			} //Required
		};
		AWS.DDB.query(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************query test cases ends**************

	//***************scan test cases start**************
	/**
	 *Test case for scan WithEmpty  requestJSON.
	 */
	scanWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.scan(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for scan With an Invalid requestJSON.
	 */
	scanWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.scan(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for scan With a valid requestJSON.
	 */
	scan_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pang-goyal12341-tab",
				"ScanFilter" : {
					"year" : {
						"AttributeValueList" : [{
							"N" : "1985"
						}],
						"ComparisonOperator" : "GT"
					}
				}
			}  //Required
		};
		AWS.DDB.scan(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************scan test cases ends**************

	//***************updateItem test cases start**************
	/**
	 *Test case for updateItem WithEmpty  requestJSON.
	 */
	updateItemWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.updateItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for updateItem With an Invalid requestJSON.
	 */
	updateItemWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.updateItem(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for updateItem With a valid requestJSON.
	 */
	updateItem_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-panki-goyal12345-tab",
				"Key" : {
					"HashKeyElement" : {
						"S" : "name"
					},
					"RangeKeyElement" : {
						"N" : "1234"
					}
				},
				"AttributeUpdates" : {
					"status" : {
						"Value" : {
							"S" : "name1234"
						},
						"Action" : "PUT"
					}
				},
				"Expected" : {
					"status" : {
						"Value" : {
							"S" : "name12345"
						}
					}
				},
				"ReturnValues" : "ALL_NEW"
			}
			//Required
		};
		AWS.DDB.updateItem(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	//*************updateItem test cases ends**************

	//***************updateTable test cases start**************
	/**
	 *Test case for UpdateTable WithEmpty  requestJSON.
	 */
	updateTableWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.updateTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for updateTable With an Invalid requestJSON.
	 */
	updateTableWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.updateTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for updateTable With a valid requestJSON.
	 */
	updateTable_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"TableName" : "my-pank-goyal1234-tab",
				"ProvisionedThroughput" : {
					"ReadCapacityUnits" : 5,
					"WriteCapacityUnits" : 15
				}
			} //Required
		};
		AWS.DDB.updateTable(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	},
	
	//*************updateTable test cases ends**************
		//***************deleteTable test cases start**************
	/**
	 *Test case for deleteTable WithEmpty  requestJSON.
	 */
	deleteTableWithEmptyrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {}//Empty
		};
		AWS.DDB.deleteTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteTable With an Invalid requestJSON.
	 */
	deleteTableWithInvalidrequestJSON_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				"asdf" : "hdd"

			}//Invalid requestJSON
		};
		AWS.DDB.deleteTable(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for deleteTable With a valid requestJSON.
	 */
	deleteTable_as_async : function(callback) {
		var params = {
			'requestJSON' : {
				'TableName' : 'my-panki-goyal123459876-tab'
			}//Required
		};
		AWS.DDB.deleteTable(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured')
		});
	}
	//*************deleteTable test cases ends**************

}); 