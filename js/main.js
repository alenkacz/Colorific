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
	setupSlider();
	
	game = new Game(gameDesk);
});

function setupSlider() {
	$(document).ready(function() {
		$("#slider-handle").slider({
			value:50,
			min:0,
			max:100,
			step:50,
			change: function( event, ui ) {
				sizeChanged($( "#slider-handle" ).slider( "value" ));
			},
		});
	});
}

function sizeChanged(val) {
	$(".slider-item").removeClass("active");
	
	if(val == 0) {
		game.activeDesk = "s";
		$(".slider-item.s").addClass("active");
	} else if(val == 50) {
		game.activeDesk = "m";
		$(".slider-item.m").addClass("active");
	} else {
		game.activeDesk = "l";
		$(".slider-item.l").addClass("active");
	}
}

/** IMAGES **/

function initImages() {
	blueImg = new Image();
	greenImg = new Image();
	yellowImg = new Image();
	redImg = new Image();
	
	blueImgActive = new Image();
	greenImgActive = new Image();
	yellowImgActive = new Image();
	redImgActive = new Image();
	
	blueImg.src = 'img/blueImg.png';
	greenImg.src = 'img/yellowImg.png';
	yellowImg.src = 'img/redImg.png';
	redImg.src = 'img/greenImg.png';
	
	blueImgActive.src = 'img/blueImgActive.png';
	greenImgActive.src = 'img/yellowImgActive.png';
	yellowImgActive.src = 'img/redImgActive.png';
	redImgActive.src = 'img/greenImgActive.png';
	
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
	
	blueImgActive.onload = function() {
		imgLoaderCallback();
	};
	greenImgActive.onload = function() {
		imgLoaderCallback();
	};
	yellowImgActive.onload = function() {
		imgLoaderCallback();
	};
	redImgActive.onload = function() {
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
	this.hover = false;
}

Rectangle.prototype.draw = function() {
	var ctx = canvas.getContext('2d'); 
	
	if(this.color == "#e62e2e") {
		if(this.hover) {
			ctx.drawImage(blueImgActive, this.x,this.y);
		} else {
			ctx.drawImage(blueImg, this.x,this.y);
		}
	} else if(this.color == "#2a9e13") {
		if(this.hover) {
			ctx.drawImage(greenImgActive, this.x,this.y);
		} else {
			ctx.drawImage(greenImg, this.x,this.y);
		}
	} else if(this.color == "#1122db") {
		if(this.hover) {
			ctx.drawImage(yellowImgActive, this.x,this.y);
		} else {
			ctx.drawImage(yellowImg, this.x,this.y);
		}
	} else {
		if(this.hover) {
			ctx.drawImage(redImgActive, this.x,this.y);
		} else {
			ctx.drawImage(redImg, this.x,this.y);
		}
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