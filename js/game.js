function Game(gameDesk) {
	this.gameDesk = gameDesk;
	this.time = 0;
}

/**
 * Init the game and start it
 */
Game.prototype.start = function() {
	this.gameDesk.initDesk();
	this.gameDesk.drawDesk();
	$("#main-surface").click(gameDesk.handleClick);
};

Game.prototype.isEndOfGame = function() {
	if(!this.gameDesk.isAnyMoveLeft()) {
		// save time
		// show time and update score
	}
};

Game.prototype.restart = function() {
	
};

Game.prototype.isFinished = function() {
	
};