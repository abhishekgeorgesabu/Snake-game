// Detect reload (allowed)
const nav = performance.getEntriesByType("navigation")[0];
if (nav.type === "reload") {
	window.location.href = "index.html";
}

let lastGame = localStorage.getItem("snake-game")
	? JSON.parse(localStorage.getItem("snake-game"))
	: {};
let highScore = localStorage.getItem("snake-high-score")
	? localStorage.getItem("snake-high-score")
	: 0;

let dir = lastGame.dir ? lastGame.dir : { x: 1, y: 0 };
let snake = lastGame.snake
	? lastGame.snake
	: [
			{ x: 9, y: 10, dir: { x: 1, y: 0 } },
			{ x: 8, y: 10, dir: { x: 1, y: 0 } },
	  ];
let foodSpot = lastGame.food ? lastGame.food : null;
let gameOver = lastGame.gameOver ? lastGame.gameOver : false;
let score = lastGame.score ? lastGame.score : 0;
let foodGrids = [];
for (let i = 1; i <= 20; i++) {
	for (let j = 1; j <= 20; j++) {
		if (!snake.some((grid) => grid.x === i && grid.y === j)) {
			let obj = { x: i, y: j };
			foodGrids.push(obj);
		}
	}
}

let length = snake.length;
let control = null;

let gameBox = document.querySelector("#game-box");
let modal = document.querySelector("#modal");

// Score box

let highScoreBox = document.querySelector("#high-score");
let scoreBox = document.querySelector("#score");

scoreBox.textContent = score;
highScoreBox.textContent = highScore;

// Control keys

let inputLocked = true;

document.addEventListener("keydown", (e) => {
	if (inputLocked) return;

	inputLocked = true;

	if (dir.x !== 0) {
		if ((e.key == "ArrowDown" || e.key.toLowerCase() == "s") && dir.y !== 1) {
			dir = { y: 1, x: 0 };
		} else if (
			(e.key == "ArrowUp" || e.key.toLowerCase() == "w") &&
			dir.y !== -1
		) {
			dir = { y: -1, x: 0 };
		}
	} else if (dir.y !== 0) {
		if ((e.key == "ArrowRight" || e.key.toLowerCase() == "d") && dir.x !== -1) {
			dir = { y: 0, x: 1 };
		} else if (
			(e.key == "ArrowLeft" || e.key.toLowerCase() == "a") &&
			dir.x !== 1
		) {
			dir = { y: 0, x: -1 };
		}
	}
});

// Pause Button

let pauseBtn = document.querySelector("#pause-btn");

pauseBtn.addEventListener("click", () => {
	let game = {
		dir,
		snake,
		food: foodSpot,
		gameOver,
		score,
	};
	localStorage.setItem("snake-game", JSON.stringify(game));
	localStorage.setItem("snake-high-score", highScore);
	window.location.href = "index.html";
});

// On-screen controls

let CtrlArea = document.querySelector("#mob-ctrls");

let CtrlUp = document.querySelector("#ctrl-up");
let CtrlDown = document.querySelector("#ctrl-down");
let CtrlLeft = document.querySelector("#ctrl-left");
let CtrlRight = document.querySelector("#ctrl-right");

CtrlArea.addEventListener("touchstart", handleMobile);
CtrlArea.addEventListener("click", (e) => e.preventDefault());

function handleMobile(e) {
	if (inputLocked) return;

	let btn = e.target.closest("button");
	if (!btn) return;
	if (dir.x !== 0) {
		if (btn === CtrlDown && dir.y !== 1) {
			dir = { y: 1, x: 0 };
		} else if (btn === CtrlUp && dir.y !== -1) {
			dir = { y: -1, x: 0 };
		}
	} else if (dir.y !== 0) {
		if (btn === CtrlRight && dir.x !== -1) {
			dir = { y: 0, x: 1 };
		} else if (btn === CtrlLeft && dir.x !== 1) {
			dir = { y: 0, x: -1 };
		}
	}

	inputLocked = true;
}

if (!foodSpot) newFood();

function newFood() {
	let ch = Math.floor(foodGrids.length * Math.random());
	foodSpot = foodGrids[ch];
	renderFood();
}

render();

// Rendering functions

function render() {
	snake.forEach((part) => {
		renderTile(part);
	});
	renderFood();
}

function renderTile(cell) {
	let tile = document.createElement("div");
	tile.classList.add("bg-green-400");

	tile.style.gridRowStart = cell.y;
	tile.style.gridColumnStart = cell.x;

	gameBox.appendChild(tile);
}

function renderFood() {
	let food = document.createElement("div");
	food.classList.add("bg-red-500", "rounded-full");

	food.style.gridRowStart = foodSpot.y;
	food.style.gridColumnStart = foodSpot.x;

	gameBox.appendChild(food);
}

//Game

if (!gameOver) {
	control = setInterval(gameLoop, 200);
}

// Game logic

function gameLoop() {
	gameBox.innerHTML = "";
	moveHead();
	let head = snake[0];
	if (head.x === foodSpot.x && head.y === foodSpot.y) {
		length++;
		score++;
		if (score > highScore) highScore = score;
		scoreBox.textContent = score;
		highScoreBox.textContent = highScore;
		newFood();
	}
	if (snake.slice(1).some((e) => head.x === e.x && head.y === e.y)) {
		endGame();
	}

	moveTail();
	render();

	inputLocked = false;
}

// Movement Functions

function moveHead() {
	let head = snake[0];
	let row = head.x + dir.x;
	let col = head.y + dir.y;
	if (row > 20) row -= 20;
	else if (row < 1) row += 20;
	if (col > 20) col -= 20;
	else if (col < 1) col += 20;
	let newHead = { x: row, y: col, dir: dir };
	snake.unshift(newHead);
	foodGrids = foodGrids.filter((grid) => grid.x !== row || grid.y !== col);
}

function moveTail() {
	while (length < snake.length) {
		let lastTail = snake.pop();
		foodGrids.push({ x: lastTail.x, y: lastTail.y });
	}
}

// Game Over

function endGame() {
	gameOver = true;
	clearInterval(control);
	modal.classList.remove("hidden");
	modal.classList.add("fixed");
	localStorage.setItem("snake-high-score", highScore);
}

// Restart Game

let startOverBtn = document.querySelector("#restart-btn");
startOverBtn.addEventListener("click", () => {
	document.querySelector("#modal").classList.add("hidden");

	localStorage.removeItem("snake-game");
	dir = { x: 1, y: 0 };
	snake = [
		{ x: 9, y: 10, dir: { x: 1, y: 0 } },
		{ x: 8, y: 10, dir: { x: 1, y: 0 } },
	];
	foodGrids = [];
	for (let i = 1; i <= 20; i++) {
		for (let j = 1; j <= 20; j++) {
			if (!snake.some((grid) => grid.x === i && grid.y === j)) {
				let obj = { x: i, y: j };
				foodGrids.push(obj);
			}
		}
	}

	length = snake.length;
	score = 0;
	scoreBox.textContent = score;

	gameBox.innerHTML = "";
	newFood();
	render();

	gameOver = false;
	control = setInterval(gameLoop, 200);
});
// Save in case of clos ying tab

window.addEventListener("beforeunload", () => {
	let game = {
		dir,
		snake,
		food: foodSpot,
		gameOver,
		score,
	};
	localStorage.setItem("snake-game", JSON.stringify(game));
	localStorage.setItem("snake-high-score", highScore);
});
