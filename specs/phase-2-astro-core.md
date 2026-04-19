# Phase 2 — Astro 6 core + integrations + Tailwind v4

## Goal

Bump Astro to v6 with all official integrations and migrate Tailwind to v4. Originally planned as two phases; merged because `@astrojs/tailwind@6` only declares peer support for astro `^3 || ^4 || ^5` — there is no Tailwind-integration stepping stone on Astro 6. Absorbing the Tailwind migration here keeps each committed phase internally consistent.

This commit intentionally leaves the build **broken on content collections** — that's Phase 3's job. Tailwind config, Astro core, and all integrations are otherwise ready.

## Changes

### Dependency bumps
- `astro`: `4.4.13` → `6.1.8`
- `@astrojs/mdx`: `2.1.1` → `5.0.3`
- `@astrojs/solid-js`: `4.0.1` → `6.0.1`
- `@astrojs/rss`: `4.0.5` → `4.0.18`
- `@astrojs/check`: `0.5.6` → `0.9.8`
- Removed: `@astrojs/tailwind` (incompatible with Astro 6)
- Added: `@tailwindcss/vite@4`, bumped `tailwindcss` `3.4.1` → `4.2.2`, bumped `@tailwindcss/typography` to latest minor

### Config
- `astro.config.mjs`: dropped `tailwind()` integration, added `vite.plugins = [tailwindcss()]`.
- `tailwind.config.mjs`: **deleted** (v4 is CSS-first).

### Styles (`src/styles/global.css`)
- `@tailwind base/components/utilities` → `@import "tailwindcss";`
- Added `@plugin "@tailwindcss/typography";`
- Added `@custom-variant dark (&:where(.dark, .dark *));` to preserve class-based dark-mode behavior.
- Ported theme into `@theme { ... }` block:
  - `--font-sans` retains Atkinson + system fallbacks.
  - `--animate-twinkle`, `--animate-meteor` utility tokens.
  - `@keyframes twinkle`, `@keyframes meteor` moved inside `@theme`.
- Custom rotate angles (`135`, `225`, `315`) converted to arbitrary-value utilities (`rotate-[135deg]` etc.) — the `rotate-45` case stays on the named utility which still exists in v4's default scale.
- Font-face declarations hoisted out of the now-removed `@layer base { ... }` wrapper (v4's `@layer base` semantics differ; plain top-level `@font-face` is correct).

## Known Build Failure (expected, fixed in Phase 3)

`astro check` fails with:

> `[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts". Please move this file to "src/content.config.ts" and ensure each collection has a loader defined.`

This is deliberate. Phase 3 migrates all four collections to the Content Layer API, which will unblock the build.

## Out of Scope

- Content Collections migration (Phase 3).
- Residual v6 cleanup (trailing-slash XML endpoints, ASSETS_PREFIX, stale imports — Phase 5).
