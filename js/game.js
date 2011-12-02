function Game(gameDesk) {
	this.time = 0;
}

/**
 * Init the game and start it
 */
Game.prototype.start = function() {
	gameDesk.initDesk();
	gameDesk.drawDesk();
	
	timer = new Timer();
	timer.init();
	
	$("#main-surface").click(game.handleClick);
	$("#restart-button").click(game.restart);
};

Game.prototype.handleClick = function(e) {
	gameDesk.handleClick(e);
	game.checkEndOfGame();
}

Game.prototype.checkEndOfGame = function() {
	if(!gameDesk.isAnyMoveLeft()) {
		alert("End of game");
		// save time
		// show time and update score
	}
};

Game.prototype.restart = function() {
	gameDesk.resetDesk();
	gameDesk.drawDesk();
};

Game.prototype.isFinished = function() {
	
};