var myProductName = "daveutils", myVersion = "0.4.62";  

/*  The MIT License (MIT)
	Copyright (c) 2014-2020 Dave Winer
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

exports.beginsWith = beginsWith; 
exports.endsWith = endsWith;
exports.stringCountFields = stringCountFields;
exports.stringDelete = stringDelete;
exports.stringMid = stringMid;
exports.padWithZeros = padWithZeros;
exports.getDatePath = getDatePath;
exports.secondsSince = secondsSince;
exports.bumpUrlString = bumpUrlString;
exports.stringContains = stringContains;
exports.sameDay = sameDay;
exports.sameMonth = sameMonth; //5/10/17 by DW
exports.dayGreaterThanOrEqual = dayGreaterThanOrEqual; //5/10/17 by DW
exports.jsonStringify = jsonStringify;
exports.stringNthField = stringNthField;
exports.getBoolean = getBoolean;
exports.isAlpha = isAlpha;
exports.isNumeric = isNumeric;
exports.stringLastField = stringLastField;
exports.multipleReplaceAll = multipleReplaceAll;
exports.replaceAll = replaceAll; //2/17/15 by DW
exports.kilobyteString = kilobyteString;
exports.megabyteString = megabyteString;
exports.gigabyteString = gigabyteString;
exports.stringLower = stringLower;
exports.stringUpper = stringUpper; //5/7/17 by DW
exports.filledString = filledString;
exports.innerCaseName = innerCaseName;
exports.copyScalars = copyScalars;
exports.stripMarkup = stripMarkup;
exports.hotUpText = hotUpText;
exports.sleepTillTopOfMinute = sleepTillTopOfMinute;
exports.random = random;
exports.stringPopLastField = stringPopLastField;
exports.trimWhitespace = trimWhitespace;
exports.dateYesterday = dateYesterday;
exports.maxStringLength = maxStringLength;
exports.stringPopExtension = stringPopExtension;
exports.getFileModDate = getFileModDate;
exports.getFacebookTimeString = getFacebookTimeString;
exports.viewDate = viewDate;
exports.sureFilePath = fsSureFilePath; //5/17/17 by DW
exports.getRandomSnarkySlogan = getRandomSnarkySlogan; //5/24/17 by DW
exports.encodeXml = encodeXml; //5/24/17 by DW
exports.trimLeading = trimLeading; //6/22/17 by DW
exports.trimTrailing = trimTrailing; //6/22/17 by DW
exports.stringInsert = stringInsert; //6/25/17 by DW
exports.downloadBigFile = downloadBigFile; //7/22/17 by DW
exports.httpExt2MIME = httpExt2MIME; //7/22/17 by DW
exports.isFolder = fsIsFolder; //7/26/17 by DW
exports.daysInMonth = daysInMonth; //7/31/17 by DW
exports.sureFilePathSync = fsSureFilePathSync; //8/3/17 by DW
exports.sureFolder = fsSureFolder; //8/3/17 by DW
exports.runAtTopOfMinute = runAtTopOfMinute; //8/11/17 by DW
exports.runEveryMinute = runEveryMinute; //9/4/18 by DW
exports.visitDirectory = visitDirectory; //8/30/17 by DW
exports.decodeXml = decodeXml; //1/10/18 by DW
exports.isWhitespace = isWhitespace; //6/3/18 by DW
exports.buildParamList = buildParamList; //9/22/18 by DW
exports.equalStrings = equalStrings; //11/18/18 by DW
exports.stringAddCommas = stringAddCommas; //1/28/19 by DW
exports.urlSplitter = urlSplitter; //2/27/19 by DW
exports.getRandomPassword = getRandomPassword; //8/17/19 by DW
exports.howLongSinceStart = howLongSinceStart; //9/1/19 by DW 
exports.howLongSinceStartAsString = howLongSinceStartAsString; //9/12/19 by DW 
exports.getPermalinkString = getPermalinkString; //2/10/20 by DW
exports.getDomainFromUrl = getDomainFromUrl; //8/10/20 by DW
exports.getPermalinkString = getPermalinkString; //12/21/20 by DW -- from River6
exports.endsWithChar = endsWithChar; //12/21/20 by DW -- from River6
exports.getDomainName = getDomainName; //12/21/20 by DW -- from River6
exports.equalDates = equalDates; //12/21/20 by DW -- from River6
exports.fsWriteStruct = fsWriteStruct; //12/21/20 by DW -- from River6
exports.fsReadStruct = fsReadStruct; //12/21/20 by DW -- from River6

const fs = require ("fs");
const request = require ("request"); //7/22/17 by DW

// version 0.11 by Daniel Rench
// More information: http://dren.ch/strftime/
// This is public domain software

Number.prototype.pad =
	function (n,p) {
		var s = '' + this;
		p = p || '0';
		while (s.length < n) s = p + s;
		return s;
	};

Date.prototype.months = [
		'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	];
Date.prototype.weekdays = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday',
		'Thursday', 'Friday', 'Saturday'
	];
Date.prototype.dpm = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

Date.prototype.strftime_f = {
		A: function (d) { return d.weekdays[d.getDay()] },
		a: function (d) { return d.weekdays[d.getDay()].substring(0,3) },
		B: function (d) { return d.months[d.getMonth()] },
		b: function (d) { return d.months[d.getMonth()].substring(0,3) },
		C: function (d) { return Math.floor(d.getFullYear()/100); },
		c: function (d) { return d.toString() },
		D: function (d) {
				return d.strftime_f.m(d) + '/' +
					d.strftime_f.d(d) + '/' + d.strftime_f.y(d);
			},
		d: function (d) { return d.getDate().pad(2,'0') },
		e: function (d) { return d.getDate().pad(2,' ') },
		F: function (d) {
				return d.strftime_f.Y(d) + '-' + d.strftime_f.m(d) + '-' +
					d.strftime_f.d(d);
			},
		H: function (d) { return d.getHours().pad(2,'0') },
		I: function (d) { return ((d.getHours() % 12 || 12).pad(2)) },
		j: function (d) {
				var t = d.getDate();
				var m = d.getMonth() - 1;
				if (m > 1) {
					var y = d.getYear();
					if (((y % 100) == 0) && ((y % 400) == 0)) ++t;
					else if ((y % 4) == 0) ++t;
				}
				while (m > -1) t += d.dpm[m--];
				return t.pad(3,'0');
			},
		k: function (d) { return d.getHours().pad(2,' ') },
		l: function (d) { return ((d.getHours() % 12 || 12).pad(2,' ')) },
		M: function (d) { return d.getMinutes().pad(2,'0') },
		m: function (d) { return (d.getMonth()+1).pad(2,'0') },
		n: function (d) { return "\n" },
		p: function (d) { return (d.getHours() > 11) ? 'PM' : 'AM' },
		R: function (d) { return d.strftime_f.H(d) + ':' + d.strftime_f.M(d) },
		r: function (d) {
				return d.strftime_f.I(d) + ':' + d.strftime_f.M(d) + ':' +
					d.strftime_f.S(d) + ' ' + d.strftime_f.p(d);
			},
		S: function (d) { return d.getSeconds().pad(2,'0') },
		s: function (d) { return Math.floor(d.getTime()/1000) },
		T: function (d) {
				return d.strftime_f.H(d) + ':' + d.strftime_f.M(d) + ':' +
					d.strftime_f.S(d);
			},
		t: function (d) { return "\t" },
/*		U: function (d) { return false }, */
		u: function (d) { return(d.getDay() || 7) },
/*		V: function (d) { return false }, */
		v: function (d) {
				return d.strftime_f.e(d) + '-' + d.strftime_f.b(d) + '-' +
					d.strftime_f.Y(d);
			},
/*		W: function (d) { return false }, */
		w: function (d) { return d.getDay() },
		X: function (d) { return d.toTimeString() }, // wrong?
		x: function (d) { return d.toDateString() }, // wrong?
		Y: function (d) { return d.getFullYear() },
		y: function (d) { return (d.getYear() % 100).pad(2) },
//		Z: function (d) { return d.toString().match(/\((.+)\)$/)[1]; },
//		z: function (d) { return d.getTimezoneOffset() }, // wrong
//		z: function (d) { return d.toString().match(/\sGMT([+-]\d+)/)[1]; },
		'%': function (d) { return '%' }
	};

Date.prototype.strftime_f['+'] = Date.prototype.strftime_f.c;
Date.prototype.strftime_f.h = Date.prototype.strftime_f.b;

Date.prototype.strftime =
	function (fmt) {
		var r = '';
		var n = 0;
		while(n < fmt.length) {
			var c = fmt.substring(n, n+1);
			if (c == '%') {
				c = fmt.substring(++n, n+1);
				r += (this.strftime_f[c]) ? this.strftime_f[c](this) : c;
			} else r += c;
			++n;
		}
		return r;
	};

function sameDay (d1, d2) { 
	//returns true if the two dates are on the same day
	d1 = new Date (d1);
	d2 = new Date (d2);
	return ((d1.getFullYear () == d2.getFullYear ()) && (d1.getMonth () == d2.getMonth ()) && (d1.getDate () == d2.getDate ()));
	}
function sameMonth (d1, d2) { //5/29/16 by DW -- return true if the two dates are in the same month
	d1 = new Date (d1);
	d2 = new Date (d2);
	return ((d1.getFullYear () == d2.getFullYear ()) && (d1.getMonth () == d2.getMonth ()));
	}
function dayGreaterThanOrEqual (d1, d2) { //9/2/14 by DW
	d1 = new Date (d1);
	d1.setHours (0);
	d1.setMinutes (0);
	d1.setSeconds (0);
	
	d2 = new Date (d2);
	d2.setHours (0);
	d2.setMinutes (0);
	d2.setSeconds (0);
	
	return (d1 >= d2);
	}
function stringLower (s) {
	if (s === undefined) { //1/26/15 by DW
		return ("");
		}
	s = s.toString (); //1/26/15 by DW
	return (s.toLowerCase ());
	}
function secondsSince (when) { 
	var now = new Date ();
	when = new Date (when);
	return ((now - when) / 1000);
	}
function padWithZeros (num, ctplaces) { 
	var s = num.toString ();
	while (s.length < ctplaces) {
		s = "0" + s;
		}
	return (s);
	}
function getDatePath (theDate, flLastSeparator) {
	if (theDate === undefined) {
		theDate = new Date ();
		}
	else {
		theDate = new Date (theDate); //8/12/14 by DW -- make sure it's a date type
		}
	if (flLastSeparator === undefined) {
		flLastSeparator = true;
		}
	
	var month = padWithZeros (theDate.getMonth () + 1, 2);
	var day = padWithZeros (theDate.getDate (), 2);
	var year = theDate.getFullYear ();
	
	if (flLastSeparator) {
		return (year + "/" + month + "/" + day + "/");
		}
	else {
		return (year + "/" + month + "/" + day);
		}
	}
function multipleReplaceAll (s, adrTable, flCaseSensitive, startCharacters, endCharacters) { 
	if(flCaseSensitive===undefined){
		flCaseSensitive = false;
		}
	if(startCharacters===undefined){
		startCharacters="";
		}
	if(endCharacters===undefined){
		endCharacters="";
		}
	for( var item in adrTable){
		var replacementValue = adrTable[item];
		var regularExpressionModifier = "g";
		if(!flCaseSensitive){
			regularExpressionModifier = "gi";
			}
		var regularExpressionString = (startCharacters+item+endCharacters).replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
		var regularExpression = new RegExp(regularExpressionString, regularExpressionModifier);
		s = s.replace(regularExpression, replacementValue);
		}
	return s;
	}
function endsWith (s, possibleEnding, flUnicase) {
	if ((s === undefined) || (s.length == 0)) { 
		return (false);
		}
	var ixstring = s.length - 1;
	if (flUnicase === undefined) {
		flUnicase = true;
		}
	if (flUnicase) {
		for (var i = possibleEnding.length - 1; i >= 0; i--) {
			if (stringLower (s [ixstring--]) != stringLower (possibleEnding [i])) {
				return (false);
				}
			}
		}
	else {
		for (var i = possibleEnding.length - 1; i >= 0; i--) {
			if (s [ixstring--] != possibleEnding [i]) {
				return (false);
				}
			}
		}
	return (true);
	}
function stringContains (s, whatItMightContain, flUnicase) { //11/9/14 by DW
	if (s === undefined) { //3/30/20 by DW
		return (false);
		}
	if (flUnicase === undefined) {
		flUnicase = true;
		}
	if (flUnicase) {
		s = s.toLowerCase ();
		whatItMightContain = whatItMightContain.toLowerCase ();
		}
	return (s.indexOf (whatItMightContain) != -1);
	}
function beginsWith (s, possibleBeginning, flUnicase) { 
	if (s === undefined) { //7/15/15 by DW
		return (false);
		}
	if (s.length == 0) { //1/1/14 by DW
		return (false);
		}
	if (flUnicase === undefined) {
		flUnicase = true;
		}
	if (flUnicase) {
		for (var i = 0; i < possibleBeginning.length; i++) {
			if (stringLower (s [i]) != stringLower (possibleBeginning [i])) {
				return (false);
				}
			}
		}
	else {
		for (var i = 0; i < possibleBeginning.length; i++) {
			if (s [i] != possibleBeginning [i]) {
				return (false);
				}
			}
		}
	return (true);
	}
function isAlpha (ch) {
	return (((ch >= 'a') && (ch <= 'z')) || ((ch >= 'A') && (ch <= 'Z')));
	}
function isNumeric (ch) {
	return ((ch >= '0') && (ch <= '9'));
	}
function isWhitespace (ch) { //10/24/16 by DW
	switch (ch) {
		case " ": case "\r": case "\n": case "\t":
			return (true);
		}
	return (false);
	}
function isPunctuation (ch) { //10/24/16 by DW
	if (isAlpha (ch) || isNumeric (ch) || isWhitespace (ch)) {
		return (false);
		}
	else {
		return (true);
		}
	}
function trimLeading (s, ch) {
	while (s.charAt (0) === ch) {
		s = s.substr (1);
		}
	return (s);
	}
function trimTrailing (s, ch) { 
	while (s.charAt (s.length - 1) === ch) {
		s = s.substr (0, s.length - 1);
		}
	return (s);
	}
function trimWhitespace (s) { //rewrite -- 5/30/14 by DW
	function isWhite (ch) {
		switch (ch) {
			case " ": case "\r": case "\n": case "\t":
				return (true);
			}
		return (false);
		}
	if (s === undefined) { //9/10/14 by DW
		return ("");
		}
	while (isWhite (s.charAt (0))) {
		s = s.substr (1);
		}
	while (s.length > 0) {
		if (!isWhite (s.charAt (0))) {
			break;
			}
		s = s.substr (1);
		}
	while (s.length > 0) {
		if (!isWhite (s.charAt (s.length - 1))) {
			break;
			}
		s = s.substr (0, s.length - 1);
		}
	return (s);
	}
function addPeriodAtEnd (s) {
	s = trimWhitespace (s);
	if (s.length == 0) {
		return (s);
		}
	switch (s [s.length - 1]) {
		case ".":
		case ",":
		case "?":
		case "\"":
		case "'":
		case ":":
		case ";":
		case "!":
			return (s);
		default:
			return (s + ".");
		}
	}
function getBoolean (val) { //12/5/13 by DW
	switch (typeof (val)) {
		case "string":
			if (val == "1") { //1/28/20 by DW
				return (true);
				}
			if (val.toLowerCase () == "true") {
				return (true);
				}
			break;
		case "boolean":
			return (val);
		case "number":
			if (val == 1) {
				return (true);
				}
			break;
		}
	return (false);
	}
function bumpUrlString (s) { //5/10/14 by DW
	if (s === undefined) {
		s = "0";
		}
	if (typeof s != "string") { //6/25/21 by DW
		s = s.toString ();
		}
	function bumpChar (ch) {
		function num (ch) {
			return (ch.charCodeAt (0));
			}
		if ((ch >= "0") && (ch <= "8")) {
			ch = String.fromCharCode (num (ch) + 1);
			}
		else {
			if (ch == "9") {
				ch = "a";
				}
			else {
				if ((ch >= "a") && (ch <= "y")) {
					ch = String.fromCharCode (num (ch) + 1);
					}
				else {
					throw "rollover!";
					}
				}
			}
		return (ch);
		}
	try {
		var chlast = bumpChar (s [s.length - 1]);
		s = s.substr (0, s.length - 1) + chlast;
		return (s);
		}
	catch (tryError) {
		if (s.length == 1) {
			return ("00");
			}
		else {
			s = s.substr (0, s.length - 1);
			s = bumpUrlString (s) + "0";
			return (s);
			}
		}
	}
function stringDelete (s, ix, ct) {
	var start = ix - 1;
	var end = (ix + ct) - 1;
	var s1 = s.substr (0, start);
	var s2 = s.substr (end);
	return (s1 + s2);
	}
function replaceAll (s, searchfor, replacewith) {
	s = s.toString ();
	searchfor = searchfor.toString (); 
	replacewith = replacewith.toString (); 
	function escapeRegExp (string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
	return (s.replace (new RegExp (escapeRegExp (searchfor), 'g'), replacewith));
	}
function stringCountFields (s, chdelim) {
	var ct = 1;
	if (s === undefined) { //11/15/18 by DW
		return (0);
		}
	if (s.length == 0) {
		return (0);
		}
	for (var i = 0; i < s.length; i++) {
		if (s [i] == chdelim) {
			ct++;
			}
		}
	return (ct)
	}
function stringNthField (s, chdelim, n) {
	var splits = s.split (chdelim);
	if (splits.length >= n) {
		return splits [n-1];
		}
	return ("");
	}
function dateYesterday (d) {
	return (new Date (new Date (d) - (24 * 60 * 60 * 1000)));
	}
function dateTomorrow (d) { //2/5/17 by DW
	d = new Date (d); //be sure it's a date type
	return (new Date (d.setDate (d.getDate () + 1)));
	}
function stripMarkup (s) { //5/24/14 by DW
	if ((s === undefined) || (s == null) || (s.length == 0)) {
		return ("");
		}
	return (s.replace (/(<([^>]+)>)/ig, ""));
	}
function maxStringLength (s, len, flWholeWordAtEnd, flAddElipses) {
	if ((s === undefined) || (s === null)) {
		return ("");
		}
	else {
		if (flWholeWordAtEnd === undefined) {
			flWholeWordAtEnd = true;
			}
		if (flAddElipses === undefined) { //6/2/14 by DW
			flAddElipses = true;
			}
		if (s.length > len) {
			s = s.substr (0, len);
			if (flWholeWordAtEnd) {
				while (s.length > 0) {
					if (s [s.length - 1] == " ") {
						if (flAddElipses) {
							s += "...";
							}
						break;
						}
					s = s.substr (0, s.length - 1); //pop last char
					}
				}
			else { //8/2/20 by DW
				if (flAddElipses) {
					s += "...";
					}
				}
			}
		return (s);
		}
	}
function random (lower, upper) {
	var range = upper - lower + 1;
	return (Math.floor ((Math.random () * range) + lower));
	}
function removeMultipleBlanks (s) { //7/30/14 by DW
	return (s.toString().replace (/ +/g, " "));
	}
function jsonStringify (jstruct, flFixBreakage) { //7/30/14 by DW
	//Changes
		//6/16/15; 10:43:25 AM by DW
			//Andrew Shell reported an issue in the encoding of JSON that's solved by doing character replacement. 
			//However, this is too big a change to make for all the code that calls this library routine, so we added a boolean flag, flFixBreakage.
			//If this proves to be harmless, we'll change the default to true. 
			//http://river4.smallpict.com/2015/06/16/jsonEncodingIssueSolved.html
	if (flFixBreakage === undefined) {
		flFixBreakage = false;
		}
	var s = JSON.stringify (jstruct, undefined, 4);
	if (flFixBreakage) {
		s = s.replace (/\u2028/g,'\\u2028').replace (/\u2029/g,'\\u2029');
		}
	return (s);
	}
function stringAddCommas (x) { //5/27/14 by DW
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
function readHttpFile (url, callback, timeoutInMilliseconds, headers) { //5/27/14 by DW
	if (timeoutInMilliseconds === undefined) {
		timeoutInMilliseconds = 30000;
		}
	var jxhr = $.ajax ({ 
		url: url,
		dataType: "text", 
		headers: headers,
		timeout: timeoutInMilliseconds 
		}) 
	.success (function (data, status) { 
		callback (data);
		}) 
	.error (function (status) { 
		console.log ("readHttpFile: url == " + url + ", error == " + jsonStringify (status));
		callback (undefined);
		});
	}
function readHttpFileThruProxy (url, type, callback) { //10/25/14 by DW
	var urlReadFileApi = "http://httpproxy.scripting.com/httpReadUrl"; 
	if (type === undefined) {
		type = "text/plain";
		}
	var urlAjax = urlReadFileApi + "?url=" + encodeURIComponent (url) + "&type=" + encodeURIComponent (type);
	var jxhr = $.ajax ({ 
		url: urlAjax,
		dataType: "text" , 
		timeout: 30000 
		}) 
	.success (function (data, status) { 
		if (callback != undefined) {
			callback (data);
			}
		}) 
	.error (function (status) { 
		console.log ("readHttpFileThruProxy: url == " + url + ", error == " + status.statusText + ".");
		if (callback != undefined) {
			callback (undefined);
			}
		});
	}
function stringPopLastField (s, chdelim) { //5/28/14 by DW
	if (s.length == 0) {
		return (s);
		}
	if (endsWith (s, chdelim)) {
		s = stringDelete (s, s.length, 1);
		}
	while (s.length > 0) {
		if (endsWith (s, chdelim)) {
			return (stringDelete (s, s.length, 1));
			}
		s = stringDelete (s, s.length, 1);
		}
	return (s);
	}
function stringPopExtension (s) { //4/29/15 by DW
	for (var i = s.length - 1; i >= 0; i--) {
		if (s [i] == ".") {
			return (stringMid (s, 1, i));
			}
		}
	return (s);
	}
function filledString (ch, ct) { //6/4/14 by DW
	var s = "";
	for (var i = 0; i < ct; i++) {
		s += ch;
		}
	return (s);
	}
function encodeXml (s) { //7/15/14 by DW
	if (s === undefined) {
		return ("");
		}
	else {
		var charMap = {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;',
			'"': '&'+'quot;'
			};
		s = s.toString();
		s = s.replace(/\u00A0/g, " ");
		var escaped = s.replace(/[<>&"]/g, function(ch) {
			return charMap [ch];
			});
		return escaped;
		}
	}
function decodeXml (s) { //7/5/18 by DW -- rewrite
	var replacetable = {
		lt: "<",
		gt: ">",
		amp: "&",
		apos: "'"
		};
	s = multipleReplaceAll (s, replacetable, true, "&", ";");
	return (s);
	}
function hotUpText (s, url) { //7/18/14 by DW
	
	if (url === undefined) { //makes it easier to call -- 3/14/14 by DW
		return (s);
		}
	
	function linkit (s) {
		return ("<a href=\"" + url + "\" target=\"_blank\">" + s + "</a>");
		}
	var ixleft = s.indexOf ("["), ixright = s.indexOf ("]");
	if ((ixleft == -1) || (ixright == -1)) {
		return (linkit (s));
		}
	if (ixright < ixleft) {
		return (linkit (s));
		}
	
	var linktext = s.substr (ixleft + 1, ixright - ixleft - 1); //string.mid (s, ixleft, ixright - ixleft + 1);
	linktext = "<a href=\"" + url + "\" target=\"_blank\">" + linktext + "</a>";
	
	var leftpart = s.substr (0, ixleft);
	var rightpart = s.substr (ixright + 1, s.length);
	s = leftpart + linktext + rightpart;
	return (s);
	}
function getDomainFromUrl (url) { //7/11/15 by DW
	if ((url != null ) && (url != "")) {
		url = url.replace("www.","").replace("www2.", "").replace("feedproxy.", "").replace("feeds.", "");
		var root = url.split('?')[0]; // cleans urls of form http://domain.com?a=1&b=2
		url = root.split('/')[2];
		}
	return (url);
	};
function getFavicon (url) { //7/18/14 by DW
	var domain = getDomainFromUrl (url);
	return ("http://www.google.com/s2/favicons?domain=" + domain);
	};
function getURLParameter (name) { //7/21/14 by DW
	return (decodeURI ((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]));
	}
function urlSplitter (url) { //7/15/14 by DW
	var pattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var result = pattern.exec (url);
	if (result == null) {
		result = [];
		result [5] = url;
		}
	var splitUrl = {
		scheme: result [1],
		host: result [3],
		port: result [4],
		path: result [5],
		query: result [6],
		hash: result [7]
		};
	return (splitUrl);
	}
function innerCaseName (text) { //8/12/14 by DW
	var s = "", ch, flNextUpper = false;
	text = stripMarkup (text); 
	for (var i = 0; i < text.length; i++) {
		ch = text [i];
		if (isAlpha (ch) || isNumeric (ch)) { 
			if (flNextUpper) {
				ch = ch.toUpperCase ();
				flNextUpper = false;
				}
			else {
				ch = ch.toLowerCase ();
				}
			s += ch;
			}
		else {
			if (ch == ' ') { 
				flNextUpper = true;
				}
			}
		}
	return (s);
	}
function hitCounter (counterGroup, counterServer, thisPageUrl, referrer) { //12/17/19 by DW -- no more JSONP, simpler
	var defaultCounterGroup = "scripting";
	var defaultCounterServer = "http://counters.scripting.com/counter"; //9/23/19 by DW
	if (counterGroup === undefined) {
		counterGroup = defaultCounterGroup;
		}
	if (counterServer === undefined) {
		counterServer = defaultCounterServer;
		}
	if (thisPageUrl === undefined) {
		thisPageUrl = location.href;
		if (thisPageUrl === undefined) {
			thisPageUrl = "";
			}
		}
	if (endsWith (thisPageUrl, "#")) {
		thisPageUrl = thisPageUrl.substr (0, thisPageUrl.length - 1);
		}
	if (referrer === undefined) { //3/8/17 by DW -- the usual thing
		referrer = document.referrer;
		}
	var url = counterServer + "?group=" + encodeURIComponent (counterGroup) + "&referer=" + encodeURIComponent (referrer) + "&url=" + encodeURIComponent (thisPageUrl);
	readHttpFile (url, function (msgFromServer) {
		console.log ("hitCounter: msgFromServer == " + msgFromServer);
		});
	}
function stringMid (s, ix, len) { //8/12/14 by DW
	return (s.substr (ix-1, len));
	}
function getCmdKeyPrefix () { //8/15/14 by DW
	if (navigator.platform.toLowerCase ().substr (0, 3) == "mac") {
		return ("&#8984;");
		}
	else {
		return ("Ctrl+"); 
		}
	}
function getRandomSnarkySlogan (flReturnArray) { //8/15/14 by DW
	var snarkySlogans = [
		"Good for the environment.", 
		"All baking done on premises.", 
		"Still diggin!", 
		"It's even worse than it appears.", 
		"You should never argue with a crazy man.", 
		"Welcome back my friends to the show that never ends.", 
		"Greetings, citizen of Planet Earth. We are your overlords. :-)", 
		"We don't need no stinkin rock stars.", 
		"This aggression will not stand.", 
		"Pay no attention to the man behind the curtain.", 
		"Only steal from the best.", 
		"Reallll soooon now...", 
		"What a long strange trip it's been.", 
		"Ask not what the Internet can do for you.", 
		"When in doubt, blog.",
		"Shut up and eat your vegetables.",
		"Don't slam the door on the way out.",
		"Yeah well, that's just, you know, like, your opinion, man.",
		"So, it has come to this.",
		"We now return to our regularly scheduled program.",
		"That rug really tied the room together.",
		"It's a good time for a backup.",
		"Takes a lickin, keeps on tickin.",
		"People return to places that send them away.",
		"This is unfortunate and we're stuck with it forever.",
		"You can fake caring, but you can't fake showing up.",
		"Use your mind!",
		"Slow down to hurry up.",
		"Good morning sports fans!",
		"All of this has happened before and all of this will happen again.",
		"Don't make me laugh.",
		"If it doesn't have a feed it isn't a podcast.",
		"You can't fight not-normal with normal.", //8/7/19 by DW
		"You can't lie to a compiler.", //8/9/19 by DW
		"One way is better than two, no matter how much better the second is.", //8/30/19 by DW
		"There's nothing more permanent than a temporary hack.", //9/1/19 by DW
		"Don't get lost in the weeds.", //3/5/20 by DW
		"Wash your hands.", //4/7/20 by DW
		"Wear a mask.", //7/4/20 by DW
		"Choose to not be offended.", //7/4/20 by DW
		"An ounce of prevention is worth a pound of cure.", //7/8/20 by DW
		"If you don't like the news, go out and make some of your own.", //11/28/20 by DW
		"It shouldn't matter where a good idea comes from.", //1/3/21 by DW
		"It's not like anyone gets out of this alive.", //1/17/21 by DW
		"Fear is frozen fun.", //5/3/21 by DW
		"Thanks for listening.", //5/16/21 by DW
		"You can observe a lot by watching." //7/22/21 by DW
		]
	if (getBoolean (flReturnArray)) {
		return (snarkySlogans);
		}
	else {
		return (snarkySlogans [random (0, snarkySlogans.length - 1)]);
		}
	}
function dayOfWeekToString (theDay) { //8/23/14 by DW
	var weekday = [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		];
	if ((theDay >= 0) && (theDay < weekday.length)) {
		return (weekday [theDay]);
		}
	else {
		return ("");
		}
	}
function viewDate (when, flShortDayOfWeek)  {  //8/23/14 by DW
	var now = new Date ();
	when = new Date (when);
	if (sameDay (when, now))  { 
		return (timeString (when, false)) //2/9/13 by DW;
		}
	else  { 
		var oneweek = 1000 * 60 * 60 * 24 * 7;
		var cutoff = now - oneweek;
		if (when > cutoff)   { //within the last week
			var s = dayOfWeekToString (when.getDay ());
			if (flShortDayOfWeek)  { 
				s = s.substring (0, 3);
				}
			return (s);
			}
		else  { 
			return (when.toLocaleDateString ());
			}
		}
	}
function timeString (when, flIncludeSeconds) { //8/26/14 by DW
	var hour = when.getHours (), minutes = when.getMinutes (), ampm = "AM", s;
	if (hour >= 12) {
		ampm = "PM";
		}
	if (hour > 12) {
		hour -= 12;
		}
	if (hour == 0) {
		hour = 12;
		}
	if (minutes < 10) {
		minutes = "0" + minutes;
		}
	if (flIncludeSeconds) { 
		var seconds = when.getSeconds ();
		if (seconds < 10) {
			seconds = "0" + seconds;
			}
		s = hour + ":" + minutes + ":" + seconds + ampm;
		}
	else {
		s = hour + ":" + minutes + ampm;
		}
	return (s);
	}
function stringLastField (s, chdelim) { //8/27/14 by DW
	var ct = stringCountFields (s, chdelim);
	if (ct == 0) { //8/31/14 by DW
		return (s);
		}
	return (stringNthField (s, chdelim, ct));
	}
function maxLengthString (s, maxlength) { //8/27/14 by DW
	function isBreakChar (ch) {
		if (isWhitespace (ch) || isPunctuation (ch)) {
			return (true);
			}
		else {
			return (false);
			}
		}
	
	if (s === undefined) { //10/25/16 by DW
		return ("");
		}
	
	if (s.length > maxlength) {
		s = s.substr (0, maxlength);
		while (true) {
			var len = s.length; flbreak = false;
			if (len == 0) {
				break;
				}
			if (isBreakChar (s [len - 1])) { //10/24/16 by DW
				flbreak = true;
				}
			s = s.substr (0, len - 1);
			if (flbreak) {
				break;
				}
			}
		
		while (true) { //delete punctuation chars at end of string
			if (s.length == 0) {
				break;
				}
			if (!isPunctuation (s [s.length - 1])) {
				break;
				}
			s = stringDelete (s, s.length, 1);
			}
		
		s = s + "...";
		}
	return (s);
	}
function formatDate (theDate, dateformat, timezone) { //8/28/14 by DW
	if (theDate === undefined) {
		theDate = new Date ();
		}
	if (dateformat === undefined) {
		dateformat = "%c";
		}
	if (timezone === undefined) {
		timezone =  - (new Date ().getTimezoneOffset () / 60);
		}
	try {
		var offset = new Number (timezone);
		var d = new Date (theDate);
		var localTime = d.getTime ();
		var localOffset = d.getTimezoneOffset () *  60000;
		var utc = localTime + localOffset;
		var newTime = utc + (3600000 * offset);
		return (new Date (newTime).strftime (dateformat));
		}
	catch (tryerror) {
		return (new Date (theDate).strftime (dateformat));
		}
	}
function addPeriodToSentence (s) { //8/29/14 by DW
	if (s.length > 0) {
		var fladd = true;
		var ch = s [s.length - 1];
		switch (ch) {
			case "!": case "?": case ":":
				fladd = false;
				break;
			default:
				if (endsWith (s, ".\"")) {
					fladd = false;
					}
				else {
					if (endsWith (s, ".'")) {
						fladd = false;
						}
					}
			}
		if (fladd) {
			s += ".";
			}
		}
	return (s);
	}
function copyScalars (source, dest) { //8/31/14 by DW
	for (var x in source) { 
		var type, val = source [x];
		if (val instanceof Date) { 
			val = val.toString ();
			}
		type = typeof (val);
		if ((type != "object") && (type != undefined)) {
			dest [x] = val;
			}
		}
	}
function linkToDomainFromUrl (url, flshort, maxlength) { //10/10/14 by DW
	var splitUrl = urlSplitter (url), host;
	if (splitUrl.host === undefined) { //1/21/16 by DW
		host = "";
		}
	else {
		host = splitUrl.host.toLowerCase ();
		}
	if (flshort === undefined) {
		flshort = false;
		}
	if (flshort) {
		var splithost = host.split (".");
		if (splithost.length == 3) {
			host = splithost [1];
			}
		else {
			host = splithost [0];
			}
		}
	else {
		if (beginsWith (host, "www.")) {
			host = stringDelete (host, 1, 4);
			}
		}
	
	if (maxlength != undefined) { //10/10/14; 10:46:56 PM by DW
		if (host.length > maxlength) {
			host = stringMid (host, 1, maxlength) + "...";
			}
		}
	
	return ("<a class=\"aLinkToDomainFromUrl\" href=\"" + url + "\" target=\"blank\">" + host + "</a>");
	}
function getRandomPassword (ctchars) { //10/14/14 by DW
	var s= "", ch;
	while (s.length < ctchars)  {
		ch = String.fromCharCode (random (33, 122));
		if (isAlpha (ch) || isNumeric (ch)) {
			s += ch;
			}
		}
	return (s.toLowerCase ());
	}
function monthToString (theMonthNum) { //11/4/14 by DW
	
	
	var theDate;
	if (theMonthNum === undefined) {
		theDate = new Date ();
		}
	else {
		theDate = new Date ((theMonthNum + 1) + "/1/2014");
		}
	return (formatDate (theDate, "%B"));
	}
function getCanonicalName (text) { //11/4/14 by DW
	var s = "", ch, flNextUpper = false;
	text = stripMarkup (text); //6/30/13 by DW
	for (var i = 0; i < text.length; i++) {
		ch = text [i];
		if (isAlpha (ch) || isNumeric (ch)) {
			if (flNextUpper) {
				ch = ch.toUpperCase ();
				flNextUpper = false;
				}
			else {
				ch = ch.toLowerCase ();
				}
			s += ch;
			}
		else { 
			if (ch == ' ') {
				flNextUpper = true;
				}
			}
		}
	return (s);
	}
function clockNow () { //11/7/14 by DW
	return (new Date ());
	}
function sleepTillTopOfMinute (callback) { //11/22/14 by DW
	var ctseconds = Math.round (60 - (new Date ().getSeconds () + 60) % 60);
	if (ctseconds == 0) {
		ctseconds = 60;
		}
	setTimeout (callback, ctseconds * 1000); //8/13/15 by DW -- was hard-coded to "everyMinute" ignored the callback param, fixed
	}
function scheduleNextRun (callback, ctMillisecsBetwRuns) { //11/27/14 by DW
	var ctmilliseconds = ctMillisecsBetwRuns - (Number (new Date ().getMilliseconds ()) + ctMillisecsBetwRuns) % ctMillisecsBetwRuns;
	setTimeout (callback, ctmilliseconds); 
	}
function urlEncode (s) { //12/4/14 by DW
	return (encodeURIComponent (s));
	}
function popTweetNameAtStart (s) { //12/8/14 by DW
	var ch;
	s = trimWhitespace (s);
	if (s.length > 0) {
		if (s.charAt (0) == "@") {
			while (s.charAt (0) != " ") {
				s = s.substr (1)
				}
			while (s.length > 0) {
				ch = s.charAt (0);
				if ((ch != " ") && (ch != "-")) {
					break;
					}
				s = s.substr (1)
				}
			}
		}
	return (s);
	}
function httpHeadRequest (url, callback) { //12/17/14 by DW
	var jxhr = $.ajax ({
		url: url,
		type: "HEAD",
		dataType: "text",
		timeout: 30000
		})
	.success (function (data, status, xhr) {
		callback (xhr); //you can do xhr.getResponseHeader to get one of the header elements
		})
	}
function httpExt2MIME (ext, defaultType) { //12/24/14 by DW
	var lowerext = stringLower (ext);
	var map = {
		"au": "audio/basic",
		"avi": "application/x-msvideo",
		"bin": "application/x-macbinary",
		"css": "text/css",
		"dcr": "application/x-director",
		"dir": "application/x-director",
		"dll": "application/octet-stream",
		"doc": "application/msword",
		"dtd": "text/dtd",
		"dxr": "application/x-director",
		"exe": "application/octet-stream",
		"fatp": "text/html",
		"ftsc": "text/html",
		"fttb": "text/html",
		"gif": "image/gif",
		"gz": "application/x-gzip",
		"hqx": "application/mac-binhex40",
		"htm": "text/html",
		"html": "text/html",
		"jpeg": "image/jpeg",
		"jpg": "image/jpeg",
		"js": "application/javascript",
		"json": "application/json", //12/4/19 by DW
		"mid": "audio/x-midi",
		"midi": "audio/x-midi",
		"mov": "video/quicktime",
		"mp3": "audio/mpeg",
		"pdf": "application/pdf",
		"png": "image/png",
		"ppt": "application/mspowerpoint",
		"ps": "application/postscript",
		"ra": "audio/x-pn-realaudio",
		"ram": "audio/x-pn-realaudio",
		"sit": "application/x-stuffit",
		"sys": "application/octet-stream",
		"tar": "application/x-tar",
		"text": "text/plain",
		"txt": "text/plain",
		"wav": "audio/x-wav",
		"wrl": "x-world/x-vrml",
		"xml": "text/xml",
		"zip": "application/zip"
		};
	for (x in map) {
		if (stringLower (x) == lowerext) {
			return (map [x]);
			}
		}
	return ((defaultType === undefined) ? "text/plain" : defaultType);
	}
function kilobyteString (num) { //1/24/15 by DW
	num = Number (num) / 1024;
	return (num.toFixed (2) + "K");
	}
function megabyteString (num) { //1/24/15 by DW
	var onemeg = 1024 * 1024;
	if (num <= onemeg) {
		return (kilobyteString (num));
		}
	num = Number (num) / onemeg;
	return (num.toFixed (2) + "MB");
	}
function gigabyteString (num) { //1/24/15 by DW
	var onegig = 1024 * 1024 * 1024;
	if (num <= onegig) {
		return (megabyteString (num));
		}
	num = Number (num) / onegig;
	return (num.toFixed (2) + "GB");
	}
function dateToNumber (theDate) { //2/15/15 by DW
	return (Number (new Date (theDate)));
	}
function getFileModDate (f, callback) { //8/26/15 by DW
	fs.exists (f, function (flExists) {
		if (flExists) {
			fs.stat (f, function (err, stats) {
				if (err) {
					callback (undefined);
					}
				else {
					callback (new Date (stats.mtime).toString ());
					}
				});
			}
		else {
			callback (undefined);
			}
		});
	}
function getFileCreationDate (f, callback) { //12/15/15 by DW
	fs.exists (f, function (flExists) {
		if (flExists) {
			fs.stat (f, function (err, stats) {
				if (err) {
					callback (undefined);
					}
				else {
					callback (new Date (stats.birthtime).toString ());
					}
				});
			}
		else {
			callback (undefined);
			}
		});
	}
function getAppUrl () { //11/13/15 by DW
	var url = stringNthField (window.location.href, "?", 1);
	url = stringNthField (url, "#", 1);
	return (url);
	}
function getFacebookTimeString (when, flLongStrings) { //11/13/15 by DW
	var theStrings = [" min", " hr"]; //9/29/17 by DW
	if (flLongStrings) {
		theStrings = [" minute", " hour"];
		}
	
	when = new Date (when); //make sure it's a date
	var ctsecs = secondsSince (when), ct, s;
	if (ctsecs < 60) {
		return ("Just now");
		}
	
	var ctminutes = ctsecs / 60;
	if (ctminutes < 60) {
		ct = Math.floor (ctminutes);
		s = ct + theStrings [0]; //" min";
		if (ct != 1) {
			s += "s";
			}
		return (s);
		}
	
	var cthours = ctminutes / 60;
	if (cthours < 24) {
		ct = Math.floor (cthours);
		s = ct + theStrings [1]; //" hr";
		if (ct != 1) {
			s += "s";
			}
		return (s);
		}
	
	var now = new Date ();
	if (sameDay (when, dateYesterday (now))) {
		return ("Yesterday at " + formatDate (when, "%l:%M %p"));
		}
	
	var formatstring = "%b %e";
	if (when.getFullYear () != now.getFullYear ()) {
		formatstring += ", %Y";
		}
	try {
		return (formatDate (when, formatstring));
		}
	catch (err) {
		return ("");
		}
	}
function stringUpper (s) { //11/15/15 by DW
	if (s === undefined) {
		return ("");
		}
	s = s.toString (); 
	return (s.toUpperCase ());
	}
	
function upperCaseFirstChar (s) { //11/15/15 by DW
	if ((s === undefined) || (s.length == 0)) {
		return ("");
		}
	s = stringUpper (s [0]) + stringDelete (s, 1, 1); 
	return (s);
	}
function cacheConfuse (url) { //3/1/16 by DW
	return (url + "?x=" + random (0, 10000000));
	}
function equalStrings (s1, s2, flUnicase) { //4/7/16 by DW
	if (flUnicase === undefined) {
		flUnicase = true;
		}
	if (flUnicase) {
		return (s1.toLowerCase () == s2.toLowerCase ());
		}
	else {
		return (s1 == s2);
		}
	}
function stringInsert (source, dest, ix) { //8/8/16 by DW
	return (dest.substr (0, ix) + source + dest.substr (ix));
	}
function fsSureFilePath (path, callback) { //5/17/17 by DW 
	var splits = path.split ("/");
	path = ""; 
	if (splits.length > 0) {
		function doLevel (levelnum) {
			if (levelnum < (splits.length - 1)) {
				path += splits [levelnum] + "/";
				fs.exists (path, function (flExists) {
					if (flExists) {
						doLevel (levelnum + 1);
						}
					else {
						fs.mkdir (path, undefined, function () {
							doLevel (levelnum + 1);
							});
						}
					});
				}
			else {
				if (callback !== undefined) {
					callback ();
					}
				}
			}
		doLevel (0);
		}
	else {
		if (callback !== undefined) {
			callback ();
			}
		}
	}
function downloadBigFile (url, f, pubDate, callback) { //7/22/17 by DW
	fsSureFilePath (f, function () {
		var theStream = fs.createWriteStream (f);
		theStream.on ("finish", function () {
			if (pubDate === undefined) {
				pubDate = new Date ();
				}
			else {
				pubDate = new Date (pubDate);
				}
			fs.utimes (f, pubDate, pubDate, function () {
				});
			if (callback !== undefined) {
				callback ();
				}
			});
		request.get (url)
			.on ('error', function (err) {
				console.log (err);
				})
			.pipe (theStream);
		});
	}
function fsIsFolder (path) { //7/26/17 by DW
	return (fs.statSync (path).isDirectory ());
	}
function daysInMonth (theDay) { //7/31/17 by DW
	return (new Date (theDay.getYear (), theDay.getMonth () + 1, 0).getDate ());
	}
function fsSureFilePathSync (path) { //8/3/17 by DW
	var splits = path.split ("/");
	path = ""; 
	if (splits.length > 0) {
		function doLevel (levelnum) {
			if (levelnum < (splits.length - 1)) {
				path += splits [levelnum] + "/";
				if (fs.existsSync (path)) {
					doLevel (levelnum + 1);
					}
				else {
					fs.mkdirSync (path, undefined);
					doLevel (levelnum + 1);
					}
				}
			}
		doLevel (0);
		}
	return (true);
	}
function fsSureFolder (folder, callback) { //8/3/17 by DW
	fsSureFilePath (folder + "x", callback);
	return (folder);
	}
function runAtTopOfMinute (callback) { //8/11/17 by DW
	setTimeout (callback, (60 - new Date ().getSeconds ()) * 1000);
	}
function runEveryMinute (callback) { //2/14/21 AM by DW -- no drift
	var whenLastEveryMinute = new Date ();
	function secondsSince (when) { 
		var now = new Date ();
		when = new Date (when);
		return ((now - when) / 1000);
		}
	function everySecond () {
		var now = new Date ();
		if (now.getSeconds () == 0) {
			whenLastEveryMinute = now;
			callback ();
			}
		else {
			if (secondsSince (whenLastEveryMinute) > 60) {
				whenLastEveryMinute = now;
				callback ();
				}
			}
		}
	setInterval (everySecond, 1000);
	}
function visitDirectory (folder, callback) { //8/30/17 by DW
	if (!endsWith (folder, "/")) {
		folder += "/";
		}
	fsSureFilePath (folder, function () {
		fs.readdir (folder, function (err, list) {
			if (err) {
				console.log ("visitDirectory: err.message == " + err.message);
				}
			else {
				if (list !== undefined) { 
					for (var i = 0; i < list.length; i++) {
						callback (folder + list [i]);
						}
					}
				}
			});
		});
	}
function buildParamList (paramtable) { //9/22/18 by DW 
	var s = "";
	for (var x in paramtable) {
		if (s.length > 0) {
			s += "&";
			}
		s += x + "=" + encodeURIComponent (paramtable [x]);
		}
	return (s);
	}
function howLongSinceStart (whenStart) { //8/10/19 by DW
	function daysInYear (year) {
		var flLeapYear = ((year % 400) == 0) || ((year % 100) != 0 && ((year % 4) == 0));
		return ((flLeapYear) ? 366 : 365);
		}
	function daysInMonth (month, year) { 
		return (new Date (year, month, 0).getDate ()); 
		} 
	function getnum (num, units) {
		if (num != 1) {
			units += "s";
			}
		return (num + " " + units);
		}
	const ctSecsInDay = 60 * 60 * 24;
	const ctMilliSecsInDay = 1000 * ctSecsInDay;
	const now = new Date ();
	var theYear = whenStart.getFullYear ();
	var ctDays = (now - whenStart) / ctMilliSecsInDay;
	var ctYears = 0;
	while (true) {
		if (ctDays <= daysInYear (theYear)) {
			break;
			}
		ctDays -= daysInYear (theYear);
		ctYears++;
		theYear++;
		}
	
	var theMonth = 0, ctMonths = 0;
	while (true) {
		
		if (ctDays < daysInMonth (theMonth, theYear)) {
			break;
			}
		ctDays -= daysInMonth (theMonth, theYear);
		ctMonths++;
		theMonth++;
		}
	
	const ctWholeDays = Math.floor (ctDays);
	var ctRemainingSecs = (ctDays - ctWholeDays) * ctSecsInDay;
	var ctHours = Math.floor (ctRemainingSecs / (60 * 60));
	ctRemainingSecs -= ctHours * 60 * 60;
	var ctMinutes = Math.floor (ctRemainingSecs / 60);
	ctRemainingSecs -= ctMinutes * 60;
	ctRemainingSecs = Math.floor (ctRemainingSecs);
	return ({
		years: ctYears,
		months: ctMonths,
		days: ctWholeDays,
		hours: ctHours,
		minutes: ctMinutes,
		seconds: ctRemainingSecs
		});
	}
function howLongSinceStartAsString (whenStart) { //9/12/19 by DW
	var x = howLongSinceStart (new Date (whenStart));
	function getnum (num, units) {
		if (num != 1) {
			units += "s";
			}
		return (num + " " + units);
		}
	return (getnum (x.years, "year") + ", " + getnum (x.months, "month") + ", " + getnum (x.days, "day") + ", " + getnum (x.hours, "hour") + ", " + getnum (x.minutes, "minute") + ", " + getnum (x.seconds, "second") + ".");
	}
function getPermalinkString (when) { //2/10/20 by DW
	var permalinkstring;
	when = new Date (when);
	permalinkstring = when.getUTCFullYear ();
	function add (num) {
		permalinkstring += padWithZeros (num, 2);
		}
	add (when.getUTCMonth ());
	add (when.getUTCDate ());
	add (when.getUTCHours ());
	add (when.getUTCMinutes ());
	add (when.getUTCSeconds ());
	return (permalinkstring);
	}
function endsWithChar (s, chPossibleEndchar) { //12/21/20 by DW -- from River6
	if ((s === undefined) || (s.length == 0)) { 
		return (false);
		}
	else {
		return (s [s.length - 1] == chPossibleEndchar);
		}
	}
function getDomainName (clientIp, callback) { //12/21/20 by DW -- from River6
	if (clientIp === undefined) {
		if (callback !== undefined) {
			callback ("undefined");
			}
		}
	else {
		dns.reverse (clientIp, function (err, domains) {
			var name = clientIp;
			if (!err) {
				if (domains.length > 0) {
					name = domains [0];
					}
				}
			if (callback !== undefined) {
				callback (name);
				}
			});
		}
	}
function equalDates (d1, d2) { //12/21/20 by DW -- from River6
	return (d1.getTime () == d2.getTime ());
	}
function fsWriteStruct (filepath, jstruct, callback) { //12/21/20 by DW -- from River6
	utils.sureFilePath (filepath, function () {
		fs.writeFile (filepath, utils.jsonStringify (jstruct), function (err) {
			if (callback !== undefined) {
				callback (err);
				}
			});
		});
	}
function fsReadStruct (filepath, callback) { //12/21/20 by DW -- from River6
	utils.sureFilePath (filepath, function () {
		fs.readFile (filepath, function (err, data) {
			var jstruct;
			if (err) {
				callback (err);
				}
			else {
				try {
					jstruct = JSON.parse (data);
					callback (undefined, jstruct);
					}
				catch (err) {
					callback (err);
					}
				}
			});
		});
	}

