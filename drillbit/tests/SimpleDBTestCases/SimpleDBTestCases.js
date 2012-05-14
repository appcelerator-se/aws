describe("AWS SimpleDB Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
	},
	after_all : function() {
		AWS = null;
	},
	timeout : 5000,

	//Start Test Cases for Create Domain

	//Test case with valid domain
	createDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillCases1234'
		}, function(data) {
			callback.passed();
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'DrillCases1234'
			}, function(data) {

			}, function(error) {

			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	//Test case with invalid domain
	createInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : '@DrillBitDomain'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();

		});
	},

	//Test cases with invalid length for domain name parameter
	createInvalidMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	//test case with invalid maximum length for domain name paramater
	createInvalidMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();

		});
	},

	//test case for empty domain name while creating domain
	createEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	//End Test Cases for Create Domain.

	//Test case for valid request for list domain
	listDomains_as_async : function(callback) {
		AWS.SimpleDB.listDomains({}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},
	listDomainsWithInvalidParams_as_async : function(callback) {
		AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '999',
			'NextToken' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	listDomainsWithvalidParams_as_async : function(callback) {
		AWS.SimpleDB.listDomains({
			'MaxNumberOfDomains' : '99',
			'NextToken' : ''
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	// End Test Cases for List Domains.
	// Start Test Cases for Delete Domain.
	deleteDomain_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit12345'
		}, function(data) {
			AWS.SimpleDB.deleteDomain({
				'DomainName' : 'DrillBit12345'
			}, function(data) {
				callback.passed();
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	deleteDomainWithInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : '@DrillBitDomain'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteDomainWithInvalidMaximumDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteDomainWithInvalidMinmumDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteDomain({
			'DomainName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases For Delete Domain.

	// Start TestCases for BatchPutAttributes

	batchPutAttributes_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			'DomainName' : 'DrillBit123456'
		}, function(data) {
			AWS.SimpleDB.batchPutAttributes({
				'DomainName' : 'DrillBit123456',
				'Item.1.Attribute.1.Name' : 'testAttributeName',
				'Item.1.Attribute.1.Value' : 'testAttributeValue',
				'Item.1.ItemName' : 'testItemName'
			}, function(data) {
				callback.passed();
				AWS.SimpleDB.batchDeleteAttributes({
					'DomainName' : 'DrillBit123456',
					'Item.1.ItemName' : 'testItemName',
					'Item.1.Attribute.1.Value' : 'testAttributeName'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit123456'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},
	batchPutAttributesWithInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '@testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	batchPutAttributesWithInvalidMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xy',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesWithInvalidMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesEmptyItemName_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesEmptyAttributeName_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : '',
			'Item.1.Attribute.1.Name' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesEmptyAttributeValue_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : '',
			'Item.1.ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchPutAttributesWithInvalidReplaceValue_as_async : function(callback) {
		AWS.SimpleDB.batchPutAttributes({
			'DomainName' : 'testDomain',
			'Item.1.Attribute.1.Name' : 'testAttributeName',
			'Item.1.Attribute.1.Value' : 'testAttributeValue',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Replace' : 'xyz'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for batchPutAttributes.

	// Start Test Cases for BatchDeleteAttributes.

	batchDeleteAttributes_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			'DomainName' : 'Test98345'
		}, function(data) {
			AWS.SimpleDB.batchPutAttributes({
				'DomainName' : 'Test98345',
				'Item.1.Attribute.1.Name' : 'testAttributeName',
				'Item.1.Attribute.1.Value' : 'testAttributeValue',
				'Item.1.ItemName' : 'testItemName'
			}, function(data) {
				AWS.SimpleDB.batchDeleteAttributes({
					'DomainName' : 'Test98345',
					'Item.1.ItemName' : 'testItemName',
					'Item.1.Attribute.1.Name' : 'testAttributeName',
					'Item.1.Attribute.1.Value' : 'testAttributeValue'
				}, function(data) {
					callback.passed();
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'Test98345'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {
					callback.failed(JSON.stringify(error));
				});
			}, function(error) {
				callback.failed(JSON.stringify(error));
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},
	batchDeleteAttributesWithInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '@xyz',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	batchDeleteAttributesWithMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xy',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchDeleteAttributesWithMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchDeleteAttributesWithEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : '',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchDeleteAttributesWithEmptyItemName_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'DrillbitDomain',
			'Item.1.ItemName' : '',
			'Item.1.Attribute.1.Value' : 'testAttributeName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	batchDeleteAttributesWithEmptyAttributeValue_as_async : function(callback) {
		AWS.SimpleDB.batchDeleteAttributes({
			'DomainName' : 'DrillbitDomain',
			'Item.1.ItemName' : 'testItemName',
			'Item.1.Attribute.1.Value' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for BatchDeleteAttributes.

	// Start TestCases for delete Attributes.
	deleteAttributes_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit12345611'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit12345611'
			}, function(data) {
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'DrillBit12345611'
				}, function(data) {
					callback.passed();
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit12345611'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {
					callback.failed('Some error occured');
				});
			}, function(error) {
				callback.failed('Some error occured');
			});

		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	deleteAttributesWithInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesWithInvalidMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesWithInvalidMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesWithEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesWithEmptyItemName_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : '',
			'DomainName' : 'testDomain'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesWithInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomain',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.deleteAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'testDomainName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for deleteAttributes.
	// Start Test Cases for domainMetadata
	domainMetadata_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit98123456'
		}, function(data) {
			AWS.SimpleDB.domainMetadata({
				'DomainName' : 'DrillBit98123456'
			}, function(data) {
				callback.passed();
				AWS.SimpleDB.deleteDomain({
					'DomainName' : 'DrillBit98123456'
				}, function(data) {

				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	domainMetadataInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'testDomain'// domain does ot exists
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	domainMetadataWithEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	domainMetadataWithInvalidDomain_as_async : function(callback) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : '@testDomainName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	domainMetadataWithInvalidMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	domainMetadataWithInvalidMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.domainMetadata({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for Domain Metadata

	// Start Test Cases for Get Attributes.

	getAttributes_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit1981236'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit1981236'
			}, function(data) {
				AWS.SimpleDB.getAttributes({
					'DomainName' : 'DrillBit1981236',
					'ItemName' : 'testItemName'
				}, function(data) {
					AWS.SimpleDB.deleteAttributes({
						'ItemName' : 'testItemName',
						'DomainName' : 'DrillBit1981236'
					}, function(data) {
						callback.passed();
						AWS.SimpleDB.deleteDomain({
							'DomainName' : 'DrillBit1981236'
						}, function(data) {

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
			callback.failed(JSON.stringify(error));
		});

	},

	getAttributesWithInvalidConsistemtRead_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'testDomainName',
			'ItemName' : 'testItemName',
			'ConsistentRead' : 'xyz'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getAttributesWithInvalidDomianName_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '@testDomainName',
			'ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getAttributesWithInvalidMinimumLengthDomianName_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xy',
			'ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getAttributesWithInvalidMaximumLengthDomianName_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget',
			'ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getAttributesWithEmptyDomianName_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : '',
			'ItemName' : 'testItemName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getAttributesWithEmptyItemName_as_async : function(callback) {
		AWS.SimpleDB.getAttributes({
			'DomainName' : 'Domain1',
			'ItemName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for Get Attributes.
	// Start Test Cases for Put Attributes.
	putAttributes_as_async : function(callback) {
		AWS.SimpleDB.createDomain({
			DomainName : 'DrillBit777120'
		}, function(data) {
			AWS.SimpleDB.putAttributes({
				'Attribute.1.Name' : 'testAttributeName',
				'Attribute.1.Value' : 'testAttributeValue',
				'ItemName' : 'testItemName',
				'DomainName' : 'DrillBit777120'
			}, function(data) {
				callback.passed();
				AWS.SimpleDB.deleteAttributes({
					'ItemName' : 'testItemName',
					'DomainName' : 'DrillBit777120'
				}, function(data) {
					AWS.SimpleDB.deleteDomain({
						'DomainName' : 'DrillBit777120'
					}, function(data) {

					}, function(error) {

					});
				}, function(error) {

				});
			}, function(error) {
				callback.failed('Some error occured');
			});

		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	putAttributesWithInvalidDomainName_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : '@testDomainName'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithInvalidMinimumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'te'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithInvalidMaximumLengthDomain_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'xyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdgetxyasesdedfghjklqwertyuioplkjhfgdsazxcvbnmlkjuyhyhgtfrdedswasedertyuioplkmnhthththgrdtefrtfhukhtihdget'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithEmptyDomain_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithEmptyAttributeName_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'testAttributeValue',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithEmptyAttributeValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed(JSON.stringify(error));
		});

	},

	putAttributesWithEmptyItemName_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : '',
			'Attribute.1.Value' : 'test',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesWithInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'Attribute.1.Name' : 'testAttributeName',
			'Attribute.1.Value' : '',
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : '',
			'Expected.1.Value' : 'testValue'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Expected.1.Exists' : 'falses'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Exists' : 'xy'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Value' : 'testValue',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Name' : 'testName',
			'Expected.1.Exists' : 'falses',
			'Attribute.1.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putAttributesInvalidExpectedValue_as_async : function(callback) {
		AWS.SimpleDB.putAttributes({
			'ItemName' : 'testItemName',
			'DomainName' : 'Domain1',
			'Expected.1.Value' : 'testValue',
			'Expected.X.Exists' : 'falses',
			'Attribute.X.Value' : 'value1,value2'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for  put Attributes.
	
	// Start Test Cases for Select.

		select_as_async : function(callback) {
		   AWS.SimpleDB.createDomain({
		  DomainName : 'DrillBit7787120'
		 }, function(data) {
		  AWS.SimpleDB.putAttributes({
		   'Attribute.1.Name' : 'testAttributeName',
		   'Attribute.1.Value' : 'testAttributeValue',
		   'ItemName' : 'testItemName',
		   'DomainName' : 'DrillBit7787120'
		  }, function(data) {
		   AWS.SimpleDB.select({
		  'SelectExpression' : 'select * from DrillBit7787120',
		 }, function(data) {
		  callback.passed();
		  AWS.SimpleDB.deleteAttributes({
		    'ItemName' : 'testItemName',
		    'DomainName' : 'DrillBit7787120'
		   }, function(data) {
		    AWS.SimpleDB.deleteDomain({
		     'DomainName' : 'DrillBit7787120'
		    }, function(data) {

		    }, function(error) {

		    });
		   }, function(error) {

		   });
		 }, function(error) {
		  callback.failed(JSON.stringify(error));
		 });
		   
		   
		  }, function(error) {
		  callback.failed(JSON.stringify(error));
		  });

		 }, function(error) {
		  callback.failed(JSON.stringify(error));
		 });
		 
		},

	selectWithInvalidExpression_as_async : function(callback) {
		AWS.SimpleDB.select({
			'SelectExpression' : 34567,
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
selectWithEmptyExpression_as_async : function(callback) {
		AWS.SimpleDB.select({
			'SelectExpression' : '',
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	selectWithInvalidConsistentReadValue_as_async : function(callback) {
		AWS.SimpleDB.select({
			'SelectExpression' : 'valid Expression',
			'ConsistentRead' : 'gfh'                       //Value must be boolean
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	}
	
	// End Test Cases for  Select.
});
