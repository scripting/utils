* 1/2/25; 12:56:10 PM by DW
   * Export addPeriodAtEnd.
* 12/28/24; 12:46:09 PM by DW
   * Added optional param to getDomainFromUrl. 
* 10/21/24; 9:57:21 AM by DW
   * Added getObjectFromJsontext.
* 8/24/21 by DW
   * utils.httpExt2MIME now recognizes "opml" as an extension mapping it to text/xml.
* 6/17/20 by DW
   * Routines that depend on strftime.js now work in Node. 
* 3/30/20 by DW
   * In stringContains, if the string is undefined, return false.
* 1/28/20 by DW
   * Fixed a bug in getBoolean. When passed "1" (a string, not a number) it would return false. Now it returns true. 
