import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { entrySlug } from "@lib/collections"

export async function GET({ site }: APIContext) {
  const base = site ? site.href.replace(/\/$/, "") : "https://niteshrijal.com"

  const blog = await getCollection("blog", ({ data }) => !data.draft)
  const projects = await getCollection("projects", ({ data }) => !data.draft)

  const staticRoutes = ["", "blog", "projects", "work", "search"]

  const blogRoutes = blog.map((p) => `blog/${entrySlug(p)}`)
  const projectRoutes = projects.map((p) => `projects/${entrySlug(p)}`)

  const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes]

  const urlset = allRoutes
    .map((route) => {
      const url = route ? `${base}/${route}/` : `${base}/`
      return `  <url><loc>${url}</loc></url>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
