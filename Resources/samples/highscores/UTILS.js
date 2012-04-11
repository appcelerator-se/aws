/**
* Appcelerator Titanium Platform
* Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
* Licensed under the terms of the Apache Public License
* Please see the LICENSE included with this distribution for details.
**/

// Code is stripped-down version of Tweetanium, to expose new structure paradigm

var UTILS = {};

(function(){
	UTILS.app = {};
	
/*
 * 
 * https://gist.github.com/1551558
 * Mixin properties of n objects into the given object - pass in as many objects to mix in as you like.  
 * Can perform a shallow or deep copy (deep is default).
 * 
 * Usage:
 * mixin([Boolean deepCopy,] objectToExtend, objectToMixIn [, as many other objects as needed])
 * 
 * Examples:
 * 
 * var o1 = {
 * 	 foo:'bar',
 *   anObject: {
 * 	   some:'value'
 *     clobber:false
 *   }
 * };
 * 
 * var o2 = {
 * 	 foo:'bar',
 *   aNewProperty:'something',
 *   anObject: {
 * 	   some:'other value'
 *   }
 * };
 * 
 * //merge properties of o2 into o1
 * mixin(o1,o2)
 * 
 * //clone o1:
 * var clone = mixin({},o1);
 * alert(clone.foo); //gives 'bar'
 * 
 */
/*
//helper function for mixin - adapted from jQuery core
function _isPlainObject(obj) {
	if(!obj || typeof obj !== 'object' || obj.nodeType) {
		return false;
	}
	try {
		// Not own constructor property must be Object
		if(obj.constructor && !Object.prototype.hasOwnProperty.call(obj, "constructor") && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
			return false;
		}
	} catch ( e ) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for(key in obj ) {}

	return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
}

//helper for main mixin function interface, defined below this function as "mixin"
function _merge(obj1, obj2, recursive) {
	for(var p in obj2) {
		if(obj2.hasOwnProperty(p)) {
			try {
				if(recursive && _isPlainObject(obj2[p])) {
					obj1[p] = _merge(obj1[p], obj2[p]);
				} 
				else {
					obj1[p] = obj2[p];
				}
			} 
			catch(e) {
				obj1[p] = obj2[p];
			}
		}
	}
	return obj1;
}

//main interface, exposed in module
function mixin() {
	var obj, mixins, deep = true;
	if (typeof arguments[0] === 'boolean') {
		deep = arguments[0];
		obj = arguments[1];
		mixins = Array.prototype.slice.call(arguments,2);
	}
	else {
		obj = arguments[0];
		mixins = Array.prototype.slice.call(arguments,1);
	}

	//mix in properties of given objects
	for (var i = 0, l = mixins.length; i<l; i++) {
		_merge(obj,mixins[i],deep);
	}

	return obj;
}
module.exports = mixin;

*/
	
	var empty = {};
	
	function mixin(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	
	UTILS.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			mixin(obj, arguments[i]);
		}
		return obj; // Object
	};
	
	//create a new object, combining the properties of the passed objects with the last arguments having
	//priority over the first ones
	UTILS.combine = function(/*Object*/ obj, /*Object...*/ props) {
		var newObj = {};
		for(var i=0, l=arguments.length; i<l; i++){
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};

	/*
		Branching logic based on OS
	*/
	var osname = Ti.Platform.osname;
	UTILS.os = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (typeof map[osname] != 'undefined') {
			if (typeof map[osname] == 'function') { return map[osname](); }
			else { return map[osname]; }
		}
		else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};
	
}());

module.exports = UTILS;
//Ti.include("/struct/ui/ui.js");
