# Requirements — Productivity Dashboard

## Introduction

A client-side productivity dashboard web app that runs entirely in the browser with no backend, no framework, and no build tools. All data is persisted using the browser's `localStorage` API. The app is designed to be opened directly as a static HTML file and must work across Chrome, Firefox, Edge, and Safari.

---

## Requirements

### 1. Greeting Section

#### 1.1 Live Clock
- **MUST** display the current time in `HH:MM:SS` format
- **MUST** update every second without page refresh
- **MUST** use tabular-nums font rendering to prevent layout shift

#### 1.2 Date Display
- **MUST** display the current date in long format (e.g. "Friday, May 22, 2026")
- **MUST** update automatically at midnight

#### 1.3 Time-Based Greeting
- **MUST** show "Good morning" between 00:00–11:59
- **MUST** show "Good afternoon" between 12:00–16:59
- **MUST** show "Good evening" between 17:00–20:59
- **MUST** show "Good night" between 21:00–23:59

#### 1.4 Custom Name (Challenge Feature)
- **MUST** allow the user to enter and save a custom name
- **MUST** persist the name in `localStorage` under key `userName`
- **MUST** display the name inline in the greeting (e.g. "Good morning, Enrico!")
- **MUST** show a "Welcome back" sub-line when a name is set
- **MUST** provide an edit button to update or clear the name
- **MUST** support saving with Enter key and cancelling with Escape key

---

### 2. Focus Timer

#### 2.1 Countdown
- **MUST** default to 25 minutes (1500 seconds)
- **MUST** display time in `MM:SS` format
- **MUST** count down one second at a time using `setInterval`

#### 2.2 Controls
- **MUST** have a Start button that begins the countdown
- **MUST** have a Pause button that halts the countdown without resetting it
- **MUST** have a Reset button that returns the timer to 25:00
- **MUST** disable the Start button while the timer is running
- **MUST** disable the Pause button while the timer is stopped

#### 2.3 Progress Bar
- **MUST** display a horizontal progress bar that depletes as time passes
- **MUST** start full (100%) and reach empty (0%) when the timer hits 00:00

#### 2.4 Completion
- **MUST** stop the timer automatically at 00:00
- **MUST** update the label to indicate session completion
- **SHOULD** fire a browser `Notification` when the session ends (with permission)

---

### 3. To-Do List

#### 3.1 Add Task
- **MUST** allow adding a task via a text input and an Add button
- **MUST** support adding with the Enter key
- **MUST** trim whitespace before saving
- **MUST NOT** add empty tasks

#### 3.2 Duplicate Prevention (Challenge Feature)
- **MUST** reject tasks that already exist (case-insensitive comparison)
- **MUST** display a visible warning message when a duplicate is detected
- **MUST** auto-dismiss the warning after 2.5 seconds

#### 3.3 Complete Task
- **MUST** allow marking a task as done via a checkbox
- **MUST** apply a strikethrough style to completed task text
- **MUST** toggle the done state on repeated checkbox clicks

#### 3.4 Edit Task
- **MUST** allow inline editing of any task via an Edit button
- **MUST** replace the task text with an input field during editing
- **MUST** save the edit on Enter key or Save button click
- **MUST** cancel the edit on Escape key or Cancel button click
- **MUST** apply the same duplicate check during edits

#### 3.5 Delete Task
- **MUST** allow deleting any task via a Delete button
- **MUST** remove the task immediately from the list and storage

#### 3.6 Persistence
- **MUST** save all tasks to `localStorage` under key `tasks`
- **MUST** restore tasks on page load
- **MUST** show an empty-state message when no tasks exist

---

### 4. Quick Links

#### 4.1 Add Link
- **MUST** accept a label and a URL
- **MUST** auto-prepend `https://` if no protocol is provided
- **MUST** validate the URL using the `URL` constructor before saving
- **MUST** support adding with the Enter key in either input field

#### 4.2 Display
- **MUST** render each link as a pill-shaped chip
- **MUST** display a favicon fetched from Google's favicon service
- **MUST** open the link in a new tab with `rel="noopener noreferrer"`

#### 4.3 Delete Link
- **MUST** provide a delete button on each chip
- **MUST** remove the link immediately from the grid and storage

#### 4.4 Persistence
- **MUST** save all links to `localStorage` under key `quickLinks`
- **MUST** restore links on page load
- **MUST** show an empty-state message when no links exist

---

### 5. Light / Dark Mode (Challenge Feature)

- **MUST** provide a toggle button in the top bar
- **MUST** apply the theme by setting `data-theme` on the `<html>` element
- **MUST** default to the OS color scheme preference (`prefers-color-scheme`)
- **MUST** persist the user's choice in `localStorage` under key `theme`
- **MUST** restore the saved theme on page load before any paint
- **MUST** update the toggle button icon (🌙 for light mode, ☀️ for dark mode)

---

### 6. Non-Functional Requirements

| # | Requirement |
|---|-------------|
| NFR-1 | Must work as a standalone static file (no server) |
| NFR-2 | Must work in Chrome, Firefox, Edge, and Safari |
| NFR-3 | Single `index.html`, single `css/style.css`, single `js/script.js` |
| NFR-4 | No external libraries, frameworks, or CDN dependencies |
| NFR-5 | All storage via `localStorage` only |
| NFR-6 | Responsive layout — usable on screens 320px and wider |
| NFR-7 | All interactive elements must have `aria-label` attributes |
| NFR-8 | Readable typography with sufficient color contrast |
| NFR-9 | Fast interactions — no perceived lag on user actions |
