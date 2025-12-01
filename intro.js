let newBtn = document.querySelector(".new-game");
let contBtn = document.querySelector(".continue-game");
let game = JSON.parse(localStorage.getItem("game"));

if (!game || game.gameOver) contBtn.style.display = "none";

newBtn.addEventListener("click", () => {
	localStorage.removeItem("game");
	window.location.href = "game.html";
});

contBtn.addEventListener("click", () => {
	window.location.href = "game.html";
});
