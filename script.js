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
    id: "posel",
    name: "Posel",
    url: "https://posel-six.vercel.app/",
    accent: ["#93a2c6", "#282c47"],
    icon: `<rect x="3.6" y="8.4" width="16.8" height="11.6" rx="3.4"/><path d="M9.4 8.4V7a2.4 2.4 0 0 1 2.4-2.4h0.4a2.4 2.4 0 0 1 2.4 2.4v1.4"/>`
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
  },
  {
    id: "viharnik",
    name: "Viharnik",
    url: "https://viharnik.vercel.app/",
    accent: ["#6d5cf5", "#facc15"],
    icon: `<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><path d="M13 11 9 17h6l-4 6"/>`
  },
  {
    id: "zdrav",
    name: "Zdrav",
    url: "https://zig4to.github.io/Zdrav/",
    accent: ["#22c55e", "#16a34a"],
    icon: `<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>`
  }
];

// Zavihki po nujnosti znotraj vsake kategorije, v vsaki aplikaciji — enaki
// povsod, niso vezani na APPS. "splosno" je privzeta vrednost za stvari, ki
// (še) nimajo prioriteta.prioriteta nastavljene (obstoječi zapisi izpred te
// funkcije), da se ob nadgradnji nič ne "izgubi" v prazen zavihek.
const PRIORITETE = [
  {
    id: "nujno",
    name: "Nujno",
    accent: "#ef4444",
    icon: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`
  },
  {
    id: "splosno",
    name: "Splošno",
    accent: "#f59e0b",
    icon: `<path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/>`
  },
  {
    id: "mogoce",
    name: "Mogoče",
    accent: "#64748b",
    icon: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`
  }
];

function prioritetaOf(item) {
  return item.prioriteta || "splosno";
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Kdaj je bila katera aplikacija nazadnje odprta — samo za razvrstitev
// zavihkov (renderTabs), ni del data/sync. Aplikacija brez zapisa (še nikoli
// odprta v tem brskalniku) šteje kot najstarejša (0) in pristane skrajno
// desno.
const LAST_SEEN_KEY = "iskra-zadnji-ogled";

function loadLastSeen() {
  try { return JSON.parse(localStorage.getItem(LAST_SEEN_KEY)) || {}; }
  catch (e) { return {}; }
}

function touchLastSeen(id) {
  lastSeen[id] = Date.now();
  try { localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(lastSeen)); } catch (e) { /* poln disk */ }
}

// Kateri zavihek je bil nazadnje odprt (= tisti, ki smo ga nazadnje urejali,
// saj se ureja vedno znotraj trenutno odprtega zavihka) — po osvežitvi strani
// se odpre isti, namesto da bi se vedno povrnil na prvega po abecedi.
const ACTIVE_APP_KEY = "iskra-aktivna-app";

function loadActiveApp() {
  try {
    const id = localStorage.getItem(ACTIVE_APP_KEY);
    return (id && getApp(id)) ? id : APPS[0].id;
  } catch (e) {
    return APPS[0].id;
  }
}

function persistActiveApp(id) {
  try { localStorage.setItem(ACTIVE_APP_KEY, id); } catch (e) { /* poln disk */ }
}

function defaultData() {
  const data = {};
  APPS.forEach((app) => {
    data[app.id] = [{ id: uid(), name: "Ideje", items: [] }];
  });
  return data;
}

// Doda manjkajoče zavihke (npr. na novo dodano aplikacijo v APPS), ne glede
// na to, ali `parsed` prihaja iz localStorage ali iz oblaka — oboje gre skozi
// isto pot, da se struktura ne razhaja.
function healData(parsed) {
  APPS.forEach((app) => {
    if (!Array.isArray(parsed[app.id])) parsed[app.id] = [{ id: uid(), name: "Ideje", items: [] }];
  });
  return parsed;
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return healData(JSON.parse(raw));
  } catch (e) {
    return defaultData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Sync ni naložen v testnem/offline okolju brez tega — glej sync.js.
  if (window.Sync) Sync.afterSave();
}

let data = loadData();
let activeApp = loadActiveApp();
let activeTab = {}; // catId -> id iz PRIORITETE; ni shranjeno, samo za to sejo
let collapsedCats = {}; // catId -> bool (zložena kategorija); ni shranjeno, samo za to sejo
let lastSeen = loadLastSeen(); // appId -> Date.now() ob zadnjem odpiranju zavihka
let editingItem = null; // id stvari, ki se trenutno ureja (klik na besedilo); ni shranjeno

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

// Za brskalnike/ne-varne izvore (npr. testiranje prek LAN IP), kjer
// navigator.clipboard ni na voljo.
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand("copy"); } catch (e) { /* nič */ }
  document.body.removeChild(ta);
}

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
  // Nazadnje odprti so na levi, tisti, ki se dolgo niso odprli (ali sploh
  // še ne), pa proti desni — slice() pred sort(), da APPS ostane nespremenjen.
  const sorted = APPS.slice().sort((a, b) => (lastSeen[b.id] || 0) - (lastSeen[a.id] || 0));
  sorted.forEach((app) => {
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
  touchLastSeen(id);
  persistActiveApp(id);
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
  // Ista barva kot gumb za izbiro aplikacije (glej --tab-c1 v renderTabs) —
  // uporabljajo jo obrobe kategorij in vnosnega polja za novo kategorijo
  // (style.css), da so zavihki bolje vidni in vseskozi obarvani po aplikaciji.
  document.documentElement.style.setProperty("--app-accent", app.accent[0]);
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
    const isCollapsed = !!collapsedCats[cat.id];
    if (isCollapsed) section.classList.add("is-collapsed");

    // ---- glava kategorije ----
    // Klik kamorkoli na glavo zloži/razpre kategorijo — razen na elemente, ki
    // imajo svoj pomen (ime, zavihki nujnosti, brisanje): ti klic ustavijo z
    // e.stopPropagation(), da se ne zloži kategorija, ko npr. samo preklopiš
    // zavihek. Gumb za zlaganje (foldBtn) svojega poslušalca nima namerno —
    // njegov klik se preprosto dvigne do glave in izkoristi isto logiko.
    const head = document.createElement("div");
    head.className = "cat-head";
    head.addEventListener("click", () => {
      collapsedCats[cat.id] = !collapsedCats[cat.id];
      renderCategories();
    });

    const foldBtn = document.createElement("button");
    foldBtn.className = "fold-btn";
    foldBtn.type = "button";
    foldBtn.title = isCollapsed ? "Razpri kategorijo" : "Zloži kategorijo";
    foldBtn.appendChild(svgEl(`<path d="m6 9 6 6 6-6"/>`));

    // Ni več urejljiv vnos — samo naslov, klik nanj zloži/razpre kategorijo
    // (bubbla do head, glej spodaj), kot vsak drug klik na glavo.
    const nameEl = document.createElement("span");
    nameEl.className = "cat-name";
    nameEl.textContent = cat.name;

    const doneCount = cat.items.filter((i) => i.done).length;
    const count = document.createElement("span");
    count.className = "cat-count";
    count.textContent = `${doneCount}/${cat.items.length}`;

    const delBtn = document.createElement("button");
    delBtn.className = "mini-btn";
    delBtn.type = "button";
    delBtn.title = "Izbriši kategorijo";
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cat.items.length && !confirm(`Izbrišem kategorijo "${cat.name}" z vsemi stvarmi?`)) return;
      data[activeApp] = data[activeApp].filter((c) => c.id !== cat.id);
      saveData();
      renderCategories();
    });

    const headRight = document.createElement("div");
    headRight.className = "cat-head-right";
    headRight.appendChild(count);
    headRight.appendChild(delBtn);

    // ---- zavihki po nujnosti (nujno / splošno / mogoče) ----
    // Del iste glave (ne ločena vrstica) — na namizju pristanejo sredinsko
    // med imenom in števcem/brisanjem, na mobilnem pa se z `order`/
    // `flex-basis` prelomijo pod prvo vrstico, levo poravnani (glej CSS).
    const prioRow = document.createElement("div");
    prioRow.className = "prio-tabs";
    const active = activeTab[cat.id] || "splosno";

    PRIORITETE.forEach((p) => {
      const n = cat.items.filter((i) => prioritetaOf(i) === p.id).length;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "prio-tab" + (p.id === active ? " active" : "");
      btn.style.setProperty("--prio-c", p.accent);

      const ic = document.createElement("span");
      ic.className = "prio-tab-icon";
      ic.appendChild(svgEl(p.icon));

      const lbl = document.createElement("span");
      lbl.className = "prio-tab-name";
      lbl.textContent = p.name;

      btn.appendChild(ic);
      btn.appendChild(lbl);

      if (n) {
        const badge = document.createElement("span");
        badge.className = "prio-tab-count";
        badge.textContent = n;
        btn.appendChild(badge);
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeTab[cat.id] = p.id;
        renderCategories();
      });

      prioRow.appendChild(btn);
    });

    head.appendChild(foldBtn);
    head.appendChild(nameEl);
    head.appendChild(prioRow);
    head.appendChild(headRight);
    section.appendChild(head);

    if (!isCollapsed) {
      // ---- seznam stvari (samo za izbrani zavihek nujnosti) ----
      const shown = cat.items.filter((i) => prioritetaOf(i) === active);

      if (shown.length) {
        const ul = document.createElement("ul");
        ul.className = "items";

        sortedItems(shown).forEach((item) => {
          const li = document.createElement("li");
          li.className = "item" + (item.done ? " done" : "");

          const editing = editingItem === item.id;

          // Ko urejamo besedilo, je ovojnica <div> namesto <label> — <label>
          // okrog checkboxa bi klik kamorkoli (tudi v vnosno polje) preusmeril
          // nanj, poleg tega bi bila z dvema vnosnima elementoma (checkbox +
          // input) v istem <label> povezava dvoumna.
          const label = document.createElement(editing ? "div" : "label");
          label.className = "item-check" + (editing ? " editing" : "");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = item.done;
          checkbox.addEventListener("change", () => {
            item.done = checkbox.checked;
            saveData();
            renderCategories();
          });

          label.appendChild(checkbox);

          if (editing) {
            const editInput = document.createElement("input");
            editInput.className = "item-text-edit";
            editInput.value = item.text;
            editInput.addEventListener("click", (e) => e.stopPropagation());
            const commit = () => {
              const v = editInput.value.trim();
              if (v) item.text = v;
              editingItem = null;
              saveData();
              renderCategories();
            };
            editInput.addEventListener("blur", commit);
            editInput.addEventListener("keydown", (e) => {
              if (e.key === "Enter") { e.preventDefault(); editInput.blur(); }
              else if (e.key === "Escape") { editingItem = null; renderCategories(); }
            });
            label.appendChild(editInput);
          } else {
            const text = document.createElement("span");
            text.className = "item-text";
            text.textContent = item.text;
            // preventDefault: brez tega bi klik na besedilo (znotraj <label>)
            // po privzetem obnašanju sprožil tudi checkbox, kot da smo
            // kliknili nanj — želimo samo urejanje, kljukica naj se preklaplja
            // izključno s klikom neposredno na checkbox.
            text.addEventListener("click", (e) => {
              e.preventDefault();
              editingItem = item.id;
              renderCategories();
            });
            label.appendChild(text);
          }

          const copyBtn = document.createElement("button");
          copyBtn.className = "item-copy";
          copyBtn.type = "button";
          copyBtn.title = "Kopiraj";
          copyBtn.textContent = "📋";
          copyBtn.addEventListener("click", () => {
            copyText(item.text);
            copyBtn.classList.add("copied");
            copyBtn.title = "Kopirano!";
            setTimeout(() => {
              copyBtn.classList.remove("copied");
              copyBtn.title = "Kopiraj";
            }, 1000);
          });

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
          li.appendChild(copyBtn);
          li.appendChild(del);
          ul.appendChild(li);
        });

        section.appendChild(ul);
      } else {
        const hint = document.createElement("p");
        hint.className = "prio-empty-hint";
        hint.textContent = "Tukaj še ni ničesar.";
        section.appendChild(hint);
      }

      // ---- dodajanje stvari (gre v trenutno izbrani zavihek nujnosti) ----
      const addForm = document.createElement("form");
      addForm.className = "add-item-form";

      const addInput = document.createElement("input");
      addInput.placeholder = "Dodaj funkcijo / izboljšavo…";
      addInput.autocomplete = "off";

      const addBtn = document.createElement("button");
      addBtn.type = "submit";
      addBtn.textContent = "+";

      addForm.appendChild(addBtn);
      addForm.appendChild(addInput);
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = addInput.value.trim();
        if (!text) return;
        cat.items.push({ id: uid(), text, done: false, prioriteta: active });
        saveData();
        addInput.value = "";
        renderCategories();
      });

      section.appendChild(addForm);
    }

    categoriesEl.appendChild(section);
  });

  // Fokus na vnosno polje za urejanje besedila šele zdaj — prej element še
  // ni bil del dokumenta (focus() na odklopljenem elementu ne naredi nič).
  if (editingItem) {
    const editEl = categoriesEl.querySelector(".item-text-edit");
    if (editEl) { editEl.focus(); editEl.select(); }
  }
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

// -------------------------------------------------------------------- sync
const syncBtn = document.getElementById("syncBtn");

if (window.Sync) {
  Sync.getLocalData = () => data;

  // Prazno = vsaka aplikacija ima kvečjemu privzeto kategorijo "Ideje" brez
  // stvari — torej stanje, kakršno da defaultData()/seed v schema.sql, ne
  // nekaj, kar je uporabnik dejansko vnesel. Glej firstSync() v sync.js.
  Sync.isEmpty = (remote) => {
    const healed = healData(JSON.parse(JSON.stringify(remote || {})));
    return APPS.every((app) => {
      const cats = healed[app.id];
      return cats.length === 1 && cats[0].items.length === 0;
    });
  };

  Sync.onRemoteData = (remote) => {
    data = healData(remote || {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderPanel();
  };

  Sync.onStatus = (text, busy, kind) => {
    if (!syncBtn) return;
    syncBtn.title = text;
    syncBtn.classList.toggle("is-spinning", busy);
    syncBtn.classList.toggle("is-error", kind === "error");
  };

  if (syncBtn) {
    syncBtn.addEventListener("click", () => Sync.syncNow());
  }

  // Zgornji render je že iz localStorage — uporabnik ne čaka nanj. Ta klic
  // v ozadju preveri, ali je v oblaku kaj novejšega (npr. z druge naprave).
  Sync.syncNow();
}

// Service worker samo v produkciji — na localhost bi cache-first serviranje
// oviralo live reload med razvojem.
const isLocalhost = ["localhost", "127.0.0.1", ""].includes(location.hostname);
if ("serviceWorker" in navigator && !isLocalhost) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
