/*
 * Amazon helper file
 * File contains functions which are used to generate payloads for api's
 *
 */

var awsHelper;
if( typeof exports !== 'undefined')
	awsHelper = exports;
else
	awsHelper = {}

/**
 * Routine that contructs querystring as payload without an URl with it.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */
awsHelper.generatePayload = function(params, accessKeyId, secretKey, endpoint) {
	return SignAndEncodeParams(params, accessKeyId, secretKey, endpoint.replace(/.*:\/\//, ""), "POST", "/");
}
/**
 * Routine that contructs querystring as payload with an URl with it.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */
awsHelper.generateSignedURL = function(actionName, params, accessKeyId, secretKey, endpoint, version) {
	var displayUri = endpoint;
	var uriPath = "/";
	params.Action = actionName;
	params.Version = version;

	//This is to append AWSAccountId along with QueueName in Endpoint for SQS
	if(params.hasOwnProperty('AWSAccountId') && params.hasOwnProperty('QueueName')) {
		var path = params.AWSAccountId + "/" + params.QueueName + "/";
		uriPath += path;
		displayUri += "/" + path;
	}

	displayUri += "?" + SignAndEncodeParams(params, accessKeyId, secretKey, endpoint.replace(/.*:\/\//, ""), "GET", uriPath);
	return displayUri;
}
/**
 * Routine that constructs the complete email and passes that back as a string
 * @param - Its a javascript object contains all elements required for creating signed string and url endpoint.
 * For More info Pls refer to : http://docs.amazonwebservices.com/ses/latest/APIReference
 */
awsHelper.generateSESParams = function(params) {
	if(params.hasOwnProperty('emailAddress')) {
		params.paramString += '&EmailAddress=' + params.emailAddress;
	} else if(params.hasOwnProperty('destination')) {
		params.paramString += generateDestination(params.destination, params.isRawMessage);
		if(params.hasOwnProperty('message')) {
			if(params.message.hasOwnProperty('body')) {
				params.paramString += generateMessageBody(params.message.body);
			}
			if(params.message.hasOwnProperty('subject')) {
				params.paramString += '&Message.Subject.Data=' + params.message.subject;
			}
		}
		if(params.hasOwnProperty('replyTo')) {
			params.paramString += generateReplyTo(params.replyTo);
		}
		if(params.hasOwnProperty('returnPath')) {
			params.paramString += '&ReturnPath=' + params.returnPath;
		}
		if(params.hasOwnProperty('source')) {
			params.paramString += '&Source=' + params.source;
		}
	}
	if(params.hasOwnProperty('rawMessage')) {
		params.paramString += '&RawMessage.Data=' + params.rawMessage;
	}
	return;
}
/**
 * Routine that contructs URL for SQS.
 * @param - params- Its a javascript object that contains all elements required to create payload
 * @param - accessKeyId - Used to sign the payload
 * @param - secretKey - Used to sign the payload
 * @param - endpoint - contains the url which need to be hit, is used to extract the host part from it
 */

awsHelper.generateSQSURL = function(actionName, params, accessKeyId, secretKey, endpoint, version) {
	if(params.hasOwnProperty('AWSAccountId') && params.hasOwnProperty('QueueName')) {
		endpoint += "/" + params.AWSAccountId + "/" + params.QueueName + "/";
		delete params.AWSAccountId;
		delete params.QueueName;
	}
	var url = endpoint + "?SignatureVersion=1&Action=" + actionName + "&Version=" + encodeURIComponent(version) + "&";
	for(var key in params) {
		var elementName = key;
		var elementValue = params[key];
		if(elementValue) {
			url += elementName + "=" + encodeURIComponent(elementValue) + "&";
		}
	}
	var timestamp = (new Date((new Date).getTime() + ((new Date).getTimezoneOffset() * 60000))).toISODate();
	url += "Timestamp=" + encodeURIComponent(timestamp) + "&SignatureMethod=HmacSHA1&AWSAccessKeyId=" + encodeURIComponent(accessKeyId);
	var stringToSign = generateStringToSignForSQS(url);
	var signature = sha.b64_hmac_sha1(secretKey, stringToSign);
	url += "&Signature=" + encodeURIComponent(signature);
	return url;
}
/**
 * Routine that generates the signed string based upn the params passed
 *
 * @param - Its a javascript object that contains all elements required for creating signed string
 * more on the signing string here --http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RESTAuthentication.html
 */
awsHelper.generateS3Params = function(params) {
	//check if the bucket name is passed by the user. If its passed then include it as part of stringtosign data
	if (params.hasOwnProperty('bucketName')) {
		//check if objectName is passed by user if yes then include it as part of stringtosign data
		if (params.hasOwnProperty('objectName') || params.hasOwnProperty('key')) {
			//check if versionId is passed by user if yes then include it as part of stringtosign data
			if (params.hasOwnProperty('versionId')) {
				//copySource is used by 'Put object copy and Upload part ' api's, which needs to be part of stringtosign
				if (params.hasOwnProperty('copySource')) {
					params.canonicalizedAmzHeaders = '\n' + 'x-amz-copy-source:' + params.copySource;
				} else {
					params.canonicalizedAmzHeaders = '';
				}
				if (params.hasOwnProperty('uploadId')) {
					if (params.hasOwnProperty('partNumber')) {
						params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.objectName + params.subResource + 'partNumber=' + params.partNumber + '&' + 'uploadId=' + params.uploadId;
						params.url = params.url.concat(params.bucketName + '/' + params.objectName + params.subResource + 'partNumber=' + params.partNumber + '&' + 'uploadId=' + params.uploadId);
					} else {
						params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.objectName + params.subResource + 'uploadId=' + params.uploadId;
						params.url = params.url.concat(params.bucketName + '/' + params.objectName + params.subResource + 'uploadId=' + params.uploadId);
					}
				} else {
					params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.key + '?versionId=' + params.versionId;
				}
			} else {
				params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.objectName + params.subResource;
				params.url = params.url.concat(params.bucketName + '/' + params.objectName + params.subResource);
			}
		} else {
			params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n/' + params.bucketName + '/' + params.subResource;
			params.url = params.url.concat(params.bucketName + '/' + params.subResource);
		}
	} else {
		params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n/' + params.subResource;
	}
	return;
}
/***
 * Function does the validation of apis
 * Return -- returns false in case of error else true
 * */
awsHelper.validateApi = function(thisRef, cbOnError, params) {
	if(thisRef.validations) {
		var errorResponse = sessionOBJ.utility.validateParams(params, thisRef.validations);
		if(errorResponse != "") {//means validations failed
			if(cbOnError) {
				var error = sessionOBJ.xmlToJSON.toJSON(errorResponse, true);
				cbOnError(error);
				return false;
			}
		}
	}
	return true;
}
/***
 * Helper function for executors
 * */
awsHelper.prepareExecutor = function(thisRef) {
	if(thisRef.preparer && !thisRef.prepared) {
		thisRef.preparer();
		thisRef.prepared = true;
	}
}
/***
 * Function handles http error callback
 * */
awsHelper.httpError = function(thisRef, cbOnError) {
	if(cbOnError) {
		var error = sessionOBJ.xmlToJSON.toJSON(thisRef.responseText, false);
		error.summary = thisRef.responseText;
		cbOnError(thisRef.responseText);
	}
}
/***
 * Function handles http success callback
 * */
awsHelper.httpSuccess = function(thisRef, cbOnData) {

	//Print the XML Retrieved from the Service
	jsResp = sessionOBJ.xmlToJSON.toJSON(thisRef.responseText, false);
	//Build a JavaScript Object from the XML

	//Check if this is a proper response, or an Error Response, and call the necessary callback Method
	if(cbOnData)
		cbOnData(jsResp);
}
/***
 * Function creates HTTP request
 * Return-- Returns http object with error and success callbacks attached
 * */
awsHelper.createHttpObject = function(cbOnData, cbOnError) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(response) {
		awsHelper.httpSuccess(this, cbOnData);
	};
	xhr.onerror = function(e) {
		awsHelper.httpError(this, cbOnError);
	}
	return xhr;
}
/**
 *  Function creates signature and payload
 *  @param - params --  An array containing values to be signed and be part of payload
 *  @param - accessKeyId - Used to sign the payload
 *  @param - secretKey - Used to sign the payload
 *  @param - host - host uri
 *  @param - verb - http verb
 *  @param - uriPath - http endpoint
 */
function SignAndEncodeParams(params, accessKeyId, secretKey, host, verb, uriPath) {
	var signer = new AWSV2Signer(accessKeyId, secretKey);
	params = signer.sign(params, new Date(), {
		"verb" : verb,
		"host" : host,
		"uriPath" : uriPath
	});
	var encodedParams = [];
	for(var key in params) {
		if(params[key] !== null) {
			encodedParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
		} else {
			encodedParams.push(encodeURIComponent(key));
		}
	}
	return payload = encodedParams.join("&");
}

/**
 *  Loops through all the email address given by the user and adds it to destination
 *  For Ex "To" can have more then 1 email address this function loops on that value.
 * * For more info pls refer to : http://docs.amazonwebservices.com/ses/latest/APIReference/API_SendEmail.html
 */

function generateDestination(destination, isRawMessage) {
	var destinationString = '';
	if(isRawMessage) {
		for( i = 1; i <= destination.length; i++) {
			destinationString += '&Destinations.member.' + i + '=' + destination[i - 1];
		}
	} else {
		for(key in destination) {
			//The value for "key" could be "to", "cc", "bcc", so we need to make the first letter as caps
			//we can also get rid of the below line of code but in that case user will have to pass "To" instead "to", which is not a
			//good coding practice while making javascript objects
			var type = key.substr(0, 1).toUpperCase() + key.substr(1);
			for( i = 1; i <= destination[key].length; i++) {
				destinationString += '&Destination.' + type + 'Addresses.member.' + i + '=' + destination[key][i - 1];
			}
		}
	}
	return destinationString;
}

/**
 * The reply-to email address(es) for the message. If the recipient replies to the message, each reply-to address will receive the reply
 * For more info pls refer to : http://docs.amazonwebservices.com/ses/latest/APIReference/API_SendEmail.html
 */

function generateReplyTo(replyTo) {
	var replyToString = '';
	for( i = 1; i <= replyTo.length; i++) {
		replyToString += '&ReplyToAddresses.member.' + i + '=' + replyTo[i - 1];
	}
	return replyToString;
}

/**
 * The message to be sent.
 * For more info pls refer to : http://docs.amazonwebservices.com/ses/latest/APIReference/API_SendEmail.html
 */
function generateMessageBody(messageBody) {
	var messageBodyString = '';
	for(key in messageBody) {
		var type = key.substr(0, 1).toUpperCase() + key.substr(1);
		messageBodyString += '&Message.Body.' + type + '.Data=' + messageBody[key];
	}
	return messageBodyString;
}

/**
 * Routine that contructs StringToSign for SQS.
 * @param - url- Its a URL containing various paramters
 */
function generateStringToSignForSQS(url) {
	var stringToSign = "";
	var query = url.split("?")[1];
	var params = query.split("&");
	params.sort(utility.ignoreCaseSort);
	for(var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		if(param[0] == 'Signature' || undefined == param[1])
			continue;
		stringToSign += param[0] + decodeURIComponent(param[1]);
	}
	return stringToSign;
}
