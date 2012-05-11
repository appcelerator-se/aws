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



//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/hmacsha1.js
/*
 * A JavaScript implementation of the Secure Hash Algorithm, sha-1, for AWS SimpleDB
 * in FIPS 180-1
 * Version 2.2-alpha Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Obtained from the following Amazon Sample Project:
 * http://aws.amazon.com/code/developertools/1137
 */


var sha;
if( typeof exports !== 'undefined')
	sha = exports;
else
	sha = {};

//var sha= exports ? exports : {};


	sha.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
	sha.b64pad = "="; /* base-64 pad character. "=" for strict RFC compliance */

	sha.hex_sha1 = function(s) {
		return sha.rstr2hex(sha.rstr_sha1(sha.str2rstr_utf8(s)));
	};
	sha.b64_sha1 = function(s) {
		return sha.rstr2b64(sha.rstr_sha1(sha.str2rstr_utf8(s)));
	};
	sha.any_sha1 = function(s, e) {
		return sha.rstr2any(sha.rstr_sha1(sha.str2rstr_utf8(s)), e);
	};
	sha.hex_hmac_sha1 = function(k, d) {
		return sha.rstr2hex(sha.rstr_hmac_sha1(sha.str2rstr_utf8(k), sha.str2rstr_utf8(d)));
	};
	sha.b64_hmac_sha1 = function(k, d) {
		return sha.rstr2b64(sha.rstr_hmac_sha1(sha.str2rstr_utf8(k), sha.str2rstr_utf8(d)));
	};
	sha.any_hmac_sha1 = function(k, d, e) {
		return sha.rstr2any(sha.rstr_hmac_sha1(sha.str2rstr_utf8(k), sha.str2rstr_utf8(d)), e);
	};
	/*
	 * Perform a simple self-test to see if the VM is working
	 */
	sha.sha1_vm_test = function() {
		return sha.hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
	};
	/*
	 * Calculate the sha1 of a raw string
	 */
	sha.rstr_sha1 = function(s) {
		return sha.binb2rstr(sha.binb_sha1(sha.rstr2binb(s), s.length * 8));
	};

	/*
	 * Calculate the HMAC-sha1 of a key and some data (raw strings)
	 */
	sha.rstr_hmac_sha1 =function(key, data) {
		var bkey = sha.rstr2binb(key);
		if(bkey.length > 16)
			bkey = sha.binb_sha1(bkey, key.length * 8);
		var ipad = Array(16), opad = Array(16);
		for(var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = sha.binb_sha1(ipad.concat(sha.rstr2binb(data)), 512 + data.length * 8);
		return sha.binb2rstr(sha.binb_sha1(opad.concat(hash), 512 + 160));
	};

	/*
	 * Convert a raw string to a hex string
	 */

	sha.rstr2hex = function(input) {
		var hex_tab = sha.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var output = "";
		var x;
		for(var i = 0; i < input.length; i++) {
			x = input.charCodeAt(i);
			output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
		}
		return output;
	};

	/*
	 * Convert a raw string to a base-64 string
	 */
	sha.rstr2b64 = function(input) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var output = "";
		var len = input.length;
		for(var i = 0; i < len; i += 3) {
			var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
			for(var j = 0; j < 4; j++) {
				if(i * 8 + j * 6 > input.length * 8)
					output += sha.b64pad;
				else
					output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
			}
		}
		return output;
	};

	/*
	 * Convert a raw string to an arbitrary string encoding
	 */
	sha.rstr2any = function(input, encoding) {
		var divisor = encoding.length;
		var remainders = Array();
		var i, q, x, quotient;
		/* Convert to an array of 16-bit big-endian values, forming the dividend */
		var dividend = Array(Math.ceil(input.length / 2));
		for( i = 0; i < dividend.length; i++) {
			dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
		}
		/*
		 * Repeatedly perform a long division. The binary array forms the dividend,
		 * the length of the encoding is the divisor. Once computed, the quotient
		 * forms the dividend for the next step. We stop when the dividend is zero.
		 * All remainders are stored for later use.
		 */
		while(dividend.length > 0) {
			quotient = Array();
			x = 0;
			for( i = 0; i < dividend.length; i++) {
				x = (x << 16) + dividend[i];
				q = Math.floor(x / divisor);
				x -= q * divisor;
				if(quotient.length > 0 || q > 0)
					quotient[quotient.length] = q;
			}
			remainders[remainders.length] = x;
			dividend = quotient;
		}
		/* Convert the remainders to the output string */
		var output = "";
		for( i = remainders.length - 1; i >= 0; i--)
			output += encoding.charAt(remainders[i]);
		/* Append leading zero equivalents */
		var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)))
		for( i = output.length; i < full_length; i++)
			output = encoding[0] + output;
		return output;
	};

	/*
	 * Encode a string as utf-8.
	 * For efficiency, this assumes the input is valid utf-16.
	 */
	sha.str2rstr_utf8 = function(input) {
		var output = "";
		var i = -1;
		var x, y;
		while(++i < input.length) {
			/* Decode utf-16 surrogate pairs */
			x = input.charCodeAt(i);
			y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
			if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
				x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
				i++;
			}
			/* Encode output as utf-8 */
			if(x <= 0x7F)
				output += String.fromCharCode(x);
			else if(x <= 0x7FF)
				output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
			else if(x <= 0xFFFF)
				output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
			else if(x <= 0x1FFFFF)
				output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
		}
		return output;
	};

	/*
	 * Encode a string as utf-16
	 */
	sha.str2rstr_utf16le = function(input) {
		var output = "";
		for(var i = 0; i < input.length; i++)
			output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
		return output;
	};
	sha.str2rstr_utf16be = function(input) {
		var output = "";
		for(var i = 0; i < input.length; i++)
			output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
		return output;
	};

	/*
	 * Convert a raw string to an array of big-endian words
	 * Characters >255 have their high-byte silently ignored.
	 */
	sha.rstr2binb = function(input) {
		var output = Array(input.length >> 2);
		for(var i = 0; i < output.length; i++)
			output[i] = 0;
		for(var i = 0; i < input.length * 8; i += 8)
			output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
		return output;
	};

	/*
	 * Convert an array of little-endian words to a string
	 */
	sha.binb2rstr = function(input) {
		var output = "";
		for(var i = 0; i < input.length * 32; i += 8)
			output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
		return output;
	};

	/*
	 * Calculate the sha-1 of an array of big-endian words, and a bit length
	 */
	sha.binb_sha1 = function(x, len) {
		/* append padding */
		x[len >> 5] |= 0x80 << (24 - len % 32);
		x[((len + 64 >> 9) << 4) + 15] = len;
		var w = Array(80);
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		for(var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			for(var j = 0; j < 80; j++) {
				if(j < 16)
					w[j] = x[i + j];
				else
					w[j] = sha.bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
				var t = sha.safe_add(sha.safe_add(sha.bit_rol(a, 5), sha.sha1_ft(j, b, c, d)), sha.safe_add(sha.safe_add(e, w[j]), sha.sha1_kt(j)));
				e = d;
				d = c;
				c = sha.bit_rol(b, 30);
				b = a;
				a = t;
			}
			a = sha.safe_add(a, olda);
			b = sha.safe_add(b, oldb);
			c = sha.safe_add(c, oldc);
			d = sha.safe_add(d, oldd);
			e = sha.safe_add(e, olde);
		}
		return Array(a, b, c, d, e);
	};

	/*
	 * Perform the appropriate triplet combination function for the current
	 * iteration
	 */
	sha.sha1_ft = function(t, b, c, d) {
		if(t < 20)
			return (b & c) | ((~b) & d);
		if(t < 40)
			return b ^ c ^ d;
		if(t < 60)
			return (b & c) | (b & d) | (c & d);
		return b ^ c ^ d;
	};

	/*
	 * Determine the appropriate additive constant for the current iteration
	 */

	sha.sha1_kt = function(t) {
		return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
	};

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	sha.safe_add = function(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	};

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	sha.bit_rol = function(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}

//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/hmacsha1.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/awssigner.js
/*!
 * Amazon WebServices Module
 * Module is used to generate signature that needs to be passed to api calls
 *
 */
//Ti.include('hmacsha1.js');
//var sha = require('module/hmacsha1');
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

function urlEncode(url) {
	return encodeURIComponent(url).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
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

function caseInsensitiveComparator(a, b) {
	return simpleComparator(a.toLowerCase(), b.toLowerCase());
}

function caseSensitiveComparator(a, b) {
	var length = a.length;
	if(b.length < length) {
		length = b.length;
	}
	for(var i = 0; i < length; i++) {
		var comparison = simpleComparator(a.charCodeAt(i), b.charCodeAt(i));
		if(comparison !== 0) {
			return comparison;
		}
	}
	if(a.length == b.length) {
		return 0;
	}
	if(b.length > a.length) {
		return 1;
	}
	return -1;
}

function simpleComparator(a, b) {
	if(a < b) {
		return -1;
	} else if(a > b) {
		return 1;
	}
	return 0;
}

Date.prototype.toISODate= function()
{
	return this.getFullYear() +'-'+addZero(this.getMonth()+1)+ '-' +addZero(this.getDate())+'T'+addZero(this.getHours())+':' +addZero(this.getMinutes())+':'+addZero(this.getSeconds())+'.000Z';	
}   
function addZero(n) {
    return ( n < 0 || n > 9 ? "" : "0" ) + n;
}

Date.prototype.toISO8601 = function() {
	return this.getUTCFullYear() + "-" + pad(this.getUTCMonth() + 1) + "-" + pad(this.getUTCDate()) + "T" + pad(this.getUTCHours()) + ":" + pad(this.getUTCMinutes()) + ":" + pad(this.getUTCSeconds()) + ".000Z";
}
function pad(n) {
	return (n < 0 || n > 9 ? "" : "0") + n;
}
//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/awssigner.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/awshelper.js
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
	if(params.hasOwnProperty('bucketName')) {
		//check if objectName is passed by user if yes then include it as part of stringtosign data
		if(params.hasOwnProperty('objectName')) {
			//copySource is used by 'Put object copy and Upload part ' api's, which needs to be part of stringtosign
			if(params.hasOwnProperty('copySource')) {
				params.canonicalizedAmzHeaders = '\n' + 'x-amz-copy-source:' + params.copySource;
			} else {
				params.canonicalizedAmzHeaders = '';
			}
			if(params.hasOwnProperty('uploadId')) {
				if(params.hasOwnProperty('partNumber')) {
					params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.objectName + params.subResource + 'partNumber=' + params.partNumber + '&' + 'uploadId=' + params.uploadId;
					params.url = params.url.concat(params.bucketName + '/' + params.objectName + params.subResource + 'partNumber=' + params.partNumber + '&' + 'uploadId=' + params.uploadId);
				} else {
					params.stringToSign = params.verb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + params.canonicalizedAmzHeaders + '\n/' + params.bucketName + '/' + params.objectName + params.subResource + 'uploadId=' + params.uploadId;
					params.url = params.url.concat(params.bucketName + '/' + params.objectName + params.subResource + 'uploadId=' + params.uploadId);
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

//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/awshelper.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/md5.js
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */


var md5;
if( typeof exports !== 'undefined')
	md5 = exports;
else
	md5 = {};


/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "=";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
hex_md5=function(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
md5.b64_md5=function(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
b64_hmac_md5=function(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/md5.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/utf8.js
/*
 * A Titanium Mobile commonJS module for UTF-8 data encode / decode
 * http://www.webtoolkit.info/javascript-utf8.html
 *
 * Contributors: Terry Martin
 * Copyright: Semantic Press, Inc.
 */

var utf8;
if( typeof exports !== 'undefined')
	utf8 = exports;
else
	utf8 = {};

// public method for url encoding
utf8.encode = function(string) {
	string = string.replace(/\r\n/g, "\n");
	var utftext = "";

	for(var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if(c < 128) {
			utftext += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}

	return utftext;
};

// public method for url decoding
utf8.decode = function(utftext) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while(i < utftext.length) {

		c = utftext.charCodeAt(i);

		if(c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}

	}

	return string;
}; 
//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/utf8.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/bedframe.js
/*!
 * BedFrame v0.3 by Dawson Toth
 * A framework for exposing RESTful APIs to Appcelerator Titanium Mobile.
 * 
 * This framework is designed for REST APIs with the following characteristics:
 *  1) Contains many different methods, in many different namespaces.
 *  2) Method signatures are all very similar.
 *  
 * You probably don't need this framework if:
 *  1) You only want to expose a couple methods.
 *  
 * To learn more about this framework, or get the latest version, check out:
 *  https://github.com/dawsontoth/BedFrame
 *
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/**
 * This can be used as a module or as an included file. If you are including it (or inlining it) in to another module,
 * then you should replace the below with simply var BedFrame = {}, removing the exports ternary expression.
 */



var BedFrame;
if( typeof BedFrame !== 'undefined')
	BedFrame = exports;
else
	BedFrame = {};
//var BedFrame = exports ? exports : {};

/**
 * Default property type that results in only the latest specified value being used (that is, the deepest child's value
 * will be used over any of its parents). Particularly useful for specifying default values that most children use, and
 * then overriding those default values on exceptional children.
 */
BedFrame.PROPERTY_TYPE_ONLY_LATEST = 0;
/**
 * Property type that results in child values equating to their parent value plus their own, separated by a forward
 * slash. Particularly useful for creating a URL hierarchy.
 */
BedFrame.PROPERTY_TYPE_SLASH_COMBINE = 1;
/**
 * Property type that results in a parent value not propogating to its children.
 */
BedFrame.PROPERTY_TYPE_IGNORE = 2;

/**
 * Recursively builds a full API on the target object, as defined in the api object. Properties will be added to the target object,
 * but the object reference itself will not be altered. This means you can safely "build" on a CommonJS exports object.
 *
 * @param target The object that the API will be created in.
 * @param api The specifications for the API you want to expose through objects. Read "THE API OBJECT" in readme.md to find out more.
 */
BedFrame.build = function bedFrameTransformObject(target, api) {
    // Save a reference to the children property of the current segment of the API.
    var children = api.children || [];

    // Iterate over every child to set up its API.
    for (var c in children) {
        // Avoid prototyped members.
        if (!children.hasOwnProperty(c))
            continue;
        // Create a shorter reference to the present child.
        var child = children[c];
        // Determine the present property types, or default to an empty object.
        // (We will pass this variable down in the next step; propertyTypes is itself by default typed ONLY_LATEST).
        var propertyTypes = child.propertyTypes || api.propertyTypes || {};
        // Don't pass down children (that causes an infinite recursion).
        propertyTypes.children = BedFrame.PROPERTY_TYPE_IGNORE;

        // Iterate over every member of the current segment of the API.
        for (var o in api) {
            // Avoid prototyped members and children.
            if (!api.hasOwnProperty(o))
                continue;
            // Based on the property type specified for this API, cascade property down from parent to child.
            switch (propertyTypes[o] || BedFrame.PROPERTY_TYPE_ONLY_LATEST) {
                case BedFrame.PROPERTY_TYPE_ONLY_LATEST:
                    // ONLY_LATEST results in child taking precedence over the parent, completely replacing the value.
                    child[o] = child[o] === undefined ? api[o] : child[o];
                    break;
                case BedFrame.PROPERTY_TYPE_SLASH_COMBINE:
                    // SLASH_COMBINE results in the child ending up with a slash-separated-value from the top most
                    // parent to the present child, where elements without a value are ignored (there won't be any
                    // double slashes in the computed value).
                    var parts = [];
                    if (api[o])
                        parts.push(api[o]);
                    if (child[o])
                        parts.push(child[o]);
                    child[o] = parts.join('/');
                    break;
            }
        }

        // If the current child specifies the method property, and does not have any children, it's an endpoint and
        // needs to be set up as a method. Inject it in to the target.
        if (child.method && !child.children) {
            target[child.method] = (function (child) {
                return function () {
                    // Executors are designed to work based off of their context. Act upon the child, which is a mixed
                    // down result of its parent, and its parent's parent, and so on.
                    return child.executor.apply(child, arguments);
                };
            })(child);
        }
        // Otherwise, inject the new property in to the target, and recurse upon the sub-segment of the API.
        else if (child.property) {
            bedFrameTransformObject(target[child.property] = {}, child);
        }
    }
};
//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/bedframe.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/xmlToJson.js
/**
 * xmlToJS Module 0.1
 *
 * To use:
 * var xmlToJS = require('xmlToJS');
 * var jsObject = xmlToJS.convert(xml);
 *
 * This will take XMl like the following:
 *
 <atom:feed xmlns:atom="http://www.w3.org/2005/Atom">
 <atom:title>someTitle</atom:title>
 <atom:updated>2012-03-22T15:47:54Z</atom:updated>
 <atom:entry>
 <atom:value>value one</atom:value>
 </atom:entry>
 <atom:entry>
 <atom:value>value two</atom:value>
 <atom:readonly />
 </atom:entry>
 <atom:entry>
 <atom:value>value three</atom:value>
 </atom:entry>
 </atom:feed>
 *
 * and turn it in to a predictable, easily used form:
 *
 {
 title: [ 'someTitle' ],
 updated: [ '2012-03-22T15:47:54Z' ],
 entry: [
 { value: [ 'value one' ] },
 { value: [ 'value two' ], readonly: [ null ] },
 { value: [ 'value three' ] }
 ]
 }
 *
 * Note that nodes always result in arrays, even if there is only a single value inside of them.
 */

var xmlToJS;
if(typeof exports !== 'undefined')
	xmlToJS = exports;
else
	xmlToJS = {}


/**
 * Recursively converts a Titanium XML document or node in to a JSON representation of it.
 */
xmlToJS.convert = function convert(xml) {
	var retVal = {};
	function cleanName(name) {
		return name.split(':').join('_');
	}
	var attrs = xml.attributes;
	if(attrs && attrs.length) {
		for(var i1 = 1, l1 = attrs.length; i1 < l1; i1++) {
			var attr = attrs.item(i1);
			retVal[cleanName(attr.name)] = attr.getValue();
		}
	}
	var nodes = xml.childNodes;
	if(nodes && nodes.length) {
		for(var i2 = 0, l2 = nodes.length; i2 < l2; i2++) {
			var node = nodes.item(i2);
			switch (node.nodeType) {
				case node.ELEMENT_NODE:
					var name = cleanName(node.nodeName);
					if(retVal[name] === undefined) {
						retVal[name] = [];
					}
					retVal[name].push(convert(node));
					break;
				case node.TEXT_NODE:
					return node.nodeValue;
					break;
			}
		}
	}
	if(!(attrs && attrs.length) && !(nodes && nodes.length)) {
		// empty node
		return null;
	}
	return retVal;
};
/**
 * Routine that handles the response provided by the Service.
 *
 * @param response - the XML response returned from the service.
 * @param isClean - Boolean variable indicating the structure of the response XML.
 */

xmlToJS.toJSON = function toJSON(response, isClean) {
	if(( typeof response === 'string') && (response !== null || response !== '')) {
		//For a clean xml string
		if(isClean) {
			//Returning the JSON response after calling the convert function with Titanium XML document of service response
			return xmlToJS.convert(Ti.XML.parseString(response).documentElement);
		} else {//For an unclean XML
			var xml = "";
			//Iterating through the xml by slicing tags
			while(response.indexOf('<') > -1) {
				//Adding a trim function in String prototype for removing the whitespaces
				String.prototype.trim = function() {
					return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				}
				//Removing the whitespaces between the tags and concatenating the XML for traversing
				xml = xml + response.slice(response.indexOf('<'), response.indexOf('>') + 1);
				xml = xml + response.slice(response.indexOf('>') + 1, response.indexOf('<', response.indexOf('>'))).trim();
				response = response.substring(response.indexOf('>') + 1);
			}
			//Returning the JSON response after calling the convert function with Titanium XML document of service response
			return xmlToJS.convert(Ti.XML.parseString(xml).documentElement);
		}
	} else {
		return {};
	}

}

//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/xmlToJson.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/util.js
/*
 * Amazon Utility File
 * File contains utility functions used across different modules
 *
 */

var utility;
if( typeof exports !== 'undefined')
	utility = exports;
else
	utility = {}

/**
 * Routine that validates the Parameters provided by the User based upon the Rules associated with the method.
 *
 * @param params - Parameters to be serialized into the URL
 * @param validations - List of Validation rules to apply, along with their inherent parameters
 */
utility.validateParams = function(reqParams, validations, min, max) {
	var finalresponse = "";
	for(var validationRule in validations) {
		fnValidate = validators[validationRule];
		data = validations[validationRule];
		res = fnValidate(reqParams, data);
		if(!res == "") {
			finalresponse = prepareMessage(res, validationRule);
			return finalresponse;
		}
	}
	return finalresponse;
}
/**
 * Routine that compares two time values.
 *
 * @param t1 - Time one
 * @param t2 - Time two
 * @param td
 */
exports.compareTime = function(t1, t2, td) {//t1 is expected greater time, t2 is the older time, td the difference between time in seconds
	if((new Date(t1)).getTime() + td * 1000 >= (new Date(t2)).getTime()) {
		return true;
	} else {
		return false;
	}
}
/**
 * Function is used for sorting
 * @param firstString
 * @param secondString
 * */
utility.ignoreCaseSort = function(firstString, secondString) {
	var ret = 0;
	firstString = firstString.toLowerCase();
	secondString = secondString.toLowerCase();
	if(firstString > secondString)
		ret = 1;
	if(firstString < secondString)
		ret = -1;
	return ret;
}
/* Standard validators supported by the AWS API */
validators = {
	//Checks if all the mandatory parameters specified under data.params, have some value in them
	required : function(reqParams, data) {
		var req_key = data.params;
		for( x = 0; x < req_key.length; x++) {
			if((reqParams[req_key[x]] == undefined ) || (reqParams[req_key[x]] == null) || (reqParams[req_key[x]] == "")) {
				return req_key[x];
			}
		}
		return "";
	},
	rangeValidator : function(reqParams, data) {
		var range_key = data.params;
		for( x = 0; x < range_key.length; x++) {
			if(reqParams[range_key[x]].length < data.min || reqParams[range_key[x]].length > data.max) {
				return L('lengthValidation');
			} else {
				var iChars = '!@#$%^&*()+=-[]\\\';,./{}|\":<>?';
				for( i = 0; i < iChars.length; i++) {
					if(reqParams[range_key[x]].indexOf(iChars[i]) != -1) {
						return L('symbolValidation');
					}
				}
			}
		}
		return "";
	},
	//Checks to see if there are any matching regualar expressions within the Parameters
	//Useful for validating collection of input parameters.
	patternExistsValidator : function(reqParams, data) {
	}
}

/**
 * function returns validation error message
 * @param response
 * @param validationRule
 */
prepareMessage = function(response, validationRule) {
	var msg = "";
	var msg = '<?xml version=\"1.0\"?><Response><Errors><Error><Code>' + L(validationRule) + '</Code><Message>' + response + '</Message></Error></Errors></Response>';
	return msg;
}
//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/util.js


//***** begin include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/hmacsha256.js
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Also http://anmar.eu.org/projects/jssha2/
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */

var sha256;
if( typeof exports !== 'undefined')
	sha256 = exports;
else
	sha256 = {};

sha256.hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
sha256.b64pad = "=";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
sha256.hex_sha256 = function(s) {
	return sha256.rstr2hex(sha256.rstr_sha256(sha256.str2rstr_utf8(s)));
};
sha256.b64_sha256 = function(s) {
	return sha256.rstr_sha256(sha256.str2rstr_utf8(s));
	//return sha256.rstr2b64(sha256.rstr_sha256(sha256.str2rstr_utf8(s)));
};
sha256.any_sha256 = function(s, e) {
	return sha256.rstr2any(sha256.rstr_sha256(sha256.str2rstr_utf8(s)), e);
};
sha256.hex_hmac_sha256 = function(k, d) {
	return sha256.rstr2hex(sha256.rstr_hmac_sha256(sha256.str2rstr_utf8(k), sha256.str2rstr_utf8(d)));
};
sha256.b64_hmac_sha256 = function(k, d) {
	return sha256.rstr2b64(sha256.rstr_hmac_sha256(sha256.str2rstr_utf8(k), sha256.str2rstr_utf8(d)));
};
sha256.b64_hmac_sha256_sha256 = function(k, d) {
	return sha256.rstr2b64(sha256.rstr_hmac_sha256(k, sha256.rstr_sha256(d)));
};
sha256.any_hmac_sha256 = function(k, d, e) {
	return sha256.rstr2any(sha256.rstr_hmac_sha256(sha256.str2rstr_utf8(k), sha256.str2rstr_utf8(d)), e);
};
/*
 * Perform a simple self-test to see if the VM is working
 */
sha256.sha256_vm_test = function() {
	return sha256.hex_sha256("abc").toLowerCase() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
};
/*
 * Perform a simple self-test to see if the VM is working
 */
sha256.sha256_vm_test1 = function() {
	return sha256.hex_sha256("The quick brown fox jumps over the lazy dog").toLowerCase() == "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592";
};
/*
 * Calculate the sha256 of a raw string
 */
sha256.rstr_sha256 = function(s) {
	return sha256.binb2rstr(sha256.binb_sha256(sha256.rstr2binb(s), s.length * 8));
};
/*
 * Calculate the HMAC-sha256 of a key and some data (raw strings)
 */
sha256.rstr_hmac_sha256 = function(key, data) {
	var bkey = sha256.rstr2binb(key);
	if(bkey.length > 16)
		bkey = sha256.binb_sha256(bkey, key.length * 8);

	var ipad = Array(16), opad = Array(16);
	for(var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = sha256.binb_sha256(ipad.concat(sha256.rstr2binb(data)), 512 + data.length * 8);
	return sha256.binb2rstr(sha256.binb_sha256(opad.concat(hash), 512 + 256));
};
/*
 * Convert a raw string to a hex string
 */
sha256.rstr2hex = function(input) {
	try { hexcase
	} catch(e) {
		hexcase = 0;
	}
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var output = "";
	var x;
	for(var i = 0; i < input.length; i++) {
		x = input.charCodeAt(i);
		output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
	}
	return output;
};
/*
 * Convert a raw string to a base-64 string
 */
sha256.rstr2b64 = function(input) {
	try { b64pad
	} catch(e) {
		b64pad = '';
	}
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var output = "";
	var len = input.length;
	for(var i = 0; i < len; i += 3) {
		var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
		for(var j = 0; j < 4; j++) {
			if(i * 8 + j * 6 > input.length * 8)
				output += b64pad;
			else
				output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
		}
	}
	return output;
};
/*
 * Convert a raw string to an arbitrary string encoding
 */
sha256.rstr2any = function(input, encoding) {
	var divisor = encoding.length;
	var remainders = Array();
	var i, q, x, quotient;

	/* Convert to an array of 16-bit big-endian values, forming the dividend */
	var dividend = Array(Math.ceil(input.length / 2));
	for( i = 0; i < dividend.length; i++) {
		dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
	}

	/*
	 * Repeatedly perform a long division. The binary array forms the dividend,
	 * the length of the encoding is the divisor. Once computed, the quotient
	 * forms the dividend for the next step. We stop when the dividend is zero.
	 * All remainders are stored for later use.
	 */
	while(dividend.length > 0) {
		quotient = Array();
		x = 0;
		for( i = 0; i < dividend.length; i++) {
			x = (x << 16) + dividend[i];
			q = Math.floor(x / divisor);
			x -= q * divisor;
			if(quotient.length > 0 || q > 0)
				quotient[quotient.length] = q;
		}
		remainders[remainders.length] = x;
		dividend = quotient;
	}

	/* Convert the remainders to the output string */
	var output = "";
	for( i = remainders.length - 1; i >= 0; i--)
		output += encoding.charAt(remainders[i]);

	/* Append leading zero equivalents */
	var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)))
	for( i = output.length; i < full_length; i++)
		output = encoding[0] + output;

	return output;
};
/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
sha256.str2rstr_utf8 = function(input) {
	var output = "";
	var i = -1;
	var x, y;

	while(++i < input.length) {
		/* Decode utf-16 surrogate pairs */
		x = input.charCodeAt(i);
		y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
		if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
			x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
			i++;
		}

		/* Encode output as utf-8 */
		if(x <= 0x7F)
			output += String.fromCharCode(x);
		else if(x <= 0x7FF)
			output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F), 0x80 | (x & 0x3F));
		else if(x <= 0xFFFF)
			output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6 ) & 0x3F), 0x80 | (x & 0x3F));
		else if(x <= 0x1FFFFF)
			output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6 ) & 0x3F), 0x80 | (x & 0x3F));
	}
	return output;
};
/*
 * Encode a string as utf-16
 */
sha256.str2rstr_utf16le = function(input) {
	var output = "";
	for(var i = 0; i < input.length; i++)
		output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
	return output;
};
str2rstr_utf16be = function(input) {
	var output = "";
	for(var i = 0; i < input.length; i++)
		output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
	return output;
};
/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
sha256.rstr2binb = function(input) {
	var output = Array(input.length >> 2);
	for(var i = 0; i < output.length; i++)
		output[i] = 0;
	for(var i = 0; i < input.length * 8; i += 8)
		output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
	return output;
};
/*
 * Convert an array of big-endian words to a string
 */
sha256.binb2rstr = function(input) {
	var output = "";
	for(var i = 0; i < input.length * 32; i += 8)
		output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
	return output;
};
/*
 * Main sha256 function, with its support functions
 */
sha256.sha256_S = function(X, n) {
	return (X >>> n ) | (X << (32 - n));
};
sha256.sha256_R = function(X, n) {
	return (X >>> n );
};
sha256.sha256_Ch = function(x, y, z) {
	return ((x & y) ^ ((~x) & z));
};
sha256.sha256_Maj = function(x, y, z) {
	return ((x & y) ^ (x & z) ^ (y & z));
};
sha256.sha256_Sigma0256 = function(x) {
	return (sha256.sha256_S(x, 2) ^ sha256.sha256_S(x, 13) ^ sha256.sha256_S(x, 22));
};
sha256.sha256_Sigma1256 = function(x) {
	return (sha256.sha256_S(x, 6) ^ sha256.sha256_S(x, 11) ^ sha256.sha256_S(x, 25));
};
sha256.sha256_Gamma0256 = function(x) {
	return (sha256.sha256_S(x, 7) ^ sha256.sha256_S(x, 18) ^ sha256.sha256_R(x, 3));
};
sha256.sha256_Gamma1256 = function(x) {
	return (sha256.sha256_S(x, 17) ^ sha256.sha256_S(x, 19) ^ sha256.sha256_R(x, 10));
};
sha256.sha256_Sigma0512 = function(x) {
	return (sha256.sha256_S(x, 28) ^ sha256.sha256_S(x, 34) ^ sha256.sha256_S(x, 39));
};
sha256.sha256_Sigma1512 = function(x) {
	return (sha256.sha256_S(x, 14) ^ sha256.sha256_S(x, 18) ^ sha256.sha256_S(x, 41));
};
sha256.sha256_Gamma0512 = function(x) {
	return (sha256.sha256_S(x, 1) ^ sha256.sha256_S(x, 8) ^ sha256.sha256_R(x, 7));
};
sha256.sha256_Gamma1512 = function(x) {
	return (sha256.sha256_S(x, 19) ^ sha256.sha256_S(x, 61) ^ sha256.sha256_R(x, 6));
};
sha256.sha256_K = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998), sha256.binb_sha256 = function(m, l) {
	var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225);
	var W = new Array(64);
	var a, b, c, d, e, f, g, h;
	var i, j, T1, T2;

	/* append padding */
	m[l >> 5] |= 0x80 << (24 - l % 32);
	m[((l + 64 >> 9) << 4) + 15] = l;

	for( i = 0; i < m.length; i += 16) {
		a = HASH[0];
		b = HASH[1];
		c = HASH[2];
		d = HASH[3];
		e = HASH[4];
		f = HASH[5];
		g = HASH[6];
		h = HASH[7];

		for( j = 0; j < 64; j++) {
			if(j < 16)
				W[j] = m[j + i];
			else
				W[j] = sha256.safe_add(sha256.safe_add(sha256.safe_add(sha256.sha256_Gamma1256(W[j - 2]), W[j - 7]), sha256.sha256_Gamma0256(W[j - 15])), W[j - 16]);
			T1 = sha256.safe_add(sha256.safe_add(sha256.safe_add(sha256.safe_add(h, sha256.sha256_Sigma1256(e)), sha256.sha256_Ch(e, f, g)), sha256.sha256_K[j]), W[j]);
			T2 = sha256.safe_add(sha256.sha256_Sigma0256(a), sha256.sha256_Maj(a, b, c));
			h = g;
			g = f;
			f = e;
			e = sha256.safe_add(d, T1);
			d = c;
			c = b;
			b = a;
			a = sha256.safe_add(T1, T2);
		}

		HASH[0] = sha256.safe_add(a, HASH[0]);
		HASH[1] = sha256.safe_add(b, HASH[1]);
		HASH[2] = sha256.safe_add(c, HASH[2]);
		HASH[3] = sha256.safe_add(d, HASH[3]);
		HASH[4] = sha256.safe_add(e, HASH[4]);
		HASH[5] = sha256.safe_add(f, HASH[5]);
		HASH[6] = sha256.safe_add(g, HASH[6]);
		HASH[7] = sha256.safe_add(h, HASH[7]);
	}
	return HASH;
};
sha256.safe_add = function(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
};


//***** end include: /Users/amit.sood/Documents/dynamoDB/aws/build/lib/hmacsha256.js

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
					params : ['bucketName', 'objectName', 'uploadId', 'partNumber']
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
