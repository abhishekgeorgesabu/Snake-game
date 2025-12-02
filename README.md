# 🐍 Snake Game (HTML + CSS + JavaScript)

A clean, fast, and modern Snake Game built using **vanilla JavaScript**, featuring:

- Smooth keyboard controls
- Full **mobile touch controls**
- Auto-save using **localStorage**
- Persistent **high score tracking**
- Game state restore on reload
- Seamless wrap-around movement
- Responsive UI

---

## 🚀 Live Demo

👉 **Play Here:**  
https://abhishekgeorgesabu.github.io/Snake-game/

---

## 📝 Features

- **Real-time Movement** – Snake moves smoothly on a timed loop
- **Input Locking** – Prevents instant reverse-direction kills
- **Mobile Controls** – Touch-friendly arrow buttons
- **Auto Save & Resume** – Saves direction, snake body, score, and food
- **Border Wrap** – Moving outside one edge enters from opposite
- **Game Over Modal** – Restart anytime
- **High Score Persistence** – Stored permanently in localStorage

---

## 📱 Mobile Controls

The game includes on-screen arrow buttons:

- ⬆️ Up
- ⬇️ Down
- ⬅️ Left
- ➡️ Right

Supports **touchstart** for fast and responsive controls.

---

## 💾 Auto-Save System

The game stores:

- Snake body
- Current direction
- Score
- Food position
- Game-over state

Saved under:

- `snake-game`
- `snake-high-score`

On **beforeunload**, the state is updated so you can continue where you left off.

---

## 🕹 Gameplay

- Use **W / A / S / D** or **Arrow Keys**
- Touch controls supported
- Eat food → Grow → Gain score
- Wraps around the grid edges
- Game ends on self-collision

---

## 🧩 Tech Stack

- **HTML5**
- **CSS3 (Tailwind)**
- **Vanilla JavaScript**

No frameworks. No canvas. Pure DOM grid rendering.

---

## 🖼 Screenshots

![Intro Page](./Images/intro%20page.png)
![Gameplay](./Images/game%20page.png)
![Game Over](./Images/game%20over.png)

---

## 📂 Project Structure

```postresql
/Snake-game
├── index.html
├── game.html
├── style.css
├── script.js
├── README.md
```

---

## 🔧 Run Locally

```bash
git clone https://github.com/abhishekgeorgesabu/Snake-game.git
cd Snake-game
open index.html   # or double-click it
```

---

## 🧠 Reload Protection

If the user reloads `game.html`, it redirects to `index.html`:

```js
const nav = performance.getEntriesByType("navigation")[0];
if (nav.type === "reload") {
	window.location.href = "index.html";
}
```

This prevents broken game state and accidental deaths caused by a reload.

---

## ⭐ Future Improvements

- Difficulty levels (speed increase)
- Sound effects
- Themes (classic, neon, dark)
- Better animations

---
