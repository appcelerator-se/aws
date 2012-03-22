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
	params.contentMD5 = '';
	params.contentType = '';
	if(!params.hasOwnProperty('subresource')) {
		params.subresource = this.subresource;
	}
	var curDate = (new Date()).toUTCString();
	params.verb=this.verb;
	params.curDate=curDate;
	params.url=this.endpoint;
	params.stringToSign='';
	params.verb = this.verb;
	_sessionOBJ.utility.generateS3Params(params);	
	var signature = _sessionOBJ.sha.b64_hmac_sha1(_sessionOBJ.utf8.encode(_sessionOBJ.secretKey), _sessionOBJ.utf8.encode(params.stringToSign));
	var awsAuthHeader = "AWS " + _sessionOBJ.accessKeyId + ":" + signature;
	var xhr = Ti.Network.createHTTPClient();
	xhr.open(this.verb, params.url);
	xhr.setRequestHeader('Authorization', awsAuthHeader);
	xhr.setRequestHeader('Date', curDate);
	xhr.setRequestHeader('Host', 's3.amazonaws.com');
	xhr.onload = function(response) {
		if(this.connectionType == "GET") {
			if(cbOnData){
				cbOnData(_sessionOBJ.x2j.parser(this.responseText));
			}
		} else {
			if(cbOnData){
				cbOnData(response.responseText);
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
	xhr.send();	
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
	namespaces : [{
		namespace : 'SimpleDB',
		endpoint : "https://sdb.amazonaws.com",
		methods : [
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
		namespace: 'S3',
		endpoint: 'https://s3.amazonaws.com/',
		executor : s3Executor,
		methods: [
			{method: 'putBucket', verb: 'PUT'},
			{method: 'getBucket', verb: 'GET'},
			{method: 'deleteBucket', verb: 'DELETE'},
			{method : 'getService', verb: 'GET', subresource:''},
			{method : 'putBucketAcl', verb: 'PUT', subresource:'?acl'},
			{method : 'deleteBucketLifecycle', verb: 'DELETE', subresource:'?lifecycle'},
			{method : 'deleteBucketPolicy', verb: 'DELETE', subresource:'?policy'},
			{method : 'deleteBucketWebsite', verb: 'DELETE', subresource:'?website'},
			{method : 'getBucketLifecycle', verb: 'GET', subresource:'?lifecycle'},
			{method : 'getBucketPolicy', verb: 'GET', subresource:'?policy'},
			{method : 'getBucketLocation', verb: 'GET', subresource:'?location'},
			{method : 'getBucketLogging', verb: 'GET', subresource:'?logging'},
			{method : 'getBucketNotification', verb: 'GET', subresource:'?notification'},
			{method : 'getBucketObjectVersions', verb: 'GET', subresource:'?versions'},
			{method : 'getBucketRequestPayment', verb: 'GET', subresource:'?requestPayment'},
			{method : 'getBucketVersioning', verb: 'GET', subresource:'?versioning'},
			{method : 'getBucketWebsite', verb: 'GET', subresource:'?website'},
			{method : 'headBucket', verb: 'HEAD', subresource:''},
			{method : 'listMultipartUploads', verb: 'GET', subresource:'?uploads'},
			{method : 'getObject', verb: 'GET', subresource:''},
			{method : 'getObjectAcl', verb: 'GET', subresource:'?acl'},
			{method : 'putObject', verb: 'PUT', subresource:''},
			{method : 'putObjectAcl', verb: 'PUT', subresource:'?acl'},
			{method : 'deleteObject', verb: 'DELETE', subresource:''},
			{method : 'headObject', verb: 'HEAD', subresource:''}
		]
	}
	
	]
});

module.exports = AWS