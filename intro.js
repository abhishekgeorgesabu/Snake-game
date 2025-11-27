let newBtn = document.querySelector(".new-game");
let contBtn = document.querySelector(".continue-game");
let id = localStorage.getItem("id") ? Number(localStorage.getItem("id")) : 0;

newBtn.addEventListener("click", () => {
	localStorage.removeItem("game");
	window.location.href = "game.html";
});

contBtn.addEventListener("click", () => {
	window.location.href = "game.html";
});
