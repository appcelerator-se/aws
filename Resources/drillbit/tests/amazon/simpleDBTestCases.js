describe("SimpleDB tests", {
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
	//***************create domain test cases start**************

	/**
	 *Test case for creating domain without passing domain name
	 */

	simpleDBCreateEmptyDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : ''
			};
			Ti.App.AWS.SimpleDB.createDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateEmptyDomain response'
	}),

	/**
	 *Test case for creating domain by passing a valid domain name
	 */
	simpleDBCreateValidDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'DrillBitTestDomain'
			};
			Ti.App.AWS.SimpleDB.createDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	/**
	 *Test case for creating domain by passing a Invalid domain name
	 */
	simpleDBCreateInValidDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '12',            // minimum 3 characters required
				maxSizeDomainName : function(){
					valueOf(DomainNameSize).mustBeLessThan(266)
				}
			};
			Ti.App.AWS.SimpleDB.createDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateInValidDomain response'
	}),
	
	//*************Create domain test cases ends**************

	//List Domain test cases starts

	/**
	 *Test case for listing all domains.
	 */
	simpleDBListDomain : asyncTest({
		start : function(callback) {
			var data = {
				'MaxNumberOfDomains' : '',
				'NextToken' : ''
			};
			Ti.App.AWS.SimpleDB.listDomains(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBListDomain response'
	}),

	/**
	 *Test case for listing all domains with invalid MaxNumberOfDomains.
	 */
	simpleDBListDomainWithInvalidParams : asyncTest({
		start : function(callback) {
			var data = {
				'MaxNumberOfDomains' : '999', // limit is 100
				'NextToken' : ''
			};
			Ti.App.AWS.SimpleDB.listDomains(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBListDomainWithInvalidParams response'
	}),
	/**
	 *Test case for listing all domains with valid MaxNumberOfDomains.
	 */
	simpleDBListDomainWithValidParams : asyncTest({
		start : function(callback) {
			var data = {
				'MaxNumberOfDomains' : '99', // limit is 100
				'NextToken' : ''
			};
			Ti.App.AWS.SimpleDB.listDomains(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBListDomainWithValidParams response'
	}),
	
	//************ Start Test case for delete domain*********************************************
	simpleDBDeleteValidDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'DrillBitTestDomain'
			};
			Ti.App.AWS.SimpleDB.deleteDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBDeleteEmptyDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : ''
			};
			Ti.App.AWS.SimpleDB.deleteDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBDeleteInValidDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz'       //Domain Name that does not exist.
			};
			Ti.App.AWS.SimpleDB.deleteDomain(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	//************ End Test case for delete domain*********************************************
	
	
	//************ Start Test case for BatchDeleteAttributs*********************************************
	simpleDBBatchDeleteAttributesEmptyItemName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.ItemName' : ''       
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchDeleteAttributesInvalidItemName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.ItemName' : 'xyz'     //Item Name that does not exist.   
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
		simpleDBBatchDeleteAttributesEmptyAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Value' : ''       
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchDeleteAttributesInvalidAttributesName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Name' : 'xyz'       //Attribute Name that does not exist.
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchDeleteAttributesInvalidAttributesValue : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Value' : 'xyz'       //Attribute Value that does not exist.
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchDeleteAttributesEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : ''       
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchDeleteAttributesInvalidDomain : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz'       //Domain Name that does not exist.
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),	
	simpleDBValidBatchDeleteAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'testDomainName',
				'Item.Y.ItemName' : 'testItemName',
				'Item.Y.Attribute.X.Value': 'testAttributeName'
				       
			};
			Ti.App.AWS.SimpleDB.batchDeleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),

	//************ End Test case for BatchDeleteAttributes*********************************************
	
	//************ Start Test case for BatchPutAttributes*********************************************
		simpleDBBatchPutAttributesEmptyItemName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.ItemName' : '',       
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesEmptyAttributesValue : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Value' : '',       
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesEmptyAttributesName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Name' : '',       
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '',       
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesInvalidDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz',   //DomainName that does not exist.    
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesInvalidAttributesName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Name' : 'xyz',   //AttributeName that does not exist.    
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesInvalidAttributesValue : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Value' : 'xyz',   //AttributeValue that does not exist.    
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesInvalidItemName : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.ItemName' : 'xyz',   //ItemNamethat does not exist.    
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBBatchPutAttributesInvalidReplaceValue : asyncTest({
		start : function(callback) {
			var data = {
				'Item.Y.Attribute.X.Replace' : 'xyz',   //value should be boolean. 
				//valueOf(Item.Y.Attribute.X.Replace)mustBeBoolean();
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBvalidBatchPutAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'testDomain', 
				'Item.Y.Attribute.X.Name':'testAttributeName',
				'Item.Y.Attribute.X.Value':'testAttributeValue',
				'Item.Y.ItemName':'testItemName'
				      
			};
			Ti.App.AWS.SimpleDB.batchPutAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	//************ End Test case for BatchPutAttributes*********************************************

	//************ Start Test case for DeleteAttributes*********************************************
	
	simpleDBdeleteAttributesEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '',       
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBdeleteAttributesInvalidDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz',       //DomainName that does not exist.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBdeleteAttributesEmptyItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : '',       
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBdeleteAttributesInvalidItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : 'xyz',       //ItemName that does not exist.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBdeleteAttributesInvalidAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Name' : 'xyz',       //AttributeName that does not exist.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Value' : 'xyz',       //AttributeValue that does not exist.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedExistsValue : asyncTest({
		start : function(callback) {
			var data = {
				'Expected.X.Exists' : 'xyz',       //Invalid Value.
				valueOf(Expected.X.Exists)mustbeBoolean();
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBdeleteAttributesInvalidExpectedExistsValue : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedName : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedName : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Value = ''
				'Expected.X.Exists' : '',      /Cant be used if both the values are null.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Value = ''      //Cant be used if  Expected Exists is false.
				'Expected.X.Exists' : 'false',      
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBdeleteAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Name = ''      //Cant be used if  Expected name is null.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
		simpleDBValidDeleteAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : 'testItemName',
				 'DomainName' : 'testDomainName'     
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	//************ End Test case for DeleteAttributes*********************************************
	
	//************ Start Test case for DomainMetaData*********************************************
	
	simpleDBDomainMetadataInvalidDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz',       //DomainName that does not exist.
			};
			Ti.App.AWS.SimpleDB.domainMetaData(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBDomainMetadataEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '',       
			};
			Ti.App.AWS.SimpleDB.domainMetaData(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBvalidDomainMetadata : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'testDomainName',
				'ItemName' : 'testItemName'       
			};
			Ti.App.AWS.SimpleDB.domainMetaData(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	//************ End Test case for DomainMetaData*********************************************
	
	
		//************ Start Test case for GetAttributes*********************************************
		
		
		simpleDBGetAttributesEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '',
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBGetAttributesInvalidDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz',              //DomainName that does not exist.
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBGetAttributesEmptyItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : '',              
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBGetAttributesInvalidItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : 'xyz',    //ItemName That does not exist.          
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBGetAttributesInvalidAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'AttributeName' : 'xyz',    //AttributeName That does not exist.          
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBGetAttributesInvalidConsistentRead : asyncTest({
		start : function(callback) {
			var data = {
				'ConsistentRead' : 'xyz',    //Value must be boolean.          
				//valueOf('ConsistentRead')mustBeBoolean();       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	
	simpleDBValidGetAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : 'testItemName',
				'DomainName':'testDomainName'          
				       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	//************ End Test case for GetAttributes*********************************************
	
	
	//************ Start Test case for PutAttributes*********************************************
	
	simpleDBPutAttributesEmptyDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : '',             
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesInvalidDomainName : asyncTest({
		start : function(callback) {
			var data = {
				'DomainName' : 'xyz',             //DomainName that does not exist.
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesEmptyItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : '',             
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBPutAttributesInvalidItemName : asyncTest({
		start : function(callback) {
			var data = {
				'ItemName' : 'xyz',             //ItemName that does not exist.
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesEmptyAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Name' : '',             
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesInvalidAttributeName : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Name' : 'xyz',             //AttributeName that does not exist.
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesEmptyAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Value' : '',             
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBPutAttributesInvalidAttributeValue : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Value' : 'xyz',            //AttributeValue that does not exist. 
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	
	simpleDBputAttributesInvalidExpectedExistsValue : asyncTest({
		start : function(callback) {
			var data = {
				'Expected.X.Exists' : 'xyz',       //Invalid Value.
				valueOf(Expected.X.Exists)mustbeBoolean();
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBputAttributesInvalidExpectedExistsValue : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBputAttributesInvalidExpectedName : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBputAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Attribute.X.Value = 'Any MultiValued Attribute'
				'Expected.X.Exists' : 'True',      //Cannot used with any multivalued Attribute.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBputAttributesInvalidExpectedName : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Value = ''
				'Expected.X.Exists' : '',      /Cant be used if both the values are null.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBputAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Value = ''      //Cant be used if  Expected Exists is false.
				'Expected.X.Exists' : 'false',      
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBputAttributesInvalidExpectedValue : asyncTest({
		start : function(callback) {
			var data = {
				Expected.X.Name = ''      //Cant be used if  Expected name is null.
			};
			Ti.App.AWS.SimpleDB.deleteAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBValidPutAttributes : asyncTest({
		start : function(callback) {
			var data = {
				'Attribute.X.Name' : 'testAttributeName',
				 'Attribute.X.Value' :'testAttributeValue',
				 'ItemName' :'testItemName',
				 'DomainName':'testDomainName'          
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	//************ End Test case for PutAttributes*********************************************
	
	//************ Start Test case for Select*********************************************
	simpleDBSelectEmptySelectExpression : asyncTest({
		start : function(callback) {
			var data = {
				'SelectExpression':''       
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBSelectInvalidSelectExpression : asyncTest({
		start : function(callback) {
			var data = {
				'SelectExpression':'any Invalid Expression'       
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	simpleDBSelectInvalidSelectExpression : asyncTest({
		start : function(callback) {
			var data = {
				'SelectExpression':'any Invalid Expression'       
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBSelectInvalidNextToken : asyncTest({
		start : function(callback) {
			var data = {
				'NextToken':'any invalid token Value'  // Invalid value that does not exist.     
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBSelectInvalidConsistentRead : asyncTest({
		start : function(callback) {
			var data = {
				'ConsistentRead' : 'xyz',    //Value must be boolean.          
				//valueOf('ConsistentRead')mustBeBoolean();       
			};
			Ti.App.AWS.SimpleDB.getAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeFalse();
				valueOf(e.error).shouldBeTrue();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	
	simpleDBValidSelect : asyncTest({
		start : function(callback) {
			var data = {
				'SelectExpression':'any Valid Expression'       
				       
			};
			Ti.App.AWS.SimpleDB.putAttributes(data, this.async(function(e) {
				valueOf(e.success).shouldBeTrue();
				valueOf(e.error).shouldBeFalse();
			}));
		},
		timeout : 5000,
		timeoutError : 'Timed out waiting for simpleDBCreateValidDomain response'
	}),
	//************ End Test case for Select*********************************************
});
