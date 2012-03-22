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
				'DomainName' : '12'// minimum 3 characters required
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
	})

	//List Domain test cases ends

});
