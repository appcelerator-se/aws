var sha;
sha = "undefined" !== typeof exports ? exports : {};
sha.hexcase = 0;
sha.b64pad = "=";
sha.hex_sha1 = function(a) {
	return sha.rstr2hex(sha.rstr_sha1(sha.str2rstr_utf8(a)))
};
sha.b64_sha1 = function(a) {
	return sha.rstr2b64(sha.rstr_sha1(sha.str2rstr_utf8(a)))
};
sha.any_sha1 = function(a, d) {
	return sha.rstr2any(sha.rstr_sha1(sha.str2rstr_utf8(a)), d)
};
sha.hex_hmac_sha1 = function(a, d) {
	return sha.rstr2hex(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)))
};
sha.b64_hmac_sha1 = function(a, d) {
	return sha.rstr2b64(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)))
};
sha.any_hmac_sha1 = function(a, d, b) {
	return sha.rstr2any(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)), b)
};
sha.sha1_vm_test = function() {
	return "a9993e364706816aba3e25717850c26c9cd0d89d" == sha.hex_sha1("abc")
};
sha.rstr_sha1 = function(a) {
	return sha.binb2rstr(sha.binb_sha1(sha.rstr2binb(a), 8 * a.length))
};
sha.rstr_hmac_sha1 = function(a, d) {
	var b = sha.rstr2binb(a);
	16 < b.length && ( b = sha.binb_sha1(b, 8 * a.length));
	for(var c = Array(16), e = Array(16), f = 0; 16 > f; f++)
		c[f] = b[f] ^ 909522486, e[f] = b[f] ^ 1549556828;
	b = sha.binb_sha1(c.concat(sha.rstr2binb(d)), 512 + 8 * d.length);
	return sha.binb2rstr(sha.binb_sha1(e.concat(b), 672))
};
sha.rstr2hex = function(a) {
	for(var d = sha.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", b = "", c, e = 0; e < a.length; e++)
		c = a.charCodeAt(e), b += d.charAt(c >>> 4 & 15) + d.charAt(c & 15);
	return b
};
sha.rstr2b64 = function(a) {
	for(var d = "", b = a.length, c = 0; c < b; c += 3)
		for(var e = a.charCodeAt(c) << 16 | (c + 1 < b ? a.charCodeAt(c + 1) << 8 : 0) | (c + 2 < b ? a.charCodeAt(c + 2) : 0), f = 0; 4 > f; f++)
			d = 8 * c + 6 * f > 8 * a.length ? d + sha.b64pad : d + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - f) & 63);
	return d
};
sha.rstr2any = function(a, d) {
	var b = d.length, c = [], e, f, g, h, j = Array(Math.ceil(a.length / 2));
	for( e = 0; e < j.length; e++)
		j[e] = a.charCodeAt(2 * e) << 8 | a.charCodeAt(2 * e + 1);
	for(; 0 < j.length; ) {
		h = [];
		for( e = g = 0; e < j.length; e++)
			if( g = (g << 16) + j[e], f = Math.floor(g / b), g -= f * b, 0 < h.length || 0 < f)
				h[h.length] = f;
		c[c.length] = g;
		j = h
	}
	b = "";
	for( e = c.length - 1; 0 <= e; e--)
		b += d.charAt(c[e]);
	c = Math.ceil(8 * a.length / (Math.log(d.length) / Math.log(2)));
	for( e = b.length; e < c; e++)
		b = d[0] + b;
	return b
};
sha.str2rstr_utf8 = function(a) {
	for(var d = "", b = -1, c, e; ++b < a.length; )
		c = a.charCodeAt(b), e = b + 1 < a.length ? a.charCodeAt(b + 1) : 0, 55296 <= c && 56319 >= c && 56320 <= e && 57343 >= e && ( c = 65536 + ((c & 1023) << 10) + (e & 1023), b++), 127 >= c ? d += String.fromCharCode(c) : 2047 >= c ? d += String.fromCharCode(192 | c >>> 6 & 31, 128 | c & 63) : 65535 >= c ? d += String.fromCharCode(224 | c >>> 12 & 15, 128 | c >>> 6 & 63, 128 | c & 63) : 2097151 >= c && (d += String.fromCharCode(240 | c >>> 18 & 7, 128 | c >>> 12 & 63, 128 | c >>> 6 & 63, 128 | c & 63));
	return d
};
sha.str2rstr_utf16le = function(a) {
	for(var d = "", b = 0; b < a.length; b++)
		d += String.fromCharCode(a.charCodeAt(b) & 255, a.charCodeAt(b) >>> 8 & 255);
	return d
};
sha.str2rstr_utf16be = function(a) {
	for(var d = "", b = 0; b < a.length; b++)
		d += String.fromCharCode(a.charCodeAt(b) >>> 8 & 255, a.charCodeAt(b) & 255);
	return d
};
sha.rstr2binb = function(a) {
	for(var d = Array(a.length >> 2), b = 0; b < d.length; b++)
		d[b] = 0;
	for( b = 0; b < 8 * a.length; b += 8)
		d[b >> 5] |= (a.charCodeAt(b / 8) & 255) << 24 - b % 32;
	return d
};
sha.binb2rstr = function(a) {
	for(var d = "", b = 0; b < 32 * a.length; b += 8)
		d += String.fromCharCode(a[b >> 5] >>> 24 - b % 32 & 255);
	return d
};
sha.binb_sha1 = function(a, d) {
	a[d >> 5] |= 128 << 24 - d % 32;
	a[(d + 64 >> 9 << 4) + 15] = d;
	for(var b = Array(80), c = 1732584193, e = -271733879, f = -1732584194, g = 271733878, h = -1009589776, j = 0; j < a.length; j += 16) {
		for(var m = c, l = e, n = f, o = g, p = h, k = 0; 80 > k; k++) {
			b[k] = 16 > k ? a[j + k] : sha.bit_rol(b[k - 3] ^ b[k - 8] ^ b[k - 14] ^ b[k - 16], 1);
			var q = sha.safe_add(sha.safe_add(sha.bit_rol(c, 5), sha.sha1_ft(k, e, f, g)), sha.safe_add(sha.safe_add(h, b[k]), sha.sha1_kt(k))), h = g, g = f, f = sha.bit_rol(e, 30), e = c, c = q
		}
		c = sha.safe_add(c, m);
		e = sha.safe_add(e, l);
		f = sha.safe_add(f, n);
		g = sha.safe_add(g, o);
		h = sha.safe_add(h, p)
	}
	return [c, e, f, g, h]
};
sha.sha1_ft = function(a, d, b, c) {
	return 20 > a ? d & b | ~d & c : 40 > a ? d ^ b ^ c : 60 > a ? d & b | d & c | b & c : d ^ b ^ c
};
sha.sha1_kt = function(a) {
	return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
};
sha.safe_add = function(a, d) {
	var b = (a & 65535) + (d & 65535);
	return (a >> 16) + (d >> 16) + (b >> 16) << 16 | b & 65535
};
sha.bit_rol = function(a, d) {
	return a << d | a >>> 32 - d
};
function AWSSigner(a, d) {
	this.accessKeyId = a;
	this.secretKey = d
}

AWSSigner.prototype.sign = function(a, d, b) {
	d = d.toISO8601();
	a = this.addFields(a, d);
	a.hasOwnProperty("AWSAccountId") && a.hasOwnProperty("QueueName") && (
	delete a.AWSAccountId,
	delete a.QueueName);
	a.Signature = this.generateSignature(this.canonicalize(a, b));
	return a
};
AWSSigner.prototype.addFields = function(a, d) {
	a.AWSAccessKeyId = this.accessKeyId;
	a.SignatureVersion = this.version;
	a.SignatureMethod = "HmacSHA1";
	a.Timestamp = d;
	return a
};
AWSSigner.prototype.generateSignature = function(a) {
	return sha.b64_hmac_sha1(this.secretKey, a)
};
AWSV2Signer.prototype = new AWSSigner;
function AWSV2Signer(a, d) {
	AWSSigner.call(this, a, d);
	this.version = 2
}

function urlEncode(a) {
	return encodeURIComponent(a).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A")
}

AWSV2Signer.prototype.canonicalize = function(a, d) {
	for(var b = d.verb, c = d.host.toLowerCase(), b = b + "\n" + c + "\n" + d.uriPath + "\n", c = filterAndSortKeys(a, signatureFilter, caseSensitiveComparator), e = !0, f = 0; f < c.length; f++) {
		e ? e = !1 : b += "&";
		var g = c[f], b = b + urlEncode(g);
		null !== a[g] && (b += "=" + urlEncode(a[g]))
	}
	return b
};
function filterAndSortKeys(a, d, b) {
	var c = [], e;
	for(e in a)d(e, a[e]) || c.push(e);
	return c.sort(b)
}

function signatureFilter(a, d) {
	return "Signature" === a || null === d
}

function caseInsensitiveComparator(a, d) {
	return simpleComparator(a.toLowerCase(), d.toLowerCase())
}

function caseSensitiveComparator(a, d) {
	var b = a.length;
	d.length < b && ( b = d.length);
	for(var c = 0; c < b; c++) {
		var e = simpleComparator(a.charCodeAt(c), d.charCodeAt(c));
		if(0 !== e)
			return e
	}
	return a.length == d.length ? 0 : d.length > a.length ? 1 : -1
}

function simpleComparator(a, d) {
	return a < d ? -1 : a > d ? 1 : 0
}
Date.prototype.toISODate = new Function("with (this)\n    return getFullYear()+'-'+addZero(getMonth()+1)+'-'+addZero(getDate())+'T'+addZero(getHours())+':'+addZero(getMinutes())+':'+addZero(getSeconds())+'.000Z'");
function addZero(a) {
	return (0 > a || 9 < a ? "" : "0") + a
}
Date.prototype.toISO8601 = function() {
	return this.getUTCFullYear() + "-" + pad(this.getUTCMonth() + 1) + "-" + pad(this.getUTCDate()) + "T" + pad(this.getUTCHours()) + ":" + pad(this.getUTCMinutes()) + ":" + pad(this.getUTCSeconds()) + ".000Z"
};
function pad(a) {
	return (0 > a || 9 < a ? "" : "0") + a
}

var md5;
md5 = "undefined" !== typeof exports ? exports : {};
var hexcase = 0, b64pad = "=";
hex_md5 = function(a) {
	return rstr2hex(rstr_md5(str2rstr_utf8(a)))
};
md5.b64_md5 = function(a) {
	return rstr2b64(rstr_md5(str2rstr_utf8(a)))
};
function any_md5(a, d) {
	return rstr2any(rstr_md5(str2rstr_utf8(a)), d)
}

function hex_hmac_md5(a, d) {
	return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(d)))
}

b64_hmac_md5 = function(a, d) {
	return rstr2b64(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(d)))
};
function any_hmac_md5(a, d, b) {
	return rstr2any(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(d)), b)
}

function md5_vm_test() {
	return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc").toLowerCase()
}

function rstr_md5(a) {
	return binl2rstr(binl_md5(rstr2binl(a), 8 * a.length))
}

function rstr_hmac_md5(a, d) {
	var b = rstr2binl(a);
	16 < b.length && ( b = binl_md5(b, 8 * a.length));
	for(var c = Array(16), e = Array(16), f = 0; 16 > f; f++)
		c[f] = b[f] ^ 909522486, e[f] = b[f] ^ 1549556828;
	b = binl_md5(c.concat(rstr2binl(d)), 512 + 8 * d.length);
	return binl2rstr(binl_md5(e.concat(b), 640))
}

function rstr2hex(a) {
	try { hexcase
	} catch(d) {
		hexcase = 0
	}
	for(var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", e, f = 0; f < a.length; f++)
		e = a.charCodeAt(f), c += b.charAt(e >>> 4 & 15) + b.charAt(e & 15);
	return c
}

function rstr2b64(a) {
	try { b64pad
	} catch(d) {
		b64pad = ""
	}
	for(var b = "", c = a.length, e = 0; e < c; e += 3)
		for(var f = a.charCodeAt(e) << 16 | (e + 1 < c ? a.charCodeAt(e + 1) << 8 : 0) | (e + 2 < c ? a.charCodeAt(e + 2) : 0), g = 0; 4 > g; g++)
			b = 8 * e + 6 * g > 8 * a.length ? b + b64pad : b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >>> 6 * (3 - g) & 63);
	return b
}

function rstr2any(a, d) {
	var b = d.length, c, e, f, g, h, j = Array(Math.ceil(a.length / 2));
	for( c = 0; c < j.length; c++)
		j[c] = a.charCodeAt(2 * c) << 8 | a.charCodeAt(2 * c + 1);
	var m = Math.ceil(8 * a.length / (Math.log(d.length) / Math.log(2))), l = Array(m);
	for( e = 0; e < m; e++) {
		h = [];
		for( c = g = 0; c < j.length; c++)
			if( g = (g << 16) + j[c], f = Math.floor(g / b), g -= f * b, 0 < h.length || 0 < f)
				h[h.length] = f;
		l[e] = g;
		j = h
	}
	b = "";
	for( c = l.length - 1; 0 <= c; c--)
		b += d.charAt(l[c]);
	return b
}

function str2rstr_utf8(a) {
	for(var d = "", b = -1, c, e; ++b < a.length; )
		c = a.charCodeAt(b), e = b + 1 < a.length ? a.charCodeAt(b + 1) : 0, 55296 <= c && 56319 >= c && 56320 <= e && 57343 >= e && ( c = 65536 + ((c & 1023) << 10) + (e & 1023), b++), 127 >= c ? d += String.fromCharCode(c) : 2047 >= c ? d += String.fromCharCode(192 | c >>> 6 & 31, 128 | c & 63) : 65535 >= c ? d += String.fromCharCode(224 | c >>> 12 & 15, 128 | c >>> 6 & 63, 128 | c & 63) : 2097151 >= c && (d += String.fromCharCode(240 | c >>> 18 & 7, 128 | c >>> 12 & 63, 128 | c >>> 6 & 63, 128 | c & 63));
	return d
}

function str2rstr_utf16le(a) {
	for(var d = "", b = 0; b < a.length; b++)
		d += String.fromCharCode(a.charCodeAt(b) & 255, a.charCodeAt(b) >>> 8 & 255);
	return d
}

function str2rstr_utf16be(a) {
	for(var d = "", b = 0; b < a.length; b++)
		d += String.fromCharCode(a.charCodeAt(b) >>> 8 & 255, a.charCodeAt(b) & 255);
	return d
}

function rstr2binl(a) {
	for(var d = Array(a.length >> 2), b = 0; b < d.length; b++)
		d[b] = 0;
	for( b = 0; b < 8 * a.length; b += 8)
		d[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
	return d
}

function binl2rstr(a) {
	for(var d = "", b = 0; b < 32 * a.length; b += 8)
		d += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
	return d
}

function binl_md5(a, d) {
	a[d >> 5] |= 128 << d % 32;
	a[(d + 64 >>> 9 << 4) + 14] = d;
	for(var b = 1732584193, c = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16)
		var h = b, j = c, m = e, l = f, b = md5_ff(b, c, e, f, a[g + 0], 7, -680876936), f = md5_ff(f, b, c, e, a[g + 1], 12, -389564586), e = md5_ff(e, f, b, c, a[g + 2], 17, 606105819), c = md5_ff(c, e, f, b, a[g + 3], 22, -1044525330), b = md5_ff(b, c, e, f, a[g + 4], 7, -176418897), f = md5_ff(f, b, c, e, a[g + 5], 12, 1200080426), e = md5_ff(e, f, b, c, a[g + 6], 17, -1473231341), c = md5_ff(c, e, f, b, a[g + 7], 22, -45705983), b = md5_ff(b, c, e, f, a[g + 8], 7, 1770035416), f = md5_ff(f, b, c, e, a[g + 9], 12, -1958414417), e = md5_ff(e, f, b, c, a[g + 10], 17, -42063), c = md5_ff(c, e, f, b, a[g + 11], 22, -1990404162), b = md5_ff(b, c, e, f, a[g + 12], 7, 1804603682), f = md5_ff(f, b, c, e, a[g + 13], 12, -40341101), e = md5_ff(e, f, b, c, a[g + 14], 17, -1502002290), c = md5_ff(c, e, f, b, a[g + 15], 22, 1236535329), b = md5_gg(b, c, e, f, a[g + 1], 5, -165796510), f = md5_gg(f, b, c, e, a[g + 6], 9, -1069501632), e = md5_gg(e, f, b, c, a[g + 11], 14, 643717713), c = md5_gg(c, e, f, b, a[g + 0], 20, -373897302), b = md5_gg(b, c, e, f, a[g + 5], 5, -701558691), f = md5_gg(f, b, c, e, a[g + 10], 9, 38016083), e = md5_gg(e, f, b, c, a[g + 15], 14, -660478335), c = md5_gg(c, e, f, b, a[g + 4], 20, -405537848), b = md5_gg(b, c, e, f, a[g + 9], 5, 568446438), f = md5_gg(f, b, c, e, a[g + 14], 9, -1019803690), e = md5_gg(e, f, b, c, a[g + 3], 14, -187363961), c = md5_gg(c, e, f, b, a[g + 8], 20, 1163531501), b = md5_gg(b, c, e, f, a[g + 13], 5, -1444681467), f = md5_gg(f, b, c, e, a[g + 2], 9, -51403784), e = md5_gg(e, f, b, c, a[g + 7], 14, 1735328473), c = md5_gg(c, e, f, b, a[g + 12], 20, -1926607734), b = md5_hh(b, c, e, f, a[g + 5], 4, -378558), f = md5_hh(f, b, c, e, a[g + 8], 11, -2022574463), e = md5_hh(e, f, b, c, a[g + 11], 16, 1839030562), c = md5_hh(c, e, f, b, a[g + 14], 23, -35309556), b = md5_hh(b, c, e, f, a[g + 1], 4, -1530992060), f = md5_hh(f, b, c, e, a[g + 4], 11, 1272893353), e = md5_hh(e, f, b, c, a[g + 7], 16, -155497632), c = md5_hh(c, e, f, b, a[g + 10], 23, -1094730640), b = md5_hh(b, c, e, f, a[g + 13], 4, 681279174), f = md5_hh(f, b, c, e, a[g + 0], 11, -358537222), e = md5_hh(e, f, b, c, a[g + 3], 16, -722521979), c = md5_hh(c, e, f, b, a[g + 6], 23, 76029189), b = md5_hh(b, c, e, f, a[g + 9], 4, -640364487), f = md5_hh(f, b, c, e, a[g + 12], 11, -421815835), e = md5_hh(e, f, b, c, a[g + 15], 16, 530742520), c = md5_hh(c, e, f, b, a[g + 2], 23, -995338651), b = md5_ii(b, c, e, f, a[g + 0], 6, -198630844), f = md5_ii(f, b, c, e, a[g + 7], 10, 1126891415), e = md5_ii(e, f, b, c, a[g + 14], 15, -1416354905), c = md5_ii(c, e, f, b, a[g + 5], 21, -57434055), b = md5_ii(b, c, e, f, a[g + 12], 6, 1700485571), f = md5_ii(f, b, c, e, a[g + 3], 10, -1894986606), e = md5_ii(e, f, b, c, a[g + 10], 15, -1051523), c = md5_ii(c, e, f, b, a[g + 1], 21, -2054922799), b = md5_ii(b, c, e, f, a[g + 8], 6, 1873313359), f = md5_ii(f, b, c, e, a[g + 15], 10, -30611744), e = md5_ii(e, f, b, c, a[g + 6], 15, -1560198380), c = md5_ii(c, e, f, b, a[g + 13], 21, 1309151649), b = md5_ii(b, c, e, f, a[g + 4], 6, -145523070), f = md5_ii(f, b, c, e, a[g + 11], 10, -1120210379), e = md5_ii(e, f, b, c, a[g + 2], 15, 718787259), c = md5_ii(c, e, f, b, a[g + 9], 21, -343485551), b = safe_add(b, h), c = safe_add(c, j), e = safe_add(e, m), f = safe_add(f, l);
	return [b, c, e, f]
}

function md5_cmn(a, d, b, c, e, f) {
	return safe_add(bit_rol(safe_add(safe_add(d, a), safe_add(c, f)), e), b)
}

function md5_ff(a, d, b, c, e, f, g) {
	return md5_cmn(d & b | ~d & c, a, d, e, f, g)
}

function md5_gg(a, d, b, c, e, f, g) {
	return md5_cmn(d & c | b & ~c, a, d, e, f, g)
}

function md5_hh(a, d, b, c, e, f, g) {
	return md5_cmn(d ^ b ^ c, a, d, e, f, g)
}

function md5_ii(a, d, b, c, e, f, g) {
	return md5_cmn(b ^ (d | ~c), a, d, e, f, g)
}

function safe_add(a, d) {
	var b = (a & 65535) + (d & 65535);
	return (a >> 16) + (d >> 16) + (b >> 16) << 16 | b & 65535
}

function bit_rol(a, d) {
	return a << d | a >>> 32 - d
}

var utf8;
utf8 = "undefined" !== typeof exports ? exports : {};
utf8.encode = function(a) {
	for(var a = a.replace(/\r\n/g, "\n"), d = "", b = 0; b < a.length; b++) {
		var c = a.charCodeAt(b);
		128 > c ? d += String.fromCharCode(c) : (127 < c && 2048 > c ? d += String.fromCharCode(c >> 6 | 192) : (d += String.fromCharCode(c >> 12 | 224), d += String.fromCharCode(c >> 6 & 63 | 128)), d += String.fromCharCode(c & 63 | 128))
	}
	return d
};
utf8.decode = function(a) {
	for(var d = "", b = 0, c = c1 = c2 = 0; b < a.length; )
		c = a.charCodeAt(b), 128 > c ? (d += String.fromCharCode(c), b++) : 191 < c && 224 > c ? ( c2 = a.charCodeAt(b + 1), d += String.fromCharCode((c & 31) << 6 | c2 & 63), b += 2) : ( c2 = a.charCodeAt(b + 1), c3 = a.charCodeAt(b + 2), d += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63), b += 3);
	return d
};
var BedFrame;
BedFrame = "undefined" !== typeof BedFrame ? exports : {};
BedFrame.PROPERTY_TYPE_ONLY_LATEST = 0;
BedFrame.PROPERTY_TYPE_SLASH_COMBINE = 1;
BedFrame.PROPERTY_TYPE_IGNORE = 2;
BedFrame.build = function bedFrameTransformObject(d, b) {
	var c = b.children || [], e;
	for(e in c)
	if(c.hasOwnProperty(e)) {
		var f = c[e], g = f.propertyTypes || b.propertyTypes || {};
		g.children = BedFrame.PROPERTY_TYPE_IGNORE;
		for(var h in b)
		if(b.hasOwnProperty(h))
			switch(g[h]||BedFrame.PROPERTY_TYPE_ONLY_LATEST) {
				case BedFrame.PROPERTY_TYPE_ONLY_LATEST:
					f[h] =
					void 0 === f[h] ? b[h] : f[h];
					break;
				case BedFrame.PROPERTY_TYPE_SLASH_COMBINE:
					var j = [];
					b[h] && j.push(b[h]);
					f[h] && j.push(f[h]);
					f[h] = j.join("/")
			}
		f.method && !f.children ? d[f.method] = function(b) {
			return function() {
				return b.executor.apply(b, arguments)
			}
		}(f) : f.property && bedFrameTransformObject(d[f.property] = {}, f)
	}
};
var xmlToJS;
xmlToJS = "undefined" !== typeof exports ? exports : {};
xmlToJS.convert = function convert(d) {
	var b = {}, c = d.attributes;
	if(c && c.length)
		for(var e = 1, f = c.length; e < f; e++) {
			var g = c.item(e);
			b[g.name.split(":").join("_")] = g.getValue()
		}
	if(( d = d.childNodes) && d.length) {
		e = 0;
		for( f = d.length; e < f; e++)
			switch(g=d.item(e),g.nodeType) {
				case g.ELEMENT_NODE:
					var h = g.nodeName.split(":").join("_");
					void 0 === b[h] && (b[h] = []);
					b[h].push(convert(g));
					break;
				case g.TEXT_NODE:
					return g.nodeValue
			}
	}
	return (!c || !c.length) && (!d || !d.length) ? null : b
};
xmlToJS.toJSON = function(a, d) {
	if(d)
		return xmlToJS.convert(Ti.XML.parseString(a).documentElement);
	for(var b = ""; -1 < a.indexOf("<"); )
		String.prototype.trim = function() {
			return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
		}, b += a.slice(a.indexOf("<"), a.indexOf(">") + 1), b += a.slice(a.indexOf(">") + 1, a.indexOf("<", a.indexOf(">"))).trim(), a = a.substring(a.indexOf(">") + 1);
	return xmlToJS.convert(Ti.XML.parseString(b).documentElement)
};
var utility;
utility = "undefined" !== typeof exports ? exports : {};
utility.generatePayload = function(a, d, b, c) {
	var c = c.replace(/.*:\/\//, ""), e = null, a = (new AWSV2Signer(d, b)).sign(a, new Date, {
		verb : "POST",
		host : c,
		uriPath : "/"
	}), d = [], f;
	for(f in a)null !== a[f] ? d.push(encodeURIComponent(f) + "=" + encodeURIComponent(a[f])) : d.push(encodeURIComponent(f));
	return e = d.join("&")
};
utility.generateSignedURL = function(a, d, b, c, e, f) {
	var g = e.replace(/.*:\/\//, ""), h = null, h = "/";
	d.Action = a;
	d.Version = f;
	a = new AWSV2Signer(b, c);
	d.hasOwnProperty("AWSAccountId") && d.hasOwnProperty("QueueName") && (h += d.AWSAccountId + "/" + d.QueueName + "/", e += "/" + d.AWSAccountId + "/" + d.QueueName + "/");
	var d = a.sign(d, new Date, {
		verb : "GET",
		host : g,
		uriPath : h
	}), g = [], j;
	for(j in d)null !== d[j] ? g.push(encodeURIComponent(j) + "=" + encodeURIComponent(d[j])) : g.push(encodeURIComponent(j));
	h = g.join("&");
	return e + ("?" + h)
};
utility.generateSESParams = function(a) {
	a.hasOwnProperty("emailAddress") ? a.paramString += "&EmailAddress=" + a.emailAddress : a.hasOwnProperty("destination") && (a.paramString += generateDestination(a.destination, a.isRawMessage), a.hasOwnProperty("message") && (a.message.hasOwnProperty("body") && (a.paramString += generateMessageBody(a.message.body)), a.message.hasOwnProperty("subject") && (a.paramString += "&Message.Subject.Data=" + a.message.subject)), a.hasOwnProperty("replyTo") && (a.paramString += generateReplyTo(a.replyTo)), a.hasOwnProperty("returnPath") && (a.paramString += "&ReturnPath=" + a.returnPath), a.hasOwnProperty("source") && (a.paramString += "&Source=" + a.source));
	a.hasOwnProperty("rawMessage") && (a.paramString += "&RawMessage.Data=" + a.rawMessage)
};
function generateDestination(a, d) {
	var b = "";
	if(d)
		for( i = 1; i <= a.length; i++)
			b += "&Destinations.member." + i + "=" + a[i - 1];
	else
		for(key in a) {
			var c = key.substr(0, 1).toUpperCase() + key.substr(1);
			for( i = 1; i <= a[key].length; i++)
				b += "&Destination." + c + "Addresses.member." + i + "=" + a[key][i - 1]
		}
	return b
}

function generateReplyTo(a) {
	var d = "";
	for( i = 1; i <= a.length; i++)
		d += "&ReplyToAddresses.member." + i + "=" + a[i - 1];
	return d
}

function generateMessageBody(a) {
	var d = "";
	for(key in a)var b = key.substr(0, 1).toUpperCase() + key.substr(1), d = d + ("&Message.Body." + b + ".Data=" + a[key]);
	return d
}

utility.generateSQSURL = function(a, d, b, c, e, f) {
	d.hasOwnProperty("AWSAccountId") && d.hasOwnProperty("QueueName") && (e += "/" + d.AWSAccountId + "/" + d.QueueName + "/",
	delete d.AWSAccountId,
	delete d.QueueName);
	var a = e + "?SignatureVersion=1&Action=" + a + "&Version=" + encodeURIComponent(f) + "&", g;
	for(g in d) e = g, ( f = d[g]) && (a += e + "=" + encodeURIComponent(f) + "&");
	d = (new Date((new Date).getTime() + 6E4 * (new Date).getTimezoneOffset())).toISODate();
	a += "Timestamp=" + encodeURIComponent(d) + "&SignatureMethod=HmacSHA1&AWSAccessKeyId=" + encodeURIComponent(b);
	b = getStringToSignForSQS(a);
	c = sha.b64_hmac_sha1(c, b);
	return a += "&Signature=" + encodeURIComponent(c)
};
function getStringToSignForSQS(a) {
	var d = "", a = a.split("?")[1].split("&");
	a.sort(ignoreCaseSort);
	for(var b = 0; b < a.length; b++) {
		var c = a[b].split("=");
		"Signature" == c[0] ||
		void 0 == c[1] || (d += c[0] + decodeURIComponent(c[1]))
	}
	return d
}

function ignoreCaseSort(a, d) {
	var b = 0, a = a.toLowerCase(), d = d.toLowerCase();
	a > d && ( b = 1);
	a < d && ( b = -1);
	return b
}

utility.generateS3Params = function(a) {
	a.hasOwnProperty("bucketName") ? a.hasOwnProperty("objectName") ? (a.canonicalizedAmzHeaders = a.hasOwnProperty("copySource") ? "\nx-amz-copy-source:" + a.copySource : "", a.hasOwnProperty("uploadId") ? a.hasOwnProperty("partNumber") ? (a.stringToSign = a.verb + "\n" + a.contentMD5 + "\n" + a.contentType + "\n" + a.curDate + a.canonicalizedAmzHeaders + "\n/" + a.bucketName + "/" + a.objectName + a.subResource + "partNumber=" + a.partNumber + "&uploadId=" + a.uploadId, a.url = a.url.concat(a.bucketName + "/" + a.objectName + a.subResource + "partNumber=" + a.partNumber + "&uploadId=" + a.uploadId)) : (a.stringToSign = a.verb + "\n" + a.contentMD5 + "\n" + a.contentType + "\n" + a.curDate + a.canonicalizedAmzHeaders + "\n/" + a.bucketName + "/" + a.objectName + a.subResource + "uploadId=" + a.uploadId, a.url = a.url.concat(a.bucketName + "/" + a.objectName + a.subResource + "uploadId=" + a.uploadId)) : (a.stringToSign = a.verb + "\n" + a.contentMD5 + "\n" + a.contentType + "\n" + a.curDate + a.canonicalizedAmzHeaders + "\n/" + a.bucketName + "/" + a.objectName + a.subResource, a.url = a.url.concat(a.bucketName + "/" + a.objectName + a.subResource))) : (a.stringToSign = a.verb + "\n" + a.contentMD5 + "\n" + a.contentType + "\n" + a.curDate + "\n/" + a.bucketName + "/" + a.subResource, a.url = a.url.concat(a.bucketName + "/" + a.subResource)) : a.stringToSign = a.verb + "\n" + a.contentMD5 + "\n" + a.contentType + "\n" + a.curDate + "\n/" + a.subResource
};
validators = {
	required : function(a, d) {
		var b = d.params;
		for( x = 0; x < b.length; x++)
			if(
				void 0 == a[b[x]] || null == a[b[x]] || "" == a[b[x]])
				return b[x];
		return ""
	},
	rangeValidator : function(a, d) {
		var b = d.params;
		for( x = 0; x < b.length; x++) {
			if(a[b[x]].length < d.min || a[b[x]].length > d.max)
				return L("lengthValidation");
			for( i = 0; 29 > i; i++)
				if(-1 != a[b[x]].indexOf("!@#$%^&*()+=-[]\\';,./{}|\":<>?"[i]))
					return L("symbolValidation")
		}
		return ""
	},
	patternExistsValidator : function() {
	}
};
utility.validateParams = function(a, d) {
	var b = "", c;
	for(c in d)
	if( fnValidate = validators[c], data = d[c], res = fnValidate(a, data), "" == !res) {
		b = prepareMessage(res, c);
		break
	}
	return b
};
prepareMessage = function(a, d) {
	var b = "";
	return b = '<?xml version="1.0"?><Response><Errors><Error><Code>' + L(d) + "</Code><Message>" + a + "</Message></Error></Errors></Response>"
};
var _sessionOBJ = {
	utility : utility,
	bedFrame : BedFrame,
	xmlToJSON : xmlToJS,
	utf8 : utf8,
	sha : sha,
	md5 : md5,
	accessKeyId : null,
	secretKey : null
}, defaultQueryExecutor = function(a, d, b) {
	this.preparer && !this.prepared && (this.preparer(), this.prepared = !0);
	if(this.validations) {
		var c = _sessionOBJ.utility.validateParams(a, this.validations);
		if("" != c && b) {
			a = _sessionOBJ.xmlToJSON.toJSON(c, !0);
			b(a);
			return
		}
	}
	sUrl = "SQS" === this.property ? _sessionOBJ.utility.generateSQSURL(this.action, a, _sessionOBJ.accessKeyId, _sessionOBJ.secretKey, this.endpoint, this.version) : _sessionOBJ.utility.generateSignedURL(this.action, a, _sessionOBJ.accessKeyId, _sessionOBJ.secretKey, this.endpoint, this.version);
	httpClient = Ti.Network.createHTTPClient({
		onload : function() {
			Ti.API.info(this.responseText);
			jsResp = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !0);
			d && d(jsResp)
		},
		onerror : function() {
			if(b) {
				var a = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !0);
				a.summary = this.responseText;
				b(a)
			}
		},
		timeout : 5E3
	});
	httpClient.open(this.verb, sUrl);
	httpClient.send()
}, snsExecutor = function(a, d, b) {
	this.preparer && !this.prepared && (this.preparer(), this.prepared = !0);
	this.validations && _sessionOBJ.utility.validateParams(a, this.validations);
	var c = Ti.Network.createHTTPClient();
	a.Action = this.action;
	a.Version = this.version;
	payload = _sessionOBJ.utility.generatePayload(a, _sessionOBJ.accessKeyId, _sessionOBJ.secretKey, this.endpoint);
	c.open(this.verb, this.endpoint);
	c.setRequestHeader("Host", "sns.us-east-1.amazonaws.com");
	c.onload = function() {
		jsResp = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !1);
		d(jsResp)
	};
	c.onerror = function() {
		if(b) {
			var a = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !1);
			//a.summary = this.responseText;
			b(a)
		}
	};
	c.send(payload)
}, s3Executor = function(a, d, b) {
	this.preparer && !this.prepared && (this.preparer(), this.prepared = !0);
	this.validations && _sessionOBJ.utility.validateParams(a, this.validations);
	var c = Ti.Network.createHTTPClient();
	a.contentType = "";
	this.contentType && (a.contentType = this.contentType);
	a.contentMD5 = "putBucketLifecycle" === this.method || "deleteMultipleObjects" === this.method ? _sessionOBJ.md5.b64_md5(a.xmlTemplate) : "";
	a.hasOwnProperty("subResource") || (a.subResource = this.subResource);
	var e = (new Date).toUTCString();
	a.verb = this.verb;
	a.curDate = e;
	a.url = this.endpoint;
	a.stringToSign = "";
	a.verb = this.verb;
	if(this.uploadFile) {
		var f = a.file.read();
		a.contentType = f.mimeType;
		a.contentLength = a.file.size
	}
	_sessionOBJ.utility.generateS3Params(a);
	var g = _sessionOBJ.sha.b64_hmac_sha1(_sessionOBJ.utf8.encode(_sessionOBJ.secretKey), _sessionOBJ.utf8.encode(a.stringToSign)), g = "AWS " + _sessionOBJ.accessKeyId + ":" + g;
	c.open(this.verb, a.url);
	c.setRequestHeader("Authorization", g);
	c.setRequestHeader("Date", e);
	c.setRequestHeader("Host", "s3.amazonaws.com");
	this.contentType && c.setRequestHeader("Content-Type", a.contentType);
	this.uploadFile && (c.setRequestHeader("Content-Type", a.contentType), "android" === !Ti.Platform.osname && c.setRequestHeader("Content-Length", a.contentLength));
	("putBucketLifecycle" === this.method || "deleteMultipleObjects" === this.method) && c.setRequestHeader("Content-MD5", a.contentMD5);
	a.hasOwnProperty("copySource") && c.setRequestHeader("x-amz-copy-source", a.copySource);
	c.onload = function() {
		"GET" == this.connectionType || "POST" == this.connectionType ? d && d(_sessionOBJ.xmlToJSON.toJSON(this.responseText, !0)) : d && (c.getResponseHeader("ETag") && Titanium.API.info("ETag:" + c.getResponseHeader("ETag")), d(this.responseText))
	};
	c.onerror = function() {
		if(b) {
			var a = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !0);
			a.summary = this.responseText;
			b(a)
		}
	};
	a.hasOwnProperty("xmlTemplate") ? c.send(a.xmlTemplate) : this.uploadFile ? c.send(f) : c.send()
}, sesExecutor = function(a, d, b) {
	this.preparer && !this.prepared && (this.preparer(), this.prepared = !0);
	a.paramString = "";
	a.isRawMessage = this.isRawMessage;
	_sessionOBJ.utility.generateSESParams(a);
	var c = (new Date).toUTCString(), a = _sessionOBJ.utf8.encode("AWSAccessKeyId=" + _sessionOBJ.accessKeyId + "&Action=" + this.action + a.paramString + "&Timestamp=" + c), e = "AWS3-HTTPS AWSAccessKeyId=" + _sessionOBJ.accessKeyId + ",Algorithm=" + this.algorithm + ",Signature=" + _sessionOBJ.sha.b64_hmac_sha1(_sessionOBJ.secretKey, c), f = Titanium.Network.createHTTPClient();
	f.onload = function() {
		Ti.API.info(this.responseText);
		jsResp = _sessionOBJ.xmlToJSON.toJSON(this.responseText, !1);
		d && d(jsResp)
	};
	f.onerror = function() {
		b && (_sessionOBJ.xmlToJSON.toJSON(this.responseText, !1).summary = this.responseText, b(this.responseText))
	};
	f.open(this.verb, this.endpoint);
	f.setRequestHeader("Content-Type", this.contentType);
	f.setRequestHeader("Host", this.host);
	f.setRequestHeader("Date", c);
	f.setRequestHeader("X-Amzn-Authorization", e);
	f.send(a)
}, AWS = {
	authorize : function(a, d) {
		_sessionOBJ.accessKeyId = a;
		_sessionOBJ.secretKey = d
	}
};
_sessionOBJ.bedFrame.build(AWS, {
	verb : "GET",
	version : "2009-04-15",
	executor : defaultQueryExecutor,
	preparer : function() {
		this.action || ( initCap = this.method.substr(0, 1).toUpperCase(), this.action = initCap + this.method.substr(1))
	},
	children : [{
		property : "SimpleDB",
		endpoint : "https://sdb.amazonaws.com",
		children : [{
			method : "batchPutAttributes",
			validations : {
				required : {
					params : ["DomainName"]
				},
				patternExistsValidator : {
					params : ["Item.*.Attribute.*.Name", "Item.*.ItemName"]
				}
			}
		}, {
			method : "putAttributes",
			validations : {
				required : {
					params : ["DomainName", "ItemName"]
				},
				patternExistsValidator : {
					params : ["Attribute.*.Name", "Attribute.*.Value"]
				}
			}
		}, {
			method : "batchDeleteAttributes",
			validations : {
				required : {
					params : ["DomainName"]
				},
				patternExistsValidator : {
					params : ["Item.*.ItemName"]
				}
			}
		}, {
			method : "listDomains",
			arrayOverride : ["/ListDomainsResponse/ListDomainsResult/DomainName"]
		}, {
			method : "createDomain",
			validations : {
				required : {
					params : ["DomainName"]
				},
				rangeValidator : {
					min : 3,
					max : 255,
					params : ["DomainName"]
				}
			}
		}, {
			method : "deleteDomain",
			validations : {
				required : {
					params : ["DomainName"]
				}
			}
		}, {
			method : "select",
			validations : {
				required : {
					params : ["SelectExpression"]
				}
			}
		}, {
			method : "domainMetadata",
			validations : {
				required : {
					params : ["DomainName"]
				}
			}
		}, {
			method : "getAttributes",
			validations : {
				required : {
					params : ["DomainName", "ItemName"]
				},
				patternExistsValidator : {
					params : ["Attribute.*.Name"]
				}
			}
		}, {
			method : "deleteAttributes",
			validations : {
				required : {
					params : ["DomainName", "ItemName"]
				}
			}
		}]
	}, {
		property : "S3",
		endpoint : "https://s3.amazonaws.com/",
		executor : s3Executor,
		uploadFile : !1,
		subResource : "",
		children : [{
			method : "getService"
		}, {
			method : "deleteBucket",
			verb : "DELETE",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "deleteBucketLifecycle",
			verb : "DELETE",
			subResource : "?lifecycle",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "deleteBucketPolicy",
			verb : "DELETE",
			subResource : "?policy",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "deleteBucketWebsite",
			verb : "DELETE",
			subResource : "?website",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucket",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketAcl",
			subResource : "?acl",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketLifecycle",
			subResource : "?lifecycle",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketPolicy",
			subResource : "?policy",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketLocation",
			subResource : "?location",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketLogging",
			subResource : "?logging",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketNotification",
			subResource : "?notification",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketObjectVersions",
			subResource : "?versions",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketRequestPayment",
			subResource : "?requestPayment",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketVersioning",
			subResource : "?versioning",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "getBucketWebsite",
			subResource : "?website",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "headBucket",
			verb : "HEAD",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "listMultipartUploads",
			subResource : "?uploads",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "putBucket",
			verb : "PUT",
			validations : {
				required : {
					params : ["bucketName"]
				}
			}
		}, {
			method : "putBucketAcl",
			verb : "PUT",
			subResource : "?acl",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketLifecycle",
			verb : "PUT",
			subResource : "?lifecycle",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketPolicy",
			verb : "PUT",
			subResource : "?policy",
			contentType : "application/json",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketLogging",
			verb : "PUT",
			subResource : "?logging",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketNotification",
			verb : "PUT",
			subResource : "?notification",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketRequestPayment",
			verb : "PUT",
			subResource : "?requestPayment",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketVersioning",
			verb : "PUT",
			subResource : "?versioning",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "putBucketWebsite",
			verb : "PUT",
			subResource : "?website",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "deleteObject",
			verb : "DELETE",
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "deleteMultipleObjects",
			verb : "POST",
			subResource : "?delete",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "xmlTemplate"]
				}
			}
		}, {
			method : "getObject",
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "getObjectAcl",
			subResource : "?acl",
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "headObject",
			verb : "HEAD",
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "putObject",
			verb : "PUT",
			uploadFile : !0,
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "putObjectAcl",
			contentType : "application/xml",
			verb : "PUT",
			subResource : "?acl",
			validations : {
				required : {
					params : ["bucketName", "objectName", "xmlTemplate"]
				}
			}
		}, {
			method : "putObjectCopy",
			verb : "PUT",
			validations : {
				required : {
					params : ["bucketName", "objectName", "copySource"]
				}
			}
		}, {
			method : "initiateMultipartUpload",
			verb : "POST",
			subResource : "?uploads",
			validations : {
				required : {
					params : ["bucketName", "objectName"]
				}
			}
		}, {
			method : "abortMultipartUpload",
			verb : "DELETE",
			subResource : "?",
			validations : {
				required : {
					params : ["bucketName", "objectName", "uploadId", "partNumber"]
				}
			}
		}, {
			method : "completeMultipleUpload",
			verb : "POST",
			subResource : "?",
			contentType : "application/xml",
			validations : {
				required : {
					params : ["bucketName", "objectName", "uploadId", "partNumber", "xmlTemplate"]
				}
			}
		}, {
			method : "uploadPart",
			verb : "PUT",
			uploadFile : !0,
			subResource : "?",
			validations : {
				required : {
					params : ["bucketName", "objectName", "uploadId", "partNumber", "file"]
				}
			}
		}, {
			method : "uploadPartCopy",
			verb : "PUT",
			subResource : "?",
			validations : {
				required : {
					params : ["bucketName", "objectName", "uploadId", "partNumber"]
				}
			}
		}, {
			method : "listParts",
			subResource : "?",
			validations : {
				required : {
					params : ["bucketName", "objectName", "uploadId", "partNumber"]
				}
			}
		}]
	}, {
		property : "SES",
		endpoint : "https://email.us-east-1.amazonaws.com",
		verb : "POST",
		host : "email.us-east-1.amazonaws.com",
		algorithm : "HmacSHA1",
		contentType : "application/x-www-form-urlencoded",
		executor : sesExecutor,
		isRawMessage : !1,
		children : [{
			method : "deleteVerifiedEmailAddress",
			validations : {
				required : {
					params : ["emailAddress"]
				}
			}
		}, {
			method : "getSendQuota"
		}, {
			method : "getSendStatistics"
		}, {
			method : "listVerifiedEmailAddresses"
		}, {
			method : "sendEmail",
			validations : {
				required : {
					params : ["source", "destination", "message"]
				}
			}
		}, {
			method : "sendRawEmail",
			isRawMessage : !0,
			validations : {
				required : {
					params : ["rawMessage"]
				}
			}
		}, {
			method : "verifyEmailAddress",
			validations : {
				required : {
					params : ["emailAddress"]
				}
			}
		}]
	}, {
		property : "SQS",
		endpoint : "http://sqs.us-east-1.amazonaws.com",
		version : "2009-02-01",
		children : [{
			method : "createQueue",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["QueueName"]
				}
			}
		}, {
			method : "listQueues",
			version : "2011-10-01",
			arrayOverride : ["/ListQueuesResponse/ListQueuesResult/QueueUrl"]
		}, {
			method : "getQueueUrl",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["QueueName"]
				}
			}
		}, {
			method : "addPermission",
			version : "2011-10-01"
		}, {
			method : "setQueueAttributes",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName", "Attribute.Name", "Attribute.Value"]
				}
			}
		}, {
			method : "getQueueAttributes",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			},
			patternExistsValidator : {
				params : ["AttributeName.*"]
			}
		}, {
			method : "sendMessage",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName", "MessageBody"]
				}
			}
		}, {
			method : "sendMessageBatch",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			},
			patternExistsValidator : {
				params : ["SendMessageBatchRequestEntry.*.Id", "SendMessageBatchRequestEntry.*.MessageBody"]
			}
		}, {
			method : "receiveMessage",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			}
		}, {
			method : "deleteMessage",
			validations : {
				required : {
					params : ["ReceiptHandle", "AWSAccountId", "QueueName"]
				}
			}
		}, {
			method : "deleteMessageBatch",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			},
			patternExistsValidator : {
				params : ["DeleteMessageBatchRequestEntry.*.Id", "DeleteMessageBatchRequestEntry.*.ReceiptHandle"]
			}
		}, {
			method : "deleteQueue",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			}
		}, {
			method : "changeMessageVisibility",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName", "ReceiptHandle", "VisibilityTimeout"]
				}
			}
		}, {
			method : "changeMessageVisibilityBatch",
			version : "2011-10-01",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName"]
				}
			},
			patternExistsValidator : {
				params : ["ChangeMessageVisibilityBatchRequestEntry.*.Id", "ChangeMessageVisibilityBatchRequestEntry.*.ReceiptHandle", "ChangeMessageVisibilityBatchRequestEntry.*.VisibilityTimeout"]
			}
		}, {
			method : "removePermission",
			validations : {
				required : {
					params : ["AWSAccountId", "QueueName", "Lable"]
				}
			}
		}]
	}, {
		property : "SNS",
		endpoint : "http://sns.us-east-1.amazonaws.com",
		verb : "POST",
		executor : snsExecutor,
		version : "2010-03-31",
		children : [{
			method : "addPermission",
			validations : {
				required : {
					params : ["Label", "TopicArn"]
				},
				patternExistsValidator : {
					params : ["AWSAccountId.member.*", "ActionName.member.*"]
				}
			}
		}, {
			method : "confirmSubscription",
			validations : {
				required : {
					params : ["Token", "TopicArn"]
				}
			}
		}, {
			method : "createTopic",
			validations : {
				required : {
					params : ["Name"]
				}
			}
		}, {
			method : "deleteTopic",
			validations : {
				required : {
					params : ["TopicArn"]
				}
			}
		}, {
			method : "getSubscriptionAttributes",
			validations : {
				required : {
					params : ["SubscriptionArn"]
				}
			}
		}, {
			method : "getTopicAttributes",
			validations : {
				required : {
					params : ["TopicArn"]
				}
			}
		}, {
			method : "listSubscriptions"
		}, {
			method : "listSubscriptionsByTopic",
			validations : {
				required : {
					params : ["TopicArn"]
				}
			}
		}, {
			method : "listTopics"
		}, {
			method : "publish",
			validations : {
				required : {
					params : ["TopicArn", "Message"]
				}
			}
		}, {
			method : "removePermission",
			validations : {
				required : {
					params : ["Label", "TopicArn"]
				}
			}
		}, {
			method : "setSubscriptionAttributes",
			validations : {
				required : {
					params : ["AttributeName", "AttributeValue", "SubscriptionArn"]
				}
			}
		}, {
			method : "setTopicAttributes",
			validations : {
				required : {
					params : ["AttributeName", "AttributeValue", "TopicArn"]
				}
			}
		}, {
			method : "subscribe",
			validations : {
				required : {
					params : ["TopicArn", "Endpoint", "Protocol"]
				}
			}
		}, {
			method : "unsubscribe",
			validations : {
				required : {
					params : ["SubscriptionArn"]
				}
			}
		}]
	}]
});
module.exports = AWS; 