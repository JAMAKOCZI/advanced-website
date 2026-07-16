import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { Badge, Button, Card, Container, FadeIn, Input, PageHeader, Section } from '../components/ui'
import { projects } from '../data/content'
import {
  deriveCategories,
  filterProjects,
  type ProjectCategoryFilter,
} from '../lib/projectFilter'
import { cn } from '../lib/utils'

const categories = deriveCategories(projects)

export function WorkPage() {
  const [filter, setFilter] = useState<ProjectCategoryFilter>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => filterProjects(projects, filter, query),
    [filter, query],
  )

  const clearFilters = () => {
    setFilter('All')
    setQuery('')
  }

  const hasActiveFilters = filter !== 'All' || query.trim().length > 0

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Portfolio"
          title="Prace z warstwami detalu"
          description="Filtruj po kategorii i szukaj po tytule. Każdy case ma metryki, gradient identity i short summary."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtr kategorii">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm font-medium transition',
                  filter === c
                    ? 'border-violet-400/50 bg-violet-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white',
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="block w-full sm:max-w-xs">
            <span className="sr-only">Szukaj projektu</span>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj projektu…"
              aria-label="Szukaj projektu"
            />
          </label>
        </div>

        <p className="mb-4 text-sm text-slate-500" aria-live="polite">
          Wyniki: {filtered.length} / {projects.length}
        </p>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.04}>
              <ProjectCard project={p} variant="full" />
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="mt-6 text-center" hover={false}>
            <Badge className="mb-3">Brak wyników</Badge>
            <p className="font-display text-lg font-semibold text-white">
              Nic nie pasuje do tych filtrów
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Spróbuj innej frazy albo wyczyść filtry, żeby zobaczyć wszystkie {projects.length}{' '}
              projekty w portfolio.
            </p>
            {hasActiveFilters ? (
              <Button variant="secondary" className="mt-5" onClick={clearFilters}>
                Wyczyść filtry
              </Button>
            ) : null}
          </Card>
        ) : null}
      </Container>
    </Section>
  )
}
