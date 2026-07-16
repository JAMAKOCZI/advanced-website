import { Link } from 'react-router-dom'
import type { Project } from '../data/content'
import { Badge, Card } from './ui'

type ProjectCardProps = {
  project: Project
  /** teaser: home-style summary card (optionally linked). full: work page with metrics */
  variant?: 'teaser' | 'full'
  /** When set on teaser, wraps the card in a Link */
  to?: string
}

export function ProjectCard({ project, variant = 'full', to }: ProjectCardProps) {
  if (variant === 'teaser') {
    const body = (
      <Card className="group h-full overflow-hidden p-0">
        <div
          className={`h-28 bg-gradient-to-br ${project.color} opacity-80 transition group-hover:opacity-100`}
        />
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{project.summary}</p>
        </div>
      </Card>
    )

    if (to) {
      return (
        <Link to={to} className="block h-full">
          {body}
        </Link>
      )
    }
    return body
  }

  return (
    <Card className="h-full overflow-hidden p-0">
      <div className={`relative h-36 bg-gradient-to-br ${project.color}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="absolute bottom-3 left-3">
          <Badge className="!bg-black/30 !text-white">{project.category}</Badge>
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
