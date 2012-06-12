
// Object approach
var KEY = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	W: 87,
	S: 83,
	Z: 90,
	X: 88,
}

var game = {
	scoreA : 0, // score for player A
	scoreB : 0 // score for player B
}
game.pressedKeys = [];

game.nut = {
	speed: 5,
	x: 250,
	y: 0,
	directionX: 0,
	directionY: 1
}

//randomXandSpeed();

$(function(){
	// set interval to call gameloop every 30 milliseconds
	game.timer = setInterval(gameloop,30);
	// mark down what key is down and up into an array called "pressedKeys"
	$(document).keydown(function(e){
		game.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e){
		game.pressedKeys[e.which] = false;
	});
		
	function gameloop() {
		
		movenutters();
		movenut();
	}
	
	function movenutters() {
		// use our custom timer to continuously check if a key is pressed.
		if (game.pressedKeys[KEY.LEFT]) { // arrow-up
			// move the nutter B up 5 pixels
			var left = parseInt($("#nutterB").css("left"));
			$("#nutterB").css("left",left-5);
		}
		if (game.pressedKeys[KEY.RIGHT]) { // arrow-down
			// move the nutter B down 5 pixels
			var left = parseInt($("#nutterB").css("left"));
			$("#nutterB").css("left",left+5);
		}
		if (game.pressedKeys[KEY.Z]) { // w
			// move the nutter A up 5 pixels
			var left = parseInt($("#nutterA").css("left"));
			$("#nutterA").css("left",left-5);
		}
		if (game.pressedKeys[KEY.X]) { // s
			// move the nutter A down 5 pixels
			var left = parseInt($("#nutterA").css("left"));
			$("#nutterA").css("left",left+5);
		}
	}
});

function randomXandSpeed() {
	//nut.speed = Math.floor((Math.random()*27 - Math.random()*22)+1);
	//nut.x = Math.floor((Math.random()*99 - Math.random()*77)+1);
	nut.y = 0;
}

function movenut() {
	// reference useful variables
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var nut = game.nut;
	// check playground boundary
	// check bottom edge
	if (nut.y + nut.speed*nut.directionY > playgroundHeight) {
		//nut.directionY = -1;
		
		randomXandSpeed();
	}
	// check top edge
	if (nut.y + nut.speed*nut.directionY < 0){
		nut.directionY = 1;
	}
	
	// check right edge
	if (nut.x +nut.speed*nut.directionX > playgroundWidth){
		
		
		// reset the nut;
		nut.x = 250;
		nut.y = 100;
		$("#nut").css({
			"left": nut.x,
			"top" : nut.y
		});
		nut.directionX = 0;
	}
	// check left edge
	if (nut.x + nut.speed*nut.directionX < 0){
		
		// reset the nut;
		nut.x = 150;
		nut.y = 100;
		$("#nut").css({
			"left": nut.x,
			"top" : nut.y
		});
		nut.directionX = 0;
	}
	
	nut.x += nut.speed * nut.directionX;
	nut.y += nut.speed * nut.directionY;
	
	/////////////////////////
	// check left nutter
	var nutterAX = parseInt($("#nutterA").css("left"))+parseInt($("#nutterA").css("width"));
	var nutterAYBottom = parseInt($("#nutterA").css("top"))+parseInt($("#nutterA").css("height"));
	var nutterAYTop = parseInt($("#nutterA").css("top"));
	if (nut.x + nut.speed*nut.directionX < nutterAX){
		if (nut.y + nut.speed*nut.directionY <= nutterAYBottom &&
			nut.y + nut.speed*nut.directionY >= nutterAYTop){
				randomXandSpeed();
				// player B lost.
				game.scoreA++;
				$("#scoreA").html(game.scoreA);
		}
	}
	// check right nutter
	var nutterBX = parseInt($("#nutterB").css("left"));
	var nutterBYBottom = parseInt($("#nutterB").css("top"))+parseInt($("#nutterB").css("height"));
	var nutterBYTop = parseInt($("#nutterB").css("top"));
	if (nut.x + nut.speed*nut.directionX >= nutterBX){
		if (nut.y + nut.speed*nut.directionY <= nutterBYBottom &&
			nut.y + nut.speed*nut.directionY >= nutterBYTop){
			randomXandSpeed();
			// player A lost.
			game.scoreB++;
			$("#scoreB").html(game.scoreB);
		}
	}
	/////////////////////////
	
	// actually move the nut with speed and direction
	$("#nut").css({
		"left" : nut.x,
		"top" : nut.y
	});
}