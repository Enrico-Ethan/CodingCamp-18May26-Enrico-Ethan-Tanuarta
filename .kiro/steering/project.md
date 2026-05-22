# Productivity Dashboard — Project Steering

## Project Overview
A client-side productivity dashboard web app built with plain HTML, CSS, and Vanilla JavaScript.
No frameworks, no build tools, no backend, no npm packages.

## Tech Stack
- **HTML** — single `index.html` at root
- **CSS** — single file at `css/style.css`
- **JavaScript** — single file at `js/script.js`
- **Storage** — Browser `localStorage` only (no cookies, no IndexedDB, no server)

## Folder Structure
```
index.html
css/
  style.css
js/
  script.js
.vscode/
  launch.json
  settings.json
```

## Coding Conventions
- Use `"use strict";` at the top of `script.js`
- Wrap each feature in its own IIFE: `(function initFeatureName() { ... })();`
- Use the shared `store` helper for all localStorage reads/writes
- Prefer `const` and `let` — never `var`
- Use semantic HTML elements (`<section>`, `<header>`, `<main>`, `<ul>`, etc.)
- All interactive elements must have `aria-label` attributes
- CSS uses custom properties (variables) defined on `:root` and `[data-theme="dark"]`
- Class naming: kebab-case (e.g. `todo-item`, `link-chip`)
- No inline styles — all styling goes in `style.css`

## Features Implemented
1. **Greeting** — live clock, date, time-based greeting, custom name (stored in localStorage)
2. **Focus Timer** — 25-min Pomodoro with start/pause/reset and progress bar
3. **To-Do List** — add, inline edit, complete, delete; duplicate prevention; persisted in localStorage
4. **Quick Links** — add/delete pill chips with favicons; persisted in localStorage
5. **Light/Dark Mode** — toggle button, respects OS preference, persisted in localStorage

## Challenge Features
- ✅ Light/Dark mode
- ✅ Prevent duplicate tasks (case-insensitive)
- ✅ Custom name in greeting

## Browser Support
Must work in: Chrome, Firefox, Edge, Safari (no polyfills needed for target APIs).

## Running the App
Open `index.html` directly in a browser — no server required.
In VS Code / Kiro: press **F5** to launch in Chrome via the `.vscode/launch.json` config.

## What NOT to Add
- No React, Vue, Angular, or any JS framework
- No Node.js, npm, or package managers
- No backend or API calls
- No test setup or CI config
- No additional CSS or JS files (keep it to one each)
