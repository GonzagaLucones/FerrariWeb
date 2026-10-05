# Ferrari — Built to be Remembered

## Problem statement
Importar o site da Ferrari do GitHub (https://github.com/contatoascendbr-prog/Ferrari), colocar pra rodar e depois iterar com melhorias.

## Architecture
- Original repo lives in `/app/Site Novo/` (vanilla HTML/CSS/JS + unused React/TSX leftovers in `src/`).
- Runnable copy: `/app/frontend/` — `index.html`, `style.css`, `script.js`, `server.js` (Node static server with Range support, port 3000), `build_site.js` + `horse_path.txt` (regenerates index.html).
- `/app/frontend/frames/frame_001..300.jpg` — extracted with ffmpeg from `Site Novo/src/upscaled-video.mp4` (1920x1080, q4, ~30MB). Required by the scroll-driven canvas animation.
- `/app/backend/server.py` — minimal FastAPI with `GET /api/` health only (no DB used yet).

## Implemented (2026-06)
- Site imported and running; frames generated; smoke test passed (hero, canvas animation, showcase, cards reveal, menu drawer, social links, backend health).

## Backlog
- P1: Portuguese translation / content edits (user said "qualquer coisa alteramos")
- P2: Contact/lead form (would need backend + Mongo)
- P2: Mobile tuning of frame animation; WebP frames to cut weight
