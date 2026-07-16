import { useMemo, useState } from 'react'
import { projects, type Project } from '../data/content'
import { cn } from '../lib/utils'
import { Badge, Card, Container, FadeIn, PageHeader, Section } from '../components/ui'

const categories = ['All', 'Product', 'Brand', 'Platform', 'AI'] as const

export function WorkPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter
      const q = query.trim().toLowerCase()
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [filter, query])

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Portfolio"
          title="Prace z warstwami detalu"
          description="Filtruj po kategorii i szukaj po tytule. Każdy case ma metryki, gradient identity i short summary."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  filter === c
                    ? 'border-violet-400/50 bg-violet-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white',
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj projektu…"
            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-400/60 sm:max-w-xs"
          />
        </div>

        <p className="mb-4 text-sm text-slate-500">
          Wyniki: {filtered.length} / {projects.length}
        </p>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.04}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="mt-6 text-center text-slate-400" hover={false}>
            Brak projektów dla tych filtrów. Wyczyść wyszukiwanie lub wybierz inną kategorię.
          </Card>
        ) : null}
      </Container>
    </Section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden p-0">
      <div className={`relative h-36 bg-gradient-to-br ${project.color}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="absolute bottom-3 left-3">
          <Badge className="!bg-black/30">{project.category}</Badge>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-white">{project.title}</h2>
          <span className="text-sm text-slate-500">{project.year}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
