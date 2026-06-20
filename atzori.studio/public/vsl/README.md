# Cartella VSL

Questa cartella è il posto dove andrà il **video definitivo del manifesto** quando lo registrerai.

## Cosa mettere qui

Carica i file con questi nomi esatti (sono i nomi che il codice si aspetta):

- `manifesto.mp4` — il video principale (obbligatorio)
- `manifesto.webm` — versione WebM alternativa per browser che non supportano MP4 (opzionale ma consigliato)
- `poster.jpg` — il fotogramma di anteprima mostrato prima del play (consigliato)
- `manifesto.vtt` — sottotitoli/captions in italiano (opzionale, ottimo per accessibilità)

## Specifiche tecniche consigliate

**Video**
- Risoluzione: 1920×1080 (Full HD) o 2560×1440 (2K)
- Aspect ratio: 16:9
- Frame rate: 24fps (look cinematic) o 30fps
- Codec: H.264 (MP4) — compatibile ovunque
- Bitrate: 5-8 Mbps
- Durata target: 60-90 secondi

**Audio**
- Codec: AAC
- Bitrate: 192 kbps
- Sample rate: 48 kHz
- Stereo
- Loudness target: -16 LUFS (standard web)

**Peso file**
- Ideale: sotto i 15 MB per buon caricamento
- Massimo: 30 MB

**Poster**
- 1920×1080, JPG, qualità 85%
- Peso: sotto i 200 KB

## Come sostituire l'animazione attuale con il video

Quando avrai i file caricati in questa cartella, in `app/page.jsx` sostituisci:

```jsx
import ManifestoPlayer from '@/components/ManifestoPlayer';
// ...
<ManifestoPlayer />
```

con:

```jsx
import VideoPlayer from '@/components/VideoPlayer';
// ...
<VideoPlayer />
```

Il componente `VideoPlayer.jsx` è già pronto in `components/` ed è uno scambio diretto.

## Tool consigliati per registrare/montare

- **Registrazione**: smartphone moderno + microfono lavalier (es. Rode Wireless ME) + softbox da 30€
- **Montaggio**: DaVinci Resolve (gratuito) o Final Cut Pro
- **Compressione finale**: HandBrake (gratuito) — preset "Web Optimized" → "Vimeo YouTube HQ 1080p30"
- **Voce AI** (se non vuoi registrare la tua): ElevenLabs (voci italiane molto naturali)
