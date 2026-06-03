/**
 * Prepares the API routes for `output: 'export'` (GitHub Pages).
 *
 * Next.js requires the `dynamic = 'force-static'` segment config on route
 * handlers when building a static export, but that config must be statically
 * analyzable — it cannot be conditional. This script appends it to the API
 * routes before a static build.
 *
 * The change is meant to be throwaway (CI builds run it on a clean checkout).
 * Locally, restore with: git checkout -- app/api
 */
import { readFileSync, writeFileSync } from 'node:fs';

const MARKER = "export const dynamic = 'force-static';";

const routes = [
  'app/api/search/route.ts',
  'app/api/version/route.ts',
  'app/api/github-releases/route.ts',
];

for (const route of routes) {
  const source = readFileSync(route, 'utf-8');
  if (source.includes(MARKER)) {
    console.log(`= ${route} (already prepared)`);
    continue;
  }
  writeFileSync(route, `${source}\n// Added by scripts/static-export-prepare.mjs\n${MARKER}\n`);
  console.log(`+ ${route}`);
}
