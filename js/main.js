var canvas;

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	var gameDesk = new GameDesk();
	gameDesk.drawDesk();
});

/** GAME DESK **/

function GameDesk() {
	this.tileSize = 50;
	this.deskSize = 10;
	this.startPos = 50;
	this.desk = new Array(this.deskSize);
	
	for(var i=0; i <3; i++) {
		this.desk[i] = new Array(this.deskSize);
	}
}

GameDesk.prototype.drawDesk = function() {
	var x = this.startPos, y = this.startPos;
	for(var i = 0; i < this.deskSize; i++) {
		for(var j = 0; j < this.deskSize; j++) {
			this.desk[i,j] = new Rectangle(x,y, this.tileSize);
			this.desk[i,j].draw();
			
			x += this.tileSize + 2;
		}
		y += this.tileSize + 2;
		x = this.startPos;
	}
}

/** RECTANGLE **/

function Rectangle(x,y, tileSize) {
	this.x = x;
	this.y = y;
	this.tileSize = tileSize;
}

Rectangle.prototype.draw = function() {
	var ctx = canvas.getContext('2d'); 
	ctx.fillRect(this.x,this.y,this.tileSize,this.tileSize);
}