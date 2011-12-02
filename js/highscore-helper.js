var losesTotalKey = "losesTotal";
var winsTotalKey = "winsTotal";
var shortestKey = "shortest";
var losesInRowKey = "losesInRow";

var small = "s";
var medium = "m";
var big = "b";

function HighscoreHelper() {}

HighscoreHelper.prototype.addToLosesCount = function() {
	storageHelper.addOneToStorage(losesTotalKey);
};

HighscoreHelper.prototype.addToWinsCount = function() {
	storageHelper.addOneToStorage(winsTotalKey);
};

HighscoreHelper.prototype.addOneToStorage = function(key) {
	var count = sessionStorage.getItem(key);
	loses++;
	sessionStorage.setItem(key, count);
};

HighscoreHelper.prototype.getWinPercentage = function() {
	var loses = sessionStorage.getItem(losesTotalKey);
	var wins = sessionStorage.getItem(winsTotalKey);
	
	return parseInt(wins/loses * 100);
};