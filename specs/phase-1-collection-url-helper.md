# Phase 1 — Centralize collection entry identifier access

## Goal

Route every `CollectionEntry.slug` access through a single `entrySlug(entry)` helper so the eventual Astro 6 swap (`.slug` → `.id`) becomes a one-line change inside the helper rather than a scatter-gather edit across the codebase. Still on Astro 4; output must be byte-identical.

## Changes

- New file `src/lib/collections.ts` exporting `entrySlug(entry)` (currently returns `entry.slug`).
- Refactored callsites to import and use `entrySlug`:
  - `src/pages/rss.xml.ts`
  - `src/pages/sitemap.xml.ts`
  - `src/pages/blog/[...slug].astro`
  - `src/pages/projects/[...slug].astro`
  - `src/pages/legal/[...slug].astro`
  - `src/components/ArrowCard.tsx`
  - `src/layouts/ArticleBottomLayout.astro`

## Verification

- `pnpm build` passes (23 pages).
- `find dist -type f` URL list is byte-identical to `.context/baseline-urls.txt` from Phase 0.

## Known Pre-Existing Issue (Not Fixed Here)

`src/pages/rss.xml.ts:25` uses `slug.startsWith("blog")` to decide between `/blog/` and `/projects/` URLs. Blog slugs are never prefixed with `blog` (they're just the post slug, e.g. `hello-idx`), so this branch is always false and every RSS item is linked under `/projects/...` — including blog posts. Preserved as-is in this phase for behavior parity; to be revisited once the Content Layer migration in Phase 3 changes `entry.id` format. Recommended fix then: `entry.collection === "blog" ? ... : ...`.

## Out of Scope

No version bumps, no config changes, no `render()` changes.
