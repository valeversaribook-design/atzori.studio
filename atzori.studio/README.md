# Luca Atzori — Sito personale

Sito vetrina di Luca Atzori, costruito con Next.js 14 (App Router). Single page con manifesto, VSL animata in HTML, sezione metodo, FAQ e CTA verso un Google Form per la candidatura.

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **CSS puro** (nessun Tailwind, nessun framework di styling)
- **Google Fonts** (Fraunces, Inter, JetBrains Mono)
- Nessun database, nessuna API esterna nel sito
- Form di candidatura su **Google Form** (gestito esternamente)

## Setup locale

```bash
npm install
npm run dev
```

Apre su `http://localhost:3000`.

## Anteprima dentro VS Code

Il progetto include una cartella `.vscode/` con configurazione e task pronti. Workflow:

**1. Apri il progetto**
- File → Open Folder → seleziona la cartella `luca-atzori-site`
- VS Code chiederà "Do you trust the authors?" → Yes
- In basso a destra apparirà un popup che suggerisce di installare le estensioni raccomandate → clicca **Install all** (ESLint, snippet React, autocomplete dei path, evidenziazione dei colori)

**2. Installa le dipendenze (la prima volta)**
- Apri il terminale integrato: `Ctrl + ò` (Windows/Linux) o `Cmd + J` (Mac)
- Lancia `npm install` e aspetta che finisca (1-2 minuti)
- Serve **Node.js installato sulla macchina** — se non ce l'hai, scaricalo da [nodejs.org](https://nodejs.org) (versione LTS)

**3. Avvia il dev server**
- Da terminale: `npm run dev`
- Oppure usa il task pre-configurato: `Cmd/Ctrl + Shift + P` → "Tasks: Run Task" → **Avvia dev server**
- Quando vedi "Ready in ... ms" e l'URL `http://localhost:3000`, il sito è online in locale

**4. Vedi l'anteprima — due opzioni**

*Opzione A — Anteprima DENTRO VS Code (Simple Browser)*
- `Cmd/Ctrl + Shift + P` → digita "Simple Browser: Show"
- Incolla `http://localhost:3000` e Invio
- Si apre una tab a fianco del codice — modifichi un file, salvi, l'anteprima si aggiorna da sola

*Opzione B — Anteprima nel browser esterno (consigliata per testing reale)*
- Apri Chrome / Safari / Firefox
- Vai a `http://localhost:3000`
- Apri DevTools per testare anche mobile (Cmd/Ctrl + Shift + M per modalità responsive)

**5. Stoppa il server**
- Nel terminale: `Ctrl + C`

## Deploy su Vercel

Il modo più rapido è collegare il repository GitHub a Vercel:

1. Push del progetto su un repo GitHub (privato o pubblico)
2. Vai su [vercel.com/new](https://vercel.com/new)
3. Importa il repo
4. Lascia tutte le impostazioni di default (Next.js viene auto-rilevato)
5. Clicca **Deploy**

In alternativa, da terminale:

```bash
npm install -g vercel
vercel
```

## Configurazione

### Cambiare il link del Google Form

Tutti i CTA del sito (header, hero, fine VSL, sezione finale) pescano l'URL da un unico file:

`lib/config.js`

```js
export const CANDIDATI_URL = 'https://forms.gle/UA7saZzPvA8s27eJA';
```

Aggiorna lì se cambi il form, non serve toccare nient'altro.

### Cambiare i testi

- **Manifesto, hero, sezioni, FAQ**: `app/page.jsx`
- **Testo della VSL animata (con voce italiana)**: `components/ManifestoPlayer.jsx` — costante `SCENE_LIST` in alto al file
- **Footer (LinkedIn, X, email)**: in fondo a `app/page.jsx`
- **Metadata SEO + Open Graph**: `app/layout.jsx`

### Cambiare il design

Tutte le variabili di colore, tipografia e spaziatura sono in `app/globals.css` in alto, nella sezione `:root`. Cambia lì per propagare ovunque:

```css
:root {
  --navy-deep: #0A1628;
  --gold: #C9A570;
  --ivory: #F5F1E8;
  /* ... */
}
```

## Struttura

```
luca-atzori-site/
├── app/
│   ├── globals.css           # stili del sito
│   ├── manifesto-player.css  # stili della VSL animata
│   ├── layout.jsx            # SEO + OG image
│   └── page.jsx              # homepage
├── components/
│   ├── ManifestoPlayer.jsx   # VSL animata in HTML (attiva)
│   └── VideoPlayer.jsx       # alternativa con video reale (vedi public/vsl/)
├── lib/
│   └── config.js             # URL del Google Form
├── public/
│   ├── profilo.png           # foto profilo (sezione Chi sono)
│   ├── og-image.png          # immagine OG per i preview social
│   └── vsl/                  # dove mettere il video definitivo (vedi README dentro)
├── package.json
├── next.config.mjs
└── jsconfig.json
```

## Quando avrai il video definitivo

Vedi `public/vsl/README.md` per le specifiche tecniche. In sintesi:

1. Carica `manifesto.mp4` (e opzionalmente `manifesto.webm`, `poster.jpg`) in `public/vsl/`
2. In `app/page.jsx`, sostituisci `<ManifestoPlayer />` con `<VideoPlayer />` (l'import è già pronto in `components/VideoPlayer.jsx`)
3. Re-deploy

Niente da configurare, è uno scambio diretto.

## Domini personalizzati

Su Vercel, dal pannello del progetto:

1. Settings → Domains
2. Aggiungi il tuo dominio (es. `lucaatzori.it`)
3. Vercel ti mostra i record DNS da configurare dal pannello del tuo registrar
4. Una volta propagati (max 24h), HTTPS è automatico

Il dominio nel layout (`app/layout.jsx`, riga `metadataBase`) è impostato su `https://lucaatzori.it` — se usi un dominio diverso, aggiornalo lì per i link Open Graph corretti.

## Performance

- Build statica (Next.js fa pre-rendering): le pagine si caricano in <1 secondo
- Immagini ottimizzate via `next/image`
- Font caricati con `display=swap` (no FOIT)
- Animazioni VSL rispettano `prefers-reduced-motion`

## Note

- Il sito è **monolingua italiano** per ora
- La VSL animata usa la **Web Speech API** per la voce: funziona meglio su Chrome e Safari (Mac), discretamente su Edge, peggio su Firefox/Linux. Toggle audio nella VSL per disattivarla
- Per analytics: aggiungi Vercel Analytics o Plausible nel `layout.jsx`
