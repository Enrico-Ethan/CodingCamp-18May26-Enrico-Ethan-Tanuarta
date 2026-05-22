# Tasks — Productivity Dashboard

## Status Key
- `[x]` Done
- `[ ]` Not started
- `[~]` In progress

---

## Phase 1 — Project Scaffold

- [x] **T-01** Create `index.html` with semantic HTML structure (`<header>`, `<main>`, `<section>`)
- [x] **T-02** Create `css/style.css` with CSS custom properties for light and dark themes
- [x] **T-03** Create `js/script.js` with `"use strict"` and shared `store` helper
- [x] **T-04** Create `.vscode/launch.json` to open `index.html` in Chrome via F5
- [x] **T-05** Create `.kiro/steering/project.md` with project conventions and constraints

---

## Phase 2 — Core Features

### Greeting Section
- [x] **T-06** Implement live clock updating every second (`setInterval`)
- [x] **T-07** Implement long-format date display
- [x] **T-08** Implement time-based greeting logic (morning / afternoon / evening / night)
- [x] **T-09** Implement custom name input, save to `localStorage`, display in greeting
- [x] **T-10** Implement inline name editor with show/hide toggle
- [x] **T-11** Support Enter to save and Escape to cancel in name input

### Focus Timer
- [x] **T-12** Implement 25-minute countdown using `setInterval`
- [x] **T-13** Implement Start button (begins countdown, disables itself)
- [x] **T-14** Implement Pause button (halts countdown, re-enables Start)
- [x] **T-15** Implement Reset button (restores 25:00, resets button states)
- [x] **T-16** Implement progress bar that depletes proportionally with time
- [x] **T-17** Implement session-complete state (label update, button reset)
- [x] **T-18** Request and fire browser `Notification` on session completion

### To-Do List
- [x] **T-19** Implement add task via button and Enter key
- [x] **T-20** Implement render function that builds task list from array
- [x] **T-21** Implement checkbox to toggle `done` state with strikethrough style
- [x] **T-22** Implement inline edit mode (replace span with input, save/cancel buttons)
- [x] **T-23** Implement delete task button
- [x] **T-24** Implement duplicate detection (case-insensitive) with dismissing warning
- [x] **T-25** Persist tasks array to `localStorage` on every mutation
- [x] **T-26** Load and render tasks from `localStorage` on page load
- [x] **T-27** Show empty-state message when task list is empty

### Quick Links
- [x] **T-28** Implement add link via button and Enter key in either input
- [x] **T-29** Auto-prepend `https://` if no protocol is present
- [x] **T-30** Validate URL with `new URL()` before saving
- [x] **T-31** Render link chips with favicon from Google favicon service
- [x] **T-32** Open links in new tab with `rel="noopener noreferrer"`
- [x] **T-33** Implement delete button on each chip
- [x] **T-34** Persist links array to `localStorage` on every mutation
- [x] **T-35** Load and render links from `localStorage` on page load
- [x] **T-36** Show empty-state message when links list is empty

---

## Phase 3 — Challenge Features

- [x] **T-37** Implement light/dark mode toggle button in top bar
- [x] **T-38** Apply theme via `data-theme` attribute on `<html>` element
- [x] **T-39** Default to OS `prefers-color-scheme` on first load
- [x] **T-40** Persist theme choice to `localStorage` under key `theme`
- [x] **T-41** Update toggle button icon (🌙 / ☀️) and `aria-label` on switch

---

## Phase 4 — Polish & Accessibility

- [x] **T-42** Add `aria-label` to all interactive elements
- [x] **T-43** Add `aria-live="polite"` to timer display and duplicate warning
- [x] **T-44** Implement responsive layout — single column on screens ≤ 600px
- [x] **T-45** Add custom scrollbar styling to task list
- [x] **T-46** Ensure all transitions use CSS `var(--transition)` for consistency
- [x] **T-47** Verify color contrast in both light and dark themes

---

## Phase 5 — Repo & Docs

- [x] **T-48** Initialize git repository
- [x] **T-49** Push project to GitHub (`CodingCamp-18May26-Enrico-Ethan-Tanuarta`)
- [x] **T-50** Update remote URL to correct repository
- [x] **T-51** Commit `.kiro/steering/project.md`
- [x] **T-52** Initialize Kiro specs (`requirements.md`, `design.md`, `tasks.md`)

---

## Backlog (Future Enhancements)

- [ ] **T-53** Add break timer (5-min short break, 15-min long break) after Pomodoro
- [ ] **T-54** Add task categories / tags
- [ ] **T-55** Add drag-and-drop reordering for tasks
- [ ] **T-56** Add link categories or grouping
- [ ] **T-57** Add a notes / scratch pad widget
- [ ] **T-58** Add keyboard shortcut hints (e.g. `?` to show shortcuts)
- [ ] **T-59** Add session count tracker (how many Pomodoros completed today)
- [ ] **T-60** Export tasks as plain text or CSV
