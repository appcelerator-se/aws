/*
* Amazon WebServices Module
* A framework for exposing the Amazon QueryAPIs to Appcelerator Titanium Mobile.
*
* This framework is designed for QueryAPIs provided by AWS. Each service is represented
* as a NameSpace, within which each operation is exposed.
*
* This framework requires you to refer to the AWS API reference for handling request, and
* responses recieved from the service.
*   i.e. refer to : http://aws.amazon.com/documentation/
*
* To learn more about this framework, or get the latest version, check out:
*  https://github.com/appcelerator-se/aws
*
*/

//#include:lib/hmacsha1.js
//#include:lib/awssigner.js
//#include:lib/awshelper.js
//#include:lib/md5.js
//#include:lib/utf8.js
//#include:lib/bedframe.js
//#include:lib/xmlToJson.js
//#include:lib/util.js
//#include:lib/hmacsha256.js

//Session variables used across all methods
var sessionOBJ = {
	utility : utility, // variable declared in utils.js
	bedFrame : BedFrame, // variable declared in bedframe.js
	xmlToJSON : xmlToJS, // variable declared in xmlToJson.js
	awsHelper : awsHelper,
	utf8 : utf8, //Used for S3 only
	sha256 : sha256,
	sha : sha,
	md5 : md5,
	accessKeyId : null, //To be initalized via the authorize method
	secretKey : null	//To be initalized via the authorize method
};

/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var defaultQueryExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	if(awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	//Calling generateSQSURL function for SQS and generateSignedURL for others
	if(this.property === 'SQS') {
		sUrl = sessionOBJ.awsHelper.generateSQSURL(this.action, params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint, this.version);
	} else {
		sUrl = sessionOBJ.awsHelper.generateSignedURL(this.action, params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint, this.version);
	}
	var xhr = awsHelper.createHttpObject(cbOnData, cbOnError);
	xhr.open(this.verb, sUrl);
	xhr.send();
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var snsExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	if(awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var xhr = awsHelper.createHttpObject(cbOnData, cbOnError);
	//generates complete querystring without url
	params.Action = this.action;
	params.Version = this.version;
	payload = sessionOBJ.awsHelper.generatePayload(params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint)

	if(Ti.Platform.osname === 'iphone') {
		xhr.open(this.verb, this.endpoint + '?' + payload);
	} else {
		xhr.open(this.verb, this.endpoint);
	}

	xhr.setRequestHeader('Host', 'sns.us-east-1.amazonaws.com');

	if(Ti.Platform.osname === 'iphone') {
		xhr.send();
	} else {
		xhr.send(payload);
	}

}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var s3Executor = function(params, cbOnData, cbOnError) {

	awsHelper.prepareExecutor(this);

	if(awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var xhr = Ti.Network.createHTTPClient();
	params.contentType = '';
	if(this.contentType) {
		params.contentType = this.contentType;
	}

	if(this.method === 'putBucketLifecycle' || this.method === 'deleteMultipleObjects') {
		params.contentMD5 = sessionOBJ.md5.b64_md5(params.xmlTemplate);
	} else {
		params.contentMD5 = '';
	}

	if(!params.hasOwnProperty('subResource')) {
		params.subResource = this.subResource;
	}
	var curDate = (new Date()).toUTCString();
	params.verb = this.verb;
	params.curDate = curDate;
	params.url = this.endpoint;
	params.stringToSign = '';
	params.verb = this.verb;

	//get the file mime type and size from the file object passed by client
	if(this.uploadFile) {
		var fileContents = params.file.read();
		params.contentType = fileContents.mimeType;
		params.contentLength = params.file.size;
	}

	sessionOBJ.awsHelper.generateS3Params(params);
	//generates stringTosign string and passes it back as part of 'params' parameter
	var signature = sessionOBJ.sha.b64_hmac_sha1(sessionOBJ.utf8.encode(sessionOBJ.secretKey), sessionOBJ.utf8.encode(params.stringToSign));
	var awsAuthHeader = "AWS " + sessionOBJ.accessKeyId + ":" + signature;

	xhr.open(this.verb, params.url);
	xhr.setRequestHeader('Authorization', awsAuthHeader);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('Host', 's3.amazonaws.com');
	//set the content type if its required by the api.
	if(this.contentType) {
		xhr.setRequestHeader('Content-Type', params.contentType);
	}
	// For api's that upload files we need to pass content type and content length
	if(this.uploadFile) {

		xhr.setRequestHeader('Content-Type', params.contentType);
		if(!Ti.Platform.osname === 'android') {// with android content length is already present
			xhr.setRequestHeader('Content-Length', params.contentLength);
		}
	}
	if(this.method === 'putBucketLifecycle' || this.method === 'deleteMultipleObjects') {
		xhr.setRequestHeader('Content-MD5', params.contentMD5)
	}
	//used for apis like Put object copy and upload part-copy
	if(params.hasOwnProperty('copySource')) {
		xhr.setRequestHeader('x-amz-copy-source', params.copySource);
		// will be passed by client
	}

	var method = this.method;

	xhr.onload = function(response) {
		//For Get and POST xml is returned as response hence converting it to javascript object and passing back to user

		if(this.connectionType == "GET" || this.connectionType == "POST" || method == "uploadPartCopy") {// Api's other then GET and POST does not return any xml as part of response object so passing the complete obect back to client
			if(method === "getObjectTorrent" || method === "getObject" || method === "getBucketPolicy") {
				if(cbOnData) {
					cbOnData(this.responseText);
				}
			} else {
				if(cbOnData) {
					cbOnData(sessionOBJ.xmlToJSON.toJSON(this.responseText, true));
				}
			}

		} else {// Api's other then GET and POST does not return any xml as part of response object so passing the complete obect back to client
			if(cbOnData) {
				cbOnData(this.responseText);
			}
		}
	};

	xhr.onerror = function(e) {
		awsHelper.httpError(this, cbOnError);
	}
	if(params.hasOwnProperty('xmlTemplate')) {//for sending xml in request object
		xhr.send(params.xmlTemplate);
	} else if(this.uploadFile) {// for sending file in request object
		xhr.send(fileContents);
	} else {
		xhr.send();
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var sesExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);
	if(awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	params.paramString = '';
	params.isRawMessage = this.isRawMessage;
	sessionOBJ.awsHelper.generateSESParams(params);
	var curDate = (new Date()).toUTCString();
	var requestBody = sessionOBJ.utf8.encode('AWSAccessKeyId=' + sessionOBJ.accessKeyId + '&Action=' + this.action + params.paramString + '&Timestamp=' + curDate);

	var authorization = 'AWS3-HTTPS AWSAccessKeyId=' + sessionOBJ.accessKeyId + ',Algorithm=' + this.algorithm + ',Signature=' + sessionOBJ.sha.b64_hmac_sha1(sessionOBJ.secretKey, curDate);
	var xhr = awsHelper.createHttpObject(cbOnData, cbOnError);

	xhr.open(this.verb, this.endpoint);
	xhr.setRequestHeader('Content-Type', this.contentType);
	xhr.setRequestHeader('Host', this.host);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('X-Amzn-Authorization', authorization);
	xhr.send(requestBody);
}
/**
 * Generates session token, temperary access key and temperary secret key, to be used with calls to dynamodb api's
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 * */
var stsExecutor = function(params, cbOnData, cbOnError) {
	awsHelper.prepareExecutor(this);

	params.Action = this.action;
	params.Version = this.version;
	var xhr = awsHelper.createHttpObject(cbOnData, cbOnError);
	sUrl = sessionOBJ.awsHelper.generatePayload(params, sessionOBJ.accessKeyId, sessionOBJ.secretKey, this.endpoint);

	if(Ti.Platform.osname === 'iphone') {
		xhr.open(this.verb, this.endpoint + '?' + payload);
	} else {
		xhr.open(this.verb, this.endpoint);
	}
	xhr.setRequestHeader('Host', 'sts.amazonaws.com');

	if(Ti.Platform.osname === 'iphone') {
		xhr.send();
	} else {
		xhr.send(payload);
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var dynamoDbExecutor = function(params, cbOnData, cbOnError) {

	awsHelper.prepareExecutor(this);

	if(awsHelper.validateApi(this, cbOnError, params) == false)
		return false;

	var expirationTime = (new Date((new Date).getTime() + ((new Date).getTimezoneOffset() * 60000))).toISODate();

	var thisRef = this;

	if((Ti.App.Properties.getString('tempExpiration') == null) || ((Ti.App.Properties.getString('tempExpiration') != null) && sessionOBJ.utility.compareTime(expirationTime, Ti.App.Properties.getString('tempExpiration'), 300))) {
		AWS.STS.getSessionToken({

		}, function(response) {
			Ti.App.Properties.setString('tempSessionToken', response["GetSessionTokenResult"][0]["Credentials"][0]["SessionToken"][0]);
			Ti.App.Properties.setString('tempSecretAccessKey', response["GetSessionTokenResult"][0]["Credentials"][0]["SecretAccessKey"][0]);
			Ti.App.Properties.setString('tempAccessKeyID', response["GetSessionTokenResult"][0]["Credentials"][0]["AccessKeyId"][0]);
			Ti.App.Properties.setString('tempExpiration', response["GetSessionTokenResult"][0]["Credentials"][0]["Expiration"][0]);
			dynamoDBCall(thisRef, params, cbOnData, cbOnError);
		}, function(error) {
			awsHelper.httpError(this, cbOnError);
		});
	} else {
		dynamoDBCall(thisRef, params, cbOnData, cbOnError);
	}
}
/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var dynamoDBCall= function(thisRef, params, cbOnData, cbOnError) {
	var curDate = (new Date()).toUTCString();
	// temperary access key
	var tempAccessKeyId = Ti.App.Properties.getString('tempAccessKeyID');
	// session token generated by sts
	var sessionToken = Ti.App.Properties.getString('tempSessionToken');
	// temperary secret key
	var secretAccessKey = Ti.App.Properties.getString('tempSecretAccessKey');

	var host = 'dynamodb.us-east-1.amazonaws.com';
	//var dtStr = (new Date).toUTCString();
	var canonicalHeader = 'host:' + thisRef.host + '\n' + 'x-amz-date:' + curDate + '\n' + 'x-amz-security-token:' + sessionToken + '\n' + 'x-amz-target:DynamoDB_20111205.' + thisRef.action + '\n';
	var signedHeaders = 'Host;X-Amz-Date;x-amz-security-token;X-Amz-Target';
	var stringToSign = thisRef.verb + '\n' + '/' + '\n' + '' + '\n' + canonicalHeader + '\n' + JSON.stringify(params.requestJSON);

	var signature = sessionOBJ.sha256.b64_hmac_sha256_sha256(secretAccessKey, stringToSign);
	if(signature.substring(signature.length - 1) !== "=") {
		signature = signature + "=";
	}

	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(response) {
		cbOnData(this.responseText);
	};
	xhr.onerror = function(e) {
		cbOnError(this.responseText);
	}

	xhr.open(thisRef.verb, thisRef.endpoint);
	var auth = ('AWS3 AWSAccessKeyId=' + tempAccessKeyId + ',Algorithm=' + thisRef.algorithm + ',SignedHeaders=' + signedHeaders + ',Signature=' + signature);

	xhr.setRequestHeader('X-Amz-Target', 'DynamoDB_20111205.' + thisRef.action);
	xhr.setRequestHeader('Content-Type', thisRef.contentType);
	xhr.setRequestHeader('x-amz-security-token', sessionToken);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('X-Amz-Date', curDate);
	xhr.setRequestHeader('Host', thisRef.host);
	xhr.setRequestHeader('X-Amzn-Authorization', auth);

	xhr.send(JSON.stringify(params.requestJSON));
}


var AWS = {};

/**
 * Stores the security credentials in the Module Session scope
 *
 * @param accessKeyId - AccessKey provided by the user
 * @param secretKey - SecretKey provided by the user
 */
AWS.authorize = function(accessKeyId, secretKey) {
	sessionOBJ.accessKeyId = accessKeyId;
	sessionOBJ.secretKey = secretKey;
}

sessionOBJ.bedFrame.build(AWS, {
	verb : 'GET',
	version : "2009-04-15",
	executor : defaultQueryExecutor,
	preparer : function() {
		if(!this.action) {
			initCap = this.method.substr(0, 1).toUpperCase();
			this.action = initCap + this.method.substr(1);
			// Action is Usually same as Method Name, unless explicitly stated
		}
	},
	children : [{
		property : 'SimpleDB',
		endpoint : "https://sdb.amazonaws.com",
		children : [{
			method : 'batchPutAttributes',
			validations : {
				required : {
					params : ['DomainName']
				},
				patternExistsValidator : {
					params : ['Item.*.Attribute.*.Name', 'Item.*.ItemName']
				}
			}
		}, {
			method : 'putAttributes',
			validations : {
				required : {
					params : ['DomainName', 'ItemName']
				},
				patternExistsValidator : {
					params : ['Attribute.*.Name', 'Attribute.*.Value']
				}
			}
		}, {
			method : 'batchDeleteAttributes',
			validations : {
				required : {
					params : ['DomainName']
				},
				patternExistsValidator : {
					params : ['Item.*.ItemName']
				}

			}
		}, {
			method : 'listDomains',
			arrayOverride : ['/ListDomainsResponse/ListDomainsResult/DomainName']
		}, {
			method : 'createDomain',
			validations : {
				required : {
					params : ['DomainName']
				},
				rangeValidator : {
					min : 3,
					max : 255,
					params : ['DomainName']
				}
			}
		}, {
			method : 'deleteDomain',
			validations : {
				required : {
					params : ['DomainName']
				}
			}
		}, {
			method : 'select',
			validations : {
				required : {
					params : ['SelectExpression']
				}
			}
		}, {
			method : 'domainMetadata',
			validations : {
				required : {
					params : ['DomainName']
				}
			}
		}, {
			method : 'getAttributes',
			validations : {
				required : {
					params : ['DomainName', 'ItemName']
				},
				patternExistsValidator : {
					params : ['Attribute.*.Name']
				}
			}
		}, {
			method : 'deleteAttributes',
			validations : {
				required : {
					params : ['DomainName', 'ItemName']
				}
			}
		}]
	}, {
		property : 'S3',
		endpoint : 'https://s3.amazonaws.com/',
		executor : s3Executor,
		uploadFile : false,
		subResource : '',
		children : [{
			method : 'getService'
		}, {
			method : 'deleteBucket',
			verb : 'DELETE',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'deleteBucketLifecycle',
			verb : 'DELETE',
			subResource : '?lifecycle',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'deleteBucketPolicy',
			verb : 'DELETE',
			subResource : '?policy',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'deleteBucketWebsite',
			verb : 'DELETE',
			subResource : '?website',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucket',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketAcl', // Xml Parsing Problem.
			subResource : '?acl',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketLifecycle',
			subResource : '?lifecycle',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketPolicy',
			subResource : '?policy',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketLocation',
			subResource : '?location',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketLogging',
			subResource : '?logging',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketNotification',
			subResource : '?notification',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketObjectVersions',
			subResource : '?versions',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketRequestPayment',
			subResource : '?requestPayment',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketVersioning',
			subResource : '?versioning',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'getBucketWebsite',
			subResource : '?website',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'headBucket',
			verb : 'HEAD',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'listMultipartUploads',
			subResource : '?uploads',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'putBucket',
			verb : 'PUT',
			validations : {
				required : {
					params : ['bucketName']
				}
			}
		}, {
			method : 'putBucketAcl',
			verb : 'PUT',
			subResource : '?acl',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketLifecycle',
			verb : 'PUT',
			subResource : '?lifecycle',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketPolicy',
			verb : 'PUT',
			subResource : '?policy',
			contentType : 'application/json',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketLogging',
			verb : 'PUT',
			subResource : '?logging',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketNotification',
			verb : 'PUT',
			subResource : '?notification',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketRequestPayment',
			verb : 'PUT',
			subResource : '?requestPayment',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketVersioning',
			verb : 'PUT',
			subResource : '?versioning',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putBucketWebsite',
			verb : 'PUT',
			subResource : '?website',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'deleteObject',
			verb : 'DELETE',
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'deleteMultipleObjects',
			verb : 'POST',
			subResource : '?delete',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'xmlTemplate']
				}
			}
		}, {
			method : 'getObject', // Returning Blob Data.
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'getObjectTorrent', // Returning Blob Data.
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'getObjectAcl', // Xml Parsing Problem.
			subResource : '?acl',
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'headObject',
			verb : 'HEAD',
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'putObject', //Working on Ios only.Content Length Header Value Cannot be Override in Android.
			verb : 'PUT',
			uploadFile : true,
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'putObjectAcl',
			contentType : 'application/xml',
			verb : 'PUT',
			subResource : '?acl',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'xmlTemplate']
				}
			}
		}, {
			method : 'putObjectCopy',
			verb : 'PUT',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'copySource']
				}
			}
		}, {
			method : 'initiateMultipartUpload',
			verb : 'POST',
			subResource : '?uploads',
			validations : {
				required : {
					params : ['bucketName', 'objectName']
				}
			}
		}, {
			method : 'abortMultipartUpload',
			verb : 'DELETE',
			subResource : '?',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'uploadId']
				}
			}
		}, {
			method : 'completeMultipartUpload',
			verb : 'POST',
			subResource : '?',
			contentType : 'application/xml',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber', 'xmlTemplate']
				}
			}
		}, {
			method : 'uploadPart',
			verb : 'PUT',
			uploadFile : true,
			subResource : '?',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber', 'file']
				}
			}
		}, {
			method : 'uploadPartCopy',
			verb : 'PUT',
			subResource : '?',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber']
				}
			}
		}, {
			method : 'listParts',
			subResource : '?',
			validations : {
				required : {
					params : ['bucketName', 'objectName', 'uploadId']
				}
			}
		}]
	}, {
		property : 'SES',
		endpoint : "https://email.us-east-1.amazonaws.com",
		verb : 'POST',
		host : 'email.us-east-1.amazonaws.com',
		algorithm : 'HmacSHA1',
		contentType : 'application/x-www-form-urlencoded',
		executor : sesExecutor,
		isRawMessage : false,
		children : [{
			method : 'deleteVerifiedEmailAddress',
			validations : {
				required : {
					params : ['emailAddress']
				}
			}
		}, {
			method : 'getSendQuota'
		}, {
			method : 'getSendStatistics'
		}, {
			method : 'listVerifiedEmailAddresses'
		}, {
			method : 'sendEmail',
			validations : {
				required : {
					params : ['source', 'destination', 'message']
				}
			}
		}, {
			method : 'sendRawEmail',
			isRawMessage : true,
			validations : {
				required : {
					params : ['rawMessage']
				}
			}
		}, {
			method : 'verifyEmailAddress',
			validations : {
				required : {
					params : ['emailAddress']
				}
			}
		}]
	}, {
		property : 'SQS',
		endpoint : "http://sqs.us-east-1.amazonaws.com",
		version : '2009-02-01',
		children : [{
			method : 'createQueue',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['QueueName']
				}
			}

		}, {
			method : 'listQueues',
			version : '2011-10-01',
			arrayOverride : ['/ListQueuesResponse/ListQueuesResult/QueueUrl']
		}, {
			method : 'getQueueUrl',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['QueueName']
				}
			}
		}, {
			method : 'addPermission',
			version : '2011-10-01'
		}, {
			method : 'setQueueAttributes',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'Attribute.Name', 'Attribute.Value']
				}
			}
		}, {
			method : 'getQueueAttributes',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['AttributeName.*']
			}
		}, {
			method : 'sendMessage',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'MessageBody']
				}
			}
		}, {
			method : 'sendMessageBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['SendMessageBatchRequestEntry.*.Id', 'SendMessageBatchRequestEntry.*.MessageBody']
			}
		}, {
			method : 'receiveMessage',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'deleteMessage',
			validations : {
				required : {
					params : ['ReceiptHandle', 'AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'deleteMessageBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['DeleteMessageBatchRequestEntry.*.Id', 'DeleteMessageBatchRequestEntry.*.ReceiptHandle']
			}
		}, {
			method : 'deleteQueue',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			}
		}, {
			method : 'changeMessageVisibility',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'ReceiptHandle', 'VisibilityTimeout']
				}
			}
		}, {
			method : 'changeMessageVisibilityBatch',
			version : '2011-10-01',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName']
				}
			},
			patternExistsValidator : {
				params : ['ChangeMessageVisibilityBatchRequestEntry.*.Id', 'ChangeMessageVisibilityBatchRequestEntry.*.ReceiptHandle', 'ChangeMessageVisibilityBatchRequestEntry.*.VisibilityTimeout']
			}
		}, {
			method : 'removePermission',
			validations : {
				required : {
					params : ['AWSAccountId', 'QueueName', 'Label']
				}
			}
		}]
	}, {
		property : 'SNS',
		endpoint : "http://sns.us-east-1.amazonaws.com",
		verb : 'POST',
		executor : snsExecutor,
		version : '2010-03-31',
		children : [{
			method : 'addPermission',
			validations : {
				required : {
					params : ['Label', 'TopicArn']
				},
				patternExistsValidator : {
					params : ['AWSAccountId.member.*', 'ActionName.member.*']
				}
			}
		}, {
			method : 'confirmSubscription',
			validations : {
				required : {
					params : ['Token', 'TopicArn']
				}

			}
		}, {
			method : 'createTopic',
			validations : {
				required : {
					params : ['Name']
				}
			}
		}, {
			method : 'deleteTopic',
			validations : {
				required : {
					params : ['TopicArn']
				}
			}
		}, {
			method : 'getSubscriptionAttributes',
			validations : {
				required : {
					params : ['SubscriptionArn']
				}
			}
		}, {
			method : 'getTopicAttributes',
			validations : {
				required : {
					params : ['TopicArn']
				}
			}
		}, {
			method : 'listSubscriptions'
		}, {
			method : 'listSubscriptionsByTopic',
			validations : {
				required : {
					params : ['TopicArn']
				}
			}
		}, {
			method : 'listTopics'
		}, {
			method : 'publish',
			validations : {
				required : {
					params : ['TopicArn', 'Message']
				}
			}
		}, {
			method : 'removePermission',
			validations : {
				required : {
					params : ['Label', 'TopicArn']
				}
			}
		}, {
			method : 'setSubscriptionAttributes',
			validations : {
				required : {
					params : ['AttributeName', 'AttributeValue', 'SubscriptionArn']
				}
			}
		}, {
			method : 'setTopicAttributes',
			validations : {
				required : {
					params : ['AttributeName', 'AttributeValue', 'TopicArn']
				}
			}
		}, {
			method : 'subscribe',
			validations : {
				required : {
					params : ['TopicArn', 'Endpoint', 'Protocol']
				}
			}
		}, {
			method : 'unsubscribe',
			validations : {
				required : {
					params : ['SubscriptionArn']
				}
			}
		}]
	}, {
		property : "STS",
		endpoint : "https://sts.amazonaws.com",
		verb : 'POST',
		version : "2011-06-15",
		host : "sts.amazonaws.com",
		executor : stsExecutor,
		children : [{
			method : 'getSessionToken'
		}]
	}, {
		property : "DDB",
		endpoint : "https://dynamodb.us-east-1.amazonaws.com/",
		verb : 'POST',
		host : "dynamodb.us-east-1.amazonaws.com",
		algorithm : "HmacSHA256",
		contentType : "application/x-amz-json-1.0",
		validations : {
			required : {
				params : ['requestJSON']
			}
		},
		executor : dynamoDbExecutor,
		children : [{
			method : 'listTables'
		}, {
			method : 'batchWriteItem'
		}, {
			method : 'describeTable',
		}, {
			method : 'updateTable',
		}, {
			method : 'updateItem',
		}, {
			method : 'deleteTable',
		}, {
			method : 'getItem',
		}, {
			method : 'putItem',
		}, {
			method : 'scan',
		}, {
			method : 'query',
		}, {
			method : 'deleteItem',
		}, {
			method : 'batchGetItem',
		}, {
			method : 'createTable',
		}]
	}]
});

module.exports = AWS;
