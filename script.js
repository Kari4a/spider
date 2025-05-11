const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;
let player = { x: 300, y: 200, speedY: 0, speedX: 0 };
let helper = { x: 300, y: 200, speedY: 2, speedX: 3 };
let bonuses = [];
let score = 0;
let clickStrong = 1;
let clickCost = 10;
let speedCost = 15;
let dyblCost = 5;
let viziblHelper = false;
let speed = 3;
let level = 1;
let levelCost= 10;
let game = true;

let imgPlayer = new Image();
let imgSwamp = new Image();
let imgGarden = new Image();
let imgHouse = new Image();
let imgWin = new Image();
let imgBonus = new Image();
let imgHelp = new Image();

imgBonus.src = "plamp.png";

imgWin.src = "winner.jpg";

imgSwamp.src = "swamp2.avif";

imgGarden.src = "Garden1.avif";

imgHouse.src = "House.avif";

imgHelp.src = "spider2.png";

imgPlayer.src = "spider.png";
window.onload = function () {
	ctx.drawImage(imgPlayer, player.x, player.y, 60, 60);
};

function background(){
if (score >= levelCost) {
	
	score -= levelCost;
	levelCost *= 2;
	level++;
	if (level == 4){
		game = false;
	}
	document.getElementById("balance").innerHTML = score;
	document.getElementById("level").innerHTML = levelCost;
}
}

function draw() {
	ctx.fillStyle="white";

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (level == 1){
		imgSwamp.src = "swamp2.avif";
	}
	else if(level == 2){
		imgSwamp.src = "Garden1.avif";
	}
	else if(level == 3){
		imgSwamp.src = "House.avif";
	}
	else if(level == 4){
		imgSwamp.src = "winner.jpg";
	}
	console.log(level);
	console.log(imgSwamp.src);
	ctx.drawImage(imgSwamp, 0, 0, canvas.width, canvas.height);
	player.y += player.speedY;
	player.x += player.speedX;
	if (player.y < 0) player.y = 0;
	if (player.y > canvas.height - 60) player.y = canvas.height - 60;
	if (player.x < 0) player.x = 0;
	if (player.x > canvas.width - 60) player.x = canvas.width - 60;

	if (Math.random() < 0.02) {
		createBonus();
	}
	
	drawBonus();
	checkCollision();
	document.getElementById("balance").innerText = score;
	ctx.drawImage(imgPlayer, player.x, player.y, 60, 60);
	if (viziblHelper == true){
		drawHelper();
		UpdateHelpers()
	}
	if(game){
			requestAnimationFrame(draw);
	}

}

function helps() {
	
	if (score >= dyblCost) {
		score -= dyblCost;
		viziblHelper = true;
		dyblCost *= 2;
		helper.speedX =  Math.random() * 4 - 2;
		helper.speedY =  Math.random() * 4 - 2;
		document.getElementById("helpClickBtn").setAttribute('disabled', '');
    
		document.getElementById("balance").innerHTML = score;
		document.getElementById("helpClick").innerHTML = dyblCost;
		
		setTimeout(function () {
			viziblHelper = false;
			document.getElementById("helpClickBtn").disabled = false;
    
		}, 30000);
	}
}
function drawHelper(){
	ctx.drawImage(imgHelp, helper.x, helper.y, 60, 60);
}
function clickk() {
	
	if (score >= clickCost) {
		score -= clickCost;
		clickStrong++;
		clickCost *= 2;
		document.getElementById("balance").innerHTML = score;
		document.getElementById("priseClick").innerHTML = clickCost;
	}
}

function speeddy() {
	
	if (score >= speedCost) {
		score -= speedCost;
		speed++;
		speedCost *=2;
		document.getElementById("balance").innerHTML = score;
		document.getElementById("SpeedClick").innerHTML = speedCost;
	}
}

document.addEventListener("keydown", function (event) {
	if (event.key == "ArrowUp") {
		player.speedY = -speed;
		player.speedX = 0;
	}
	if (event.key == "ArrowDown") {
		player.speedY = speed;
		player.speedX = 0;
	}
	if (event.key == "ArrowLeft") {
		player.speedX = -speed;
		player.speedY = 0;
	}
	if (event.key == "ArrowRight") {
		player.speedX = speed;
		player.speedY = 0;
	}
});
document.addEventListener("keyup", function (event) {
	if (
		event.key == "ArrowUp" ||
		event.key == "ArrowDown" ||
		event.key == "ArrowLeft" ||
		event.key == "ArrowRight"
	) {
		player.speedY = 0;
		player.speedX = 0;
	}
});

function createBonus() {
	let x = Math.random() * (canvas.width - 60);
	let y = Math.random() * (canvas.height - 60);

	bonuses.push({ x, y });
}

function drawBonus() {
	for (let i = 0; i < bonuses.length; i++) {
		ctx.drawImage(imgBonus, bonuses[i].x, bonuses[i].y, 60, 60);
	}
}
function checkCollision() {
	bonuses = bonuses.filter(bonus => {
		let dx = player.x - bonus.x;
		let dy = player.y - bonus.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < 30) {
			score += clickStrong;

			return false;
		}
		return true;
	});
}


function UpdateHelpers(){
  	helper.x += helper.speedX;
		helper.y += helper.speedY;
		if (helper.x < 0 || helper.x > canvas.width) {
			helper.speedX *= -1;
		}
		if (helper.y < 0 ||helper.y > canvas.height) {
			helper.speedY *= -1;
		}

		bonuses = bonuses.filter(bonus => {
		let dx = helper.x - bonus.x;
		let dy = helper.y - bonus.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < 30) {
			score += clickStrong;

			return false;
		}
		return true;
	});
		
	}



draw();
