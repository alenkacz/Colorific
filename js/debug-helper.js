function generateTestDesk() {
	gameDesk.desk[0][0].color = "#e62e2e";
	gameDesk.desk[0][1].color = "#2a9e13";
	gameDesk.desk[0][2].color = "#2a9e13";
	
	gameDesk.desk[1][0].color = "#1122db";
	gameDesk.desk[1][1].color = "#2a9e13";
	gameDesk.desk[1][2].color = "#2a9e13";
	
	gameDesk.desk[2][0].color = "#1122db";
	gameDesk.desk[2][1].color = "#1122db";
	gameDesk.desk[2][2].color = "#1122db";
}

function generateTestDesk2() {
	gameDesk.desk[0][0].visible = false;
	gameDesk.desk[0][1].color = "#e62e2e";
	gameDesk.desk[0][2].color = "#1122db";
	gameDesk.desk[0][3].visible = false;
	
	gameDesk.desk[1][0].visible = false;
	gameDesk.desk[1][1].color = "#e62e2e";
	gameDesk.desk[1][2].color = "#1122db";
	gameDesk.desk[1][3].visible = false;
	
	gameDesk.desk[2][1].color = "#1122db";
	gameDesk.desk[2][2].color = "#2a9e13";
	gameDesk.desk[2][3].visible = false;
	
	gameDesk.desk[3][1].color = "#ffaa00";
	gameDesk.desk[3][2].color = "#2a9e13";
	gameDesk.desk[3][3].color = "#2a9e13";
	
	gameDesk.desk[4][1].color = "#1122db";
	gameDesk.desk[4][2].color = "#ffaa00";
	gameDesk.desk[4][3].color = "#1122db";
}

function logDeskStatus() {
	for(var i = 0; i < gameDesk.deskSize; i++) {
		var line = "";
		for(var j = 0; j < gameDesk.deskSize; j++) {
			if(!gameDesk.desk[i][j].visible) {
				line += 0;
			} else {
				line += colorToInt(gameDesk.desk[i][j].color)
			}
		}
		
		$("#log").append(line + "<br />");
	}
	
	$("#log").append("<br /><br />");
}

function colorToInt(color) {
	if(color == "#1122db") {
		return 1;
	}
	
	if(color == "#ffaa00") {
		return 2;
	}
	
	if(color == "#2a9e13") {
		return 3;
	}
	
	if(color == "#e62e2e") {
		return 4;
	}
}