// TODO
// find tiles with same color nearby
// falling tiles when space is open

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
	this.tileSize = 30;
	this.spaceSize = 2;
	this.deskSize = 15;
	this.startPos = 50;
	this.desk = new Array(this.deskSize);
	
	for(var i=0; i <this.deskSize; i++) {
		this.desk[i] = new Array(this.deskSize);
	}
};

GameDesk.prototype.initDesk = function() {
	var cGen = new ColorGenerator();
	var x = this.startPos, y = this.startPos;
	for(var i = 0; i < this.deskSize; i++) {
		for(var j = 0; j < this.deskSize; j++) {
			this.desk[i][j] = new Rectangle(x,y, this.tileSize);
			this.desk[i][j].color = cGen.getRandomColor();
			x += this.tileSize + this.spaceSize;
		}
		y += this.tileSize + this.spaceSize;
		x = this.startPos;
	}
};

GameDesk.prototype.drawDesk = function() {
	for(var i = 0; i < this.deskSize; i++) {
		for(var j = 0; j < this.deskSize; j++) {
			this.desk[i][j].draw();
		}
	}
};

GameDesk.prototype.repaint = function() {
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	gameDesk.drawDesk();
};

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
};

/**
 * Returns position of the tile inside the gamedesk
 * @param x x position of the click
 * @returns {Number} position of the tile
 */
GameDesk.prototype.getTilePosition = function(x) {
	var pos = x - this.startPos - 10;
	return parseInt(pos / (this.tileSize + this.spaceSize/2));
};

GameDesk.prototype.handleTileClick = function(row,side) {
	var color = this.desk[row][side].color;
	gameDesk.exploreNeighborsAndFindMatch(row,side,color);
	gameDesk.repaint();
};

/**
 * Changes the visibility of given tile
 * @param row x coordinate
 * @param side y coordinate
 */
GameDesk.prototype.hideTile = function(row,side) {
	this.desk[row][side].color = "#fff";
	this.desk[row][side].visible = false;
}

GameDesk.prototype.exploreNeighborsAndFindMatch = function(row,side,color) {
	if(this.desk[row][side].color == color) {
		// matches!
		gameDesk.hideTile(row,side);
		
		// explore neighbors
		if(side > 0) gameDesk.exploreNeighborsAndFindMatch(row,side-1,color); //left
		if(side < (this.deskSize-1)) gameDesk.exploreNeighborsAndFindMatch(row,side+1,color); //right
		if(row > 0) gameDesk.exploreNeighborsAndFindMatch(row-1,side,color); //top
		if(row < (this.deskSize-1)) gameDesk.exploreNeighborsAndFindMatch(row+1,side,color); //bottom
	}
}

GameDesk.prototype.handleClick = function(e) {
	if(gameDesk.isInsideDesk(e.clientX, e.clientY)) {
		var side = gameDesk.getTilePosition(e.clientX);
		var row = gameDesk.getTilePosition(e.clientY);
		
		gameDesk.handleTileClick(row,side);
	}
};

/** RECTANGLE **/

function Rectangle(x,y, tileSize) {
	this.x = x;
	this.y = y;
	this.tileSize = tileSize;
	this.color = "#000";
	this.visible = true;
}

Rectangle.prototype.draw = function() {
	var ctx = canvas.getContext('2d'); 
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x,this.y,this.tileSize,this.tileSize);
};

/** COLOR GENERATOR **/

/**
 * Class responsible for random color generation for tiles
 */
function ColorGenerator() {
	this.colors = ["#e62e2e","#2a9e13","#1122db","#ffaa00"];
}

/**
 * Returns random number from a provided array of numbers
 * @returns string containing a hexa color
 */
ColorGenerator.prototype.getRandomColor = function() {
	return this.colors[Math.floor(Math.random()*4)];
};