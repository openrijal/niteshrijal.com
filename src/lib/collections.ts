import type { CollectionEntry } from "astro:content"

type Entry =
  | CollectionEntry<"blog">
  | CollectionEntry<"projects">
  | CollectionEntry<"legal">
  | CollectionEntry<"work">

export function entrySlug(entry: Entry): string {
  return entry.id
}
