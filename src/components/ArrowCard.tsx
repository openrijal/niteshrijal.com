import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  pill?: boolean
}

export default function ArrowCard({entry, pill}: Props) {
    return (
      <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-4 flex items-center border border-border rounded-md hover:bg-foreground/5 blend">
        <div class="w-full">
          <div class="flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            {pill &&
              <span class="px-2 py-0.5 rounded-md border border-border text-xs capitalize">
                {entry.collection === "blog" ? "post" : "project"}
              </span>
            }
            <span class="uppercase">
              {formatDate(entry.data.date)}
            </span>
          </div>
          <div class="font-medium mt-2 text-foreground group-hover:opacity-70 blend">
            {entry.data.title}
          </div>
          <div class="text-sm text-foreground/60 mt-1 line-clamp-2">
            {entry.data.summary}
          </div>
          <ul class="flex flex-wrap mt-2 gap-1">
            {entry.data.tags.map((tag: string) => (
              <li class="text-xs uppercase py-0.5 px-1.5 rounded-md bg-foreground/5 text-foreground/60 border border-border">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-foreground/40 group-hover:text-foreground flex-shrink-0 blend">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
   )
}