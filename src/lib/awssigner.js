/*!
 * Amazon WebServices Module
 * Module is used to generate signature that needs to be passed to api calls
 *
 */

function AWSSigner(accessKeyId, secretKey) {
	this.accessKeyId = accessKeyId;
	this.secretKey = secretKey;
}

AWSSigner.prototype.sign = function(params, time, requestInfo) {
	var timeUtc = time.toISO8601();
	params = this.addFields(params, timeUtc);
	//deleting the accountID and queueName as they are only used for SQS and are not required after we are done making the url
	if(params.hasOwnProperty('AWSAccountId') && params.hasOwnProperty('QueueName')) {
		delete params['AWSAccountId'];
		delete params['QueueName'];
	}
	params.Signature = this.generateSignature(this.canonicalize(params, requestInfo));
	return params;
}
AWSSigner.prototype.addFields = function(params, time) {
	params.AWSAccessKeyId = this.accessKeyId;
	params.SignatureVersion = this.version;
	params.SignatureMethod = "HmacSHA1";
	params.Timestamp = time;
	return params;
}

AWSSigner.prototype.generateSignature = function(str) {
	return sha.b64_hmac_sha1(this.secretKey, str);
}

AWSV2Signer.prototype = new AWSSigner();
function AWSV2Signer(accessKeyId, secretKey) {
	AWSSigner.call(this, accessKeyId, secretKey);
	this.version = 2;
}

AWSV2Signer.prototype.canonicalize = function(params, requestInfo) {
	var verb = requestInfo.verb;
	var host = requestInfo.host.toLowerCase();
	var uriPath = requestInfo.uriPath;
	var canonical = verb + "\n" + host + "\n" + uriPath + "\n";
	var sortedKeys = filterAndSortKeys(params, signatureFilter, caseSensitiveComparator);
	var first = true;
	for(var i = 0; i < sortedKeys.length; i++) {
		if(first) {
			first = false;
		} else {
			canonical += "&";
		}
		var key = sortedKeys[i];
		canonical += urlEncode(key);
		if(params[key] !== null) {
			canonical += "=" + urlEncode(params[key]);
		}
	}
	return canonical;
}
function filterAndSortKeys(obj, filter, comparator) {
	var keys = new Array();
	for(var key in obj) {
		if(!filter(key, obj[key])) {
			keys.push(key);
		}
	}
	return keys.sort(comparator);
}

function signatureFilter(key, value) {
	return key === "Signature" || value === null;
}

