// TODO
// tile can be removed only when there are two of the same color
// when space left on the x, the remaining tiles should slide there

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
	this.tileSize = 25;
	this.spaceSize = 2;
	this.deskSize = 15;
	this.startPos = 50;
	
	this.posX = 0;
	this.posY = 0;
	
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
			
			this.desk[i][j].posX = j;
			this.desk[i][j].posY = i;
			
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
			if(this.desk[i][j].visible) {
				this.desk[i][j].draw();
			}
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
	var pos = x - this.startPos - 15;
	return parseInt(pos / (this.tileSize + this.spaceSize/2));
};

/**
 * Tile was clicked - handles all work containing deactivating 
 * this tile and all neighbors with the same color, moving the ones above
 * and repainting the whole screen
 * 
 * @param row y coordinate
 * @param side x coordinate
 */
GameDesk.prototype.handleTileClick = function(row,side) {
	var color = this.desk[row][side].color;
	
	gameDesk.exploreNeighborsAndFindMatch(row,side,color);
	gameDesk.moveHangingTiles();

	gameDesk.repaint();
};

/**
 * Changes the visibility of given tile
 * @param row x coordinate
 * @param side y coordinate
 */
GameDesk.prototype.hideTile = function(row,side) {
	this.desk[row][side].visible = false;
}

/**
 * Recursively calls looking for neighbors of the same color and hiding them
 * @param row x coordinate
 * @param side y coordinate
 * @param color color of the element that was clicked
 */
GameDesk.prototype.exploreNeighborsAndFindMatch = function(row,side,color) {
	if(this.desk[row][side].color == color && this.desk[row][side].visible) {
		// matches!
		gameDesk.hideTile(row,side);
		
		// explore neighbors
		if(side > 0) gameDesk.exploreNeighborsAndFindMatch(row,side-1,color); //left
		if(side < (this.deskSize-1)) gameDesk.exploreNeighborsAndFindMatch(row,side+1,color); //right
		if(row > 0) gameDesk.exploreNeighborsAndFindMatch(row-1,side,color); //top
		if(row < (this.deskSize-1)) gameDesk.exploreNeighborsAndFindMatch(row+1,side,color); //bottom
	}
};

/**
 * Finds all tiles that are right above a hole and need to fall down
 */
GameDesk.prototype.moveHangingTiles = function() {
	var result = new Array();
	var counter = 0;
	for(var i = this.deskSize-2; i > -1; i--) { // second row from bottom
		for(var j = 0; j < this.deskSize; j++) {
			if(!this.desk[i+1][j].visible && this.desk[i][j].visible) {
				// need to fall down
				result[counter++] = this.desk[i][j];
			}
		}
	}

	// now we have list of all rectangles that needs to fall down
	gameDesk.tilesFallDown(result);
};

/**
 * Processes all tiles that are moving down after this click
 * @param arr all tiles that have a non visible tile under them
 */
GameDesk.prototype.tilesFallDown = function(arr) {
	console.log(arr);
	for(var i = 0; i < arr.length; i++) {
		for(var j = arr[i].posY; j > -1; j--) { // for all tiles above this one
			var tile = this.desk[j][arr[i].posX];
			if(tile.visible) {
				var newTile = gameDesk.moveTileDown(tile);
				this.desk[newTile.posY][newTile.posX] = newTile;
				this.desk[j][arr[i].posX].visible = false;
			}
		}
	}
};

/**
 * Creates a new tile from a given tile that is placed one row below the original one
 * @param tile original tile
 * @returns {___result0} new tile with proper coordinates and other attributes
 */
GameDesk.prototype.moveTileDown = function(tile) {
	var newY = gameDesk.countFallenTileY(tile.posX, tile.posY);
	var result = new Rectangle(tile.x, newY, this.tileSize);
	
	result.posX = tile.posX;
	result.posY = gameDesk.countFallenTileRowIndex(tile.posX,tile.posY);
	
	result.color = tile.color;
	
	return result;
};

GameDesk.prototype.countFallenTileY = function(side, row) {
	var tileRow = row+1;
	if(tileRow >= this.deskSize) return tileRow;
	
	while(!this.desk[tileRow][side].visible) {
		if(++tileRow >= this.deskSize) {
			break;
		}
	}
	
	return this.desk[tileRow-1][side].y;
};

GameDesk.prototype.countFallenTileRowIndex = function(side, row) {	
	var tileRow = row+1;
	if(tileRow >= this.deskSize) return tileRow;
	
	while(!this.desk[tileRow][side].visible) {
		if(++tileRow >= this.deskSize) {
			break;
		}
	}
	
	return (tileRow-1);
};

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