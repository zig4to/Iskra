/* Iskra — beležka funkcij/izboljšav po aplikacijah.
   Vsi podatki živijo v localStorage, brez strežnika. */

const STORAGE_KEY = "iskra-data-v1";

const APPS = [
  {
    id: "bingo",
    created: "2026-11-08",
    name: "Bingo",
    url: "https://bingo-zig4to.vercel.app/",
    accent: ["#f97316", "#dc2626"],
    icon: `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>`
  },
  {
    id: "cekar",
    created: "2026-11-01",
    name: "Cekar",
    url: "https://cekar.vercel.app/",
    accent: ["#16a34a", "#0d9488"],
    icon: `<path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>`
  },
  {
    id: "checkliste",
    created: "2026-07-25",
    name: "Checkliste",
    url: "https://zig4to.github.io/Checkliste/",
    accent: ["#10b981", "#22d3ee"],
    icon: `<path d="M9 3.5h6A1.5 1.5 0 0 1 16.5 5v.5H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h1.5V5A1.5 1.5 0 0 1 9 3.5Z"/><path d="m8.5 12.5 2 2 4-4.5"/><path d="M8.5 18h7"/>`
  },
  {
    id: "iskra",
    created: "2026-08-26T20:32",
    name: "Iskra",
    url: "https://zig4to.github.io/Iskra/",
    accent: ["#f59e0b", "#ef4444"],
    icon: `<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>`
  },
  {
    id: "kam",
    created: "2026-08-27",
    name: "Kam",
    url: "https://zig4to.github.io/Kam/",
    accent: ["#38bdf8", "#0f766e"],
    icon: `<path d="M4 17.5 L9 8 L12 12 L15 6 L20 17.5 Z"/><path d="M8.16 9.6 L9 8 L10.2 9.6 M14.2 7.6 L15 6 L15.7 7.6"/>`
  },
  {
    id: "komadi",
    created: "2026-08-25",
    name: "Komadi",
    url: "https://zig4to.github.io/Komadi/",
    accent: ["#ec4899", "#f97316"],
    icon: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`
  },
  {
    id: "kvit",
    created: "2026-11-05",
    name: "Kvit",
    url: "https://kvit-pearl.vercel.app/",
    accent: ["#f43f5e", "#8b5cf6"],
    icon: `<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>`
  },
  {
    id: "mascajt",
    created: "2026-08-20",
    name: "masCajt",
    url: "https://zig4to.github.io/masCajt/",
    accent: ["#6366f1", "#a855f7"],
    icon: `<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 13.5h3M7.5 17h6"/>`
  },
  {
    id: "pisi",
    created: "2026-09-03",
    name: "Piši",
    url: "https://pisi-omega.vercel.app/",
    accent: ["#6366f1", "#3b82f6"],
    icon: `<path d="M2 6h4M2 10h4M2 14h4M2 18h4"/><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M16 2v20"/>`
  },
  {
    id: "posel",
    created: "2026-08-31",
    name: "Posel",
    url: "https://posel-six.vercel.app/",
    accent: ["#93a2c6", "#282c47"],
    icon: `<rect x="3.6" y="8.4" width="16.8" height="11.6" rx="3.4"/><path d="M9.4 8.4V7a2.4 2.4 0 0 1 2.4-2.4h0.4a2.4 2.4 0 0 1 2.4 2.4v1.4"/>`
  },
  {
    id: "racuni",
    created: "2026-08-24T13:09",
    name: "Računi",
    url: "https://zig4to.github.io/Racuni/",
    accent: ["#f59e0b", "#fb7185"],
    icon: `<path d="M6 2.5h12v19l-2.5-1.6L13 21.5l-2.5-1.6L8 21.5l-2-1.6Z"/><path d="M9.5 8h5M9.5 12h5M9.5 16h3"/>`
  },
  {
    id: "tomsstudios",
    created: "2026-08-24T19:23",
    name: "Bitneverse",
    url: "https://zig4to.github.io/TomsStudios/",
    accent: ["#2e1065", "#c026d3"],
    icon: `<path d="M8.02 19.76L13.47 19.76L13.79 19.75L14.09 19.71L14.37 19.66L14.64 19.58L14.88 19.48L15.11 19.35L15.32 19.2L15.5 19.03L15.67 18.84L15.82 18.63L15.94 18.4L16.04 18.15L16.12 17.88L16.17 17.59L16.21 17.28L16.22 16.96L16.22 15.08L16.17 14.42L16.03 13.85L15.79 13.37L15.46 12.98L15.04 12.67L14.52 12.45L13.91 12.32L13.2 12.28L8.02 12.28L7.97 12.28L7.92 12.29L7.88 12.31L7.84 12.33L7.82 12.36L7.8 12.4L7.79 12.44L7.78 12.49L7.78 19.55L7.79 19.6L7.8 19.64L7.82 19.68L7.84 19.71L7.88 19.73L7.92 19.75L7.97 19.76ZM8.02 11.54L13.2 11.54L13.53 11.53L13.84 11.49L14.13 11.44L14.4 11.36L14.66 11.25L14.89 11.13L15.11 10.98L15.3 10.81L15.48 10.62L15.63 10.41L15.76 10.18L15.87 9.93L15.95 9.66L16.01 9.37L16.05 9.06L16.06 8.73L16.06 7.04L16.05 6.72L16.01 6.41L15.96 6.12L15.88 5.85L15.78 5.6L15.66 5.37L15.51 5.16L15.34 4.97L15.16 4.8L14.95 4.65L14.72 4.52L14.48 4.42L14.21 4.34L13.93 4.29L13.63 4.25L13.31 4.24L8.02 4.24L7.97 4.24L7.92 4.25L7.88 4.27L7.84 4.29L7.82 4.32L7.8 4.36L7.79 4.4L7.78 4.45L7.78 11.33L7.79 11.38L7.8 11.42L7.82 11.45L7.84 11.48L7.88 11.51L7.92 11.52L7.97 11.53ZM6.99 20.26L6.99 3.74L6.99 3.68L7 3.63L7.02 3.59L7.04 3.56L7.07 3.53L7.11 3.51L7.15 3.5L7.2 3.5L13.31 3.5L13.7 3.51L14.07 3.56L14.43 3.63L14.76 3.73L15.07 3.87L15.36 4.03L15.64 4.22L15.89 4.44L16.11 4.68L16.31 4.95L16.47 5.24L16.61 5.55L16.72 5.89L16.79 6.24L16.84 6.62L16.85 7.02L16.85 8.76L16.82 9.35L16.71 9.88L16.52 10.36L16.27 10.78L15.94 11.14L15.54 11.45L15.07 11.71L14.52 11.91L14.76 11.93L14.99 11.99L15.21 12.06L15.43 12.17L15.64 12.29L15.85 12.45L16.05 12.63L16.24 12.83L16.42 13.06L16.58 13.3L16.71 13.55L16.82 13.82L16.9 14.11L16.96 14.41L17 14.72L17.01 15.05L17.01 16.98L17 17.38L16.95 17.76L16.87 18.11L16.77 18.45L16.63 18.76L16.47 19.05L16.27 19.32L16.05 19.56L15.79 19.78L15.52 19.97L15.23 20.13L14.92 20.27L14.59 20.37L14.23 20.44L13.86 20.49L13.47 20.5L7.2 20.5L7.15 20.5L7.11 20.49L7.07 20.47L7.04 20.44L7.02 20.41L7 20.37L6.99 20.32Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>`
  },
  {
    id: "viharnik",
    created: "2026-08-30",
    name: "Viharnik",
    url: "https://viharnik.vercel.app/",
    accent: ["#6d5cf5", "#facc15"],
    icon: `<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><path d="M13 11 9 17h6l-4 6"/>`
  },
  {
    id: "vzlet",
    created: "2026-09-09",
    name: "Vzlet",
    url: "https://vzlet-ruddy.vercel.app/",
    accent: ["#6366f1", "#3b82f6"],
    icon: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`
  },
  {
    id: "zdrav",
    created: "2026-08-26T21:30",
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

// Opravljena stvar ostane prečrtana v seznamu še en dan (da se lahko
// premisliš), nato se pospravi v arhiv na dnu kategorije — iz podatkov ne
// izgine, šteje se v statistiko (števec v glavi kategorije). Stari opravljeni
// zapisi brez doneAt (izpred te funkcije) gredo v arhiv takoj.
const ARCHIVE_AFTER = 24 * 60 * 60 * 1000;

function isArchived(item) {
  return item.done && (!item.doneAt || Date.now() - item.doneAt > ARCHIVE_AFTER);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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

// Stanje pogleda po kategorijah (zložena, izbrani zavihek nujnosti, razprt
// arhiv) — zapomni si po osvežitvi. Samo na tej napravi (ni del data/sync),
// da npr. zlaganje na telefonu ne vpliva na računalnik. Vsaka mapa je
// catId -> vrednost; hrani se le, kar ni privzeto.
const COLLAPSED_CATS_KEY = "iskra-zlozene-kategorije";
const ACTIVE_TAB_KEY = "iskra-zavihki-nujnosti";
const OPEN_ARCHIVE_KEY = "iskra-odprti-arhivi";

function loadUiMap(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; }
  catch (e) { return {}; }
}

// value === undefined/false -> privzeto, zapis se odstrani.
function setUiMap(key, map, catId, value) {
  if (value) map[catId] = value;
  else delete map[catId];
  try { localStorage.setItem(key, JSON.stringify(map)); } catch (e) { /* poln disk */ }
}

function setCatCollapsed(catId, collapsed) {
  setUiMap(COLLAPSED_CATS_KEY, collapsedCats, catId, collapsed);
}

function setActiveTab(catId, prioId) {
  setUiMap(ACTIVE_TAB_KEY, activeTab, catId, prioId === "splosno" ? undefined : prioId);
}

function setArchiveOpen(catId, open) {
  setUiMap(OPEN_ARCHIVE_KEY, openArchive, catId, open);
}

// Ob brisanju kategorije počisti vse njene zapise.
function forgetCatUi(catId) {
  setCatCollapsed(catId, false);
  setActiveTab(catId, "splosno");
  setArchiveOpen(catId, false);
}

function defaultData() {
  return healData({});
}

// Doda manjkajoče zavihke (npr. na novo dodano aplikacijo v APPS), ne glede
// na to, ali `parsed` prihaja iz localStorage ali iz oblaka — oboje gre skozi
// isto pot, da se struktura ne razhaja.
function healData(parsed) {
  APPS.forEach((app) => {
    if (!Array.isArray(parsed[app.id])) parsed[app.id] = [{ id: uid(), name: "Ideje", items: [] }];
    pinAktualno(parsed[app.id], app.id);
  });
  return parsed;
}

// Vsaka aplikacija ima kategorijo "Aktualno", pripeto na vrh (ni je mogoče
// izbrisati). Id je določen z id-jem aplikacije, ne naključen — tako dve
// napravi, ki jo ustvarita vsaka zase, pred sinhronizacijo ne dobita dveh
// različnih. Če uporabnik že ima kategorijo z imenom "Aktualno", se pripne
// ta (z obstoječimi stvarmi), namesto da bi nastala še ena.
function pinAktualno(cats, appId) {
  let idx = cats.findIndex((c) => c.pinned);
  if (idx === -1) idx = cats.findIndex((c) => c.name.trim().toLowerCase() === "aktualno");
  const pinned = idx === -1
    ? { id: "aktualno-" + appId, name: "Aktualno", items: [] }
    : cats.splice(idx, 1)[0];
  pinned.pinned = true;
  cats.unshift(pinned);
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
let activeTab = loadUiMap(ACTIVE_TAB_KEY); // catId -> id iz PRIORITETE (le če ni "splosno")
let collapsedCats = loadUiMap(COLLAPSED_CATS_KEY); // catId -> true (zložena kategorija); glej setUiMap
let openArchive = loadUiMap(OPEN_ARCHIVE_KEY); // catId -> true (razprt arhiv opravljenih)
let editingItem = null; // id stvari, ki se trenutno ureja (klik na besedilo); ni shranjeno
let focusAddCat = null; // id kategorije, katere vnosno polje za dodajanje naj po ponovnem izrisu dobi fokus (veriženje vnosov z Enter)

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
const recentSectionEl = document.getElementById("recentSection");
const recentStripEl = document.getElementById("recentStrip");

// Zložljiva razdelka nad panelom ("Aplikacije", "Nazadnje dodano") — klik na
// naslov skrije/pokaže vsebino; stanje si zapomni po osvežitvi pod ključem iz
// data-fold-key. Vrne funkcijo (collapsed) => void za zlaganje iz kode.
function setupCollapsible(sectionEl) {
  const toggle = sectionEl.querySelector(".section-toggle");
  const key = sectionEl.dataset.foldKey;

  const apply = (collapsed) => {
    sectionEl.classList.toggle("is-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
  };

  const set = (collapsed) => {
    apply(collapsed);
    try { localStorage.setItem(key, collapsed ? "1" : "0"); } catch (e) { /* poln disk */ }
  };

  try { apply(localStorage.getItem(key) === "1"); }
  catch (e) { apply(false); }

  toggle.addEventListener("click", () => set(!sectionEl.classList.contains("is-collapsed")));
  return set;
}

const setAppsCollapsed = setupCollapsible(document.getElementById("appsSection"));
setupCollapsible(document.getElementById("recentSection"));

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

// Lucide "trash-2" — enotna ikona za brisanje (stvari in kategorij).
const TRASH_ICON =
  `<path d="M3 6h18"/>` +
  `<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>` +
  `<path d="M10 11v6"/><path d="M14 11v6"/>`;

// Lucide "pin" — oznaka pripete kategorije "Aktualno".
const PIN_ICON =
  `<path d="M12 17v5"/>` +
  `<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>`;

function renderTabs() {
  tabsEl.innerHTML = "";
  // Najstarejše ustvarjene aplikacije (APPS[].created, datum repozitorija)
  // so levo zgoraj, najnovejše na koncu — slice() pred sort(), da APPS
  // ostane nespremenjen.
  const sorted = APPS.slice().sort((a, b) => a.created.localeCompare(b.created));
  sorted.forEach((app) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (app.id === activeApp ? " active" : "");
    btn.style.setProperty("--tab-c1", app.accent[0]);
    btn.style.setProperty("--tab-c2", app.accent[1]);
    btn.setAttribute("type", "button");
    // Na telefonu je ime skrito (samo ikona) — naj ostane vsaj v namigu in
    // za bralnike zaslona.
    btn.title = app.name;
    btn.setAttribute("aria-label", app.name);

    const iconWrap = document.createElement("span");
    iconWrap.className = "tab-icon";
    iconWrap.appendChild(svgEl(app.icon));

    const label = document.createElement("span");
    label.className = "tab-name";
    label.textContent = app.name;

    btn.appendChild(iconWrap);
    btn.appendChild(label);
    // Izbira aplikacije zloži mrežo aplikacij — ko je beležka izbrana, mreža
    // le zaseda prostor; s klikom na "Aplikacije" se spet razpre.
    btn.addEventListener("click", () => {
      selectApp(app.id);
      setAppsCollapsed(true);
    });
    tabsEl.appendChild(btn);
  });
}

function selectApp(id) {
  activeApp = id;
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

// Čas nastanka stvari — novejše imajo polje `created`, starejše (izpred te
// funkcije) pa ga razberemo iz id-ja: uid() se začne z Date.now() v base36
// (8 znakov), sledi 6 naključnih.
function createdAt(item) {
  if (item.created) return item.created;
  const t = parseInt(String(item.id).slice(0, 8), 36);
  return Number.isFinite(t) ? t : 0;
}

const RECENT_LIMIT = 20;

// Trak "Nazadnje dodano" pod zavihki aplikacij — zadnje dodane (še ne
// opravljene) stvari iz vseh aplikacij, v stolpcih po dve, drsi se levo.
function renderRecent() {
  const all = [];
  APPS.forEach((app) => {
    (data[app.id] || []).forEach((cat) => {
      cat.items.forEach((item) => {
        if (!item.done) all.push({ app, cat, item });
      });
    });
  });
  all.sort((a, b) => createdAt(b.item) - createdAt(a.item));
  const recent = all.slice(0, RECENT_LIMIT);

  recentSectionEl.hidden = !recent.length;
  recentStripEl.innerHTML = "";

  recent.forEach(({ app, cat, item }) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "recent-card";
    card.title = `${app.name} · ${cat.name}\n${item.text}`;
    card.style.setProperty("--tab-c1", app.accent[0]);
    card.style.setProperty("--tab-c2", app.accent[1]);

    const iconWrap = document.createElement("span");
    iconWrap.className = "tab-icon";
    iconWrap.appendChild(svgEl(app.icon));

    const text = document.createElement("span");
    text.className = "recent-text";
    text.textContent = item.text;

    card.appendChild(iconWrap);
    card.appendChild(text);
    card.addEventListener("click", () => openItem(app.id, cat.id, item));
    recentStripEl.appendChild(card);
  });
}

// Skok na stvar iz traku: odpre aplikacijo, razpre kategorijo, izbere pravi
// zavihek nujnosti in stvar pomakne v pogled ter jo na kratko poudari.
function openItem(appId, catId, item) {
  setCatCollapsed(catId, false);
  setActiveTab(catId, prioritetaOf(item));
  selectApp(appId);
  const li = categoriesEl.querySelector('.item[data-id="' + item.id + '"]');
  if (!li) return;
  li.scrollIntoView({ behavior: "smooth", block: "center" });
  li.classList.add("flash");
  setTimeout(() => li.classList.remove("flash"), 1600);
}

function renderCategories() {
  renderRecent();
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
    section.className = "cat" + (cat.pinned ? " pinned" : "");
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
      setCatCollapsed(cat.id, !collapsedCats[cat.id]);
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
    delBtn.setAttribute("aria-label", "Izbriši kategorijo");
    delBtn.appendChild(svgEl(TRASH_ICON));
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cat.items.length && !confirm(`Izbrišem kategorijo "${cat.name}" z vsemi stvarmi?`)) return;
      data[activeApp] = data[activeApp].filter((c) => c.id !== cat.id);
      forgetCatUi(cat.id);
      saveData();
      renderCategories();
    });

    const headRight = document.createElement("div");
    headRight.className = "cat-head-right";
    headRight.appendChild(count);
    if (cat.pinned) {
      // Pripeta "Aktualno" se ne briše — namesto koša ikona žebljička.
      const pin = document.createElement("span");
      pin.className = "pin-mark";
      pin.title = "Pripeto na vrh";
      pin.appendChild(svgEl(PIN_ICON));
      headRight.appendChild(pin);
    } else {
      headRight.appendChild(delBtn);
    }

    // ---- zavihki po nujnosti (nujno / splošno / mogoče) ----
    // Del iste glave (ne ločena vrstica) — na namizju pristanejo sredinsko
    // med imenom in števcem/brisanjem, na mobilnem pa se z `order`/
    // `flex-basis` prelomijo pod prvo vrstico, levo poravnani (glej CSS).
    const prioRow = document.createElement("div");
    prioRow.className = "prio-tabs";
    const active = activeTab[cat.id] || "splosno";

    PRIORITETE.forEach((p) => {
      const n = cat.items.filter((i) => prioritetaOf(i) === p.id && !isArchived(i)).length;

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
        setActiveTab(cat.id, p.id);
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
      const shown = cat.items.filter((i) => prioritetaOf(i) === active && !isArchived(i));

      if (shown.length) {
        const ul = document.createElement("ul");
        ul.className = "items";

        sortedItems(shown).forEach((item) => {
          const editing = editingItem === item.id;

          const li = document.createElement("li");
          li.className = "item" + (item.done ? " done" : "") + (editing ? " editing" : "");
          li.dataset.id = item.id;

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
            if (item.done) item.doneAt = Date.now();
            else delete item.doneAt;
            saveData();
            renderCategories();
          });

          label.appendChild(checkbox);

          if (editing) {
            // <textarea> namesto <input>: pri dolgem besedilu se polje razpre
            // po višini (autoGrow), da je celoten tekst viden naenkrat, ne
            // stisnjen v eno vrsto. Enter še vedno potrdi (kot pri dodajanju),
            // zato v besedilu ni prelomov — textarea le ovije predolgo vrsto.
            const editInput = document.createElement("textarea");
            editInput.className = "item-text-edit";
            editInput.rows = 1;
            editInput.value = item.text;
            const autoGrow = () => {
              editInput.style.height = "auto";
              editInput.style.height = editInput.scrollHeight + "px";
            };
            editInput.addEventListener("input", autoGrow);
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
          copyBtn.setAttribute("aria-label", "Kopiraj besedilo");
          copyBtn.appendChild(svgEl(
            `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>` +
            `<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`
          ));
          copyBtn.addEventListener("click", () => {
            copyText(item.text);
            copyBtn.classList.add("copied");
            copyBtn.title = "Kopirano!";
            setTimeout(() => {
              copyBtn.classList.remove("copied");
              copyBtn.title = "Kopiraj";
            }, 2000);
          });

          const del = document.createElement("button");
          del.className = "item-del";
          del.type = "button";
          del.title = "Izbriši";
          del.setAttribute("aria-label", "Izbriši stvar");
          del.appendChild(svgEl(TRASH_ICON));
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

      // ---- arhiv opravljenih (vse nujnosti skupaj) ----
      const archived = cat.items.filter(isArchived)
        .sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));

      if (archived.length) {
        const archOpen = !!openArchive[cat.id];

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "archive-toggle" + (archOpen ? " open" : "");
        toggle.appendChild(svgEl(`<path d="m9 18 6-6-6-6"/>`));
        toggle.appendChild(document.createTextNode(`Opravljeno (${archived.length})`));
        toggle.addEventListener("click", () => {
          setArchiveOpen(cat.id, !archOpen);
          renderCategories();
        });
        section.appendChild(toggle);

        if (archOpen) {
          const archUl = document.createElement("ul");
          archUl.className = "archive-list";

          archived.forEach((item) => {
            const li = document.createElement("li");
            li.className = "archive-item";

            const text = document.createElement("span");
            text.className = "archive-text";
            text.textContent = item.text;

            const date = document.createElement("span");
            date.className = "archive-date";
            date.textContent = item.doneAt ? new Date(item.doneAt).toLocaleDateString("sl-SI") : "—";

            const restore = document.createElement("button");
            restore.type = "button";
            restore.className = "item-copy";
            restore.title = "Vrni med neopravljene";
            restore.setAttribute("aria-label", "Vrni med neopravljene");
            restore.appendChild(svgEl(`<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>`));
            restore.addEventListener("click", () => {
              item.done = false;
              delete item.doneAt;
              saveData();
              renderCategories();
            });

            const del = document.createElement("button");
            del.type = "button";
            del.className = "item-del";
            del.title = "Izbriši";
            del.setAttribute("aria-label", "Izbriši stvar");
            del.appendChild(svgEl(TRASH_ICON));
            del.addEventListener("click", () => {
              cat.items = cat.items.filter((i) => i.id !== item.id);
              saveData();
              renderCategories();
            });

            li.appendChild(text);
            li.appendChild(date);
            li.appendChild(restore);
            li.appendChild(del);
            archUl.appendChild(li);
          });

          section.appendChild(archUl);
        }
      }

      // ---- dodajanje stvari (gre v trenutno izbrani zavihek nujnosti) ----
      const addForm = document.createElement("form");
      addForm.className = "add-item-form";

      const addInput = document.createElement("input");
      addInput.placeholder = "Dodaj funkcijo / izboljšavo…";
      addInput.autocomplete = "off";
      addInput.dataset.cat = cat.id;

      const addBtn = document.createElement("button");
      addBtn.type = "submit";
      addBtn.textContent = "+";

      addForm.appendChild(addBtn);
      addForm.appendChild(addInput);
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = addInput.value.trim();
        if (!text) return;
        cat.items.push({ id: uid(), text, done: false, prioriteta: active, created: Date.now() });
        saveData();
        addInput.value = "";
        // Po izrisu vrni fokus v isto vnosno polje, da lahko z Enter dodajaš
        // stvari eno za drugo brez klikanja na "+".
        focusAddCat = cat.id;
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
    if (editEl) {
      // Višino nastavimo šele zdaj — scrollHeight je uporaben šele, ko je
      // element v dokumentu.
      editEl.style.height = "auto";
      editEl.style.height = editEl.scrollHeight + "px";
      editEl.focus();
      editEl.select();
    }
  }

  // Veriženje dodajanja: po Enter-ju v polju "Dodaj …" se izris ponovi in
  // fokus se izgubi — tu ga vrnemo v isto polje. Klic je še vedno znotraj
  // uporabnikove geste (submit iz Enter), zato tipkovnica na mobilnem
  // ostane odprta.
  if (focusAddCat) {
    const addEl = categoriesEl.querySelector('.add-item-form input[data-cat="' + focusAddCat + '"]');
    if (addEl) addEl.focus();
    focusAddCat = null;
  }
}

function addCategory(name) {
  name = name.trim();
  if (!name) return false;
  data[activeApp].push({ id: uid(), name, items: [] });
  saveData();
  renderCategories();
  return true;
}

addCatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addCategory(addCatInput.value)) addCatInput.value = "";
});

// Doda stvar v pripeto kategorijo "Aktualno" trenutne aplikacije — v zavihek
// nujnosti, ki je tam izbran, da je nova stvar takoj vidna. Kategorijo
// razpre, če je bila zložena.
function addToAktualno(text) {
  text = text.trim();
  if (!text) return false;
  const cat = data[activeApp].find((c) => c.pinned);
  const prioriteta = activeTab[cat.id] || "splosno";
  cat.items.push({ id: uid(), text, done: false, prioriteta, created: Date.now() });
  setCatCollapsed(cat.id, false);
  saveData();
  renderCategories();
  return true;
}

// ---- skupno okno za vnos ----
const inputDialog = document.getElementById("inputDialog");
const inputDialogTitle = document.getElementById("inputDialogTitle");
const inputDialogInput = document.getElementById("inputDialogInput");
let inputDialogSubmit = null; // (vrednost) => bool; true = uspelo, zapri okno

function openInputDialog(title, placeholder, onSubmit) {
  inputDialogTitle.textContent = title;
  inputDialogInput.placeholder = placeholder;
  inputDialogInput.value = "";
  inputDialogSubmit = onSubmit;
  inputDialog.showModal();
  inputDialogInput.focus();
}

document.getElementById("inputDialogForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputDialogSubmit && inputDialogSubmit(inputDialogInput.value)) inputDialog.close();
});

document.getElementById("inputDialogCancel").addEventListener("click", () => inputDialog.close());

// Klik na zatemnjeno ozadje (izven okna) zapre okno.
inputDialog.addEventListener("click", (e) => {
  if (e.target === inputDialog) inputDialog.close();
});

// Telefon: gumb "+ Kategorija" v glavi odpre okno za vnos (vnosno polje
// pod glavo je tam skrito, glej style.css).
document.getElementById("addCatHeadBtn").addEventListener("click", () => {
  openInputDialog("Nova kategorija", "Ime kategorije…", addCategory);
});

document.getElementById("addAktualnoBtn").addEventListener("click", () => {
  openInputDialog(`Aktualno · ${getApp(activeApp).name}`, "Dodaj funkcijo / izboljšavo…", addToAktualno);
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

// -------- Drsenje zavihkov (in traku "Nazadnje dodano") levo/desno --------
// Telefon: overflow-x: auto poskrbi za naravno drsenje s prstom.
// Desktop: z miško lahko pritisneš in povlečeš trak, kolešček pa ga premika
// vodoravno (tudi navpični zdrs).
function setupDragScroll(el) {
  let down = false, moved = false, startX = 0, startScroll = 0;

  const overflowing = () => el.scrollWidth > el.clientWidth + 1;
  const paintGrab = () => el.classList.toggle("grabbable", overflowing());
  paintGrab();
  window.addEventListener("resize", paintGrab);
  new MutationObserver(paintGrab).observe(el, { childList: true });

  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !overflowing()) return;
    down = true;
    moved = false;
    startX = e.clientX;
    startScroll = el.scrollLeft;
  });

  el.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      el.classList.add("dragging");
      el.setPointerCapture(e.pointerId);
    }
    if (moved) el.scrollLeft = startScroll - dx;
  });

  const end = () => {
    down = false;
    el.classList.remove("dragging");
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);

  // Po vlečenju prepreči, da bi se sprožil klik na zavihek pod kazalcem.
  el.addEventListener("click", (e) => {
    if (!moved) return;
    e.preventDefault();
    e.stopPropagation();
    moved = false;
  }, true);

  // Navpični kolešček -> vodoravno drsenje.
  el.addEventListener("wheel", (e) => {
    if (!overflowing() || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });
}
setupDragScroll(tabsEl);
setupDragScroll(recentStripEl);

renderTabs();
renderPanel();

// Ob vrnitvi v aplikacijo (npr. naslednji dan) pospravi stvari, ki so bile
// opravljene pred več kot dnevom — brez tega bi ostale vidne do naslednjega
// izrisa. Med urejanjem ne, da ne izgubimo vnosa.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !editingItem) renderCategories();
});

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
      // Pripeto "Aktualno" doda healData vedno — ne šteje kot vsebina.
      const rest = cats.filter((c) => !c.pinned);
      return !cats[0].items.length && rest.length === 1 && rest[0].items.length === 0;
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
