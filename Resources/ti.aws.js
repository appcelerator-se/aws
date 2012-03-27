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
//Session variables used across all methods

	var _sessionOBJ = {
		utility : require('/module/utils'), //Common to all namespaces
		bedFrame : require('/module/bedframe'), //Common to all namespaces
		x2j : require('/module/xml2json'), //Common to all namespaces
		utf8 : require('/module/utf8').load(), //Used for s3
		sha: require('/module/hmacsha1').load(),
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
	if (this.preparer && !this.prepared) {
		this.preparer();
		this.prepared=true;
	}
	
	if(this.validations)
		_sessionOBJ.utility.validateParams(params, this.validations);	//TBD

	sUrl = _sessionOBJ.utility.generateSignedURL(this.action, params, _sessionOBJ.accessKeyId, _sessionOBJ.secretKey, this.endpoint, this.version)
	httpClient = Ti.Network.createHTTPClient({
		onload : function(ev) {
			Ti.API.info(this.responseText);
			//Print the XML Retrieved from the Service
			jsResp = _sessionOBJ.x2j.parser(this.responseText);
			//Build a JavaScript Object from the XML

			//Check if this is a proper response, or an Error Response, and call the necessary callback Method
			if(cbOnData)
				cbOnData(jsResp);
		},
		onerror : function(e) {
			if(cbOnError){
				var error=_sessionOBJ.x2j.parser(this.responseText);
				error.summary=this.responseText;
				cbOnError(error);
			}
		},
		timeout : 5000 // milliseconds
	});
	httpClient.open(this.verb, sUrl);
	httpClient.send();
}

/**
 * Uses the AWS Query API to invoke an Action specified by the method, along with the parameters,
 * returns the response returned by the Service, and raises an Error callback in case of a failure.
 * @param params - Parameters to be sent
 * @param cbOnData - CallBack to be invoked for Response
 * @param cbOnError - Callback to be invoked for Error
 */
var s3Executor = function(params, cbOnData, cbOnError) {
	if (this.preparer && !this.prepared) {
		this.preparer();
		this.prepared=true;
	}
	
	var xhr = Ti.Network.createHTTPClient();
	params.contentMD5 = '';
	params.contentType = '';
	if(this.contentType) {
		params.contentType = this.contentType;
	}

	if(!params.hasOwnProperty('subResource')) {
		params.subResource = this.subResource;
	}
	if(params.hasOwnProperty('copySource')) {
		xhr.setRequestHeader('x-amz-copy-source', params.copySource);
		// will be passed from client
	}
	var curDate = (new Date()).toUTCString();
	params.verb = this.verb;
	params.curDate = curDate;
	params.url = this.endpoint;
	params.stringToSign = '';
	params.verb = this.verb;

	if(this.uploadFile) {
		var fileContents = params.file.read();
		params.contentType = fileContents.mimeType;
		params.contentLength = params.file.size;
	}

	_sessionOBJ.utility.generateS3Params(params);
	var signature = _sessionOBJ.sha.b64_hmac_sha1(_sessionOBJ.utf8.encode(_sessionOBJ.secretKey), _sessionOBJ.utf8.encode(params.stringToSign));
	var awsAuthHeader = "AWS " + _sessionOBJ.accessKeyId + ":" + signature;

	xhr.open(this.verb, params.url);
	xhr.setRequestHeader('Authorization', awsAuthHeader);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('Host', 's3.amazonaws.com');
	if(this.contentType) {
		xhr.setRequestHeader('Content-Type', params.contentType);
	}
	if(this.uploadFile) {
		xhr.setRequestHeader('Content-Type', params.contentType);
		xhr.setRequestHeader('Content-Length', params.contentLength);
	}
	xhr.onload = function(response) {
		if(this.connectionType == "GET" || this.connectionType == "POST") {
			if(cbOnData) {
				cbOnData(_sessionOBJ.x2j.parser(this.responseText));
			}
		} else {
			if(cbOnData) {
				cbOnData(this.responseText);
			}
		}
	};

	xhr.onerror = function(e) {
		if(cbOnError) {
			var error = _sessionOBJ.x2j.parser(this.responseText);
			error.summary = this.responseText;
			cbOnError(error);
		}
	}
	if(params.hasOwnProperty('xmlTemplate')) {//for sending xml in request object
		xhr.send(params.xmlTemplate);
	} else if(this.uploadFile) {// for sending file in request object
		xhr.send(fileContents);
	} else {
		xhr.send();
	}

}

var AWS = {};
/**
 * Stores the security credentials in the Module Session scope
 *
 * @param accessKeyId - AccessKey provided by the user
 * @param secretKey - SecretKey provided by the user
 */
AWS.authorize = function(accessKeyId, secretKey) {
	_sessionOBJ.accessKeyId = accessKeyId;
	_sessionOBJ.secretKey = secretKey;
}

_sessionOBJ.bedFrame.build(AWS, {
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
		children : [
		{
			method : 'batchPutAttributes',
			validations : {required : {params : ['DomainName']},
				patternExistsValidator : {params : ['Item.*.Attribute.*.Name','Item.*.ItemName' ]}}
		}, {
			method : 'putAttributes',
			validations : {required : {params : ['DomainName', 'ItemName']},
				patternExistsValidator : {params : ['Attribute.*.Name']}}
		}, {
			method : 'batchDeleteAttributes',
			validations : {required : {params : ['DomainName']},
				patternExistsValidator : {params : ['Item.*.ItemName']}}
		}, {
			method : 'listDomains',	arrayOverride : ['/ListDomainsResponse/ListDomainsResult/DomainName']
		}, {
			method : 'createDomain',
			validations : {required : {params : ['DomainName']}}
		}, {
			method : 'deleteDomain',
			validations : {required : {params : ['DomainName']}}
		}, {
			method : 'select',
			validations : {required : {params : ['SelectExpression']}}
		}, {
			method : 'domainMetadata',
			validations : {required : {params : ['DomainName']}}
		}, {
			method : 'getAttributes',
			validations : {required : {params : ['DomainName', 'ItemName']},
			patternExistsValidator : {params : ['Attribute.*.Name']}}
		}, {
			method : 'deleteAttributes',
			validations : {required : {params : ['DomainName', 'ItemName']}}
		}
		]
	},
	{
		property : 'S3',
		endpoint : 'https://s3.amazonaws.com/',
		executor : s3Executor,
		uploadFile : false,
		subResource : '',
		children : [
		{
			method : 'getService'
		}, {
			method : 'deleteBucket',
			verb : 'DELETE'
		}, {
			method : 'deleteBucketLifecycle',
			verb : 'DELETE',
			subResource : '?lifecycle'
		}, {
			method : 'deleteBucketPolicy',
			verb : 'DELETE',
			subResource : '?policy'
		}, {
			method : 'deleteBucketWebsite',
			verb : 'DELETE',
			subResource : '?website'
		}, {
			method : 'getBucket',
		}, {
			method : 'getBucketAcl', // Xml Parsing Problem.
			subResource : '?acl'
		}, {
			method : 'getBucketLifecycle',
			subResource : '?lifecycle'
		}, {
			method : 'getBucketPolicy',
			subResource : '?policy'
		}, {
			method : 'getBucketLocation',
			subResource : '?location'
		}, {
			method : 'getBucketLogging',
			subResource : '?logging'
		}, {
			method : 'getBucketNotification',
			subResource : '?notification'
		}, {
			method : 'getBucketObjectVersions',
			subResource : '?versions'
		}, {
			method : 'getBucketRequestPayment',
			subResource : '?requestPayment'
		}, {
			method : 'getBucketVersioning',
			subResource : '?versioning'
		}, {
			method : 'getBucketWebsite',
			subResource : '?website'
		}, {
			method : 'headBucket',
			verb : 'HEAD'
		}, {
			method : 'listMultipartUploads',
			subResource : '?uploads'
		}, {
			method : 'putBucket',
			verb : 'PUT'
		}, {
			method : 'putBucketAcl',
			verb : 'PUT',
			subResource : '?acl',
			contentType : 'application/xml'
		}, {
			method : 'putBucketLifecycle', //Content MD-5 not Generated.
			verb : 'PUT',
			subResource : '?lifecycle',
			contentType : 'application/xml'
		}, {
			method : 'putBucketPolicy',
			verb : 'PUT',
			subResource : '?policy',
			contentType : 'application/json'
		}, {
			method : 'putBucketLogging',
			verb : 'PUT',
			subResource : '?logging',
			contentType : 'application/xml'
		}, {
			method : 'putBucketNotification',
			verb : 'PUT',
			subResource : '?notification',
			contentType : 'application/xml'
		}, {
			method : 'putBucketRequestPayment',
			verb : 'PUT',
			subResource : '?requestPayment',
			contentType : 'application/xml'
		}, {
			method : 'putBucketVersioning',
			verb : 'PUT',
			subResource : '?versioning',
			contentType : 'application/xml'
		}, {
			method : 'putBucketWebsite',
			verb : 'PUT',
			subResource : '?website',
			contentType : 'application/xml'
		}, {
			method : 'deleteObject',
			verb : 'DELETE'
		}, {
			method : 'deleteMultipleObject', //Content MD-5 not Generated.
			verb : 'DELETE',
			subResource : '?delete',
			contentType : 'application/xml'
		}, {
			method : 'getObject' // Returning Blob Data.
		}, {
			method : 'getObjectAcl', // Xml Parsing Problem.
			subResource : '?acl'
		}, {
			method : 'headObject',
			verb : 'HEAD'
		}, {
			method : 'putObject', //Working on Ios only.Content Length Header Value Cannot be Override in Android.
			verb : 'PUT',
			uploadFile : true
		}, {
			method : 'putObjectAcl',
			verb : 'PUT',
			subResource : '?acl'
		}, {
			method : 'putObjectCopy',
			verb : 'PUT'
		}, {
			method : 'initiateMultipartUpload',
			verb : 'POST',
			subResource : '?uploads'
		}, {
			method : 'abortMultipartUpload',
			verb : 'DELETE',
			subResource : '?'
		}, {
			method : 'listParts',
			subResource : '?'
		}]
	}
	
	]
});

module.exports = AWS