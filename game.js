let game = localStorage.getItem("game")
	? JSON.parse(localStorage.getItem("game"))
	: [];
let hidgScore = localStorage.getItem("game");
let row = null;
let col = null;
let dir = { x: 1, y: 0 };
let snake = [
	{ x: 16, y: 20, dir: { x: 1, y: 0 } },
	{ x: 15, y: 20, dir: { x: 1, y: 0 } },
];
let food = null;
let gameOver = false;
let foodGrids = [];
let length = snake.length;

for (let i = 1; i <= 20; i++) {
	for (let j = 1; j <= 20; j++) {
		if (snake.every((grid) => grid.x !== i && grid.y !== j)) {
			let obj = { x: i, y: j };
			foodGrids.push(obj);
		}
	}
}

// keys control

document.addEventListener("keydown", (e) => {
	if (dir.x) {
		if (e.key == "ArrowUp") {
			dir.y = 1;
			dir.x = 0;
		} else if (e.key == "ArrowDown") {
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

newFood();

let control = setInterval(gameLoop, 1000);

function gameLoop() {
	moveHead();
	let head = snake[0];
	if (head.x === food.x && head.y === food.y) {
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

	// remember to fix moveTail()

	moveTail();
}

function newFood() {
	let ch = Math.floor(foodGrids.length * Math.random());
	food = foodGrids[ch];
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
}

function moveTail() {
	for (let i = 0; i < snake.length - length; i++) snake.pop();
}
function endGame() {
	gameOver = true;
	clearInterval(control);
	console.log("Game Over!!!");
}
