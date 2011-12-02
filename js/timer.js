function Timer() {
	this.startTime = new Date();
	this.timer;
};

Timer.prototype.init = function() {
	this.timer = window.setInterval(timer.updateTime, 500);
};

Timer.prototype.updateTime = function() {
	var now = new Date();
	var diff = now - timer.startTime;
	
	console.log(diff);
	
	var minutes = timer.getMinutes(diff);
	var seconds = timer.getSeconds(diff);
	
	var zero = (seconds < 10)? "0": "";
	var timeString = minutes + ":" + zero + seconds;
	$("#timer").html(timeString);
};

Timer.prototype.getMinutes = function(diff) {
	return parseInt(diff / 60000);
};

Timer.prototype.getSeconds = function(diff) {
	return parseInt(diff / 1000);
};