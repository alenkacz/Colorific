function GameSettings() {
	this.small = new DeskSettings(9,3,98);
	this.medium = new DeskSettings(12,3,59);
	this.big = new DeskSettings(15,3,20);
};

GameSettings.prototype.getDesk = function(id) {
	if(id == "s") {
		return this.small;
	}
	
	if(id == "m") {
		return this.medium;
	}
	
	return this.big;
};

function DeskSettings(deskSize, colorCount, startPos) {
	this.deskSize = deskSize;
	this.colorCount = colorCount;
	this.colors = chooseRandomColors();
	this.startPos = startPos;
}

function chooseRandomColors() {
	var index = Math.floor(Math.random()*3);

	if(index == 0) {
		return ["#1122db", "#ffaa00", "#e62e2e"];
	} else if(index == 1) {
		return ["#1122db", "#ffaa00", "#e62e2e"];
	} else {
		return ["#2a9e13", "#1122db", "#ffaa00"];
	}
};