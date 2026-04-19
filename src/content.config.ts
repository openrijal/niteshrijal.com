import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

function entryIdFromPath({ entry }: { entry: string }): string {
  return entry.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "")
}

const work = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/work",
    generateId: entryIdFromPath,
  }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: entryIdFromPath,
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: entryIdFromPath,
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    aboutUrl: z.string().optional(),
  }),
})

const legal = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/legal",
    generateId: entryIdFromPath,
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { work, blog, projects, legal }
