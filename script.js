/* Iskra — beležka funkcij/izboljšav po aplikacijah.
   Vsi podatki živijo v localStorage, brez strežnika. */

const STORAGE_KEY = "iskra-data-v1";

const APPS = [
  {
    id: "checkliste",
    name: "Checkliste",
    url: "https://zig4to.github.io/Checkliste/",
    accent: ["#10b981", "#22d3ee"],
    icon: `<path d="M9 3.5h6A1.5 1.5 0 0 1 16.5 5v.5H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h1.5V5A1.5 1.5 0 0 1 9 3.5Z"/><path d="m8.5 12.5 2 2 4-4.5"/><path d="M8.5 18h7"/>`
  },
  {
    id: "kam",
    name: "Kam",
    url: "https://zig4to.github.io/Kam/",
    accent: ["#38bdf8", "#0f766e"],
    icon: `<path d="M4 17.5 L9 8 L12 12 L15 6 L20 17.5 Z"/><path d="M8.16 9.6 L9 8 L10.2 9.6 M14.2 7.6 L15 6 L15.7 7.6"/>`
  },
  {
    id: "komadi",
    name: "Komadi",
    url: "https://zig4to.github.io/Komadi/",
    accent: ["#ec4899", "#f97316"],
    icon: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`
  },
  {
    id: "mascajt",
    name: "masCajt",
    url: "https://zig4to.github.io/masCajt/",
    accent: ["#6366f1", "#a855f7"],
    icon: `<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 13.5h3M7.5 17h6"/>`
  },
  {
    id: "racuni",
    name: "Računi",
    url: "https://zig4to.github.io/Racuni/",
    accent: ["#f59e0b", "#fb7185"],
    icon: `<path d="M6 2.5h12v19l-2.5-1.6L13 21.5l-2.5-1.6L8 21.5l-2-1.6Z"/><path d="M9.5 8h5M9.5 12h5M9.5 16h3"/>`
  },
  {
    id: "tomsstudios",
    name: "TomsStudios",
    url: "https://zig4to.github.io/TomsStudios/",
    accent: ["#0ea5e9", "#6366f1"],
    icon: `<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>`
  }
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function defaultData() {
  const data = {};
  APPS.forEach((app) => {
    data[app.id] = [{ id: uid(), name: "Ideje", items: [] }];
  });
  return data;
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    APPS.forEach((app) => {
      if (!Array.isArray(parsed[app.id])) parsed[app.id] = [{ id: uid(), name: "Ideje", items: [] }];
    });
    return parsed;
  } catch (e) {
    return defaultData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data = loadData();
let activeApp = APPS[0].id;

const tabsEl = document.getElementById("tabs");
const categoriesEl = document.getElementById("categories");
const panelTitleEl = document.getElementById("panelTitle");
const panelLinkEl = document.getElementById("panelLink");
const addCatForm = document.getElementById("addCatForm");
const addCatInput = document.getElementById("addCatInput");

function svgEl(innerPath) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.8");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.innerHTML = innerPath;
  return svg;
}

function renderTabs() {
  tabsEl.innerHTML = "";
  APPS.forEach((app) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (app.id === activeApp ? " active" : "");
    btn.style.setProperty("--tab-c1", app.accent[0]);
    btn.style.setProperty("--tab-c2", app.accent[1]);
    btn.setAttribute("type", "button");

    const iconWrap = document.createElement("span");
    iconWrap.className = "tab-icon";
    iconWrap.appendChild(svgEl(app.icon));

    const label = document.createElement("span");
    label.className = "tab-name";
    label.textContent = app.name;

    btn.appendChild(iconWrap);
    btn.appendChild(label);
    btn.addEventListener("click", () => selectApp(app.id));
    tabsEl.appendChild(btn);
  });
}

function selectApp(id) {
  activeApp = id;
  renderTabs();
  renderPanel();
}

function getApp(id) {
  return APPS.find((a) => a.id === id);
}

function renderPanel() {
  const app = getApp(activeApp);
  panelTitleEl.textContent = app.name;
  panelLinkEl.href = app.url;
  renderCategories();
}

function sortedItems(items) {
  return items.map((item, i) => ({ item, i }))
    .sort((a, b) => (a.item.done === b.item.done ? a.i - b.i : a.item.done ? 1 : -1))
    .map((x) => x.item);
}

function renderCategories() {
  categoriesEl.innerHTML = "";
  const cats = data[activeApp];

  if (!cats.length) {
    const hint = document.createElement("p");
    hint.className = "empty-hint";
    hint.textContent = "Ni še kategorij. Dodaj prvo zgoraj.";
    categoriesEl.appendChild(hint);
    return;
  }

  cats.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "cat";

    // ---- glava kategorije ----
    const head = document.createElement("div");
    head.className = "cat-head";

    const nameInput = document.createElement("input");
    nameInput.className = "cat-name";
    nameInput.value = cat.name;
    nameInput.addEventListener("change", () => {
      cat.name = nameInput.value.trim() || cat.name;
      saveData();
    });

    const doneCount = cat.items.filter((i) => i.done).length;
    const count = document.createElement("span");
    count.className = "cat-count";
    count.textContent = `${doneCount}/${cat.items.length}`;

    const delBtn = document.createElement("button");
    delBtn.className = "mini-btn";
    delBtn.type = "button";
    delBtn.title = "Izbriši kategorijo";
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => {
      if (cat.items.length && !confirm(`Izbrišem kategorijo "${cat.name}" z vsemi stvarmi?`)) return;
      data[activeApp] = data[activeApp].filter((c) => c.id !== cat.id);
      saveData();
      renderCategories();
    });

    head.appendChild(nameInput);
    head.appendChild(count);
    head.appendChild(delBtn);
    section.appendChild(head);

    // ---- seznam stvari ----
    const ul = document.createElement("ul");
    ul.className = "items";

    sortedItems(cat.items).forEach((item) => {
      const li = document.createElement("li");
      li.className = "item" + (item.done ? " done" : "");

      const label = document.createElement("label");
      label.className = "item-check";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.done;
      checkbox.addEventListener("change", () => {
        item.done = checkbox.checked;
        saveData();
        renderCategories();
      });

      const text = document.createElement("span");
      text.className = "item-text";
      text.textContent = item.text;

      label.appendChild(checkbox);
      label.appendChild(text);

      const del = document.createElement("button");
      del.className = "item-del";
      del.type = "button";
      del.title = "Izbriši";
      del.textContent = "✕";
      del.addEventListener("click", () => {
        cat.items = cat.items.filter((i) => i.id !== item.id);
        saveData();
        renderCategories();
      });

      li.appendChild(label);
      li.appendChild(del);
      ul.appendChild(li);
    });

    section.appendChild(ul);

    // ---- dodajanje stvari ----
    const addForm = document.createElement("form");
    addForm.className = "add-item-form";

    const addInput = document.createElement("input");
    addInput.placeholder = "Dodaj funkcijo / izboljšavo…";
    addInput.autocomplete = "off";

    const addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.textContent = "+";

    addForm.appendChild(addInput);
    addForm.appendChild(addBtn);
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = addInput.value.trim();
      if (!text) return;
      cat.items.push({ id: uid(), text, done: false });
      saveData();
      addInput.value = "";
      renderCategories();
    });

    section.appendChild(addForm);
    categoriesEl.appendChild(section);
  });
}

addCatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = addCatInput.value.trim();
  if (!name) return;
  data[activeApp].push({ id: uid(), name, items: [] });
  saveData();
  addCatInput.value = "";
  renderCategories();
});

// -------------------------------------------------------------- trd reset
const hardResetBtn = document.getElementById("hardResetBtn");
hardResetBtn.addEventListener("click", () => {
  hardResetBtn.disabled = true;
  hardResetBtn.classList.add("is-spinning");

  const reloadFresh = () => {
    const url = new URL(location.href);
    url.searchParams.set("_r", Date.now());
    location.replace(url.toString());
  };

  Promise.resolve()
    .then(() => {
      if (!("serviceWorker" in navigator)) return;
      return navigator.serviceWorker.getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())));
    })
    .then(() => {
      if (!("caches" in window)) return;
      return caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
    })
    .catch((e) => console.warn("Trd reset ni v celoti uspel:", e))
    .then(reloadFresh);
});

renderTabs();
renderPanel();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
