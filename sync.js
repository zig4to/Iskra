/* Sinhronizacija Iskre s Supabase — brez zunanjih knjižnic, samo fetch.
 *
 * localStorage ostane glavni vir resnice: aplikacija dela naprej brez
 * povezave, sinhronizacija le zrcali lokalno stanje v oblak in nazaj.
 *
 * Brez prijave (Iskra je samo zame) — cela `data` struktura je en jsonb
 * blob v eni sami vrstici (id=1) v tabeli iskra_data. Dostop varujejo
 * pravila RLS v bazi (glej supabase/schema.sql), ne skrivnost ključa —
 * ključ spodaj ni skrivnost, je objavljen v tem JS.
 *
 * "Zadnje znano stanje" (LAST_KEY) ni čas te naprave, je updated_at, ki ga
 * je nazadnje vrnil strežnik — s tem primerjava ne rabi ur dveh naprav.
 */
window.Sync = (function () {
  'use strict';

  var URL_BASE = 'https://mpiliybdfhgqslubvhwd.supabase.co';
  var API_KEY  = 'sb_publishable_3888vcj_lpaerHs9H74Llg_-0p1W_MC';
  var LAST_KEY = 'iskra-zadnja-sinh';

  var running = false;
  var pushTimer = null;

  function configured() { return !!(URL_BASE && API_KEY); }

  function status(text, busy, kind) {
    if (typeof Sync.onStatus === 'function') Sync.onStatus(text, !!busy, kind || 'info');
  }

  function headers(extra) {
    var h = { apikey: API_KEY, Authorization: 'Bearer ' + API_KEY };
    for (var k in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, k)) h[k] = extra[k];
    }
    return h;
  }

  function fail(res, kaj) {
    return res.text().then(function (body) {
      throw new Error(kaj + ' (HTTP ' + res.status + ') ' + body.slice(0, 200));
    });
  }

  // -------------------------------------------------------------- prenos dol
  function fetchRow() {
    return fetch(URL_BASE + '/rest/v1/iskra_data?id=eq.1&select=data,updated_at', { headers: headers() })
      .then(function (res) {
        if (!res.ok) return fail(res, 'Branje ni uspelo');
        return res.json();
      })
      .then(function (rows) { return rows[0] || null; });
  }

  function pull() {
    return fetchRow().then(function (row) {
      if (!row) return false;
      var last = localStorage.getItem(LAST_KEY);
      if (last && new Date(row.updated_at) <= new Date(last)) return false; // nič novega
      if (typeof Sync.onRemoteData === 'function') Sync.onRemoteData(row.data);
      localStorage.setItem(LAST_KEY, row.updated_at);
      return true;
    });
  }

  /* Prva sinhronizacija na tej napravi (LAST_KEY še ne obstaja) je posebna:
     ne vemo, ali ima prednost tisto, kar je že lokalno, ali tisto, kar je v
     oblaku. Če je oblak prazen (nov sedež, prvi seed iz schema.sql), mora
     zmagati lokalno — sicer bi prvi sync na prvi napravi pobrisal obstoječe
     zavihke. Če ima oblak že vsebino (druga naprava se prvič priklaplja na
     že napolnjen sedež), zmaga oblak — to je normalni "nova naprava dobi
     obstoječe stanje" primer. */
  function firstSync() {
    return fetchRow().then(function (row) {
      if (!row) return false;
      var prazen = typeof Sync.isEmpty === 'function' && Sync.isEmpty(row.data);
      if (prazen) { localStorage.setItem(LAST_KEY, row.updated_at); return false; }
      if (typeof Sync.onRemoteData === 'function') Sync.onRemoteData(row.data);
      localStorage.setItem(LAST_KEY, row.updated_at);
      return true;
    });
  }

  // -------------------------------------------------------------- prenos gor
  function push() {
    if (typeof Sync.getLocalData !== 'function') return Promise.resolve(false);
    return fetch(URL_BASE + '/rest/v1/iskra_data?id=eq.1', {
      method: 'PATCH',
      headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=representation' }),
      body: JSON.stringify({ data: Sync.getLocalData() })
    }).then(function (res) {
      if (!res.ok) return fail(res, 'Shranjevanje ni uspelo');
      return res.json();
    }).then(function (rows) {
      var row = rows[0];
      if (row) localStorage.setItem(LAST_KEY, row.updated_at);
      return true;
    });
  }

  // ------------------------------------------------------------------ potek
  function syncNow() {
    if (!configured()) { status('Sinhronizacija ni nastavljena.', false, 'error'); return Promise.resolve(); }
    if (running) return Promise.resolve();
    if (navigator.onLine === false) { status('Ni povezave.', false, 'error'); return Promise.resolve(); }

    running = true;
    status('Sinhroniziram…', true);

    var korak = localStorage.getItem(LAST_KEY) ? pull() : firstSync();

    return korak
      .then(function (prenešeno) {
        return push().then(function (poslano) {
          if (prenešeno) status('Preneseno iz oblaka.', false, 'ok');
          else if (poslano) status('Shranjeno v oblak.', false, 'ok');
          else status('Vse je usklajeno.', false, 'ok');
          return { down: prenešeno, up: poslano };
        });
      })
      .catch(function (err) {
        status('Napaka: ' + (err.message || err), false, 'error');
      })
      .then(function (n) {
        running = false;
        return n;
      });
  }

  /* Kliče se po vsaki lokalni spremembi (iz saveData v script.js), z
     zamikom — da hitro zaporedje sprememb (npr. več kljukic zapored) ne
     sproži ločene zahteve za vsako. */
  function afterSave() {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { pushTimer = null; syncNow(); }, 1200);
  }

  var Sync = {
    syncNow: syncNow,
    afterSave: afterSave,
    configured: configured,
    onStatus: null,       // (text, busy, kind) => void — nastavi script.js
    onRemoteData: null,   // (data) => void          — nastavi script.js
    getLocalData: null,   // () => data               — nastavi script.js
    isEmpty: null          // (data) => bool           — nastavi script.js, glej firstSync()
  };
  return Sync;
})();
