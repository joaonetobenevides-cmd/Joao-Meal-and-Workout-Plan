# Joao's Plan — meal + training PWA

A phone-sized installable web app implementing the design in
`project/Meal and Training Plan.dc.html`: a 4-week training program with a
2-week rotating meal plan, exercise technique videos, check-off tracking and
a weight log. Plain HTML/CSS/JS — no build step.

## Files

- `index.html` — app shell (header, content area, tab bar)
- `styles.css` — Organic design-system tokens + app styles; self-hosted fonts
- `app.js` — all plan data and app logic (vanilla JS)
- `sw.js` — service worker; precaches everything for full offline use
- `manifest.webmanifest`, `icons/` — PWA install metadata and home-screen icons
- `fonts/` — Caprasimo + Figtree (woff2), so no network is needed for fonts

## Run locally

Any static file server works:

```
npx http-server app -p 8080
```

## Install on a phone

The service worker (offline + install) requires HTTPS, so host the `app/`
folder on any static host — GitHub Pages, Netlify, Cloudflare Pages — then:

- **iPhone (Safari):** open the URL → Share → **Add to Home Screen**.
- **Android (Chrome):** open the URL → ⋮ menu → **Add to Home screen** /
  **Install app**.

After the first visit everything works offline except the exercise technique
videos, which stream from YouTube. Checkmarks and the weight log are stored
on the device (localStorage) per browser.

## Configuration

Three constants at the top of `app.js` mirror the design prototype's props:
`WEIGHT_UNIT` (`kg`/`lb`), `VIDEO_MODE` (`inline` embed or `link` out to
YouTube), and `DEFAULT_TAB`.
