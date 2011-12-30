function Game(gameDesk) {
	this.time = 0;
	this.defaultDesk = "m";
}

/**
 * Init the game and start it
 */
Game.prototype.start = function() {
	gameDesk.initDesk(this.defaultDesk);
	gameDesk.drawDesk();
	
	timer = new Timer();
	timer.start();
	
	$("#main-surface").click(game.handleClick);
	//$("#restart-button").click(game.restart);
	$("#s").click(game.small);
	$("#m").click(game.medium);
	$("#xl").click(game.big);
};

Game.prototype.handleClick = function(e) {
	gameDesk.handleClick(e);
	game.checkEndOfGame();
};

Game.prototype.checkEndOfGame = function() {
	if(!gameDesk.isAnyMoveLeft()) {
		var elapsed = timer.stopAndGetElapsedTime();
		if(gameDesk.isAWin()) {
			// winner
			highscoreStorage.addToWinsCount();
		} else {
			highscoreStorage.addToLosesCount();
		}
		
		if(gameDesk.isAWin()) {
			$("#win").css("display","block");
		} else {
			$("#lose").css("display","block");
		}
		$("#start-new-game").css("display","block");
		// save time
		// show time and update score
	}
};

Game.prototype.restart = function(size) {
	$("#start-new-game").css("display","none");
	timer.restart();
	settings = new GameSettings();
	highscore.update();
	
	gameDesk.resetDesk(size);
	gameDesk.repaint();
};

Game.prototype.small = function() {
	game.restart("s");
};

Game.prototype.medium = function() {
	game.restart("m");
};

Game.prototype.big = function() {
	game.restart("xl");
};

Game.prototype.isFinished = function() {
	
};