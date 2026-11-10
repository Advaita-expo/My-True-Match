# MyTrueMatch homepage

The MyTrueMatch landing page built with React, TypeScript, and Vite. It includes a looping wedding video, an interactive swipe demo with sample profiles, a Shagun signup entry point, and Varmala’s dedicated matchmaking service.

## Run locally

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The registration and Varmala links lead to MyTrueMatch.

## Build

```sh
npm run build
```

The build runs the TypeScript checks and writes the static site to `dist/`.

## GitHub Pages

GitHub Pages publishes the root of `main`. After updating the source, regenerate the published entry page and assets.

```sh
npm run build:pages
```

Commit the generated root `index.html` and `pages/` with the source changes, then push to `main`. Edit `src/index.html` to change the HTML template.
