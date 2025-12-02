# 🐍 Snake Game – HTML, CSS & JavaScript

A fully functional Snake Game built completely from scratch using **HTML**, **Tailwind CSS**, and **vanilla JavaScript**.

The game supports **state saving**, **continue after reload**, **keyboard controls**, **grid-based rendering**, and a clean **two-page flow** (Intro page + Game page).

---

## 📸 Screenshots

### **Intro Page**

![Intro Page](./Images/intro%20page.png)

### **Gameplay**

![Gameplay](./Images/game%20page.png)

### **Game Over Modal**

![Game Over](./Images/game%20over.png)

---

## 🚀 Features

### 🎮 Classic Gameplay

- Smooth snake movement
- Arrow keys + W/A/S/D support
- Snake grows after eating food
- Wrap-around board edges
- Self-collision detection
- Game Over modal with restart option

### 💾 Auto-Save & Continue

The game saves automatically on tab close or reload:

- Snake body
- Direction
- Food position
- Score
- Game status

The **Continue Game** button restores everything exactly as it was.

### 🖥️ Clean UI

- Intro menu with _New Game_ / _Continue Game_
- Score & High Score display
- Responsive 20×20 grid
- Tailwind CSS styling

---

## 📂 Project Structure

- index.html # Intro page (New / Continue)
- intro.js # Intro page logic (load / new game)
- game.html # Main game interface
- game.js # Full snake game engine
- README.md # Documentation

---

## 🕹️ Controls

| Key             | Action     |
| --------------- | ---------- |
| Arrow Up / W    | Move Up    |
| Arrow Down / S  | Move Down  |
| Arrow Left / A  | Move Left  |
| Arrow Right / D | Move Right |

Reverse turns are blocked to prevent instant self-collision.

---

## 💡 Saving Logic

The game stores a snapshot inside `localStorage`:

```json
{
  "snake": [{ "x": 9, "y": 10 }, ...],
  "dir": { "x": 1, "y": 0 },
  "food": { "x": 5, "y": 9 },
  "score": 4,
  "gameOver": false
}

```

This ensures seamless reload → play.

High score is also saved permanently.

---

## 🛠️ How to Run Locally

1.Clone or download the repository:

git clone <repository-url>

2.Open index.html in any browser.

No additional setup needed.

---

## 🔮 Future Improvements

- Add mobile touch controls

- Difficulty levels / increasing speed

- Sound effects & animations

- Improved visual themes

- Pause button

- Settings menu

---
