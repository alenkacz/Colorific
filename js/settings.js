function GameSettings() {
	this.small = new DeskSettings(9,3);
	this.medium = new DeskSettings(12,3);
	this.big = new DeskSettings(16,4);
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

function DeskSettings(deskSize, colorCount) {
	this.deskSize = deskSize;
	this.colorCount = colorCount;
}