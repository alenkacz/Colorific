// TODO
// remove the big fat bug
// score - 1/5 games is a win, shortest game, win/loses percentage
// do necessary steps when game ended
// lose must be counted even if the game is not finished but sarted (was clicked)
// game board should be always in the center of the screen
// grafika

var canvas;
var gameDesk;
var game;
var timer;
var settings;
var highscore;
var highscoreStorage;
var debug = true;

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	
	highscore = new Highscore();
	highscoreStorage = new HighscoreStorage();
	settings = new GameSettings();
	gameDesk = new GameDesk();
	
	highscore.update();
	
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
function ColorGenerator(maxCount) {
	this.colors = ["#e62e2e","#2a9e13","#1122db","#ffaa00"];
	this.maxCount = maxCount;
}

/**
 * Returns random number from a provided array of numbers
 * @returns string containing a hexa color
 */
ColorGenerator.prototype.getRandomColor = function() {
	return this.colors[Math.floor(Math.random()*this.maxCount)];
};