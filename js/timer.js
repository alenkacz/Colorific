function Timer() {
	this.startTime = new Date();
	this.timer;
};

Timer.prototype.init = function() {
	this.timer = window.setInterval(timer.updateTime, 500);
};

/**
 * Updates displayed time, called as a setInterval callback
 */
Timer.prototype.updateTime = function() {
	var now = new Date();
	var diff = now - timer.startTime;
	
	var minutes = timer.getMinutes(diff);
	var seconds = timer.getSeconds(diff);
	
	var zero = (seconds < 10)? "0": "";
	var timeString = minutes + ":" + zero + seconds;
	$("#timer").html(timeString);
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