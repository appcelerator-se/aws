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
