# A Tribute to Michael Jackson

An interactive fan tribute site: a cassette-tape player for Michael Jackson's greatest hits, set against an animated gradient background.

**Live:** https://kartikpd19.github.io/Mj-tribute/

## Features

- Play/pause/next/previous through a 12-track playlist, streamed via the YouTube IFrame API (no audio hosted in this repo)
- A custom cassette-tape UI, including a looping background video of the reels turning while a song plays
- A fully animated, procedural gradient background (CSS + SVG turbulence, no images) with cursor-reactive parallax and film grain
- Responsive across mobile, laptop, and desktop breakpoints

## Stack

React + Vite, plain CSS (no framework). No backend — everything runs client-side.

## Local development

```bash
npm install
npm run dev
```

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`.
