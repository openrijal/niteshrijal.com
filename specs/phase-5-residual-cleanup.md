# Phase 5 — Residual v6 cleanup

## Goal

Resolve remaining Astro-6-compatibility debt surfaced by the migration: stale `/sitemap-index.xml` references (a leftover of the `@astrojs/sitemap` era), and a shadowing `public/robots.txt` that was silently overriding the dynamic `robots.txt.ts` endpoint.

## Changes

- `src/components/BaseHead.astro`: `<link rel="sitemap" href="/sitemap-index.xml" />` → `href="/sitemap.xml"`.
- `src/pages/robots.txt.ts`: `sitemap-index.xml` → `sitemap.xml` in the emitted `Sitemap:` line.
- `public/robots.txt`: **deleted**. Contents were stale (`http://localhost:4321/sitemap-index.xml`) and the file was shadowing the endpoint — `pnpm build` in Phase 3 explicitly warned: *"Skipping src/pages/robots.txt.ts because a file with the same name exists in the public folder"*. With it gone, `dist/robots.txt` now reflects the canonical endpoint output.

## Verification

- `pnpm build` — 23 pages, no shadowing warning.
- `cat dist/robots.txt` → `Sitemap: https://niteshrijal.com/sitemap.xml` (was previously baked with a localhost URL from the static file).
- `find dist -type f` diff vs Phase 0 baseline → empty (URL list byte-identical).
- No in-page anchor links (`](#...)`) anywhere in `src/content`, so Astro 6's Markdown heading-id hyphenation change has no user-facing impact on this site.

## Skipped Checks

- `pnpm lint` — ESLint is referenced in `package.json` scripts but no config or binary is installed in the repo. Pre-existing condition; out of scope for the upgrade.
- `Astro.glob`, `astro:schema`, `emitESMImage`, `astro:ssr-manifest`, `ASSETS_PREFIX` — grepped, zero matches.
- `Astro.site` — used only in `BaseHead.astro` at top-level component scope, not inside `getStaticPaths`, so the v6 deprecation does not apply.
