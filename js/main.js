// TODO
// remove the big fat bug
// score - shortest game, win/loses percentage
// do necessary steps when game ended
// lose must be counted even if the game is not finished but sarted (was clicked)
// grafika - right panel, start new game

var blueImg;
var greenImg;
var yellowImg;
var redImg;
var preloadedImagesCounter = 0;

initImages();

var canvas;
var gameDesk;
var game;
var timer;
var settings;
var highscore;
var highscoreStorage;
var debug = false;

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	
	highscore = new Highscore();
	highscoreStorage = new HighscoreStorage();
	settings = new GameSettings();
	gameDesk = new GameDesk();
	
	highscore.update();
	
	game = new Game(gameDesk);
});

/** IMAGES **/

function initImages() {
	blueImg = new Image();
	greenImg = new Image();
	yellowImg = new Image();
	redImg = new Image();
	
	blueImg.src = 'img/blue-full.png';
	greenImg.src = 'img/yellow-empty.png';
	yellowImg.src = 'img/red-empty.png';
	redImg.src = 'img/blue-empty.png';
	
	blueImg.onload = function() {
		imgLoaderCallback();
	};
	greenImg.onload = function() {
		imgLoaderCallback();
	};
	yellowImg.onload = function() {
		imgLoaderCallback();
	};
	redImg.onload = function() {
		imgLoaderCallback();
	};
}

function imgLoaderCallback() {
	preloadedImagesCounter++;
	if(preloadedImagesCounter == 4) {
		game.start();
	}
}

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
	
	if(this.color == "#e62e2e") {
		ctx.drawImage(blueImg, this.x,this.y);
	} else if(this.color == "#2a9e13") {
		ctx.drawImage(greenImg, this.x,this.y);
	} else if(this.color == "#1122db") {
		ctx.drawImage(yellowImg, this.x,this.y);
	} else {
		ctx.drawImage(redImg, this.x,this.y);
	}
};

/** COLOR GENERATOR **/

/**
 * Class responsible for random color generation for tiles
 */
function ColorGenerator(maxCount, colors) {
	this.colorsBuffer = ["#e62e2e","#2a9e13","#1122db","#ffaa00"];
	this.colors = colors;
	
	this.maxCount = maxCount;
}

/**
 * Returns random number from a provided array of numbers
 * @returns string containing a hexa color
 */
ColorGenerator.prototype.getRandomColor = function() {
	return this.colors[Math.floor(Math.random()*this.maxCount)];
};