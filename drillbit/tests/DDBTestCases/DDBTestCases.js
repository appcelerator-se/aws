describe("DDB tests", {

	before_all : function() {

		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
		tableName = Titanium.App.Properties.getString('ddbTableName');
		AWS.STS.getSessionToken({}, function(response) {

			Ti.App.Properties.setString('tempSessionToken', response["GetSessionTokenResult"][0]["Credentials"][0]["SessionToken"][0]);
			Ti.App.Properties.setString('tempSecretAccessKey', response["GetSessionTokenResult"][0]["Credentials"][0]["SecretAccessKey"][0]);
			Ti.App.Properties.setString('tempAccessKeyID', response["GetSessionTokenResult"][0]["Credentials"][0]["AccessKeyId"][0]);
			Ti.App.Properties.setString('tempExpiration', response["GetSessionTokenResult"][0]["Credentials"][0]["Expiration"][0]);

		}, function(error) {

		});

	},
	after_all : function() {
		AWS = null;
	},
	timeout : 5000,

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
			'requestJSON' : {
				'test' : 'test'
			} //Empty
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
			'requestJSON' : {
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = '{"requestJSON":{"RequestItems":{"' + tableName + '": {"Keys":   [{"HashKeyElement":{"S":"name"},"RangeKeyElement":{"N":"1234"}}]} }}}';
			AWS.DDB.batchGetItem(JSON.parse(params), function(data) {

				callback.passed();
				var params = {
					'requestJSON' : {
						"TableName" : tableName,
						"Key" : {
							"HashKeyElement" : {
								"S" : "name"
							},
							"RangeKeyElement" : {
								"N" : "1234"
							}
						}
					} //Required
				};
				AWS.DDB.deleteItem(params, function(data) {

				}, function(error) {

				});
			}, function(error) {
				callback.failed(error);
			});

		}, function(error) {
			callback.failed(error);
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

		var params = '{"requestJSON" : {"RequestItems":{"' + tableName + '":{"Keys": [{"HashKeyElement": {"S":"name"}, "RangeKeyElement":{"N":"1234"}}]}},"ReplyDateTime":{"S":"2012-05-10T11:04:47.034Z"}, "Id":{"S":"testing"},"RequestItems":{"my-ddb-test-tab":[{"PutRequest":{"Item":{"name":{"S":"dynamodbtestwrite"}, "1234":{"N":"1234567"}}}}]}}}';

		AWS.DDB.batchWriteItem(JSON.parse(params), function(data) {
			callback.passed();

		}, function(error) {
			callback.failed(error);
		});

	},

	//*************batchWriteItem test cases ends**************

	//***************createTable test cases start**************

	/**
	 *Test case for createTable With a valid requestJSON.
	 */
	/*createTable_as_async : function(callback) {

	var param = {
	"requestJSON" : {
	"TableName" : "my-ddb-goyal1-tab",
	"KeySchema" : {
	"HashKeyElement" : {
	"AttributeName" : "name",
	"AttributeType" : "S",
	"AttributeValue" : "pankaj"
	},
	"RangeKeyElement" : {
	"AttributeName" : "1234",
	"AttributeType" : "N",
	"AttributeValue" : "12345"
	}
	},
	"ProvisionedThroughput" : {
	"ReadCapacityUnits" : 10,
	"WriteCapacityUnits" : 10
	}
	}
	}

	AWS.DDB.createTable(param, function(data) {
	callback.passed();
	var param = {
	'requestJSON' : {
	"TableName" : "my-ddb-goyal1-tab",
	}
	};
	AWS.DDB.deleteTable(param, function(data) {

	}, function(error) {

	});

	}, function(error) {
	callback.failed('Some error occured' + JSON.stringify(error));
	});
	},
	*/

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
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "name"
						},
						"RangeKeyElement" : {
							"N" : "1234"
						}
					}
				} //Required
			};
			AWS.DDB.deleteItem(params, function(data) {
				callback.passed();

			}, function(error) {

			});
		}, function(error) {
			callback.failed(error);
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
				'TableName' : tableName
			}//Required
		};
		AWS.DDB.describeTable(params, function(data) {
			callback.passed();
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}
			};

		}, function(error) {
			callback.failed(error);
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
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "name"
						},
						"RangeKeyElement" : {
							"N" : "1234"
						}
					},
					"ConsistentRead" : true
				}   //Required
			};
			AWS.DDB.getItem(params, function(data) {

				callback.passed();
				var params = {
					'requestJSON' : {
						"TableName" : tableName,
						"Key" : {
							"HashKeyElement" : {
								"S" : "name"
							},
							"RangeKeyElement" : {
								"N" : "1234"
							}
						}
					} //Required
				};
				AWS.DDB.deleteItem(params, function(data) {

				}, function(error) {

				});
			}, function(error) {
				callback.failed(error);
			});

		}, function(error) {
			callback.failed(error);
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
			callback.passed();
		}, function(error) {
			callback.failed(error);
		});
	},
	/**
	 *Test case for listTables With a valid requestJSON.
	 */
	listTables_as_async : function(callback) {
		var params = {
			'requestJSON' : {}
		};
		AWS.DDB.listTables(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(error);
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
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			callback.passed();
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
					"Key" : {
						"HashKeyElement" : {
							"S" : "name"
						},
						"RangeKeyElement" : {
							"N" : "1234"
						}
					}
				} //Required
			};
			AWS.DDB.deleteItem(params, function(data) {

			}, function(error) {

			});
		}, function(error) {
			callback.failed(error);
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
				"TableName" : tableName,
				"HashKeyValue" : {
					"S" : "name"
				}
			} //Required
		};
		AWS.DDB.query(params, function(data) {
			callback.passed();
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}//Required
			};

		}, function(error) {
			callback.failed(error);
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
				"TableName" : tableName,
				"ScanFilter" : {
					"year" : {
						"AttributeValueList" : [{
							"N" : "12345"
						}],
						"ComparisonOperator" : "GT"
					}
				}
			}  //Required
		};
		AWS.DDB.scan(params, function(data) {
			callback.passed();
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
				}//Required
			};

		}, function(error) {
			callback.failed(error);
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
				"TableName" : tableName,
				"Item" : {
					"name" : {
						"S" : "Bill & Ted's Excellent Adventure"
					},
					"1234" : {
						"N" : "12345"
					}
				}
			} //Required
		};
		AWS.DDB.putItem(params, function(data) {
			var params = {
				'requestJSON' : {
					"TableName" : tableName,
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
								"S" : "newvalue"
							},
							"Action" : "PUT"
						}
					},
					"ReturnValues" : "ALL_NEW"
				}
				//Required
			};
			AWS.DDB.updateItem(params, function(data) {
				callback.passed();
				var params = {
					'requestJSON' : {
						"TableName" : tableName,
						"Key" : {
							"HashKeyElement" : {
								"S" : "name"
							},
							"RangeKeyElement" : {
								"N" : "1234"
							}
						}
					} //Required
				};
				AWS.DDB.deleteItem(params, function(data) {

				}, function(error) {

				});
			}, function(error) {
				callback.failed(error);
			});
		}, function(error) {
			callback.failed(error);
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

		var params = '{"requestJSON" : {"TableName" : "' + tableName + '","ProvisionedThroughput" : {"ReadCapacityUnits" : 10,"WriteCapacityUnits" : 25}}}';
		AWS.DDB.updateTable(JSON.parse(params), function(data) {
			callback.passed();

		}, function(error) {
			callback.failed(error);
		});

	},

	//*************updateTable test cases ends**************
	//***************deleteTable test cases start**************

	/**
	 *Test case for deleteTable With a valid requestJSON.
	 */
	/*deleteTable_as_async : function(callback) {
	var param = {
	"requestJSON" : {
	"TableName" : "my-ddb-goyal-tab",
	"KeySchema" : {
	"HashKeyElement" : {
	"AttributeName" : "name",
	"AttributeType" : "S",
	"AttributeValue" : "pankaj"
	},
	"RangeKeyElement" : {
	"AttributeName" : "1234",
	"AttributeType" : "N",
	"AttributeValue" : "12345"
	}
	},
	"ProvisionedThroughput" : {
	"ReadCapacityUnits" : 10,
	"WriteCapacityUnits" : 10
	}
	}
	}

	AWS.DDB.createTable(param, function(data) {
	var param = {
	'requestJSON' : {
	"TableName" : "my-ddb-test-tab",
	}
	};
	AWS.DDB.deleteTable(param, function(data) {
	callback.passed();
	}, function(error) {
	callback.failed('Some error occured' + JSON.stringify(error));
	});

	}, function(error) {
	callback.failed('Some error occured' + JSON.stringify(error));
	});
	},*/

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
	}
	//*************deleteTable test cases ends**************

});
