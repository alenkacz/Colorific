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
	var count = sessionStorage.getItem(key);
	count++;
	sessionStorage.setItem(key, count);
};

HighscoreStorage.prototype.getWinPercentage = function() {
	var loses = sessionStorage.getItem(losesTotalKey);
	var wins = sessionStorage.getItem(winsTotalKey);
	
	console.log(wins/loses);
	
	return parseInt(wins/loses * 100);
};