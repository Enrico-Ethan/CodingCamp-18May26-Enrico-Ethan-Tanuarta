/* ============================================================
   Productivity Dashboard — script.js
   Vanilla JS · Local Storage · No dependencies
   ============================================================ */

"use strict";

/* ── Storage helpers ─────────────────────────────────────── */
const store = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  },
};

/* ============================================================
   1. GREETING — clock, date, greeting message, custom name
   ============================================================ */
(function initGreeting() {
  const clockEl   = document.getElementById("clock");
  const dateEl    = document.getElementById("date-display");
  const msgEl     = document.getElementById("greeting-msg");
  const nameDisp  = document.getElementById("greeting-name-display");
  const editBtn   = document.getElementById("name-edit-btn");
  const editor    = document.getElementById("name-editor");
  const nameInput = document.getElementById("name-input");
  const saveBtn   = document.getElementById("name-save-btn");
  const cancelBtn = document.getElementById("name-cancel-btn");

  /* Greeting text based on hour */
  function getGreeting(hour) {
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  /* Update clock + greeting every second */
  function tick() {
    const now  = new Date();
    const h    = now.getHours();
    const m    = now.getMinutes();
    const s    = now.getSeconds();

    // Clock
    clockEl.textContent = [h, m, s]
      .map(n => String(n).padStart(2, "0"))
      .join(":");

    // Date
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    // Greeting
    const name = store.get("userName", "");
    msgEl.textContent = getGreeting(h) + (name ? `, ${name}` : "") + "!";
    nameDisp.textContent = name ? `Welcome back, ${name} 👋` : "";
  }

  tick();
  setInterval(tick, 1000);

  /* Name editor */
  editBtn.addEventListener("click", () => {
    nameInput.value = store.get("userName", "");
    editor.classList.remove("hidden");
    editBtn.classList.add("hidden");
    nameInput.focus();
  });

  function closEditor() {
    editor.classList.add("hidden");
    editBtn.classList.remove("hidden");
  }

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    store.set("userName", name);
    tick();
    closEditor();
  });

  cancelBtn.addEventListener("click", closEditor);

  // Allow Enter key in name input
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });
})();

/* ============================================================
   2. FOCUS TIMER — 25-min Pomodoro
   ============================================================ */
(function initTimer() {
  const TOTAL_SECONDS = 25 * 60;

  const display   = document.getElementById("timer-display");
  const label     = document.getElementById("timer-label");
  const startBtn  = document.getElementById("timer-start");
  const stopBtn   = document.getElementById("timer-stop");
  const resetBtn  = document.getElementById("timer-reset");
  const bar       = document.getElementById("timer-progress-bar");

  let remaining = TOTAL_SECONDS;
  let intervalId = null;
  let running = false;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function updateUI() {
    display.textContent = formatTime(remaining);
    const pct = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100;
    bar.style.width = `${100 - pct}%`;
  }

  function start() {
    if (running) return;
    running = true;
    startBtn.disabled = true;
    stopBtn.disabled  = false;
    label.textContent = "Focus! 🎯";

    intervalId = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(intervalId);
        running = false;
        label.textContent = "Session complete! 🎉";
        startBtn.disabled = false;
        stopBtn.disabled  = true;
        // Browser notification (if permission granted)
        if (Notification.permission === "granted") {
          new Notification("Pomodoro complete!", { body: "Time for a break." });
        }
        return;
      }
      remaining--;
      updateUI();
    }, 1000);
  }

  function pause() {
    if (!running) return;
    clearInterval(intervalId);
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled  = true;
    label.textContent = "Paused ⏸";
  }

  function reset() {
    clearInterval(intervalId);
    running = false;
    remaining = TOTAL_SECONDS;
    startBtn.disabled = false;
    stopBtn.disabled  = true;
    label.textContent = "Pomodoro · 25 min";
    updateUI();
  }

  startBtn.addEventListener("click", () => {
    // Request notification permission on first start
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    start();
  });
  stopBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset);

  updateUI();
})();

/* ============================================================
   3. TO-DO LIST — add / edit / complete / delete · Local Storage
   ============================================================ */
(function initTodo() {
  const input     = document.getElementById("todo-input");
  const addBtn    = document.getElementById("todo-add-btn");
  const list      = document.getElementById("todo-list");
  const emptyMsg  = document.getElementById("todo-empty");
  const dupWarn   = document.getElementById("duplicate-warning");

  /* Load tasks from storage; each task: { id, text, done } */
  let tasks = store.get("tasks", []);

  function save() { store.set("tasks", tasks); }

  function showDuplicateWarning() {
    dupWarn.classList.remove("hidden");
    clearTimeout(dupWarn._timer);
    dupWarn._timer = setTimeout(() => dupWarn.classList.add("hidden"), 2500);
  }

  /* ── Render ── */
  function render() {
    list.innerHTML = "";
    emptyMsg.classList.toggle("hidden", tasks.length > 0);

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.dataset.id = task.id;

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type    = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" as done`);
      checkbox.addEventListener("change", () => toggleDone(task.id));

      // Text span
      const textSpan = document.createElement("span");
      textSpan.className = "todo-item-text" + (task.done ? " done" : "");
      textSpan.textContent = task.text;

      // Actions
      const actions = document.createElement("div");
      actions.className = "todo-item-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-ghost btn-sm";
      editBtn.textContent = "✏️";
      editBtn.setAttribute("aria-label", `Edit task: ${task.text}`);
      editBtn.addEventListener("click", () => startEdit(task.id, li, textSpan, actions));

      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-danger btn-sm";
      delBtn.textContent = "🗑";
      delBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
      delBtn.addEventListener("click", () => deleteTask(task.id));

      actions.append(editBtn, delBtn);
      li.append(checkbox, textSpan, actions);
      list.appendChild(li);
    });
  }

  /* ── Add ── */
  function addTask() {
    const text = input.value.trim();
    if (!text) return;

    // Duplicate check (case-insensitive)
    const isDuplicate = tasks.some(
      (t) => t.text.toLowerCase() === text.toLowerCase()
    );
    if (isDuplicate) {
      showDuplicateWarning();
      input.focus();
      return;
    }

    tasks.push({ id: Date.now(), text, done: false });
    save();
    render();
    input.value = "";
    dupWarn.classList.add("hidden");
  }

  /* ── Toggle done ── */
  function toggleDone(id) {
    tasks = tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
    save();
    render();
  }

  /* ── Delete ── */
  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    save();
    render();
  }

  /* ── Inline edit ── */
  function startEdit(id, li, textSpan, actions) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Replace text span with input
    const editInput = document.createElement("input");
    editInput.type      = "text";
    editInput.className = "todo-item-edit";
    editInput.value     = task.text;
    editInput.maxLength = 120;
    li.replaceChild(editInput, textSpan);

    // Replace action buttons with save/cancel
    const saveBtn   = document.createElement("button");
    saveBtn.className   = "btn btn-primary btn-sm";
    saveBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.className   = "btn btn-ghost btn-sm";
    cancelBtn.textContent = "Cancel";

    actions.innerHTML = "";
    actions.append(saveBtn, cancelBtn);
    editInput.focus();

    function commitEdit() {
      const newText = editInput.value.trim();
      if (!newText) { render(); return; }

      // Duplicate check (exclude current task)
      const isDuplicate = tasks.some(
        (t) => t.id !== id && t.text.toLowerCase() === newText.toLowerCase()
      );
      if (isDuplicate) { showDuplicateWarning(); editInput.focus(); return; }

      tasks = tasks.map((t) => t.id === id ? { ...t, text: newText } : t);
      save();
      render();
    }

    saveBtn.addEventListener("click", commitEdit);
    cancelBtn.addEventListener("click", render);
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter")  commitEdit();
      if (e.key === "Escape") render();
    });
  }

  /* ── Events ── */
  addBtn.addEventListener("click", addTask);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

  render();
})();

/* ============================================================
   4. QUICK LINKS — add / delete · Local Storage
   ============================================================ */
(function initLinks() {
  const nameInput = document.getElementById("link-name-input");
  const urlInput  = document.getElementById("link-url-input");
  const addBtn    = document.getElementById("link-add-btn");
  const grid      = document.getElementById("links-grid");
  const emptyMsg  = document.getElementById("links-empty");

  /* Each link: { id, name, url } */
  let links = store.get("quickLinks", []);

  function save() { store.set("quickLinks", links); }

  /* Ensure URL has a protocol */
  function normalizeUrl(url) {
    url = url.trim();
    if (url && !/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    return url;
  }

  /* ── Render ── */
  function render() {
    grid.innerHTML = "";
    emptyMsg.classList.toggle("hidden", links.length > 0);

    links.forEach((link) => {
      // Chip wrapper (acts as anchor)
      const chip = document.createElement("a");
      chip.className  = "link-chip";
      chip.href       = link.url;
      chip.target     = "_blank";
      chip.rel        = "noopener noreferrer";
      chip.setAttribute("aria-label", `Open ${link.name}`);

      // Favicon
      const favicon = document.createElement("img");
      try {
        const domain = new URL(link.url).hostname;
        favicon.src    = `https://www.google.com/s2/favicons?sz=16&domain=${domain}`;
      } catch {
        favicon.src = "";
      }
      favicon.width  = 16;
      favicon.height = 16;
      favicon.alt    = "";
      favicon.style.flexShrink = "0";
      favicon.onerror = () => { favicon.style.display = "none"; };

      const label = document.createElement("span");
      label.textContent = link.name;

      // Delete button (stops propagation so the link doesn't open)
      const delBtn = document.createElement("button");
      delBtn.className = "link-delete";
      delBtn.textContent = "✕";
      delBtn.setAttribute("aria-label", `Remove ${link.name}`);
      delBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteLink(link.id);
      });

      chip.append(favicon, label, delBtn);
      grid.appendChild(chip);
    });
  }

  /* ── Add ── */
  function addLink() {
    const name = nameInput.value.trim();
    const url  = normalizeUrl(urlInput.value);

    if (!name || !url) return;

    // Basic URL validation
    try { new URL(url); } catch { urlInput.focus(); return; }

    links.push({ id: Date.now(), name, url });
    save();
    render();
    nameInput.value = "";
    urlInput.value  = "";
  }

  /* ── Delete ── */
  function deleteLink(id) {
    links = links.filter((l) => l.id !== id);
    save();
    render();
  }

  /* ── Events ── */
  addBtn.addEventListener("click", addLink);
  [nameInput, urlInput].forEach((el) => {
    el.addEventListener("keydown", (e) => { if (e.key === "Enter") addLink(); });
  });

  render();
})();

/* ============================================================
   5. LIGHT / DARK MODE
   ============================================================ */
(function initTheme() {
  const btn  = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Load saved preference; fall back to OS preference
  const saved = store.get("theme", null);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    store.set("theme", theme);
  }

  applyTheme(initial);

  btn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();
