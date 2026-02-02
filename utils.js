function isUndefined (x) { //11/17/21 by DW -- don't just compare against undefined  
	return ((x === undefined) || (x == null));
	}
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
	if (isUndefined (s)) { //11/17/21 by DW
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
	var urlReadFileApi = "https://httpproxy.scripting.com/httpReadUrl"; //2/26/23 by DW
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
function getDomainFromUrl (url, flRemoveDomainNoise=true) { //7/11/15 by DW
	if ((url != null ) && (url != "")) {
		if (flRemoveDomainNoise) { //12/28/24 by DW
			url = url.replace("www.","").replace("www2.", "").replace("feedproxy.", "").replace("feeds.", "");
			}
		var root = url.split('?')[0]; // cleans urls of form http://domain.com?a=1&b=2
		url = root.split('/')[2];
		}
	return (url);
	};
function getFavicon (url) { //7/18/14 by DW
	var domain = getDomainFromUrl (url);
	return ("//www.google.com/s2/favicons?domain=" + domain); //2/3/23 by DW
	};
function getURLParameter (name, url) { //7/21/14 by DW
	if (url === undefined) { //9/4/21 by DW
		url = location.search;
		}
	return (decodeURI ((RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]));
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
	var defaultCounterServer = "//counters.scripting.com/hello"; //2/2/23 by DW
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
		"You can observe a lot by watching.", //7/22/21 by DW
		"No one tells me anything.", //10/15/21 by DW
		"Just passin' thru", //11/17/21 by DW
		"There's no time like now.", //6/15/24 by DW
		"Mirrors lie.", //6/15/24 by DW
		"Just because you're offended doesn't mean you're right." //7/9/25 PM by DW
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
function getMonthName (theDate) { //1/11/22 by DW
	return (new Date (theDate).toLocaleString ("default", {month: "long"}));
	}
function monthToString (theMonthNum) { //11/4/14 by DW
	var theDate;
	if (theMonthNum === undefined) {
		theDate = new Date ();
		}
	else {
		theDate = new Date ((theMonthNum + 1) + "/2/2014");
		}
	return (getMonthName (theDate)); //1/11/22 by DW
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
		"opml": "text/xml", //8/24/21 by DW
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
function getFacebookTimeString (when, flLongStrings, callerOptions) { //4/27/24 by DW
	function getFormattedString (when, theFormat) { //4/27/24 by DW
		try {
			return (formatDate (when, theFormat));
			}
		catch (err) {
			return ("");
			}
		}
	
	var options = { //3/17/23 by DW
		flBriefYearDates: false,
		nowString: "Just now",
		flUseYesterdayString: true //2/10/24 by DW
		}
	if (callerOptions !== undefined) {
		for (var x in callerOptions) {
			options [x] = callerOptions [x];
			}
		}
	
	const theStrings = (flLongStrings) ? [" minute", " hour"] : [" min", " hr"];
	
	when = new Date (when); //make sure it's a date
	var ctsecs = secondsSince (when), ct, s;
	if (ctsecs < 60) {
		return (options.nowString);
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
		if (flLongStrings) { //7/1/22 by DW
			return ("Yesterday at " + formatDate (when, "%l:%M %p"));
			}
		else {
			if (options.flUseYesterdayString) { //2/10/24 by DW
				return ("Yesterday");
				}
			}
		}
	else { //4/27/24 by DW
		var ctdays = cthours / 24; 
		if (ctdays < 7) {
			const format = (flLongStrings) ? "%A at %l:%M %p" : "%a";
			const daystring = getFormattedString (when, format);
			return (daystring);
			}
		}
	
	var formatstring;
	if (options.flBriefYearDates) { //3/17/23 by DW
		if (ctsecs > (364 * 60 * 60 * 24)) { //more than one year ago -- approx
			formatstring = (flLongStrings) ? "%B %Y" : "%b %Y";  //Feb 2022
			}
		else {
			formatstring = (flLongStrings) ? "%B %e" : "%b %e"; //e.g. Feb 23
			}
		}
	else {
		formatstring = (flLongStrings) ? "%B %e" : "%b %e"; //8/28/22 by DW
		if (when.getFullYear () != now.getFullYear ()) {
			formatstring += ", %Y";
			}
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
function buildParamList (params) { //12/20/22 by DW
	var s = "";
	for (var x in params) {
		if (s.length > 0) {
			s += "&";
			}
		s += x + "=" + encodeURIComponent (params [x]);
		}
	return (s);
	}
function getAllUrlParams (searchstring) { //5/19/23 by DW
	var s = (searchstring === undefined) ? location.search : searchstring;
	var allparams = new Object ();
	if (beginsWith (s, "?")) {
		s = stringDelete (s, 1, 1);
		}
	var splits = s.split ("&");
	splits.forEach (function (item) {
		var splits = item.split ("=");
		allparams [splits [0] ] = decodeURIComponent (splits [1]); //5/19/23 by DW
		});
	return (allparams);
	}
function addToolTip (theObject, tipText, placement="right") { //5/24/23 by DW
	theObject.attr ("data-container", "body"); //10/23/22 by DW
	theObject.attr ("data-toggle", "tooltip");
	theObject.attr ("data-placement", placement);
	theObject.attr ("title", tipText);
	theObject.click (function () { //11/1/22 by DW
		theObject.tooltip ("hide");
		});
	theObject.tooltip (); //5/22/23 by DW
	return (theObject);
	}
function setObjectHtml (theObject, theText) { //6/9/23 by DW
	if (theObject.html () != theText) {
		theObject.html (theText);
		}
	}
function makeBlockVisible (theObject, flMakeVisible) { //6/9/23 by DW
	if (theObject.css ("display") == "block") { //is it currently visible?
		if (!flMakeVisible) {
			theObject.css ("display", "none")
			}
		}
	else {
		if (flMakeVisible) {
			theObject.css ("display", "block")
			}
		}
	}
function myConsoleLog (theLogMessage) { //10/11/23 by DW
	const whenstring = new Date ().toLocaleTimeString ();
	console.log (whenstring + " " + theLogMessage);
	}
function nowstring () { //2/17/24 by DW
	return (new Date ().toLocaleTimeString ());
	}
function mergeOptions (userOptions, options) { //8/14/24 by DW
	if (userOptions !== undefined) {
		for (x in userOptions) {
			if (userOptions [x] !== undefined) {
				options [x] = userOptions [x];
				}
			}
		}
	}
function readConfig (f, config, callback) { //8/14/24 by DW
	fs.readFile (f, function (err, jsontext) {
		if (!err) {
			try {
				var jstruct = JSON.parse (jsontext);
				for (var x in jstruct) {
					config [x] = jstruct [x];
					}
				}
			catch (err) {
				console.log ("readConfig: f == " + f + ", err.message == " + err.message);
				}
			}
		callback ();
		});
	}
function pathBeginsWithNumbers (path, struct) { //9/22/24 by DW
	
	struct.year = undefined;
	struct.month = undefined;
	struct.day = undefined;
	struct.extension = undefined;
	
	if (beginsWith (path, "/")) {
		path = stringDelete (path, 1, 1);
		}
	if (endsWith (path, "/")) {
		path = stringMid (path, 1, path.length - 1);
		}
	const splits = path.split ("/");
	
	if ((splits.length == 0) || (splits.length > 3)) {
		return (false);
		}
	
	if (isNaN (splits [0])) {
		return (false);
		}
	struct.year = Number (splits [0]);
	
	if (splits.length > 1) {
		if (isNaN (splits [1])) {
			return (false);
			}
		struct.month = Number (splits [1]);
		}
	if (splits.length > 2) {
		const daypart = splits [2];
		const daystring = stringNthField (daypart, ".", 1)
		if (isNaN (daystring)) {
			return (false);
			}
		struct.day = Number (daystring);
		
		const extension = stringNthField (daypart, ".", 2);
		struct.extension = (extension.length == 0) ? undefined : extension;
		}
	
	return (true);
	}
function getObjectFromJsontext (jsontext, callback) { //10/21/24 by DW
	var theObject;
	try {
		theObject = JSON.parse (jsontext);
		}
	catch (err) {
		const message = "Can't add or update the post because the JSON text is not valid.";
		callback ({message});
		return (undefined);
		}
	return (theObject);
	}
function clientHttpPost (url, filedata, callback) { //1/21/25 by DW
	var whenstart = new Date ();
	if (!$.isPlainObject (filedata) && (typeof (filedata) != "string")) { //8/2/21 by DW
		filedata = filedata.toString ();
		}
	$.post (url, filedata) 
		.done (function (data, textStatus) {
			if (callback !== undefined) {
				callback (undefined, data);
				}
			})
		.fail (function (jqXHR, textStatus, errorThrown) {
			if (callback !== undefined) {
				let err = {
					message: textStatus
					}
				callback (err);
				}
			});
	}
function countWords (theText) { //4/11/25 by DW
	if (theText === undefined) {
		return (0);
		}
	else {
		theText = stripMarkup (theText);
		const ctwords = theText.trim ().split (/\s+/).length;
		return (ctwords);
		}
	}
function runModalDialog (userOptions, callback) { //12/26/24 by DW
	var options = {
		whereToAppend: $("body"),
		classForDiv: undefined,
		prompt: "",
		classForDiv: undefined,
		dialogBody: $("<div>hello world</div>"),
		flOkButton: true,
		flCancelButton: true
		};
	mergeOptions (userOptions, options);
	
	const theDialog = $("<div class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"windowTitleLabel\" aria-hidden=\"true\"></div>");
	if (options.classForDiv !== undefined) {
		theDialog.addClass (options.classForDiv);
		}
	function closeDialog () {
		theDialog.modal ("hide"); 
		}
	function cancelDialog () {
		if (callback !== undefined) {
			callback (true); //cancelling
			}
		closeDialog ();
		}
	function okDialog () { 
		console.log ("okDialog");
		if (callback !== undefined) {
			const idSite = theSelect.val ();
			const title = (options.flChooseSiteOnly) ? "" : theInputElement.val (); //3/20/24 by DW
			callback (undefined, idSite, title); 
			}
		closeDialog ();
		}
	function getPrompt () {
		var thePrompt = $("<h3>" + options.prompt + "</h3>");
		return (thePrompt);
		}
	function getCancelButton () {
		const theButton = $("<a href=\"#\" class=\"btn\">Cancel</a>");
		theButton.click (cancelDialog);
		return (theButton);
		}
	function getOkButton () {
		const theButton = $("<a href=\"#\" class=\"btn btn-primary btn-wide\">OK</a>");
		theButton.click (okDialog);
		return (theButton);
		}
	function getDialogHeader () {
		const theHeader = $("<div class=\"modal-header\"></div>");
		function getCloseIcon () {
			var theIcon = $("<a href=\"#\" class=\"close\" data-dismiss=\"modal\">&times;</a>");
			theIcon.click (cancelDialog);
			return (theIcon);
			}
		theHeader.append (getCloseIcon ());
		theHeader.append (getPrompt ());
		return (theHeader);
		}
	theDialog.append (getDialogHeader ());
	
	const theBody = $("<div class=\"modal-body\"></div>");
	theBody.append (options.dialogBody);
	theDialog.append (theBody);
	
	const theFooter = $("<div class=\"modal-footer\"></div>");
	if (options.flCancelButton) {
		theFooter.append (getCancelButton ());
		}
	if (options.flOkButton) {
		theFooter.append (getOkButton ());
		}
	
	theDialog.append (theFooter);
	
	options.whereToAppend.append (theDialog);
	
	theDialog.modal ("show");
	
	return (theDialog); //modification -- 11/1/25 by DW
	}
