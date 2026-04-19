# Phase 6 — Full verification

## Goal

Confirm that the Astro 4.4 → Astro 6.1 upgrade (plus Tailwind v3 → v4 and legacy collections → Content Layer) produces a fully working site with no permalink regressions.

## Checks run

### Type-check
`pnpm astro check` → **0 errors, 0 warnings, 0 hints** across 34 files.

### Production build
`pnpm build` → 23 static pages built in ~1.9s. No warnings, no shadowing alerts.

### URL parity
`find dist -type f` diff against `.context/baseline-urls.txt` (snapshot of the Astro 4 build captured at the end of Phase 0) → **empty** (byte-identical route list).

Artefact counts:
- 16 RSS `<item>` elements in `dist/rss.xml` (full feed).
- 21 `<loc>` entries in `dist/sitemap.xml` (static + blog + projects).
- `dist/robots.txt` emits `Sitemap: https://niteshrijal.com/sitemap.xml`.

### Dev-server smoke test (`astro dev --port 4325`, Astro 6.1.8)
All 11 representative routes return HTTP 200:

| Status | Route |
|--------|-------|
| 200 | `/` |
| 200 | `/blog/` |
| 200 | `/blog/antigravity/` |
| 200 | `/projects/` |
| 200 | `/projects/llmusage/` |
| 200 | `/legal/privacy/` |
| 200 | `/search/` |
| 200 | `/work/` |
| 200 | `/rss.xml` |
| 200 | `/sitemap.xml` |
| 200 | `/robots.txt` |

Additional render sanity checks over dev server:
- `/` `<meta name="generator">` reports `Astro v6.1.8` (confirms the right server on port 4325).
- `/blog/antigravity/` `<title>` renders post frontmatter correctly.
- `/search/` includes seven Astro scoped-style markers (`data-astro-cid-...`) and Solid client hydration markup.
- `<link rel="sitemap" href="/sitemap.xml">` emitted in `<head>` (was `sitemap-index.xml` before Phase 5).
- Tailwind output visible: `class="fixed top-0 w-full h-16 z-50 "`, `prose`, `dark:prose-invert` — v4 classes compile through `@tailwindcss/vite`.

### Skipped
- `pnpm lint` — ESLint listed in `package.json` scripts but neither the binary nor any config is installed in the repo. Pre-existing, not an upgrade regression.

## Summary of upgrade

| Area | Before | After |
|------|--------|-------|
| Node (engines) | *unspecified* | `>=22.12.0` (local `.node-version` = 22.16.0) |
| `astro` | 4.4.13 | 6.1.8 |
| `@astrojs/mdx` | 2.1.1 | 5.0.3 |
| `@astrojs/solid-js` | 4.0.1 | 6.0.1 |
| `@astrojs/rss` | 4.0.5 | 4.0.18 |
| `@astrojs/check` | 0.5.6 | 0.9.8 |
| Tailwind | v3.4 + `@astrojs/tailwind` | v4.2 + `@tailwindcss/vite` |
| Content collections | legacy `type: "content"` | Content Layer (glob loader) |
| View Transitions | imported but disabled | import removed |
| RSS blog links | all routed to `/projects/` (bug) | correctly routed by `entry.collection` |
| Sitemap discovery | `/sitemap-index.xml` (404) | `/sitemap.xml` (canonical) |

All six phases committed individually with specs in `specs/phase-*.md`.
