# SmellGood — Lyxparfymer i Fickformat

En modern e-handelsbutik för exklusiva parfymer i pocketformat, byggd med Next.js, TypeScript och Tailwind CSS.

## 🌟 Funktioner

- **250+ lyxparfymer** i 25ml fickformat
- **Responsiv design** optimerad för mobil, surfplatta och desktop
- **Produktkatalog** med sök, filter och sortering
- **Varukorg** med lokal lagring (localStorage)
- **Produktsidor** med detaljerad information och doftnoter
- **Kategorifiltrering** (Dam, Herr, Unisex)
- **Märkesfilter** med alla tillgängliga varumärken
- **Prisfilter** med förinställda prisintervall
- **Svensk design** med ren, modern och minimalistisk estetik

## 🚀 Kom igång

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev

# Bygg för produktion
npm run build

# Starta produktionsservern
npm start
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## 📁 Projektstruktur

```
src/
├── app/
│   ├── layout.tsx          # Huvudlayout med header & footer
│   ├── page.tsx            # Startsida
│   ├── globals.css         # Globala stilar
│   ├── products/
│   │   ├── page.tsx        # Produktlistningssida
│   │   ├── ProductsClient.tsx  # Klientkomponent med filter
│   │   └── [id]/
│   │       └── page.tsx    # Produktdetaljsida
│   ├── cart/
│   │   └── page.tsx        # Varukorgssida
│   ├── about/
│   │   └── page.tsx        # Om oss-sida
│   └── contact/
│       └── page.tsx        # Kontaktsida
├── components/
│   ├── Header.tsx          # Navigering med varukorgikon
│   ├── Footer.tsx          # Sidfot med länkar
│   └── ProductCard.tsx     # Produktkort med snabbköp
├── data/
│   └── products.ts         # 250+ parfymprodukter
├── lib/
│   ├── types.ts            # TypeScript-typer
│   ├── utils.ts            # Hjälpfunktioner
│   └── cart-context.tsx    # React Context för varukorg
└── scripts/
    └── scrape-bigbox.ts    # BigBox.nu-skrapare
```

## 🔧 BigBox.nu-skrapare

Projektet inkluderar en skrapare för att hämta produktdata från bigbox.nu:

```bash
# Installera skraparberoenden
npm install cheerio node-fetch

# Kör skraparen
npx ts-node scripts/scrape-bigbox.ts
```

> **OBS:** Skraparen behöver anpassas med rätt CSS-selektorer baserat på bigbox.nu:s faktiska HTML-struktur.

## 🛠 Teknikstack

- **Next.js 16** — React-ramverk med App Router
- **TypeScript** — Typsäkerhet
- **Tailwind CSS 4** — Utility-first CSS
- **React Context** — Tillståndshantering för varukorg
- **localStorage** — Persistent varukorg

## 📱 Sidor

| Sida | Beskrivning |
|------|-------------|
| `/` | Startsida med hero, kategorier, utvalda produkter |
| `/products` | Alla parfymer med sök, filter och sortering |
| `/products/[id]` | Produktdetaljer med doftnoter och relaterade produkter |
| `/cart` | Varukorg med ordersammanfattning |
| `/about` | Om SmellGood |
| `/contact` | Kontaktformulär och vanliga frågor |

