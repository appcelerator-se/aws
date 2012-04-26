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
