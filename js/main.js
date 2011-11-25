// TODO
// todo game loop with endGame checking in Game class
// detection that game ended - no two tiles of same color next to each other
// restart button
// timer

var canvas;
var gameDesk;
var game;

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	
	gameDesk = new GameDesk();
	game = new Game(gameDesk);
	game.start();
});

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