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
	if(isNaN(count)) count = 0;
	count++;
	localStorage[key] = count;
};

HighscoreStorage.prototype.getWinPercentage = function() {
	var loses = parseInt(localStorage[losesTotalKey]);
	var wins = parseInt(localStorage[winsTotalKey]);
	
	if(isNaN(wins)) return 0;
	if(isNaN(loses)) loses = 0;
	
	return parseInt(wins/loses * 100);
};