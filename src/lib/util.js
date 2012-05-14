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


/***
 * Date to ISO
 *  */
Date.prototype.toISODate= function()
{
	return this.getFullYear() +'-'+addZero(this.getMonth()+1)+ '-' +addZero(this.getDate())+'T'+addZero(this.getHours())+':' +addZero(this.getMinutes())+':'+addZero(this.getSeconds())+'.000Z';	
}

/***
 *  Date to ISO8601
 *  */
Date.prototype.toISO8601 = function() {
	return this.getUTCFullYear() + "-" + addZero(this.getUTCMonth() + 1) + "-" + addZero(this.getUTCDate()) + "T" + addZero(this.getUTCHours()) + ":" + addZero(this.getUTCMinutes()) + ":" + addZero(this.getUTCSeconds()) + ".000Z";
}

/***
 * function does a case insensitive compare
 *  */
function caseInsensitiveComparator(a, b) {
	return simpleComparator(a.toLowerCase(), b.toLowerCase());
}

/***
 * function does a case senitive compare
 *  */
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
		return -1;
	}
	return 1;
}

/***
 * helper function to caseSensitiveComparator
 *  */
function simpleComparator(a, b) {
	if(a < b) {
		return -1;
	} else if(a > b) {
		return 1;
	}
	return 0;
}

/***
 * function pads 0
 *  */
function addZero(n) {
	return (n < 0 || n > 9 ? "" : "0" ) + n;
}

/***
 * function is used to encode url
 *  */
function urlEncode(url) {
	return encodeURIComponent(url).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}