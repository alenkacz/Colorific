var losesTotalKey = "losesTotal";
var winsTotalKey = "winsTotal";
var shortestKey = "shortest";
var losesInRowKey = "losesInRow";

var small = "s";
var medium = "m";
var big = "b";

function HighscoreStorage() {}

HighscoreStorage.prototype.addToLosesCount = function() {
	highscoreStorage.addOneToStorage(losesTotalKey);
};

HighscoreStorage.prototype.addToWinsCount = function() {
	highscoreStorage.addOneToStorage(winsTotalKey);
};

HighscoreStorage.prototype.addOneToStorage = function(key) {
	var count = localStorage[key];
	count++;
	localStorage[key] = count;
};

HighscoreStorage.prototype.getWinPercentage = function() {
	var loses = localStorage[losesTotalKey];
	var wins = localStorage[winsTotalKey];
	
	if(isNaN(wins) || isNaN(Number.NaN)) return 0;
	
	return parseInt(wins/loses * 100);
};