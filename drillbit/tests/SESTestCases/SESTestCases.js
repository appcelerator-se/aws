describe("AWS SES Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
	},
	timeout : 5000,

	/**
	 *Test case for deleteVerifiedEmailAddress without passing EmailAddress
	 */
	sesDeleteVerifiedEmailAddressWithoutEmailAddress : function(callback) {
		var params = {
			'emailAddress' : ''//empty EmailAddress
		};
		AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for deleteVerifiedEmailAddress by passing a valid EmailAddress
	 */
	sesDeleteVerifiedEmailAddress : function(callback) {
		var params = {
			'emailAddress' : 'abc@gmail.com'//Required
		};
		AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	/**
	 *Test case for deleteVerifiedEmailAddress by passing a Invalid EmailAddress
	 */
	sesDeleteVerifiedEmailAddressWithInvalidEmailAddress : function(callback) {
		var params = {
			'emailAddress' : 'caxvcx'//invalid EmailAddress
		};
		AWS.SES.deleteVerifiedEmailAddress(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	//***************getSendQuota test cases start**************

	/*
	 *Test case for getSendQuota
	 */
	sesGetSendQuota : function(callback) {
		var params = {

		};
		AWS.SES.getSendQuota(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//*************getSendQuota test cases ends**************
	//***************getSendStatistics test cases start**************

	/*
	 *Test case for getSendStatistics
	 */
	sesGetSendQuota : function(callback) {
		var params = {

		};
		AWS.SES.getSendQuota(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	//*************getSendStatistics test cases ends**************

	//*************** listVerifiedEmailAddresses test cases start**************

	/*
	 *Test case for listVerifiedEmailAddresses
	 */
	sesListVerifiedEmailAddresses : function(callback) {
		var params = {

		};
		AWS.SES.listVerifiedEmailAddresses(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	//************* listVerifiedEmailAddresses test cases ends**************

	//***************verifyEmailAddress test cases start**************

	/**
	 *Test case for verifyEmailAddress without passing EmailAddress
	 */

	sesVerifyEmailAddressWithoutEmailAddress : function(callback) {
		var params = {
			'emailAddress' : ''//empty EmailAddress
		};
		AWS.SES.verifyEmailAddress(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/**
	 *Test case for verifyEmailAddress by passing a valid EmailAddress
	 */
	sesVerifyEmailAddress : function(callback) {
		var params = {
			'emailAddress' : 'test@test.com'//Required
		};
		AWS.SES.verifyEmailAddress(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},
	/**
	 *Test case for verifyEmailAddress by passing a Invalid EmailAddress
	 */
	sesVerifyEmailAddressWithInvalidEmailAddress : function(callback) {
		var params = {
			'emailAddress' : 'bdvjhdbdgv'//invalid EmailAddress
		};
		AWS.SES.verifyEmailAddress(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	//*************verifyEmailAddress test cases ends**************
	//***************sendEmail test cases start**************

	/**
	 *Test case for sendEmail without passing Destination
	 */
	sesSendEmailWithoutDestination : function(callback) {
		var params = {
			'destination' : '', //empty EmailAddress
			'message' : 'Hi',
			'source' : 'test@gmail.com'
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendEmail without passing Message
	 */
	sesSendEmailWithoutMessage : function(callback) {
		var params = {
			'destination' : 'test@gmail.com',
			'message' : '', //Empty
			'source' : 'test@gmail.com'
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendEmail without passing Source
	 */
	sesSendEmailWithoutSource : function(callback) {
		var params = {
			'destination' : 'test@test.com', //Required
			'message' : 'Hi', //Required
			'source' : ''//Empty
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendEmail by passing a valid Destination,Message,Source
	 */
	sesSendEmail : function(callback) {
		var params = {
			'destination' : 'test@gmail.com', //Required
			'message' : 'hi', //Required
			'source' : 'test@gmail.com'//Required
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	/**
	 *Test case for sendEmail by passing a Invalid Destination
	 */
	sesSendEmailWithInvalidDestination : function(callback) {
		var params = {
			'destination' : 'hbegjhrg', //Invalid EmailAddress
			'message' : 'hi', //Required
			'source' : 'rahul0789@gmail.com'//Required
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	/**
	 *Test case for sendEmail by passing a Invalid Source
	 */
	sesSendEmailWithInvalidSource : function(callback) {
		var params = {
			'destination' : 'test@test.com', //Required
			'message' : 'hi', //Required
			'source' : 'bndjvnd'//Invalid
		};
		AWS.SES.sendEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	//*************sendEmail test cases ends**************
	//***************sendRawEmail test cases start**************

	/**
	 *Test case for sendRawEmail without passing RawMessage
	 */
	sesSendRawEmailWithoutRawMessage : function(callback) {
		var params = {
			'rawMessage' : ''//empty RawMessage
		};
		AWS.SES.sendRawEmail(params, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	}
});
