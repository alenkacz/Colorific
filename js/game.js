function Game(gameDesk) {
	this.time = 0;
	this.defaultDesk = "m";
	this.activeDesk = "m";
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
	$("#main-surface").mousemove(gameDesk.handleHover);
	$("#restart-button").click(game.restart);
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
		// save time
		// show time and update score
	}
};

Game.prototype.restart = function() {
	$("#win").css("display","none");
	$("#lose").css("display","none");
	
	timer.restart();
	settings = new GameSettings();
	highscore.update();
	
	gameDesk.resetDesk(game.activeDesk);
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