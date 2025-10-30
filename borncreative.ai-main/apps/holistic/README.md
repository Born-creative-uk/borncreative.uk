# Holistic Library App

Simple, self-contained prototype to explore holistic remedies by condition. No installs required.

Contents:
- `public/index.html` — UI (Tailwind CDN)
- `src/data.js` — dataset (conditions, items, mappings)
- `src/app.js` — UI logic (vanilla JS modules)

Quick start:
- Open `apps/holistic/public/index.html` in a browser
  - If your browser blocks ES modules from `file://`, use a simple static server:
    - Python: `python -m http.server 8080` from `apps/holistic` and open `http://localhost:8080/public/`
    - Node (if installed): `npx http-server -p 8080 apps/holistic/public` or use VS Code Live Server

Notes:
- Data is embedded as an ES module to avoid fetch/CORS issues during prototyping.
- This is a starting point; we can later add a real API (Netlify Functions or Express) and persistence.

Roadmap ideas:
- Add search across items (not just conditions)
- Add symptom and contraindication filters
- Add severity inputs and scoring
- Export/share recommendations
- Switch dataset to remote API

