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
	
	if(gameDesk.isValidTileClick(row,side,color)) {
		gameDesk.exploreNeighborsAndFindMatch(row,side,color);
		gameDesk.moveHangingTilesVertical();
		gameDesk.moveHangingTilesHorizontal();
	
		gameDesk.repaint();
	}
};

GameDesk.prototype.handleClick = function(e) {
	if(gameDesk.isInsideDesk(e.clientX, e.clientY)) {
		var side = gameDesk.getTilePosition(e.clientX);
		var row = gameDesk.getTilePosition(e.clientY);
		gameDesk.handleTileClick(row,side);
	}
};

/**
 * Changes the visibility of given tile
 * @param row x coordinate
 * @param side y coordinate
 */
GameDesk.prototype.hideTile = function(row,side) {
	this.desk[row][side].visible = false;
};

/**
 * Checks all four neighbors of the tile to see if there is any color match
 * @param row y coordinate
 * @param side x coordinate
 * @param color color we are looking for
 * @returns {Boolean} true if at least one neighbor matches the color
 */
GameDesk.prototype.isValidTileClick = function(row, side, color) {
	var left = gameDesk.doesColorMatch(row,side-1,color);
	var right = gameDesk.doesColorMatch(row,side+1,color);
	var bottom = gameDesk.doesColorMatch(row+1,side,color);
	var top = gameDesk.doesColorMatch(row-1,side,color);
	
	return (left|| right || bottom || top);
};

/**
 * Checks tile on the given coordinate if it matches the given color
 * @param row y coordinate
 * @param side x coordinate
 * @param color color we are looking for
 * @returns {Boolean} true if the color matches
 */
GameDesk.prototype.doesColorMatch = function(row, side, color) {
	if(row >= this.deskSize || side >= this.deskSize || side < 0 || row < 0) {
		return false;
	}

	if(this.desk[row][side].color == color) {
		return true;
	}
	
	return false;
};

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
GameDesk.prototype.moveHangingTilesVertical = function() {
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
 * Finds all columns that are completely empty
 */
GameDesk.prototype.moveHangingTilesHorizontal = function() {
	var result = new Array();
	var counter = 0;
	for(var i = 0; i < (this.deskSize-1); i++) { // not interested in the last right column
		if(gameDesk.isColumnEmpty(i)) {
			var column = gameDesk.getMostRightJoinedEmptyColumn(i);
			if(column != -1) {
				result[counter++] = column;
				i = column; // skip the columns in this iteration
			}
		}
	}
	
	// shift tiles in all empty columns to the left
	gameDesk.shiftEmptyColumns(result);
};

/**
 * Returns true if column is empty
 */
GameDesk.prototype.isColumnEmpty = function(column) {
	for(var j = 0; j < this.deskSize; j++) {
		if(this.desk[j][column].visible) {
			break;
		} else if(!this.desk[j][column].visible && j == (this.deskSize-1)) {
			// last element in the column and still no break - empty column
			return true;
		}
	}
	
	return false;
};

/**
 * Finds the most right column that is still empty and joined with the find empty column index
 * Dealing with several empty columns next to each other
 * @param column
 */
GameDesk.prototype.getMostRightJoinedEmptyColumn = function(column) {
	for(var i = column+1; i < this.deskSize; i++) {
		if(!gameDesk.isColumnEmpty(i)) {
			return (i-1);
		}
	}
	
	return -1;
};

/**
 * Shifts all columns that are to the right of the empty column
 * @param arr array of all columns that are empty
 */
GameDesk.prototype.shiftEmptyColumns = function(arr) {
	for(var i = 0; i < arr.length; i++) { // for empty column
		var number = gameDesk.getNumberOfColumnsEmpty(arr[i]);
		for(var j = arr[i]; j < this.deskSize; j++) {
			gameDesk.shiftColumnToTheLeft(number, j);
		}
		arr = gameDesk.recountEmptyColumnsArray(i, number, arr);
	}
};

/**
 * Returns number of empty columns to the left of the given index
 * @param column index of the column
 * @returns {Number} number of empty columns
 */
GameDesk.prototype.getNumberOfColumnsEmpty = function(column) {
	var count = 1;
	for(var i = column-1; i > 0; i--) {
		if(gameDesk.isColumnEmpty(i)) {
			++count;
		}
	}
	
	return count;
};

/**
 * Shifts columns to the left
 * @param number number of empty columns next to each other
 * @param column number of firt empty column from the right
 */
GameDesk.prototype.shiftColumnToTheLeft = function(number, column) {
	for(var j = 0; j < this.deskSize; j++) {
		if(this.desk[j][column].visible) {
			// shift it to the left
			var newX = this.desk[j][column].x-(number*this.tileSize+number*this.spaceSize);
			var newPosX = this.desk[j][column].posX-number;
			this.desk[j][column-number] = new Rectangle(newX,this.desk[j][column].y, this.tileSize);
			
			this.desk[j][column-number].posX = newPosX;
			this.desk[j][column-number].posY = this.desk[j][column].posY;
			
			this.desk[j][column-number].color = this.desk[j][column].color;

			gameDesk.hideTile(j, column);
		}
	}
};

/**
 * When desk is shifter, the indexes in empty column arrays need to be recounted
 * @param index index in thge array of empty columns
 * @param number number of columns that were shifter to the left
 * @param arr array with the empty column indexes
 * @returns fixed array with empty column indexes
 */
GameDesk.prototype.recountEmptyColumnsArray = function(index,number,arr) {
	for(var i = index+1; i < arr.length; i++) {
		arr[i] = arr[i]-number;
	}
	
	return arr;
};

/**
 * Processes all tiles that are moving down after this click
 * @param arr all tiles that have a non visible tile under them
 */
GameDesk.prototype.tilesFallDown = function(arr) {
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
	var newPosY = gameDesk.countFallenTileRowIndex(tile.posX,tile.posY);
	var newY = gameDesk.getYFromPosition(newPosY);
	
	var result = new Rectangle(tile.x, newY, this.tileSize);
	result.posX = tile.posX;
	result.posY = newPosY;
	
	result.color = tile.color;
	
	return result;
};

/**
 * Counts position of the tile which is on the given row on the desk
 * @param row row number
 * @returns {Number} Y position used for drawing that tile
 */
GameDesk.prototype.getYFromPosition = function(row) {
	return (row*this.tileSize+row*this.spaceSize+this.startPos);
};

/**
 * Computes row index of the tile after it has fallen down
 * @param side y coordinate
 * @param row x coordinate
 * @returns position on the gamedesk
 */
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