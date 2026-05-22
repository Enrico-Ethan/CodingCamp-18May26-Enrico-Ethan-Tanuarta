# Design — Productivity Dashboard

## Overview

The app is a single-page static web app with four feature sections laid out in a responsive CSS grid. There is no routing, no component framework, and no build step. Each feature is self-contained in its own IIFE inside `js/script.js`.

---

## File Structure

```
index.html              ← Single HTML entry point
css/
  style.css             ← All styles, CSS custom properties, responsive rules
js/
  script.js             ← All logic, split into IIFEs per feature
.kiro/
  steering/
    project.md          ← Kiro project rules
  specs/
    productivity-dashboard/
      requirements.md
      design.md
      tasks.md
.vscode/
  launch.json           ← Opens index.html in Chrome via F5
```

---

## Architecture

### No-Framework Approach
Each feature is wrapped in an Immediately Invoked Function Expression (IIFE) to scope variables and avoid polluting the global namespace:

```
initGreeting()    → clock, date, greeting, custom name
initTimer()       → Pomodoro countdown, controls, progress bar
initTodo()        → task CRUD, duplicate check, persistence
initLinks()       → link CRUD, favicon, persistence
initTheme()       → light/dark toggle, OS preference, persistence
```

### Shared Storage Helper
A single `store` object at the top of `script.js` wraps `localStorage`:

```js
const store = {
  get(key, fallback)  → JSON.parse with try/catch
  set(key, value)     → JSON.stringify with try/catch
}
```

All features use `store.get` / `store.set` — never `localStorage` directly.

### Data Shapes

```js
// userName
"Enrico"

// theme
"light" | "dark"

// tasks
[{ id: 1716000000000, text: "Buy groceries", done: false }, ...]

// quickLinks
[{ id: 1716000001000, name: "GitHub", url: "https://github.com" }, ...]
```

---

## HTML Structure

```
<html data-theme="light|dark">
  <header class="top-bar">
    .app-title
    #theme-toggle (icon button)

  <main class="grid">
    <section.card.greeting-card>   ← spans full width
    <section.card.timer-card>
    <section.card.todo-card>
    <section.card.links-card>
```

The `data-theme` attribute on `<html>` drives the entire color scheme via CSS custom properties.

---

## CSS Design System

### Theme Variables
Defined on `:root` (light) and overridden on `[data-theme="dark"]`:

| Variable        | Purpose                        |
|-----------------|--------------------------------|
| `--bg`          | Page background                |
| `--surface`     | Card background                |
| `--surface-alt` | Input / item background        |
| `--border`      | Borders and dividers           |
| `--text`        | Primary text                   |
| `--text-muted`  | Secondary / placeholder text   |
| `--primary`     | Accent color (indigo)          |
| `--primary-h`   | Accent hover state             |
| `--danger`      | Delete / error color (red)     |
| `--radius`      | Card border radius (12px)      |
| `--radius-sm`   | Button / input radius (8px)    |
| `--shadow`      | Card drop shadow               |
| `--transition`  | Global transition duration     |

### Layout
- `main.grid` uses `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`
- Greeting card uses `grid-column: 1 / -1` to always span full width
- On screens ≤ 600px the grid collapses to a single column

### Button Variants
`.btn-primary` · `.btn-secondary` · `.btn-ghost` · `.btn-danger` · `.btn-sm`

---

## Feature Designs

### Greeting Card
```
[ Good morning, Enrico!          ]  [ 14:32:07        ]
[ Welcome back, Enrico 👋        ]  [ Friday, May 22  ]
[ ✏️ Set name ]
[ name-editor (hidden by default) ]
```
- Full-width card, flex row, wraps on mobile
- Name editor revealed inline (no modal)

### Timer Card
```
        25:00
   Pomodoro · 25 min
[ ▶ Start ] [ ⏸ Pause ] [ ↺ Reset ]
[████████████████████░░░░░░░░░░░░]  ← progress bar
```
- Progress bar width = `(remaining / total) * 100%`
- Transitions smoothly with `transition: width .5s linear`

### To-Do Card
```
[ Task input field          ] [ Add ]
⚠️ Task already exists!  (dismisses after 2.5s)
─────────────────────────────────────
☐  Buy groceries          [ ✏️ ] [ 🗑 ]
☑  Read docs              [ ✏️ ] [ 🗑 ]   ← strikethrough
─────────────────────────────────────
```
- List scrolls at max-height 340px
- Inline edit replaces text span with input in-place

### Quick Links Card
```
[ Label input ] [ URL input ] [ Add ]
─────────────────────────────────────
[🌐 GitHub ✕]  [🌐 YouTube ✕]  [🌐 Notion ✕]
```
- Pill chips with favicon, overflow ellipsis
- Hover turns chip to primary color

---

## Accessibility

- All buttons have `aria-label`
- Timer display has `aria-live="polite"`
- Duplicate warning has `aria-live="polite"`
- Checkboxes have descriptive `aria-label` per task
- Theme toggle updates its `aria-label` on each switch
- Color contrast meets WCAG AA in both light and dark themes

---

## Browser Compatibility

| API Used              | Chrome | Firefox | Edge | Safari |
|-----------------------|--------|---------|------|--------|
| `localStorage`        | ✅     | ✅      | ✅   | ✅     |
| CSS custom properties | ✅     | ✅      | ✅   | ✅     |
| `Notification` API    | ✅     | ✅      | ✅   | ⚠️ partial |
| `URL` constructor     | ✅     | ✅      | ✅   | ✅     |
| CSS Grid              | ✅     | ✅      | ✅   | ✅     |

> Safari has limited support for the Web Notifications API when running as a local file. The timer still works — the notification is a progressive enhancement.
