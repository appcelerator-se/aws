describe("AWS SimpleDB Tests!", {

	before_all : function() {
		AWS = require('ti.aws');
		AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'), Titanium.App.Properties.getString('aws-secret-access-key'));
	},
	timeout : 5000,

	//Start Test Cases for put Bucket
	putBucket_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : 't16est12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured  ' + JSON.stringify(error));
		});
	},

	putEmptyBucket_as_async : function(callback) {
		AWS.S3.putBucket({
			bucketName : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	// End Test Cases for Put Bucket.
	// Start Test Cases for putBucketACL
	putBucketACL_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 't16est12354',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketACL_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketACLWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketACLWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 't16est12354',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketACLWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketAcl({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName></DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLifeCycle_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'manchester1',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketLifeCycle_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLifeCycleWithInalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><Rule><ID>delete-logs-rule</ID><Prefix>logs/</Prefix><Status>Enabled</Status><Expiration><Days>30</Days></Expiration></Rule><Rule><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></Rule></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLifeCycleWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLifeCycleWithInalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLifecycle({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<LifecycleConfiguration><ID>delete-documents-rule</ID><Prefix>documents/</Prefix><Status>Enabled</Status><Expiration><Days>365</Days></Expiration></LifecycleConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketPolicy_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'test12354',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketPolicy_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		var jsonObject = {
			"Version" : "2008-10-17",
			"Id" : "bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"],
				"Resource" : "arn:aws:s3:::test12354/*"
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketPolicyWithEmptyXmlTemplate_as_async : function(callback) {

		AWS.S3.putBucketPolicy({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketPolicyWithInvalidXmlTemplate_as_async : function(callback) {
		var jsonObject = {
			"Version" : "",
			"Id" : "bdffafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364",
			"Statement" : [{
				"Effect" : 'Allow',
				"Sid" : "1",
				"Principal" : {
					"AWS" : "*"
				},
				"Action" : ["s3:*"]
			}]
		}
		AWS.S3.putBucketPolicy({
			'bucketName' : 'xyzw',
			'xmlTemplate' : JSON.stringify(jsonObject)
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLogging_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'pankaj1234567',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketLogging_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLoggingWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetBucket>pankaj1234567</TargetBucket><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLoggingWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketLoggingWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketLogging({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"><LoggingEnabled><TargetPrefix>pankaj1234567-access_log-/</TargetPrefix><TargetGrants><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>WRITE</Permission></Grant></TargetGrants></LoggingEnabled></BucketLoggingStatus>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketNotification_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'manchester1',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketNotification_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketNotificationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687501311:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketNotificationWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketNotificationWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketNotification({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<NotificationConfiguration><TopicConfiguration><Topic>arn:aws:sns:us-east-1:704687:myTopic</Topic><Event>s3:ReducedRedundancyLostObject</Event></TopicConfiguration></NotificationConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketRequestPayment_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'manchester1',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketRequestPayment_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketRequestPaymentWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Payer>Requester</Payer></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketRequestPaymentWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketRequestPaymentWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketRequestPayment({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<RequestPaymentConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"></RequestPaymentConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketVersioning_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : 'manchester1',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketVersioning_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketVersioningWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status><MfaDelete>Disabled</MfaDelete></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketVersioningWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	putBucketVersioningWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketVersioning({
			'bucketName' : '',
			'xmlTemplate' : '<VersioningConfiguration xmlns= "http://s3.amazonaws.com/doc/2006-03-01/"><Status>Enabled</Status></VersioningConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketWebsite_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'manchester1',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putEmptyBucketWebsite_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument><Suffix>index.html</Suffix></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketWebsiteWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putBucketWebsiteWithInvalidXmlTemplate_as_async : function(callback) {
		AWS.S3.putBucketWebsite({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<WebsiteConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><IndexDocument></IndexDocument><ErrorDocument><Key>404.html</Key></ErrorDocument></WebsiteConfiguration>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObject_as_async : function(callback) {
		AWS.S3.putObject({
			'bucketName' : 'pankaj1234',
			'objectName' : 'myFile1.png'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putObjectWithEmptybucketName_as_async : function(callback) {
		AWS.S3.putObject({
			'bucketName' : '',
			'objectName' : 'myFile1.png'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putObject({
			'bucketName' : 'xyzw',
			'objectName' : 'myFile1.png'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.putObject({
			'bucketName' : 'pankaj1234',
			'objectName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectAcl_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'pankaj1234',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	putObjectAclWithEmptybucketName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : '',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectAclWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'xyzw',
			'objectName' : 'myFile1.png',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectAclWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'test12354',
			'objectName' : '',
			'xmlTemplate' : '<AccessControlPolicy xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>bdc36625affafdb55b4eef63987c06e225014c5e6cbbe103161eb0833222b364</ID><DisplayName>sood.is.in@gmail.com</DisplayName></Owner><AccessControlList><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant><Grant><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AmazonCustomerByEmail"><EmailAddress>sood.is.in@gmail.com</EmailAddress></Grantee><Permission>READ</Permission></Grant></AccessControlList></AccessControlPolicy>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	putObjectAclWithEmptyXmlTemplate_as_async : function(callback) {
		AWS.S3.putObjectAcl({
			'bucketName' : 'test12354',
			'objectName' : '',
			'xmlTemplate' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getService_as_async : function(callback) {
		AWS.S3.getService({}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucket_as_async : function(callback) {
		AWS.S3.getBucket({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketAcl_as_async : function(callback) {
		AWS.S3.getBucketAcl({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketAclWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketAcl({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketAclWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketAcl({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketLifecycle_as_async : function(callback) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketLifecycleWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketlifecycleWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/*getBucketPolicy_as_async : function(callback) {
		AWS.S3.getBucketPolicy({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},*/

	getBucketPolicyWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketLocation_as_async : function(callback) {
		AWS.S3.getBucketLocation({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketLocationWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLocation({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketLocationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLocation({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketLogging_as_async : function(callback) {
		AWS.S3.getBucketLogging({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketLoggingWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketLogging({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketLoggingWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketLogging({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketNotification_as_async : function(callback) {
		AWS.S3.getBucketNotification({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketNotificationWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketNotification({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketNotificationWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketNotification({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketObjectVersions_as_async : function(callback) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketObjectVersionsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketObjectVersionsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketObjectVersions({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketRequestPayment_as_async : function(callback) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketRequestPaymentWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketRequestPaymentWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketRequestPayment({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketVersioning_as_async : function(callback) {
		AWS.S3.getBucketVersioning({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketVersioningWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketVersioning({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketVersioningWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketVersioning({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketWebsite_as_async : function(callback) {
		AWS.S3.getBucketWebsite({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	getBucketWebsiteWithEmptybucketName_as_async : function(callback) {
		AWS.S3.getBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	getBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.getBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	/*headBucket_as_async : function(callback) {
		AWS.S3.headBucket({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},*/

/*	headBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.headBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},*/

	/*headBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.headBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},*/

	listMultipartUploads_as_async : function(callback) {
		AWS.S3.listMultipartUploads({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	listMultipartUploadsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.listMultipartUploads({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	listMultipartUploadsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.listMultipartUploads({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucket_as_async : function(callback) {
		AWS.S3.deleteBucket({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteBucketWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucket({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucket({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketLifecycle_as_async : function(callback) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteBucketLifecycleWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketLifecycleWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketLifecycle({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketPolicy_as_async : function(callback) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteBucketPolicyWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketPolicyWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketPolicy({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketWebsite_as_async : function(callback) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : 'test12354'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteBucketWebsiteWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : ''
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteBucketWebsiteWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteBucketWebsite({
			'bucketName' : 'xyzw'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteObject_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteObjectWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteObject({'bucketName':'','objectName':'image.part.63'},function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteObjectWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'xyzw',
			'objectName' : 'image.part.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteObjectWithEmptyobjectName_as_async : function(callback) {
		AWS.S3.deleteObject({'bucketName':'velocity-gl','objectName':''},function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteObjectWithInvalidobjectName_as_async : function(callback) {
		AWS.S3.deleteObject({
			'bucketName' : 'velocity-gl',
			'objectName' : 'image.63'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteMultipleObjects_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'test12354l',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			callback.passed();
		}, function(error) {
			callback.failed('Some error occured');
		});
	},

	deleteMultipleObjectsWithEmptybucketName_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({'bucketName':'','xmlTemplate':'<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'},function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},

	deleteMultipleObjectsWithInvalidbucketName_as_async : function(callback) {
		AWS.S3.deleteMultipleObjects({
			'bucketName' : 'xyzw',
			'xmlTemplate' : '<Delete><Object><Key>sample1.txt</Key></Object><Object><Key>sample2.txt</Key></Object></Delete>'
		}, function(data) {
			callback.failed('Some error occured');
		}, function(error) {
			callback.passed();
		});
	},
	deleteMultipleObjectsWithEmptyXmlTemplate_as_async: function (callback){
    AWS.S3.deleteMultipleObjects({'bucketName':'velocity-gl','xmlTemplate':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
deleteMultipleObjectsWithInvalidobjectName_as_async: function (callback){
    AWS.S3.deleteMultipleObjects({'bucketName':'velocity-gl','xmlTemplate':'<Delete><Object><Key>sample1.txt</Key></Object><Object></Object></Delete>'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
	getObject_as_async: function (callback){
    AWS.S3.getObject({'bucketName':'velocity-gl','objectName':'image.part.63'},function(data){
    callback.passed();    
    }, function (error){
        callback.failed('Some error occured');
    });
  },
  
  
getObjectWithEmptybucketName_as_async: function (callback){
    AWS.S3.getObject({'bucketName':'','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
getObjectWithInvalidbucketName_as_async: function (callback){
    AWS.S3.getObject({'bucketName':'xyzw','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  getObjectWithEmptyobjectName_as_async: function (callback){
    AWS.S3.getObject({'bucketName':'velocity-gl','objectName':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
getObjectWithInvalidobjectName_as_async: function (callback){
    AWS.S3.getObject({'bucketName':'velocity-gl','objectName':'image.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
  	getObjectAcl_as_async: function (callback){
    AWS.S3.getObjectAcl({'bucketName':'velocity-gl','objectName':'image.part.63'},function(data){
    callback.passed();    
    }, function (error){
        callback.failed('Some error occured');
    });
  },
  
  
getObjectAclWithEmptybucketName_as_async: function (callback){
    AWS.S3.getObjectAcl({'bucketName':'','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
getObjectAclWithInvalidbucketName_as_async: function (callback){
    AWS.S3.getObjectAcl({'bucketName':'xyzw','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  getObjectAclWithEmptyobjectName_as_async: function (callback){
    AWS.S3.getObjectAcl({'bucketName':'velocity-gl','objectName':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
getObjectAclWithInvalidobjectName_as_async: function (callback){
    AWS.S3.getObjectAcl({'bucketName':'velocity-gl','objectName':'image.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
   /*	headObject_as_async: function (callback){
    AWS.S3.headObject({'bucketName':'velocity-gl','objectName':'image.part.63'},function(data){
    callback.passed();    
    }, function (error){
        callback.failed('Some error occured');
    });
  },
  
  
headObjectWithEmptybucketName_as_async: function (callback){
    AWS.S3.headObject({'bucketName':'','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
headObjectWithInvalidbucketName_as_async: function (callback){
    AWS.S3.headObject({'bucketName':'xyzw','objectName':'image.part.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
  headObjectWithEmptyobjectName_as_async: function (callback){
    AWS.S3.headObject({'bucketName':'velocity-gl','objectName':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
headObjectWithInvalidobjectName_as_async: function (callback){
    AWS.S3.initiateMultipartUpload({'bucketName':'velocity-gl','objectName':'image.63'},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  */
  
abortMultipartUploadWithEmptybucketName_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'','objectName':'image.part.63','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
abortMultipartUploadWithInvalidbucketName_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'xyzw','objectName':'image.part.63','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
 abortMultipartUploadWithEmptyobjectName_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
abortMultipartUploadWithInvalidobjectName_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'image.63','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  abortMultipartUploadWithEmptyuploadId_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
abortMultipartUploadWithInvaliduploadId_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'image.63','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  abortMultipartUploadWithEmptyPartNumber_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  },
  
  
abortMultipartUploadWithInvalidpartNumber_as_async: function (callback){
    AWS.S3.abortMultipartUpload({'bucketName':'velocity-gl','objectName':'image.63','uploadId':'','partNumber':''},function(data){
     callback.failed('Some error occured');
    }, function (error){
        callback.passed();   
    });
  }
  
});
