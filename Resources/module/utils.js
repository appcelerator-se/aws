/**
 * Routine that generates a SignedURL based upon the paramters provided making use of the AWSSigner
 * 
 * @param actionName - Action to be invoked by AWS
 * @param params - Parameters to be serialized into the URL
 * @param accessKeyId - AccessKey provided by the user
 * @param secretKey - SecretKey provided by the user
 * @param endpoint - Service Endpoint
 * @param version - Version of the Service to be invoked
 */

Ti.include("/module/awssigner.js");
exports.generateSignedURL = function(actionName, params, accessKeyId, secretKey, endpoint, version) {
    var host = endpoint.replace(/.*:\/\//, "");
    var payload = null;
    var displayUri = endpoint;

    params.Action = actionName;
    params.Version = version;
    var signer = new AWSV2Signer(accessKeyId, secretKey);
    params = signer.sign(params, new Date(), {
        "verb": "GET",
        "host": host,
        "uriPath": "/"
    });

    var encodedParams = [];
    for (var key in params) {
        if (params[key] !== null) {
            encodedParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
        } else {
            encodedParams.push(encodeURIComponent(key));
        }
    }
    payload = encodedParams.join("&");
    displayUri += "?" + payload;
    return displayUri;
}


/**
 * Routine that generates the signed string based upn the params passed
 * 
 * @param - Its a javascript object ar contains all elements required for creating signed string
 * more on the signing string here --http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RESTAuthentication.html 
 */
exports.generateStringToSign=function(params) {
	var signedString = '';
	if(params.hasOwnProperty('bucketName')) {
		if(params.hasOwnProperty('fileName')) {
			signedString = params.verb + params.subverb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n/' + params.bucketName + '/' + params.fileName;
		} else {
			signedString = params.verb + params.subverb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n/' + params.bucketName + '/';
		}
	} else {
		signedString = params.verb + params.subverb + '\n' + params.contentMD5 + '\n' + params.contentType + '\n' + params.curDate + '\n/';
	}
	return signedString;
}


/**
 * Routine that validates the Parameters provided by the User based upon the Rules associated with the method.
 * 
 * NOTE: This is work in progress
 * 
 * @param params - Parameters to be serialized into the URL
 * @param validations - List of Validation rules to apply, along with their inherent parameters
 */
exports.validateParams = function(params, validations) {
/*	for(var validationRule in validations){
	
	}
*/
}