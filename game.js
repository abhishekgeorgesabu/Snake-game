const nav = performance.getEntriesByType("navigation")[0];

if (nav.type === "reload") {
	window.location.href = "index.html";
}

let lastGame = localStorage.getItem("game")
	? JSON.parse(localStorage.getItem("game"))
	: {};
let highScore = localStorage.getItem("high-score")
	? localStorage.getItem("high-score")
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
let foodGrids = [];
let length = snake.length;
let control = null;

for (let i = 1; i <= 20; i++) {
	for (let j = 1; j <= 20; j++) {
		if (snake.every((grid) => grid.x !== i && grid.y !== j)) {
			let obj = { x: i, y: j };
			foodGrids.push(obj);
		}
	}
}

let gameBox = document.querySelector("#game-box");
let modal = document.querySelector("#modal");

// Control keys

document.addEventListener("keydown", (e) => {
	if (dir.x) {
		if (e.key == "ArrowDown") {
			dir.y = 1;
			dir.x = 0;
		} else if (e.key == "ArrowUp") {
			dir.y = -1;
			dir.x = 0;
		}
	} else if (dir.y) {
		if (e.key == "ArrowRight") {
			dir.x = 1;
			dir.y = 0;
		} else if (e.key == "ArrowLeft") {
			dir.x = -1;
			dir.y = 0;
		}
	}
});

if (!foodSpot) newFood();

render();

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
		newFood();
	}
	if (
		snake.some((e) => {
			return head !== e && head.x === e.x && head.y === e.y;
		})
	) {
		endGame();
	}

	console.log(snake[0]);
	moveTail();
	render();
}

function newFood() {
	let ch = Math.floor(foodGrids.length * Math.random());
	foodSpot = foodGrids[ch];
	renderFood();
}

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
	renderTile(newHead);
}

function moveTail() {
	while (length < snake.length) {
		let lastTail = snake.pop();
		foodGrids.push({ x: lastTail.x, y: lastTail.y });
	}
}

function endGame() {
	gameOver = true;
	clearInterval(control);
	console.log("Game Over!!!");
	modal.classList.remove("hidden");
	modal.classList.add("fixed");
}

let startOverBtn = document.querySelector("#restart-btn");
startOverBtn.addEventListener("click", () => {
	document.querySelector("#modal").classList.add("hidden");
	localStorage.removeItem("game");
	dir = { x: 1, y: 0 };
	snake = [
		{ x: 9, y: 10, dir: { x: 1, y: 0 } },
		{ x: 8, y: 10, dir: { x: 1, y: 0 } },
	];
	length = snake.length;
	gameBox.innerHTML = "";
	newFood();
	gameOver = false;
	render();
	control = setInterval(gameLoop, 200);
});

// Save in case of closing tab

window.addEventListener("beforeunload", () => {
	let game = { dir: dir, snake: snake, food: foodSpot, gameOver: gameOver };
	localStorage.setItem("game", JSON.stringify(game));
});
