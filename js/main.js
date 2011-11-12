var canvas;
var gameDesk;

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	
	gameDesk = new GameDesk();
	gameDesk.initDesk();
	gameDesk.drawDesk();
	$(document).click(gameDesk.handleClick);
});

/** GAME DESK **/

function GameDesk() {
	this.tileSize = 50;
	this.spaceSize = 2;
	this.deskSize = 10;
	this.startPos = 50;
	this.desk = new Array(this.deskSize);
	
	for(var i=0; i <this.deskSize; i++) {
		this.desk[i] = new Array(this.deskSize);
	}
}

GameDesk.prototype.initDesk = function() {
	var x = this.startPos, y = this.startPos;
	for(var i = 0; i < this.deskSize; i++) {
		for(var j = 0; j < this.deskSize; j++) {
			this.desk[i][j] = new Rectangle(x,y, this.tileSize);
			x += this.tileSize + this.spaceSize;
		}
		y += this.tileSize + this.spaceSize;
		x = this.startPos;
	}
}

GameDesk.prototype.drawDesk = function() {
	for(var i = 0; i < this.deskSize; i++) {
		for(var j = 0; j < this.deskSize; j++) {
			this.desk[i][j].draw();
		}
	}
}

GameDesk.prototype.repaint = function() {
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	gameDesk.drawDesk();
}

/**
 * Determines whether the given x,y position is inside the gamedesk
 */
GameDesk.prototype.isInsideDesk = function(x,y) {
	if(x < this.startPos || y < this.startPos) {
		return false;
	}
	var deskSize = this.startPos + this.deskSize*(this.tileSize+this.spaceSize);
	if((x < deskSize) && (y < deskSize)) {
		return true;
	}
	
	return false;
}

/**
 * Returns position of the tile inside the gamedesk
 * @param x x position of the click
 * @returns {Number} position of the tile
 */
GameDesk.prototype.getTilePosition = function(x) {
	var pos = x - this.startPos;
	return parseInt(pos / (this.tileSize + this.spaceSize/2));
}

GameDesk.prototype.handleTileClick = function(row,side) {
	this.desk[row][side].color = "ff0000";
	gameDesk.repaint();
}

GameDesk.prototype.handleClick = function(e) {
	if(gameDesk.isInsideDesk(e.clientX, e.clientY)) {
		var side = gameDesk.getTilePosition(e.clientX);
		var row = gameDesk.getTilePosition(e.clientY);
		
		gameDesk.handleTileClick(row,side);
	}
}

/** RECTANGLE **/

function Rectangle(x,y, tileSize) {
	this.x = x;
	this.y = y;
	this.tileSize = tileSize;
	this.color = "#000";
}

Rectangle.prototype.draw = function() {
	var ctx = canvas.getContext('2d'); 
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x,this.y,this.tileSize,this.tileSize);
}