function Highscore() {
	
};

Highscore.prototype.update = function() {
	$("#wins-loses").html(highscoreStorage.getWinPercentage() + "%");
};