//single calls over bridge
var osname = Ti.Platform.osname,
	version = parseInt(Ti.Platform.version);

//simple boolean checks
var isandroid = function() {
	return osname === 'android';
};

var isios = function() {
	return osname === 'iphone' || osname === 'ipad';
};

var isretina = function() {
	if (Ti.Platform.displayCaps.density === 'high' || Ti.Platform.displayCaps.density === 'xhigh') {
		return true;
	}
};

var ismobileweb = function() {
	return osname === 'mobileweb';
};

var ishandheld = function() {
	return (osname === 'android' && (version < 3 || version > 3)) || osname === 'iphone';
};

var istablet = function() {
	return (osname === 'android' && version > 2 && version < 4) || osname === 'ipad';
};

//adding further namespaced functions to handheld and tablet checks
ishandheld.android = function() {
	return osname === 'android' && (version < 3 || version > 3);
};

ishandheld.ios = function() {
	return osname === 'iphone';
};

istablet.android = function() {
	return osname === 'android' && version > 2 && version < 4;
};

istablet.ios = function() {
	return osname === 'ipad';
};

/*
 * Branch values or logic based on platform - examples:
 *
 * var orientationModes = is({
 *   handheld:[Ti.UI.PORTRAIT],
 *   tablet:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
 * });
 *
 * var pointOffset = is({
 *   ios:100,
 *   android:120
 * });
 *
 * is({
 * 	 handheld: {
 * 	   ios: function() {
 * 	     //do iphone/ipod stuff
 *     },
 * 	   android: function() {
 * 	     //do android handheld stuff
 *     }
 *   },
 *   tablet: {
 * 	   ios: function() {
 * 	     //do ipad stuff
 *     },
 * 	   android: function() {
 * 	     //do android tablet stuff
 *     }
 *   }
 * });
 *
 */
var is = function(params) {
	var statement; //either the value or the func

	//check for platform branches first
	if (isandroid() && params.android) {
		statement = params.android;
	}
	else if (isios() && params.ios) {
		statement = params.ios;
	} else if (ismobileweb() && params.mobileweb) {
		statement = params.mobileweb;
	}

	//next, check handheld versus tablet
	else if (ishandheld() && params.handheld) {
		if (params.handheld.ios || params.handheld.android) {
			statement = (isios()) ? params.handheld.ios : params.handheld.android;
		}
		else {
			statement = params.handheld;
		}
	}
	else if (istablet() && params.tablet) {
		if (params.tablet.ios || params.tablet.android) {
			statement = (isios()) ? params.tablet.ios : params.tablet.android;
		}
		else {
			statement = params.tablet;
		}
	}

	//if we actually resolve to anything, take care of it
	if (statement) {
		if (typeof statement === 'function') {
			statement();
		}
		else {
			return statement;
		}
	}
};

//add boolean checks
is.iosretina = isretina();
is.android = isandroid;
is.ios = isios;
is.handheld = ishandheld;
is.tablet = istablet;
is.mobileweb = ismobileweb;
is.devicetype = is({
	handheld: 'handheld',
	tablet: 'tablet'
});
is.ics = (parseInt(Ti.Platform.version) < 4) && is.android() || is.ios() ? false : true;

exports.osname = osname;
exports.version = version;
exports.is = is;