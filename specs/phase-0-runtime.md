# Phase 0 — Runtime & Prep

## Goal

Pin the Node runtime to a version that satisfies Astro 6's requirement (`>=22.12.0`) and establish a clean Astro 4 baseline build on that runtime. This isolates Node-specific regressions from the Astro upgrade diff in later phases.

## Changes

- Add `.nvmrc` and `.node-version` pinned to `22.16.0` (most recent installable via local `nodenv`; satisfies Astro 6 floor of 22.12.0).
- Add `"engines": { "node": ">=22.12.0" }` to `package.json`.
- Install Node 22.16.0 via `nodenv install -s 22.16.0`.
- Reinstall `pnpm@10.15.1` globally under the new Node (nodenv scopes globals per version).
- Snapshot the Astro 4 static build output to `.context/baseline-urls.txt` for permalink diffing in Phase 6.

## Verification

- `node --version` → `v22.16.0` (both `.node-version` and `.nvmrc` pick this up).
- `pnpm install` → clean, no peer warnings beyond the pre-existing esbuild/sharp build-script notice.
- `pnpm build` (Astro 4 still) → 23 pages built, 0 errors.
- `.context/baseline-urls.txt` contains 26 entries (HTML + `rss.xml`, `sitemap.xml`, `robots.txt`).

## Out of Scope

No Astro version changes, no source-code changes beyond the manifest. Integrations and content collections remain on Astro 4 APIs.
