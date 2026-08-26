# Iskra

Beležka funkcij in izboljšav, ki jih je treba dodati po mojih aplikacijah — kot issues,
a vse na enem mestu. Vsaka aplikacija ima svoje zavihek s kategorijami, vsaka kategorija
pa svoj checklist. Ko stvar odkljukaš, obarva rdeče in se premakne na dno seznama.

Brez strežnika — vsi podatki so shranjeni lokalno v brskalniku (`localStorage`).

## Zagon

```bash
npm start
```

Odpre statični strežnik na `:8080`. Ni build koraka, ni odvisnosti.

## Struktura

| Datoteka             | Vsebina                                         |
|-----------------------|--------------------------------------------------|
| `index.html`          | Naslov, zavihki aplikacij, glavni panel          |
| `style.css`           | Temna tema (barve iskre — jantar/rdeča)          |
| `script.js`           | Podatki, izris zavihkov/kategorij/kljukic        |
| `manifest.json`       | Podatki za namestitev (ime, ikone, barve)        |
| `sw.js`               | Service worker — namestljivost in delo brez neta |
| `icon.svg`            | Izvorna risba ikone (blisk)                      |
| `icons/`              | Generirane PNG ikone                             |
| `tools/make-icons.js` | Generator ikon (`npm run icons`)                 |
| `serve.js`            | Mini dev strežnik brez odvisnosti                |

## Dodajanje nove aplikacije v zavihke

V `script.js` v seznamu `APPS` dodaj nov objekt: `id`, `name`, `url` (naslov objavljene
aplikacije), `accent` (barvni preliv ikone) in `icon` (SVG pot, slog [Lucide](https://lucide.dev)).
Nov zavihek in prazna kategorija "Ideje" se pojavita samodejno ob naslednjem nalaganju.

## Namestitev na telefon

PWA. Na **Androidu (Chrome)**: meni ⋮ → *Namesti aplikacijo*. Na **iPhonu (Safari)**:
Deli → *Dodaj na začetni zaslon*. Pogoj je HTTPS — deluje na GitHub Pages.

> Po vsaki spremembi datotek povečaj `VERSION` v `sw.js`, sicer nameščene naprave
> še nekaj časa vidijo staro različico iz predpomnilnika.

## Objava na GitHub Pages

```bash
git remote add origin https://github.com/zig4to/Iskra.git
git push -u origin main
```

Nato v nastavitvah repota: **Settings → Pages → Deploy from branch → main / root**.
