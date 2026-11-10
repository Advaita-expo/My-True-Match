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

Build for the repository's Pages URL.

```sh
npm run build -- --base=/My-True-Match/
```

Publish the contents of `dist/` to the root of the `gh-pages` branch with an empty `.nojekyll` file. In **Settings → Pages**, select **Deploy from a branch**, then choose **gh-pages** and **/(root)**.
