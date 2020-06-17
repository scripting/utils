var myProductName = "daveutils", myVersion = "0.4.53";  

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

const fs = require ("fs");
const request = require ("request"); //7/22/17 by DW
