import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For, createMemo } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  data: CollectionEntry<"blog">[]
}

export default function Blog({ data, tags }: Props) {
  const [tagFilter, setTagFilter] = createSignal(new Set<string>())
  const [selectedYear, setSelectedYear] = createSignal<string>("")
  const [selectedMonth, setSelectedMonth] = createSignal<string>("")
  const [posts, setPosts] = createSignal<CollectionEntry<"blog">[]>([])

  // Get unique years and months from the data
  const dateOptions = createMemo(() => {
    const years = new Set<string>()
    const months = new Set<string>()
    
    data.forEach(post => {
      const date = new Date(post.data.date)
      years.add(date.getFullYear().toString())
      months.add(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`)
    })
    
    return {
      years: Array.from(years).sort((a, b) => b.localeCompare(a)), // Most recent first
      months: Array.from(months).sort((a, b) => b.localeCompare(a)) // Most recent first
    }
  })

  // Filter posts based on tags and date
  createEffect(() => {
    let filtered = data.filter((entry) => 
      Array.from(tagFilter()).every((value) => 
        entry.data.tags.some((tag:string) => 
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    )

    // Apply year filter
    if (selectedYear()) {
      filtered = filtered.filter(entry => 
        new Date(entry.data.date).getFullYear().toString() === selectedYear()
      )
    }

    // Apply month filter
    if (selectedMonth()) {
      const [year, month] = selectedMonth().split('-')
      filtered = filtered.filter(entry => {
        const date = new Date(entry.data.date)
        return date.getFullYear().toString() === year && 
               (date.getMonth() + 1).toString().padStart(2, '0') === month
      })
    }

    setPosts(filtered)
  })

  function toggleTag(tag: string) {
    setTagFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }

  function clearAllFilters() {
    setTagFilter(new Set<string>())
    setSelectedYear("")
    setSelectedMonth("")
  }

  function formatMonthOption(monthStr: string) {
    const [year, month] = monthStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm font-semibold uppercase text-black dark:text-white">Filter</div>
            {(tagFilter().size > 0 || selectedYear() || selectedMonth()) && (
              <button 
                onClick={clearAllFilters}
                class="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"
              >
                Clear All
              </button>
            )}
          </div>
          
          {/* Date Filters */}
          <div class="mb-6">
            <div class="text-xs font-semibold uppercase mb-2 text-black/75 dark:text-white/75">By Date</div>
            
            {/* Year Filter */}
            <div class="mb-3">
              <select 
                value={selectedYear()}
                onChange={(e) => setSelectedYear(e.currentTarget.value)}
                class="w-full px-2 py-1.5 text-sm rounded border border-black/15 dark:border-white/20 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              >
                <option value="">All Years</option>
                <For each={dateOptions().years}>
                  {(year) => <option value={year}>{year}</option>}
                </For>
              </select>
            </div>

            {/* Month Filter */}
            <div class="mb-3">
              <select 
                value={selectedMonth()}
                onChange={(e) => setSelectedMonth(e.currentTarget.value)}
                class="w-full px-2 py-1.5 text-sm rounded border border-black/15 dark:border-white/20 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              >
                <option value="">All Months</option>
                <For each={dateOptions().months}>
                  {(month) => <option value={month}>{formatMonthOption(month)}</option>}
                </For>
              </select>
            </div>
          </div>

          {/* Tag Filters */}
          <div>
            <div class="text-xs font-semibold uppercase mb-2 text-black/75 dark:text-white/75">By Tags</div>
            <ul class="flex flex-wrap sm:flex-col gap-1.5">
              <For each={tags}>
                {(tag) => (
                  <li>
                    <button onClick={() => toggleTag(tag)} class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-black/5 dark:bg-white/10", "hover:bg-black/10 hover:dark:bg-white/15", "transition-colors duration-300 ease-in-out", tagFilter().has(tag) && "text-black dark:text-white")}>
                      <svg class={cn("size-5 fill-black/50 dark:fill-white/50", "transition-colors duration-300 ease-in-out", tagFilter().has(tag) && "fill-black dark:fill-white")}>
                        <use href={`/ui.svg#square`} class={cn(!tagFilter().has(tag) ? "block" : "hidden")} />
                        <use href={`/ui.svg#square-check`} class={cn(tagFilter().has(tag) ? "block" : "hidden")} />
                      </svg>
                      {tag}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {posts().length} OF {data.length} POSTS
          </div>
          <ul class="flex flex-col gap-3">
            {posts().map((post) => (
              <li>
                <ArrowCard entry={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
