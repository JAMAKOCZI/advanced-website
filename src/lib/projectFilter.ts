import type { Project } from '../data/content'

export type ProjectCategoryFilter = 'All' | Project['category']

export function deriveCategories(items: Project[]): ProjectCategoryFilter[] {
  const unique = [...new Set(items.map((p) => p.category))]
  return ['All', ...unique]
}

export function filterProjects(
  items: Project[],
  filter: ProjectCategoryFilter,
  query: string,
): Project[] {
  const q = query.trim().toLowerCase()
  return items.filter((p) => {
    const matchCat = filter === 'All' || p.category === filter
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    return matchCat && matchQ
  })
}
