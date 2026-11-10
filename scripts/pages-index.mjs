import { renameSync } from 'node:fs';

// GitHub Pages serves the entry page from the branch root.
renameSync(
  new URL('../pages/index.html', import.meta.url),
  new URL('../index.html', import.meta.url),
);
