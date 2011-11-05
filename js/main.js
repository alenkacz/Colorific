var size = 50; // size of the rectangle
var canvas;

function Rectangle(x,y) {
	this.x = x;
	this.y = y;
}

Rectangle.prototype.draw = function() {
	var ctx = canvas.getContext('2d'); 
	ctx.fillRect(this.x,this.y,size,size);
}

$(document).ready(function() {
	canvas = document.getElementById('main-surface');
	var rect = new Rectangle(20,40);
	rect.draw();
});