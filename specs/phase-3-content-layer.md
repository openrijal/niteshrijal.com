# Phase 3 — Content Layer migration

## Goal

Migrate all four content collections from Astro 4's legacy `type: "content"` API to Astro 6's Content Layer API (glob loader). Unblock the build broken at the end of Phase 2.

## Changes

### Config
- `src/content/config.ts` → **deleted**.
- New `src/content.config.ts` with a shared `entryIdFromPath` helper that strips `/index` so that directory-indexed entries (`blog/antigravity/index.md`) produce an id equal to the directory name (`antigravity`) — preserves Astro 4's slug semantics and all existing URLs.
- Four collections migrated: `work`, `blog`, `projects`, `legal`, each with:
  ```
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/<name>", generateId: entryIdFromPath })
  ```
- Zod import moved to `astro/zod` (the `astro:content` re-export is deprecated in v6).

### Callsite updates
- `src/lib/collections.ts`: `entry.slug` → `entry.id` (single-line flip; Phase 1 paid off).
- `entry.render()` → `render(entry)` from `astro:content` in:
  - `src/pages/legal/[...slug].astro`
  - `src/pages/work/index.astro`
  - `src/layouts/ArticleBottomLayout.astro`
- `src/components/BaseHead.astro`: removed dead `import { ViewTransitions } from "astro:transitions"` (export was removed in Astro 6; usage was already commented out).
- `src/layouts/ArticleTopLayout.astro`: `readingTime(body)` → `readingTime(body ?? "")` because Content Layer types `body` as `string | undefined`.

### Collateral bug fix
- `src/pages/rss.xml.ts`: the link-selection branch used `slug.startsWith("blog")` to pick between `/blog/...` and `/projects/...`. Blog ids never contain the leading `blog/`, so that branch was always false and every blog post was published under `/projects/<slug>/` in the RSS feed. Replaced with `item.collection`, which both fixes the bug and removes the only place where id-format assumptions leaked into a callsite.

## Verification

- `pnpm astro sync` regenerates types with no errors.
- `pnpm build` completes: 23 pages, 0 errors.
- `find dist -type f` output is byte-identical to the Phase 0 baseline (`.context/baseline-urls.txt` diff → empty).
- `dist/rss.xml` now links blog posts to `/blog/<slug>/` (previously all went to `/projects/...`). Sitemap contains 21 URLs as expected.

## Out of Scope

- `/sitemap-index.xml` reference in `BaseHead.astro` (dead link — the file no longer exists since custom sitemap emits `/sitemap.xml` directly). Cleanup lands in Phase 5.
- Tailwind v4 migration (done in Phase 2).
