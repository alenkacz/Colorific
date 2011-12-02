function Timer() {
	this.startTimer;
	this.timer;
};

Timer.prototype.start = function() {
	this.timer = window.setInterval(timer.updateTime, 500);
	this.startTime = new Date();
};

Timer.prototype.restart = function() {
	$("#timer").html("0:00");
	timer.stopAndGetElapsedTime();
	timer.start();
};

Timer.prototype.stopAndGetElapsedTime = function() {
	var diff = new Date() - timer.startTime;
	
	var elapsed = timer.getElapsedString(diff);
	window.clearInterval(this.timer);
	
	return elapsed;
};

/**
 * Updates displayed time, called as a setInterval callback
 */
Timer.prototype.updateTime = function() {
	var now = new Date();
	var diff = now - timer.startTime;

	var timeString = timer.getElapsedString(diff);
	$("#timer").html(timeString);
};

Timer.prototype.getElapsedString = function(diff) {
	var minutes = timer.getMinutes(diff);
	var seconds = timer.getSeconds(diff);
	
	var zero = (seconds < 10)? "0": "";
	return minutes + ":" + zero + seconds;
};

/**
 * Gets number of minutes from miliseconds
 * @param diff number of miliseconds from game start
 * @returns number of minutes from game start
 */
Timer.prototype.getMinutes = function(diff) {
	return parseInt(diff / 60000);
};

/**
 * Get number of seconds from miliseconds
 * @param diff number of miliseconds from the game start
 * @returns {Number} number of seconds from the game last minutes
 */
Timer.prototype.getSeconds = function(diff) {
	return (parseInt(diff / 1000) % 60);
};