function Game(gameDesk) {
	this.time = 0;
}

/**
 * Init the game and start it
 */
Game.prototype.start = function() {
	gameDesk.initDesk();
	gameDesk.drawDesk();
	
	$("#main-surface").click(game.handleClick);
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
	
};

Game.prototype.isFinished = function() {
	
};